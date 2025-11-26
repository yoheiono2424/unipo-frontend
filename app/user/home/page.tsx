'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Coins, User, FileText, Gift, MapPin, Sparkles, Star, CheckCircle } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showNotification, setShowNotification] = useState(false)

  // モックデータ：未回答のアンケートがあるかどうか
  const hasUnansweredSurveys = true

  // 通知表示
  useEffect(() => {
    const notification = searchParams.get('notification')
    if (notification === 'giftcard') {
      setShowNotification(true)
      // 3秒後に自動で消す
      const timer = setTimeout(() => {
        setShowNotification(false)
        // URLパラメータをクリア
        router.replace('/user/home')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  return (
    <UserLayout>
      <div className="bg-gray-50 min-h-screen pb-6 relative">
        {/* 会員番号表示欄 */}
        <div className="bg-white border-b border-gray-100 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">会員番号</span>
            <span className="text-sm font-bold text-gray-900 tracking-wide">USR-12345678</span>
          </div>
        </div>

        {/* 通知ポップアップ */}
        {showNotification && (
          <div className="fixed top-20 left-0 right-0 z-50 px-4 animate-slide-down">
            <div className="max-w-[428px] mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-base mb-0.5">受け取り完了！</div>
                    <div className="text-sm opacity-95">
                      ギフトカードを受け取りました<br />
                      来店ポイントを獲得しました
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ポイント残高バナー（コンパクト） */}
        <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 text-white p-4 shadow-md relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span className="text-xs font-bold">保有ポイント</span>
              </div>
              <button
                onClick={() => router.push('/user/points/history')}
                className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full hover:bg-white/30 transition-colors"
              >
                履歴
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>1,234</span>
              <span className="text-xl font-bold">P</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-xs font-bold">今月+120P獲得！</span>
            </div>
          </div>
        </div>

        {/* キャンペーンバナー（プレースホルダー） */}
        <div className="px-4 pt-4">
          <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center">
            <p className="text-gray-500 text-sm font-medium">ここに広告バナーが入ります</p>
          </div>
        </div>

        {/* メインアクション（カード型） */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {/* ポイント交換 */}
            <button
              onClick={() => router.push('/user/points')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-orange-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">ポイント交換</div>
                  <div className="text-xs text-orange-500 font-semibold">商品と交換</div>
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

      </div>
    </UserLayout>
  )
}

export default function UserHomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
