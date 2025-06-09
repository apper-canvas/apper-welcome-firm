import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WelcomeScreen from '@/components/pages/WelcomeScreen'
import ContentPage from '@/components/pages/ContentPage'
import CourseContentPage from '@/components/pages/CourseContentPage'
import TopicContentPage from '@/components/pages/TopicContentPage'
import PlatformFeaturePage from '@/components/pages/PlatformFeaturePage'
import CoursePage from '@/components/pages/CoursePage'
import CourseSettingsPage from '@/components/pages/CourseSettingsPage'
import HomePage from '@/components/pages/HomePage'

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you're looking for doesn't exist.</p>
    </div>
  </div>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto">
<Routes>
            <Route path="/" element={<WelcomeScreen darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/home" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/content" element={<ContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/course" element={<CoursePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/course-content" element={<CourseContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/topic/:topicId" element={<TopicContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/platform-feature/:featureId" element={<PlatformFeaturePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/course-settings" element={<CourseSettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
      </div>
    </Router>
  )
}

export default App