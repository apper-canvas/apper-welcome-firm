import { useState } from 'react'
import CoursePage from '@/components/pages/CoursePage'
import WelcomeScreen from '@/components/pages/WelcomeScreen'

function HomePage({ darkMode, setDarkMode }) {
  const [showCourse, setShowCourse] = useState(false)

  const handleGetStarted = () => {
    setShowCourse(true)
  }

  if (showCourse) {
    return (
      <CoursePage 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
    )
  }

  return (
    <WelcomeScreen 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
      onGetStarted={handleGetStarted}
    />
  )
}

export default HomePage