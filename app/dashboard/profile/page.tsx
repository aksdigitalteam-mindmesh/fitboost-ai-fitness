"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePremiumStatus } from '@/src/hooks/use-premium-status'
import { useTheme } from 'next-themes'
import { User, Crown, Settings, Bell, Moon, Sun, Monitor, Edit, Target, Zap, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const { profile, updateProfile, upgradeToPremium, isPremium } = usePremiumStatus()
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)

  const handleProfileUpdate = (field: string, value: any) => {
    updateProfile({ [field]: value })
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  {isPremium ? (
                    <div className="flex items-center gap-1 text-primary">
                      <Crown className="h-4 w-4" />
                      <span className="text-sm font-medium">Premium Member</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Free Plan</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your FitBoost subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">
                    {isPremium ? 'Premium Plan' : 'Free Plan'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isPremium 
                      ? 'Unlimited AI generations and premium features'
                      : `${profile.maxAiUsage - profile.aiUsage} AI generations remaining`
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {isPremium ? '$9.99' : '$0'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isPremium ? '/month' : 'forever'}
                  </div>
                </div>
              </div>
              
              {!isPremium && (
                <Button onClick={upgradeToPremium} className="w-full">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleProfileUpdate('age', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full mt-1 p-2 border rounded-md bg-background disabled:bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Height (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleProfileUpdate('height', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full mt-1 p-2 border rounded-md bg-background disabled:bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Weight (kg)</label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => handleProfileUpdate('weight', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full mt-1 p-2 border rounded-md bg-background disabled:bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => handleProfileUpdate('gender', e.target.value)}
                  disabled={!isEditing}
                  className="w-full mt-1 p-2 border rounded-md bg-background disabled:bg-muted"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Settings
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Theme Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Workout reminders and tips</div>
                </div>
              </div>
              <Button
                variant={profile.reminders ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleProfileUpdate('reminders', !profile.reminders)}
              >
                {profile.reminders ? 'On' : 'Off'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your Stats
            </CardTitle>
            <CardDescription>Track your fitness journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Workouts</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">8.5h</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage */}
        {!isPremium && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AI Usage
              </CardTitle>
              <CardDescription>Track your AI generation usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used this month</span>
                  <span className="font-medium">{profile.aiUsage} / {profile.maxAiUsage}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(profile.aiUsage / profile.maxAiUsage) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reset Usage
                  </Button>
                </div>
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
