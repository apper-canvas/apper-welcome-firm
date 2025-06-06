import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/atoms/Icon'

function CourseTabNavigation({ courseData, activeSection, onSectionClick }) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const tabRefs = useRef([])
  const containerRef = useRef(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      const currentIndex = tabRefs.current.findIndex(ref => ref === document.activeElement)
      let newIndex = currentIndex

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = currentIndex > 0 ? currentIndex - 1 : courseData.length - 1
          break
        case 'ArrowRight':
          e.preventDefault()
          newIndex = currentIndex < courseData.length - 1 ? currentIndex + 1 : 0
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = courseData.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (currentIndex >= 0) {
            onSectionClick(courseData[currentIndex].id)
          }
          break
        default:
          return
      }

      if (newIndex !== currentIndex && tabRefs.current[newIndex]) {
        tabRefs.current[newIndex].focus()
        setFocusedIndex(newIndex)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [courseData, onSectionClick])

  const activeIndex = courseData.findIndex(section => section.id === activeSection)

  return (
    <div className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="mb-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 dark:text-white">
              Getting Started Course
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-2">
              Learn everything about Apper step by step
            </p>
          </div>

          <nav 
            ref={containerRef}
            className="relative"
            role="tablist"
            aria-label="Course navigation tabs"
          >
            {/* Mobile Scrollable Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 sm:space-x-3 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-2 md:gap-3">
                {courseData.map((section, index) => {
                  const isActive = section.id === activeSection
                  const stepNumber = index + 1
                  
                  return (
                    <motion.button
                      key={section.id}
                      ref={el => tabRefs.current[index] = el}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${section.id}`}
                      tabIndex={isActive ? 0 : -1}
                      className={`course-tab flex-shrink-0 sm:flex-shrink ${isActive ? 'active' : 'inactive'}`}
                      onClick={() => onSectionClick(section.id)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(-1)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        {/* Step Number */}
                        <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                        }`}>
                          {stepNumber}
                        </div>

                        {/* Title */}
                        <span className="truncate text-left leading-tight min-w-0">
                          <span className="hidden sm:inline">Step {stepNumber}: </span>
                          <span className="font-semibold">{section.title}</span>
                        </span>

                        {/* Icon for active state */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="flex-shrink-0"
                          >
                            <Icon name="Check" className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="course-tab-indicator"
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
              <span>
                Step {activeIndex + 1} of {courseData.length}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 sm:w-32 bg-surface-200 dark:bg-surface-700 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / courseData.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="font-medium">
                  {Math.round(((activeIndex + 1) / courseData.length) * 100)}%
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default CourseTabNavigation