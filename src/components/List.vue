<template>
  <div>
    <h5
      class="p-3 mb-0 text-white d-flex justify-content-between align-items-center rounded-top list-title"
      :class="!list.todoList.length && 'rounded'"
    >
      <span class="text-truncate" style="max-width: 190px">{{
        list.listName
      }}</span>

      <div class="d-flex justify-content-center align-items-center gap-3">
        <button class="btn border-0 p-0" @click="isShown = !isShown">
          <i class="fa-solid fa-plus text-light"></i>
        </button>

        <button class="btn border-0 p-0" @click="$emit('delList', list.id)">
          <i class="fa-solid fa-trash text-white"></i>
        </button>
      </div>
    </h5>

    <transition-group tag="div" name="fadeBody" class="todo-body overflow-auto">
      <ParagraphBody
        v-for="p in list.todoList"
        :key="p.id"
        :p="p"
        @deleteTodo="deleteTodo"
      />
    </transition-group>

    <transition name="fadeBody">
      <div
        v-if="isShown"
        class="d-flex justify-content-between align-items-center gap-3 p-1"
      >
        <textarea
          name="body"
          class="form-control"
          placeholder="Add todo"
          rows="1"
          v-model="todoVal"
        ></textarea>

        <button
          class="btn btn-warning"
          :disabled="!todoVal.length || todoVal.trim('') == ''"
          @click="AddTodoBody"
        >
          Add
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import ParagraphBody from "./ParagraphBody.vue";
import { ref } from "vue";
import { useStore } from "../Store/Store";
const todosStore = useStore();

const props = defineProps({
  list: {
    type: Object,
    required: true,
    default: null,
  },
});

const isShown = ref(true);

const todoVal = ref("");

const AddTodoBody = () => {
  let data = {
    id: crypto.randomUUID(),
    body: todoVal.value,
  };
  props.list.todoList.push(data);
  todoVal.value = "";
  localStorage.setItem("categories", JSON.stringify(todosStore.categories));
};

const deleteTodo = (id) => {
  props.list.todoList = props.list.todoList.filter((e) => e.id !== id);
  localStorage.setItem("categories", JSON.stringify(todosStore.categories));
};

const isAppear = ref(false);

const emit = defineEmits(["delList"]);
</script>

<style scoped>
.list-title {
  background: linear-gradient(
    to left,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  ) !important;
}
textarea:focus {
  box-shadow: 0 0 5px 2px #53bbf4 !important;
}
.todo-body {
  max-height: 71.03vh;
  scrollbar-width: thin;
  scrollbar-color: #6969dd #e0e0e0;
}
.todo-body::-webkit-scrollbar {
  width: 7px;
}
.todo-body::-webkit-scrollbar-track {
  background-color: #272626;
}
.todo-body::-webkit-scrollbar-thumb {
  background-color: #ffd75e;
  border-radius: 3px;
}

.todo-body > *:nth-last-child(1) {
  border-bottom: none !important;
  border-radius: 0 0 0.375rem 0.375rem !important;
}

.fadeBody-enter-from {
  transform: scale(0);
}

.fadeBody-enter-active {
  transition: all 0.3s ease;
}

.fadeBody-leave-to {
  transform: scale(0);
}
.fadeBody-leave-active {
  transition: all 0.3s ease;
}
</style>
