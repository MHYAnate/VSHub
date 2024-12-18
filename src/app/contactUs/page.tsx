"use client"

import React, { useState, useRef, useEffect } from 'react'

export default function PostQuestion() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    if (!title.trim() || !body.trim()) {
      setError('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTitle('')
      setBody('')
      setTags('')
      setSuccess(true)
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      setError(`${err}An error occurred while posting your question. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-3xl font-bold mb-8 text-black relative inline-block">
        Post a New Question
        <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h1>
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border-l-4 border-green-500 animate-fadeIn">
          Your question has been successfully posted!
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border-l-4 border-red-500 animate-fadeIn">
          {error}
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 bg-transparent"
            placeholder="Enter your question title"
            required
          />
          <label htmlFor="title" className="absolute left-0 -top-3.5 text-sm font-medium text-gray-700 transition-all duration-300">
            Title <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 bg-transparent resize-none"
            placeholder="Provide more details about your question"
            required
          ></textarea>
          <label htmlFor="body" className="absolute left-0 -top-3.5 text-sm font-medium text-gray-700 transition-all duration-300">
            Question Details <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-black outline-none transition-all duration-300 bg-transparent"
            placeholder="e.g., react, javascript, css"
          />
          <label htmlFor="tags" className="absolute left-0 -top-3.5 text-sm font-medium text-gray-700 transition-all duration-300">
            Tags (comma-separated)
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-sm font-medium text-white transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
    </div>
  )
}