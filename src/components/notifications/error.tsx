'use client'

import React, { useState, useEffect } from 'react'

import AlertSvg from '../btn/alert'
import XSvg from '../btn/xSvg'



interface NotificationProps {
  duration?: number
  onClose?: () => void
}


export default function ErrorNotification({ duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true)
    }, duration - 300)

    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => {
      clearTimeout(timer)
      clearTimeout(closeTimer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed top-4 right-4 max-w-sm w-full bg-white text-black shadow-lg rounded-lg overflow-hidden
        transform transition-all duration-300 ease-in-out
        ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
      role="alert"
    >
      <div className="p-4 flex items-start">
        <div className={`flex-shrink-0 w-6 h-6 mr-3  text-red-500 `}>
        
          <AlertSvg/>
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium">{'An error occurred. Please try again.'}</p>
        </div>
        <button
          onClick={() => setIsLeaving(true)}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
        >
          <span className="sr-only">Close</span>
          <XSvg/>
        </button>
      </div>
      <div
        className={`h-1 bg-red-500`}
        style={{
          width: '100%',
          animation: `shrink ${duration}ms linear forwards`,
        }}
      />
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

