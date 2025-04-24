import { piniaStore } from '../store'
export const useUserStore = defineStore('auth', {
  state: () => {
    return {
      isAdmin: false,
      username: ''
    }
  },
  actions: {
    ChangeAdm(isAdmin) {
      this.isAdmin = isAdmin
    },
    ChangeUser(username) {
      this.username = username
    }
  }
})

export function useUserCountStore() {
  return useUserStore(piniaStore)
}
