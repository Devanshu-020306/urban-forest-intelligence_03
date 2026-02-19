'use client'

import { useState, useEffect } from 'react'
import { getTrees, getCareLogs, addTree, addCareLog, updateTree } from '@/lib/firestore'

export interface Tree {
  id: string
  treeId: string
  species: string
  plantedDate: string
  location: string
  latitude?: number
  longitude?: number
  caretaker: string
  health: 'Healthy' | 'Needs Care' | 'Critical'
  lastWatered: string
  survivalProb: number
  imageUrl?: string
  createdAt?: any
  updatedAt?: any
}

export interface CareLogEntry {
  id: string
  treeId: string
  species: string
  activity: string
  caretaker: string
  date: string
  time: string
  notes: string
  status: string
  imageUrl?: string
  createdAt?: any
}

// Mock data for instant loading
const mockTrees: Tree[] = [
  {
    id: 'demo-1',
    treeId: 'T-1001',
    species: 'Oak',
    plantedDate: '2024-01-15',
    location: 'Mumbai, Maharashtra, India',
    caretaker: 'Demo User',
    health: 'Healthy',
    lastWatered: '2024-02-18',
    survivalProb: 96,
  },
  {
    id: 'demo-2',
    treeId: 'T-1002',
    species: 'Neem',
    plantedDate: '2024-01-20',
    location: 'Delhi, Delhi, India',
    caretaker: 'Demo User',
    health: 'Healthy',
    lastWatered: '2024-02-17',
    survivalProb: 94,
  },
]

export function useTrees() {
  const [trees, setTrees] = useState<Tree[]>(mockTrees) // Start with mock data
  const [loading, setLoading] = useState(false) // Don't show loading initially
  const [error, setError] = useState<string | null>(null)

  const fetchTrees = async () => {
    // Don't set loading true on initial load
    const { trees: fetchedTrees, error: fetchError } = await getTrees()
    if (fetchError) {
      setError(fetchError)
      // Keep mock data on error
    } else {
      if (fetchedTrees.length > 0) {
        setTrees(fetchedTrees as Tree[])
      }
      // If no trees, keep mock data for demo
    }
    setLoading(false)
  }

  useEffect(() => {
    // Fetch real data in background
    fetchTrees()
  }, [])

  const addNewTree = async (treeData: Omit<Tree, 'id'>) => {
    const { id, error: addError } = await addTree(treeData)
    if (addError) {
      setError(addError)
      return { success: false, error: addError }
    }
    await fetchTrees()
    return { success: true, id }
  }

  const updateExistingTree = async (treeId: string, updates: Partial<Tree>) => {
    const { error: updateError } = await updateTree(treeId, updates)
    if (updateError) {
      setError(updateError)
      return { success: false, error: updateError }
    }
    await fetchTrees()
    return { success: true }
  }

  return { trees, loading, error, addNewTree, updateExistingTree, refetch: fetchTrees }
}

// Mock care logs for instant loading
const mockLogs: CareLogEntry[] = [
  {
    id: 'log-1',
    treeId: 'T-1001',
    species: 'Oak',
    activity: 'Watering',
    caretaker: 'Demo User',
    date: '2024-02-18',
    time: '09:00',
    notes: 'Regular watering schedule',
    status: 'Completed',
  },
]

export function useCareLogs(treeId?: string) {
  const [logs, setLogs] = useState<CareLogEntry[]>(mockLogs) // Start with mock data
  const [loading, setLoading] = useState(false) // Don't show loading initially
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async () => {
    const { logs: fetchedLogs, error: fetchError } = await getCareLogs(treeId)
    if (fetchError) {
      setError(fetchError)
    } else {
      if (fetchedLogs.length > 0) {
        setLogs(fetchedLogs as CareLogEntry[])
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    // Fetch real data in background
    fetchLogs()
  }, [treeId])

  const addNewLog = async (logData: Omit<CareLogEntry, 'id'>) => {
    const { id, error: addError } = await addCareLog(logData)
    if (addError) {
      setError(addError)
      return { success: false, error: addError }
    }
    await fetchLogs()
    return { success: true, id }
  }

  return { logs, loading, error, addNewLog, refetch: fetchLogs }
}
