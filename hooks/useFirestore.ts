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

export function useTrees() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrees = async () => {
    setLoading(true)
    const { trees: fetchedTrees, error: fetchError } = await getTrees()
    if (fetchError) {
      setError(fetchError)
    } else {
      setTrees(fetchedTrees as Tree[])
    }
    setLoading(false)
  }

  useEffect(() => {
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

export function useCareLogs(treeId?: string) {
  const [logs, setLogs] = useState<CareLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async () => {
    setLoading(true)
    const { logs: fetchedLogs, error: fetchError } = await getCareLogs(treeId)
    if (fetchError) {
      setError(fetchError)
    } else {
      setLogs(fetchedLogs as CareLogEntry[])
    }
    setLoading(false)
  }

  useEffect(() => {
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
