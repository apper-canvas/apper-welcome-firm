import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WelcomeScreen from '@/components/pages/WelcomeScreen'
import OnboardingPage from '@/components/pages/OnboardingPage'
import HomePage from '@/components/pages/HomePage'
import CoursePage from '@/components/pages/CoursePage'
import CustomContentPage from '@/components/pages/CustomContentPage'
import TopicsPage from '@/components/pages/TopicsPage'
import NotFound from '@/pages/NotFound'
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode')
    return savedTheme ? JSON.parse(savedTheme) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/custom-content" element={<CustomContentPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
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
      </Router>
    </div>
  )
}

export default App