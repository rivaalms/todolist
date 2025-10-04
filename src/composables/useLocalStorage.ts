import { ref, watch } from "vue"

/**
 * localStorage state reaktif.
 *
 * Menyediakan state reaktif yang otomatis menyimpan dan mengambil data dari `localStorage`.
 *
 * @param key — Key untuk menyimpan dan mengambil data dari `localStorage`
 * @param defaultValue — Nilai default jika data dari `localStorage` tidak ditemukan
 *
 * @returns Reactive state yang terhubung dengan localStorage.
 */
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
