<template>
  <div class="wrapper">
    <InputTodo />
    <TodoStatus />
    <ListView />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import InputTodo from '../components/InputTodo.vue';
import TodoStatus from '../components/TodoStatus.vue';
import ListView from '../components/ListView.vue';

export default {
  components: {
    InputTodo,
    TodoStatus,
    ListView,
  },
  setup() {
    const store = useStore();
    store.commit('initLocalStorage');

    onMounted(() => {
      store.commit('transformData');
    });
  },
};
</script>

<style lang="scss">
.wrapper{
  background: #333;
  height: 100vh;
  overflow:auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
a {
  text-decoration: none;
}

</style>
