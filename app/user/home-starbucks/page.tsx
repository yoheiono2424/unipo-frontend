'use client'

import { useRouter } from 'next/navigation'
import { User, FileText, Gift, MapPin, Award, TrendingUp } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomeStarbucksPage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* ヘッダー（シンプル） */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-600 mb-1">おはようございます</div>
              <div className="text-lg font-bold text-gray-900">ユニーポ会員様</div>
            </div>
            <button
              onClick={() => router.push('/user/mypage')}
              className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5 text-orange-700" />
            </button>
          </div>
        </div>

        {/* ポイントカード（プレミアム感） */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-orange-500 rounded-3xl shadow-[0_8px_30px_rgba(194,65,12,0.25)] p-6 text-white relative overflow-hidden">
            {/* 控えめな装飾 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 opacity-90">
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wide uppercase">Rewards</span>
              </div>

              <div className="mb-6">
                <div className="text-sm font-medium opacity-90 mb-2">現在のポイント</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
                  <span className="text-xl font-semibold">P</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 opacity-80" />
                  <span className="text-xs font-medium opacity-90">今月 +120P</span>
                </div>
                <button
                  onClick={() => router.push('/user/points/history')}
                  className="text-xs font-semibold opacity-90 hover:opacity-100 transition-opacity underline"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* メインアクション（エレガント） */}
        <div className="px-6 pb-6">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase mb-3">Quick Actions</h2>
          <div className="space-y-3">
            {/* ポイント交換 */}
            <button
              onClick={() => router.push('/user/points')}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-orange-700" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-gray-900 mb-0.5">ポイント交換</div>
                  <div className="text-xs text-gray-600">商品と交換する</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* アンケート */}
            <button
              onClick={() => router.push('/user/surveys')}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between border border-gray-100 relative"
            >
              {hasUnansweredSurveys && (
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-700" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-gray-900 mb-0.5">アンケートに回答</div>
                  <div className="text-xs text-gray-600">ポイントを獲得</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 加盟店検索 */}
            <button
              onClick={() => router.push('/user/stores')}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-700" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-gray-900 mb-0.5">加盟店を探す</div>
                  <div className="text-xs text-gray-600">近くのお店を検索</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 特典カード（シンプルで洗練） */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-0.5">友達を招待</div>
                  <div className="text-xs opacity-90">紹介コードを共有</div>
                </div>
              </div>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
