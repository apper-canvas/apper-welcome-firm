import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import PageLayout from '@/components/templates/PageLayout'
import { getTopics } from '@/services/api/customContentService'

function CustomContentPage() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoading(true)
        const data = await getTopics()
        setTopics(data)
        setSelectedTopic(data[0]?.id || null)
      } catch (err) {
        setError('Failed to load topics')
        console.error('Error loading topics:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadTopics()
  }, [])

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId)
    setIsMobileMenuOpen(false)
  }

  const selectedTopicData = topics.find(topic => topic.id === selectedTopic)

  const renderContentSection = (section) => {
    switch (section.type) {
      case 'text':
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
      
      default:
        return null
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-surface-600 dark:text-surface-400">{error}</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 lg:hidden z-50 p-3 bg-white dark:bg-surface-800 rounded-full shadow-lg"
        >
          <Icon name="Menu" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <AnimatePresence>
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: isMobileMenuOpen || window.innerWidth >= 1024 ? 0 : -300 }}
            className="fixed lg:sticky top-0 left-0 h-screen w-80 lg:w-96 bg-white dark:bg-surface-800 shadow-xl z-40 overflow-y-auto border-r border-surface-200 dark:border-surface-700"
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-heading font-bold text-surface-900 dark:text-white"
                >
                  Content Topics
                </motion.h1>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <Icon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </button>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                Explore detailed information on various topics
              </p>
            </div>

            {/* Topics List */}
            <nav className="p-4 space-y-2">
              {topics.map((topic, index) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTopicClick(topic.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center group ${
                    selectedTopic === topic.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 rounded-full mr-4 flex items-center justify-center transition-colors ${
                    selectedTopic === topic.id
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-400 group-hover:bg-primary/20 group-hover:text-primary'
                  }`}>
                    <Icon name={topic.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm leading-relaxed">
                      {topic.title}
                    </span>
                  </div>
                  {selectedTopic === topic.id && (
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
                    width: `${((topics.findIndex(topic => topic.id === selectedTopic) + 1) / topics.length) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-400 mt-2 text-center">
                Topic {topics.findIndex(topic => topic.id === selectedTopic) + 1} of {topics.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
            {selectedTopicData && (
              <motion.div
                key={selectedTopic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Topic Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                      <Icon name={selectedTopicData.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-heading font-bold text-surface-900 dark:text-white">
                        {selectedTopicData.title}
                      </h2>
                    </div>
                  </div>
                  
                  {selectedTopicData.subtitle && (
                    <p className="text-xl text-surface-600 dark:text-surface-400">
                      {selectedTopicData.subtitle}
                    </p>
                  )}
                </div>

                {/* Topic Content */}
                <div className="space-y-8">
                  {selectedTopicData.sections?.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      {section.heading && (
                        <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                          {section.heading}
                        </h3>
                      )}
                      {renderContentSection(section)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageLayout>
  )
}

export default CustomContentPage