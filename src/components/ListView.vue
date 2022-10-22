<template>
  <div class="container">
    <div class="row justify-content-center">
      <ul class="list col-11 col-lg-8 list-unstyled">
        <transition-group>
          <li v-for="(item, index) in filterTodo" :key="item.id">
            <label :for="index" class="todo-item border d-flex ps-3">
              <input class="todo-check" type="checkbox" :id="index" v-model="item.complete"
                @change="updateLocalStorage" />
              <span class="text-truncate p-3 ms-auto">{{ item.content }}</span>
              <a href="#" class="ms-auto p-3" @click.prevent="editTodo(item, index)">
                <i class="bi bi-pencil-fill edit-icon" />
                <span class="d-none">1</span>
                <!-- ↑隨便寫個東西才不會報錯 用d-none隱藏 -->
              </a>
              <a href="#" class="delete-todo p-3"
              @click.prevent="removeTodo(index)">X</a>
            </label>
          </li>
        </transition-group>
      </ul>
      <h3 class="text-light py-5"
        v-if="todoList.length === 0">尚無待辦事項</h3>
      <h3 class="text-light py-5"
        v-else-if="status === 'unfinish' && filterTodo.length === 0">尚無待完成事項</h3>
      <h3 class="text-light py-5"
        v-else-if="status === 'finish' && filterTodo.length === 0">尚無完成事項</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todoList', 'deleteTodo', 'updateTodo', 'updateLocalStorage'],
  data() {
    return {
      status: 'all',
    };
  },
  mounted() {
    // 取得狀態 ， TodoStatus.vue mitt過來的
    this.$emitter.on('status', (data) => {
      this.status = data;
      // console.log('測試測試', data);
    });
  },
  computed: {
    // 根據狀態篩選資料
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
  methods: {
    removeTodo(i) {
      if (window.confirm('確認刪除?')) {
        this.deleteTodo(i);
      }
    },
    editTodo(item, i) {
      const editTodo = prompt('編輯待辦', item.content);
      if (editTodo) {
        this.updateTodo(editTodo, i);
      }
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
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

  // 動畫-----------------------------
  .v-enter-active{
    animation: in-out .6s;
  }
  .v-leave-active{
    animation: in-out .6s reverse;
  }

  @keyframes in-out {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>
