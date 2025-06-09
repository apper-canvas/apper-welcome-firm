import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import CourseNavigation from '@/components/organisms/CourseNavigation'
import CourseContent from '@/components/organisms/CourseContent'
import Spinner from '@/components/atoms/Spinner'
import ErrorDisplay from '@/components/organisms/ErrorDisplay'
import ApperIcon from '@/components/ApperIcon'
import { courseService, courseSettingsService } from '@/services'

function CoursePage({ darkMode, setDarkMode }) {
  const [courseData, setCourseData] = useState([])
  const [activeSection, setActiveSection] = useState('what-is-apper')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState(null)
useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [courseData, courseSettings] = await Promise.all([
          courseService.getCourseData(),
          courseSettingsService.getSettings()
        ])
        setCourseData(courseData)
        setSettings(courseSettings)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load course data')
      } finally {
        setLoading(false)
      }
    }
    loadInitialData()
  }, [])

const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId)
    if (settings?.navigation?.mobileAutoClose) {
      setIsMobileMenuOpen(false)
    }
    
    // Smooth scroll to section with settings-based behavior
    const element = document.getElementById(sectionId)
    if (element && settings?.navigation?.autoScroll) {
      element.scrollIntoView({ 
        behavior: settings.navigation.scrollBehavior || 'smooth',
        block: 'start'
      })
    }
  }

const handleScroll = () => {
    if (!settings?.navigation?.highlightActive) return
    
    const sections = courseData.map(section => section.id)
    const scrollPosition = window.scrollY + 100

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i])
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sections[i])
        break
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [courseData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-surface-600 dark:text-surface-400 mt-4">Loading your course...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-40">
        <Link
          to="/course/settings"
          className="p-2 bg-white dark:bg-surface-800 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          <ApperIcon name="Settings" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
        </Link>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      {/* Mobile Menu Button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-surface-800 p-3 rounded-xl shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-surface-700 dark:bg-surface-300 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`h-0.5 bg-surface-700 dark:bg-surface-300 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 bg-surface-700 dark:bg-surface-300 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </motion.button>

      <div className="flex">
{/* Navigation Sidebar */}
        <CourseNavigation
          courseData={courseData}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          settings={settings}
        />

{/* Main Content */}
        <CourseContent
          courseData={courseData}
          activeSection={activeSection}
          settings={settings}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default CoursePage