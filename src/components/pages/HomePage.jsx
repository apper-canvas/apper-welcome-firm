import CoursePage from '@/components/pages/CoursePage'

function HomePage({ darkMode, setDarkMode }) {
  return (
    <CoursePage 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
    />
  )
}

export default HomePage