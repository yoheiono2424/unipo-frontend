'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gift, Store, Calendar, X } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserQrGiftcardsPage() {
  const router = useRouter()
  const [selectedGiftcard, setSelectedGiftcard] = useState<typeof giftcards[0] | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // モックデータ：店舗で配布中のギフトカード（在庫ありのみ）
  const storeName = 'ユニー高蔵寺店'
  const giftcards = [
    {
      id: '1',
      name: '春の新生活応援キャンペーン',
      amount: 500,
      expiryDate: '2025/12/31',
      advertiser: 'ユニー株式会社',
      stock: 45,
      image: null
    },
    {
      id: '2',
      name: '母の日感謝キャンペーン',
      amount: 1000,
      expiryDate: '2025/11/30',
      advertiser: 'ユニー株式会社',
      stock: 78,
      image: null
    },
    {
      id: '3',
      name: '夏のボーナスキャンペーン',
      amount: 500,
      expiryDate: '2026/01/31',
      advertiser: 'ユニー株式会社',
      stock: 120,
      image: null
    }
  ]

  const handleSelectGiftcard = (giftcard: typeof giftcards[0]) => {
    setSelectedGiftcard(giftcard)
    setShowConfirmModal(true)
  }

  const handleConfirm = () => {
    setShowConfirmModal(false)
    // 店舗提示用完了画面に遷移
    router.push(`/user/qr/complete?giftcardId=${selectedGiftcard?.id}`)
  }

  const handleCancel = () => {
    setShowConfirmModal(false)
    setSelectedGiftcard(null)
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              ← 戻る
            </button>
            <h1 className="text-xl font-bold text-gray-900">ギフトカード選択</h1>
          </div>
        </div>

        {/* 店舗情報 */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-orange-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Store className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">QRコード読み取り完了</div>
                <div className="text-lg font-bold text-gray-900">{storeName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ギフトカード一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">受け取れるギフトカード</h2>
          <div className="grid grid-cols-2 gap-4">
            {giftcards.map((giftcard) => (
              <button
                key={giftcard.id}
                onClick={() => handleSelectGiftcard(giftcard)}
                className="block bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-400 transition-all active:scale-[0.98] shadow-sm"
              >
                {/* 画像 */}
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden relative">
                  <img
                    src={giftcard.image || `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&seed=${giftcard.id}`}
                    alt={giftcard.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    在庫 {giftcard.stock}枚
                  </div>
                </div>

                {/* 情報 */}
                <div className="p-4 space-y-2 text-left">
                  <div className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
                    {giftcard.name}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                      <span className="text-gray-500">額面</span>
                      <span className="text-orange-600 font-bold text-lg">¥{giftcard.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{giftcard.expiryDate}まで</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 確認ポップアップ */}
        {showConfirmModal && selectedGiftcard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
              {/* ヘッダー */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 relative">
                <button
                  onClick={handleCancel}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white">ギフトカードを受け取りますか？</h3>
              </div>

              {/* コンテンツ */}
              <div className="p-6 space-y-4">
                {/* ギフトカード情報 */}
                <div className="bg-orange-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="text-4xl font-black text-orange-600">
                      ¥{selectedGiftcard.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">{selectedGiftcard.name}</div>
                  </div>
                </div>

                {/* 注意事項 */}
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    受け取り後、店員に完了画面を提示してください。
                    このギフトカードは1回のみ受け取り可能です。
                  </p>
                </div>

                {/* ボタン */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Gift className="w-5 h-5" />
                    受け取る
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
