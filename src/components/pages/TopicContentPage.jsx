import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Edit2, Save, X, BookOpen, Clock, ChevronRight, Menu } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import courseContentService from '@/services/api/courseContentService'

const TopicContentPage = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [topic, setTopic] = useState(null)
  const [allTopics, setAllTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [isAdmin, setIsAdmin] = useState(true) // Mock admin status
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadTopicData()
    loadAllTopics()
  }, [topicId])

  const loadTopicData = async () => {
    try {
      setLoading(true)
      setError(null)
      const topicData = await courseContentService.getTopicById(topicId)
      setTopic(topicData)
      setEditContent(topicData.content)
    } catch (err) {
      setError(err.message)
      console.error('Error loading topic:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadAllTopics = async () => {
    try {
      const topics = await courseContentService.getAllTopics()
      setAllTopics(topics)
    } catch (err) {
      console.error('Error loading all topics:', err)
    }
  }

  const handleSaveContent = async () => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    try {
      const validation = await courseContentService.validateContent(editContent)
      if (!validation.valid) {
        toast.error(validation.error)
        return
      }

      await courseContentService.updateTopic(topicId, { content: editContent })
      setTopic(prev => ({ ...prev, content: editContent }))
      setIsEditing(false)
      toast.success('Content updated successfully!')
    } catch (err) {
      toast.error(err.message)
      console.error('Error saving content:', err)
    }
  }

  const getCurrentTopicIndex = () => {
    return allTopics.findIndex(t => t.id === topicId)
  }

  const getNextTopic = () => {
    const currentIndex = getCurrentTopicIndex()
    return currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null
  }

  const getPreviousTopic = () => {
    const currentIndex = getCurrentTopicIndex()
    return currentIndex > 0 ? allTopics[currentIndex - 1] : null
  }

  const getRelatedTopics = () => {
    return allTopics.filter(t => t.id !== topicId).slice(0, 3)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading topic content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Topic Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => navigate('/course-content')} variant="primary">
            Back to Course Content
          </Button>
        </div>
      </div>
    )
  }

  const nextTopic = getNextTopic()
  const previousTopic = getPreviousTopic()
  const relatedTopics = getRelatedTopics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/course-content')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Course</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex h-screen lg:h-auto">
        {/* Sidebar - Related Topics */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -300 }}
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 
            border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Topics</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => navigate('/course-content')}
              className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Course Content</span>
            </button>
          </div>

          {/* Topic Navigation */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">All Topics</h3>
            <div className="space-y-2">
              {allTopics.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => navigate(`/topic/${t.id}`)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    t.id === topicId
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      t.id === topicId
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-sm truncate">{t.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Topics</h3>
                <div className="space-y-2">
                  {relatedTopics.map((relatedTopic) => (
                    <button
                      key={relatedTopic.id}
                      onClick={() => navigate(`/topic/${relatedTopic.id}`)}
                      className="w-full text-left p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-sm">{relatedTopic.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
            >
              <button
                onClick={() => navigate('/course-content')}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Course Content
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium">{topic?.title}</span>
            </motion.div>

            {/* Topic Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    {topic?.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Topic {getCurrentTopicIndex() + 1} of {allTopics.length}</span>
                    </div>
                    {topic?.updatedAt && (
                      <span>Updated {new Date(topic.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="success"
                          onClick={handleSaveContent}
                          className="flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span className="hidden sm:inline">Save</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsEditing(false)
                            setEditContent(topic.content)
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Topic Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Content</h3>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                    placeholder="Enter HTML content..."
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    You can use HTML tags to format your content. Changes will be saved when you click Save.
                  </div>
                </div>
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: topic?.content }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                />
              )}
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div>
                {previousTopic && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/topic/${previousTopic.id}`)}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Previous</div>
                      <div className="text-sm font-medium">{previousTopic.title}</div>
                    </div>
                  </Button>
                )}
              </div>

              <div>
                {nextTopic && (
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/topic/${nextTopic.id}`)}
                    className="flex items-center space-x-2"
                  >
                    <div className="text-right">
                      <div className="text-xs text-white/80">Next</div>
                      <div className="text-sm font-medium">{nextTopic.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicContentPage