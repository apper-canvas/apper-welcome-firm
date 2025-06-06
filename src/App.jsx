import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from '@/components/pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

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
          <div className="max-w-screen-2xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
    </div>
  )
}

export default App