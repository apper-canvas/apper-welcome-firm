import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import FeatureCard from '@/components/molecules/FeatureCard'
import ProcessStep from '@/components/molecules/ProcessStep'
import AnimatedIconBubble from '@/components/molecules/AnimatedIconBubble'
import AppCanvas from '@/components/organisms/AppCanvas'

function StepContent({ steps, currentStep, userProgress, onStepComplete, onNavigate }) {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [animatedElements, setAnimatedElements] = useState([])

  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (currentStep === 2) {
      setAnimatedElements([
        { id: 1, type: 'button', x: 100, y: 50, label: 'Add Button' },
        { id: 2, type: 'text', x: 300, y: 100, label: 'Add Text' },
        { id: 3, type: 'image', x: 200, y: 200, label: 'Add Image' }
      ])
    } else {
      setAnimatedElements([]) // Clear elements if not on step 3
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

  const resetCanvasElements = () => {
    setAnimatedElements([])
    setTimeout(() => {
      setAnimatedElements([
        { id: Date.now() + 1, type: 'button', x: 150, y: 80, label: 'Welcome Button' },
        { id: Date.now() + 2, type: 'text', x: 50, y: 150, label: 'Hello World!' },
        { id: Date.now() + 3, type: 'image', x: 250, y: 120, label: 'Hero Image' }
      ])
    }, 200)
  }

  const renderContent = () => {
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
                  <Icon name="Sparkles" className="w-16 h-16 text-white" />
                </div>
                <AnimatedIconBubble
                  iconName="Sparkles"
                  bubbleClass="w-8 h-8 bg-accent -top-2 -right-2"
                  iconClass="w-4 h-4 text-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
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
              <Button
                onClick={() => onStepComplete(0)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl text-lg shadow-card"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                icon="Play"
>
                Get Started
              </Button>

              <Button
                onClick={() => onNavigate(1)}
                className="px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-semibold rounded-2xl hover:bg-primary hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip Tour
              </Button>
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
                Apper is your AI app creator that builds fully functional apps through conversation.
                Just chat with Apper in simple English and tell it what kind of app you need.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <motion.div
initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <Icon name="Brain" className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  {[
                    { step: '1', title: 'Start a Conversation', desc: 'Chat with Apper about your app idea in simple English', icon: 'MessageSquare' },
                    { step: '2', title: 'AI Builds Your App', desc: 'Apper creates your app based on your conversation', icon: 'Bot' },
                    { step: '3', title: 'Refine and Launch', desc: 'Chat to improve your app and publish instantly', icon: 'Rocket' }
                  ].map((item, index) => (
                    <ProcessStep
                      key={item.step}
                      step={item.step}
                      title={item.title}
                      description={item.desc}
                      icon={item.icon}
                      delay={0.6 + index * 0.2}
                    />
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
                  
                  <AnimatedIconBubble
                    iconName="Wand2"
                    bubbleClass="w-12 h-12 bg-accent -top-6 -right-6"
                    iconClass="w-6 h-6 text-white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                <div className="flex justify-center mt-8 space-x-4">
                  {['Drag', 'Drop', 'Done'].map((action, index) => (
                    <Button
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
                    </Button>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => onNavigate(0)}
                  className="px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  icon="ArrowLeft"
                >
                  Back
                </Button>

                <Button
                  onClick={() => onStepComplete(1)}
                  className="px-8 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold rounded-2xl text-lg shadow-card"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  icon="ArrowRight"
                >
                  Let's Try It!
                </Button>
              </div>
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
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-6"
              >
                <h3 className="font-heading font-bold text-lg text-surface-900 dark:text-white mb-4 flex items-center">
                  <Icon name="Package" className="w-5 h-5 mr-2 text-primary" />
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
                      <Icon name={component.icon} className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{component.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <AppCanvas
                animatedElements={animatedElements}
                handleElementDrag={handleElementDrag}
                resetElements={resetCanvasElements}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => onNavigate(1)}
                  className="px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  icon="ArrowLeft"
                >
                  Back
                </Button>

                <Button
                  onClick={() => onStepComplete(2)}
                  className="px-8 py-4 bg-gradient-to-r from-accent to-orange-500 text-white font-semibold rounded-2xl text-lg shadow-card"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  icon="CheckCircle"
                >
                  Complete Onboarding
                </Button>
              </div>
            </motion.div>
          </motion.div>
)

      case 3:
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
                Create Your First App
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto mb-8"
              >
                Ready to build? Here's how to get started with your first app
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 mb-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Icon name="MessageSquarePlus" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  The Prompt Box
                </h3>
                <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                  When you log in to Apper, you'll see a large prompt box in the center of the screen. 
                  This is where you tell Apper what kind of app you want to build, just like you're explaining it to a friend.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Customer Order Tracker",
                    prompt: "I want to build a tool to track customer orders.",
                    description: "Perfect for small businesses managing orders",
                    color: "from-primary to-primary-dark"
                  },
                  {
                    title: "Booking & Payment App", 
                    prompt: "Make an app where users can book sessions and pay online.",
                    description: "Great for service providers and consultants",
                    color: "from-secondary to-secondary-dark"
                  },
                  {
                    title: "Quiz Game",
                    prompt: "Create a quiz game that gives points and tracks team progress.",
                    description: "Ideal for education and team building",
                    color: "from-accent to-orange-500"
                  }
                ].map((example, index) => (
                  <motion.div
                    key={example.title}
                    initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 border border-surface-200 dark:border-surface-600"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${example.color} rounded-lg mb-4 flex items-center justify-center`}>
                      <Icon name="Lightbulb" className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-heading font-bold text-surface-900 dark:text-white mb-2">
                      {example.title}
                    </h4>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 italic">
                      "{example.prompt}"
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-500">
                      {example.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-purple-900 dark:text-purple-200 mb-2">
                      Pro Tip: Use ChatGPT First
                    </h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm">
                      To help Apper understand your idea more clearly, we strongly recommend refining your prompt first with ChatGPT. 
                      This will help you articulate your vision more precisely and get better results from Apper.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => onNavigate(2)}
                  className="px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  icon="ArrowLeft"
                >
                  Back
                </Button>

                <Button
                  onClick={() => onStepComplete(3)}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl text-lg shadow-card"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  icon="CheckCircle"
                >
                  Complete Onboarding
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )

      default:
        return (
          <div className="text-center py-20">
            <Icon name="Loader" className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-surface-600 dark:text-surface-400">Loading step content...</p>
          </div>
        )
    }
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
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StepContent