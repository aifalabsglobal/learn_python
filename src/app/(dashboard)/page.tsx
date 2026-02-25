"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { StreakCard } from "@/components/dashboard/streak-card";
import { XpBar } from "@/components/dashboard/xp-bar";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { BookOpen, CheckCircle, Clock, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockSubjects = [
  { name: "Python", slug: "python", color: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-900/20", progress: 35, total: 40 },
  { name: "JavaScript", slug: "javascript", color: "text-yellow-400", bgColor: "bg-amber-50 dark:bg-amber-900/20", progress: 12, total: 35 },
  { name: "HTML / CSS", slug: "html-css", color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20", progress: 8, total: 25 },
  { name: "SQL", slug: "sql", color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20", progress: 5, total: 20 },
  { name: "Git", slug: "git", color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-900/20", progress: 3, total: 15 },
];

const recentActivity = [
  { subject: "Python", topic: "Lambda Functions", time: "2 hours ago", type: "completed" },
  { subject: "JavaScript", topic: "Async/Await", time: "Yesterday", type: "started" },
  { subject: "SQL", topic: "SELECT Queries", time: "2 days ago", type: "completed" },
  { subject: "Python", topic: "Generators", time: "3 days ago", type: "completed" },
];

const recommended = [
  { subject: "Python", topic: "Higher-Order Functions", reason: "Next in your roadmap", slug: "python", topicId: "higher-order" },
  { subject: "JavaScript", topic: "Promises", reason: "Builds on Async basics", slug: "javascript", topicId: "promises" },
  { subject: "HTML / CSS", topic: "Flexbox Layout", reason: "Most popular topic", slug: "html-css", topicId: "flexbox" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here&apos;s your learning overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Lessons Completed"
          value={63}
          change="+5 this week"
          changeType="up"
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
        />
        <StatsCard
          title="Total XP"
          value="2,450"
          change="+320 this week"
          changeType="up"
          icon={Flame}
          iconColor="text-orange-600"
          iconBg="bg-orange-50 dark:bg-orange-900/30"
        />
        <StatsCard
          title="Study Hours"
          value="28.5"
          change="4.2 hrs this week"
          changeType="neutral"
          icon={Clock}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 dark:bg-blue-900/30"
        />
        <StatsCard
          title="Subjects Active"
          value="5"
          change="All subjects started"
          changeType="neutral"
          icon={BookOpen}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 dark:bg-purple-900/30"
        />
      </div>

      {/* XP and Streak row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <XpBar currentXp={450} level={5} nextLevelXp={750} />
        <StreakCard
          currentStreak={7}
          longestStreak={14}
          weekData={[true, true, true, true, true, true, true]}
        />
      </div>

      {/* Progress and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject progress */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Subject Progress</h3>
            <Link href="/subjects" className="text-xs text-blue-600 hover:underline">View all</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {mockSubjects.map((s) => (
              <Link key={s.slug} href={`/subjects/${s.slug}`}>
                <ProgressRing
                  value={s.progress}
                  max={s.total}
                  size={90}
                  strokeWidth={8}
                  color={s.color}
                  label={s.name}
                  sublabel={`${s.progress}/${s.total}`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recommended Next</h3>
          <div className="space-y-3">
            {recommended.map((r, i) => (
              <Link
                key={i}
                href={`/subjects/${r.slug}/${r.topicId}`}
                className="block rounded-lg border border-gray-100 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{r.topic}</p>
                    <p className="text-xs text-gray-500">{r.subject} · {r.reason}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${a.type === "completed" ? "bg-emerald-500" : "bg-blue-500"}`} />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{a.topic}</p>
                  <p className="text-xs text-gray-500">{a.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  a.type === "completed"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }`}>
                  {a.type === "completed" ? "Completed" : "In Progress"}
                </span>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
