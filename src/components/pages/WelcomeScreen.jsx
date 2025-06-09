import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import DecorativeBlob from '@/components/atoms/DecorativeBlob'

function WelcomeScreen({ darkMode, setDarkMode }) {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/content')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-orange-900/20">
      
      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorativeBlob
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-64 h-64 bg-gradient-to-br from-purple-300/30 to-blue-300/30 -top-32 -right-32"
        />
        <DecorativeBlob
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-48 h-48 bg-gradient-to-br from-orange-300/30 to-pink-300/30 top-1/4 -left-24"
        />
        <DecorativeBlob
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-32 h-32 bg-gradient-to-br from-purple-400/20 to-orange-400/20 bottom-20 right-20"
        />
      </div>

{/* Main Content */}
      <div className="relative z-10 px-4 py-16">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <ApperIcon name="zap" className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Welcome to Apper
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                The future of app development is here
              </p>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold font-heading bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent leading-tight"
            >
              Turn Ideas into Apps
              <span className="block text-4xl md:text-6xl mt-2">— In Minutes</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Just describe your app idea, and Apper builds it for you — instantly.
              <span className="block mt-2">No coding required. No complex setup. Just pure creativity.</span>
            </motion.p>

            {/* Get Started Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="pt-8 flex justify-center"
            >
              <Button
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
                className="text-xl px-12 py-5 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-3">
                  <span>Get Started with Apper</span>
                  <ApperIcon name="arrow-right" className="w-6 h-6" />
                </span>
              </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 text-sm text-gray-500 dark:text-gray-400 space-y-2"
            >
              <div className="flex items-center justify-center space-x-1 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p>No credit card required</p>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <p>Start building in under 2 minutes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 blur-sm"
      />
      
      <motion.div
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-30 blur-sm"
      />
    </div>
  )
}

export default WelcomeScreen