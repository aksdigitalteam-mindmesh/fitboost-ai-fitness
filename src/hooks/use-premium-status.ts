"use client"

import { useState, useEffect } from 'react'

interface UserProfile {
  name: string
  email: string
  age: number
  height: number
  weight: number
  gender: 'male' | 'female'
  subscription: 'free' | 'premium'
  aiUsage: number
  maxAiUsage: number
  reminders: boolean
  theme: 'light' | 'dark' | 'system'
}

export function usePremiumStatus() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    height: 175,
    weight: 70,
    gender: 'male',
    subscription: 'free',
    aiUsage: 0,
    maxAiUsage: 3,
    reminders: true,
    theme: 'system'
  })

  useEffect(() => {
    const saved = localStorage.getItem('fitboost_profile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
    // Reset AI usage on next load for testing
    resetAiUsage();
  }, [])

  const updateProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    localStorage.setItem('fitboost_profile', JSON.stringify(newProfile))
  }

  const upgradeToPremium = () => {
    updateProfile({
      subscription: 'premium',
      maxAiUsage: 999
    })
  }

  const useAiGeneration = () => {
    if (profile.subscription === 'premium') return true
    
    if (profile.aiUsage < profile.maxAiUsage) {
      updateProfile({ aiUsage: profile.aiUsage + 1 })
      return true
    }
    return false
  }

  const resetAiUsage = () => {
    updateProfile({ aiUsage: 0 })
  }

  return {
    profile,
    updateProfile,
    upgradeToPremium,
    useAiGeneration,
    resetAiUsage,
    isPremium: profile.subscription === 'premium',
    canUseAi: profile.subscription === 'premium' || profile.aiUsage < profile.maxAiUsage
  }
}
