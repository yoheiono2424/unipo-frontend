'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gift, Clock, Store, ChevronRight, Plus } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserGiftCardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'active' | 'used'>('active')

  const activeGiftCards = [
    {
      id: 1,
      amount: 500,
      storeName: 'ユニー高蔵寺店',
      expiryDate: '2025/11/30',
      receivedDate: '2025/10/15',
      isExpiring: false
    },
    {
      id: 2,
      amount: 1000,
      storeName: 'ユニー稲沢店',
      expiryDate: '2025/10/25',
      receivedDate: '2025/09/25',
      isExpiring: true
    },
    {
      id: 3,
      amount: 300,
      storeName: 'ユニー高蔵寺店',
      expiryDate: '2025/12/15',
      receivedDate: '2025/10/18',
      isExpiring: false
    },
  ]

  const usedGiftCards = [
    {
      id: 4,
      amount: 500,
      storeName: 'ユニー鳴海店',
      usedDate: '2025/10/10',
      receivedDate: '2025/09/10'
    },
    {
      id: 5,
      amount: 1000,
      storeName: 'ユニー高蔵寺店',
      usedDate: '2025/09/20',
      receivedDate: '2025/08/20'
    },
  ]

  const totalActiveAmount = activeGiftCards.reduce((sum, card) => sum + card.amount, 0)

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">ギフトカード</h1>
          </div>
        </div>

        {/* 合計金額カード */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">利用可能残高</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold">¥{totalActiveAmount.toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/user/giftcards/receive')}
                className="flex-1 bg-white text-red-500 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                受け取る
              </button>
              <button
                onClick={() => router.push('/user/giftcards/history')}
                className="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                履歴を見る
              </button>
            </div>
          </div>
        </div>

        {/* タブ */}
        <div className="max-w-[428px] mx-auto px-4">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'active'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              利用可能 ({activeGiftCards.length})
            </button>
            <button
              onClick={() => setActiveTab('used')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'used'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              利用済み ({usedGiftCards.length})
            </button>
          </div>
        </div>

        {/* ギフトカード一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          {activeTab === 'active' && (
            <div className="space-y-3">
              {activeGiftCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => router.push(`/user/giftcards/${card.id}`)}
                  className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden ${
                    card.isExpiring ? 'border-2 border-yellow-400' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Gift className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-500">¥{card.amount}</div>
                          {card.isExpiring && (
                            <div className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                              期限間近
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Store className="w-4 h-4" />
                        <span>{card.storeName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>有効期限: {card.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'used' && (
            <div className="space-y-3">
              {usedGiftCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden opacity-75"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Gift className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-400">¥{card.amount}</div>
                          <div className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                            利用済み
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Store className="w-4 h-4" />
                        <span>{card.storeName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>利用日: {card.usedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
