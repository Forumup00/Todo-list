<template>
  <form
    @submit.prevent
    class="d-flex justify-content-between align-items-center gap-1"
    style="padding-block: 1.35px"
  >
    <textarea rows="1" cols="23" class="form-control" v-model="bodyValue">
    </textarea>

    <div class="d-flex justify-content-between align-items-center gap-2">
      <button
        type="button"
        class="btn border-0 p-0"
        @click="$emit('editBody', { id: p.id, body: bodyValue })"
      >
        <i class="fa-solid fa-circle-check confirmation fs-5"></i>
      </button>

      <button type="button" class="btn border-0 p-0" @click="$emit('close')">
        <i class="fa-solid fa-circle-xmark text-danger fs-5"></i>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  p: {
    type: Object,
    required: true,
    default: null,
  },
});

const bodyValue = ref(props.p.body);

const emit = defineEmits(["editBody", "close"]);
</script>

<style scoped>
.confirmation {
  color: #53bbf4;
}
</style>
