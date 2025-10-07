'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface StoreHeaderProps {
  title: string
  onBack?: () => void
  rightAction?: ReactNode
  showBackButton?: boolean
}

export default function StoreHeader({
  title,
  onBack,
  rightAction,
  showBackButton = true
}: StoreHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">
      <div className="w-10">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
        )}
      </div>

      <h1 className="text-base font-medium text-gray-900">{title}</h1>

      <div className="w-10 flex justify-end">
        {rightAction}
      </div>
    </header>
  )
}
