import { motion, AnimatePresence } from 'framer-motion'
import ConfettiParticle from '@/components/atoms/ConfettiParticle'
import DecorativeBlob from '@/components/atoms/DecorativeBlob'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import OnboardingSection from '@/components/organisms/OnboardingSection'

function OnboardingStepper({ darkMode, setDarkMode, showConfetti, onStepComplete, onNavigate }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(20)].map((_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorativeBlob
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 -top-20 -right-20"
        />
        <DecorativeBlob
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 top-1/4 -left-20"
        />
      </div>

      <OnboardingSection onStepComplete={onStepComplete} onNavigate={onNavigate} />
    </div>
  )
}

export default OnboardingStepper