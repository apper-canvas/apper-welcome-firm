function Spinner({ className }) {
  return (
    <div className={`w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 ${className}`}></div>
  )
}

export default Spinner