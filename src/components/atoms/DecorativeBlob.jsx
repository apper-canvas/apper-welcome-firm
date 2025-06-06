import { motion } from 'framer-motion'

function DecorativeBlob({ animate, transition, className }) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  )
}

export default DecorativeBlob