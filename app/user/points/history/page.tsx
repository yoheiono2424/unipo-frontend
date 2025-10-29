'use client'

import { useState } from 'react'
import { Coins, Clock, Package, Gift, Store } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserPointHistoryPage() {
  const [activeTab, setActiveTab] = useState<'giftcard' | 'point'>('giftcard')
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const periods = [
    { id: 'all', label: 'すべて' },
    { id: 'month', label: '今月' },
    { id: '3months', label: '3ヶ月' },
    { id: 'year', label: '1年' },
  ]

  // ギフトカード履歴データ（受け取りのみ）
  const giftcardHistory = [
    {
      id: 1,
      amount: 1000,
      storeName: 'ユニー稲沢店',
      date: '2025/10/15 10:15',
      description: 'キャンペーン参加特典'
    },
    {
      id: 2,
      amount: 500,
      storeName: 'ユニー高蔵寺店',
      date: '2025/10/10 16:45',
      description: '新規会員登録特典'
    },
    {
      id: 3,
      amount: 500,
      storeName: 'ユニー鳴海店',
      date: '2025/10/05 09:30',
      description: 'アンケート回答特典'
    },
  ]

  // ポイント履歴データ
  const pointHistory = [
    {
      id: 1,
      type: 'used',
      points: 500,
      title: 'ギフトカードに交換',
      description: '500円ギフトカード',
      date: '2025/10/18 14:30'
    },
    {
      id: 2,
      type: 'earned',
      points: 50,
      title: 'QRスキャンで獲得',
      description: 'ユニー高蔵寺店',
      date: '2025/10/17 16:45'
    },
    {
      id: 3,
      type: 'earned',
      points: 30,
      title: 'アンケート回答',
      description: '店舗サービスに関するアンケート',
      date: '2025/10/15 10:20'
    },
    {
      id: 4,
      type: 'used',
      points: 300,
      title: 'クーポンに交換',
      description: '10%OFFクーポン',
      date: '2025/10/14 12:15'
    },
    {
      id: 5,
      type: 'earned',
      points: 100,
      title: 'QRスキャンで獲得',
      description: 'ユニー稲沢店',
      date: '2025/10/12 18:30'
    },
    {
      id: 6,
      type: 'earned',
      points: 50,
      title: 'アンケート回答',
      description: '新商品に関するアンケート',
      date: '2025/10/10 09:45'
    },
    {
      id: 7,
      type: 'earned',
      points: 200,
      title: '友達紹介ボーナス',
      description: '紹介特典',
      date: '2025/10/08 14:00'
    },
  ]

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">履歴</h1>
          </div>
        </div>

        {/* タブ */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[428px] mx-auto px-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('giftcard')}
                className={`flex-1 py-3 text-center font-semibold transition-colors relative ${
                  activeTab === 'giftcard'
                    ? 'text-red-500'
                    : 'text-gray-600'
                }`}
              >
                ギフトカード履歴
                {activeTab === 'giftcard' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('point')}
                className={`flex-1 py-3 text-center font-semibold transition-colors relative ${
                  activeTab === 'point'
                    ? 'text-red-500'
                    : 'text-gray-600'
                }`}
              >
                ポイント履歴
                {activeTab === 'point' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ギフトカード履歴タブ */}
        {activeTab === 'giftcard' && (
          <>
            {/* 期間フィルター */}
            <div className="max-w-[428px] mx-auto px-4 py-6">
              <div className="flex gap-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedPeriod === period.id
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ギフトカード履歴一覧 */}
            <div className="max-w-[428px] mx-auto px-4 pb-8">
              <div className="space-y-3">
                {giftcardHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                            <Gift className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-green-600">
                              ¥{item.amount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Store className="w-4 h-4" />
                          <span>{item.storeName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ポイント履歴タブ */}
        {activeTab === 'point' && (
          <>
            {/* 期間フィルター */}
            <div className="max-w-[428px] mx-auto px-4 py-6">
              <div className="flex gap-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedPeriod === period.id
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ポイント履歴一覧 */}
            <div className="max-w-[428px] mx-auto px-4 pb-8">
              <div className="space-y-3">
                {pointHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            item.type === 'earned'
                              ? 'bg-green-100'
                              : 'bg-blue-100'
                          }`}>
                            {item.type === 'earned' ? (
                              <Coins className="w-6 h-6 text-green-600" />
                            ) : (
                              <Package className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`text-right font-bold text-xl ${
                          item.type === 'earned'
                            ? 'text-green-600'
                            : 'text-blue-600'
                        }`}>
                          {item.type === 'earned' ? '+' : '-'}{item.points}P
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  )
}
