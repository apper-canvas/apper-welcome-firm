import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function ToggleButton({ onClick, iconName, className }) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-3 rounded-full shadow-card hover:scale-110 transition-transform ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name={iconName} className="w-5 h-5" />
    </motion.button>
  )
}

export default ToggleButton