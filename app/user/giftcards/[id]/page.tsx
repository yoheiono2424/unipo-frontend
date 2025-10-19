'use client'

import { useRouter, useParams } from 'next/navigation'
import { Gift, Store, Clock, Calendar, QrCode, Info } from 'lucide-react'

export default function UserGiftCardDetailPage() {
  const router = useRouter()
  const params = useParams()
  const cardId = params.id

  // モックデータ
  const giftCard = {
    id: cardId,
    amount: 500,
    storeName: 'ユニー高蔵寺店',
    storeAddress: '愛知県春日井市中央台1-2-2',
    receivedDate: '2025/10/15 10:30',
    expiryDate: '2025/11/30',
    code: 'GC-2025-ABC123',
    description: '新規会員登録特典として受け取りました',
    terms: [
      '本ギフトカードは、記載の店舗でのみご利用いただけます',
      '有効期限を過ぎたギフトカードは使用できません',
      '他のギフトカードや割引との併用はできません',
      '払い戻しや換金はできません',
    ]
  }

  const handleUseCard = () => {
    alert('店舗のQRコードリーダーでスキャンしてください')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-900">ギフトカード詳細</h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
        {/* ギフトカード表示 */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">ギフトカード</span>
            </div>
            <div className="text-6xl font-bold mb-2">¥{giftCard.amount}</div>
            <div className="text-sm opacity-75">{giftCard.storeName}</div>
          </div>

          {/* QRコード（モック） */}
          <div className="bg-white rounded-2xl p-6 mb-4">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs opacity-75 mb-1">ギフトカードコード</p>
            <p className="font-mono text-sm">{giftCard.code}</p>
          </div>
        </div>

        {/* 利用ボタン */}
        <button
          onClick={handleUseCard}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <QrCode className="w-5 h-5" />
          店舗で使用する
        </button>

        {/* 詳細情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">詳細情報</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Store className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">利用可能店舗</div>
                <div className="text-sm text-gray-600">{giftCard.storeName}</div>
                <div className="text-xs text-gray-500">{giftCard.storeAddress}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">受け取り日</div>
                <div className="text-sm text-gray-600">{giftCard.receivedDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">有効期限</div>
                <div className="text-sm text-gray-600">{giftCard.expiryDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">説明</div>
                <div className="text-sm text-gray-600">{giftCard.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 利用規約 */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs">!</span>
            ご利用にあたって
          </h3>
          <ul className="space-y-2 text-xs text-gray-700">
            {giftCard.terms.map((term, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
