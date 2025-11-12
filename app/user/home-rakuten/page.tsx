'use client'

import { useRouter } from 'next/navigation'
import { Coins, User, FileText, Gift, MapPin, ChevronRight, Sparkles, Percent, Star } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserHomeRakutenPage() {
  const router = useRouter()

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  return (
    <UserLayout>
      <div className="bg-gray-50 min-h-screen pb-6">
        {/* ポイント残高バナー（賑やか） */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white p-5 shadow-lg relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                <span className="text-sm font-bold">保有ポイント</span>
              </div>
              <button
                onClick={() => router.push('/user/points/history')}
                className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              >
                履歴
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-black tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
              <span className="text-2xl font-bold">P</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-bold">今月+120P獲得！</span>
            </div>
          </div>
        </div>

        {/* キャンペーンバナー（目立つ） */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-12 -mt-12"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/30 p-3 rounded-xl backdrop-blur-sm">
                  <Percent className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-base mb-0.5">🎉 ポイント2倍キャンペーン</div>
                  <div className="text-xs font-semibold opacity-95">期間限定！今だけお得</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* メインアクション（カード型） */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {/* ポイント交換 */}
            <button
              onClick={() => router.push('/user/points')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-orange-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">ポイント交換</div>
                  <div className="text-xs text-orange-600 font-semibold">商品と交換</div>
                </div>
              </div>
            </button>

            {/* アンケート */}
            <button
              onClick={() => router.push('/user/surveys')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-green-200 relative overflow-hidden group"
            >
              {hasUnansweredSurveys && (
                <div className="absolute top-2 right-2 z-20">
                  <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    NEW
                  </div>
                </div>
              )}
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">アンケート</div>
                  <div className="text-xs text-green-600 font-semibold">ポイント獲得</div>
                </div>
              </div>
            </button>

            {/* 加盟店検索 */}
            <button
              onClick={() => router.push('/user/stores')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-blue-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">加盟店検索</div>
                  <div className="text-xs text-blue-600 font-semibold">お店を探す</div>
                </div>
              </div>
            </button>

            {/* 友達招待 */}
            <button
              onClick={() => router.push('/user/referral')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-purple-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">友達招待</div>
                  <div className="text-xs text-purple-600 font-semibold">紹介特典</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* お得情報セクション */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-orange-500" />
              お得情報
            </h3>
            <button className="text-xs text-orange-600 font-semibold">すべて見る</button>
          </div>
          <div className="space-y-2">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-orange-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-900 truncate">新規登録で500ポイントプレゼント</div>
                <div className="text-[10px] text-gray-600">2025年12月31日まで</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-900 truncate">毎日ログインでポイントGET</div>
                <div className="text-[10px] text-gray-600">継続ボーナスあり</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* クイックリンク */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 mb-3">便利な機能</h3>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => router.push('/user/history')}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] text-gray-700 font-medium">履歴</span>
              </button>

              <button
                onClick={() => router.push('/user/notifications')}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-[10px] text-gray-700 font-medium">お知らせ</span>
              </button>

              <button
                onClick={() => router.push('/user/mypage')}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-[10px] text-gray-700 font-medium">設定</span>
              </button>

              <button
                onClick={() => router.push('/user/help')}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] text-gray-700 font-medium">ヘルプ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
