"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { getDifficultyXp, getLevel, getStreakStatus } from "@/lib/gamification";

export async function completeLesson(lessonId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { topic: { include: { subject: true } } },
  });
  if (!lesson) throw new Error("Lesson not found");

  const existing = await prisma.userProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
  });

  if (existing?.completed) {
    return { alreadyCompleted: true };
  }

  const xpReward = lesson.xpReward || getDifficultyXp(lesson.difficulty);
  const newXp = user.xp + xpReward;
  const levelInfo = getLevel(newXp);

  const streakStatus = getStreakStatus(user.lastActiveAt);
  let newStreak = user.currentStreak;
  if (streakStatus.shouldReset) newStreak = 1;
  else if (streakStatus.shouldIncrement) newStreak += 1;

  const longestStreak = Math.max(user.longestStreak, newStreak);

  await prisma.$transaction([
    prisma.userProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      create: {
        userId: user.id,
        lessonId,
        completed: true,
        xpEarned: xpReward,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        xpEarned: xpReward,
        completedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXp,
        level: levelInfo.level,
        currentStreak: newStreak,
        longestStreak,
        lastActiveAt: new Date(),
      },
    }),
    prisma.userStreak.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: new Date(new Date().toISOString().split("T")[0]),
        },
      },
      create: {
        userId: user.id,
        date: new Date(new Date().toISOString().split("T")[0]),
        count: newStreak,
      },
      update: { count: newStreak },
    }),
  ]);

  return {
    xpEarned: xpReward,
    totalXp: newXp,
    level: levelInfo.level,
    streak: newStreak,
    alreadyCompleted: false,
  };
}

export async function getUserStats() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return null;

  const completedCount = await prisma.userProgress.count({
    where: { userId: user.id, completed: true },
  });

  const levelInfo = getLevel(user.xp);

  return {
    ...user,
    completedLessons: completedCount,
    levelInfo,
  };
}

export async function getSubjectProgress(subjectSlug: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return null;

  const subject = await prisma.subject.findUnique({
    where: { slug: subjectSlug },
    include: {
      topics: {
        include: {
          lessons: {
            include: {
              progress: {
                where: { userId: user.id },
              },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return subject;
}
