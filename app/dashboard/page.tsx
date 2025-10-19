"use client"

import React from 'react'
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
  const [consumedCalories, setConsumedCalories] = React.useState(0);
  React.useEffect(() => {
    const saved = localStorage.getItem('fitboost_calories');
    if (saved) setConsumedCalories(parseInt(saved));
  }, []);
  const calorieProgress = consumedCalories / dailyCalories;

  const addCalories = (amount: number) => {
    const newCalories = consumedCalories + amount;
    setConsumedCalories(newCalories);
    localStorage.setItem('fitboost_calories', newCalories.toString());
  };
  const resetCalories = () => {
    setConsumedCalories(0);
    localStorage.setItem('fitboost_calories', '0');
  };

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
            <div className="flex flex-col items-center justify-center gap-4">
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
              {/* Removed calorie input/add/reset buttons from ring */}
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
            <div className="flex flex-col items-center gap-4">
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
              <div className="flex gap-3 mt-2">
                {[...Array(waterLog.goal)].map((_, i) => {
                  const filled = i < waterLog.glasses;
                  return (
                    <svg
                      key={i}
                      width="48"
                      height="72"
                      viewBox="0 0 48 72"
                      style={{ display: 'inline-block' }}
                    >
                      <defs>
                        {/* Glass gradient */}
                        <linearGradient id={`glass-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f5f8ff" />
                          <stop offset="100%" stopColor="#cfd8e3" />
                        </linearGradient>
                        {/* Water gradient */}
                        <linearGradient id={`water-gradient-${i}`} x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        {/* Shadow */}
                        <filter id={`glass-shadow-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#bfc9d6" floodOpacity="0.25" />
                        </filter>
                      </defs>
                      {/* Glass outline with gradient and shadow */}
                      <polygon points="8,4 40,4 36,68 12,68" fill={`url(#glass-gradient-${i})`} stroke="#bfc9d6" strokeWidth="2" filter={`url(#glass-shadow-${i})`} />
                      {/* Water fill with gradient */}
                      <rect
                        x="12"
                        y={68 - (filled ? 56 : 0)}
                        width="24"
                        height={filled ? 56 : 0}
                        rx="6"
                        fill={`url(#water-gradient-${i})`}
                        style={{ transition: 'height 0.6s cubic-bezier(.4,2,.3,1), y 0.6s cubic-bezier(.4,2,.3,1)' }}
                      />
                      {/* Glass highlight */}
                      <rect x="16" y="12" width="4" height="40" rx="2" fill="#fff" opacity="0.18" />
                      {/* Rim highlight */}
                      <ellipse cx="24" cy="7" rx="14" ry="3" fill="#fff" opacity="0.25" />
                    </svg>
                  );
                })}
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
              <h3 className="text-lg font-semibold mb-2">Upper Body Strength</h3>
              <p className="text-muted-foreground mb-4">45 minutes • 8 exercises</p>
              <Button asChild className="w-full">
                <Link href="/dashboard/workout/session">
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
