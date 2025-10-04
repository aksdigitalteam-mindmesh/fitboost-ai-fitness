import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export function calculateCalories(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // BMR calculation using Mifflin-St Jeor Equation
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
  }
}

export function calculateMacros(calories: number) {
  const protein = Math.round(calories * 0.3 / 4) // 30% protein
  const carbs = Math.round(calories * 0.4 / 4)   // 40% carbs
  const fats = Math.round(calories * 0.3 / 9)    // 30% fats
  
  return { protein, carbs, fats }
}
