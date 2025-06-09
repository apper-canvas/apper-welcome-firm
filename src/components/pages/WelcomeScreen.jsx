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
      <div className="relative z-10 px-4 py-16 space-y-32">
        
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

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
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

        {/* What is Apper Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            What is Apper?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Apper is a revolutionary AI-powered platform that transforms your app ideas into fully functional applications in minutes, not months.
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Simply describe what you want to build, and our advanced AI understands your vision, designs the interface, writes the code, and deploys your app — all automatically.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">AI-powered app generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">No coding knowledge required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Deploy instantly to web and mobile</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center">
                <ApperIcon name="smartphone" className="w-24 h-24 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Apper Stands Out Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Why Apper Stands Out
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
                <ApperIcon name="zap" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Traditional app development takes months. With Apper, your app is ready in minutes. From concept to deployment — faster than ever before.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mx-auto">
                <ApperIcon name="brain" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Smart AI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI doesn't just generate code — it understands context, user experience, and best practices to create apps that work beautifully.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto">
                <ApperIcon name="users" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">For Everyone</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you're a startup founder, designer, or have zero tech experience — Apper makes app development accessible to everyone.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* What You Can Build Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            What You Can Build
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'shopping-cart', title: 'E-commerce Apps', desc: 'Online stores with payments, inventory, and analytics' },
              { icon: 'calendar', title: 'Productivity Tools', desc: 'Task managers, calendars, and workflow applications' },
              { icon: 'message-circle', title: 'Social Platforms', desc: 'Community apps, chat systems, and social networks' },
              { icon: 'bar-chart', title: 'Business Dashboards', desc: 'Analytics tools, CRM systems, and reporting apps' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-6 space-y-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto">
                  <ApperIcon name={item.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From simple landing pages to complex enterprise applications — if you can imagine it, Apper can build it.
          </p>
        </motion.div>

        {/* Create Your First App Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Create Your First App
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to see the magic? Start building your first app right now. It takes less than 2 minutes to go from idea to working prototype.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
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

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <span>Describe your idea</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                <span className="text-secondary font-semibold text-sm">2</span>
              </div>
              <span>AI builds your app</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent font-semibold text-sm">3</span>
              </div>
              <span>Launch and iterate</span>
            </div>
          </div>
        </motion.div>
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