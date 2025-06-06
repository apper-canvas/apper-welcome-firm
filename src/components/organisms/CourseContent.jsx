import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

function CourseContent({ courseData, activeSectionId, onSectionClick }) {

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
      className={`inline-flex items-center justify-center px-5 py-2.5 bg-[#007bff] text-white rounded-[5px] font-semibold transition-all duration-200 hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 no-underline ${className}`}
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
          // Replace video URL with VideoButton
          const textBeforeUrl = section.content.substring(0, section.content.indexOf(videoUrl))
          const textAfterUrl = section.content.substring(section.content.indexOf(videoUrl) + videoUrl.length)
          
          return (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
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
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
              {section.content}
            </p>
          </div>
        )
      
      case 'list':
        return (
          <ul className="space-y-3">
            {section.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <Icon name="Check" className="w-3 h-3 text-white" />
                </div>
                <span className="text-surface-600 dark:text-surface-400">{item}</span>
              </motion.li>
            ))}
          </ul>
        )
      
      case 'steps':
        return (
          <div className="space-y-6">
            {section.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                    {step.title}
                  </h4>
                </div>
                <p className="text-surface-600 dark:text-surface-400 ml-12">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        )
      
      case 'code':
        return renderCodeBlock(section.code)
      
      case 'demo':
        return (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border-2 border-dashed border-primary/30">
            <div className="text-center">
              <Icon name="Play" className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                {section.title}
              </h4>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                {section.description}
              </p>
              <Button
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark"
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

  const activeSection = courseData?.find(section => section.id === activeSectionId)
  const sectionIndex = courseData?.findIndex(section => section.id === activeSectionId) || 0

  return (
    <main className="flex-1 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {activeSection && (
          <motion.div
            key={activeSection.id}
            id={`panel-${activeSection.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSection.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="course-tab-content"
          >
            {/* Section Header */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon name={activeSection.icon} className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-surface-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {activeSection.title}
              </motion.h1>
              
              {activeSection.subtitle && (
                <motion.p 
                  className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeSection.subtitle}
                </motion.p>
              )}
            </div>

            {/* Section Content */}
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {activeSection.sections?.map((contentSection, contentIndex) => (
                <motion.div 
                  key={contentIndex} 
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 sm:p-8 shadow-soft border border-surface-200 dark:border-surface-700"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * contentIndex }}
                >
                  {contentSection.heading && (
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 dark:text-white mb-6">
                      {contentSection.heading}
                    </h2>
                  )}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {renderContentSection(contentSection)}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Section Actions */}
            <motion.div 
              className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  onClick={() => {
                    console.log(`Watch video for section: ${activeSection.title}`)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="Play" className="w-5 h-5 mr-3" />
                  Watch Video Tutorial
                </Button>

                {/* Navigation buttons */}
                <div className="flex space-x-3">
                  {sectionIndex > 0 && (
                    <Button
                      onClick={() => onSectionClick?.(courseData[sectionIndex - 1].id)}
                      className="px-6 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name="ChevronLeft" className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  {sectionIndex < courseData.length - 1 && (
                    <Button
                      onClick={() => onSectionClick?.(courseData[sectionIndex + 1].id)}
                      className="px-6 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next
                      <Icon name="ChevronRight" className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Course Completion for last section */}
            {sectionIndex === courseData.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                >
                  <Icon name="Award" className="w-20 h-20 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Congratulations!</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  You've completed the Getting Started Course. You're now ready to build amazing apps with Apper!
                </p>
                <Button
                  className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:bg-surface-100 text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="Rocket" className="w-5 h-5 mr-3" />
                  Start Building Your First App
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default CourseContent