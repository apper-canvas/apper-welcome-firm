import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function ProcessStep({ step, title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay }}
      className="flex items-start space-x-4"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-sm">{step}</span>
      </div>
      <div>
        <h4 className="font-semibold text-lg text-surface-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-surface-600 dark:text-surface-400">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default ProcessStep