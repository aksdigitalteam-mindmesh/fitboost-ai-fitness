"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket, Trophy, Zap, Clock, Rocket, UtensilsCrossed, BarChart3, Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Constants
const INITIAL_TIME = 23 * 3600 + 59 * 60 + 59; // 23:59:59
const PREMIUM_COST = 750;
const USER_COINS = 275;

const PREMIUM_FEATURES = [
  {
    icon: Rocket,
    title: "AI Workout Generator",
    description: "Get hyper-personalized workout plans.",
  },
  {
    icon: UtensilsCrossed,
    title: "AI Diet Planner",
    description: "Custom meal plans to meet your goals.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Unlock deeper insights into your progress.",
  },
  {
    icon: Ban,
    title: "Ad-Free Experience",
    description: "Enjoy the app without interruptions.",
  },
] as const;
const EARNING_METHODS = [
  {
    id: "watch-ad",
    title: "Watch an ad",
    description: "Earn 10 coins per ad view.",
    action: "Watch Ad",
    icon: Ticket,
    reward: 10,
  },
  {
    id: "burn-calories",
    title: "Burn calories",
    description: "Earn 25 coins for every 250 calories burnt.",
    status: "Keep working out!",
    icon: Trophy,
    reward: 25,
  },
] as const;

interface SubscriptionPageProps {
  searchParams?: { success?: string };
}

export default function SubscriptionPage({ searchParams }: SubscriptionPageProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [userCoins, setUserCoins] = useState(USER_COINS);

  // Timer effect - runs once on mount
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format time display
  const formatTime = useCallback((seconds: number): string => {
    if (seconds <= 0) return "Offer expired!";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Handle upgrade action
  const handleUpgrade = useCallback(() => {
    if (userCoins >= PREMIUM_COST) {
      // Deduct coins and upgrade
      setUserCoins((prev) => prev - PREMIUM_COST);
      router.push("/dashboard/programs?upgraded=true");
    } else {
      // Show insufficient coins message
      alert(`You need ${PREMIUM_COST - userCoins} more coins to upgrade!`);
    }
  }, [userCoins, router]);

  // Handle ad watch
  const handleWatchAd = useCallback(() => {
    // Simulate watching ad
    setUserCoins((prev) => prev + 10);
    // In real implementation, this would trigger actual ad and server-side reward
  }, []);

  // Calculate coins needed
  const coinsNeeded = useMemo(() => Math.max(0, PREMIUM_COST - userCoins), [userCoins]);

  const canAffordPremium = userCoins >= PREMIUM_COST;

  return (
    <div className="space-y-8 p-4 md:p-8 pb-24">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Go Premium</h1>
        <p className="text-muted-foreground">Unlock your full potential with FitBoost Premium.</p>
      </div>

      {/* Limited Time Offer Alert */}
      <Alert className="border-accent/50 bg-accent/10 text-accent-foreground">
        <Zap className="h-5 w-5 text-accent" />
        <AlertTitle className="font-bold">Limited-Time Offer!</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>
              ⚡ Beta users get <strong>15% off</strong> the first month of Premium. Don't miss out!
            </p>
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold bg-accent/20 px-3 py-1 rounded-md">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Premium Membership Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Premium Membership</CardTitle>
            <CardDescription>Get full access to all FitBoost features for one month.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between space-y-4">
            <ul className="space-y-4 text-sm">
              {PREMIUM_FEATURES.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <li key={feature.title} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{feature.title}</p>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-2">
              {!canAffordPremium && (
                <p className="text-sm text-destructive text-center">You need {coinsNeeded} more coins to upgrade</p>
              )}
              <Button
                className="w-full bg-gradient-to-r from-accent to-orange-400 text-accent-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                onClick={handleUpgrade}
                disabled={!canAffordPremium}
              >
                {canAffordPremium ? "Upgrade Now" : "Not Enough Coins"}
                <span className="ml-2 font-light text-primary-foreground/80">({PREMIUM_COST} Fit-Coins / week)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Earn Fit-Coins Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Earn Fit-Coins</CardTitle>
            <CardDescription>Complete tasks to earn coins and get your membership for free!</CardDescription>
            <div className="pt-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Trophy className="h-6 w-6 text-primary" />
                <span>Your Fit-Coins: {userCoins}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Watch Ad Option */}
            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/5 transition-colors">
              <div className="flex-1">
                <p className="font-semibold">{EARNING_METHODS[0].title}</p>
                <p className="text-sm text-muted-foreground">{EARNING_METHODS[0].description}</p>
              </div>
              <Button variant="outline" onClick={handleWatchAd} className="ml-4">
                <Ticket className="mr-2 h-4 w-4" />
                {EARNING_METHODS[0].action}
              </Button>
            </div>

            {/* Burn Calories Option */}
            <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
              <div className="flex-1">
                <p className="font-semibold">{EARNING_METHODS[1].title}</p>
                <p className="text-sm text-muted-foreground">{EARNING_METHODS[1].description}</p>
              </div>
              <div className="flex items-center gap-2 text-primary ml-4">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold whitespace-nowrap">{EARNING_METHODS[1].status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      {searchParams?.success && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <Trophy className="h-5 w-5 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>You've successfully upgraded to Premium! Enjoy all features.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}