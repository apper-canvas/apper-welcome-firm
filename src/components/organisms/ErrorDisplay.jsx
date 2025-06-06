import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white dark:bg-surface-800 p-8 rounded-2xl shadow-card">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-6">{message}</p>
        <Button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}

export default ErrorDisplay