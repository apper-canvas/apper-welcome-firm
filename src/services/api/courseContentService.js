// Course Content Service
import courseContentData from '@/services/mockData/courseContentData.json'

class CourseContentService {
  constructor() {
    this.storageKey = 'courseContent'
    this.data = this.loadFromStorage()
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : courseContentData
    } catch (error) {
      console.error('Error loading course content from storage:', error)
      return courseContentData
    }
  }

  saveToStorage(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      this.data = data
    } catch (error) {
      console.error('Error saving course content to storage:', error)
      throw new Error('Failed to save content')
    }
  }

  async getAllTopics() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.data.topics].sort((a, b) => a.order - b.order)
  }

  async getTopicById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const topic = this.data.topics.find(t => t.id === id)
    if (!topic) {
      throw new Error('Topic not found')
    }
    return { ...topic }
  }

  async createTopic(topicData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // Validation
    if (!topicData.title?.trim()) {
      throw new Error('Topic title is required')
    }

    const newTopic = {
      id: `topic-${Date.now()}`,
      title: topicData.title.trim(),
      content: topicData.content || '<p>Add your content here...</p>',
      order: topicData.order || this.data.topics.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedData = {
      ...this.data,
      topics: [...this.data.topics, newTopic]
    }

    this.saveToStorage(updatedData)
    return { ...newTopic }
  }

  async updateTopic(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const topicIndex = this.data.topics.findIndex(t => t.id === id)
    if (topicIndex === -1) {
      throw new Error('Topic not found')
    }

    // Validation
    if (updates.title !== undefined && !updates.title?.trim()) {
      throw new Error('Topic title cannot be empty')
    }

    const updatedTopic = {
      ...this.data.topics[topicIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    const updatedTopics = [...this.data.topics]
    updatedTopics[topicIndex] = updatedTopic

    const updatedData = {
      ...this.data,
      topics: updatedTopics
    }

    this.saveToStorage(updatedData)
    return { ...updatedTopic }
  }

  async deleteTopic(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const topicIndex = this.data.topics.findIndex(t => t.id === id)
    if (topicIndex === -1) {
      throw new Error('Topic not found')
    }

    if (this.data.topics.length <= 1) {
      throw new Error('Cannot delete the last topic')
    }

    const updatedData = {
      ...this.data,
      topics: this.data.topics.filter(t => t.id !== id)
    }

    this.saveToStorage(updatedData)
    return { success: true }
  }

  async reorderTopics(topicIds) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const updatedTopics = topicIds.map((id, index) => {
      const topic = this.data.topics.find(t => t.id === id)
      if (!topic) {
        throw new Error(`Topic with id ${id} not found`)
      }
      return {
        ...topic,
        order: index + 1,
        updatedAt: new Date().toISOString()
      }
    })

    const updatedData = {
      ...this.data,
      topics: updatedTopics
    }

    this.saveToStorage(updatedData)
    return updatedTopics
  }

  async searchTopics(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    if (!query?.trim()) {
      return this.getAllTopics()
    }

    const searchTerm = query.toLowerCase().trim()
    return this.data.topics
      .filter(topic => 
        topic.title.toLowerCase().includes(searchTerm) ||
        topic.content.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => a.order - b.order)
  }

  async validateContent(content) {
    // Basic HTML validation
    if (!content?.trim()) {
      return { valid: false, error: 'Content cannot be empty' }
    }

    // Check for balanced tags (basic check)
    const openTags = (content.match(/<[^/][^>]*>/g) || []).length
    const closeTags = (content.match(/<\/[^>]*>/g) || []).length
    const selfClosingTags = (content.match(/<[^>]*\/>/g) || []).length
    
    if (openTags !== closeTags + selfClosingTags) {
      return { valid: false, error: 'HTML tags are not properly balanced' }
    }

    return { valid: true }
  }

  async getTopicStatistics() {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return {
      totalTopics: this.data.topics.length,
      averageContentLength: Math.round(
        this.data.topics.reduce((sum, topic) => sum + topic.content.length, 0) / this.data.topics.length
      ),
      lastUpdated: this.data.topics.reduce((latest, topic) => {
        const topicDate = new Date(topic.updatedAt || topic.createdAt || 0)
        return topicDate > latest ? topicDate : latest
      }, new Date(0)).toISOString()
    }
  }
}

export const courseContentService = new CourseContentService()
export default courseContentService