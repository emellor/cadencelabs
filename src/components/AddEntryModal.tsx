"use client";

import React, { useState } from "react";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  athleteId: string;
}

export const AddEntryModal: React.FC<AddEntryModalProps> = ({
  isOpen,
  onClose,
  date,
  athleteId
}) => {
  const [activeTab, setActiveTab] = useState<'meal' | 'workout' | 'ai'>('meal');
  const [mealData, setMealData] = useState({
    type: 'breakfast',
    name: '',
    time: '',
    calories: '',
    carbs: '',
    protein: '',
    fat: '',
    notes: ''
  });

  const [workoutData, setWorkoutData] = useState({
    type: 'strength training',
    name: '',
    time: '',
    duration: '',
    calories: '',
    intensity: 'moderate',
    notes: ''
  });

  const handleMealChange = (field: string, value: string) => {
    setMealData(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkoutChange = (field: string, value: string) => {
    setWorkoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (type: 'meal' | 'workout') => {
    if (type === 'meal') {
      console.log('Adding meal:', { ...mealData, date, athleteId });
    } else {
      console.log('Adding workout:', { ...workoutData, date, athleteId });
    }
    onClose();
  };

  const aiSuggestions = [
    {
      type: 'meal',
      title: 'Post-Workout Recovery Bowl',
      calories: 485,
      carbs: 52,
      protein: 28,
      fat: 18,
      time: '14:30',
      reason: 'Perfect for muscle recovery after your strength training session',
      ingredients: ['Greek yogurt', 'Banana', 'Oats', 'Almonds', 'Honey']
    },
    {
      type: 'meal',
      title: 'Pre-Training Fuel',
      calories: 320,
      carbs: 45,
      protein: 12,
      fat: 8,
      time: '15:00',
      reason: 'Optimal carb-to-protein ratio for energy without heaviness',
      ingredients: ['Whole grain toast', 'Almond butter', 'Banana']
    },
    {
      type: 'workout',
      title: 'Active Recovery Session',
      duration: 30,
      calories: 180,
      time: '18:00',
      reason: 'Based on your recent training load, light movement will aid recovery',
      description: 'Easy cycling or walking to promote blood flow'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">
            Add Entry - {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('meal')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'meal'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Add Meal
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'workout'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Add Workout
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <SparklesIcon className="h-4 w-4" />
            <span>AI Suggestions</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'meal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meal Type
                  </label>
                  <select
                    value={mealData.type}
                    onChange={(e) => handleMealChange('type', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="pre workout">Pre Workout</option>
                    <option value="post workout">Post Workout</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={mealData.time}
                    onChange={(e) => handleMealChange('time', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Meal Name
                </label>
                <input
                  type="text"
                  value={mealData.name}
                  onChange={(e) => handleMealChange('name', e.target.value)}
                  placeholder="e.g., Grilled Chicken Salad"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={mealData.calories}
                    onChange={(e) => handleMealChange('calories', e.target.value)}
                    placeholder="450"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={mealData.carbs}
                    onChange={(e) => handleMealChange('carbs', e.target.value)}
                    placeholder="45"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={mealData.protein}
                    onChange={(e) => handleMealChange('protein', e.target.value)}
                    placeholder="30"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={mealData.fat}
                    onChange={(e) => handleMealChange('fat', e.target.value)}
                    placeholder="15"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={mealData.notes}
                  onChange={(e) => handleMealChange('notes', e.target.value)}
                  placeholder="Additional details..."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                onClick={() => handleSubmit('meal')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Add Meal
              </button>
            </div>
          )}

          {activeTab === 'workout' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Workout Type
                  </label>
                  <select
                    value={workoutData.type}
                    onChange={(e) => handleWorkoutChange('type', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="strength training">Strength Training</option>
                    <option value="cycling">Cycling</option>
                    <option value="running">Running</option>
                    <option value="swimming">Swimming</option>
                    <option value="recovery">Recovery</option>
                    <option value="yoga">Yoga</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={workoutData.time}
                    onChange={(e) => handleWorkoutChange('time', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Workout Name
                </label>
                <input
                  type="text"
                  value={workoutData.name}
                  onChange={(e) => handleWorkoutChange('name', e.target.value)}
                  placeholder="e.g., Upper Body Strength"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={workoutData.duration}
                    onChange={(e) => handleWorkoutChange('duration', e.target.value)}
                    placeholder="60"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={workoutData.calories}
                    onChange={(e) => handleWorkoutChange('calories', e.target.value)}
                    placeholder="400"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Intensity
                  </label>
                  <select
                    value={workoutData.intensity}
                    onChange={(e) => handleWorkoutChange('intensity', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="maximum">Maximum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={workoutData.notes}
                  onChange={(e) => handleWorkoutChange('notes', e.target.value)}
                  placeholder="Workout details, sets, reps, etc..."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                onClick={() => handleSubmit('workout')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Add Workout
              </button>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <SparklesIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-white mb-1">AI Recommendations</h3>
                <p className="text-slate-400 text-sm">
                  Personalized suggestions based on your training and nutrition patterns
                </p>
              </div>

              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{suggestion.title}</h4>
                    <span className="text-xs text-slate-400">{suggestion.time}</span>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-3">{suggestion.reason}</p>
                  
                  {suggestion.type === 'meal' ? (
                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div className="text-center">
                        <div className="text-white font-medium">{suggestion.calories}</div>
                        <div className="text-slate-400">cal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-400 font-medium">{suggestion.carbs}g</div>
                        <div className="text-slate-400">carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-medium">{suggestion.protein}g</div>
                        <div className="text-slate-400">protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-400 font-medium">{suggestion.fat}g</div>
                        <div className="text-slate-400">fat</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-center">
                        <div className="text-white font-medium">{suggestion.duration} min</div>
                        <div className="text-slate-400">duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-teal-400 font-medium">{suggestion.calories}</div>
                        <div className="text-slate-400">calories</div>
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                    Use This Suggestion
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};