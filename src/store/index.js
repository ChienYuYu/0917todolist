import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: [{ id: 123, content: '初始預設資料', done: false }],
    status: 'all', // all unDone done
  },

  getters: {
    unDoneTodo(state) {
      return state.todos.filter((item) => item.done === false);
    },
    doneTodo(state) {
      return state.todos.filter((item) => item.done === true);
    },
  },

  mutations: {
    // -----LocalStorage相關------------------------
    initLocalStorage(state) {
    //  瀏覽器首次載入會沒有localstorage資料會報錯誤，
    // 判斷如果為空就創立一個
      if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    transformData(state) {
      // LocalStorage裡JSON字串轉回物件
      state.todos = JSON.parse(localStorage.getItem('todos'));
    },
    updateLocalStorage(state) {
      // 將todos轉JSON寫入LocalStorage
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    // -----InputTodo.vue相關 ↓------------------------
    addTodo(state, newTodo) {
      const setId = new Date().getTime();
      state.todos.unshift({
        id: setId,
        content: newTodo,
        done: false,
      });
    },

    // -----TodoStatus.vue相關 ↓-----------------------
    statusChange(state, newStatus) {
      state.status = newStatus;
    },
    // -----ListView.vue相關 ↓-------------------------
    deleteTodo(state, id) {
      state.todos = state.todos.filter((item) => item.id !== id);
    },
    editTodo(state, todo) {
      const i = state.todos.findIndex((item) => item.id === todo.id);
      state.todos[i].content = todo.newTodo;
    },
    doneSwitch(state, id) {
      const i = state.todos.findIndex((item) => item.id === id);
      state.todos[i].done = !state.todos[i].done;
    },
  },

  actions: {
  },
  modules: {
  },
});
