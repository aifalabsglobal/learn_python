"use client";

import { Flame } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  weekData: boolean[];
}

export function StreakCard({ currentStreak, longestStreak, weekData }: StreakCardProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Learning Streak</h3>
        <div className="flex items-center gap-1 text-orange-500">
          <Flame className="h-5 w-5" />
          <span className="text-lg font-bold">{currentStreak}</span>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                weekData[i]
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                  : "bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              }`}
            >
              {weekData[i] ? "✓" : "·"}
            </div>
            <span className="text-[10px] text-gray-400">{day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Current: {currentStreak} days</span>
        <span>Best: {longestStreak} days</span>
      </div>
    </div>
  );
}
