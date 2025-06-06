import { motion } from 'framer-motion'

function ConfettiParticle({ index }) {
  const colors = ['bg-primary', 'bg-secondary', 'bg-accent']
  const color = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: '50vw', y: '50vh' }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotate: 360
      }}
      transition={{ duration: 2, delay: index * 0.1 }}
      className={`absolute w-4 h-4 ${color} rounded-full`}
    />
  )
}

export default ConfettiParticle