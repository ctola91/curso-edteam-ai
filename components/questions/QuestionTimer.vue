<template>
  <div class="flex flex-col gap-5 align-center justify-center">
    <div class="text-9xl text-center">
      {{ countDown }}
    </div>
    <div class="w-80 m-auto">
      <UProgress size="2xl" :max="10" :value="countDown" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['sendTimerData'])

const countDown = ref(10) // tiempo de respuesta

const countDownTimer = () => {
  if(countDown.value > 0) {
    setTimeout(() => {
      countDown.value -= 1
      countDownTimer()
    }, 1000)
  } else {
    emit('sendTimerData')
  }
}

onMounted(() => {
  countDownTimer()
})
</script>

<style scoped>

</style>