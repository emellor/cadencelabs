"use client";

import React from "react";

interface NutritionCardProps {
  type: string;
  time: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  name: string;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  type,
  time,
  calories,
  carbs,
  protein,
  fat,
  name
}) => {
  const getTypeColor = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'lunch':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'dinner':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'snack':
      case 'pm snack':
      case 'am snack':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'pre workout':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600';
    }
  };

  return (
    <div className={`${getTypeColor(type)} rounded-lg p-3 text-white text-xs`}>
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium">{type}</div>
        <div className="text-xs opacity-90">{time}</div>
      </div>
      
      <div className="font-semibold text-sm mb-2">{name}</div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>{calories} kcal</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs opacity-90">
          <div>
            <span className="block">{carbs}g</span>
            <span className="block text-xs">C</span>
          </div>
          <div>
            <span className="block">{protein}g</span>
            <span className="block text-xs">P</span>
          </div>
          <div>
            <span className="block">{fat}g</span>
            <span className="block text-xs">F</span>
          </div>
        </div>
      </div>
    </div>
  );
};
