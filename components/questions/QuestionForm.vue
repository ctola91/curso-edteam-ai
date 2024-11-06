<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-2xl text-center">
      Generar Preguntas
    </h2>
    <UForm :schema="schema" :state="state" @submit="onSubmit"
      class="flex flex-col align-start gap-2 self-stretch w-full">
      <UFormGroup label="Pais" name="category">
        <USelectMenu v-model="state.category" :options="cats" placeholder="Seleccione una opcion" />
      </UFormGroup>
      <UFormGroup v-if="state.category !== '' && state.category === 'Otro'" label="Agregue un Pais"
        name="custom-category">
        <UInput
          v-model="customCategory"
          placeholder="Introduzca un nuevo Pais" @keypress.enter="update('category')" />
      </UFormGroup>
      <UFormGroup label="Tema" name="topic">
        <USelectMenu
          v-model="state.topic"
          :options="tops" placeholder="Seleccione un Tema" />
      </UFormGroup>
      <UFormGroup v-if="state.topic !== '' && state.topic === 'Otro'" label="Agregue un nuevo tema" name="custom-topic">
        <UInput v-model="customTopic" placeholder="Tema" @keypress.enter="update('topic')" />
      </UFormGroup>
      <UButton :loading="loading" type="submit" block>Generar</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, Schema, type InferType } from 'yup';
import { useGeminiStore } from '~/store/gemini';
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()
const store = useGeminiStore()
const { categories, topics, loading } = storeToRefs(store)

const customCategory = ref('')
const customTopic = ref('')

const cats = computed(() => {
  return [...categories.value, 'Otro']
})
const tops = computed(() => {
  return [...topics.value, 'Otro']
})

const schema = object({
  topic: string().required('Este campo es requerido'),
  category: string().required('Este campo es requerido')
})

const state = reactive({
  topic: undefined,
  category: undefined
})

async function reset() {
  state.category = '',
    state.topic = ''
}

const update = (t: string) => {
  if (t === 'topic') {
    topics.value.push(customTopic.value)
    state.topic = customTopic.value
  } else if (t === 'category') {
    categories.value.push(customCategory.value)
    state.category = customCategory.value
  }
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const form = {
    topic: event.data.topic,
    category: event.data.category
  }
  const res = await store.loadGeminiData(form)

  if(!res)
    toast.add({ title: 'Ha ocurrido un error al generar las preguntas, intente de nuevo'})

  reset()
}

</script>

<style scoped></style>