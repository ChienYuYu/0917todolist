<template>
  <div class="wrapper">
    <InputTodo :addTodo = addTodo />
    <TodoStatus :todoList = todoList />
    <ListView :todoList = todoList
      :deleteTodo = deleteTodo
      :updateTodo = updateTodo
      :updateLocalStorage = updateLocalStorage />
  </div>
</template>

<script>
import InputTodo from '../components/InputTodo.vue';
import TodoStatus from '../components/TodoStatus.vue';
import ListView from '../components/ListView.vue';

export default {
  components: {
    InputTodo,
    TodoStatus,
    ListView,
  },
  data() {
    return {
      todoList: [],
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todoList.unshift(newTodo);
      this.updateLocalStorage();
    },
    deleteTodo(i) {
      this.todoList.splice(i, 1);
      this.updateLocalStorage();
    },
    updateTodo(editTodo, i) {
      this.todoList[i].content = editTodo;
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
  },
  created() {
    // 瀏覽器首次載入會沒有localstorage資料會報錯誤，
    // 判斷如果為空就創立一個
    if (localStorage.getItem('todoList') === null) {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
  },
  mounted() {
    this.todoList = JSON.parse(localStorage.getItem('todoList'));
  },
};
</script>

<style lang="scss">
.wrapper{
  background: #333;
  height: 100vh;
  overflow:scroll;
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
a {
  text-decoration: none;
}

</style>
