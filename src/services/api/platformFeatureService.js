// Platform Feature Service
import platformFeatureData from '@/services/mockData/platformFeatureData.json'

class PlatformFeatureService {
  constructor() {
    this.storageKey = 'platformFeatures'
    this.data = this.loadFromStorage()
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : platformFeatureData
    } catch (error) {
      console.error('Error loading platform features from storage:', error)
      return platformFeatureData
    }
  }

  saveToStorage(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      this.data = data
    } catch (error) {
      console.error('Error saving platform features to storage:', error)
      throw new Error('Failed to save features')
    }
  }

  async getAllFeatures() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.data.features].sort((a, b) => a.order - b.order)
  }

  async getFeatureById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const feature = this.data.features.find(f => f.id === id)
    if (!feature) {
      throw new Error('Platform feature not found')
    }
    return { ...feature }
  }

  async getFeaturesBy category(category) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.data.features.filter(f => f.category === category)
  }

  async searchFeatures(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    if (!query?.trim()) {
      return this.getAllFeatures()
    }

    const searchTerm = query.toLowerCase().trim()
    return this.data.features
      .filter(feature => 
        feature.title.toLowerCase().includes(searchTerm) ||
        feature.subtitle.toLowerCase().includes(searchTerm) ||
        feature.overview.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => a.order - b.order)
  }

  async getFeatureStatistics() {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const categories = [...new Set(this.data.features.map(f => f.category))]
    
    return {
      totalFeatures: this.data.features.length,
      categories: categories.length,
      categoriesBreakdown: categories.map(cat => ({
        name: cat,
        count: this.data.features.filter(f => f.category === cat).length
      })),
      averageReadTime: Math.round(
        this.data.features.reduce((sum, feature) => sum + (feature.readTime || 5), 0) / this.data.features.length
      )
    }
  }
}

export const platformFeatureService = new PlatformFeatureService()
export default platformFeatureService