<template>
  <div>
    <template v-if="isFinished">
      <div class="flex flex-col gap-3 w-80 m-auto">
        <UCard :ui="uiFinishedCard">
          <p class="text-lg">Felicidades Terminaste</p>
          <p class="text-sm">Su puntaje es:</p>
          <p class="text-9xl">{{ points }}</p>
        </UCard>
        <UButton block label="Empezar de nuevo" to="/start-game" />
        <ConfettiExplosion :particleCount="200" :force="0.3" />
      </div>
    </template>
    <template v-for="(question, index) in questions" :key="question.pregunta">
      <template v-if="index === questionIndex">
        <div class="flex flex-col gap-8">
          <UCard>
            <div class="flex flex-col gap-2">
              <h1 class="text-4xl text-center font-bold">
                {{ question.pregunta }}
              </h1>
            </div>
          </UCard>
          <QuestionTimer @send-timer-data="onSendTimerData" />
          <div class="flex gap-4 m-auto">
            <UButton v-for="respuesta in question.respuestas" :key="respuesta" size="xl" color="gray" :label="respuesta"
              @click="selectAnswer(question, respuesta)" />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
import ConfettiExplosion from 'vue-confetti-explosion'
import QuestionTimer from '~/components/questions/QuestionTimer.vue';
import { useGeminiStore } from '~/store/gemini';

const questionIndex = ref(0)
const isFinished = ref(false)

const store = useGeminiStore()
const { categorySelected, topicSelected, data, points } = storeToRefs(store)

const questions = computed(() => {
  let result = []

  const cat = data.value.categories.find(i => i.id === categorySelected.value)

  if (cat) {
    let top = cat.topics.find(i => i.id === topicSelected.value)
    result = top.data
  }

  return result
})

const uiFinishedCard = {
  mode: 'override',
  base: 'w-[320px]',
  body: {
    base: 'flex flex-col gap-2 justify-center align-center text-center'
  }
}

function selectAnswer(question, res) {
  if (question.correcta === res)
    points.value++ // subir el puntaje en 1
  else
    points.value-- // baje el puntaje en 1
  questionIndex.value++

  if (questionIndex.value === questions.value.length)
    isFinished.value = true
}

function onSendTimerData() {
  questionIndex.value++
}
</script>