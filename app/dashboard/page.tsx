"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { Button } from '@/components/ui/button'
import { useWaterTracker } from '@/src/hooks/use-water-tracker'
import { usePremiumStatus } from '@/src/hooks/use-premium-status'
import { calculateCalories, calculateMacros } from '@/src/lib/utils'
import { Droplets, Plus, Minus, Target, Zap, Clock, Utensils } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { waterLog, addGlass, removeGlass, progress: waterProgress } = useWaterTracker()
  const { profile, isPremium } = usePremiumStatus()
  
  const dailyCalories = calculateCalories(profile.weight, profile.height, profile.age, profile.gender)
  const macros = calculateMacros(dailyCalories)
  const consumedCalories = 1200 // Mock data
  const calorieProgress = consumedCalories / dailyCalories

  const meals = [
    { name: 'Breakfast', calories: 400, time: '8:00 AM', completed: true },
    { name: 'Lunch', calories: 600, time: '1:00 PM', completed: true },
    { name: 'Dinner', calories: 500, time: '7:00 PM', completed: false },
    { name: 'Snack', calories: 200, time: '3:00 PM', completed: true },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning!</h1>
            <p className="text-muted-foreground">Ready to crush your goals?</p>
          </div>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Calorie Ring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Daily Calories
            </CardTitle>
            <CardDescription>Track your daily calorie intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ProgressRing value={consumedCalories} max={dailyCalories} size={140}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {consumedCalories}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    / {dailyCalories} cal
                  </div>
                </div>
              </ProgressRing>
            </div>
          </CardContent>
        </Card>

        {/* Macro Bars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Macros
            </CardTitle>
            <CardDescription>Protein, Carbs, and Fats breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Protein</span>
                <span className="font-medium">{macros.protein}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carbs</span>
                <span className="font-medium">{macros.carbs}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fats</span>
                <span className="font-medium">{macros.fats}g</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Water Intake
            </CardTitle>
            <CardDescription>Stay hydrated throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={removeGlass}
                  disabled={waterLog.glasses === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {waterLog.glasses}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    / {waterLog.goal} glasses
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={addGlass}
                  disabled={waterLog.glasses >= 20}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-16 h-16">
                <ProgressRing value={waterLog.glasses} max={waterLog.goal} size={64}>
                  <Droplets className="h-6 w-6 text-primary" />
                </ProgressRing>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Workout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today's Workout
            </CardTitle>
            <CardDescription>Your scheduled training session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-6xl mb-4">💪</div>
              <h3 className="text-lg font-semibold mb-2">Upper Body Strength</h3>
              <p className="text-muted-foreground mb-4">45 minutes • 8 exercises</p>
              <Button asChild className="w-full">
                <Link href="/dashboard/workout">
                  Start Workout
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Meal Log */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Meal Log
            </CardTitle>
            <CardDescription>Track your daily meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {meals.map((meal, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    meal.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      meal.completed ? 'bg-green-500' : 'bg-muted-foreground/30'
                    }`} />
                    <div>
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-sm text-muted-foreground">{meal.time}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{meal.calories} cal</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AdMob Banner Placeholder */}
        <Card className="bg-muted/30">
          <CardContent className="py-8 text-center">
            <div className="text-muted-foreground">
              <div className="text-sm">Advertisement</div>
              <div className="text-xs mt-1">AdMob Banner Ad</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
