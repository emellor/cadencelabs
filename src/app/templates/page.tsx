'use client'

import { useState } from 'react'
import Link from 'next/link'

// Simple SVG Icons as components
const PlusIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const PencilIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const ShareIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

// Static template data for demonstration
const staticTemplates = [
  {
    id: 1,
    title: "Daily Wellness Check-in",
    description: "A comprehensive daily survey to track athlete wellness, sleep quality, stress levels, and perceived exertion.",
    fields: 8,
    lastModified: "2 days ago",
    isShared: false
  },
  {
    id: 2,
    title: "Post-Training Survey",
    description: "Collect immediate feedback after training sessions including RPE, muscle soreness, and training satisfaction.",
    fields: 6,
    lastModified: "1 week ago",
    isShared: true
  },
  {
    id: 3,
    title: "Competition Readiness Assessment",
    description: "Pre-competition evaluation form covering physical readiness, mental state, and confidence levels.",
    fields: 12,
    lastModified: "3 days ago",
    isShared: false
  }
]

export default function TemplatesPage() {
  const [templates] = useState(staticTemplates)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Data Input Templates
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Create and manage your custom data collection forms
          </p>
          
          {/* Create New Template Button */}
          <Link 
            href="/templates/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Template
          </Link>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {template.title}
                </h3>
                {template.isShared && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Shared
                  </span>
                )}
              </div>

              {/* Template Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {template.description}
              </p>

              {/* Template Metadata */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{template.fields} fields</span>
                <span>Modified {template.lastModified}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no templates) */}
        {templates.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No templates yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first data input template.</p>
            <div className="mt-6">
              <Link 
                href="/templates/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Template
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
