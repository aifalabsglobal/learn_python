"use client";

import { Zap } from "lucide-react";

interface XpBarProps {
  currentXp: number;
  level: number;
  nextLevelXp: number;
}

const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000, 13000,
  16500, 20500, 25000, 30000, 36000, 43000, 51000, 60000,
];

export function getLevel(xp: number): { level: number; currentXp: number; nextXp: number } {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 10000;
  return {
    level,
    currentXp: xp - currentThreshold,
    nextXp: nextThreshold - currentThreshold,
  };
}

export function XpBar({ currentXp, level, nextLevelXp }: XpBarProps) {
  const percentage = Math.min((currentXp / nextLevelXp) * 100, 100);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40">
            <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Level {level}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{currentXp} / {nextLevelXp} XP</p>
          </div>
        </div>
        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{currentXp} XP</span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
