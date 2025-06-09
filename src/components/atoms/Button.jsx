import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function Button({ 
  children, 
  onClick, 
  className = '', 
  icon, 
  whileHover = { scale: 1.05 }, 
  whileTap = { scale: 0.95 }, 
  variant = 'primary',
  size = 'md',
  ...props 
}) {
const baseClasses = 'flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed admin-button'
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
    ghost: 'text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
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