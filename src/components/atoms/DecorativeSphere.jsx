import { motion } from 'framer-motion'

function DecorativeSphere({ animate, transition, className }) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`absolute rounded-full flex items-center justify-center ${className}`}
    />
  )
}

export default DecorativeSphere