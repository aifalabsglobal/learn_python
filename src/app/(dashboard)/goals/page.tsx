"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, CheckCircle, Clock, Flame, BookOpen, Trophy } from "lucide-react";

const goals = [
  {
    id: "1",
    title: "Complete 5 Python lessons this week",
    type: "weekly",
    targetValue: 5,
    currentValue: 3,
    completed: false,
    subject: "Python",
    deadline: "Feb 28, 2026",
  },
  {
    id: "2",
    title: "Maintain a 7-day learning streak",
    type: "streak",
    targetValue: 7,
    currentValue: 7,
    completed: true,
    subject: null,
    deadline: null,
  },
  {
    id: "3",
    title: "Finish JavaScript Basics module",
    type: "subject",
    targetValue: 4,
    currentValue: 2,
    completed: false,
    subject: "JavaScript",
    deadline: "Mar 15, 2026",
  },
  {
    id: "4",
    title: "Earn 500 XP this month",
    type: "monthly",
    targetValue: 500,
    currentValue: 320,
    completed: false,
    subject: null,
    deadline: "Feb 28, 2026",
  },
  {
    id: "5",
    title: "Study for at least 30 minutes daily",
    type: "daily",
    targetValue: 30,
    currentValue: 30,
    completed: true,
    subject: null,
    deadline: "Today",
  },
];

const typeIcons: Record<string, typeof Target> = {
  weekly: BookOpen,
  daily: Clock,
  streak: Flame,
  monthly: Trophy,
  subject: Target,
};

const typeColors: Record<string, string> = {
  weekly: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  daily: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  streak: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  monthly: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  subject: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
};

export default function GoalsPage() {
  const completedGoals = goals.filter((g) => g.completed).length;
  const activeGoals = goals.filter((g) => !g.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Goals</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Set targets and track your progress.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Goal
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{goals.length}</p>
          <p className="text-xs text-gray-500">Total Goals</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{completedGoals}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{activeGoals}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>
      </div>

      {/* Goal list */}
      <div className="space-y-3">
        {goals.map((goal) => {
          const Icon = typeIcons[goal.type] || Target;
          const pct = Math.round((goal.currentValue / goal.targetValue) * 100);
          return (
            <div
              key={goal.id}
              className={`rounded-xl border p-5 transition-all ${
                goal.completed
                  ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/10"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${typeColors[goal.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{goal.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className={`text-[10px] ${typeColors[goal.type]}`}>{goal.type}</Badge>
                      {goal.subject && <Badge variant="outline" className="text-[10px]">{goal.subject}</Badge>}
                      {goal.deadline && <span className="text-[10px] text-gray-500">{goal.deadline}</span>}
                    </div>
                  </div>
                </div>
                {goal.completed && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
              </div>
              <div className="flex items-center gap-3">
                <Progress value={pct} className="flex-1 h-2" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-16 text-right">
                  {goal.currentValue}/{goal.targetValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
