'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// This creates a /index route that redirects to the main homepage
export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [router])

  // Return a simple loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
