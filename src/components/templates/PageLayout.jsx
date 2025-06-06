function PageLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {children}
    </div>
  )
}

export default PageLayout