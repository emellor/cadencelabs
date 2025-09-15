'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Simple SVG Icons
const ChevronRightIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ClockIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const DocumentTextIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

// Static form data for demonstration
const getAthleteFormData = (athleteId: string): FormItem[] => [
  {
    id: 1,
    name: "Daily Wellness Check-in",
    description: "Quick daily assessment of your physical and mental state",
    estimatedTime: "3-5 min",
    dueDate: "Today",
    status: "pending" as const,
    completedAt: null,
    priority: "high" as const
  },
  {
    id: 2,
    name: "Post-Training Survey",
    description: "Rate your training session and recovery needs",
    estimatedTime: "2-3 min",
    dueDate: "After training",
    status: "pending" as const,
    completedAt: null,
    priority: "medium" as const
  },
  {
    id: 3,
    name: "Weekly Performance Review",
    description: "Comprehensive weekly performance and goal assessment",
    estimatedTime: "8-10 min",
    dueDate: "End of week",
    status: "pending" as const,
    completedAt: null,
    priority: "medium" as const
  },
  {
    id: 4,
    name: "Sleep Quality Assessment",
    description: "Track your sleep patterns and quality",
    estimatedTime: "2 min",
    dueDate: "Morning",
    status: "completed" as const,
    completedAt: "2 hours ago",
    priority: "low" as const
  },
  {
    id: 5,
    name: "Nutrition Log",
    description: "Log your meals and hydration for today",
    estimatedTime: "5 min",
    dueDate: "Evening",
    status: "pending" as const,
    completedAt: null,
    priority: "low" as const
  }
]

interface FormItem {
  id: number
  name: string
  description: string
  estimatedTime: string
  dueDate: string
  status: 'pending' | 'completed'
  completedAt: string | null
  priority: 'high' | 'medium' | 'low'
}

export default function AthleteFormsPage() {
  const params = useParams()
  const athleteId = params?.id as string
  const [forms] = useState<FormItem[]>(getAthleteFormData(athleteId))

  const pendingForms = forms.filter(form => form.status === 'pending')
  const completedForms = forms.filter(form => form.status === 'completed')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const FormCard = ({ form }: { form: FormItem }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Form Header */}
          <div className="flex items-center gap-2 mb-2">
            <DocumentTextIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {form.name}
            </h3>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(form.priority)}`}>
              {form.priority}
            </span>
          </div>

          {/* Form Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {form.description}
          </p>

          {/* Form Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{form.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              {form.status === 'completed' ? (
                <>
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Completed {form.completedAt}</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>Due: {form.dueDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        {form.status === 'pending' ? (
          <Link
            href={`/athlete/${athleteId}/forms/${form.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Start Form
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <Link
            href={`/athlete/${athleteId}/forms/${form.id}`}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            View Submission
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Daily Forms</h1>
              <p className="text-gray-600 mt-1">
                Complete your assigned forms and track your progress
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Athlete ID</div>
              <div className="font-mono text-lg font-semibold text-gray-900">#{athleteId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Pending Forms Section */}
        {pendingForms.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Forms
              </h2>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {pendingForms.length} to complete
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingForms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Forms Section */}
        {completedForms.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Completed Forms
              </h2>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {completedForms.length} completed
              </span>
            </div>
            
            <div className="space-y-4">
              {completedForms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {forms.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms assigned</h3>
            <p className="text-gray-600">
              Check back later for new forms from your coach or sports scientist.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        {forms.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{forms.length}</div>
                <div className="text-sm text-gray-500">Total Forms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedForms.length}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingForms.length}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((completedForms.length / forms.length) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
