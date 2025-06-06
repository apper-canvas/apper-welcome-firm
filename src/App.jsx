import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import WelcomeScreen from '@/components/pages/WelcomeScreen'
import ContentPage from '@/components/pages/ContentPage'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import ApperIcon from '@/components/ApperIcon'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-surface-900' : 'bg-surface-50'
      }`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Navigation Bar */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link to="/" className="flex items-center space-x-2">
                    <ApperIcon name="Zap" className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-surface-900 dark:text-white">
                      Apper
                    </span>
                  </Link>
                  <div className="hidden md:flex items-center space-x-6">
                    <Link 
                      to="/" 
                      className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <Link 
                      to="/content" 
                      className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors"
                    >
                      Content
                    </Link>
</div>
                </div>
                <ThemeToggle
                  darkMode={darkMode}
                  onToggle={() => setDarkMode(!darkMode)}
                />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/content" element={<ContentPage />} />
            </Routes>
          </div>

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? 'dark' : 'light'}
          />
        </motion.div>
      </div>
    </Router>
  )
}