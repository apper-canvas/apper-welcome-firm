import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/atoms/Icon'

function CourseNavigation({ courseData, activeSection, onSectionClick, isMobileMenuOpen, onClose }) {
  const navigationItems = courseData.map(section => ({
    id: section.id,
    title: section.title,
    icon: section.icon || 'BookOpen'
  }))

  return (
<AnimatePresence>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        className="fixed lg:fixed top-0 left-0 h-screen w-80 lg:w-[28%] xl:w-[26%] bg-white dark:bg-surface-800 shadow-xl lg:shadow-soft z-40 lg:z-30 overflow-y-auto border-r border-surface-200 dark:border-surface-700"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Getting Started Course
            </motion.h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              <Icon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
          </div>
          <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
            Learn everything about Apper
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSectionClick(item.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center group ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg mr-3 transition-colors ${
                activeSection === item.id
                  ? 'bg-white/20'
                  : 'bg-surface-200 dark:bg-surface-600 group-hover:bg-primary/20'
              }`}>
                <Icon 
                  name={item.icon} 
                  className={`w-4 h-4 ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-surface-600 dark:text-surface-400 group-hover:text-primary'
                  }`} 
                />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm leading-relaxed">
                  {item.title}
                </span>
              </div>
              {activeSection === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full ml-2"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Progress Indicator */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 mt-auto">
          <div className="bg-surface-100 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((navigationItems.findIndex(item => item.id === activeSection) + 1) / navigationItems.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-surface-600 dark:text-surface-400 mt-2 text-center">
            Section {navigationItems.findIndex(item => item.id === activeSection) + 1} of {navigationItems.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CourseNavigation