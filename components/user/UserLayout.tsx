'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Search, QrCode, List, User, Bell } from 'lucide-react'
import { ReactNode } from 'react'

interface UserLayoutProps {
  children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: 'home', label: 'ホーム', icon: Home, path: '/user/home' },
    { id: 'search', label: '検索', icon: Search, path: '/user/stores' },
    { id: 'scan', label: 'スキャン', icon: QrCode, path: '/user/scan', special: true },
    { id: 'history', label: '履歴', icon: List, path: '/user/points/history' },
    { id: 'mypage', label: 'マイページ', icon: User, path: '/user/mypage' }
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[428px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-lg font-bold text-gray-900">ユニーポ</span>
          </div>
          <button
            onClick={() => router.push('/user/notifications')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {/* 通知バッジ */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 pb-20">
        <div className="max-w-[428px] mx-auto">
          {children}
        </div>
      </main>

      {/* フッターナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-[428px] mx-auto">
          <div className="flex items-end justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)

              if (item.special) {
                // スキャンボタン（中央に大きく）
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className="flex flex-col items-center justify-center -mt-6"
                  >
                    <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{item.label}</span>
                  </button>
                )
              }

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                    active ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
