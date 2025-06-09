import defaultSettings from '../mockData/courseSettingsData.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const STORAGE_KEY = 'courseSettings'

export const courseSettingsService = {
  async getSettings() {
    await delay(300)
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedSettings = JSON.parse(stored)
        // Merge with defaults to ensure all properties exist
        return this.mergeWithDefaults(parsedSettings)
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error)
    }
    
    return { ...defaultSettings }
  },

  async updateSettings(settings) {
    await delay(300)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      return { ...settings }
    } catch (error) {
      throw new Error('Failed to save settings: ' + error.message)
    }
  },

  async resetSettings() {
    await delay(200)
    
    try {
      localStorage.removeItem(STORAGE_KEY)
      return { ...defaultSettings }
    } catch (error) {
      throw new Error('Failed to reset settings: ' + error.message)
    }
  },

  async validateSettings(settings) {
    await delay(100)
    
    const errors = {}
    let isValid = true

    // Validate general settings
    if (typeof settings.general?.language !== 'string' || !['en', 'es', 'fr', 'de'].includes(settings.general.language)) {
      errors['general.language'] = 'Invalid language selection'
      isValid = false
    }

    // Validate display settings
    if (typeof settings.display?.fontSize !== 'number' || settings.display.fontSize < 12 || settings.display.fontSize > 20) {
      errors['display.fontSize'] = 'Font size must be between 12 and 20 pixels'
      isValid = false
    }

    if (typeof settings.display?.theme !== 'string' || !['auto', 'light', 'dark'].includes(settings.display.theme)) {
      errors['display.theme'] = 'Invalid theme selection'
      isValid = false
    }

    if (typeof settings.display?.layoutDensity !== 'string' || !['comfortable', 'compact', 'spacious'].includes(settings.display.layoutDensity)) {
      errors['display.layoutDensity'] = 'Invalid layout density selection'
      isValid = false
    }

    if (typeof settings.display?.sidebarWidth !== 'number' || settings.display.sidebarWidth < 240 || settings.display.sidebarWidth > 400) {
      errors['display.sidebarWidth'] = 'Sidebar width must be between 240 and 400 pixels'
      isValid = false
    }

    // Validate navigation settings
    if (typeof settings.navigation?.scrollBehavior !== 'string' || !['smooth', 'instant', 'auto'].includes(settings.navigation.scrollBehavior)) {
      errors['navigation.scrollBehavior'] = 'Invalid scroll behavior selection'
      isValid = false
    }

    // Validate advanced settings
    if (typeof settings.advanced?.performanceMode !== 'string' || !['balanced', 'performance', 'battery'].includes(settings.advanced.performanceMode)) {
      errors['advanced.performanceMode'] = 'Invalid performance mode selection'
      isValid = false
    }

    if (typeof settings.advanced?.cacheDuration !== 'number' || settings.advanced.cacheDuration < 5 || settings.advanced.cacheDuration > 60) {
      errors['advanced.cacheDuration'] = 'Cache duration must be between 5 and 60 minutes'
      isValid = false
    }

    return {
      isValid,
      errors
    }
  },

  mergeWithDefaults(userSettings) {
    const defaults = { ...defaultSettings }
    const merged = { ...defaults }

    // Deep merge each category
    Object.keys(defaults).forEach(category => {
      if (userSettings[category] && typeof userSettings[category] === 'object') {
        merged[category] = {
          ...defaults[category],
          ...userSettings[category]
        }
      }
    })

    return merged
  },

  async exportSettings() {
    await delay(200)
    const settings = await this.getSettings()
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `course-settings-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  },

  async importSettings(file) {
    await delay(200)
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target.result)
          const validation = this.validateSettings(settings)
          if (validation.isValid) {
            resolve(settings)
          } else {
            reject(new Error('Invalid settings file format'))
          }
        } catch (error) {
          reject(new Error('Failed to parse settings file'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }
}