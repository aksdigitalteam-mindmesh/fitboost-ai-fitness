"use client"

import { useState, useEffect } from 'react'

interface WaterLog {
  date: string
  glasses: number
  goal: number
}

export function useWaterTracker() {
  const [waterLog, setWaterLog] = useState<WaterLog>({
    date: new Date().toDateString(),
    glasses: 0,
    goal: 8
  })

  useEffect(() => {
    const saved = localStorage.getItem('fitboost_water_log')
    if (saved) {
      const parsed = JSON.parse(saved)
      const today = new Date().toDateString()
      if (parsed.date === today) {
        setWaterLog(parsed)
      }
    }
  }, [])

  const addGlass = () => {
    const newLog = {
      ...waterLog,
      glasses: Math.min(waterLog.glasses + 1, 20)
    }
    setWaterLog(newLog)
    localStorage.setItem('fitboost_water_log', JSON.stringify(newLog))
  }

  const removeGlass = () => {
    const newLog = {
      ...waterLog,
      glasses: Math.max(waterLog.glasses - 1, 0)
    }
    setWaterLog(newLog)
    localStorage.setItem('fitboost_water_log', JSON.stringify(newLog))
  }

  const setGoal = (goal: number) => {
    const newLog = { ...waterLog, goal }
    setWaterLog(newLog)
    localStorage.setItem('fitboost_water_log', JSON.stringify(newLog))
  }

  return {
    waterLog,
    addGlass,
    removeGlass,
    setGoal,
    progress: waterLog.glasses / waterLog.goal
  }
}
