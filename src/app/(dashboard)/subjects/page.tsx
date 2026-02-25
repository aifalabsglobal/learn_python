"use client";

import Link from "next/link";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { Code, FileCode, Globe, Database, GitBranch, ArrowRight } from "lucide-react";

const subjects = [
  {
    slug: "python",
    name: "Python",
    description: "Master Python from fundamentals to OOP — data types, functions, classes, and more.",
    icon: Code,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    topics: 40,
    completed: 35,
    difficulty: "Beginner → Advanced",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    description: "Learn JavaScript: variables, functions, DOM, async/await, ES6+, and Node.js basics.",
    icon: FileCode,
    color: "text-yellow-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    topics: 35,
    completed: 12,
    difficulty: "Beginner → Advanced",
  },
  {
    slug: "html-css",
    name: "HTML / CSS",
    description: "Build web pages: semantic HTML, CSS styling, Flexbox, Grid, and responsive design.",
    icon: Globe,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    topics: 25,
    completed: 8,
    difficulty: "Beginner → Intermediate",
  },
  {
    slug: "sql",
    name: "SQL",
    description: "Query databases: SELECT, JOINs, aggregation, subqueries, indexing, and optimization.",
    icon: Database,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    topics: 20,
    completed: 5,
    difficulty: "Beginner → Intermediate",
  },
  {
    slug: "git",
    name: "Git",
    description: "Version control: commits, branches, merging, rebasing, pull requests, and workflows.",
    icon: GitBranch,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    topics: 15,
    completed: 3,
    difficulty: "Beginner → Intermediate",
  },
];

export default function SubjectsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subjects</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Choose a subject to start or continue learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {subjects.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className={`group rounded-xl border ${s.borderColor} ${s.bgColor} p-6 transition-all hover:shadow-lg hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-sm`}>
                    <Icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{s.name}</h3>
                    <span className="text-xs text-gray-500">{s.difficulty}</span>
                  </div>
                </div>
                <ProgressRing
                  value={s.completed}
                  max={s.topics}
                  size={56}
                  strokeWidth={5}
                  color={s.color}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{s.completed}/{s.topics} topics completed</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Continue <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
