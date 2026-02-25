"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function createGoal(data: {
  title: string;
  description?: string;
  type: string;
  targetValue: number;
  targetDate?: string;
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  return prisma.userGoal.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description || "",
      type: data.type,
      targetValue: data.targetValue,
      targetDate: data.targetDate ? new Date(data.targetDate) : null,
    },
  });
}

export async function updateGoalProgress(goalId: string, currentValue: number) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const goal = await prisma.userGoal.findFirst({
    where: { id: goalId, userId: user.id },
  });
  if (!goal) throw new Error("Goal not found");

  const completed = currentValue >= goal.targetValue;

  return prisma.userGoal.update({
    where: { id: goalId },
    data: { currentValue, completed },
  });
}

export async function getUserGoals() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return [];

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];

  return prisma.userGoal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}
