import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    categories: [],
  }),
  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
    addCategory(category) {
      this.categories.push(category);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    addTodo(catId, todo) {
      let category = this.categories.find((cat) => cat.id === catId);
      category.todos.push(todo);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    deleteBoard(id) {
      this.categories = this.categories.filter((e) => e.id !== id);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    editBoard(obj) {
      const item = this.categories.find((e) => e.id == obj.id);
      item.name = obj.name;
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
  },
  getters: {
    getCategory: (state) => (id) => {
      return state.categories.find((cat) => cat.id === id);
    },
  },
});
