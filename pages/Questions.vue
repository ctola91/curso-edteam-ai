<script lang="ts" setup>
import { useGeminiStore } from '~/store/gemini';


const gemini = useGeminiStore()
const { data: questions } = storeToRefs(gemini)

// futbol, cultura general, comida, etc
const topic = ref('')
// bolivia, argentina, peru, etc : mundo
const country = ref('')

const onSubmit = async () => {
  const form = {
    category: country.value,
    topic: topic.value
  }
  await gemini.loadGeminiData(form)
}
</script>
<template>
  <form @submit.prevent="onSubmit">
    <h1>Questions</h1>
    <div class="flex">
      <UInput v-model="topic" placeholder="tema" />
    </div>
    <div class="flex">
      <label>Pais: </label>
      <input v-model="country" />
    </div>
    <div class="flex">
      <button type="submit">Generar</button>
    </div>
  </form>
  <div clas="result" v-if="questions.length > 0">
    <div v-for="q in questions" :key="q.pregunta">
      {{ q.pregunta }} - {{ q.correcta }}<br />
      {{ q.respuestas }}
    </div>
  </div>
</template>
