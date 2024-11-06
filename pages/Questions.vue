<script lang="ts" setup>
import QuestionForm from '~/components/questions/QuestionForm.vue';
import QuestionSection from '~/components/questions/QuestionSection.vue';
import { useGeminiStore } from '~/store/gemini';

const gemini = useGeminiStore()
const { data: questions } = storeToRefs(gemini)
</script>
<template>
  <QuestionForm />
  <QuestionSection />
  <!-- <form @submit.prevent="onSubmit">
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
  </form> -->

  <!-- <div clas="result" v-if="questions.length > 0">
    <div v-for="q in questions" :key="q.pregunta">
      {{ q.pregunta }} - {{ q.correcta }}<br />
      {{ q.respuestas }}
    </div>
  </div> -->
</template>
