'use client'

import { useState, useEffect } from 'react'

// Simple SVG Icons
const XIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

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

interface FieldConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSaveField: (fieldData: FormField) => void
  fieldData: FormField | null
}

const FIELD_TYPE_LABELS: Record<string, string> = {
  text: 'Text Input',
  number: 'Number Input',
  dropdown: 'Dropdown',
  scale: 'Scale',
  radio: 'Multiple Choice',
  checkbox: 'Checkboxes',
  textarea: 'Long Text',
  date: 'Date Picker',
  time: 'Time Picker',
}

export default function FieldConfigModal({ 
  isOpen, 
  onClose, 
  onSaveField, 
  fieldData 
}: FieldConfigModalProps) {
  const [formData, setFormData] = useState<FormField>({
    id: '',
    type: 'text',
    label: '',
    required: false,
    placeholder: '',
    options: ['Option 1', 'Option 2'],
    min: 1,
    max: 10
  })

  // Initialize form data when fieldData changes
  useEffect(() => {
    if (fieldData) {
      setFormData({
        ...fieldData,
        options: fieldData.options || ['Option 1', 'Option 2'],
        min: fieldData.min || 1,
        max: fieldData.max || 10,
        placeholder: fieldData.placeholder || ''
      })
    }
  }, [fieldData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.label.trim()) {
      alert('Please enter a field label')
      return
    }

    // Clean up the data based on field type
    const cleanedData: FormField = {
      ...formData,
      label: formData.label.trim()
    }

    // Only include relevant properties for each field type
    if (!['text', 'textarea'].includes(formData.type)) {
      delete cleanedData.placeholder
    }
    
    if (!['dropdown', 'radio', 'checkbox'].includes(formData.type)) {
      delete cleanedData.options
    }
    
    if (formData.type !== 'scale') {
      delete cleanedData.min
      delete cleanedData.max
    }

    onSaveField(cleanedData)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const updateFormData = (updates: Partial<FormField>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  if (!isOpen || !fieldData) return null

  const fieldTypeLabel = FIELD_TYPE_LABELS[fieldData.type] || fieldData.type

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Configure {fieldTypeLabel}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Field Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Label *
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => updateFormData({ label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., How is your sleep quality?"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be displayed as the question or prompt for users
              </p>
            </div>

            {/* Placeholder Text for Text/Textarea Fields */}
            {(formData.type === 'text' || formData.type === 'textarea') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={formData.placeholder || ''}
                  onChange={(e) => updateFormData({ placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Enter your response here..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hint text shown inside the input field
                </p>
              </div>
            )}

            {/* Options for Dropdown/Radio/Checkbox */}
            {(formData.type === 'dropdown' || formData.type === 'radio' || formData.type === 'checkbox') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options (one per line)
                </label>
                <textarea
                  value={formData.options?.join('\n') || ''}
                  onChange={(e) => updateFormData({ 
                    options: e.target.value.split('\n').filter(option => option.trim()) 
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Excellent&#10;Good&#10;Fair&#10;Poor"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Each line will become a selectable option
                </p>
              </div>
            )}

            {/* Range for Scale Fields */}
            {formData.type === 'scale' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scale Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      value={formData.min || 1}
                      onChange={(e) => updateFormData({ min: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      value={formData.max || 10}
                      onChange={(e) => updateFormData({ max: parseInt(e.target.value) || 10 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Users will rate on a scale from {formData.min || 1} to {formData.max || 10}
                </p>
              </div>
            )}

            {/* Required Field Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.required}
                  onChange={(e) => updateFormData({ required: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Required field</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Users must fill out this field to submit the form
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Field
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
