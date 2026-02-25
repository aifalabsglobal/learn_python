"use client";

import { Badge } from "@/components/ui/badge";
import { XpBar } from "@/components/dashboard/xp-bar";
import { Zap, Trophy, Flame, BookOpen, Target, Star, Award, Lock } from "lucide-react";

const badges = [
  { id: "first-lesson", name: "First Step", description: "Complete your first lesson", icon: "🎯", earned: true, earnedDate: "Feb 10, 2026", category: "milestone" },
  { id: "week-streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", earned: true, earnedDate: "Feb 20, 2026", category: "streak" },
  { id: "python-10", name: "Python Apprentice", description: "Complete 10 Python lessons", icon: "🐍", earned: true, earnedDate: "Feb 22, 2026", category: "subject" },
  { id: "xp-1000", name: "XP Hunter", description: "Earn 1,000 total XP", icon: "⚡", earned: true, earnedDate: "Feb 23, 2026", category: "xp" },
  { id: "multi-subject", name: "Explorer", description: "Start 3 different subjects", icon: "🗺️", earned: true, earnedDate: "Feb 18, 2026", category: "milestone" },
  { id: "speed-learner", name: "Speed Learner", description: "Complete 5 lessons in one day", icon: "⚡", earned: false, earnedDate: null, category: "milestone" },
  { id: "week-streak-14", name: "Fortnight Focus", description: "Maintain a 14-day streak", icon: "🔥", earned: false, earnedDate: null, category: "streak" },
  { id: "week-streak-30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "🏆", earned: false, earnedDate: null, category: "streak" },
  { id: "python-master", name: "Python Master", description: "Complete all Python topics", icon: "🏅", earned: false, earnedDate: null, category: "subject" },
  { id: "js-master", name: "JavaScript Master", description: "Complete all JavaScript topics", icon: "🏅", earned: false, earnedDate: null, category: "subject" },
  { id: "xp-5000", name: "XP Legend", description: "Earn 5,000 total XP", icon: "💎", earned: false, earnedDate: null, category: "xp" },
  { id: "all-subjects", name: "Polyglot", description: "Complete at least 5 topics in every subject", icon: "🌟", earned: false, earnedDate: null, category: "milestone" },
  { id: "night-owl", name: "Night Owl", description: "Study after 10 PM", icon: "🦉", earned: false, earnedDate: null, category: "fun" },
  { id: "early-bird", name: "Early Bird", description: "Study before 7 AM", icon: "🐦", earned: false, earnedDate: null, category: "fun" },
  { id: "perfect-week", name: "Perfect Week", description: "Study every day for a week", icon: "⭐", earned: false, earnedDate: null, category: "streak" },
  { id: "helpful", name: "Study Buddy", description: "Use the AI Study Help 10 times", icon: "🤖", earned: false, earnedDate: null, category: "fun" },
];

const categoryLabels: Record<string, string> = {
  milestone: "Milestones",
  streak: "Streaks",
  subject: "Subject Mastery",
  xp: "XP Achievements",
  fun: "Fun & Quirky",
};

export default function RewardsPage() {
  const earned = badges.filter((b) => b.earned);
  const total = badges.length;
  const categories = [...new Set(badges.map((b) => b.category))];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rewards & Achievements</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your badges, XP, and milestones.</p>
      </div>

      {/* XP and Level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <XpBar currentXp={450} level={5} nextLevelXp={750} />
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{earned.length}<span className="text-lg text-gray-400">/{total}</span></p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/30">
              <Trophy className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Badges by category */}
      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{categoryLabels[cat] || cat}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {badges
              .filter((b) => b.category === cat)
              .map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    badge.earned
                      ? "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10"
                      : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.earned ? badge.icon : "🔒"}</div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{badge.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{badge.description}</p>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">{badge.earnedDate}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
