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
    setAnimatedElements([]) // Clear elements since interactive step is removed
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
              className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 mb-12 leading-relaxed max-w-5xl mx-auto"
            >
              Apper is your AI app creator. It's not just powered by AI — it is AI. Kind of like ChatGPT, but instead of giving you answers, Apper builds fully functional apps based on your inputs in a few minutes. You don't need to write code, pick design templates, or juggle multiple tools to handle different parts of an app. With Apper, everything happens in one place, all through a simple conversation. Just chat with Apper in your simple, everyday English and tell it what kind of app you need. It builds and improves your app instantly based on your chat inputs. In short, Apper is the simplest way to build complete, functional apps — just by having a conversation with AI.
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
            className="max-w-6xl mx-auto space-y-16"
          >
            {/* What is Apper Section */}
            <div className="text-center mb-16">
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
                className="text-xl text-surface-600 dark:text-surface-400 max-w-4xl mx-auto leading-relaxed"
              >
                Apper is your AI app creator that builds fully functional apps through conversation.
                Most tools help with only one part of building an app. You might use one for design, another for databases, 
                something else for login, payments, hosting, testing, & more. With Apper, everything happens in one place.
              </motion.p>
            </div>

            {/* Main Process Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                    <h3 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                      The AI builds your app from start to finish:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-surface-600 dark:text-surface-400">
                      <div className="flex items-center space-x-2">
                        <Icon name="Layout" className="w-4 h-4 text-primary" />
                        <span>Pages and layouts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MousePointer" className="w-4 h-4 text-primary" />
                        <span>Buttons and forms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Zap" className="w-4 h-4 text-primary" />
                        <span>How your app behaves</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Database" className="w-4 h-4 text-primary" />
                        <span>Where the data goes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Shield" className="w-4 h-4 text-primary" />
                        <span>How users log in</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="CreditCard" className="w-4 h-4 text-primary" />
                        <span>How you get paid</span>
                      </div>
                    </div>
                  </div>
                  
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
              </motion.div>
            </div>

            {/* Why Apper Stands Out Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-700"
            >
              <div className="text-center mb-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="text-3xl md:text-5xl font-heading font-bold text-purple-900 dark:text-purple-200 mb-6"
                >
                  Why Apper Stands Out
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-lg text-purple-700 dark:text-purple-300 max-w-3xl mx-auto"
                >
                  What truly sets Apper apart is how natural it feels. You just speak with Apper in your plain everyday language, 
                  and it understands what to build, how it should look, and how it should work.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "MessageCircle",
                    title: "Natural Conversation",
                    description: "No technical jargon or complex interfaces. Just tell Apper what you want in plain English.",
                    color: "from-blue-500 to-purple-500"
                  },
                  {
                    icon: "Layers",
                    title: "Complete Solution",
                    description: "Everything from design to deployment happens in one place. No juggling multiple tools.",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: "Zap",
                    title: "Instant Results",
                    description: "See your app come to life in minutes, not weeks. Make changes through simple conversation.",
                    color: "from-pink-500 to-orange-500"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                    className="bg-white/50 dark:bg-surface-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-4 flex items-center justify-center`}>
                      <Icon name={feature.icon} className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-heading font-bold text-purple-900 dark:text-purple-200 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What You Can Build Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-white dark:bg-surface-800 rounded-3xl p-8 md:p-12 shadow-card"
            >
              <div className="text-center mb-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="text-3xl md:text-5xl font-heading font-bold text-surface-900 dark:text-white mb-6"
                >
                  What You Can Build
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                  className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto"
                >
                  From simple tools to complex applications, Apper can build anything you can imagine
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "ShoppingCart",
                    title: "E-commerce Stores",
                    description: "Online shops with payment processing, inventory management, and customer accounts",
                    color: "from-green-500 to-emerald-500",
                    examples: ["Product catalogs", "Shopping carts", "Order tracking"]
                  },
                  {
                    icon: "Calendar",
                    title: "Booking Systems",
                    description: "Appointment scheduling with payments, reminders, and calendar integration",
                    color: "from-blue-500 to-cyan-500",
                    examples: ["Service bookings", "Event scheduling", "Resource management"]
                  },
                  {
                    icon: "Users",
                    title: "Customer Management",
                    description: "CRM systems to track leads, customers, and sales pipelines",
                    color: "from-purple-500 to-violet-500",
                    examples: ["Contact databases", "Sales tracking", "Communication logs"]
                  },
                  {
                    icon: "BarChart3",
                    title: "Analytics Dashboards",
                    description: "Data visualization and reporting tools for business insights",
                    color: "from-orange-500 to-red-500",
                    examples: ["Performance metrics", "Data charts", "Custom reports"]
                  },
                  {
                    icon: "Gamepad2",
                    title: "Interactive Games",
                    description: "Quiz games, trivia apps, and educational interactive content",
                    color: "from-pink-500 to-rose-500",
                    examples: ["Quiz competitions", "Learning games", "Team challenges"]
                  },
                  {
                    icon: "FileText",
                    title: "Form & Survey Tools",
                    description: "Data collection forms with validation and automated responses",
                    color: "from-indigo-500 to-blue-500",
                    examples: ["Feedback forms", "Registration systems", "Data collection"]
                  }
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                    className="bg-surface-50 dark:bg-surface-700 rounded-2xl p-6 border border-surface-200 dark:border-surface-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl mb-4 flex items-center justify-center`}>
                      <Icon name={category.icon} className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-heading font-bold text-surface-900 dark:text-white mb-2">
                      {category.title}
                    </h4>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="space-y-1">
                      {category.examples.map((example, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-xs text-surface-500 dark:text-surface-500">{example}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
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
                  onClick={() => onNavigate(1)}
                  className="px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  icon="ArrowLeft"
                >
                  Back
</Button>

                <Button
                  onClick={() => onStepComplete(currentStep)}
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