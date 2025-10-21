'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { ApiResponse } from '@/lib/types'
import SuccessDialog from './SuccessDialog'

interface EmailFormProps {
  onSubmit: (email: string) => Promise<ApiResponse>
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [emailError, setEmailError] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    // Clear previous errors when user starts typing
    if (emailError) {
      setEmailError('')
    }
    if (message) {
      setMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    if (!email.trim()) {
      setEmailError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setMessage(null)
    setEmailError('')

    try {
      const response = await onSubmit(email)
      
      if (response.success) {
        setMessage({ type: 'success', text: response.message })
        setEmail('')
        // Show success dialog with dog animation
        setShowSuccessDialog(true)
      } else {
        setMessage({ type: 'error', text: response.message })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              className={`
                w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-primary-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${emailError 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-gray-200 bg-white focus:border-primary-400'
                }
                ${isSubmitting ? 'animate-pulse' : ''}
              `}
            />
          </motion.div>
          
          {/* Email Error */}
          <AnimatePresence>
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                {emailError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className={`
            w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300
            flex items-center justify-center gap-3
            ${isSubmitting || !email.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Joining...
            </>
          ) : (
            'Join Our Pack! 🐾'
          )}
        </motion.button>

        {/* Success/Error Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className={`
                p-4 rounded-xl flex items-center gap-3 text-sm font-medium
                ${message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
                }
              `}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      {/* Success Dialog with Dog Animation */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        message={message?.type === 'success' ? message.text : 'Email successfully registered!'}
      />
    </div>
  )
}
