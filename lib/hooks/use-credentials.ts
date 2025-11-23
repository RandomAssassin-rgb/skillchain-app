"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useCredentials() {
  const { data, error, isLoading, mutate } = useSWR("/api/credentials", fetcher)

  return {
    credentials: data || [],
    isLoading,
    error,
    mutate,
  }
}
