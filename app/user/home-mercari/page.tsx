'use client'

import { useRouter } from 'next/navigation'
import { Coins, User, FileText, Gift, MapPin, ChevronRight } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomeMercariPage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* ポイント表示バナー */}
        <div className="bg-orange-500 text-white p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              <span className="text-sm font-semibold">ポイント残高</span>
            </div>
            <button
              onClick={() => router.push('/user/points/history')}
              className="text-sm font-semibold underline"
            >
              履歴
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
            <span className="text-xl font-semibold">P</span>
          </div>
        </div>

        {/* メインアクション */}
        <div className="p-4 space-y-3">
          {/* ポイント交換 */}
          <button
            onClick={() => router.push('/user/points')}
            className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900">ポイント交換</div>
                <div className="text-xs text-gray-600">商品と交換する</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* アンケート */}
          <button
            onClick={() => router.push('/user/surveys')}
            className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between border border-gray-200 relative"
          >
            {hasUnansweredSurveys && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                NEW
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900">アンケートに回答</div>
                <div className="text-xs text-gray-600">ポイントを獲得</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 加盟店検索 */}
          <button
            onClick={() => router.push('/user/stores')}
            className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900">加盟店を探す</div>
                <div className="text-xs text-gray-600">近くのお店を検索</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 友達紹介 */}
          <button
            onClick={() => router.push('/user/referral')}
            className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900">友達を招待</div>
                <div className="text-xs text-gray-600">紹介コードを共有</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* キャンペーンバナー */}
        <div className="px-4 pb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-base mb-1">🎁 特別キャンペーン実施中</div>
                <div className="text-sm opacity-90">今だけポイント2倍！詳しくはこちら</div>
              </div>
              <ChevronRight className="w-6 h-6 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* クイックアクション（メルカリ風） */}
        <div className="px-4 pb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">便利な機能</h3>
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/user/history')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-medium">履歴</span>
              </button>

              <button
                onClick={() => router.push('/user/notifications')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-medium">お知らせ</span>
              </button>

              <button
                onClick={() => router.push('/user/mypage')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-700 font-medium">設定</span>
              </button>

              <button
                onClick={() => router.push('/user/help')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-medium">ヘルプ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
