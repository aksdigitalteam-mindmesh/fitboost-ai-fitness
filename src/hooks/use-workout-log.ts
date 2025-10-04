"use client"

import { useState, useEffect } from 'react'

interface Exercise {
  name: string
  sets: number
  reps: number | string
  rest: string
  completed: boolean
}

interface WorkoutDay {
  day: string
  exercises: Exercise[]
  completed: boolean
  completedAt?: string
}

interface WorkoutPlan {
  planName: string
  days: WorkoutDay[]
  createdAt: string
}

export function useWorkoutLog() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitboost_workout_plan')
    const savedCompleted = localStorage.getItem('fitboost_completed_workouts')
    
    if (savedPlan) {
      setWorkoutPlan(JSON.parse(savedPlan))
    }
    if (savedCompleted) {
      setCompletedWorkouts(JSON.parse(savedCompleted))
    }
  }, [])

  const saveWorkoutPlan = (plan: WorkoutPlan) => {
    setWorkoutPlan(plan)
    localStorage.setItem('fitboost_workout_plan', JSON.stringify(plan))
  }

  const completeWorkout = (dayIndex: number) => {
    if (!workoutPlan) return

    const updatedPlan = { ...workoutPlan }
    updatedPlan.days[dayIndex].completed = true
    updatedPlan.days[dayIndex].completedAt = new Date().toISOString()
    
    setWorkoutPlan(updatedPlan)
    localStorage.setItem('fitboost_workout_plan', JSON.stringify(updatedPlan))

    const workoutId = `${workoutPlan.planName}-day-${dayIndex + 1}`
    const newCompleted = [...completedWorkouts, workoutId]
    setCompletedWorkouts(newCompleted)
    localStorage.setItem('fitboost_completed_workouts', JSON.stringify(newCompleted))
  }

  const completeExercise = (dayIndex: number, exerciseIndex: number) => {
    if (!workoutPlan) return

    const updatedPlan = { ...workoutPlan }
    updatedPlan.days[dayIndex].exercises[exerciseIndex].completed = true
    
    setWorkoutPlan(updatedPlan)
    localStorage.setItem('fitboost_workout_plan', JSON.stringify(updatedPlan))
  }

  const resetWorkout = (dayIndex: number) => {
    if (!workoutPlan) return

    const updatedPlan = { ...workoutPlan }
    updatedPlan.days[dayIndex].completed = false
    updatedPlan.days[dayIndex].completedAt = undefined
    updatedPlan.days[dayIndex].exercises.forEach(exercise => {
      exercise.completed = false
    })
    
    setWorkoutPlan(updatedPlan)
    localStorage.setItem('fitboost_workout_plan', JSON.stringify(updatedPlan))
  }

  return {
    workoutPlan,
    completedWorkouts,
    saveWorkoutPlan,
    completeWorkout,
    completeExercise,
    resetWorkout
  }
}
