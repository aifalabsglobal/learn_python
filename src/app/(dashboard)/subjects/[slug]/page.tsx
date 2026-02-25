"use client";

import { use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { CheckCircle, Lock, Play, ArrowLeft } from "lucide-react";

const subjectData: Record<string, {
  name: string;
  color: string;
  groups: { title: string; topics: { id: string; title: string; emoji: string; difficulty: string; completed: boolean; locked: boolean }[] }[];
}> = {
  python: {
    name: "Python",
    color: "text-yellow-500",
    groups: [
      {
        title: "1 · Fundamentals",
        topics: [
          { id: "dt-int", title: "int (integers)", emoji: "🔢", difficulty: "beginner", completed: true, locked: false },
          { id: "dt-float", title: "float (decimals)", emoji: "📐", difficulty: "beginner", completed: true, locked: false },
          { id: "dt-str", title: "str (strings)", emoji: "📝", difficulty: "beginner", completed: true, locked: false },
          { id: "dt-bool", title: "bool (True/False)", emoji: "✓", difficulty: "beginner", completed: true, locked: false },
          { id: "coll-list", title: "list", emoji: "📋", difficulty: "beginner", completed: true, locked: false },
          { id: "coll-dict", title: "dict", emoji: "🗂️", difficulty: "beginner", completed: false, locked: false },
          { id: "op-arith", title: "Arithmetic operators", emoji: "+", difficulty: "beginner", completed: false, locked: false },
          { id: "cond-if", title: "if / elif / else", emoji: "🔀", difficulty: "beginner", completed: false, locked: false },
          { id: "loop-for", title: "for loop", emoji: "🔄", difficulty: "beginner", completed: false, locked: false },
        ],
      },
      {
        title: "2 · Functions",
        topics: [
          { id: "built-in", title: "Built-in Functions", emoji: "🛠️", difficulty: "beginner", completed: false, locked: false },
          { id: "user-defined", title: "User-defined Functions", emoji: "✨", difficulty: "beginner", completed: false, locked: false },
          { id: "lambda", title: "Lambda Functions", emoji: "⚡", difficulty: "intermediate", completed: false, locked: false },
          { id: "recursive", title: "Recursive Functions", emoji: "🔄", difficulty: "intermediate", completed: false, locked: true },
          { id: "generator", title: "Generator Functions", emoji: "🔋", difficulty: "intermediate", completed: false, locked: true },
          { id: "closure", title: "Closure Functions", emoji: "🔐", difficulty: "advanced", completed: false, locked: true },
        ],
      },
      {
        title: "3 · OOP",
        topics: [
          { id: "oop-class-basics", title: "Classes and instances", emoji: "🏗️", difficulty: "intermediate", completed: false, locked: true },
          { id: "oop-inheritance", title: "Inheritance", emoji: "🧬", difficulty: "intermediate", completed: false, locked: true },
          { id: "oop-magic-methods", title: "Magic methods", emoji: "✨", difficulty: "advanced", completed: false, locked: true },
          { id: "oop-dataclass", title: "dataclasses", emoji: "📦", difficulty: "advanced", completed: false, locked: true },
        ],
      },
    ],
  },
  javascript: {
    name: "JavaScript",
    color: "text-yellow-400",
    groups: [
      {
        title: "1 · Basics",
        topics: [
          { id: "js-variables", title: "Variables & Types", emoji: "📦", difficulty: "beginner", completed: true, locked: false },
          { id: "js-functions", title: "Functions", emoji: "⚡", difficulty: "beginner", completed: true, locked: false },
          { id: "js-arrays", title: "Arrays & Objects", emoji: "📋", difficulty: "beginner", completed: false, locked: false },
          { id: "js-control", title: "Control Flow", emoji: "🔀", difficulty: "beginner", completed: false, locked: false },
        ],
      },
      {
        title: "2 · DOM & Async",
        topics: [
          { id: "js-dom", title: "DOM Manipulation", emoji: "🌐", difficulty: "intermediate", completed: false, locked: false },
          { id: "js-events", title: "Events", emoji: "🎯", difficulty: "intermediate", completed: false, locked: true },
          { id: "js-promises", title: "Promises", emoji: "🤝", difficulty: "intermediate", completed: false, locked: true },
          { id: "js-async", title: "Async/Await", emoji: "⏱️", difficulty: "advanced", completed: false, locked: true },
        ],
      },
    ],
  },
  "html-css": {
    name: "HTML / CSS",
    color: "text-orange-500",
    groups: [
      {
        title: "1 · HTML",
        topics: [
          { id: "html-elements", title: "Elements & Structure", emoji: "🏗️", difficulty: "beginner", completed: true, locked: false },
          { id: "html-forms", title: "Forms & Inputs", emoji: "📝", difficulty: "beginner", completed: false, locked: false },
          { id: "html-semantic", title: "Semantic HTML", emoji: "🏷️", difficulty: "beginner", completed: false, locked: false },
        ],
      },
      {
        title: "2 · CSS",
        topics: [
          { id: "css-selectors", title: "Selectors & Properties", emoji: "🎨", difficulty: "beginner", completed: false, locked: false },
          { id: "css-flexbox", title: "Flexbox", emoji: "📐", difficulty: "intermediate", completed: false, locked: true },
          { id: "css-grid", title: "CSS Grid", emoji: "🔲", difficulty: "intermediate", completed: false, locked: true },
          { id: "css-responsive", title: "Responsive Design", emoji: "📱", difficulty: "intermediate", completed: false, locked: true },
        ],
      },
    ],
  },
  sql: {
    name: "SQL",
    color: "text-blue-500",
    groups: [
      {
        title: "1 · Queries",
        topics: [
          { id: "sql-select", title: "SELECT", emoji: "🔍", difficulty: "beginner", completed: true, locked: false },
          { id: "sql-where", title: "WHERE & Filtering", emoji: "🎯", difficulty: "beginner", completed: false, locked: false },
          { id: "sql-joins", title: "JOINs", emoji: "🔗", difficulty: "intermediate", completed: false, locked: false },
          { id: "sql-aggregate", title: "Aggregation", emoji: "📊", difficulty: "intermediate", completed: false, locked: true },
          { id: "sql-subquery", title: "Subqueries", emoji: "📦", difficulty: "advanced", completed: false, locked: true },
        ],
      },
    ],
  },
  git: {
    name: "Git",
    color: "text-red-500",
    groups: [
      {
        title: "1 · Basics",
        topics: [
          { id: "git-init", title: "Init & Commits", emoji: "📝", difficulty: "beginner", completed: true, locked: false },
          { id: "git-branch", title: "Branching", emoji: "🌿", difficulty: "beginner", completed: false, locked: false },
          { id: "git-merge", title: "Merging", emoji: "🔀", difficulty: "intermediate", completed: false, locked: false },
          { id: "git-rebase", title: "Rebasing", emoji: "📏", difficulty: "advanced", completed: false, locked: true },
          { id: "git-workflows", title: "Workflows", emoji: "🔄", difficulty: "advanced", completed: false, locked: true },
        ],
      },
    ],
  },
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export default function SubjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const subject = subjectData[slug];

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subject not found</h1>
        <Link href="/subjects" className="text-blue-600 hover:underline mt-4 inline-block">Back to subjects</Link>
      </div>
    );
  }

  const allTopics = subject.groups.flatMap((g) => g.topics);
  const completedCount = allTopics.filter((t) => t.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/subjects" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to subjects
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{subject.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{completedCount} of {allTopics.length} topics completed</p>
        </div>
        <ProgressRing value={completedCount} max={allTopics.length} size={80} strokeWidth={7} color={subject.color} />
      </div>

      {subject.groups.map((group, gi) => (
        <div key={gi}>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{group.title}</h2>
          <div className="space-y-2">
            {group.topics.map((topic) => (
              <div
                key={topic.id}
                className={`rounded-xl border p-4 flex items-center justify-between transition-all ${
                  topic.locked
                    ? "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 opacity-60"
                    : topic.completed
                    ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/10"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{topic.title}</p>
                    <Badge className={`text-[10px] mt-0.5 ${difficultyColors[topic.difficulty]}`}>{topic.difficulty}</Badge>
                  </div>
                </div>
                <div>
                  {topic.locked ? (
                    <Lock className="h-4 w-4 text-gray-400" />
                  ) : topic.completed ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Link href={`/subjects/${slug}/${topic.id}`}>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="h-3 w-3" /> Start
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
