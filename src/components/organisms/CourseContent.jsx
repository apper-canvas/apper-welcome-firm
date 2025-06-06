import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

function CourseContent({ courseData }) {
  const [activeTab, setActiveTab] = useState(0)

  // Create shortened titles for tabs
  const getShortTitle = (title) => {
    const shortTitles = {
      'What is Apper': 'What is Apper',
      'Why Apper Stands Out': 'Why Apper Stands Out',
      'Setting Up Your Account': 'Setting Up Account',
      'Create Your First App': 'Create Your First App'
    }
    return shortTitles[title] || title
  }

  // Extract video URL from text content
  const extractVideoUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const match = text.match(urlRegex)
    return match ? match[0] : null
  }

  // Video Button Component
  const VideoButton = ({ url, className = '' }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-5 py-2.5 bg-blue text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 no-underline ${className}`}
      role="button"
      aria-label="Watch video tutorial"
      tabIndex="0"
    >
      <Icon name="Play" className="w-4 h-4 mr-2" />
      Watch Video
    </a>
  )

  const renderCodeBlock = (code) => (
    <div className="bg-surface-900 rounded-xl p-6 overflow-x-auto">
      <pre className="text-sm text-surface-300">
        <code>{code}</code>
      </pre>
    </div>
  )

  const renderContentSection = (section) => {
    switch (section.type) {
      case 'text':
        const videoUrl = extractVideoUrl(section.content)
        if (videoUrl) {
          const textBeforeUrl = section.content.substring(0, section.content.indexOf(videoUrl))
          const textAfterUrl = section.content.substring(section.content.indexOf(videoUrl) + videoUrl.length)
          
          return (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-lg">
                {textBeforeUrl.trim()}
                {textBeforeUrl.trim() && <span> </span>}
                <VideoButton url={videoUrl} />
                {textAfterUrl.trim() && <span> {textAfterUrl.trim()}</span>}
              </p>
            </div>
          )
        }
        
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-lg mb-6">
              {section.content}
            </p>
          </div>
        )
      
      case 'list':
        return (
          <ul className="space-y-4 mb-8">
            {section.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green rounded-full flex items-center justify-center mt-1">
                  <Icon name="Check" className="w-3 h-3 text-white" />
                </div>
                <span className="text-surface-600 dark:text-surface-400 text-lg leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        )
      
      case 'steps':
        return (
          <div className="space-y-6 mb-8">
            {section.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 shadow-soft"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue to-green rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                    {step.title}
                  </h4>
                </div>
                <p className="text-surface-600 dark:text-surface-400 ml-12 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        )
      
      case 'code':
        return <div className="mb-8">{renderCodeBlock(section.code)}</div>
      
      case 'demo':
        return (
          <div className="bg-gradient-to-br from-blue/10 to-green/10 rounded-xl p-8 border-2 border-dashed border-blue/30 mb-8">
            <div className="text-center">
              <Icon name="Play" className="w-12 h-12 text-blue mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                {section.title}
              </h4>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                {section.description}
              </p>
              <Button
                className="bg-blue text-white px-6 py-2 rounded-xl hover:bg-blue-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Interactive Demo
              </Button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveTab(index)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveTab(index - 1)
    } else if (e.key === 'ArrowRight' && index < courseData.length - 1) {
      setActiveTab(index + 1)
    }
  }

  const activeSection = courseData[activeTab]

  return (
    <main className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-surface-900 dark:text-white mb-4">
            Getting Started Course
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Learn everything you need to know about Apper in just a few minutes
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-white dark:bg-surface-800 rounded-2xl shadow-card">
            {courseData.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`tab-transition px-4 py-3 rounded-xl font-semibold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue to-green text-white shadow-lg transform scale-105'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-700'
                } ${
                  courseData.length > 2 ? 'flex-1 min-w-0 max-w-xs' : 'px-8'
                }`}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`tabpanel-${index}`}
                tabIndex={activeTab === index ? 0 : -1}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTab === index ? 'bg-white/20' : 'bg-surface-200 dark:bg-surface-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="truncate">{getShortTitle(section.title)}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="content-transition"
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 md:p-12">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue to-green rounded-2xl mb-6">
                  <Icon name={activeSection.icon || 'BookOpen'} className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  {activeSection.title}
                </h2>
                {activeSection.subtitle && (
                  <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
                    {activeSection.subtitle}
                  </p>
                )}
              </div>

              {/* Section Content */}
              <div className="max-w-4xl mx-auto">
                {activeSection.sections?.map((contentSection, contentIndex) => (
                  <motion.div
                    key={contentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: contentIndex * 0.1 }}
                    className="mb-8"
                  >
                    {contentSection.heading && (
                      <h3 className="text-2xl font-semibold text-surface-900 dark:text-white mb-6">
                        {contentSection.heading}
                      </h3>
                    )}
                    {renderContentSection(contentSection)}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center mt-12"
        >
          <Button
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 0
                ? 'bg-surface-200 text-surface-400 cursor-not-allowed'
                : 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white hover:shadow-lg'
            }`}
            whileHover={activeTab !== 0 ? { scale: 1.05 } : {}}
            whileTap={activeTab !== 0 ? { scale: 0.95 } : {}}
          >
            <Icon name="ChevronLeft" className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              {activeTab + 1} of {courseData.length}
            </p>
          </div>

          {activeTab === courseData.length - 1 ? (
            <Button
              className="px-6 py-3 bg-gradient-to-r from-blue to-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building
              <Icon name="Rocket" className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setActiveTab(Math.min(courseData.length - 1, activeTab + 1))}
              className="px-6 py-3 bg-gradient-to-r from-blue to-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <Icon name="ChevronRight" className="w-4 h-4 ml-2" />
            </Button>
          )}
        </motion.div>

        {/* Completion Badge */}
        {activeTab === courseData.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue to-green rounded-full mb-4">
              <Icon name="Award" className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              Course Complete!
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              You're now ready to build amazing apps with Apper
            </p>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default CourseContent