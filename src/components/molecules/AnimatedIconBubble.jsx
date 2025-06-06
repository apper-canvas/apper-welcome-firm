import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

function AnimatedIconBubble({ iconName, bubbleClass, iconClass, animate, transition }) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`absolute rounded-full flex items-center justify-center ${bubbleClass}`}
    >
      <ApperIcon name={iconName} className={iconClass} />
    </motion.div>
  )
}

export default AnimatedIconBubble