// 'use client'

// import React, { useState, useEffect } from 'react'

// import AlertSvg from '../btn/alert'
// import XSvg from '../btn/xSvg'

// type NotificationType = 'success' | 'error' | 'warning' | 'info'

// interface NotificationProps {
//   type: NotificationType
//   message: string
//   duration?: number
//   onClose?: () => void
// }


// export default function Notification({ type, message, duration = 5000, onClose }: NotificationProps) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [isLeaving, setIsLeaving] = useState(false)


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLeaving(true)
//     }, duration - 300)

//     const closeTimer = setTimeout(() => {
//       setIsVisible(false)
//       onClose && onClose()
//     }, duration)

//     return () => {
//       clearTimeout(timer)
//       clearTimeout(closeTimer)
//     }
//   }, [duration, onClose])

//   if (!isVisible) return null

//   return (
//     <div
//       className={`
//         fixed top-4 right-4 max-w-sm w-full bg-white text-black shadow-lg rounded-lg overflow-hidden
//         transform transition-all duration-300 ease-in-out
//         ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
//       `}
//       role="alert"
//     >
//       <div className="p-4 flex items-start">
//         <div className={`flex-shrink-0 w-6 h-6 mr-3  text-red-500 `}>
        
//           <AlertSvg/>
//         </div>
//         <div className="flex-grow">
//           <p className="text-sm font-medium">{message}</p>
//         </div>
//         <button
//           onClick={() => setIsLeaving(true)}
//           className="flex-shrink-0 ml-3 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
//         >
//           <span className="sr-only">Close</span>
//           <XSvg/>
//         </button>
//       </div>
//       <div
//         className={`h-1 bg-red-500`}
//         style={{
//           width: '100%',
//           animation: `shrink ${duration}ms linear forwards`,
//         }}
//       />
//       <style jsx>{`
//         @keyframes shrink {
//           from { width: 100%; }
//           to { width: 0%; }
//         }
//       `}</style>
//     </div>
//   )
// }

// // Example usage
// export function NotificationExample() {
//   const [notifications, setNotifications] = useState<Array<{ id: number; type: NotificationType; message: string }>>([])

//   const addNotification = (type: NotificationType, message: string) => {
//     const id = Date.now()
//     setNotifications(prev => [...prev, { id, type, message }])
//   }

//   const removeNotification = (id: number) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id))
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Notification Demo</h2>
//       <div className="space-x-2">
      
//         <button
//           onClick={() => addNotification('error', 'An error occurred. Please try again.')}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//         >
//           Error
//         </button>
       
//       </div>
//       {notifications.map(({ id, type, message }) => (
//         <Notification
//           key={id}
//           type={type}
//           message={message}
//           onClose={() => removeNotification(id)}
//         />
//       ))}
//     </div>
//   )
// }