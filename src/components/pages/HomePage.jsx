import { useState } from 'react'
import OnboardingStepper from '@/components/organisms/OnboardingStepper'

function HomePage({ darkMode, setDarkMode }) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleStepComplete = (stepIndex) => {
    // Logic to handle step completion (e.g., show confetti for final step)
    // This could also be managed inside OnboardingSection directly.
    // Keeping it here for demonstration that HomePage can still react to events.
  }

  const handleNavigate = (stepIndex) => {
    // Logic to handle navigation
  }

  return (
    <OnboardingStepper 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
      showConfetti={showConfetti} 
      onStepComplete={handleStepComplete}
      onNavigate={handleNavigate}
    />
  )
}

export default HomePage