import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type snake from '@/views/Game/snake'

export const useUsersStore = defineStore('users', {
  state: () => ({ users: [] as Array<snake> }),
  actions: {
    update(upUsers: Array<snake>) {
      this.users = upUsers
    }
  }
}
)
