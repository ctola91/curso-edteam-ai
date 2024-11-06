import { category } from '~/utils/constants';
import { CATEGORIES, TOPICS } from './../utils/constants';
import { useStorage } from '@vueuse/core'

const geminiData = ref()
const loading = ref(false)

export const useGeminiStore = defineStore('gemini', () => {
  const data = useStorage('data_gemini', {
    categories: [],
    category: '',
    topic: ''
  })
  const categorySelected = useStorage("category", "")
  const topicSelected = useStorage("topic", "")
  const topics = useStorage("topics", TOPICS)
  const categories = useStorage("categories", CATEGORIES)
  const points = useStorage("points", 0)

  function parseData(gData) {
    data.value.category = categorySelected.value
    data.value.topic = topicSelected.value

    if(data.value.categories.length === 0) {
      data.value.categories.push({
        id: categorySelected.value,
        topics: [
          {
            id: topicSelected.value,
            data: gData
          }
        ]
      })
    }
    else {
      const index = data.value.categories.findIndex(i => i.id === categorySelected.value)

      if(index > -1) {
        const cat = data.value.categories[index]
        const topicIndex = cat.topics.findIndex(i => i.id === topicSelected.value)
        if(topicIndex > -1) {
          cat.topics[topicIndex].data = gData
        } else {
          cat.topics.push({
            id: topicSelected.value,
            data: gData
          })
        }
      } else {
        data.value.categories.push({
          id: categorySelected.value,
          topics: [{ id: topicSelected.value, data: gData}]
        })
      }
    }
  }
  
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
      categorySelected.value = payload.category
      topicSelected.value = payload.topic
      
      let result = res.data.replace('```json', '').replace('```', '')
      geminiData.value = JSON.parse(result)
      if(data.value) {
        parseData(geminiData.value)
      }
      
      loading.value = false

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
    categories,
    topics,
    categorySelected,
    topicSelected,
    points,
    loadGeminiData
  }
})