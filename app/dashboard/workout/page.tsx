"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useWorkoutLog } from '@/src/hooks/use-workout-log'
import { Play, CheckCircle, Clock, Target, TrendingUp, Brain } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function WorkoutPage() {
  const { workoutPlan, completedWorkouts } = useWorkoutLog()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const mockWorkoutPlan = {
    planName: "7-Day Full Body Strength Plan",
    days: [
      {
        day: "Day 1 - Upper Body",
        exercises: [
          { name: "Push-Ups", sets: 4, reps: 15, rest: "60s", completed: false },
          { name: "Pull-Ups", sets: 3, reps: 10, rest: "60s", completed: false },
          { name: "Dips", sets: 3, reps: 12, rest: "45s", completed: false },
          { name: "Plank", sets: 3, reps: "45s", rest: "30s", completed: false }
        ],
        completed: false
      },
      {
        day: "Day 2 - Lower Body",
        exercises: [
          { name: "Squats", sets: 4, reps: 20, rest: "60s", completed: false },
          { name: "Lunges", sets: 3, reps: 15, rest: "45s", completed: false },
          { name: "Deadlifts", sets: 3, reps: 12, rest: "90s", completed: false },
          { name: "Calf Raises", sets: 3, reps: 20, rest: "30s", completed: false }
        ],
        completed: false
      },
      {
        day: "Day 3 - Core & Cardio",
        exercises: [
          { name: "Crunches", sets: 3, reps: 20, rest: "30s", completed: false },
          { name: "Mountain Climbers", sets: 3, reps: "30s", rest: "30s", completed: false },
          { name: "Burpees", sets: 3, reps: 10, rest: "60s", completed: false },
          { name: "High Knees", sets: 3, reps: "30s", rest: "30s", completed: false }
        ],
        completed: false
      }
    ],
    createdAt: new Date().toISOString()
  }

  const currentPlan = workoutPlan || mockWorkoutPlan

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workout</h1>
            <p className="text-muted-foreground">Track your fitness journey</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/programs">
                <Brain className="h-4 w-4 mr-2" />
                AI Coach
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6 text-center">
              <Play className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Start Workout</h3>
              <p className="text-sm text-muted-foreground">Begin your session</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Progress</h3>
              <p className="text-sm text-muted-foreground">View your stats</p>
            </CardContent>
          </Card>
        </div>

        {/* Workout Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {currentPlan.planName}
            </CardTitle>
            <CardDescription>Your personalized workout schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentPlan.days.map((day, dayIndex) => (
                <div key={dayIndex} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        day.completed ? 'bg-green-500 text-white' : 'bg-muted'
                      }`}>
                        {day.completed && <CheckCircle className="h-4 w-4" />}
                      </div>
                      <h3 className="font-semibold">{day.day}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDay(selectedDay === dayIndex ? null : dayIndex)}
                    >
                      {selectedDay === dayIndex ? 'Hide' : 'View'}
                    </Button>
                  </div>
                  
                  {selectedDay === dayIndex && (
                    <div className="space-y-2 ml-9">
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex}
                          className={`flex items-center justify-between p-2 rounded ${
                            exercise.completed ? 'bg-green-50 dark:bg-green-950/20' : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              exercise.completed ? 'bg-green-500' : 'bg-muted-foreground/30'
                            }`} />
                            <span className="text-sm">{exercise.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Start Day {dayIndex + 1}
                        </Button>
                        {day.completed && (
                          <Button variant="outline" size="sm">
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guided Session */}
        <Card>
          <CardHeader>
            <CardTitle>Guided Session</CardTitle>
            <CardDescription>Step-by-step workout guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-lg font-semibold mb-2">Ready to start?</h3>
              <p className="text-muted-foreground mb-6">
                Choose a workout day above to begin your guided session
              </p>
              <Button size="lg" className="w-full">
                <Play className="h-5 w-5 mr-2" />
                Start Guided Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workout Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
            <CardDescription>Keep track of your achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Workouts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2h 15m</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
