"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Clock, Users, Star, Plus, Heart, ChefHat } from 'lucide-react'
import { useState } from 'react'

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'saved' | 'discover'>('discover')

  const mockRecipes = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      image: "🥗",
      prepTime: "15 min",
      servings: 2,
      calories: 320,
      rating: 4.8,
      saved: true,
      ingredients: ["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil"],
      instructions: ["Grill chicken breast", "Chop vegetables", "Mix with dressing", "Serve fresh"]
    },
    {
      id: 2,
      name: "Quinoa Power Bowl",
      image: "🍲",
      prepTime: "25 min",
      servings: 1,
      calories: 450,
      rating: 4.6,
      saved: false,
      ingredients: ["Quinoa", "Black beans", "Avocado", "Sweet potato", "Lime"],
      instructions: ["Cook quinoa", "Roast sweet potato", "Mix ingredients", "Add lime dressing"]
    },
    {
      id: 3,
      name: "Protein Smoothie",
      image: "🥤",
      prepTime: "5 min",
      servings: 1,
      calories: 280,
      rating: 4.9,
      saved: true,
      ingredients: ["Protein powder", "Banana", "Almond milk", "Spinach", "Peanut butter"],
      instructions: ["Add all ingredients to blender", "Blend until smooth", "Serve immediately"]
    },
    {
      id: 4,
      name: "Salmon Teriyaki",
      image: "🐟",
      prepTime: "30 min",
      servings: 2,
      calories: 380,
      rating: 4.7,
      saved: false,
      ingredients: ["Salmon fillet", "Soy sauce", "Honey", "Ginger", "Garlic"],
      instructions: ["Marinate salmon", "Pan-sear fish", "Make teriyaki sauce", "Serve with rice"]
    }
  ]

  const savedRecipes = mockRecipes.filter(recipe => recipe.saved)
  const filteredRecipes = activeTab === 'saved' ? savedRecipes : mockRecipes

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recipes</h1>
            <p className="text-muted-foreground">Discover healthy and delicious meals</p>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'discover'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            <ChefHat className="h-4 w-4" />
            Discover
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'saved'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart className="h-4 w-4" />
            Saved ({savedRecipes.length})
          </button>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredRecipes
            .filter(recipe => 
              recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 bg-muted flex items-center justify-center text-4xl">
                    {recipe.image}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{recipe.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.prepTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {recipe.servings}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {recipe.rating}
                          </div>
                        </div>
                        <div className="text-sm text-primary font-medium mt-1">
                          {recipe.calories} calories
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Heart className={`h-4 w-4 ${recipe.saved ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recipe Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
            <CardDescription>Browse recipes by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Breakfast", icon: "🍳", count: 24 },
                { name: "Lunch", icon: "🥪", count: 18 },
                { name: "Dinner", icon: "🍽️", count: 32 },
                { name: "Snacks", icon: "🍎", count: 15 },
                { name: "Smoothies", icon: "🥤", count: 12 },
                { name: "Desserts", icon: "🍰", count: 8 }
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">{category.count} recipes</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shopping List */}
        <Card>
          <CardHeader>
            <CardTitle>Shopping List</CardTitle>
            <CardDescription>Ingredients you need to buy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "Chicken breast (2 lbs)",
                "Mixed greens",
                "Quinoa (1 bag)",
                "Greek yogurt",
                "Almond milk"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded">
                  <input type="checkbox" className="rounded" />
                  <span className="flex-1">{item}</span>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
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
