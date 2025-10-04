<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
   label: string
   color?: "blue" | "red" | "green" | "gray" | "yellow"
}>()

const colorClass = computed(() => {
   const colorMap = {
      blue: "bg-blue-500 hover:bg-blue-600",
      red: "bg-red-500 hover:bg-red-500",
      gray: "bg-gray-500 hover:bg-gray-600",
      yellow: "bg-yellow-500 hover:bg-yellow-600",
   }
   return colorMap[(props.color ?? "blue") as keyof typeof colorMap]
})
</script>

<template>
   <button
      :class="[colorClass, 'text-white px-3 py-1.5 text-sm rounded cursor-pointer font-medium']"
      v-bind="$attrs"
   >
      {{ props.label }}
   </button>
</template>
