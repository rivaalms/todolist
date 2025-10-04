import { ref, watch } from "vue"

export function useLocalStorage<T>(key: string, defaultValue: T) {
   const storedValue = localStorage.getItem(key)

   const state = ref<T>(storedValue ? (JSON.parse(storedValue) as T) : defaultValue)

   watch(
      state,
      (value) => {
         localStorage.setItem(key, JSON.stringify(value))
      },
      { deep: true },
   )

   return state
}
