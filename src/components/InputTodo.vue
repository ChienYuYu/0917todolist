<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-11 col-lg-6 d-flex justify-content-center mb-4">
        <input type="text"
          class="inputbar form-control"
          aria-label="輸入待辦"
          placeholder="請輸入待辦"
          v-model="todoContent"
          @keyup.enter="add"
        />
        <input type="submit"
          value="新增"
          class="submitbtn btn"
          :class="{'disabled': todoContent === ''}"
          @click="add"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['addTodo'],
  data() {
    return {
      todoContent: '',
      tempArr: [],
    };
  },
  created() {
    this.tempArr = this.todoList;
  },
  methods: {
    add() {
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
        this.addTodo(newTodo);
        this.todoContent = '';
        this.$emitter.emit('defaultStatus', 'all'); // mitt到 TodoStatus.vue
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
