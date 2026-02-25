"use client";

import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { XpBar } from "@/components/dashboard/xp-bar";
import { StreakCard } from "@/components/dashboard/streak-card";
import { BookOpen, CheckCircle, Clock, Calendar, Trophy, Settings } from "lucide-react";

const learningHistory = [
  { date: "Feb 24, 2026", topic: "Lambda Functions", subject: "Python", xp: 20 },
  { date: "Feb 23, 2026", topic: "Async/Await", subject: "JavaScript", xp: 25 },
  { date: "Feb 22, 2026", topic: "SELECT Queries", subject: "SQL", xp: 15 },
  { date: "Feb 21, 2026", topic: "Recursive Functions", subject: "Python", xp: 30 },
  { date: "Feb 20, 2026", topic: "Branching", subject: "Git", xp: 10 },
  { date: "Feb 19, 2026", topic: "Higher-Order Functions", subject: "Python", xp: 25 },
  { date: "Feb 18, 2026", topic: "Elements & Structure", subject: "HTML/CSS", xp: 10 },
];

const subjectProgress = [
  { name: "Python", completed: 35, total: 40, color: "text-yellow-500" },
  { name: "JavaScript", completed: 12, total: 35, color: "text-yellow-400" },
  { name: "HTML/CSS", completed: 8, total: 25, color: "text-orange-500" },
  { name: "SQL", completed: 5, total: 20, color: "text-blue-500" },
  { name: "Git", completed: 3, total: 15, color: "text-red-500" },
];

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Learner"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.emailAddresses?.[0]?.emailAddress || ""}</p>
            <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">Level 5</Badge>
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">🔥 7-day streak</Badge>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">2,450 XP</Badge>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">63</p>
          <p className="text-xs text-gray-500">Lessons Done</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">28.5h</p>
          <p className="text-xs text-gray-500">Study Time</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <Trophy className="h-5 w-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">5</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <BookOpen className="h-5 w-5 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">5</p>
          <p className="text-xs text-gray-500">Subjects</p>
        </div>
      </div>

      {/* XP and Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <XpBar currentXp={450} level={5} nextLevelXp={750} />
        <StreakCard currentStreak={7} longestStreak={14} weekData={[true, true, true, true, true, true, true]} />
      </div>

      {/* Subject progress */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Subject Progress</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {subjectProgress.map((s) => (
            <ProgressRing
              key={s.name}
              value={s.completed}
              max={s.total}
              size={80}
              strokeWidth={7}
              color={s.color}
              label={s.name}
              sublabel={`${s.completed}/${s.total}`}
            />
          ))}
        </div>
      </div>

      {/* Learning history */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Learning History</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {learningHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{h.topic}</p>
                  <p className="text-xs text-gray-500">{h.subject} · {h.date}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-purple-600 dark:text-purple-400">+{h.xp} XP</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
