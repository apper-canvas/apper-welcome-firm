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
      id: 'welcome-to-apper',
      title: 'Welcome to Apper',
      content: `
        <h2 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome to Apper! 🎉</h2>
        
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-purple-200 dark:border-purple-700 mb-8">
          <h3 class="text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-4">Transform Your Ideas Into Reality</h3>
          <p class="text-lg text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
            Apper is the revolutionary platform that empowers you to build professional applications without writing a single line of code. Whether you're an entrepreneur, designer, or business professional, Apper makes app development accessible to everyone.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div class="text-2xl mb-2">🚀</div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Fast Launch</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Go from idea to app in minutes</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div class="text-2xl mb-2">🎨</div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Beautiful Design</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Professional templates included</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div class="text-2xl mb-2">⚡</div>
              <h4 class="font-semibold text-gray-900 dark:text-white">No Code</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Build with visual tools</p>
            </div>
          </div>
        </div>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Your Journey Starts Here</h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            This comprehensive guide will walk you through every aspect of Apper, from your first app to advanced features that will make your applications stand out. Each topic is designed to build upon the previous one, ensuring you gain a complete understanding of the platform's capabilities.
          </p>
          
          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 mb-6">
            <h4 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">💡 Pro Tip</h4>
            <p class="text-amber-800 dark:text-amber-200">
              Take your time with each section. The best way to learn Apper is by following along and trying out the features as you go. Don't hesitate to experiment!
            </p>
          </div>
        </div>
      `,
      order: 1
    },
{
      id: 'what-is-apper',
      title: 'What is Apper?',
      content: `
        <h2 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">What is Apper?</h2>
        
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-700 mb-8">
          <h3 class="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">The No-Code Revolution</h3>
          <p class="text-lg text-blue-800 dark:text-blue-200 leading-relaxed mb-6">
            Apper is a comprehensive no-code platform that democratizes app development. It's designed for creators, entrepreneurs, and businesses who want to build powerful applications without the complexity of traditional programming.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">🎯 Purpose</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Bridge the gap between having great ideas and turning them into functional applications that can scale and generate revenue.
              </p>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Eliminate technical barriers</li>
                <li>Accelerate time to market</li>
                <li>Reduce development costs</li>
                <li>Enable rapid iteration</li>
              </ul>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">⚙️ How It Works</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Using intuitive visual interfaces, drag-and-drop components, and smart automation, you can create sophisticated applications.
              </p>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Visual app builder</li>
                <li>Pre-built components</li>
                <li>Database management</li>
                <li>API integrations</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <h3 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Core Philosophy</h3>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div class="text-center mb-6">
              <div class="text-4xl mb-4">🌟</div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">"Everyone Should Be Able to Build"</h4>
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              We believe that great ideas shouldn't be limited by technical knowledge. Apper empowers anyone with vision and creativity to build professional applications that can compete in today's digital marketplace.
            </p>
          </div>

          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Who Uses Apper?</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
              <div class="text-3xl mb-3">🚀</div>
              <h4 class="font-bold mb-2">Entrepreneurs</h4>
              <p class="text-sm opacity-90">Launch MVPs and validate business ideas quickly</p>
            </div>
            
            <div class="text-center p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
              <div class="text-3xl mb-3">🏢</div>
              <h4 class="font-bold mb-2">Businesses</h4>
              <p class="text-sm opacity-90">Create internal tools and customer-facing apps</p>
            </div>
            
            <div class="text-center p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
              <div class="text-3xl mb-3">🎨</div>
              <h4 class="font-bold mb-2">Creators</h4>
              <p class="text-sm opacity-90">Turn creative concepts into interactive experiences</p>
            </div>
          </div>
        </div>
      `,
      order: 2
    },
{
      id: 'what-you-can-build',
      title: 'What You Can Build',
      content: `
        <h2 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">What You Can Build with Apper</h2>
        
        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-xl border border-indigo-200 dark:border-indigo-700 mb-8">
          <h3 class="text-2xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Limitless Possibilities</h3>
          <p class="text-lg text-indigo-800 dark:text-indigo-200 leading-relaxed">
            From simple landing pages to complex enterprise applications, Apper provides the tools and flexibility to bring any digital idea to life. Here are just some examples of what our users have built.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">💼</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Business Applications</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• CRM systems</li>
              <li>• Project management tools</li>
              <li>• Inventory tracking</li>
              <li>• HR management portals</li>
              <li>• Customer support platforms</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🛒</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">E-commerce Solutions</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Online stores</li>
              <li>• Marketplace platforms</li>
              <li>• Booking systems</li>
              <li>• Subscription services</li>
              <li>• Digital product delivery</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">📱</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Mobile Apps</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Social networking apps</li>
              <li>• Fitness trackers</li>
              <li>• Event management</li>
              <li>• Food delivery apps</li>
              <li>• Educational platforms</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🎓</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Educational Platforms</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Online courses</li>
              <li>• Student portals</li>
              <li>• Quiz applications</li>
              <li>• Certification systems</li>
              <li>• Learning management</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🏥</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Healthcare Solutions</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Patient management</li>
              <li>• Appointment scheduling</li>
              <li>• Telemedicine platforms</li>
              <li>• Health tracking apps</li>
              <li>• Medical records systems</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🎨</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Creative Platforms</h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Portfolio websites</li>
              <li>• Content management</li>
              <li>• Media galleries</li>
              <li>• Creative marketplaces</li>
              <li>• Collaboration tools</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-xl text-white text-center mb-8">
          <h3 class="text-2xl font-bold mb-4">Success Stories</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/10 p-4 rounded-lg">
              <div class="text-2xl font-bold mb-2">$2M+</div>
              <div class="text-sm opacity-90">Revenue generated by Apper apps</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <div class="text-2xl font-bold mb-2">50K+</div>
              <div class="text-sm opacity-90">Apps built and deployed</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <div class="text-2xl font-bold mb-2">95%</div>
              <div class="text-sm opacity-90">User satisfaction rate</div>
            </div>
          </div>
        </div>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6">
            <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Your Turn</h4>
            <p class="text-blue-800 dark:text-blue-200">
              Ready to build your own application? The next section will guide you through creating your first app step by step. Don't worry if you're not sure what to build yet - we'll help you discover the perfect project for your needs.
            </p>
          </div>
        </div>
      `,
      order: 4
    },
{
      id: 'create-your-first-app',
      title: 'Create Your First App',
      content: `
        <h2 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Create Your First App</h2>
        
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl border border-green-200 dark:border-green-700 mb-8">
          <h3 class="text-2xl font-semibold text-green-900 dark:text-green-100 mb-4">🚀 Ready to Launch</h3>
          <p class="text-lg text-green-800 dark:text-green-200 leading-relaxed">
            Now that you understand what Apper can do, let's create your first application! This step-by-step guide will walk you through the entire process, from initial concept to published app.
          </p>
        </div>

        <div class="space-y-8 mb-8">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                1
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Choose Your App Type</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div class="text-2xl mb-2">📱</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Mobile App</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Perfect for on-the-go users</p>
              </div>
              <div class="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div class="text-2xl mb-2">💻</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Web App</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Accessible from any browser</p>
              </div>
              <div class="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div class="text-2xl mb-2">🖥️</div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Desktop App</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Full-featured desktop experience</p>
              </div>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <p class="text-blue-800 dark:text-blue-200 text-sm">
                💡 <strong>Tip:</strong> Start with a web app - it's the easiest to build and can be accessed from any device!
              </p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                2
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Select a Template</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div class="bg-gradient-to-br from-indigo-400 to-purple-500 h-32 flex items-center justify-center">
                  <span class="text-white text-lg font-semibold">Business Dashboard</span>
                </div>
                <div class="p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Startup Essentials</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Perfect for new businesses needing core functionality</p>
                </div>
              </div>
              
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div class="bg-gradient-to-br from-emerald-400 to-teal-500 h-32 flex items-center justify-center">
                  <span class="text-white text-lg font-semibold">E-commerce Store</span>
                </div>
                <div class="p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Online Shop</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Complete solution for selling products online</p>
                </div>
              </div>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
              <p class="text-green-800 dark:text-green-200 text-sm">
                🎨 <strong>Pro Tip:</strong> Don't worry about getting it perfect - you can always customize everything later!
              </p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                3
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Customize Your App</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">🎨</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Design & Branding</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Colors, fonts, logo, and overall look</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📝</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Content & Copy</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Text, images, and other content</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">⚙️</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Features & Functionality</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Add or remove features as needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 rounded-xl text-white text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Start Building?</h3>
          <p class="text-lg opacity-90 mb-6">
            Your app is just a few clicks away. Let's turn your idea into reality!
          </p>
          <button class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
            Start Building Now
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
    if (!topics.length || typeof window === 'undefined' || !window.IntersectionObserver) return

    const observer = new window.IntersectionObserver(
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
          animate={{ x: sidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -300 }}
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
                        onClick={() => navigate(`/topic/${topic.id}`)}
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
                            navigate(`/topic/${topic.id}`)
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
        <div className="flex-1 lg:ml-0 relative">
          {/* Admin Controls Bar */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 z-30 admin-controls-bar rounded-xl shadow-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={addNewTopic}
                  className="flex items-center space-x-2 admin-button"
                  title="Add new content topic"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const activeTopic = topics.find(t => t.id === activeTopicId)
                    if (activeTopic) {
                      setEditingContent(activeTopic.id)
                      // Scroll to active topic
                      const element = document.getElementById(activeTopic.id)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    } else {
                      toast.info('Please select a topic to edit')
                    }
                  }}
                  className="flex items-center space-x-2 admin-button"
                  title="Edit currently selected topic"
                  disabled={!activeTopicId}
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (activeTopicId) {
                      deleteTopic(activeTopicId)
                    } else {
                      toast.info('Please select a topic to delete')
                    }
                  }}
                  className="flex items-center space-x-2 admin-button"
                  title="Delete currently selected topic"
                  disabled={!activeTopicId}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </motion.div>
          )}

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