"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { NutritionCard } from "../../../../components/nutrition/NutritionCard";
import { WorkoutCard } from "../../../../components/nutrition/WorkoutCard";
import { AddEntryModal } from "../../../../components/AddEntryModal";

const NutritionCalendarPage = () => {
  const params = useParams();
  const athleteId = params.id as string;
  
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    return `${start.getDate()}${start.getDate() === 1 ? 'st' : start.getDate() === 2 ? 'nd' : start.getDate() === 3 ? 'rd' : 'th'} - ${end.getDate()}${end.getDate() === 1 ? 'st' : end.getDate() === 2 ? 'nd' : end.getDate() === 3 ? 'rd' : 'th'} ${start.toLocaleDateString('en-US', { month: 'short' })}`;
  };

  // Mock data - replace with actual data fetching
  const getMockNutritionData = (date: Date) => {
    const dayOfWeek = date.getDay();
    const mockData = {
      calories: { consumed: 2240 + dayOfWeek * 100, target: 2500 },
      carbs: { consumed: 280 + dayOfWeek * 20, target: 300 },
      protein: { consumed: 140 + dayOfWeek * 10, target: 150 },
      fat: { consumed: 78 + dayOfWeek * 5, target: 83 },
      meals: [
        { type: 'Breakfast', time: '08:30', calories: 553, carbs: 55, protein: 32, fat: 22, name: 'Oatmeal & Berries' },
        { type: 'Lunch', time: '13:00', calories: 687, carbs: 67, protein: 45, fat: 31, name: 'Chicken Salad' },
        { type: 'Dinner', time: '19:00', calories: 812, carbs: 89, protein: 52, fat: 35, name: 'Salmon & Rice' },
        { type: 'Snack', time: '16:00', calories: 188, carbs: 19, protein: 11, fat: 8, name: 'Greek Yogurt' }
      ],
      workouts: [
        { type: 'Strength Training', time: '16:00', calories: 408, duration: 60, description: 'Upper body focus' },
        { type: 'Recovery Ride', time: '07:00', calories: 278, duration: 45, description: 'Zone 2 ride' }
      ]
    };
    return mockData;
  };

  const handleAddEntry = (date: Date) => {
    setSelectedDate(date);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">
              {formatWeekRange()}
            </h1>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-medium">Sarah Brown</h2>
            <div className="text-sm text-slate-400">SB</div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const nutritionData = getMockNutritionData(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`bg-slate-800 rounded-lg border ${
                  isToday ? 'border-blue-500' : 'border-slate-700'
                } overflow-hidden`}
              >
                {/* Day Header */}
                <div className={`px-4 py-3 border-b border-slate-700 ${
                  isToday ? 'bg-blue-600' : 'bg-slate-750'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{weekdays[index]}</div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </div>
                    <button
                      onClick={() => handleAddEntry(date)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Daily Summary */}
                <div className="p-4 space-y-3">
                  {/* Macros Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Calories</span>
                      <span className="font-medium">
                        {nutritionData.calories.consumed}/{nutritionData.calories.target} kcal
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-slate-400">Carbs</div>
                        <div className="font-medium text-orange-400">
                          {nutritionData.carbs.consumed}g
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400">Protein</div>
                        <div className="font-medium text-blue-400">
                          {nutritionData.protein.consumed}g
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400">Fat</div>
                        <div className="font-medium text-red-400">
                          {nutritionData.fat.consumed}g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="space-y-2">
                    {nutritionData.meals.map((meal, mealIndex) => (
                      <NutritionCard
                        key={mealIndex}
                        type={meal.type}
                        time={meal.time}
                        calories={meal.calories}
                        carbs={meal.carbs}
                        protein={meal.protein}
                        fat={meal.fat}
                        name={meal.name}
                      />
                    ))}
                  </div>

                  {/* Workouts */}
                  <div className="space-y-2">
                    {nutritionData.workouts.map((workout, workoutIndex) => (
                      <WorkoutCard
                        key={workoutIndex}
                        type={workout.type}
                        time={workout.time}
                        calories={workout.calories}
                        duration={workout.duration}
                        description={workout.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && selectedDate && (
        <AddEntryModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedDate(null);
          }}
          date={selectedDate}
          athleteId={athleteId}
        />
      )}
    </div>
  );
};

export default NutritionCalendarPage;
