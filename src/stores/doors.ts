import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useDoorsStore = defineStore('openedDoors', {
  state: () => {
    const route = useRoute();
    const previewMode = computed(() => route.query.preview !== undefined);

    return {
      persistedOpenedDoors: [] as number[],
      previewMode: previewMode,
    };
  },
  actions: {
    openDoor(id: number) {
      // todo validation - don't allow opening all doors
      if (!this.persistedOpenedDoors.includes(id)) {
        this.persistedOpenedDoors.push(id);
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