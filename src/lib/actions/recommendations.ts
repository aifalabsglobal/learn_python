"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export interface Recommendation {
  topicId: string;
  topicTitle: string;
  topicEmoji: string;
  subjectName: string;
  subjectSlug: string;
  difficulty: string;
  reason: string;
}

export async function getRecommendations(limit = 5): Promise<Recommendation[]> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return [];

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];

  const completedLessonIds = (
    await prisma.userProgress.findMany({
      where: { userId: user.id, completed: true },
      select: { lessonId: true },
    })
  ).map((p) => p.lessonId);

  const completedTopicIds = new Set(
    (
      await prisma.lesson.findMany({
        where: { id: { in: completedLessonIds } },
        select: { topicId: true },
      })
    ).map((l) => l.topicId)
  );

  const allTopics = await prisma.topic.findMany({
    include: { subject: true },
    orderBy: [{ subject: { order: "asc" } }, { order: "asc" }],
  });

  const recommendations: Recommendation[] = [];

  // 1. Next uncompleted topic in each subject (continue where you left off)
  const subjectGroups: Record<string, typeof allTopics> = {};
  for (const t of allTopics) {
    if (!subjectGroups[t.subjectId]) subjectGroups[t.subjectId] = [];
    subjectGroups[t.subjectId].push(t);
  }

  for (const topics of Object.values(subjectGroups)) {
    const next = topics.find((t) => !completedTopicIds.has(t.id));
    if (next) {
      recommendations.push({
        topicId: next.id,
        topicTitle: next.title,
        topicEmoji: next.emoji,
        subjectName: next.subject.name,
        subjectSlug: next.subject.slug,
        difficulty: next.difficulty,
        reason: `Next in ${next.subject.name}`,
      });
    }
  }

  // 2. Topics whose prerequisites are met but not started
  for (const t of allTopics) {
    if (completedTopicIds.has(t.id)) continue;
    if (!t.prerequisiteId) continue;
    if (completedTopicIds.has(t.prerequisiteId)) {
      const alreadyRecommended = recommendations.some((r) => r.topicId === t.id);
      if (!alreadyRecommended) {
        recommendations.push({
          topicId: t.id,
          topicTitle: t.title,
          topicEmoji: t.emoji,
          subjectName: t.subject.name,
          subjectSlug: t.subject.slug,
          difficulty: t.difficulty,
          reason: "Prerequisites completed",
        });
      }
    }
  }

  // 3. Adapt difficulty: if user is consistently scoring well, suggest harder topics
  const recentProgress = await prisma.userProgress.findMany({
    where: { userId: user.id, completed: true },
    orderBy: { completedAt: "desc" },
    take: 10,
    include: { lesson: true },
  });

  const avgDifficulty = recentProgress.length > 0
    ? recentProgress.reduce((sum, p) => {
        const d = p.lesson.difficulty;
        return sum + (d === "beginner" ? 1 : d === "intermediate" ? 2 : 3);
      }, 0) / recentProgress.length
    : 1;

  const suggestedDifficulty =
    avgDifficulty >= 2.5 ? "advanced" : avgDifficulty >= 1.5 ? "intermediate" : "beginner";

  // Add difficulty-appropriate topics not yet recommended
  for (const t of allTopics) {
    if (completedTopicIds.has(t.id)) continue;
    if (recommendations.some((r) => r.topicId === t.id)) continue;
    if (t.difficulty === suggestedDifficulty) {
      recommendations.push({
        topicId: t.id,
        topicTitle: t.title,
        topicEmoji: t.emoji,
        subjectName: t.subject.name,
        subjectSlug: t.subject.slug,
        difficulty: t.difficulty,
        reason: `Matches your skill level (${suggestedDifficulty})`,
      });
    }
    if (recommendations.length >= limit * 2) break;
  }

  return recommendations.slice(0, limit);
}

export async function getDifficultyStats() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return null;

  const progress = await prisma.userProgress.findMany({
    where: { userId: user.id, completed: true },
    include: { lesson: { include: { topic: true } } },
  });

  const stats = {
    beginner: { completed: 0, total: 0 },
    intermediate: { completed: 0, total: 0 },
    advanced: { completed: 0, total: 0 },
  };

  for (const p of progress) {
    const d = p.lesson.difficulty as keyof typeof stats;
    if (stats[d]) stats[d].completed++;
  }

  const allTopics = await prisma.topic.findMany();
  for (const t of allTopics) {
    const d = t.difficulty as keyof typeof stats;
    if (stats[d]) stats[d].total++;
  }

  return stats;
}
