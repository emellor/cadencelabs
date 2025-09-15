import React from "react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

export function MetricsCard({ title, value, unit }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div className="flex items-baseline">
        <p className="text-4xl font-bold text-gray-900">
          {value}
        </p>
        {unit && (
          <span className="ml-2 text-lg font-medium text-gray-600">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
