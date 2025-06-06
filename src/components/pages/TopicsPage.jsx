import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { topicsService } from '@/services/api/topicsService'
import Icon from '@/components/atoms/Icon'
import Spinner from '@/components/atoms/Spinner'
import PageLayout from '@/components/templates/PageLayout'

function TopicsPage() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTopicId, setActiveTopicId] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true)
        const data = await topicsService.getTopics()
        setTopics(data)
        if (data.length > 0) {
          setActiveTopicId(data[0].id)
        }
      } catch (err) {
        setError('Failed to load topics')
        console.error('Error fetching topics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  const handleTopicClick = (topicId) => {
    setActiveTopicId(topicId)
    setIsMobileMenuOpen(false)
    
    // Smooth scroll to content section
    const element = document.getElementById(`topic-${topicId}`)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const activeTopicData = topics.find(topic => topic.id === activeTopicId)

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Icon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-2">
              Error Loading Topics
            </h2>
            <p className="text-surface-600 dark:text-surface-400">{error}</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-heading font-bold text-surface-900 dark:text-white">
              Topics
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              <Icon name="Menu" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] min-h-screen">
          {/* Left Panel - Topics List */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ 
              x: isMobileMenuOpen || window.innerWidth >= 1024 ? 0 : -300 
            }}
            className={`
              fixed lg:static top-16 lg:top-0 left-0 h-full lg:h-auto w-80 lg:w-full
              bg-white dark:bg-surface-800 shadow-xl lg:shadow-none z-40 lg:z-auto
              border-r border-surface-200 dark:border-surface-700 overflow-y-auto
              ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}
            `}
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                  Topics
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <Icon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </button>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                Browse through different topics
              </p>
            </div>

            {/* Topics Navigation */}
            <nav className="p-4 space-y-2">
              {topics.map((topic, index) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTopicClick(topic.id)}
                  className={`
                    w-full text-left p-4 rounded-xl transition-all duration-300 
                    flex items-center group
                    ${activeTopicId === topic.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`
                    w-10 h-10 rounded-xl mr-3 flex items-center justify-center transition-colors
                    ${activeTopicId === topic.id
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-400 group-hover:bg-primary/20 group-hover:text-primary'
                    }
                  `}>
                    <Icon name={topic.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm leading-relaxed">
                      {topic.title}
                    </span>
                  </div>
                  {activeTopicId === topic.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full ml-2"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Right Panel - Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              {activeTopicData && (
                <motion.div
                  key={activeTopicId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  id={`topic-${activeTopicId}`}
                  className="space-y-8"
                >
                  {/* Topic Header */}
                  <div className="border-b border-surface-200 dark:border-surface-700 pb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                        <Icon name={activeTopicData.icon} className="w-6 h-6 text-white" />
                      </div>
                      <h1 className="text-3xl lg:text-4xl font-heading font-bold text-surface-900 dark:text-white">
                        {activeTopicData.title}
                      </h1>
                    </div>
                    <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed">
                      {activeTopicData.description}
                    </p>
                  </div>

                  {/* Topic Content */}
                  <div className="space-y-8">
                    {activeTopicData.content.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-4"
                      >
                        {section.heading && (
                          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white">
                            {section.heading}
                          </h2>
                        )}
                        
                        {section.text && (
                          <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                              {section.text}
                            </p>
                          </div>
                        )}

                        {section.items && (
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <motion.li
                                key={itemIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                className="flex items-start space-x-3"
                              >
                                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                                  <Icon name="Check" className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {section.highlight && (
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary rounded-lg p-6">
                            <div className="flex items-start space-x-3">
                              <Icon name="Lightbulb" className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h3 className="font-semibold text-surface-900 dark:text-white mb-2">
                                  Key Insight
                                </h3>
                                <p className="text-surface-600 dark:text-surface-400">
                                  {section.highlight}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </div>
    </PageLayout>
  )
}

export default TopicsPage