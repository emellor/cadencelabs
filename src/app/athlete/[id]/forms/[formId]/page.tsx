'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Simple SVG Icons
const ArrowLeftIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const CheckCircleIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Form field interface
interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  min?: number
  max?: number
}

// Form template interface
interface FormTemplate {
  id: number
  name: string
  description: string
  fields: FormField[]
  estimatedTime: string
}

// Static form templates based on our template builder
const getFormTemplates = (): Record<number, FormTemplate> => ({
  1: {
    id: 1,
    name: "Daily Wellness Check-in",
    description: "Quick daily assessment of your physical and mental state",
    estimatedTime: "3-5 min",
    fields: [
      {
        id: "sleep_quality",
        type: "scale",
        label: "How would you rate your sleep quality last night?",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "energy_level",
        type: "scale",
        label: "How is your energy level today?",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "muscle_soreness",
        type: "scale",
        label: "Rate your overall muscle soreness",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "stress_level",
        type: "scale",
        label: "How stressed do you feel today?",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "motivation",
        type: "radio",
        label: "How motivated do you feel for today's training?",
        required: true,
        options: ["Very motivated", "Motivated", "Neutral", "Unmotivated", "Very unmotivated"]
      },
      {
        id: "sleep_hours",
        type: "number",
        label: "How many hours did you sleep last night?",
        required: true,
        placeholder: "Enter hours (e.g., 7.5)"
      },
      {
        id: "additional_notes",
        type: "textarea",
        label: "Any additional notes or concerns?",
        required: false,
        placeholder: "Optional: Share any thoughts about how you're feeling..."
      }
    ]
  },
  2: {
    id: 2,
    name: "Post-Training Survey",
    description: "Rate your training session and recovery needs",
    estimatedTime: "2-3 min",
    fields: [
      {
        id: "session_rpe",
        type: "scale",
        label: "Rate the intensity of your training session (RPE)",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "session_enjoyment",
        type: "scale",
        label: "How much did you enjoy today's training?",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "training_type",
        type: "dropdown",
        label: "What type of training did you complete?",
        required: true,
        options: ["Endurance", "Intervals", "Strength", "Recovery", "Skills", "Race"]
      },
      {
        id: "recovery_needs",
        type: "checkbox",
        label: "What recovery methods do you plan to use? (Select all that apply)",
        required: false,
        options: ["Stretching", "Massage", "Ice bath", "Compression", "Extra sleep", "Nutrition focus"]
      },
      {
        id: "next_session_feeling",
        type: "radio",
        label: "How do you feel about tomorrow's training?",
        required: true,
        options: ["Ready to go", "Could use easier session", "Need rest day", "Feeling great"]
      }
    ]
  },
  3: {
    id: 3,
    name: "Weekly Performance Review",
    description: "Comprehensive weekly performance and goal assessment",
    estimatedTime: "8-10 min",
    fields: [
      {
        id: "week_rating",
        type: "scale",
        label: "Overall, how would you rate this week's training?",
        required: true,
        min: 1,
        max: 10
      },
      {
        id: "goals_achieved",
        type: "checkbox",
        label: "Which goals did you achieve this week?",
        required: false,
        options: ["Training consistency", "Power targets", "Recovery protocols", "Nutrition goals", "Sleep targets", "Skills improvement"]
      },
      {
        id: "biggest_challenge",
        type: "textarea",
        label: "What was your biggest challenge this week?",
        required: true,
        placeholder: "Describe the main obstacle you faced..."
      },
      {
        id: "next_week_focus",
        type: "textarea",
        label: "What do you want to focus on next week?",
        required: true,
        placeholder: "Set your priorities for the upcoming week..."
      }
    ]
  }
})

// Visual Scale Component for 1-10 ratings
const VisualScale = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  label 
}: { 
  value: number | null
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
}) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Not at all</span>
        <span>Extremely</span>
      </div>
      <div className="flex justify-between gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`
              w-10 h-10 rounded-full border-2 transition-all duration-200 text-sm font-medium
              ${value === num 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' 
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:scale-105'
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export default function DynamicFormPage() {
  const params = useParams()
  const athleteId = params?.id as string
  const formId = parseInt(params?.formId as string)
  
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formTemplate = getFormTemplates()[formId]

  useEffect(() => {
    // Initialize form data with empty values
    if (formTemplate) {
      const initialData: Record<string, any> = {}
      formTemplate.fields.forEach(field => {
        if (field.type === 'checkbox') {
          initialData[field.id] = []
        } else if (field.type === 'scale') {
          initialData[field.id] = null
        } else {
          initialData[field.id] = ''
        }
      })
      setFormData(initialData)
    }
  }, [formTemplate])

  const updateFieldValue = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    formTemplate.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id]
        
        if (field.type === 'checkbox') {
          if (!value || value.length === 0) {
            newErrors[field.id] = 'Please select at least one option'
          }
        } else if (field.type === 'scale') {
          if (value === null || value === undefined) {
            newErrors[field.id] = 'Please select a rating'
          }
        } else if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = 'This field is required'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Form submitted:', { formId, athleteId, data: formData })
      setSubmitted(true)
    }
  }

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id]
    const errorClass = hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.id] || ''}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errorClass}`}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            value={formData[field.id] || ''}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
            step="0.5"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errorClass}`}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errorClass}`}
          />
        )

      case 'dropdown':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errorClass}`}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => updateFieldValue(field.id, e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || []
                    if (e.target.checked) {
                      updateFieldValue(field.id, [...currentValues, option])
                    } else {
                      updateFieldValue(field.id, currentValues.filter((v: string) => v !== option))
                    }
                  }}
                  className="mr-3 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'scale':
        return (
          <VisualScale
            value={formData[field.id]}
            onChange={(value) => updateFieldValue(field.id, value)}
            min={field.min || 1}
            max={field.max || 10}
            label={field.label}
          />
        )

      default:
        return <div className="text-gray-500">Unknown field type: {field.type}</div>
    }
  }

  if (!formTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Not Found</h1>
          <p className="text-gray-600 mb-4">The requested form could not be found.</p>
          <Link 
            href={`/athlete/${athleteId}/forms`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Forms
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for completing the {formTemplate.name}. Your responses have been recorded.
          </p>
          <Link 
            href={`/athlete/${athleteId}/forms`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Forms
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href={`/athlete/${athleteId}/forms`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Forms
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {formTemplate.name}
          </h1>
          <p className="text-gray-600">
            {formTemplate.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span>Estimated time: {formTemplate.estimatedTime}</span>
            <span>•</span>
            <span>Athlete #{athleteId}</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {formTemplate.fields.map((field, index) => (
            <div key={field.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  {index + 1}. {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {/* Field Input */}
                {renderField(field)}
                
                {/* Error Message */}
                {errors[field.id] && (
                  <p className="mt-2 text-sm text-red-600">{errors[field.id]}</p>
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Submit Form
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Make sure all required fields are completed before submitting
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
