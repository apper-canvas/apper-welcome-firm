import onboardingStepsData from '../mockData/onboardingSteps.json'
import userProgressData from '../mockData/userProgress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const onboardingService = {
  async getSteps() {
    await delay(300)
    return [...onboardingStepsData]
  },

  async getStepById(id) {
    await delay(200)
    const step = onboardingStepsData.find(step => step.id === id)
    return step ? { ...step } : null
  },

  async getUserProgress() {
    await delay(250)
    return { ...userProgressData }
  },

  async updateProgress(progressData) {
    await delay(400)
    const updatedProgress = {
      ...userProgressData,
      ...progressData,
      lastUpdated: new Date().toISOString()
    }
    // Simulate saving to backend
    Object.assign(userProgressData, updatedProgress)
    return { ...updatedProgress }
  },

  async resetProgress() {
    await delay(300)
    const resetData = {
      currentStep: 0,
      completedSteps: [],
      startTime: new Date().toISOString(),
      interactions: [],
      lastUpdated: new Date().toISOString()
    }
    Object.assign(userProgressData, resetData)
    return { ...resetData }
  },

  async trackInteraction(interaction) {
    await delay(200)
    const newInteraction = {
      ...interaction,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    userProgressData.interactions = userProgressData.interactions || []
    userProgressData.interactions.push(newInteraction)
    return { ...newInteraction }
  }
}