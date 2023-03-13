<template>
  <div
    class="py-2 border-bottom d-flex justify-content-center align-items-center position-relative"
  >
    <button
      @click="$router.push(`/board/${board.id}`)"
      class="btn bg-light-white text-white border-0 py-2 px-3 flex-grow-1"
      v-if="!isAppear"
    >
      {{ board.name }}
    </button>

    <button
      v-if="!isAppear"
      class="btn border-0 py-2"
      @click="isShown = !isShown"
    >
      <i class="fa-solid fa-ellipsis-vertical text-white fs-4"></i>
    </button>

    <transition name="dropdownFade">
      <div
        class="bg-white rounded w-50 position-absolute end-0"
        style="bottom: -60px; z-index: 1"
        v-if="isShown"
      >
        <button
          class="btn w-100"
          @click="
            isAppear = !isAppear;
            isShown = false;
          "
        >
          Edit
        </button>

        <button
          class="btn w-100"
          @click="
            $emit('delBoard', board.id);
            isShown = false;
          "
        >
          Delete
        </button>
      </div>
    </transition>

    <EditBoard
      v-if="isAppear"
      :board="board"
      @close="isAppear = false"
      @changeBoard="changeBoard"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../Store/Store";
import EditBoard from "./EditBoard.vue";

const todosStore = useStore();

const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: null,
  },
});

const isShown = ref(false);

const isAppear = ref(false);

const changeBoard = (obj) => {
  todosStore.editBoard(obj);
};

const emit = defineEmits(["delBoard"]);
</script>

<style scoped>
.bg-light-white {
  background: linear-gradient(
    to left,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  ) !important;
}
.bg-light-white:hover {
  background: linear-gradient(
    to right,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  ) !important;
}
button:active {
  transform: scale(0.97) !important;
}
.dropdownFade-enter-from {
  transform: scale(0);
}
.dropdownFade-enter-active {
  transition: all 0.3s ease-in-out;
}

.dropdownFade-leave-to {
  transform: scale(0);
}
.dropdownFade-leave-active {
  transition: all 0.3s ease;
}
</style>
