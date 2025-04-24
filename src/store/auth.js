import { piniaStore } from '../store'
export const useCountStore = defineStore('auth', {
  state: () => {
    return {
      isAdmin: false
    }
  },
  actions: {
    ChangeAdm(isAdmin) {
      this.isAdmin = isAdmin
    }
  }
})

export function useOutsideCountStore() {
  return useCountStore(piniaStore)
}
