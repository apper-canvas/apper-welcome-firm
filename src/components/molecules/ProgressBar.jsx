import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

function ProgressBar({ steps, currentStep, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex items-center justify-center space-x-4 mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <Button
              onClick={() => onNavigate(index)}
              className={`w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-primary text-white shadow-lg hover:scale-110'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </Button>
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
  )
}

export default ProgressBar