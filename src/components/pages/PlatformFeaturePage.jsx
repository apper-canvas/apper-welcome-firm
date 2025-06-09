import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, Clock, Menu, X, ExternalLink, Play, CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import platformFeatureService from '@/services/api/platformFeatureService'

const PlatformFeaturePage = () => {
  const { featureId } = useParams()
  const navigate = useNavigate()
  const [feature, setFeature] = useState(null)
  const [allFeatures, setAllFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadFeatureData()
    loadAllFeatures()
  }, [featureId])

  const loadFeatureData = async () => {
    try {
      setLoading(true)
      setError(null)
      const featureData = await platformFeatureService.getFeatureById(featureId)
      setFeature(featureData)
    } catch (err) {
      setError(err.message)
      console.error('Error loading feature:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadAllFeatures = async () => {
    try {
      const features = await platformFeatureService.getAllFeatures()
      setAllFeatures(features)
    } catch (err) {
      console.error('Error loading all features:', err)
    }
  }

  const getCurrentFeatureIndex = () => {
    return allFeatures.findIndex(f => f.id === featureId)
  }

  const getNextFeature = () => {
    const currentIndex = getCurrentFeatureIndex()
    return currentIndex < allFeatures.length - 1 ? allFeatures[currentIndex + 1] : null
  }

  const getPreviousFeature = () => {
    const currentIndex = getCurrentFeatureIndex()
    return currentIndex > 0 ? allFeatures[currentIndex - 1] : null
  }

  const getRelatedFeatures = () => {
    return allFeatures.filter(f => f.id !== featureId && f.category === feature?.category).slice(0, 3)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading feature information...</p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Feature Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => navigate('/content')} variant="primary">
            Back to Platform Overview
          </Button>
        </div>
      </div>
    )
  }

  const nextFeature = getNextFeature()
  const previousFeature = getPreviousFeature()
  const relatedFeatures = getRelatedFeatures()

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/content')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Overview</span>
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
        {/* Sidebar - All Features */}
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
                  <ApperIcon name="settings" className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platform Features</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => navigate('/content')}
              className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Platform Overview</span>
            </button>
          </div>

          {/* Features Navigation */}
          <div className="p-4 overflow-y-auto h-full">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">All Features</h3>
            <div className="space-y-2">
              {allFeatures.map((f, index) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/platform-feature/${f.id}`)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    f.id === featureId
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      f.id === featureId
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      <ApperIcon name={f.icon} className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm truncate">{f.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Related Features */}
            {relatedFeatures.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Features</h3>
                <div className="space-y-2">
                  {relatedFeatures.map((relatedFeature) => (
                    <button
                      key={relatedFeature.id}
                      onClick={() => navigate(`/platform-feature/${relatedFeature.id}`)}
                      className="w-full text-left p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <ApperIcon name={relatedFeature.icon} className="w-4 h-4" />
                        <span className="text-sm">{relatedFeature.title}</span>
                      </div>
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
                onClick={() => navigate('/content')}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Platform Features
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium">{feature?.title}</span>
            </motion.div>

            {/* Feature Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${feature?.gradient || 'bg-gradient-to-br from-purple-500 to-blue-500'}`}>
                  <ApperIcon name={feature?.icon} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    {feature?.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {feature?.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{feature?.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{feature?.category}</span>
                </div>
                {feature?.difficulty && (
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    feature.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    feature.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {feature.difficulty}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Feature Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is {feature?.title}?</h2>
                <div 
                  dangerouslySetInnerHTML={{ __html: feature?.overview }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                />
              </div>

              {/* Benefits */}
              {feature?.benefits && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How it Works */}
              {feature?.howItWorks && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How It Works</h2>
                  <div className="space-y-6">
                    {feature.howItWorks.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {feature?.useCases && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Use Cases</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feature.useCases.map((useCase, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="text-2xl mb-3">{useCase.icon}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Getting Started */}
              {feature?.gettingStarted && (
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-8 text-white">
                  <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                  <p className="text-lg opacity-90 mb-6">{feature.gettingStarted}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="secondary" 
                      className="bg-white text-purple-600 hover:bg-gray-100"
                      onClick={() => toast.info('Feature available in your Apper dashboard')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Try It Now
                    </Button>
                    {feature?.documentationLink && (
                      <Button 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/10"
                        onClick={() => toast.info('Documentation coming soon')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Documentation
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700 mt-12"
            >
              <div>
                {previousFeature && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/platform-feature/${previousFeature.id}`)}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Previous</div>
                      <div className="text-sm font-medium">{previousFeature.title}</div>
                    </div>
                  </Button>
                )}
              </div>

              <div>
                {nextFeature && (
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/platform-feature/${nextFeature.id}`)}
                    className="flex items-center space-x-2"
                  >
                    <div className="text-right">
                      <div className="text-xs text-white/80">Next</div>
                      <div className="text-sm font-medium">{nextFeature.title}</div>
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

export default PlatformFeaturePage