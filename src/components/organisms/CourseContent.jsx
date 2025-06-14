import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

function CourseContent({ courseData, activeSection }) {

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
              <div className="text-surface-600 dark:text-surface-400 leading-relaxed">
                {textBeforeUrl.trim()}
                {textBeforeUrl.trim() && <span> </span>}
                <VideoButton url={videoUrl} />
                {textAfterUrl.trim() && <span> {textAfterUrl.trim()}</span>}
              </div>
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
                <span className={`text-surface-600 dark:text-surface-400 ${index === 0 ? 'leading-6' : ''}`}>{item}</span>
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

return (
    <main className="flex-1 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12 lg:ml-80">
        {courseData.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-16 scroll-mt-20"
          >
            {/* Section Header */}
            <div className="mb-8">
<div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <Icon name={section.icon || "BookOpen"} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-heading font-bold text-surface-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-surface-500 dark:text-surface-400 mt-1">
                    Section {index + 1} of {courseData.length}
</p>
                </div>
              </div>
              
              {section.subtitle && (
                <p className="text-xl text-surface-600 dark:text-surface-400">
                  {section.subtitle}
                </p>
              )}
            </div>

            {/* Section Content */}
            <div className="space-y-8">
              {section.sections?.map((contentSection, contentIndex) => (
                <div key={contentIndex} className="space-y-4">
                  {contentSection.heading && (
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                      {contentSection.heading}
                    </h3>
                  )}
                  {renderContentSection(contentSection)}
                </div>
              ))}
</div>

            {/* Section Actions */}
            <div className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700">
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    // Video functionality will be implemented here
                    console.log(`Watch video for section: ${section.title}`)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="Play" className="w-5 h-5 mr-3" />
                  Watch Video
                </Button>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Course Completion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white"
        >
          <Icon name="Trophy" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
          <p className="text-lg mb-6">
            You've completed the Getting Started Course. You're now ready to build amazing apps with Apper!
          </p>
          <Button
            className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-surface-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building Your First App
          </Button>
        </motion.div>
      </div>
    </main>
  )
}

export default CourseContent