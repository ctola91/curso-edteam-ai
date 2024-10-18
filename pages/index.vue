<script lang="ts" setup>
// import { useGeminiStore } from '~/store/gemini';
//   const questions = ref([])

//   const gemini = useGeminiStore()
//   const { geminiData: data, loading } = storeToRefs(gemini)

  // onMounted(async () => {
  //   await gemini.loadGeminiData()
  //   if(data.value) {
  //     questions.value = data.value
  //   }
  // })
</script>
<template>
  <div>
    <h1>Hola AI</h1>
    <!-- <div v-if="loading">
      Cargando...
    </div>
    <div v-else>
      <div v-for="q in questions" :key="q.pregunta">
        {{ q.pregunta }} - {{ q.correcta }}
      </div>
    </div> -->
  </div>
</template>
