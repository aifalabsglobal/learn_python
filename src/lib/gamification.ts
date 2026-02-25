export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000, 13000,
  16500, 20500, 25000, 30000, 36000, 43000, 51000, 60000,
];

export function getLevel(xp: number): {
  level: number;
  currentXp: number;
  nextXp: number;
  totalXp: number;
} {
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
    totalXp: xp,
  };
}

export function getDifficultyXp(difficulty: string): number {
  switch (difficulty) {
    case "beginner":
      return 10;
    case "intermediate":
      return 25;
    case "advanced":
      return 50;
    default:
      return 10;
  }
}

export interface BadgeCriteria {
  type: "lessons_completed" | "streak" | "xp" | "subject_lessons" | "subjects_started";
  value: number;
  subject?: string;
}

export function checkBadgeCriteria(
  criteria: BadgeCriteria,
  stats: {
    totalLessons: number;
    currentStreak: number;
    totalXp: number;
    subjectLessons: Record<string, number>;
    subjectsStarted: number;
  }
): boolean {
  switch (criteria.type) {
    case "lessons_completed":
      return stats.totalLessons >= criteria.value;
    case "streak":
      return stats.currentStreak >= criteria.value;
    case "xp":
      return stats.totalXp >= criteria.value;
    case "subject_lessons":
      if (criteria.subject) {
        return (stats.subjectLessons[criteria.subject] || 0) >= criteria.value;
      }
      return false;
    case "subjects_started":
      return stats.subjectsStarted >= criteria.value;
    default:
      return false;
  }
}

export function getStreakStatus(lastActiveDate: Date | null): {
  isActive: boolean;
  shouldIncrement: boolean;
  shouldReset: boolean;
} {
  if (!lastActiveDate) {
    return { isActive: false, shouldIncrement: true, shouldReset: false };
  }

  const now = new Date();
  const last = new Date(lastActiveDate);
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { isActive: true, shouldIncrement: false, shouldReset: false };
  }
  if (diffDays === 1) {
    return { isActive: true, shouldIncrement: true, shouldReset: false };
  }
  return { isActive: false, shouldIncrement: false, shouldReset: true };
}
