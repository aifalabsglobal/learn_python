"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Code } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

const lessonContent: Record<string, {
  title: string;
  emoji: string;
  difficulty: string;
  xpReward: number;
  explanation: string;
  kidExplanation: string;
  examples: { title: string; code: string }[];
}> = {
  "built-in": {
    title: "Built-in Functions",
    emoji: "🛠️",
    difficulty: "beginner",
    xpReward: 15,
    explanation: "Python ships with dozens of built-in functions. You don't install anything — they're always available. Use them for I/O (print, input), math (abs, round, min, max, sum), type checking (type, isinstance), working with collections (len, sorted, reversed, enumerate, zip), and more.",
    kidExplanation: "Like tools in a toolbox that comes with your house. print(), len(), max() are ready whenever you need them.",
    examples: [
      { title: "Output and collection size", code: `# Display text and get collection length\nprint("Hello!")                    # Hello!\nitems = ["apple", "banana", "cherry"]\nprint(len(items))                 # 3` },
      { title: "Math and aggregation", code: `scores = [85, 92, 78, 95, 88]\nprint(min(scores))                # 78\nprint(max(scores))                # 95\nprint(sum(scores))                # 438` },
    ],
  },
  "dt-int": {
    title: "int (integers)",
    emoji: "🔢",
    difficulty: "beginner",
    xpReward: 10,
    explanation: "int is unbounded in Python 3. Supports + - * / // % **, bitwise & | ^ ~ << >>, abs(), divmod(), int(string, base).",
    kidExplanation: "Numbers with no decimal part. You can add, subtract, multiply, and do special operations.",
    examples: [
      { title: "Arithmetic and floor division", code: "a, b = 17, 5\nprint(a + b, a - b, a * b)   # 22 12 85\nprint(a // b, a % b)          # 3 2\nprint(2 ** 10)                # 1024" },
    ],
  },
};

export default function LessonPage({ params }: { params: Promise<{ slug: string; topicId: string }> }) {
  const { slug, topicId } = use(params);
  const lesson = lessonContent[topicId];

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Link href={`/subjects/${slug}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to subject
        </Link>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-6xl mb-4">📚</p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Content Coming Soon</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            This lesson is being prepared. Check back soon!
          </p>
          <Link href={`/subjects/${slug}`}>
            <Button variant="outline">Back to {slug}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const diffColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href={`/subjects/${slug}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to {slug}
      </Link>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{lesson.emoji}</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={diffColors[lesson.difficulty]}>{lesson.difficulty}</Badge>
              <Badge variant="outline" className="text-purple-600">+{lesson.xpReward} XP</Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">{lesson.explanation}</p>

        <Card className="mb-6 border-blue-100 bg-blue-50/30 dark:border-blue-800 dark:bg-blue-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              In plain words
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">{lesson.kidExplanation}</p>
          </CardContent>
        </Card>

        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Code className="w-4 h-4" /> Examples
        </h3>
        {lesson.examples.map((ex, i) => (
          <div key={i} className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-1">{ex.title}</p>
            <CodeBlock code={ex.code} language="python" filename={`${topicId}-${i + 1}.py`} />
          </div>
        ))}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Link href={`/subjects/${slug}`}>
            <Button variant="outline" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" /> Mark Complete (+{lesson.xpReward} XP)
          </Button>
        </div>
      </div>
    </div>
  );
}
