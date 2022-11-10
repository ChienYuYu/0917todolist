<template>
  <div class="container">
    <div class="row justify-content-center">
      <ul class="todo-status col-10 col-lg-6 mb-4 list-unstyled d-flex    justify-content-between">
        <li>
          <a
            href="#"
            class="d-inline-block p-2"
            @click.prevent="sendStatus('all')"
            :class="{ select: status === 'all' }"
            >
            全部 ({{allTodo}})
          </a>
        </li>
        <li>
          <a
            href="#"
            class="d-inline-block py-2"
            @click.prevent="sendStatus('unDone')"
            :class="{ select: status === 'unDone' }"
            >
            待完成 ({{unDoneTodo}})
          </a>
        </li>
        <li>
          <a
            href="#"
            class="d-inline-block py-2"
            @click.prevent="sendStatus('done')"
            :class="{ select: status === 'done' }"
            >
            已完成 ({{doneTodo}})
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const status = ref('all');

    const allTodo = computed(() => store.state.todos.length);
    const unDoneTodo = computed(() => store.getters.unDoneTodo.length);
    const doneTodo = computed(() => store.getters.doneTodo.length);

    const sendStatus = (newStatus) => {
      status.value = newStatus;
      store.commit('statusChange', newStatus);
    };

    return {
      status,
      allTodo,
      unDoneTodo,
      doneTodo,
      sendStatus,
    };
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
