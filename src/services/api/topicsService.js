import topicsData from '../mockData/topicsData.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const topicsService = {
  // Get all topics
  async getTopics() {
    await delay(300)
    return [...topicsData]
  },

  // Get topic by ID
  async getTopicById(id) {
    await delay(200)
    const topic = topicsData.find(t => t.id === id)
    if (!topic) {
      throw new Error('Topic not found')
    }
    return { ...topic }
  }
}