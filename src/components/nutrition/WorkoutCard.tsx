"use client";

import React from "react";

interface WorkoutCardProps {
  type: string;
  time: string;
  calories: number;
  duration: number;
  description: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  type,
  time,
  calories,
  duration,
  description
}) => {
  const getWorkoutIcon = (workoutType: string) => {
    switch (workoutType.toLowerCase()) {
      case 'strength training':
      case 'weights':
        return '🏋️';
      case 'recovery ride':
      case 'cycling':
        return '🚴';
      case 'running':
        return '🏃';
      case 'swimming':
        return '🏊';
      case 'yoga':
        return '🧘';
      default:
        return '💪';
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-3 text-white text-xs">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center space-x-1">
          <span>{getWorkoutIcon(type)}</span>
          <span className="font-medium">{type}</span>
        </div>
        <div className="text-xs opacity-90">{time}</div>
      </div>
      
      <div className="text-sm mb-2 opacity-90">{description}</div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <div>
            <span className="block font-medium">{calories}</span>
            <span className="block text-xs opacity-80">kcal</span>
          </div>
          <div>
            <span className="block font-medium">{duration}</span>
            <span className="block text-xs opacity-80">min</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
