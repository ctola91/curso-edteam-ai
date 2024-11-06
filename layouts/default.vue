<template>
  <div class="flex justify-center align-center gap-8" :class="{ 'flex-col': smallerThanSm }">
    <template v-if="route.fullPath !== '/' && route.fullPath !== '/game'">
      <UHorizontalNavigation v-if="smallerThanSm" :links="links" />
      <UVerticalNavigation v-else :links="links" />
    </template>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')

const route = useRoute()
const links = [
  {
    label: 'Iniciar Juego',
    icon: 'i-heroicons-puzzle-piece',
    to: '/start-game',
  },
  {
    label: 'Generar Preguntas',
    icon: 'i-heroicons-question-mark-circle',
    to: '/questions',
  }
]
</script>

<style scoped></style>