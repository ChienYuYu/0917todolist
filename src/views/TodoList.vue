<template>
  <div class="wrapper">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex">
          <input
            type="text"
            class="form-control rounded-0"
            aria-label="輸入待辦"
            placeholder="請輸入待辦"
            v-model="todoContent"
            @keyup.enter="addTodo"
          />
          <input type="submit" value="送出" class="btn btn-warning rounded-0" @click="addTodo" />
        </div>
      </div>
      <div class="row justify-content-center">
        <ul class="todo-status col-10 col-lg-6 m-0 list-unstyled d-flex justify-content-between">
          <li class="">
            <a
              href="#"
              class="d-inline-block p-2"
              @click.prevent="status = 'all'"
              :class="{ select: status === 'all' }"
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-inline-block py-2"
              @click.prevent="status = 'unfinish'"
              :class="{ select: status === 'unfinish' }"
            >
              UnFinish
            </a>
          </li>
          <li>
            <a
              href="#"
              class="d-inline-block py-2"
              @click.prevent="status = 'finish'"
              :class="{ select: status === 'finish' }"
            >
              Finish
            </a>
          </li>
        </ul>
      </div>
      <div class="row justify-content-center">
        <ul class="list col-10 col-lg-8 list-unstyled">
          <li v-for="(item, index) in filterTodo" :key="item.id">
            <label :for="index" class="todo border d-flex justify-content-between p-2">
              <input type="checkbox" :id="index" v-model="item.complete" @change="doneTodo(item)" />
              <span>{{ item.content }}</span>
              <a href="#" class="delete-todo text-decoration-none"
              @click.prevent="deleteTodo(index)">X</a>
            </label>
          </li>
        </ul>
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
      const time = new Date();
      const newTodo = {
        id: time.getTime(),
        content: this.todoContent,
        complete: false,
      };
      this.todoList.push(newTodo);
      this.todoContent = '';

      this.updateLocalStorage();
    },
    deleteTodo(i) {
      this.todoList.splice(i, 1);
      this.updateLocalStorage();
    },
    doneTodo() {
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
  }
a {
  text-decoration: none;
}
.todo-status a{
  color: #fff;
}
.todo-status .select {
  color: rgb(0, 255, 157);
}
.todo input:checked ~ span {
  text-decoration: line-through;
}
.todo span {
  color: #fa0;
}
.todo .delete-todo{
  color: rgb(255, 56, 126);
}
</style>
