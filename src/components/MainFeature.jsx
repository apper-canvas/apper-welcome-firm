import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

function MainFeature({ steps, currentStep, userProgress, onStepComplete, onNavigate }) {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [animatedElements, setAnimatedElements] = useState([])

  const currentStepData = steps[currentStep]

  useEffect(() => {
    // Initialize animated elements for step 3
    if (currentStep === 2) {
      setAnimatedElements([
        { id: 1, type: 'button', x: 100, y: 50, label: 'Add Button' },
        { id: 2, type: 'text', x: 300, y: 100, label: 'Add Text' },
        { id: 3, type: 'image', x: 200, y: 200, label: 'Add Image' }
      ])
    }
  }, [currentStep])

  const handleDemoInteraction = (demoType) => {
    setSelectedDemo(demoType)
    setTimeout(() => setSelectedDemo(null), 2000)
  }

  const handleElementDrag = (elementId, newPosition) => {
    setAnimatedElements(prev => 
      prev.map(el => 
        el.id === elementId ? { ...el, x: newPosition.x, y: newPosition.y } : el
      )
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-card">
                  <ApperIcon name="Zap" className="w-16 h-16 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                >
                  <ApperIcon name="Sparkles" className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6"
            >
              Welcome to Apper!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 mb-12 leading-relaxed"
            >
              Ready to build amazing apps without writing a single line of code? 
              Let's get you started on your no-code journey!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => onStepComplete(0)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl text-lg shadow-card hover:shadow-lg transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="Play" className="w-6 h-6 mr-2" />
                Get Started
              </motion.button>

              <motion.button
                onClick={() => onNavigate(1)}
                className="px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip Tour
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: 'Palette', title: 'Beautiful Design', desc: 'Drag & drop stunning components' },
                { icon: 'Zap', title: 'Lightning Fast', desc: 'Build apps in minutes, not months' },
                { icon: 'Users', title: 'No Code Required', desc: 'Perfect for non-technical users' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-surface-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-heading font-bold text-surface-900 dark:text-white mb-6"
              >
                What is Apper?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto"
              >
                Apper is your friendly no-code platform that turns ideas into reality. 
                Build websites, apps, and tools without any programming knowledge!
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-6">
                  How it works:
                </h3>
                <div className="space-y-6">
                  {[
                    { step: '1', title: 'Choose a Template', desc: 'Pick from hundreds of beautiful templates', icon: 'Layout' },
                    { step: '2', title: 'Customize Everything', desc: 'Drag, drop, and style with our visual editor', icon: 'Edit3' },
                    { step: '3', title: 'Publish Instantly', desc: 'Share your creation with the world in one click', icon: 'Globe' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-surface-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-surface-600 dark:text-surface-400">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="h-4 bg-gradient-to-r from-primary to-secondary rounded w-3/4"></div>
                    <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
                    <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-2/3"></div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        className="h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-dashed border-primary/30"
                      />
                      <motion.div
                        animate={{ y: [2, -2, 2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg border-2 border-dashed border-accent/30"
                      />
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center"
                  >
                    <ApperIcon name="Magic" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <div className="flex justify-center mt-8 space-x-4">
                  {['Drag', 'Drop', 'Done'].map((action, index) => (
                    <motion.button
                      key={action}
                      onClick={() => handleDemoInteraction(action.toLowerCase())}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        selectedDemo === action.toLowerCase()
                          ? 'bg-primary text-white scale-110'
                          : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:scale-105'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                onClick={() => onStepComplete(1)}
                className="px-8 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold rounded-2xl text-lg shadow-card hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="ArrowRight" className="w-6 h-6 mr-2" />
                Let's Try It!
              </motion.button>
            </motion.div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-heading font-bold text-surface-900 dark:text-white mb-6"
              >
                Let's Build Your First App!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto"
              >
                Try our interactive demo! Drag the elements around to see how easy it is to build with Apper.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Component Palette */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-6"
              >
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="Package" className="w-5 h-5 mr-2 text-primary" />
                  Components
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Button', icon: 'Square', color: 'bg-primary' },
                    { name: 'Text', icon: 'Type', color: 'bg-secondary' },
                    { name: 'Image', icon: 'Image', color: 'bg-accent' },
                    { name: 'Form', icon: 'FileText', color: 'bg-purple-500' }
                  ].map((component) => (
                    <motion.div
                      key={component.name}
                      className={`p-3 ${component.color} rounded-xl text-white cursor-pointer hover:scale-105 transition-transform flex items-center`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      drag
                      dragSnapToOrigin
                    >
                      <ApperIcon name={component.icon} className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{component.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Canvas Area */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:col-span-2 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 rounded-2xl shadow-card p-8 relative min-h-96 border-2 border-dashed border-surface-300 dark:border-surface-600"
              >
                <div className="absolute top-4 left-4 text-surface-500 dark:text-surface-400 text-sm">
                  Your App Canvas - Drag components here!
                </div>

                <AnimatePresence>
                  {animatedElements.map((element) => (
                    <motion.div
                      key={element.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      drag
                      dragMomentum={false}
                      onDrag={(event, info) => {
                        handleElementDrag(element.id, {
                          x: element.x + info.offset.x,
                          y: element.y + info.offset.y
                        })
                      }}
                      className={`absolute cursor-pointer select-none`}
                      style={{ left: element.x, top: element.y }}
                      whileHover={{ scale: 1.1 }}
                      whileDrag={{ scale: 1.1, zIndex: 50 }}
                    >
                      <div className={`p-3 rounded-xl shadow-card ${
                        element.type === 'button' ? 'bg-primary text-white' :
                        element.type === 'text' ? 'bg-secondary text-white' :
                        'bg-accent text-white'
                      }`}>
                        <ApperIcon 
                          name={element.type === 'button' ? 'Square' : element.type === 'text' ? 'Type' : 'Image'} 
                          className="w-4 h-4 mr-2 inline" 
                        />
                        {element.label}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="absolute bottom-4 right-4">
                  <motion.button
                    onClick={() => {
                      setAnimatedElements([])
                      setTimeout(() => {
                        setAnimatedElements([
                          { id: Date.now() + 1, type: 'button', x: 150, y: 80, label: 'Welcome Button' },
                          { id: Date.now() + 2, type: 'text', x: 50, y: 150, label: 'Hello World!' },
                          { id: Date.now() + 3, type: 'image', x: 250, y: 120, label: 'Hero Image' }
                        ])
                      }, 200)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ApperIcon name="RefreshCw" className="w-4 h-4 mr-1 inline" />
                    Reset
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => onNavigate(1)}
                  className="px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2 inline" />
                  Back
                </motion.button>

                <motion.button
                  onClick={() => onStepComplete(2)}
                  className="px-8 py-4 bg-gradient-to-r from-accent to-orange-500 text-white font-semibold rounded-2xl text-lg shadow-card hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="CheckCircle" className="w-6 h-6 mr-2 inline" />
                  Complete Onboarding
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  if (!currentStepData) {
    return (
      <div className="text-center py-20">
        <ApperIcon name="Loader" className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-surface-600 dark:text-surface-400">Loading step content...</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MainFeature