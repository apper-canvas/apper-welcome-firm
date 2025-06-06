import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import { contentService } from '@/services/api/contentService'

function ContentPage() {
  const [topics, setTopics] = useState([])
  const [activeTopic, setActiveTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTopic, setEditingTopic] = useState(null)
  const [editingContent, setEditingContent] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const contentRefs = useRef({})
  const observerRef = useRef(null)

  useEffect(() => {
    loadTopics()
  }, [])

  useEffect(() => {
    if (topics.length > 0) {
      setupIntersectionObserver()
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }
  }, [topics])

  const loadTopics = async () => {
    try {
      setLoading(true)
      const data = await contentService.getTopics()
      setTopics(data)
      if (data.length > 0) {
        setActiveTopic(data[0].id)
      }
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load topics')
    } finally {
      setLoading(false)
    }
  }

  const setupIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTopic(entry.target.id)
        }
      })
    }, options)

    topics.forEach((topic) => {
      const element = contentRefs.current[topic.id]
      if (element) {
        observerRef.current.observe(element)
      }
    })
  }

  const scrollToTopic = (topicId) => {
    const element = contentRefs.current[topicId]
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
      setActiveTopic(topicId)
      setIsMobileMenuOpen(false)
    }
  }

  const handleAddTopic = async () => {
    try {
      const newTopic = {
        title: 'New Topic',
        content: 'Add your content here...',
        sections: []
      }
      const created = await contentService.createTopic(newTopic)
      setTopics([...topics, created])
      setEditingTopic(created.id)
      toast.success('Topic added successfully')
    } catch (err) {
      toast.error('Failed to add topic')
    }
  }

  const handleUpdateTopic = async (topicId, updates) => {
    try {
      const updated = await contentService.updateTopic(topicId, updates)
      setTopics(topics.map(t => t.id === topicId ? updated : t))
      toast.success('Topic updated successfully')
    } catch (err) {
      toast.error('Failed to update topic')
    }
  }

  const handleDeleteTopic = async (topicId) => {
    if (topics.length <= 1) {
      toast.warning('Cannot delete the last topic')
      return
    }
    
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        await contentService.deleteTopic(topicId)
        const newTopics = topics.filter(t => t.id !== topicId)
        setTopics(newTopics)
        if (activeTopic === topicId && newTopics.length > 0) {
          setActiveTopic(newTopics[0].id)
        }
        toast.success('Topic deleted successfully')
      } catch (err) {
        toast.error('Failed to delete topic')
      }
    }
  }

  const handleContentUpdate = async (topicId, content) => {
    try {
      await contentService.updateContent(topicId, content)
      setTopics(topics.map(t => 
        t.id === topicId ? { ...t, content } : t
      ))
    } catch (err) {
      toast.error('Failed to update content')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="text-center">
          <Spinner />
          <p className="text-surface-600 dark:text-surface-400 mt-4">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Error Loading Content
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">{error}</p>
          <Button onClick={loadTopics} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700"
      >
        <ApperIcon 
          name={isMobileMenuOpen ? "X" : "Menu"} 
          className="w-5 h-5 text-surface-600 dark:text-surface-400" 
        />
      </button>

      {/* Topics Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isMobileMenuOpen || window.innerWidth >= 1024 ? 0 : -300 }}
          className="fixed lg:sticky top-0 left-0 h-screen w-80 lg:w-80 bg-white dark:bg-surface-800 shadow-xl lg:shadow-soft z-40 overflow-y-auto border-r border-surface-200 dark:border-surface-700"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                Content Topics
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
              >
                <ApperIcon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
            <Button
              onClick={handleAddTopic}
              variant="primary"
              size="sm"
              className="w-full"
              icon="Plus"
            >
              Add Topic
            </Button>
          </div>

          {/* Topics List */}
          <nav className="p-4 space-y-2">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-xl transition-all duration-300 ${
                  activeTopic === topic.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                {editingTopic === topic.id ? (
                  <div className="p-4">
                    <input
                      type="text"
                      value={topic.title}
                      onChange={(e) => handleUpdateTopic(topic.id, { title: e.target.value })}
                      onBlur={() => setEditingTopic(null)}
                      onKeyPress={(e) => e.key === 'Enter' && setEditingTopic(null)}
                      className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                      autoFocus
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToTopic(topic.id)}
                    className="w-full text-left p-4 flex items-center group"
                  >
                    <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm font-bold transition-colors ${
                      activeTopic === topic.id
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-400 group-hover:bg-primary/20 group-hover:text-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="flex-1 font-medium text-sm leading-relaxed">
                      {topic.title}
                    </span>
                    {activeTopic === topic.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full ml-2"
                      />
                    )}
                  </button>
                )}

                {/* Topic Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingTopic(topic.id)
                      }}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Edit2" className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteTopic(topic.id)
                      }}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                    >
                      <ApperIcon name="Trash2" className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </nav>

          {/* Progress Indicator */}
          <div className="p-4 border-t border-surface-200 dark:border-surface-700 mt-auto">
            <div className="bg-surface-100 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((topics.findIndex(t => t.id === activeTopic) + 1) / topics.length) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-surface-600 dark:text-surface-400 mt-2 text-center">
              Topic {topics.findIndex(t => t.id === activeTopic) + 1} of {topics.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
          {topics.map((topic, index) => (
            <motion.section
              key={topic.id}
              ref={(el) => contentRefs.current[topic.id] = el}
              id={topic.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-16 scroll-mt-20"
            >
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                      <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-surface-900 dark:text-white">
                        {topic.title}
                      </h2>
                      <p className="text-surface-500 dark:text-surface-400 mt-1">
                        Section {index + 1} of {topics.length}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setEditingContent(editingContent === topic.id ? null : topic.id)}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon 
                      name={editingContent === topic.id ? "Eye" : "Edit2"} 
                      className="w-5 h-5 text-surface-600 dark:text-surface-400" 
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {editingContent === topic.id ? (
                  <textarea
                    value={topic.content}
                    onChange={(e) => handleContentUpdate(topic.id, e.target.value)}
                    className="w-full h-64 p-4 border border-surface-200 dark:border-surface-700 rounded-xl bg-white dark:bg-surface-800 text-surface-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your content here..."
                  />
                ) : (
                  <div className="text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-wrap">
                    {topic.content}
                  </div>
                )}
              </div>

              {/* Sections */}
              {topic.sections && topic.sections.length > 0 && (
                <div className="mt-8 space-y-6">
                  {topic.sections.map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                      className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700"
                    >
                      <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                        {section.title}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {section.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}

          {/* Completion Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white"
          >
            <ApperIcon name="CheckCircle" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Content Complete!</h3>
            <p className="text-lg mb-6">
              You've reached the end of the content. Feel free to add more topics or edit existing ones.
            </p>
            <Button
              onClick={handleAddTopic}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-surface-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              Add New Topic
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default ContentPage