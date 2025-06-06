import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

function Icon({ name, className, animate, transition, initial }) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      <ApperIcon name={name} className="w-full h-full" />
    </motion.div>
  )
}

export default Icon