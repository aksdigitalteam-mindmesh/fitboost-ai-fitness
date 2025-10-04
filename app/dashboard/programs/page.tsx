"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePremiumStatus } from '@/src/hooks/use-premium-status'
import { useWorkoutLog } from '@/src/hooks/use-workout-log'
import { Brain, Dumbbell, Utensils, Zap, Crown, Lock } from 'lucide-react'
import { useState } from 'react'

export default function ProgramsPage() {
  const { profile, isPremium, canUseAi, useAiGeneration } = usePremiumStatus()
  const { saveWorkoutPlan } = useWorkoutLog()
  const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)

  const generateWorkoutPlan = async () => {
    if (!canUseAi) return

    setIsGenerating(true)
    useAiGeneration()

    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals: ['strength', 'muscle_gain'],
          intensity: 'intermediate',
          duration: 7,
          equipment: ['bodyweight', 'dumbbells'],
          timePerSession: 45
        })
      })

      const plan = await response.json()
      setGeneratedPlan(plan)
      saveWorkoutPlan(plan)
    } catch (error) {
      console.error('Error generating workout plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateDietPlan = async () => {
    if (!canUseAi) return

    setIsGenerating(true)
    useAiGeneration()

    try {
      const response = await fetch('/api/generate-diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goals: ['weight_loss', 'muscle_gain'],
          dietaryRestrictions: [],
          calories: 2000,
          mealsPerDay: 4
        })
      })

      const plan = await response.json()
      setGeneratedPlan(plan)
    } catch (error) {
      console.error('Error generating diet plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Coach</h1>
            <p className="text-muted-foreground">Personalized fitness & nutrition plans</p>
          </div>
          <div className="flex items-center gap-2">
            {isPremium ? (
              <div className="flex items-center gap-1 text-primary">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Premium</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Free Plan</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Usage Status */}
        {!isPremium && (
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">AI Generations Left</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.maxAiUsage - profile.aiUsage} of {profile.maxAiUsage} remaining
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'workout'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('workout')}
          >
            <Dumbbell className="h-4 w-4" />
            Workout Generator
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'diet'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('diet')}
          >
            <Utensils className="h-4 w-4" />
            Diet Generator
          </button>
        </div>

        {/* Workout Generator */}
        {activeTab === 'workout' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Workout Generator
              </CardTitle>
              <CardDescription>
                Get a personalized workout plan based on your goals and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Goals</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>Strength Building</option>
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Endurance</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Intensity</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration (days)</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Equipment</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>Bodyweight Only</option>
                    <option>Gym Equipment</option>
                    <option>Home Gym</option>
                  </select>
                </div>
              </div>
              
              <Button
                onClick={generateWorkoutPlan}
                disabled={!canUseAi || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate AI Workout Plan
                  </>
                )}
              </Button>

              {!canUseAi && (
                <div className="text-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Upgrade to Premium for unlimited AI generations
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Diet Generator */}
        {activeTab === 'diet' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Diet Generator
              </CardTitle>
              <CardDescription>
                Get a personalized nutrition plan tailored to your goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Goals</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Maintenance</option>
                    <option>Performance</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Calories</label>
                  <input
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md bg-background"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meals per Day</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>3 meals</option>
                    <option>4 meals</option>
                    <option>5 meals</option>
                    <option>6 meals</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Diet Type</label>
                  <select className="w-full mt-1 p-2 border rounded-md bg-background">
                    <option>Balanced</option>
                    <option>Keto</option>
                    <option>Paleo</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                  </select>
                </div>
              </div>
              
              <Button
                onClick={generateDietPlan}
                disabled={!canUseAi || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate AI Diet Plan
                  </>
                )}
              </Button>

              {!canUseAi && (
                <div className="text-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Upgrade to Premium for unlimited AI generations
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Generated Plan Display */}
        {generatedPlan && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Plan</CardTitle>
              <CardDescription>Your personalized {activeTab} plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">{generatedPlan.planName}</h3>
                {generatedPlan.days && (
                  <div className="space-y-2">
                    {generatedPlan.days.map((day: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium">{day.day}</h4>
                        {day.exercises && (
                          <div className="mt-2 space-y-1">
                            {day.exercises.map((exercise: any, exIndex: number) => (
                              <div key={exIndex} className="text-sm text-muted-foreground">
                                • {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                              </div>
                            ))}
                          </div>
                        )}
                        {day.meals && (
                          <div className="mt-2 space-y-1">
                            {day.meals.map((meal: any, mealIndex: number) => (
                              <div key={mealIndex} className="text-sm text-muted-foreground">
                                • {meal.name} - {meal.calories} cal
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
