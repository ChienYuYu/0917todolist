<template>
  <div class="container">
    <div class="row justify-content-center">
      <ul class="list col-11 col-lg-8 list-unstyled">
        <transition-group>
          <li v-for="item in filterTodo" :key="item.id">
            <label :for="item.id" class="todo-item border d-flex ps-3">
              <input class="todo-check" type="checkbox" :id="item.id" @change="checkDone(item.id)"
                :checked="item.done === true" />
              <span class="text-truncate p-3 ms-auto">{{ item.content }}</span>
              <a href="#" class="ms-auto p-3" @click.prevent="editTodo(item, item.id)">
                <i class="bi bi-pencil-fill edit-icon" />
                <span class="d-none">1</span>
                <!-- ↑隨便寫個東西才不會報錯 用d-none隱藏 -->
              </a>
              <a href="#" class="delete-todo p-3" @click.prevent="removeTodo(item.id)">X</a>
            </label>
          </li>
        </transition-group>
      </ul>
      <h3 class="text-light py-5" v-show="noTodo === '尚無待辦事項'" >{{ noTodo }}</h3>
      <h3 class="text-light py-5" v-show="noTodo === '尚無待完成事項'" >{{ noTodo }}</h3>
      <h3 class="text-light py-5" v-show="noTodo === '尚無完成事項'" >{{ noTodo }}</h3>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const filterTodo = computed(() => {
      if (store.state.status === 'unDone') {
        return store.getters.unDoneTodo;
      }
      if (store.state.status === 'done') {
        return store.getters.doneTodo;
      }
      return store.state.todos;
    });

    const noTodo = computed(() => {
      if (store.state.todos.length === 0) {
        return '尚無待辦事項';
      }
      if (store.state.status === 'unDone' && store.getters.unDoneTodo.length === 0) {
        return '尚無待完成事項';
      }
      if (store.state.status === 'done' && store.getters.doneTodo.length === 0) {
        return '尚無完成事項';
      }
      return '';
    });

    function removeTodo(id) {
      if (window.confirm('確認刪除?')) {
        store.commit('deleteTodo', id);
        store.commit('updateLocalStorage');
      }
    }
    function editTodo(item, id) {
      const newTodo = prompt('編輯待辦', item.content);
      if (newTodo) {
        store.commit('editTodo', { newTodo, id });
      }
      store.commit('updateLocalStorage');
    }
    function checkDone(id) {
      store.commit('doneSwitch', id);
      store.commit('updateLocalStorage');
    }

    return {
      filterTodo,
      noTodo,
      removeTodo,
      editTodo,
      checkDone,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-item input {
  transform: scale(130%);
}

.todo-item input:checked~span {
  text-decoration: line-through;
}

.todo-item span {
  color: #fa0;
}

.todo-item .edit-icon {
  color: #ddd;
}

.todo-item .delete-todo {
  color: rgb(255, 56, 126);
}

// 動畫-----------------------------
.v-enter-active {
  animation: in-out .6s;
}

.v-leave-active {
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
