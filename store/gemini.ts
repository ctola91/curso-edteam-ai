import { useStorage } from '@vueuse/core'

const geminiData = ref()
const loading = ref(false)

export const useGeminiStore = defineStore('gemini', () => {
  const data = useStorage('data_gemini', {})

  const loadGeminiData = async (payload: { category: string, topic: string}) => {
    try {
      loading.value = true
      const res = await $fetch(`/api/generate`, {
        method: 'POST',
        body: payload
      })

      if(!res.data) {
        loading.value = false
        return false
      }
      // geminiData.value = res.data
      let result = res.data.replace('```json', '').replace('```', '')
      geminiData.value = JSON.parse(result)
      loading.value = false

      data.value = geminiData.value
      return geminiData.value
    } catch(e) {
      console.log(e)
      loading.value = false
      return e
    }
  }

  return {
    data,
    geminiData,
    loading,
    loadGeminiData
  }
})