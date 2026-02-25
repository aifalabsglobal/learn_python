"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, BookOpen, Code, Clock } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const mockEvents: Record<string, { title: string; subject: string; time: string; type: string }[]> = {
  "2026-02-24": [{ title: "Python: Lambda Functions", subject: "Python", time: "10:00", type: "study" }],
  "2026-02-25": [
    { title: "JavaScript: Arrays", subject: "JavaScript", time: "09:00", type: "study" },
    { title: "SQL: JOINs Practice", subject: "SQL", time: "14:00", type: "practice" },
  ],
  "2026-02-26": [{ title: "HTML/CSS: Flexbox", subject: "HTML/CSS", time: "11:00", type: "study" }],
  "2026-02-27": [{ title: "Git: Branching", subject: "Git", time: "15:00", type: "study" }],
  "2026-02-28": [{ title: "Python: Generators", subject: "Python", time: "10:00", type: "study" }],
};

const typeColors: Record<string, string> = {
  study: "bg-blue-500",
  practice: "bg-emerald-500",
  review: "bg-amber-500",
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 25));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const getDateKey = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Plan and track your study sessions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {MONTHS[month]} {year}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-px">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
            ))}
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const dateKey = getDateKey(day);
              const events = mockEvents[dateKey] || [];
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              return (
                <div
                  key={day}
                  className={`min-h-[80px] border border-gray-100 dark:border-gray-800 rounded-lg p-1.5 ${
                    isToday ? "bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" : ""
                  }`}
                >
                  <span className={`text-xs font-medium ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {events.map((e, ei) => (
                      <div key={ei} className="flex items-center gap-1">
                        <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${typeColors[e.type] || "bg-gray-400"}`} />
                        <span className="text-[10px] text-gray-700 dark:text-gray-300 truncate">{e.title.split(":")[1]?.trim() || e.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {Object.entries(mockEvents).flatMap(([date, events]) =>
              events.map((e, i) => (
                <div key={`${date}-${i}`} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`h-2 w-2 rounded-full ${typeColors[e.type]}`} />
                    <span className="text-xs text-gray-500">{date} · {e.time}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{e.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px]">{e.subject}</Badge>
                    <Badge variant="outline" className="text-[10px]">{e.type}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
