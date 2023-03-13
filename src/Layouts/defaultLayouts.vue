<template>
  <div class="container-fluid">
    <div class="row">
      <nav
        class="side-nav col-lg-2 d-lg-block sticky sticky-top overflow-hidden"
        ref="resizeBar"
      >
        <div
          class="d-flex justify-content-lg-center align-items-center justify-content-between gap-3 py-3"
        >
          <div class="d-flex justify-content-center align-items-center gap-3">
            <h2 class="mb-0 text-white">Todo</h2>

            <img src="../assets/logo.png" class="img-logo" />
          </div>
        </div>

        <div class="responsive">
          <div
            class="d-flex justify-content-center align-items-center pb-3 w-100"
          >
            <button
              class="btn text-white d-flex justify-content-center align-items-center gap-3 py-2 w-100 border-0 btn-bg"
              @click="isShown = !isShown"
            >
              <span>ADD NEW BOARD</span>

              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <transition name="fade">
            <div
              v-if="isShown"
              class="d-flex justify-content-center align-items-center flex-column gap-3 w-100 border-bottom border-top py-3"
            >
              <input
                type="text"
                class="form-control"
                placeholder="Write a board name"
                v-model="boardName"
              />

              <div
                class="d-flex justify-content-center align-items-center gap-3 w-100"
              >
                <button
                  @click="addBoardToArr"
                  class="btn btn-bg border-0 text-white w-50"
                  :disabled="!boardName.length || boardName.trim() == ''"
                >
                  Add
                </button>

                <button @click="closeToAdd" class="btn btn-light border-0 w-50">
                  Close
                </button>
              </div>
            </div>
          </transition>

          <transition-group tag="div" name="fade" class="scrolly overflow-auto">
            <Board
              v-for="category in todosStore.categories"
              :key="category.id"
              :board="category"
              @delBoard="delBoard"
            />
          </transition-group>
        </div>
      </nav>

      <div class="col-lg-10 p-0">
        <nav class="navbar navbar-expand-lg bg-nav-light-white">
          <div class="container-fluid">
            <div>
              <button class="btn">
                <i class="fa-solid fa-bars text-white fs-4"></i>
              </button>
            </div>

            <div>
              <a class="navbar-brand text-white fw-bold" href="#">Todo</a>
            </div>

            <div>
              <input
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
        </nav>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Board from "../components/Board.vue";
import { ref } from "vue";
import { useStore } from "../Store/Store";
import { useRouter } from "vue-router";
const router = useRouter();

let todosStore = useStore();

let isShown = ref(false);

let boardName = ref("");

const addBoardToArr = () => {
  let data = {
    id: crypto.randomUUID(),
    name: boardName.value,
    todos: [],
  };

  todosStore.addCategory(data);

  boardName.value = "";
  isShown.value = false;
};

const closeToAdd = () => {
  isShown.value = false;
  boardName.value = "";
};

let categories = localStorage.getItem("categories");
if (categories) {
  categories = JSON.parse(categories);
  todosStore.setCategories(categories);
}

const delBoard = (id) => {
  todosStore.deleteBoard(id);
  router.push("/");
};
</script>

<style scoped>
.side-nav {
  background-color: #272626;
  height: 100vh;
  transition: all 0.3s ease;
}
.img-logo {
  width: 40px;
}
.btn-bg {
  background: linear-gradient(
    to right,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  );
}
.btn-bg:hover {
  background: linear-gradient(
    to left,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  );
}
.btn-bg:active {
  transform: scale(0.97);
}
.scrolly {
  height: 495px;
  scrollbar-width: thin;
}
.scrolly::-webkit-scrollbar {
  width: 4px;
}
.scrolly::-webkit-scrollbar-track {
  background-color: #272626;
}
.scrolly::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to top,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  );
}
.container-fluid {
  z-index: 1 !important;
}
button:active {
  transform: scale(0.97);
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

.bg-nav-light-white {
  background: linear-gradient(
    to right,
    #185abd,
    #2a8ae6,
    #2b8be7,
    #3c9fec,
    #53bbf4
  );
}
</style>
