import { motion } from 'framer-motion'
import PageLayout from '@/components/templates/PageLayout'
import ApperIcon from '@/components/ApperIcon'

function ContentPage({ darkMode, setDarkMode }) {
  return (
    <PageLayout darkMode={darkMode} setDarkMode={setDarkMode} title="About Apper">
      <div className="relative overflow-hidden">
        {/* Main Content */}
        <div className="space-y-32 py-8">
          
          {/* What is Apper Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What is Apper?
            </h1>
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

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Describe Your Idea",
                  description: "Tell us what you want to build in plain English. No technical jargon needed.",
                  icon: "message-square"
                },
                {
                  step: "2", 
                  title: "AI Builds Your App",
                  description: "Our AI analyzes your requirements and generates a fully functional app automatically.",
                  icon: "cpu"
                },
                {
                  step: "3",
                  title: "Launch & Iterate", 
                  description: "Deploy instantly and make changes anytime. Your app evolves with your needs.",
                  icon: "rocket"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card border border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <ApperIcon name={item.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform -translate-y-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Platform Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                Everything you need to build, deploy, and manage your applications
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Your App Is Being Built...", desc: "Watch in real-time as AI creates your application", icon: "loader" },
                { title: "Your App's First Version Is Ready 🎉", desc: "Get your working prototype in minutes", icon: "check-circle" },
                { title: "Edit, Modify, or Add New Features", desc: "Continuously improve your app with simple requests", icon: "edit" },
                { title: "Troubleshooting Errors", desc: "AI-powered debugging and error resolution", icon: "alert-circle" },
                { title: "App Versions", desc: "Manage different versions of your application", icon: "git-branch" },
                { title: "Mobile vs Desktop Preview", desc: "See how your app looks on all devices", icon: "monitor" },
                { title: "Manage App Settings", desc: "Configure your app's behavior and appearance", icon: "settings" },
                { title: "Onboarding and Emails", desc: "Set up user flows and email notifications", icon: "mail" },
                { title: "Billing and Revenue", desc: "Monetize your app with built-in payment systems", icon: "credit-card" },
                { title: "Code Section", desc: "Access and customize the generated code", icon: "code" },
                { title: "Database Setup", desc: "Automatic database configuration and management", icon: "database" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={feature.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </PageLayout>
  )
}

export default ContentPage