<template>
  <div class="wrapper">
    <InputTodo />
    <TodoStatus />
    <ListView />
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
  created() {
    this.$store.commit('initLocalStorage');
  },
  mounted() {
    this.$store.commit('transformData');
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
