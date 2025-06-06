import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-surface-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-surface-600 dark:text-surface-400">
        {description}
      </p>
    </motion.div>
  )
}

export default FeatureCard