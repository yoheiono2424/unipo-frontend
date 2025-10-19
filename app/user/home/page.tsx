'use client'

import { useRouter } from 'next/navigation'
import { QrCode, Coins, Clock, User, FileText } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomePage() {
  const router = useRouter()

  const menuItems = [
    { id: 'scan', label: 'スキャン', icon: QrCode, path: '/user/scan', color: 'bg-red-100 text-red-600' },
    { id: 'points', label: 'ポイント', icon: Coins, path: '/user/points', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'history', label: '履歴', icon: Clock, path: '/user/history', color: 'bg-blue-100 text-blue-600' },
    { id: 'mypage', label: 'マイページ', icon: User, path: '/user/mypage', color: 'bg-purple-100 text-purple-600' },
    { id: 'survey', label: 'アンケート', icon: FileText, path: '/user/surveys', color: 'bg-green-100 text-green-600' },
  ]

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ポイント残高カード */}
        <div className="px-4 py-6">
          <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium opacity-90">現在の残高</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-bold tracking-tight">1,234</span>
                  <span className="text-2xl font-medium opacity-90">ポイント</span>
                </div>
                <div className="h-1 w-20 bg-white/30 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="text-xs opacity-80">最終更新: 11月30日</div>
                <button
                  onClick={() => router.push('/user/points/history')}
                  className="text-xs font-medium opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  詳細を見る
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* メニューグリッド */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex justify-between items-start gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className="flex flex-col items-center gap-1.5 hover:opacity-75 transition-opacity flex-1"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-gray-700 text-center font-medium leading-tight">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 追加ボタン */}
        <div className="px-4 pb-8 space-y-3">
          <button
            onClick={() => router.push('/user/points')}
            className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold text-base">ポイント交換へ</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/user/referral')}
            className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold text-base">紹介コード</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </UserLayout>
  )
}
