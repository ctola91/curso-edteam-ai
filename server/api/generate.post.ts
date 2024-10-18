import { GoogleGenerativeAI } from "@google/generative-ai"
import { format, PROMPT } from "~/utils/constants"

const genAI = new GoogleGenerativeAI(process.env.NUXT_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'})

let prompt = ''

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  prompt = `${PROMPT} ${body.topic} de ${body.category} ${format}`
  const result = await model.generateContent(prompt)
  return {
    data: result.response.text()
  }
})