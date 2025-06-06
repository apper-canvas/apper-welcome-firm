import courseData from '../mockData/courseData.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const courseService = {
  async getCourseData() {
    await delay(400)
    return [...courseData]
  },

  async getSectionById(sectionId) {
    await delay(200)
    const section = courseData.find(section => section.id === sectionId)
    return section ? { ...section } : null
  },

  async updateProgress(progressData) {
    await delay(300)
    // Simulate saving progress
    return {
      ...progressData,
      lastUpdated: new Date().toISOString()
    }
  },

  async getProgress() {
    await delay(200)
    // Return mock progress data
    return {
      completedSections: [],
      currentSection: 'what-is-apper',
      lastAccessed: new Date().toISOString()
    }
  }
}