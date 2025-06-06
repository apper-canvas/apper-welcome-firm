import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import OnboardingSection from '@/components/organisms/OnboardingSection'

function OnboardingPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [isComplete, setIsComplete] = useState(false)

  const handleStepComplete = (stepIndex) => {
    // Handle individual step completion
    console.log(`Step ${stepIndex} completed`)
  }

  const handleNavigate = (stepIndex) => {
    // Handle step navigation
    console.log(`Navigated to step ${stepIndex}`)
  }

  const handleOnboardingComplete = () => {
    setIsComplete(true)
    // Navigate to home page after a brief delay
    setTimeout(() => {
      navigate('/home')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 transition-colors duration-300">
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="zap" className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Apper
          </h1>
        </motion.div>

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {/* Main Onboarding Content */}
      <OnboardingSection
        onStepComplete={handleStepComplete}
        onNavigate={handleNavigate}
        onComplete={handleOnboardingComplete}
      />

      {/* Completion Overlay */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-8 text-center max-w-md mx-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="check" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              Welcome to Apper! 🎉
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              You're all set! Redirecting to your dashboard...
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default OnboardingPage