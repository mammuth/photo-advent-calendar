import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useDoorsStore = defineStore("openedDoors", {
  state: () => {
    const route = useRoute();
    const previewMode = computed(() => route.query.preview !== undefined);

    return {
      persistedOpenedDoors: [] as number[],
      previewMode: previewMode,
    };
  },
  actions: {
    openDoor(day: number) {
      const currentDay = new Date().getDate();

      if (day > currentDay && !this.previewMode) {
        window.alert(`It's not time to open door ${day} yet!`);
        return;
      }

      if (!this.persistedOpenedDoors.includes(day)) {
        this.persistedOpenedDoors.push(day);
      }
    },
    resetDoors() {
      this.persistedOpenedDoors = [];
    },
  },
  getters: {
    openedDoors(state) {
      if (state.previewMode) {
        const allDoors = Array.from({ length: 24 }, (_, i) => i + 1);
        return allDoors;
      } else {
        return state.persistedOpenedDoors;
      }
    },
  },
  persist: true,
});
