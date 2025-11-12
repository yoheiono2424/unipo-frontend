'use client'

import { useRouter } from 'next/navigation'
import { Coins, User, FileText } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomePage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* 広告バナー */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white text-2xl font-bold mb-1">広告バナー</div>
                <div className="text-white/80 text-sm">スポンサー広告がここに表示されます</div>
              </div>
            </div>
            {/* 広告ラベル */}
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] text-gray-600 font-medium">
              AD
            </div>
          </div>
        </div>

        {/* ポイント残高カード */}
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
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

        {/* ボタン */}
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
            onClick={() => router.push('/user/surveys')}
            className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold text-base">アンケート</span>
                  {hasUnansweredSurveys && (
                    <span className="text-xs text-orange-600 font-medium mt-0.5">未回答アンケートあり</span>
                  )}
                </div>
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
