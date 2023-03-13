<template>
  <div
    class="d-flex justify-content-between align-items-start list-todo border-bottom p-1"
  >
    <p v-if="!isAppear" class="mb-0 text-white py-2 px-3 text-break">
      {{ p.body }}
    </p>

    <div
      v-if="!isAppear"
      class="d-flex justify-content-center align-items-center gap-2"
    >
      <button
        @click="isAppear = true"
        class="btn d-flex justify-content-center align-items-center px-1"
      >
        <i class="fa-solid fa-pen-to-square text-white"></i>
      </button>

      <button
        class="btn d-flex justify-content-center align-items-center px-1"
        @click="$emit('deleteTodo', p.id)"
      >
        <i class="fa-solid fa-trash text-white"></i>
      </button>
    </div>

    <EditBody
      v-if="isAppear"
      :p="p"
      @editBody="editBody"
      @close="isAppear = false"
    />
  </div>
</template>

<script setup>
import EditBody from "./EditBody.vue";
import { ref } from "vue";
import { useStore } from "../Store/Store";
const todosStore = useStore();

const props = defineProps({
  p: {
    type: Object,
    required: true,
    default: null,
  },
});

const isAppear = ref(false);

const editBody = (obj) => {
  props.p.body = obj.body;
  isAppear.value = false;
  localStorage.setItem("categories", JSON.stringify(todosStore.categories));
};
</script>

<style scoped>
.list-todo {
  background-color: #272626;
  transition: all 0.3s ease;
}
</style>
