import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const apiKey = process.env.GENKIT_API_KEY

    // If real API key exists, call Genkit API
    if (apiKey) {
      const response = await fetch('https://api.genkit.com/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        throw new Error('API call failed')
      }
      
      const data = await response.json()
      return NextResponse.json(data)
    }

    // Mock AI data for testing
    const mockWorkoutPlans = [
      {
        planName: "7-Day Full Body Strength Plan",
        description: "A comprehensive strength training program designed to build muscle and improve overall fitness",
        days: [
          {
            day: "Day 1 - Upper Body Focus",
            exercises: [
              { name: "Push-Ups", sets: 4, reps: 15, rest: "60s", equipment: "Bodyweight" },
              { name: "Pull-Ups", sets: 3, reps: 10, rest: "60s", equipment: "Pull-up bar" },
              { name: "Dips", sets: 3, reps: 12, rest: "45s", equipment: "Parallel bars" },
              { name: "Plank", sets: 3, reps: "45s", rest: "30s", equipment: "Bodyweight" },
              { name: "Bicep Curls", sets: 3, reps: 12, rest: "45s", equipment: "Dumbbells" }
            ],
            completed: false
          },
          {
            day: "Day 2 - Lower Body Power",
            exercises: [
              { name: "Squats", sets: 4, reps: 20, rest: "60s", equipment: "Bodyweight" },
              { name: "Lunges", sets: 3, reps: 15, rest: "45s", equipment: "Bodyweight" },
              { name: "Deadlifts", sets: 3, reps: 12, rest: "90s", equipment: "Barbell" },
              { name: "Calf Raises", sets: 3, reps: 20, rest: "30s", equipment: "Bodyweight" },
              { name: "Glute Bridges", sets: 3, reps: 15, rest: "45s", equipment: "Bodyweight" }
            ],
            completed: false
          },
          {
            day: "Day 3 - Core & Cardio",
            exercises: [
              { name: "Crunches", sets: 3, reps: 20, rest: "30s", equipment: "Bodyweight" },
              { name: "Mountain Climbers", sets: 3, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Burpees", sets: 3, reps: 10, rest: "60s", equipment: "Bodyweight" },
              { name: "High Knees", sets: 3, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Russian Twists", sets: 3, reps: 20, rest: "30s", equipment: "Bodyweight" }
            ],
            completed: false
          },
          {
            day: "Day 4 - Rest Day",
            exercises: [],
            completed: false
          },
          {
            day: "Day 5 - Full Body Circuit",
            exercises: [
              { name: "Jump Squats", sets: 3, reps: 15, rest: "45s", equipment: "Bodyweight" },
              { name: "Push-Up to T", sets: 3, reps: 10, rest: "45s", equipment: "Bodyweight" },
              { name: "Single-Leg Deadlifts", sets: 3, reps: 12, rest: "60s", equipment: "Bodyweight" },
              { name: "Plank Up-Downs", sets: 3, reps: 10, rest: "45s", equipment: "Bodyweight" },
              { name: "Jumping Lunges", sets: 3, reps: 12, rest: "60s", equipment: "Bodyweight" }
            ],
            completed: false
          },
          {
            day: "Day 6 - Strength & Stability",
            exercises: [
              { name: "Pistol Squats", sets: 3, reps: 8, rest: "90s", equipment: "Bodyweight" },
              { name: "Archer Push-Ups", sets: 3, reps: 8, rest: "90s", equipment: "Bodyweight" },
              { name: "Single-Arm Rows", sets: 3, reps: 12, rest: "60s", equipment: "Dumbbells" },
              { name: "Side Planks", sets: 3, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Wall Sits", sets: 3, reps: "45s", rest: "60s", equipment: "Bodyweight" }
            ],
            completed: false
          },
          {
            day: "Day 7 - Active Recovery",
            exercises: [
              { name: "Walking", sets: 1, reps: "30 min", rest: "0s", equipment: "None" },
              { name: "Yoga Flow", sets: 1, reps: "20 min", rest: "0s", equipment: "Yoga mat" },
              { name: "Stretching", sets: 1, reps: "15 min", rest: "0s", equipment: "None" }
            ],
            completed: false
          }
        ],
        createdAt: new Date().toISOString(),
        difficulty: "Intermediate",
        duration: "7 days",
        equipment: ["Bodyweight", "Dumbbells", "Pull-up bar", "Barbell"],
        goals: ["Strength", "Muscle Gain", "Endurance"]
      },
      {
        planName: "14-Day HIIT Challenge",
        description: "High-intensity interval training program for maximum fat burn and cardiovascular improvement",
        days: [
          {
            day: "Day 1 - HIIT Cardio",
            exercises: [
              { name: "Burpees", sets: 4, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Mountain Climbers", sets: 4, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Jump Squats", sets: 4, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "High Knees", sets: 4, reps: "30s", rest: "30s", equipment: "Bodyweight" },
              { name: "Jumping Lunges", sets: 4, reps: "30s", rest: "30s", equipment: "Bodyweight" }
            ],
            completed: false
          }
          // ... more days would be here in a real implementation
        ],
        createdAt: new Date().toISOString(),
        difficulty: "Advanced",
        duration: "14 days",
        equipment: ["Bodyweight"],
        goals: ["Fat Loss", "Cardio", "Endurance"]
      }
    ]

    // Select a random plan based on goals
    const selectedPlan = mockWorkoutPlans[Math.floor(Math.random() * mockWorkoutPlans.length)]
    
    return NextResponse.json(selectedPlan)
  } catch (error) {
    console.error('Error generating workout plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate workout plan' },
      { status: 500 }
    )
  }
}
