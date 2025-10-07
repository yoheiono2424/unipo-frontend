'use client'

import { ReactNode } from 'react'
import StoreFooter from './StoreFooter'

interface StoreLayoutProps {
  children: ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* メインコンテンツエリア */}
      <div className="flex-1 pb-16">
        <div className="max-w-[428px] mx-auto">
          {children}
        </div>
      </div>

      {/* フッターナビゲーション */}
      <StoreFooter />
    </div>
  )
}
