'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gift, Key, Sparkles } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserGiftCardReceivePage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isReceiving, setIsReceiving] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsReceiving(true)

    // モック処理
    setTimeout(() => {
      console.log('ギフトカードコード:', code)
      alert('ギフトカードを受け取りました！\n500円分のギフトカードが追加されました。')
      setIsReceiving(false)
      router.push('/user/giftcards')
    }, 1500)
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-900">ギフトカード受け取り</h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ギフトカードを受け取る</h2>
          <p className="text-gray-600">受け取りコードを入力してください</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* コード入力 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              受け取りコード <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX-XXXX"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-center text-lg font-mono tracking-wider"
                required
                maxLength={14}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ※ ハイフン(-)は自動で入力されます
            </p>
          </div>

          {/* 受け取りボタン */}
          <button
            type="submit"
            disabled={isReceiving || code.length < 12}
            className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
              isReceiving || code.length < 12
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {isReceiving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                受け取り中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                受け取る
              </>
            )}
          </button>

          {/* キャンセルボタン */}
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isReceiving}
            className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-300"
          >
            キャンセル
          </button>
        </form>

        {/* 説明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">?</span>
            受け取りコードについて
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>店舗やキャンペーンから配布されたコードを入力してください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>コードは大文字・小文字を区別しません</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>有効期限が設定されている場合があります</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </UserLayout>
  )
}
