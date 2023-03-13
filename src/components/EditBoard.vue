<template>
  <form @submit.prevent>
    <div class="mb-2">
      <input type="text" class="form-control" v-model="valueToEdit" />
    </div>

    <div class="d-flex justify-content-center align-items-center gap-2">
      <button
        type="button"
        class="btn bg-light-white text-white border-0 flex-grow-1"
        @click="
          $emit('changeBoard', { id: board.id, name: valueToEdit });
          $emit('close');
        "
      >
        Change
      </button>

      <button
        type="button"
        class="btn btn-danger flex-grow-1"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: null,
  },
});

const valueToEdit = ref(props.board.name);

const emit = defineEmits(["close", "changeBoard"]);
</script>

<style scoped></style>
