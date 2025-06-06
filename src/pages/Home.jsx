import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { onboardingService } from '../services'

function Home({ darkMode, setDarkMode }) {
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [userProgress, setUserProgress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [stepsResult, progressResult] = await Promise.all([
          onboardingService.getSteps(),
          onboardingService.getUserProgress()
        ])
        setSteps(stepsResult || [])
        setUserProgress(progressResult || {})
        setCurrentStep(progressResult?.currentStep || 0)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load onboarding data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleStepComplete = async (stepIndex) => {
    try {
      const updatedProgress = await onboardingService.updateProgress({
        currentStep: Math.min(stepIndex + 1, steps.length - 1),
        completedSteps: [...(userProgress?.completedSteps || []), stepIndex],
        interactions: [...(userProgress?.interactions || []), {
          type: 'step_completed',
          stepIndex,
          timestamp: new Date().toISOString()
        }]
      })
      setUserProgress(updatedProgress)
      setCurrentStep(updatedProgress.currentStep)
      
      if (stepIndex === steps.length - 1) {
        setShowConfetti(true)
        toast.success('🎉 Onboarding completed! Welcome to Apper!')
        setTimeout(() => setShowConfetti(false), 3000)
      } else {
        toast.success('Step completed!')
      }
    } catch (err) {
      toast.error('Failed to save progress')
    }
  }

  const navigateToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading your onboarding experience...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white dark:bg-surface-800 p-8 rounded-2xl shadow-card">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-surface-800 rounded-full shadow-card hover:scale-110 transition-transform"
      >
        <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5 text-surface-700 dark:text-surface-300" />
      </button>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: '50vw', y: '50vh' }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  rotate: 360
                }}
                transition={{ duration: 2, delay: i * 0.1 }}
                className={`absolute w-4 h-4 ${
                  i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-accent'
                } rounded-full`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Indicator */}
        {steps.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    onClick={() => navigateToStep(index)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-primary text-white shadow-lg hover:scale-110'
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1}
                  </motion.button>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-colors ${
                      index < currentStep ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-surface-600 dark:text-surface-400 text-lg">
              Step {currentStep + 1} of {steps.length}
            </p>
          </motion.div>
        )}

        {/* Main Feature Component */}
        <MainFeature
          steps={steps}
          currentStep={currentStep}
          userProgress={userProgress}
          onStepComplete={handleStepComplete}
          onNavigate={navigateToStep}
        />
      </div>
    </div>
  )
}

export default Home