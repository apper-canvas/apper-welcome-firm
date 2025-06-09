import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, Plus, Edit2, Trash2, Save, X, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ContentPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [activeTopicId, setActiveTopicId] = useState('introduction')
  const [editingTopic, setEditingTopic] = useState(null)
  const [editingContent, setEditingContent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topics, setTopics] = useState([
    {
      id: 'introduction',
      title: 'Introduction',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to Our Platform</h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">This comprehensive guide will help you understand all the features and capabilities of our platform. Navigate through the topics on the left to explore different sections.</p>
        <p class="text-gray-700 dark:text-gray-300">Each section contains detailed information, examples, and practical tips to help you get the most out of your experience.</p>
      `
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Getting Started Guide</h2>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">First Steps</h3>
        <ul class="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Create your account and complete the onboarding process</li>
          <li>Explore the dashboard and familiarize yourself with the interface</li>
          <li>Set up your preferences and customize your experience</li>
          <li>Start with the basic tutorials to learn the fundamentals</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-300">Take your time to explore each feature. The platform is designed to be intuitive and user-friendly.</p>
      `
    },
    {
      id: 'features',
      title: 'Key Features',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Platform Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Content Management</h4>
            <p class="text-gray-700 dark:text-gray-300">Easily create, edit, and organize your content with our intuitive editor.</p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Analytics</h4>
            <p class="text-gray-700 dark:text-gray-300">Track your progress and performance with detailed analytics and insights.</p>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300">These features work together to provide a comprehensive solution for your needs.</p>
      `
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Features</h2>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Customization</h3>
        <p class="mb-4 text-gray-700 dark:text-gray-300">Learn how to customize the platform to match your specific workflow and requirements.</p>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Integrations</h3>
        <p class="mb-4 text-gray-700 dark:text-gray-300">Connect with external tools and services to extend the platform's capabilities.</p>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">API Access</h3>
        <p class="text-gray-700 dark:text-gray-300">For developers: Learn how to use our API to build custom integrations and applications.</p>
      `
    },
    {
      id: 'support',
      title: 'Support & Help',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Getting Help</h2>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Contact Options</h3>
        <div class="space-y-3 mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700 dark:text-gray-300">Email Support: support@platform.com</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-gray-700 dark:text-gray-300">Live Chat: Available 24/7</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-gray-700 dark:text-gray-300">Community Forum: Join the discussion</span>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300">Our support team is here to help you succeed. Don't hesitate to reach out with any questions or concerns.</p>
      `
    }
  ])

  const contentRef = useRef(null)
  const topicRefs = useRef({})

  // Intersection Observer for auto-highlighting active topic
  useEffect(() => {
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

  const scrollToTopic = (topicId) => {
    setActiveTopicId(topicId)
    setSidebarOpen(false)
    const element = document.getElementById(topicId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const addNewTopic = () => {
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: 'New Topic',
      content: `
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">New Topic</h2>
        <p class="text-gray-700 dark:text-gray-300">Add your content here...</p>
      `
    }
    setTopics([...topics, newTopic])
    setEditingTopic(newTopic.id)
    toast.success('New topic added!')
  }

  const deleteTopic = (topicId) => {
    if (topics.length <= 1) {
      toast.error('Cannot delete the last topic')
      return
    }
    setTopics(topics.filter(t => t.id !== topicId))
    if (activeTopicId === topicId) {
      setActiveTopicId(topics[0].id)
    }
    toast.success('Topic deleted!')
  }

  const updateTopicTitle = (topicId, newTitle) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, title: newTitle } : t
    ))
    setEditingTopic(null)
    toast.success('Topic title updated!')
  }

  const updateTopicContent = (topicId, newContent) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, content: newContent } : t
    ))
    setEditingContent(null)
    toast.success('Content updated!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex h-screen lg:h-auto">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Content Guide</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => navigate('/')}
              className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mt-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {topics.map((topic) => (
                <div key={topic.id} className="group">
                  {editingTopic === topic.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        defaultValue={topic.title}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateTopicTitle(topic.id, e.target.value)
                          } else if (e.key === 'Escape') {
                            setEditingTopic(null)
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input')
                          updateTopicTitle(topic.id, input.value)
                        }}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => scrollToTopic(topic.id)}
                      className={`
                        flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                        ${activeTopicId === topic.id 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <span className="font-medium truncate">{topic.title}</span>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingTopic(topic.id)
                          }}
                          className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteTopic(topic.id)
                          }}
                          className="p-1 hover:bg-red-500 hover:bg-opacity-20 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Topic Button */}
            <button
              onClick={addNewTopic}
              className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Topic</span>
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div ref={contentRef} className="h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  id={topic.id}
                  ref={(el) => (topicRefs.current[topic.id] = el)}
                  className="min-h-screen flex flex-col justify-start pt-8"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                    {editingContent === topic.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Content</h2>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const textarea = document.querySelector(`textarea[data-topic="${topic.id}"]`)
                                updateTopicContent(topic.id, textarea.value)
                              }}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingContent(null)}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        <textarea
                          data-topic={topic.id}
                          defaultValue={topic.content.trim()}
                          className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                          placeholder="Enter HTML content..."
                        />
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
                          <button
                            onClick={() => setEditingContent(topic.id)}
                            className="ml-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPage