'use client'

import { useRouter } from 'next/navigation'
import { Coins, User, FileText, Gift, MapPin } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomeCreativePage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* ポイント残高カード（波型デザイン） */}
        <div className="px-5 pt-6 pb-5">
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-[40px] shadow-[0_8px_32px_rgba(251,146,60,0.3)] p-8 text-white relative overflow-hidden">
              {/* 柔らかい波型装飾 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

              {/* 控えめなコイン装飾 */}
              <div className="absolute top-5 right-5 opacity-10">
                <Coins className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-white/25 rounded-2xl backdrop-blur-sm">
                    <Coins className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold opacity-95">現在の残高</span>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span className="text-6xl font-bold tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
                    <span className="text-2xl font-semibold opacity-95">ポイント</span>
                  </div>
                  <div className="h-1 w-20 bg-white/30 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/25">
                  <div className="text-xs opacity-85">最終更新: 11/30</div>
                  <button
                    onClick={() => router.push('/user/points/history')}
                    className="text-xs font-semibold opacity-95 hover:opacity-100 transition-all flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-white/30"
                  >
                    詳細
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ボタンエリア（独創的なレイアウト） */}
        <div className="px-5 pb-8">
          <div className="space-y-4">
            {/* 上段：アンケート（ワイド） */}
            <button
              onClick={() => router.push('/user/surveys')}
              className="w-full bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)] transition-all duration-200 text-left relative overflow-hidden group"
            >
              {hasUnansweredSurveys && (
                <div className="absolute top-4 right-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 font-bold text-lg mb-1">アンケートに回答する</div>
                  {hasUnansweredSurveys && (
                    <div className="text-orange-600 text-sm font-semibold">未回答のアンケートがあります</div>
                  )}
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 中段：2カラム（ポイント交換 + 紹介） */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/user/points')}
                className="bg-white rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-gray-900 font-bold text-base">ポイント交換</div>
                <div className="text-gray-600 text-xs mt-1">商品と交換</div>
              </button>

              <button
                onClick={() => router.push('/user/referral')}
                className="bg-white rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-gray-900 font-bold text-base">友達を招待</div>
                <div className="text-gray-600 text-xs mt-1">紹介コード</div>
              </button>
            </div>

            {/* 下段：加盟店検索（ワイド・異なるスタイル） */}
            <button
              onClick={() => router.push('/user/stores')}
              className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-[32px] shadow-[0_4px_20px_rgba(59,130,246,0.15)] p-6 hover:shadow-[0_6px_28px_rgba(59,130,246,0.2)] transition-all duration-200 text-left group border border-blue-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 font-bold text-lg mb-1">近くの加盟店を探す</div>
                  <div className="text-gray-600 text-sm font-medium">お得なお店を見つけよう</div>
                </div>
                <svg className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
