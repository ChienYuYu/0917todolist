<template>
  <div class="container">
    <div class="row justify-content-center">
      <ul class="todo-status col-10 col-lg-6 mb-4 list-unstyled d-flex    justify-content-between">
        <li class="">
          <a
            href="#"
            class="d-inline-block p-2"
            @click.prevent="status = 'all'"
            @click="sendStatus"
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
            @click="sendStatus"
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
            @click="sendStatus"
            :class="{ select: status === 'finish' }"
            >
            已完成 ({{ finishedNum.length }})
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todoList'],
  data() {
    return {
      status: 'all',
    };
  },
  mounted() {
    // InputTodo.vue mitt過來的
    // 這裡接收，將狀態改寫 'all'
    this.$emitter.on('defaultStatus', (data) => {
      this.status = data;
    });
    this.sendStatus(); // 當前狀態mitt到 ListView.vue
  },
  computed: {
    unfinishNum() {
      return this.todoList.filter((item) => item.complete === false);
    },

    finishedNum() {
      return this.todoList.filter((item) => item.complete === true);
    },
  },
  methods: {
    sendStatus() {
      this.$emitter.emit('status', this.status); // mitt到 ListView.vue
    },
  },
};
</script>

<style lang="scss" scoped>
  .todo-status{
    a{
      color: #fff;
      text-decoration: none;
    }
    .select{
      color: rgb(0, 255, 157);
    }
  }
</style>
