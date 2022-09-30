<template>
  <div class="wrapper">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-11 col-lg-6 d-flex justify-content-center mb-4">
          <input
            type="text"
            class="inputbar form-control"
            aria-label="輸入待辦"
            placeholder="請輸入待辦"
            v-model="todoContent"
            @keyup.enter="addTodo"
          />
          <input type="submit" value="新增" class="submitbtn btn"
          :class="{'disabled': todoContent === ''}" @click="addTodo" />
        </div>
      </div>
      <div class="row justify-content-center">
        <ul class="todo-status col-10 col-lg-6 mb-4 list-unstyled d-flex justify-content-between">
          <li class="">
            <a
              href="#"
              class="d-inline-block p-2"
              @click.prevent="status = 'all'"
              :class="{ select: status === 'all' }"
            >
              全部 ({{ todoList.length }})
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-inline-block py-2"
              @click.prevent="status = 'unfinish'"
              :class="{ select: status === 'unfinish' }"
            >
              待完成 ({{ unfinishNum.length }})
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-inline-block py-2"
              @click.prevent="status = 'finish'"
              :class="{ select: status === 'finish' }"
            >
              已完成 ({{ finishedNum.length }})
            </a>
          </li>
        </ul>
      </div>
      <div class="row justify-content-center">
        <ul class="list col-11 col-lg-8 list-unstyled">
          <li v-for="(item, index) in filterTodo" :key="item.id">
            <label :for="index" class="todo-item border d-flex ps-3">
              <input class="todo-check" type="checkbox" :id="index"
              v-model="item.complete" @change="updateLocalStorage" />
              <span class="text-truncate p-3 mx-auto">{{ item.content }}</span>
              <a href="#" class="ms-auto p-3" @click.prevent="editTodo(item, index)">
                <i class="bi bi-pencil-fill edit-icon"/>
                <span class="d-none">1</span>
              </a>
              <a href="#" class="delete-todo p-3"
              @click.prevent="deleteTodo(index)">X</a>
            </label>
          </li>
        </ul>
        <h3 class="text-light py-5" v-if="todoList.length === 0">尚無待辦事項</h3>
        <h3 class="text-light py-5"
        v-else-if="status === 'unfinish' && unfinishNum.length === 0">尚無待完成事項</h3>
        <h3 class="text-light py-5"
        v-else-if="status === 'finish' && finishedNum.length === 0">尚無完成事項</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoList: [],
      todoContent: '',
      status: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.todoContent.trim() === '') {
        alert('請輸入待辦內容');
        this.todoContent = '';
      } else {
        const time = new Date();
        const newTodo = {
          id: time.getTime(),
          content: this.todoContent,
          complete: false,
        };
        this.todoList.unshift(newTodo);
        this.todoContent = '';
        this.status = 'all';

        this.updateLocalStorage();
      }
    },
    deleteTodo(i) {
      if (window.confirm('確認刪除?')) {
        this.todoList.splice(i, 1);
        this.updateLocalStorage();
      }
    },
    editTodo(item, i) {
      const editTodo = prompt('編輯待辦', item.content);
      this.todoList[i].content = editTodo;
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
  },
  computed: {
    filterTodo() {
      if (this.status === 'unfinish') {
        return this.todoList.filter((item) => item.complete === false);
      }
      if (this.status === 'finish') {
        return this.todoList.filter((item) => item.complete === true);
      }
      return this.todoList;
    },

    unfinishNum() {
      return this.todoList.filter((item) => item.complete === false);
    },

    finishedNum() {
      return this.todoList.filter((item) => item.complete === true);
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

<style lang="scss" scoped>
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
// -------------------
.inputbar{
  border-radius: .75rem 0 0 .75rem;
  background: #222;
  border: 1px solid #222 ;
  outline: none;
  color: #fff;
  text-align: center;
  width: 40%;
  transition: .5s;
  &:focus{
    outline: none;
    box-shadow: none;
    width:100%;
  }
}
.submitbtn{
  background: #fa0;
  color: #fff;
  border-radius: 0 .75rem .75rem 0;
  border: none;
  &:hover{
    background: rgb(250, 184, 53);
  }
}
// -------------------
.todo-status{
  a{
    color: #fff;
  }
  .select{
    color: rgb(0, 255, 157);
  }
}
// -------------------
.todo-item input{
  transform: scale(130%);
}
.todo-item input:checked ~ span {
  text-decoration: line-through;
}
.todo-item span {
  color: #fa0;
}
.todo-item .edit-icon{
  color: #ddd;
}
.todo-item .delete-todo{
  color: rgb(255, 56, 126);
}
</style>
