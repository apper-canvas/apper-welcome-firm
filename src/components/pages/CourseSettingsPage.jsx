import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import ApperIcon from '@/components/ApperIcon'
import { courseSettingsService } from '@/services'

function CourseSettingsPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [errors, setErrors] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const data = await courseSettingsService.getSettings()
      setSettings(data)
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    }
    setSettings(newSettings)
    setHasChanges(true)
    
    // Clear any existing error for this field
    const errorKey = `${category}.${key}`
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }

    // Auto-save after 2 seconds
    clearTimeout(window.settingsAutoSave)
    window.settingsAutoSave = setTimeout(() => {
      saveSettings(newSettings)
    }, 2000)
  }

  const saveSettings = async (settingsToSave = settings) => {
    try {
      setSaving(true)
      const validation = await courseSettingsService.validateSettings(settingsToSave)
      
      if (!validation.isValid) {
        setErrors(validation.errors)
        toast.error('Please fix validation errors')
        return
      }

      await courseSettingsService.updateSettings(settingsToSave)
      setHasChanges(false)
      setErrors({})
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const resetSettings = async () => {
    if (!window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      return
    }

    try {
      setSaving(true)
      const defaultSettings = await courseSettingsService.resetSettings()
      setSettings(defaultSettings)
      setHasChanges(false)
      setErrors({})
      toast.success('Settings reset to defaults!')
    } catch (error) {
      toast.error('Failed to reset settings')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'display', label: 'Display', icon: 'Monitor' },
    { id: 'navigation', label: 'Navigation', icon: 'Navigation' },
    { id: 'advanced', label: 'Advanced', icon: 'Code' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-surface-600 dark:text-surface-400 mt-4">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Header */}
      <div className="bg-white dark:bg-surface-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/course')}
                className="p-2"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-heading font-semibold text-surface-900 dark:text-white">
                Course Settings
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <span className="text-sm text-accent font-medium">Unsaved changes</span>
              )}
              <Button
                variant="outline"
                onClick={resetSettings}
                disabled={saving}
                className="text-sm"
              >
                Reset to Defaults
              </Button>
              <Button
                variant="primary"
                onClick={() => saveSettings()}
                disabled={saving || !hasChanges}
                className="text-sm"
              >
                {saving ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-surface-200 dark:border-surface-700">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <GeneralSettings
                settings={settings.general}
                onChange={(key, value) => handleSettingChange('general', key, value)}
                errors={errors}
              />
            )}
            {activeTab === 'display' && (
              <DisplaySettings
                settings={settings.display}
                onChange={(key, value) => handleSettingChange('display', key, value)}
                errors={errors}
              />
            )}
            {activeTab === 'navigation' && (
              <NavigationSettings
                settings={settings.navigation}
                onChange={(key, value) => handleSettingChange('navigation', key, value)}
                errors={errors}
              />
            )}
            {activeTab === 'advanced' && (
              <AdvancedSettings
                settings={settings.advanced}
                onChange={(key, value) => handleSettingChange('advanced', key, value)}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GeneralSettings({ settings, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">General Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Auto-save Progress
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Automatically save your progress as you navigate
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Sound Effects
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Play sounds for interactions and notifications
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('soundEffects', !settings.soundEffects)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.soundEffects ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Animations
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Enable smooth animations and transitions
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('animations', !settings.animations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.animations ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.animations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function DisplaySettings({ settings, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Display Options</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Font Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="12"
                max="20"
                value={settings.fontSize}
                onChange={(e) => onChange('fontSize', parseInt(e.target.value))}
                className="flex-1 h-2 bg-surface-200 dark:bg-surface-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-surface-600 dark:text-surface-400 w-12 text-right">
                {settings.fontSize}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Theme Preference
            </label>
            <select
              value={settings.theme}
              onChange={(e) => onChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Layout Density
            </label>
            <select
              value={settings.layoutDensity}
              onChange={(e) => onChange('layoutDensity', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Sidebar Width
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="240"
                max="400"
                step="20"
                value={settings.sidebarWidth}
                onChange={(e) => onChange('sidebarWidth', parseInt(e.target.value))}
                className="flex-1 h-2 bg-surface-200 dark:bg-surface-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-surface-600 dark:text-surface-400 w-12 text-right">
                {settings.sidebarWidth}px
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavigationSettings({ settings, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Navigation Behavior</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Auto-scroll to Active Section
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Automatically scroll to the active section when navigating
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('autoScroll', !settings.autoScroll)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoScroll ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoScroll ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Highlight Active Section
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Highlight the current section in the navigation menu
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('highlightActive', !settings.highlightActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.highlightActive ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highlightActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Mobile Menu Auto-close
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Automatically close mobile menu after selection
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('mobileAutoClose', !settings.mobileAutoClose)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.mobileAutoClose ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.mobileAutoClose ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Scroll Behavior
            </label>
            <select
              value={settings.scrollBehavior}
              onChange={(e) => onChange('scrollBehavior', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="smooth">Smooth</option>
              <option value="instant">Instant</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdvancedSettings({ settings, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Advanced Options</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Developer Mode
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Enable additional debugging and development features
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('developerMode', !settings.developerMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.developerMode ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.developerMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                Show Debug Info
              </label>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Display debug information and performance metrics
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange('debugInfo', !settings.debugInfo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.debugInfo ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.debugInfo ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Performance Mode
            </label>
            <select
              value={settings.performanceMode}
              onChange={(e) => onChange('performanceMode', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="balanced">Balanced</option>
              <option value="performance">High Performance</option>
              <option value="battery">Battery Saver</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Cache Duration (minutes)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={settings.cacheDuration}
                onChange={(e) => onChange('cacheDuration', parseInt(e.target.value))}
                className="flex-1 h-2 bg-surface-200 dark:bg-surface-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-surface-600 dark:text-surface-400 w-16 text-right">
                {settings.cacheDuration} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseSettingsPage