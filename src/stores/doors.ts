import { defineStore } from 'pinia';

export const useDoorsStore = defineStore('openedDoors', {
  state: () => ({
    openedDoors: [] as number[],
  }),
  actions: {
    openDoor(id: number) {
        // todo validation?
        this.openedDoors.push(id);
    },
  },
  persist: true,
});