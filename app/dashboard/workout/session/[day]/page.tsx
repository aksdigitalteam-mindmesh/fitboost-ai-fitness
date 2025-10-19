"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWorkoutLog } from "@/src/hooks/use-workout-log";

// Mock video URL for demonstration
const guideVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export default function WorkoutDaySessionPage({ params }: { params: { day: string } }) {
  const { workoutPlan } = useWorkoutLog();
  const plan = workoutPlan || {
    planName: "7-Day Full Body Strength Plan",
    days: [
      { day: "Day 1 - Upper Body", exercises: [
        { name: "Push-Ups", sets: 4, reps: 15, rest: "60s", completed: false },
        { name: "Plank", sets: 3, reps: "45s", rest: "30s", completed: false }
      ], completed: false },
      // ...other days
    ],
  };
  const dayIdx = parseInt(params.day);
  const exercises = plan.days[dayIdx]?.exercises || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const currentExercise = exercises[currentIdx];

  // Timer logic for time-based exercises
  const [timer, setTimer] = useState(
    typeof currentExercise?.reps === "string" && currentExercise?.reps.includes("s")
      ? parseInt(currentExercise?.reps)
      : 0
  );
  React.useEffect(() => {
    if (showRest && restTime > 0) {
      const interval = setInterval(() => setRestTime(t => t - 1), 1000);
      if (restTime <= 0) setShowRest(false);
      return () => clearInterval(interval);
    }
  }, [showRest, restTime]);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      if (timer <= 0) setTimer(0);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDone = () => {
    if (currentIdx < exercises.length - 1) {
      setShowRest(true);
      setRestTime(parseInt(currentExercise.rest));
      setCurrentIdx(idx => idx + 1);
      // Reset timer for next exercise
      const next = exercises[currentIdx + 1];
      setTimer(typeof next?.reps === "string" && next?.reps.includes("s") ? parseInt(next.reps) : 0);
    }
  };

  if (!exercises.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>No exercises for this day.</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/workout/session">Back to days</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showRest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Rest Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{restTime}s</div>
            <div className="mb-2">Get ready for the next exercise!</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 p-6">
      <Card>
        <CardHeader>
          <CardTitle>{currentExercise.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <iframe
              width="100%"
              height="220"
              src={guideVideoUrl}
              title="Exercise Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {typeof currentExercise.reps === "number" ? (
            <div className="text-2xl font-bold mb-2">{currentExercise.reps} reps</div>
          ) : (
            <div className="text-2xl font-bold mb-2">{timer > 0 ? `${timer}s` : currentExercise.reps}</div>
          )}
          <Button size="lg" className="mt-4" onClick={handleDone}>
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
