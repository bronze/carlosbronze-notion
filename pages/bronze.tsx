import React, { useEffect, useState } from 'react'

function BronzePage() {
  const [userId, setUserId] = useState('')

  // Function to send user ID to analytics platforms
  const sendUserId = () => {
    console.log('sendUserId function called with userId:', userId)
    if (userId) {
      console.log('Sending user ID:', userId)

      // PostHog integration
      if (window.posthog) {
        console.log('PostHog object:', window.posthog)
        console.log('Identifying in PostHog with userId:', userId)
        window.posthog.identify(userId, {
          // Additional properties can be sent here
        })
      } else {
        console.warn('PostHog is not loaded or undefined.')
      }

      // Amplitude integration
      if (window.amplitude) {
        console.log('Identifying in Amplitude with userId:', userId)
        window.amplitude.setUserId(userId)
      } else {
        console.warn('Amplitude is not loaded or undefined.')
      }
    } else {
      console.log('No user ID found.')
    }
  }

  useEffect(() => {
    // Autofill the input field with the current user ID if it exists
    const storedUserId = localStorage.getItem('user_id')
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  // Function to set the default user ID
  const setDefaultUserId = () => {
    const defaultId = 'bronze1337'
    localStorage.setItem('user_id', defaultId)
    setUserId(defaultId)
    sendUserId() // Send to analytics immediately
  }

  // Function to set a custom user ID
  const handleSetCustomUserId = () => {
    if (userId) {
      localStorage.setItem('user_id', userId)
      sendUserId() // Send to analytics immediately
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-5xl font-black mb-4'>Manage Your User ID</h1>
      <p className='text-xl mb-4'>
        Use the buttons below to set a default or custom user ID.
      </p>
      <div className='space-y-4'>
        <button
          className='w-full rounded-lg bg-green-600 px-4 py-2 text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          onClick={setDefaultUserId}
        >
          Set Default ID (bronze1337)
        </button>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder='Enter custom ID'
            className='flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleSetCustomUserId}
            className='rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Set Custom ID
          </button>
        </div>
      </div>
      <div className='text-xl mt-4'>
        <strong>User ID:</strong> <span>{userId || 'Not set'}</span>
      </div>
    </div>
  )
}

export default BronzePage
