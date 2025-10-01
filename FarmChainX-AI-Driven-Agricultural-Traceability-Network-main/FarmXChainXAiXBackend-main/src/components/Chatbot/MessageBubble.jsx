import React from 'react'

const MessageBubble = ({ from = 'assistant', text = '' }) => {
  const isUser = from === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2">🌿</div>
      )}
      <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm border text-sm leading-relaxed ${isUser ? 'bg-emerald-600 text-white border-emerald-700 rounded-br-sm' : 'bg-white/90 dark:bg-gray-800/90 text-emerald-900 dark:text-emerald-100 border-emerald-100 dark:border-gray-700 rounded-bl-sm'}`}>
        {text}
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center ml-2">🙂</div>
      )}
    </div>
  )
}

export default MessageBubble




