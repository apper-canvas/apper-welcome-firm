import { useState, useEffect } from 'react'
import WelcomeScreen from '@/components/pages/WelcomeScreen'

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
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-purple-50 dark:from-surface-900 dark:to-purple-900 transition-colors duration-300">
        <WelcomeScreen darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  )
}

export default App