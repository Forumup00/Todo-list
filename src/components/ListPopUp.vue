<template>
  <div
    class="popup w-100 h-100 position-fixed top-0 start-0 d-flex justify-content-center align-items-start"
  >
    <div class="frame w-50 bg-white rounded-2 mt-5 p-4">
      <div
        class="text-dark border-bottom d-flex justify-content-between align-items-center mb-2 pb-2"
      >
        <h3 class="mb-0">Add New List</h3>

        <button class="btn p-0 border-0" @click="$emit('close')">
          <i class="fa-solid fa-xmark fs-3"></i>
        </button>
      </div>

      <form @submit.prevent="$emit('addList', newList)">
        <div class="mb-3">
          <label for="title" class="form-label">New List Title</label>

          <input
            type="text"
            id="title"
            class="form-control"
            placeholder="Enter List title"
            v-model="newList"
          />
        </div>

        <div class="d-flex justify-content-end align-items-center gap-3">
          <button
            class="btn btn-primary px-5 py-2"
            type="submit"
            :disabled="!newList.length || newList.trim() == ''"
          >
            Add
          </button>

          <button
            class="btn btn-danger px-3 py-2"
            type="button"
            @click="$emit('close')"
          >
            close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newList = ref("");

const emit = defineEmits(["close", "addList"]);
</script>

<style scoped>
.popup {
  background-color: rgba(0, 0, 0, 0.522);
  z-index: 2;
}
</style>
