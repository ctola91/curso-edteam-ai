import { GoogleGenerativeAI } from "@google/generative-ai"
import { category, format, PROMPT, topic } from "~/utils/constants"

const genAI = new GoogleGenerativeAI(process.env.NUXT_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'})

const prompt = `${PROMPT} ${category} de ${topic} ${format}`

export default defineEventHandler(async (event) => {
  const result = await model.generateContent(prompt)
  return {
    data: result.response.text()
  }
})