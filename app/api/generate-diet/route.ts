import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const apiKey = process.env.GENKIT_API_KEY

    // If real API key exists, call Genkit API
    if (apiKey) {
      const response = await fetch('https://api.genkit.com/generate-diet', {
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
    const mockDietPlans = [
      {
        planName: "Balanced Weight Loss Plan",
        description: "A well-balanced diet plan designed for sustainable weight loss with proper nutrition",
        dailyCalories: 1800,
        mealsPerDay: 4,
        days: [
          {
            day: "Day 1",
            meals: [
              {
                name: "Breakfast - Protein Oatmeal",
                calories: 350,
                time: "8:00 AM",
                ingredients: ["Oats", "Greek yogurt", "Berries", "Honey", "Chia seeds"],
                instructions: ["Cook oats with water", "Mix in Greek yogurt", "Top with berries and honey", "Sprinkle chia seeds"]
              },
              {
                name: "Snack - Apple with Almond Butter",
                calories: 200,
                time: "10:30 AM",
                ingredients: ["Apple", "Almond butter", "Cinnamon"],
                instructions: ["Slice apple", "Spread almond butter", "Sprinkle with cinnamon"]
              },
              {
                name: "Lunch - Grilled Chicken Salad",
                calories: 450,
                time: "1:00 PM",
                ingredients: ["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil", "Lemon"],
                instructions: ["Grill chicken breast", "Chop vegetables", "Mix with olive oil and lemon", "Top with chicken"]
              },
              {
                name: "Dinner - Baked Salmon with Quinoa",
                calories: 500,
                time: "7:00 PM",
                ingredients: ["Salmon fillet", "Quinoa", "Broccoli", "Garlic", "Olive oil"],
                instructions: ["Bake salmon with garlic and olive oil", "Cook quinoa", "Steam broccoli", "Serve together"]
              }
            ]
          },
          {
            day: "Day 2",
            meals: [
              {
                name: "Breakfast - Green Smoothie Bowl",
                calories: 320,
                time: "8:00 AM",
                ingredients: ["Spinach", "Banana", "Mango", "Coconut milk", "Granola", "Coconut flakes"],
                instructions: ["Blend spinach, banana, mango, and coconut milk", "Pour into bowl", "Top with granola and coconut flakes"]
              },
              {
                name: "Snack - Greek Yogurt with Nuts",
                calories: 180,
                time: "10:30 AM",
                ingredients: ["Greek yogurt", "Walnuts", "Honey"],
                instructions: ["Mix Greek yogurt with honey", "Top with chopped walnuts"]
              },
              {
                name: "Lunch - Turkey Wrap",
                calories: 420,
                time: "1:00 PM",
                ingredients: ["Whole wheat tortilla", "Turkey slices", "Avocado", "Lettuce", "Tomato", "Hummus"],
                instructions: ["Spread hummus on tortilla", "Add turkey, avocado, lettuce, and tomato", "Roll tightly"]
              },
              {
                name: "Dinner - Stir-fried Tofu with Vegetables",
                calories: 480,
                time: "7:00 PM",
                ingredients: ["Tofu", "Bell peppers", "Broccoli", "Soy sauce", "Ginger", "Brown rice"],
                instructions: ["Stir-fry tofu and vegetables", "Add soy sauce and ginger", "Serve over brown rice"]
              }
            ]
          },
          {
            day: "Day 3",
            meals: [
              {
                name: "Breakfast - Avocado Toast with Egg",
                calories: 380,
                time: "8:00 AM",
                ingredients: ["Whole grain bread", "Avocado", "Egg", "Lemon", "Salt", "Pepper"],
                instructions: ["Toast bread", "Mash avocado with lemon, salt, and pepper", "Fry egg", "Top toast with avocado and egg"]
              },
              {
                name: "Snack - Mixed Berries",
                calories: 120,
                time: "10:30 AM",
                ingredients: ["Strawberries", "Blueberries", "Raspberries"],
                instructions: ["Wash and mix berries", "Serve fresh"]
              },
              {
                name: "Lunch - Quinoa Power Bowl",
                calories: 520,
                time: "1:00 PM",
                ingredients: ["Quinoa", "Black beans", "Sweet potato", "Avocado", "Lime", "Cilantro"],
                instructions: ["Cook quinoa", "Roast sweet potato", "Mix with black beans", "Top with avocado and cilantro", "Drizzle with lime"]
              },
              {
                name: "Dinner - Grilled Chicken with Roasted Vegetables",
                calories: 460,
                time: "7:00 PM",
                ingredients: ["Chicken breast", "Zucchini", "Bell peppers", "Onion", "Olive oil", "Herbs"],
                instructions: ["Grill chicken breast", "Roast vegetables with olive oil and herbs", "Serve together"]
              }
            ]
          }
        ],
        createdAt: new Date().toISOString(),
        dietType: "Balanced",
        goals: ["Weight Loss", "Healthy Eating"],
        restrictions: []
      },
      {
        planName: "Muscle Building Plan",
        description: "High-protein diet plan designed to support muscle growth and recovery",
        dailyCalories: 2500,
        mealsPerDay: 5,
        days: [
          {
            day: "Day 1",
            meals: [
              {
                name: "Breakfast - Protein Pancakes",
                calories: 450,
                time: "8:00 AM",
                ingredients: ["Protein powder", "Oats", "Eggs", "Banana", "Blueberries"],
                instructions: ["Blend all ingredients", "Cook like regular pancakes", "Top with blueberries"]
              },
              {
                name: "Snack - Protein Shake",
                calories: 300,
                time: "10:30 AM",
                ingredients: ["Protein powder", "Milk", "Banana", "Peanut butter"],
                instructions: ["Blend all ingredients", "Serve immediately"]
              },
              {
                name: "Lunch - Grilled Chicken with Rice",
                calories: 600,
                time: "1:00 PM",
                ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Olive oil"],
                instructions: ["Grill chicken breast", "Cook brown rice", "Steam broccoli", "Serve together"]
              },
              {
                name: "Snack - Greek Yogurt with Nuts",
                calories: 250,
                time: "4:00 PM",
                ingredients: ["Greek yogurt", "Almonds", "Walnuts", "Honey"],
                instructions: ["Mix Greek yogurt with honey", "Top with chopped nuts"]
              },
              {
                name: "Dinner - Salmon with Sweet Potato",
                calories: 550,
                time: "7:00 PM",
                ingredients: ["Salmon fillet", "Sweet potato", "Asparagus", "Lemon", "Herbs"],
                instructions: ["Bake salmon with lemon and herbs", "Roast sweet potato", "Steam asparagus", "Serve together"]
              }
            ]
          }
        ],
        createdAt: new Date().toISOString(),
        dietType: "High Protein",
        goals: ["Muscle Gain", "Strength"],
        restrictions: []
      }
    ]

    // Select a random plan based on goals
    const selectedPlan = mockDietPlans[Math.floor(Math.random() * mockDietPlans.length)]
    
    return NextResponse.json(selectedPlan)
  } catch (error) {
    console.error('Error generating diet plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate diet plan' },
      { status: 500 }
    )
  }
}
