"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Lock, ArrowDown } from "lucide-react";
import Link from "next/link";

const roadmap = [
  {
    phase: "Phase 1: Foundations",
    description: "Build your programming base with HTML, CSS, and Python basics.",
    status: "in-progress",
    steps: [
      { subject: "HTML/CSS", topic: "Elements & Structure", slug: "html-css", topicId: "html-elements", status: "completed" },
      { subject: "HTML/CSS", topic: "Forms & Inputs", slug: "html-css", topicId: "html-forms", status: "current" },
      { subject: "Python", topic: "Data Types", slug: "python", topicId: "dt-int", status: "completed" },
      { subject: "Python", topic: "Collections", slug: "python", topicId: "coll-list", status: "completed" },
      { subject: "Python", topic: "Control Flow", slug: "python", topicId: "cond-if", status: "upcoming" },
      { subject: "Git", topic: "Init & Commits", slug: "git", topicId: "git-init", status: "completed" },
    ],
  },
  {
    phase: "Phase 2: Programming Skills",
    description: "Deepen your skills with functions, DOM, and database queries.",
    status: "upcoming",
    steps: [
      { subject: "Python", topic: "Built-in Functions", slug: "python", topicId: "built-in", status: "upcoming" },
      { subject: "Python", topic: "User-defined Functions", slug: "python", topicId: "user-defined", status: "upcoming" },
      { subject: "JavaScript", topic: "Variables & Types", slug: "javascript", topicId: "js-variables", status: "completed" },
      { subject: "JavaScript", topic: "Functions", slug: "javascript", topicId: "js-functions", status: "completed" },
      { subject: "JavaScript", topic: "DOM Manipulation", slug: "javascript", topicId: "js-dom", status: "upcoming" },
      { subject: "SQL", topic: "SELECT Queries", slug: "sql", topicId: "sql-select", status: "completed" },
      { subject: "SQL", topic: "JOINs", slug: "sql", topicId: "sql-joins", status: "upcoming" },
      { subject: "Git", topic: "Branching", slug: "git", topicId: "git-branch", status: "upcoming" },
    ],
  },
  {
    phase: "Phase 3: Advanced Concepts",
    description: "Master advanced topics: OOP, async, CSS layouts, and Git workflows.",
    status: "locked",
    steps: [
      { subject: "Python", topic: "Classes & OOP", slug: "python", topicId: "oop-class-basics", status: "locked" },
      { subject: "Python", topic: "Generators & Closures", slug: "python", topicId: "generator", status: "locked" },
      { subject: "JavaScript", topic: "Async/Await", slug: "javascript", topicId: "js-async", status: "locked" },
      { subject: "HTML/CSS", topic: "Flexbox & Grid", slug: "html-css", topicId: "css-flexbox", status: "locked" },
      { subject: "SQL", topic: "Subqueries & Indexing", slug: "sql", topicId: "sql-subquery", status: "locked" },
      { subject: "Git", topic: "Rebasing & Workflows", slug: "git", topicId: "git-rebase", status: "locked" },
    ],
  },
];

const statusIcons: Record<string, typeof CheckCircle> = {
  completed: CheckCircle,
  current: Circle,
  upcoming: Circle,
  locked: Lock,
};

const statusColors: Record<string, string> = {
  completed: "text-emerald-500",
  current: "text-blue-500",
  upcoming: "text-gray-400",
  locked: "text-gray-300 dark:text-gray-600",
};

const subjectColors: Record<string, string> = {
  Python: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  JavaScript: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  "HTML/CSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  SQL: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  Git: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export default function RoadmapPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Roadmap</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your cross-subject learning path from beginner to advanced.</p>
      </div>

      <div className="space-y-8">
        {roadmap.map((phase, pi) => (
          <div key={pi}>
            <div className={`rounded-xl border p-5 mb-4 ${
              phase.status === "locked"
                ? "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-60"
                : phase.status === "in-progress"
                ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10"
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{phase.phase}</h2>
                {phase.status === "in-progress" && <Badge className="bg-blue-100 text-blue-700 text-[10px]">In Progress</Badge>}
                {phase.status === "locked" && <Badge className="bg-gray-100 text-gray-500 text-[10px]">Locked</Badge>}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{phase.description}</p>
            </div>

            <div className="ml-6 space-y-0">
              {phase.steps.map((step, si) => {
                const Icon = statusIcons[step.status] || Circle;
                const isClickable = step.status !== "locked";
                const Wrapper = isClickable ? Link : "div";
                const props = isClickable ? { href: `/subjects/${step.slug}/${step.topicId}` } : {};

                return (
                  <div key={si}>
                    <Wrapper
                      {...(props as any)}
                      className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors ${
                        isClickable ? "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" : ""
                      }`}
                    >
                      <div className="relative">
                        <Icon className={`h-5 w-5 ${statusColors[step.status]} ${step.status === "current" ? "fill-blue-100" : ""}`} />
                        {si < phase.steps.length - 1 && (
                          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${step.status === "locked" ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-white"}`}>
                          {step.topic}
                        </p>
                      </div>
                      <Badge className={`text-[10px] ${subjectColors[step.subject]}`}>{step.subject}</Badge>
                    </Wrapper>
                  </div>
                );
              })}
            </div>

            {pi < roadmap.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="h-5 w-5 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
