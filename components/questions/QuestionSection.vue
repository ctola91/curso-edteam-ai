<template>
  <div>
    <div class="pt-4">
      <div v-if="loading">
        <USkeleton class="h4 w-[320px]" />
        <USkeleton class="h4 w-[320px]" />
        <USkeleton class="h4 w-[320px]" />
      </div>
      <div v-else>
        <UAccordion :items="buildQuestions">
          <template #item="{ item }">
            {{ item.correcta }}
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

const store = useGeminiStore()
const { data, loading, categorySelected, topicSelected } = storeToRefs(store)

const buildQuestions = computed(() => {
  if (data.value) {
    if (categorySelected.value !== '' && topicSelected.value !== '') {
      if (data.value.categories) {
        let cs = data.value.categories.find(i => i.id === categorySelected.value)

        const questions = cs.topics.find(i => i.id === topicSelected.value)

        if(questions.data.length > 0) {
          return questions.data.map(q => ({
            label: q.pregunta,
            ...q
          }))
        }
      }
    }
  }

  return []
})
</script>

<style scoped></style>