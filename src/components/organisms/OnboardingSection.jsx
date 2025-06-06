import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { onboardingService } from '@/services'
import ProgressBar from '@/components/molecules/ProgressBar'
import StepContent from '@/components/organisms/StepContent'
import Spinner from '@/components/atoms/Spinner'
import ErrorDisplay from '@/components/organisms/ErrorDisplay'

function OnboardingSection({ onStepComplete, onNavigate }) {
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

  const handleStepCompleteInternal = async (stepIndex) => {
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
      onStepComplete(stepIndex) // Notify parent if needed
    } catch (err) {
      toast.error('Failed to save progress')
    }
  }

  const navigateToStepInternal = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex)
      onNavigate(stepIndex) // Notify parent if needed
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-surface-600 dark:text-surface-400">Loading your onboarding experience...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {steps.length > 0 && (
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onNavigate={navigateToStepInternal}
        />
      )}

      <StepContent
        steps={steps}
        currentStep={currentStep}
        userProgress={userProgress}
        onStepComplete={handleStepCompleteInternal}
        onNavigate={navigateToStepInternal}
      />
    </div>
  )
}

export default OnboardingSection