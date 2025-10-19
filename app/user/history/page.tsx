'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UserHistoryRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/user/points/history')
  }, [router])

  return null
}
