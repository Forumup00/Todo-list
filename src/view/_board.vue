<template>
  <div
    class="d-flex justify-content-between align-items-center m-2 z-index-top"
  >
    <h5 class="mb-0 text-white bg-dark p-2 rounded-3">{{ category.name }}</h5>

    <button
      class="btn text-white px-5 py-2 bg-light-white border-0"
      @click="showpopup = true"
    >
      Add List
    </button>

    <transition name="fadeOba">
      <ListPopUp
        v-if="showpopup"
        @close="showpopup = false"
        @addList="addList"
      />
    </transition>
  </div>

  <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    :navigation="true"
    :pagination="{
      dynamicBullets: true,
    }"
    class="mySwiper px-2"
  >
    <swiper-slide v-for="list in category.todos" :key="list.id">
      <List :list="list" @delList="delList" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import ListPopUp from "../components/ListPopUp.vue";
import List from "../components/List.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../Store/Store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";

const route = useRoute();

const todosStore = useStore();

const category = ref(null);

let showpopup = ref(false);

const addList = (list) => {
  let data = {
    id: crypto.randomUUID(),
    listName: list,
    todoList: [],
  };
  todosStore.addTodo(category.value.id, data);
  showpopup.value = false;
};

const delList = (id) => {
  category.value.todos = category.value.todos.filter((e) => e.id !== id);
  localStorage.setItem("categories", JSON.stringify(todosStore.categories));
};

watch(
  () => route.params.id,
  () => {
    category.value = todosStore.getCategory(route.params.id);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.z-index-top {
  z-index: 2;
}
.clickable {
  cursor: all-scroll;
}
.fade-enter-from {
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-to {
  transform: scale(0);
}
.fade-leave-active {
  transition: all 0.3s ease;
}

.fadeOba-enter-from {
  opacity: 0;
}

.fadeOba-enter-active {
  transition: all 0.3s ease;
}

.fadeOba-leave-to {
  opacity: 0;
}
.fadeOba-leave-active {
  transition: all 0.3s ease;
}
</style>
