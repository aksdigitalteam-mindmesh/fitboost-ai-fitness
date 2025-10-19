"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWorkoutLog } from "@/src/hooks/use-workout-log";

export default function WorkoutSessionPage() {
  const { workoutPlan } = useWorkoutLog();
  const plan = workoutPlan || {
    planName: "7-Day Full Body Strength Plan",
    days: [
      { day: "Day 1 - Upper Body", exercises: [], completed: false },
      { day: "Day 2 - Lower Body", exercises: [], completed: false },
      { day: "Day 3 - Core & Cardio", exercises: [], completed: false },
      { day: "Day 4 - Rest Day", exercises: [], completed: false },
      { day: "Day 5 - Full Body Circuit", exercises: [], completed: false },
      { day: "Day 6 - Strength & Stability", exercises: [], completed: false },
      { day: "Day 7 - Active Recovery", exercises: [], completed: false },
    ],
  };
  return (
    <div className="min-h-screen bg-background pb-20 p-6 flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">{plan.planName}</CardTitle>
          <CardDescription className="text-center text-muted-foreground mb-4">
            Select a day to start your workout session. Each day has a unique routine.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Array.isArray(plan.days) ? plan.days : []).map((day, idx) => (
              <div key={idx} className="flex flex-col items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="font-semibold text-lg mb-2">{day.day}</div>
                <Button
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href={`/dashboard/workout/session/${idx}`}>Start Session</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
