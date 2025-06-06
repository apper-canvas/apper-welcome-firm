import customContentData from '@/services/mockData/customContentData.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Simulate localStorage persistence
const STORAGE_KEY = 'customContentTopics'

const getStoredTopics = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : customContentData.topics
  } catch (error) {
    console.warn('Failed to parse stored topics, using default data')
    return customContentData.topics
  }
}

const saveTopics = (topics) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics))
  } catch (error) {
    console.warn('Failed to save topics to localStorage')
  }
}

// Validation helpers
export const validateTopicTitle = (title, existingTopics, currentId = null) => {
  if (!title || title.trim().length === 0) {
    return 'Topic title is required'
  }
  
  if (title.trim().length < 3) {
    return 'Topic title must be at least 3 characters long'
  }
  
  const titleExists = existingTopics.some(topic => 
    topic.title.toLowerCase() === title.toLowerCase() && topic.id !== currentId
  )
  
  if (titleExists) {
    return 'A topic with this title already exists'
  }
  
  return null
}

export const validateTopicContent = (sections) => {
  if (!sections || sections.length === 0) {
    return 'Topic must have at least one content section'
  }
  
  const hasContent = sections.some(section => {
    if (section.type === 'text' && section.content && section.content.trim()) {
      return true
    }
    if (section.type === 'list' && section.items && section.items.length > 0) {
      return true
    }
    if (section.type === 'steps' && section.steps && section.steps.length > 0) {
      return true
    }
    return false
  })
  
  if (!hasContent) {
    return 'Topic content cannot be empty'
  }
  
  return null
}

export const getTopics = async () => {
  await delay(300)
  return [...getStoredTopics()]
}

export const getTopicById = async (id) => {
  await delay(200)
  const topics = getStoredTopics()
  const topic = topics.find(topic => topic.id === id)
  return topic ? { ...topic } : null
}

export const createTopic = async (topicData) => {
  await delay(400)
  
  const topics = getStoredTopics()
  
  // Validate title
  const titleError = validateTopicTitle(topicData.title, topics)
  if (titleError) {
    throw new Error(titleError)
  }
  
  // Validate content
  const contentError = validateTopicContent(topicData.sections)
  if (contentError) {
    throw new Error(contentError)
  }
  
  const newTopic = {
    id: `topic-${Date.now()}`,
    title: topicData.title.trim(),
    subtitle: topicData.subtitle?.trim() || '',
    icon: topicData.icon || 'FileText',
    sections: topicData.sections || []
  }
  
  const updatedTopics = [...topics, newTopic]
  saveTopics(updatedTopics)
  
  return { ...newTopic }
}

export const updateTopic = async (id, topicData) => {
  await delay(400)
  
  const topics = getStoredTopics()
  const topicIndex = topics.findIndex(topic => topic.id === id)
  
  if (topicIndex === -1) {
    throw new Error('Topic not found')
  }
  
  // Validate title
  const titleError = validateTopicTitle(topicData.title, topics, id)
  if (titleError) {
    throw new Error(titleError)
  }
  
  // Validate content
  const contentError = validateTopicContent(topicData.sections)
  if (contentError) {
    throw new Error(contentError)
  }
  
  const updatedTopic = {
    ...topics[topicIndex],
    title: topicData.title.trim(),
    subtitle: topicData.subtitle?.trim() || '',
    icon: topicData.icon || topics[topicIndex].icon,
    sections: topicData.sections || []
  }
  
  topics[topicIndex] = updatedTopic
  saveTopics(topics)
  
  return { ...updatedTopic }
}

export const deleteTopic = async (id) => {
  await delay(300)
  
  const topics = getStoredTopics()
  const filteredTopics = topics.filter(topic => topic.id !== id)
  
  if (filteredTopics.length === topics.length) {
    throw new Error('Topic not found')
  }
  
  saveTopics(filteredTopics)
  return { success: true }
}

export default {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  validateTopicTitle,
  validateTopicContent
}