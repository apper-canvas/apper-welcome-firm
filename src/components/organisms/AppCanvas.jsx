import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

function AppCanvas({ animatedElements, handleElementDrag, resetElements }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="lg:col-span-2 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 rounded-2xl shadow-card p-8 relative min-h-96 border-2 border-dashed border-surface-300 dark:border-surface-600"
    >
      <div className="absolute top-4 left-4 text-surface-500 dark:text-surface-400 text-sm">
        Your App Canvas - Drag components here!
      </div>

      <AnimatePresence>
        {animatedElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            drag
            dragMomentum={false}
            onDrag={(event, info) => {
              handleElementDrag(element.id, {
                x: element.x + info.offset.x,
                y: element.y + info.offset.y
              })
            }}
            className={`absolute cursor-pointer select-none`}
            style={{ left: element.x, top: element.y }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
          >
            <div className={`p-3 rounded-xl shadow-card ${
              element.type === 'button' ? 'bg-primary text-white' :
              element.type === 'text' ? 'bg-secondary text-white' :
              'bg-accent text-white'
            }`}>
              <ApperIcon 
                name={element.type === 'button' ? 'Square' : element.type === 'text' ? 'Type' : 'Image'} 
                className="w-4 h-4 mr-2 inline" 
              />
              {element.label}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4">
        <Button
          onClick={resetElements}
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          icon="RefreshCw"
        >
          Reset
        </Button>
      </div>
    </motion.div>
  )
}

export default AppCanvas