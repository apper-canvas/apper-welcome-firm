import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import ReactQuill from 'react-quill'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'
import PageLayout from '@/components/templates/PageLayout'
import { 
  getTopics, 
  getTopicById, 
  createTopic, 
  updateTopic, 
  deleteTopic,
  validateTopicTitle,
  validateTopicContent
} from '@/services/api/customContentService'

// React Quill modules configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
}

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'link', 'image'
]

function CustomContentPage() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Editing state
  const [editMode, setEditMode] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTopicId, setDeleteTopicId] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    icon: 'FileText',
    content: ''
  })
  const [formErrors, setFormErrors] = useState({})
  
  // Refs
  const titleInputRef = useRef(null)
  const contentEditorRef = useRef(null)

  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    try {
      setLoading(true)
      const data = await getTopics()
      setTopics(data)
      if (!selectedTopic && data.length > 0) {
        setSelectedTopic(data[0].id)
      }
    } catch (err) {
      setError('Failed to load topics')
      toast.error('Failed to load topics')
      console.error('Error loading topics:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTopicClick = (topicId) => {
    if (editMode) {
      const confirm = window.confirm('You have unsaved changes. Do you want to continue?')
      if (!confirm) return
    }
    
    setSelectedTopic(topicId)
    setIsMobileMenuOpen(false)
    setEditMode(false)
    setIsCreating(false)
    setFormErrors({})
  }

  const startEditing = async () => {
    if (!selectedTopic) return
    
    try {
      const topicData = await getTopicById(selectedTopic)
      if (topicData) {
        setFormData({
          title: topicData.title,
          subtitle: topicData.subtitle || '',
          icon: topicData.icon,
          content: convertSectionsToHTML(topicData.sections)
        })
        setEditMode(true)
        setFormErrors({})
        
        // Focus on title input after a brief delay
        setTimeout(() => {
          titleInputRef.current?.focus()
        }, 100)
      }
    } catch (err) {
      toast.error('Failed to load topic for editing')
      console.error('Error loading topic for editing:', err)
    }
  }

  const startCreating = () => {
    setFormData({
      title: '',
      subtitle: '',
      icon: 'FileText',
      content: ''
    })
    setIsCreating(true)
    setEditMode(true)
    setFormErrors({})
    
    // Focus on title input after a brief delay
    setTimeout(() => {
      titleInputRef.current?.focus()
    }, 100)
  }

  const cancelEditing = () => {
    const hasChanges = formData.title || formData.subtitle || formData.content
    if (hasChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?')
      if (!confirm) return
    }
    
    setEditMode(false)
    setIsCreating(false)
    setFormData({
      title: '',
      subtitle: '',
      icon: 'FileText',
      content: ''
    })
    setFormErrors({})
  }

  const validateForm = () => {
    const errors = {}
    
    // Validate title
    const titleError = validateTopicTitle(formData.title, topics, isCreating ? null : selectedTopic)
    if (titleError) {
      errors.title = titleError
    }
    
    // Validate content
    if (!formData.content || formData.content.trim() === '' || formData.content.trim() === '<p><br></p>') {
      errors.content = 'Content is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors')
      return
    }
    
    try {
      setSaving(true)
      
      const topicData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        icon: formData.icon,
        sections: convertHTMLToSections(formData.content)
      }
      
      if (isCreating) {
        const newTopic = await createTopic(topicData)
        await loadTopics()
        setSelectedTopic(newTopic.id)
        toast.success('Topic created successfully!')
      } else {
        await updateTopic(selectedTopic, topicData)
        await loadTopics()
        toast.success('Topic updated successfully!')
      }
      
      setEditMode(false)
      setIsCreating(false)
      setFormData({
        title: '',
        subtitle: '',
        icon: 'FileText',
        content: ''
      })
      setFormErrors({})
      
    } catch (err) {
      toast.error(err.message || 'Failed to save topic')
      console.error('Error saving topic:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTopicId) return
    
    try {
      await deleteTopic(deleteTopicId)
      await loadTopics()
      
      // Select another topic if the deleted one was selected
      if (selectedTopic === deleteTopicId) {
        const remainingTopics = topics.filter(t => t.id !== deleteTopicId)
        setSelectedTopic(remainingTopics.length > 0 ? remainingTopics[0].id : null)
      }
      
      toast.success('Topic deleted successfully!')
      setShowDeleteConfirm(false)
      setDeleteTopicId(null)
      
    } catch (err) {
      toast.error(err.message || 'Failed to delete topic')
      console.error('Error deleting topic:', err)
    }
  }

  const convertSectionsToHTML = (sections) => {
    if (!sections || sections.length === 0) return ''
    
    return sections.map(section => {
      switch (section.type) {
        case 'text':
          return `<h3>${section.heading || ''}</h3><p>${section.content || ''}</p>`
        case 'list':
          const listItems = (section.items || []).map(item => `<li>${item}</li>`).join('')
          return `<h3>${section.heading || ''}</h3><ul>${listItems}</ul>`
        case 'steps':
          const stepItems = (section.steps || []).map(step => 
            `<li><strong>${step.title}</strong>: ${step.description}</li>`
          ).join('')
          return `<h3>${section.heading || ''}</h3><ol>${stepItems}</ol>`
        default:
          return ''
      }
    }).join('')
  }

  const convertHTMLToSections = (html) => {
    // Basic conversion - in a real app, you'd want more sophisticated parsing
    const sections = []
    
    if (html && html.trim()) {
      sections.push({
        heading: 'Content',
        type: 'text',
        content: html.replace(/<[^>]*>/g, '').trim() // Strip HTML tags for basic text content
      })
    }
    
    return sections
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
            <Button onClick={loadTopics} className="mt-4">
              Try Again
            </Button>
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
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={startCreating}
                    variant="primary"
                    size="sm"
                    disabled={editMode}
                    aria-label="Add new topic"
                  >
                    <Icon name="Plus" className="w-4 h-4" />
                  </Button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <Icon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                {editMode ? 'Editing content' : 'Explore detailed information on various topics'}
              </p>
            </div>

            {/* Topics List */}
            <nav className="p-4 space-y-2">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center">
                    <motion.button
                      onClick={() => handleTopicClick(topic.id)}
                      className={`flex-1 text-left p-4 rounded-xl transition-all duration-300 flex items-center ${
                        selectedTopic === topic.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={editMode}
                    >
                      <div className={`w-10 h-10 rounded-full mr-4 flex items-center justify-center transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-400 group-hover:bg-primary/20 group-hover:text-primary'
                      }`}>
                        <Icon name={topic.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm leading-relaxed block truncate">
                          {topic.title}
                        </span>
                      </div>
                      {selectedTopic === topic.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full ml-2 flex-shrink-0"
                        />
                      )}
                    </motion.button>
                    
                    {/* Topic Actions */}
                    {selectedTopic === topic.id && !editMode && (
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={startEditing}
                          className="p-2 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg transition-colors"
                          aria-label="Edit topic"
                        >
                          <Icon name="Edit2" className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTopicId(topic.id)
                            setShowDeleteConfirm(true)
                          }}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          aria-label="Delete topic"
                        >
                          <Icon name="Trash2" className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </nav>

            {/* Progress Indicator */}
            {topics.length > 0 && (
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
            )}
          </motion.div>
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
            {editMode ? (
              // Edit Form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-heading font-bold text-surface-900 dark:text-white">
                    {isCreating ? 'Create New Topic' : 'Edit Topic'}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={cancelEditing}
                      variant="ghost"
                      size="sm"
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      variant="primary"
                      size="sm"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Icon name="Save" className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                  <div className="space-y-6">
                    {/* Topic Title */}
                    <div>
                      <label htmlFor="topic-title" className="form-label">
                        Topic Title *
                      </label>
                      <input
                        ref={titleInputRef}
                        id="topic-title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`form-input ${formErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Enter topic title"
                        aria-describedby={formErrors.title ? 'title-error' : undefined}
                      />
                      {formErrors.title && (
                        <p id="title-error" className="form-error" role="alert">
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    {/* Topic Subtitle */}
                    <div>
                      <label htmlFor="topic-subtitle" className="form-label">
                        Topic Subtitle
                      </label>
                      <input
                        id="topic-subtitle"
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="form-input"
                        placeholder="Enter topic subtitle (optional)"
                      />
                    </div>

                    {/* Topic Content */}
                    <div>
                      <label htmlFor="topic-content" className="form-label">
                        Topic Content *
                      </label>
                      <div className={`quill-editor ${formErrors.content ? 'border-red-500' : ''}`}>
                        <ReactQuill
                          ref={contentEditorRef}
                          value={formData.content}
                          onChange={(value) => setFormData({ ...formData, content: value })}
                          modules={quillModules}
                          formats={quillFormats}
                          placeholder="Write your topic content here..."
                          aria-describedby={formErrors.content ? 'content-error' : undefined}
                        />
                      </div>
                      {formErrors.content && (
                        <p id="content-error" className="form-error" role="alert">
                          {formErrors.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : selectedTopicData ? (
              // Display Topic
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
            ) : topics.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Icon name="FileText" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  No Topics Yet
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Get started by creating your first topic
                </p>
                <Button onClick={startCreating} variant="primary">
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Create First Topic
                </Button>
              </motion.div>
            ) : null}
          </div>
        </main>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-md w-full border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <Icon name="Trash2" className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                      Delete Topic
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Are you sure you want to delete this topic? All content will be permanently removed.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="ghost"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="danger"
                    size="sm"
                  >
                    Delete Topic
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </PageLayout>
  )
}

export default CustomContentPage