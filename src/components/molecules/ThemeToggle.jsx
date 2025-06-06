import ToggleButton from '@/components/atoms/ToggleButton'

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <ToggleButton
      onClick={() => setDarkMode(!darkMode)}
      iconName={darkMode ? 'Sun' : 'Moon'}
      className="fixed top-6 right-6 z-50 bg-white dark:bg-surface-800"
    />
  )
}

export default ThemeToggle