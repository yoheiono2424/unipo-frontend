'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Gift, CheckCircle, Store } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

function QrCompleteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const giftcardId = searchParams.get('giftcardId')

  const [remainingSeconds, setRemainingSeconds] = useState(600) // 10分 = 600秒
  const [isExpired, setIsExpired] = useState(false)

  // モックデータ：受け取ったギフトカード情報
  const giftcard = {
    id: giftcardId || '1',
    name: '春の新生活応援キャンペーン',
    amount: 500,
    storeName: 'ユニー高蔵寺店',
    campaignName: '春の新生活応援キャンペーン'
  }

  // カウントダウンタイマー
  useEffect(() => {
    if (remainingSeconds <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingSeconds])

  // タイマーフォーマット
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleStaffConfirm = () => {
    // ギフトカード受け取り＆ポイント獲得の通知付きでホームに戻る
    router.push('/user/home?notification=giftcard')
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* ヘッダー（完了メッセージ） */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-2">受け取り完了！</h1>
          <p className="text-sm opacity-95">この画面を店員に提示してください</p>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* タイマー */}
          <div className={`rounded-2xl shadow-lg p-6 border-2 transition-all ${
            isExpired
              ? 'bg-red-50 border-red-300'
              : 'bg-gradient-to-br from-orange-400 to-orange-500 border-orange-600'
          }`}>
            <div className="text-center space-y-3">
              <div className={`text-sm font-bold ${isExpired ? 'text-red-700' : 'text-white'}`}>
                {isExpired ? '有効期限切れ' : '有効期限'}
              </div>
              <div className={`text-6xl font-black font-mono ${isExpired ? 'text-red-600' : 'text-white'}`}>
                {isExpired ? '--:--' : formatTimer(remainingSeconds)}
              </div>
            </div>
          </div>

          {/* ギフトカード情報 */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">受け取ったギフトカード</div>
                <div className="text-lg font-bold text-gray-900">¥{giftcard.amount.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">キャンペーン:</span>
                <span className="text-gray-900 font-medium">{giftcard.campaignName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Store className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900 font-medium">{giftcard.storeName}</span>
              </div>
            </div>
          </div>

          {/* 説明 */}
          <div className="bg-blue-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">ご利用方法</h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">①</span>
                <span>この画面を店員に提示してください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">②</span>
                <span>紙のギフトカードを受け取ってください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">③</span>
                <span>「店員確認」ボタンを押してください</span>
              </li>
            </ul>
          </div>

          {/* 店員確認ボタン */}
          <button
            onClick={handleStaffConfirm}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
          >
            <CheckCircle className="w-6 h-6" />
            店員確認
          </button>
        </div>
      </div>
    </UserLayout>
  )
}

export default function UserQrCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QrCompleteContent />
    </Suspense>
  )
}
