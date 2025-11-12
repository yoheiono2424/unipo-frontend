'use client'

import { useRouter } from 'next/navigation'
import { Coins, User, FileText, Sparkles } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomePage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* ポイント残高カード */}
        <div className="px-5 pt-6 pb-5">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-[32px] shadow-[0_8px_30px_rgb(251,146,60,0.35)] p-8 text-white relative overflow-hidden">
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

            {/* コイン装飾（右上） */}
            <div className="absolute top-6 right-6 opacity-20">
              <Coins className="w-16 h-16 rotate-12" />
            </div>

            {/* キラキラ装飾（左上） */}
            <div className="absolute top-8 left-8 opacity-20">
              <Sparkles className="w-8 h-8 -rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-7">
                <div className="p-2.5 bg-white/25 rounded-2xl backdrop-blur-sm shadow-lg">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="text-base font-semibold opacity-95">現在の残高</span>
              </div>

              <div className="mb-7">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-7xl font-black tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
                  <span className="text-3xl font-bold opacity-95 pb-1">pt</span>
                </div>
                <div className="h-1.5 w-24 bg-white/40 rounded-full shadow-sm"></div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/25">
                <div className="text-sm opacity-85 font-medium">最終更新: 11月30日</div>
                <button
                  onClick={() => router.push('/user/points/history')}
                  className="text-sm font-bold opacity-95 hover:opacity-100 transition-all flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20"
                >
                  詳細を見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ボタン */}
        <div className="px-5 pb-8 space-y-4">
          <button
            onClick={() => router.push('/user/points')}
            className="w-full bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_4px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-[18px] flex items-center justify-center shadow-lg">
                  <Coins className="w-7 h-7 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-lg">ポイント交換へ</span>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/user/surveys')}
            className="w-full bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_4px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 text-left relative overflow-hidden"
          >
            {hasUnansweredSurveys && (
              <div className="absolute top-3 right-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-[18px] flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold text-lg">アンケート</span>
                  {hasUnansweredSurveys && (
                    <span className="text-sm text-orange-600 font-bold mt-0.5">未回答アンケートあり</span>
                  )}
                </div>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/user/referral')}
            className="w-full bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_4px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-[18px] flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-lg">紹介コード</span>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </UserLayout>
  )
}
