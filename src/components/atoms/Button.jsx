import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function Button({ children, onClick, className, icon, whileHover, whileTap, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center justify-center ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {icon && <ApperIcon name={icon} className="w-6 h-6 mr-2" />}
      {children}
    </motion.button>
  )
}

export default Button