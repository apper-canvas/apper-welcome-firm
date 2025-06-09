import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Plus, Edit2, Trash2, Save, X, Menu, Search, BookOpen, Eye, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'

const CourseContentPage = () => {
  const navigate = useNavigate()
  const [activeTopicId, setActiveTopicId] = useState(null)
  const [editingTopic, setEditingTopic] = useState(null)
  const [editingContent, setEditingContent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true) // Mock admin status
  const [topics, setTopics] = useState([])

  const contentRef = useRef(null)
  const topicRefs = useRef({})

  // Mock data - would come from service in real app
  const initialTopics = [
    {
      id: 'introduction',
      title: 'Introduction to the Platform',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to Our Learning Platform</h2>
        <p class="mb-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">This comprehensive course will guide you through all the features and capabilities of our platform. Each section builds upon the previous one, providing you with a complete understanding of how to maximize your learning experience.</p>
        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">What You'll Learn</h3>
          <ul class="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1">
            <li>Navigation and interface basics</li>
            <li>Content creation and management</li>
            <li>Advanced features and customization</li>
            <li>Best practices and optimization</li>
          </ul>
        </div>
        <p class="text-gray-700 dark:text-gray-300">Navigate through the topics using the sidebar to explore each section in detail.</p>
      `,
      order: 1
    },
    {
      id: 'getting-started',
      title: 'Getting Started Guide',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Started</h2>
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">First Steps</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-3">Account Setup</h4>
            <ul class="list-disc list-inside text-purple-800 dark:text-purple-200 space-y-2">
              <li>Create your account</li>
              <li>Complete profile information</li>
              <li>Verify your email address</li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">Initial Configuration</h4>
            <ul class="list-disc list-inside text-green-800 dark:text-green-200 space-y-2">
              <li>Set up preferences</li>
              <li>Choose your learning path</li>
              <li>Configure notifications</li>
            </ul>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300">Take your time to familiarize yourself with the interface. The platform is designed to be intuitive and user-friendly.</p>
      `,
      order: 2
    },
    {
      id: 'content-management',
      title: 'Content Management',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Managing Your Content</h2>
        <p class="mb-6 text-lg text-gray-700 dark:text-gray-300">Learn how to create, organize, and maintain your course content effectively.</p>
        
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Creating Content</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Use the rich text editor to create engaging content with multimedia support.</p>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <code class="text-sm text-gray-800 dark:text-gray-200">
                // Example content structure<br>
                {<br>
                &nbsp;&nbsp;"title": "Your Topic Title",<br>
                &nbsp;&nbsp;"content": "Rich HTML content",<br>
                &nbsp;&nbsp;"order": 1<br>
                }
              </code>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Organizing Topics</h3>
            <p class="text-gray-700 dark:text-gray-300">Arrange your topics in a logical order to create the best learning experience.</p>
          </div>
        </div>
      `,
      order: 3
    },
    {
      id: 'advanced-features',
      title: 'Advanced Features',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Advanced Platform Features</h2>
        <p class="mb-6 text-lg text-gray-700 dark:text-gray-300">Explore advanced capabilities to enhance your learning experience.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white">
            <h3 class="text-xl font-bold mb-3">Analytics</h3>
            <p class="mb-4">Track progress and engagement with detailed analytics.</p>
            <div class="bg-white/20 p-3 rounded-lg">
              <div class="text-sm opacity-90">Progress: 85%</div>
              <div class="bg-white/30 rounded-full h-2 mt-2">
                <div class="bg-white rounded-full h-2" style="width: 85%"></div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl text-white">
            <h3 class="text-xl font-bold mb-3">Customization</h3>
            <p class="mb-4">Customize the interface to match your preferences.</p>
            <div class="flex space-x-2">
              <div class="w-4 h-4 bg-white/40 rounded-full"></div>
              <div class="w-4 h-4 bg-white/60 rounded-full"></div>
              <div class="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl text-white">
            <h3 class="text-xl font-bold mb-3">Integrations</h3>
            <p class="mb-4">Connect with external tools and services.</p>
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-white/20 p-2 rounded text-xs text-center">API</div>
              <div class="bg-white/20 p-2 rounded text-xs text-center">SSO</div>
              <div class="bg-white/20 p-2 rounded text-xs text-center">LMS</div>
            </div>
          </div>
        </div>
        
        <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6">
          <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">Pro Tip</h3>
          <p class="text-amber-800 dark:text-amber-200">Take advantage of keyboard shortcuts to navigate more efficiently. Press '/' to search topics quickly.</p>
        </div>
      `,
      order: 4
    },
    {
      id: 'support',
      title: 'Support & Resources',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Help & Support</h2>
        <p class="mb-6 text-lg text-gray-700 dark:text-gray-300">Find the help you need with our comprehensive support resources.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-green-200 dark:border-green-700">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Live Support</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Get instant help from our support team.</p>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Live chat: Available 24/7</li>
              <li>• Email: support@platform.com</li>
              <li>• Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-2 border-blue-200 dark:border-blue-700">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Community</h3>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Connect with other users and experts.</p>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Community forum</li>
              <li>• User groups</li>
              <li>• Knowledge base</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl text-white text-center">
          <h3 class="text-2xl font-bold mb-4">Need More Help?</h3>
          <p class="mb-6 text-lg opacity-90">Our support team is here to help you succeed. Don't hesitate to reach out!</p>
          <button class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>
      `,
      order: 5
    }
  ]

  // Initialize topics
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTopics(initialTopics)
      setActiveTopicId(initialTopics[0]?.id)
      setLoading(false)
    }, 500)
  }, [])

  // Intersection Observer for auto-highlighting active topic
  useEffect(() => {
    if (!topics.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTopicId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    topics.forEach((topic) => {
      const element = document.getElementById(topic.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [topics])

  // Filter topics based on search
  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToTopic = (topicId) => {
    setActiveTopicId(topicId)
    setSidebarOpen(false)
    const element = document.getElementById(topicId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const addNewTopic = () => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    const newTopic = {
      id: `topic-${Date.now()}`,
      title: 'New Topic',
      content: `
        <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">New Topic</h2>
        <p class="text-lg text-gray-700 dark:text-gray-300">Add your content here...</p>
      `,
      order: topics.length + 1
    }
    setTopics([...topics, newTopic])
    setEditingTopic(newTopic.id)
    toast.success('New topic added!')
  }

  const deleteTopic = (topicId) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    if (topics.length <= 1) {
      toast.error('Cannot delete the last topic')
      return
    }

    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter(t => t.id !== topicId))
      if (activeTopicId === topicId) {
        const remainingTopics = topics.filter(t => t.id !== topicId)
        setActiveTopicId(remainingTopics[0]?.id)
      }
      toast.success('Topic deleted!')
    }
  }

  const updateTopicTitle = (topicId, newTitle) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, title: newTitle } : t
    ))
    setEditingTopic(null)
    toast.success('Topic title updated!')
  }

  const updateTopicContent = (topicId, newContent) => {
    if (!isAdmin) {
      toast.error('Admin access required')
      return
    }

    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, content: newContent } : t
    ))
    setEditingContent(null)
    toast.success('Content updated!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading course content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 course-content-layout">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/course')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Course</span>
          </button>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <div className="flex items-center space-x-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                <Users className="w-3 h-3" />
                <span>Admin</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen lg:h-auto">
        {/* Left Sidebar - Table of Contents */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -300 }}
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 
            border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => navigate('/course')}
              className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </button>

            {isAdmin && (
              <div className="flex items-center space-x-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-2 rounded-lg">
                <Users className="w-3 h-3" />
                <span>Admin Mode</span>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <AnimatePresence>
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group topic-item"
                  >
                    {editingTopic === topic.id ? (
                      <div className="flex items-center space-x-2 p-2">
                        <input
                          type="text"
                          defaultValue={topic.title}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateTopicTitle(topic.id, e.target.value)
                            } else if (e.key === 'Escape') {
                              setEditingTopic(null)
                            }
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="success"
                          onClick={(e) => {
                            const input = e.target.closest('.flex').querySelector('input')
                            updateTopicTitle(topic.id, input.value)
                          }}
                          className="p-2"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => scrollToTopic(topic.id)}
                        className={`
                          flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                          ${activeTopicId === topic.id 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }
                        `}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            scrollToTopic(topic.id)
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${activeTopicId === topic.id 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                            }
                          `}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-sm truncate">{topic.title}</span>
                        </div>
                        
                        {isAdmin && (
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingTopic(topic.id)
                              }}
                              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                              title="Edit topic title"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteTopic(topic.id)
                              }}
                              className="p-1 hover:bg-red-500 hover:bg-opacity-20 rounded transition-colors"
                              title="Delete topic"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add Topic Button */}
            {isAdmin && (
              <motion.button
                onClick={addNewTopic}
                className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Topic</span>
              </motion.button>
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

        {/* Right Content Area */}
        <div className="flex-1 lg:ml-0">
          <div ref={contentRef} className="h-screen overflow-y-auto content-area">
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              {topics.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Content Available</h3>
                  <p className="text-gray-600 dark:text-gray-400">Start by adding your first topic.</p>
                </div>
              ) : (
                topics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    id={topic.id}
                    ref={(el) => (topicRefs.current[topic.id] = el)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="min-h-screen flex flex-col justify-start pt-8"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
                      {editingContent === topic.id ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Content</h2>
                            <div className="flex space-x-3">
                              <Button
                                variant="success"
                                onClick={() => {
                                  const textarea = document.querySelector(`textarea[data-topic="${topic.id}"]`)
                                  updateTopicContent(topic.id, textarea.value)
                                }}
                                className="flex items-center space-x-2"
                              >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() => setEditingContent(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                          <textarea
                            data-topic={topic.id}
                            defaultValue={topic.content.trim()}
                            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                            placeholder="Enter HTML content..."
                          />
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            You can use HTML tags to format your content. Changes will be saved automatically.
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <div 
                                dangerouslySetInnerHTML={{ __html: topic.content }}
                                className="prose prose-lg dark:prose-invert max-w-none"
                              />
                            </div>
                            
                            {/* Admin Controls */}
                            {isAdmin && (
                              <div className="ml-6 flex flex-col space-y-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingContent(topic.id)}
                                  className="flex items-center space-x-2"
                                  title="Edit content"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  <span className="hidden sm:inline">Edit</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    // Toggle preview mode
                                    toast.info('Preview mode - content is read-only')
                                  }}
                                  className="flex items-center space-x-2"
                                  title="Preview mode"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="hidden sm:inline">Preview</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => deleteTopic(topic.id)}
                                  className="flex items-center space-x-2"
                                  title="Delete topic"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseContentPage