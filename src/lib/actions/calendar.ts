"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function createCalendarEvent(data: {
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type?: string;
  subjectId?: string;
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  return prisma.calendarEvent.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description || "",
      date: new Date(data.date),
      startTime: data.startTime,
      endTime: data.endTime,
      type: data.type || "study",
      subjectId: data.subjectId,
    },
  });
}

export async function getCalendarEvents(month: number, year: number) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return [];

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59);

  return prisma.calendarEvent.findMany({
    where: {
      userId: user.id,
      date: { gte: startDate, lte: endDate },
    },
    include: { subject: true },
    orderBy: { date: "asc" },
  });
}

export async function toggleEventComplete(eventId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const event = await prisma.calendarEvent.findFirst({
    where: { id: eventId, userId: user.id },
  });
  if (!event) throw new Error("Event not found");

  return prisma.calendarEvent.update({
    where: { id: eventId },
    data: { completed: !event.completed },
  });
}
