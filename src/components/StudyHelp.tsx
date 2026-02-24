"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Loader2 } from "lucide-react";

export function StudyHelp({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk() {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);
    setAnswer("");
    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context: context || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setAnswer(data.answer ?? "");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            aria-label="Get study help"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Study help</SheetTitle>
          </SheetHeader>
          <p className="text-sm text-muted-foreground">
            Ask anything about Python (functions, types, OOP, etc.). The AI will try to help.
          </p>
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <Textarea
              placeholder="e.g. What's the difference between *args and **kwargs?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={loading}
            />
            <Button onClick={handleAsk} disabled={loading || !question.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking…
                </>
              ) : (
                "Ask"
              )}
            </Button>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            {answer && (
              <div className="flex-1 overflow-auto rounded-md border bg-muted/50 p-3 text-sm whitespace-pre-wrap">
                {answer}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
