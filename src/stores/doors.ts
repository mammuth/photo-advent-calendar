import { defineStore } from "pinia";

export const useDoorsStore = defineStore("openedDoors", {
  state: () => ({
    persistedOpenedDoors: [] as number[],
    doorsOrder: [] as number[],
  }),
  actions: {
    openDoor(day: number, allowAll: boolean) {
      const currentDay = new Date().getDate();

      if (day > currentDay && !allowAll) {
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
    openedDoors: (state) => (showAll: boolean) => {
      const allDoors = Array.from({ length: 24 }, (_, i) => i + 1);
      return showAll ? allDoors : [...state.persistedOpenedDoors];
    },
  },
  persist: true,
});

function generateDoorsOrder(): number[] {
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  return days.sort(() => Math.random() - 0.5);
}
