import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useDoorsStore = defineStore("openedDoors", {
  state: () => {
    const route = useRoute();
    const allowAll = computed(() => route.query.allowAll !== undefined);
    const showAll = computed(() => route.query.showAll !== undefined);

    return {
      persistedOpenedDoors: [] as number[],
      doorsOrder: [] as number[],
      allowAll: allowAll,
      showAll: showAll,
    };
  },
  actions: {
    openDoor(day: number) {
      const currentDay = new Date().getDate();

      if (day > currentDay && !this.allowAll) {
        window.alert(`It's not time to open door ${day} yet!`);
        return;
      }

      if (!this.persistedOpenedDoors.includes(day)) {
        this.persistedOpenedDoors.push(day);
      }
    },
    resetDoors() {
      this.persistedOpenedDoors = [];
      this.doorsOrder = generateDoorsOrder();
    },
    initializeDoorsOrder() {
      if (this.doorsOrder.length === 0) {
        this.doorsOrder = generateDoorsOrder();
      }
    },
  },
  getters: {
    openedDoors(state) {
      if (state.showAll) {
        const allDoors = Array.from({ length: 24 }, (_, i) => i + 1);
        return allDoors;
      } else {
        return state.persistedOpenedDoors;
      }
    }
  },
  persist: {
    paths: ['persistedOpenedDoors', 'doorsOrder'],
  },
});

function generateDoorsOrder(): number[] {
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  return days.sort(() => Math.random() - 0.5);
}