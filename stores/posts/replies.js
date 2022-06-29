import { defineStore } from 'pinia'

export const useRepliesStore = defineStore('posts/replies', {
  state: () => {
    return {
      mode: null,
      parent: {},
    }
  }
})