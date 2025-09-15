'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import FieldConfigModal from '@/components/FieldConfigModal'

// Simple SVG Icons as components
const ArrowLeftIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const PlusIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const TrashIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const GripIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
)

// Field types available for dragging
const FIELD_TYPES = [
  { id: 'text', label: 'Text Input', icon: '📝', description: 'Single line text input' },
  { id: 'number', label: 'Number Input', icon: '🔢', description: 'Numeric input field' },
  { id: 'dropdown', label: 'Dropdown', icon: '📋', description: 'Select from options' },
  { id: 'scale', label: 'Scale (1-10)', icon: '📊', description: 'Rating scale slider' },
  { id: 'radio', label: 'Multiple Choice', icon: '⚪', description: 'Select one option' },
  { id: 'checkbox', label: 'Checkboxes', icon: '☑️', description: 'Select multiple options' },
  { id: 'textarea', label: 'Long Text', icon: '📄', description: 'Multi-line text input' },
  { id: 'date', label: 'Date Picker', icon: '📅', description: 'Date selection' },
  { id: 'time', label: 'Time Picker', icon: '🕐', description: 'Time selection' },
]

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

export default function NewTemplatePage() {
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [draggedType, setDraggedType] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent, fieldType: string) => {
    setDraggedType(fieldType)
    e.dataTransfer.setData('text/plain', fieldType)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const fieldType = e.dataTransfer.getData('text/plain')
    const fieldTypeData = FIELD_TYPES.find(type => type.id === fieldType)
    
    if (fieldTypeData) {
      const newField: FormField = {
        id: `field_${Date.now()}`,
        type: fieldType,
        label: `New ${fieldTypeData.label}`,
        required: false,
        placeholder: fieldType === 'text' || fieldType === 'textarea' ? 'Enter your response...' : undefined,
        options: fieldType === 'dropdown' || fieldType === 'radio' || fieldType === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
        min: fieldType === 'scale' ? 1 : undefined,
        max: fieldType === 'scale' ? 10 : undefined,
      }
      
      setFormFields(prev => [...prev, newField])
      setSelectedField(newField)
      setIsModalOpen(true)
    }
    setDraggedType(null)
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
  }

  const handleSaveField = (updatedField: FormField) => {
    updateField(updatedField.id, updatedField)
    setSelectedField(null)
  }

  const handleFieldClick = (field: FormField) => {
    setSelectedField(field)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedField(null)
  }

  const removeField = (fieldId: string) => {
    setFormFields(prev => prev.filter(field => field.id !== fieldId))
    if (selectedField?.id === fieldId) {
      setSelectedField(null)
      setIsModalOpen(false)
    }
  }

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    setFormFields(prev => {
      const index = prev.findIndex(field => field.id === fieldId)
      if (index === -1) return prev
      
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev
      
      const newFields = [...prev]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(newIndex, 0, movedField)
      return newFields
    })
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name')
      return
    }
    
    const template = {
      name: templateName,
      description: templateDescription,
      fields: formFields
    }
    
    console.log('Saving template:', template)
    // Here you would typically save to your backend
    alert('Template saved successfully!')
  }

  const renderPreviewField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )
      case 'number':
        return (
          <input
            type="number"
            placeholder="Enter number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )
      case 'dropdown':
        return (
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" disabled>
            <option>Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'scale':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min || 1}
              max={field.max || 10}
              defaultValue={Math.floor(((field.min || 1) + (field.max || 10)) / 2)}
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{field.min || 1}</span>
              <span>{field.max || 10}</span>
            </div>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="radio" name={field.id} className="mr-2" disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="mr-2" disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )
      case 'date':
        return (
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )
      case 'time':
        return (
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )
      default:
        return <div className="text-gray-500">Unknown field type</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/templates"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Templates
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Template</h1>
          <p className="text-lg text-gray-600">Create a Custom Form Template</p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          
          {/* Left Column - Builder */}
          <div className="space-y-6 overflow-y-auto">
            
            {/* Template Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Template Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Daily Wellness Check-in"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe what this template is used for..."
                  />
                </div>
              </div>
            </div>

            {/* Field Types Palette */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Field Types</h2>
              <p className="text-sm text-gray-600 mb-4">Drag and drop field types into the preview area</p>
              
              <div className="grid grid-cols-1 gap-3">
                {FIELD_TYPES.map((fieldType) => (
                  <div
                    key={fieldType.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, fieldType.id)}
                    className="flex items-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-move transition-colors"
                  >
                    <span className="text-2xl mr-3">{fieldType.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{fieldType.label}</div>
                      <div className="text-sm text-gray-500">{fieldType.description}</div>
                    </div>
                    <GripIcon className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={handleSaveTemplate}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                Save Template
              </button>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
            
            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`min-h-[400px] border-2 border-dashed rounded-lg p-6 transition-colors ${
                draggedType ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
            >
              {formFields.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <PlusIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Drop field types here</p>
                  <p className="text-sm">Drag field types from the left panel to start building your form</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Template Header in Preview */}
                  {templateName && (
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{templateName}</h3>
                      {templateDescription && (
                        <p className="text-gray-600 mt-2">{templateDescription}</p>
                      )}
                    </div>
                  )}

                  {/* Form Fields */}
                  {formFields.map((field, index) => (
                    <div
                      key={field.id}
                      className={`group relative p-4 rounded-lg border transition-all cursor-pointer hover:border-blue-300 hover:bg-blue-50`}
                      onClick={() => handleFieldClick(field)}
                    >
                      {/* Field Controls */}
                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveField(field.id, 'up'); }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Move up"
                          >
                            ↑
                          </button>
                        )}
                        {index < formFields.length - 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveField(field.id, 'down'); }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Move down"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                          className="p-1 text-red-400 hover:text-red-600"
                          title="Remove field"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Field Label */}
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {/* Field Input */}
                      {renderPreviewField(field)}
                      
                      {/* Click to configure hint */}
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg">
                        <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to configure
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Field Configuration Modal */}
      <FieldConfigModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSaveField={handleSaveField}
        fieldData={selectedField}
      />
    </div>
  )
}
