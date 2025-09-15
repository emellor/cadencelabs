"use client";

import React, { useState } from "react";

interface DailyFormProps {
  athleteId: string;
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

const DailyForm: React.FC<DailyFormProps> = ({ athleteId, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    sleepHours: '',
    sleepQuality: '',
    restingHeartRate: '',
    hrv: '',
    bodyWeight: '',
    energyLevel: '',
    soreness: '',
    stressLevel: '',
    hydration: '',
    nutrition: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      athleteId,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });
  };

  const FormField = ({ 
    label, 
    name, 
    type = "text", 
    placeholder, 
    required = false, 
    children 
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    children?: React.ReactNode;
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const ScaleSelector = ({ name, value, onChange }: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">1</span>
      <div className="flex space-x-2 mx-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <label key={num} className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={num.toString()}
              checked={value === num.toString()}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
              value === num.toString() 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-500 hover:border-blue-300'
            }`}>
              {num}
            </div>
          </label>
        ))}
      </div>
      <span className="text-xs text-gray-500">10</span>
    </div>
  );

  return (
    <form id="daily-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Sleep Section */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sleep & Recovery</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Sleep Duration" name="sleepHours">
            <input
              type="number"
              step="0.5"
              min="0"
              max="12"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleInputChange}
              placeholder="7.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500">Hours</span>
          </FormField>

          <FormField label="Sleep Quality" name="sleepQuality">
            <select
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select quality</option>
              <option value="poor">Poor</option>
              <option value="fair">Fair</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Resting Heart Rate" name="restingHeartRate">
            <input
              type="number"
              min="30"
              max="120"
              name="restingHeartRate"
              value={formData.restingHeartRate}
              onChange={handleInputChange}
              placeholder="60"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500">BPM</span>
          </FormField>

          <FormField label="HRV (Heart Rate Variability)" name="hrv">
            <input
              type="number"
              min="10"
              max="200"
              name="hrv"
              value={formData.hrv}
              onChange={handleInputChange}
              placeholder="42"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500">ms</span>
          </FormField>
        </div>
      </div>

      {/* Physical Metrics */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Physical Metrics</h3>
        
        <FormField label="Body Weight" name="bodyWeight">
          <input
            type="number"
            step="0.1"
            min="30"
            max="200"
            name="bodyWeight"
            value={formData.bodyWeight}
            onChange={handleInputChange}
            placeholder="68.5"
            className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-xs text-gray-500 ml-2">kg</span>
        </FormField>

        <FormField label="Energy Level (1=Exhausted, 10=Energized)" name="energyLevel">
          <ScaleSelector 
            name="energyLevel" 
            value={formData.energyLevel} 
            onChange={handleInputChange} 
          />
        </FormField>

        <FormField label="Muscle Soreness (1=None, 10=Severe)" name="soreness">
          <ScaleSelector 
            name="soreness" 
            value={formData.soreness} 
            onChange={handleInputChange} 
          />
        </FormField>
      </div>

      {/* Wellness */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Wellness</h3>
        
        <FormField label="Stress Level (1=Relaxed, 10=Highly Stressed)" name="stressLevel">
          <ScaleSelector 
            name="stressLevel" 
            value={formData.stressLevel} 
            onChange={handleInputChange} 
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Hydration Status" name="hydration">
            <select
              name="hydration"
              value={formData.hydration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select status</option>
              <option value="dehydrated">Dehydrated</option>
              <option value="normal">Normal</option>
              <option value="well-hydrated">Well Hydrated</option>
            </select>
          </FormField>

          <FormField label="Nutrition Quality" name="nutrition">
            <select
              name="nutrition"
              value={formData.nutrition}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select quality</option>
              <option value="poor">Poor</option>
              <option value="fair">Fair</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </FormField>
        </div>
      </div>

      {/* Notes */}
      <div>
        <FormField label="Additional Notes" name="notes">
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="How are you feeling today? Any concerns or observations..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <span className="text-xs text-gray-500">Optional</span>
        </FormField>
      </div>
    </form>
  );
};

export default DailyForm;
