import customContentData from '@/services/mockData/customContentData.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getTopics = async () => {
  await delay(300)
  return [...customContentData.topics]
}

export const getTopicById = async (id) => {
  await delay(200)
  const topic = customContentData.topics.find(topic => topic.id === id)
  return topic ? { ...topic } : null
}

export default {
  getTopics,
  getTopicById
}