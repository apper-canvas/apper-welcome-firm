import { contentData } from '../mockData/contentData.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for content modifications
let topics = [...contentData.topics]

export const contentService = {
  async getTopics() {
    await delay(300)
    return [...topics]
  },

  async getTopicById(id) {
    await delay(200)
    const topic = topics.find(t => t.id === id)
    if (!topic) {
      throw new Error('Topic not found')
    }
    return { ...topic }
  },

  async createTopic(topicData) {
    await delay(400)
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: topicData.title || 'New Topic',
      content: topicData.content || 'Add your content here...',
      sections: topicData.sections || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    topics.push(newTopic)
    return { ...newTopic }
  },

  async updateTopic(id, updates) {
    await delay(300)
    const index = topics.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Topic not found')
    }
    
    topics[index] = {
      ...topics[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...topics[index] }
  },

  async deleteTopic(id) {
    await delay(300)
    const index = topics.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Topic not found')
    }
    
    topics.splice(index, 1)
    return { success: true }
  },

  async updateContent(id, content) {
    await delay(250)
    const index = topics.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Topic not found')
    }
    
    topics[index].content = content
    topics[index].updatedAt = new Date().toISOString()
    return { ...topics[index] }
  },

  async addSection(topicId, section) {
    await delay(300)
    const topic = topics.find(t => t.id === topicId)
    if (!topic) {
      throw new Error('Topic not found')
    }
    
    const newSection = {
      id: `section-${Date.now()}`,
      title: section.title || 'New Section',
      content: section.content || 'Section content...',
      order: topic.sections.length
    }
    
    topic.sections.push(newSection)
    topic.updatedAt = new Date().toISOString()
    return { ...newSection }
  },

  async updateSection(topicId, sectionId, updates) {
    await delay(300)
    const topic = topics.find(t => t.id === topicId)
    if (!topic) {
      throw new Error('Topic not found')
    }
    
    const sectionIndex = topic.sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) {
      throw new Error('Section not found')
    }
    
    topic.sections[sectionIndex] = {
      ...topic.sections[sectionIndex],
      ...updates
    }
    topic.updatedAt = new Date().toISOString()
    return { ...topic.sections[sectionIndex] }
  },

  async deleteSection(topicId, sectionId) {
    await delay(300)
    const topic = topics.find(t => t.id === topicId)
    if (!topic) {
      throw new Error('Topic not found')
    }
    
    const sectionIndex = topic.sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) {
      throw new Error('Section not found')
    }
    
    topic.sections.splice(sectionIndex, 1)
    topic.updatedAt = new Date().toISOString()
    return { success: true }
  }
}