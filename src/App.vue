<script setup lang="ts">
import { ref, shallowRef } from "vue"
import Button from "@/components/Button.vue"
import { useLocalStorage } from "./composables/useLocalStorage"

/**
 * Data berasal dari localStorage. Sehingga data tetap tersimpan
 * secara persisten meski aplikasi dimatikan atau browser ditutup.
 */
const data = useLocalStorage("todolist-data", [
   { id: 1, title: "Task awal", status: false },
   { id: 2, title: "Task awal yang selesai", status: true },
])

/**
 * Menghapus satu item dari `data`
 */
function onRemoveItem(index: number) {
   data.value.splice(index, 1)
}

/**
 * State untuk menampilkan/menyembunyikan form
 */
const isFormOpen = shallowRef(false)

/**
 * Form state
 */
const form = ref({
   title: "",
   status: false,
})

/**
 * Simpan informasi yang di input dari form
 * ke dalam state `data`.
 * Setelah itu reset dan tutup form
 */
function onSaveForm() {
   data.value.push({
      id: data.value.length + 1,
      title: form.value.title,
      status: form.value.status,
   })
   onCloseForm()
}

/**
 * Menutup/sembunyikan form dan reset form ke state awal
 */
function onCloseForm() {
   form.value = {
      title: "",
      status: false,
   }

   isFormOpen.value = false
}
</script>

<template>
   <div class="container mx-auto py-2 max-w-[40vw]">
      <div class="border border-gray-200 rounded-xl">
         <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
               <h1 class="text-2xl font-semibold">To-Do List</h1>
               <Button
                  label="Tambah"
                  @click="isFormOpen = true"
               />
            </div>
         </div>
         <div class="p-4">
            <ul class="flex flex-col divide-y divide-gray-200 *:py-4 first:pt-0 last:pb-0">
               <li
                  v-for="(item, index) in data"
                  class="flex gap-4 items-center"
               >
                  <input
                     type="checkbox"
                     :id="`cb-${item.id}`"
                     :checked="item.status"
                     @input="() => (item.status = !item.status)"
                  />
                  <div class="flex-1">
                     <label
                        :for="`cb-${item.id}`"
                        :class="{ 'line-through': item.status }"
                     >
                        {{ item.title }}
                     </label>
                  </div>
                  <div class="flex items-center">
                     <Button
                        label="Hapus"
                        color="red"
                        @click="onRemoveItem(index)"
                     />
                  </div>
               </li>
               <li
                  v-if="isFormOpen"
                  class="flex gap-4 items-center"
               >
                  <input
                     type="checkbox"
                     id="cb-form"
                     :checked="form.status"
                     @input="() => (form.status = !form.status)"
                  />
                  <div class="flex-1">
                     <input
                        type="text"
                        v-model="form.title"
                        class="border border-gray-200 rounded w-full shadow-xs py-1 px-2.5 text-sm"
                     />
                  </div>
                  <div class="flex items-center gap-1">
                     <Button
                        label="Simpan"
                        @click="onSaveForm"
                     />
                     <Button
                        label="Batal"
                        color="gray"
                        @click="onCloseForm"
                     />
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
