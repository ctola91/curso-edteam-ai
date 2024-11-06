<template>
  <div class="flex flex-col gap-3">
    <h1>Escoga una categoria</h1>
    <div class="flex flex-row flex-wrap gap-6">
      <UCard :ui="{ base: 'cursor-pointer w-full', mode: 'override', body: { padding: 'px-3 -y-2 sm:p-4'}}">
        <URadioGroup v-model="categorySelected" :options="categories" />
      </UCard>
    </div>
    <template v-if="categorySelected">
      <h2>Escoga un Tema</h2>
      <div>
        <UCard>
          <URadioGroup v-model="topicSelected" :options="topics" />
        </UCard>
      </div>
    </template>
    <UButton label="Iniciar" block to="/game" />
  </div>
</template>
<script lang="ts" setup>
import { useGeminiStore } from '~/store/gemini';

const store = useGeminiStore()
const { loading, categories: cats, topics: tops, data, categorySelected, topicSelected} = storeToRefs(store)

const categories = computed(() => {
  if(data.value && data.value.categories.length === 0)
    return []
  return data.value.categories.map(i => ({ label: i.id, value: i.id}))
})

const topics = computed(() => {
  if(categories.value.length === 0)
    return []
  const cat = data.value.categories.find(i => i.id === categorySelected.value)
  if(cat)
    return cat.topics.map(i => ({ label: i.id, value: i.id}))
  else
    return []
})
</script>
