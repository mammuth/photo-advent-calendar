import { defineStore } from 'pinia';

export const useDoorsStore = defineStore('openedDoors', {
  state: () => ({
    openedDoors: [],
  }),
  actions: {
    openDoor(id) {
        // todo validation?
        this.openedDoors.push(id);
    },
  },
  persist: true,
});