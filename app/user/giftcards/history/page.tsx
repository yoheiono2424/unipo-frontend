'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gift, Clock, Store, TrendingUp, TrendingDown } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserGiftCardHistoryPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const periods = [
    { id: 'all', label: 'すべて' },
    { id: 'month', label: '今月' },
    { id: '3months', label: '3ヶ月' },
    { id: 'year', label: '1年' },
  ]

  const history = [
    {
      id: 1,
      type: 'used',
      amount: 500,
      storeName: 'ユニー鳴海店',
      date: '2025/10/18 14:30',
      description: '店舗での支払いに使用'
    },
    {
      id: 2,
      type: 'received',
      amount: 1000,
      storeName: 'ユニー稲沢店',
      date: '2025/10/15 10:15',
      description: 'キャンペーン参加特典'
    },
    {
      id: 3,
      type: 'received',
      amount: 500,
      storeName: 'ユニー高蔵寺店',
      date: '2025/10/10 16:45',
      description: '新規会員登録特典'
    },
    {
      id: 4,
      type: 'used',
      amount: 300,
      storeName: 'ユニー高蔵寺店',
      date: '2025/10/08 12:20',
      description: '店舗での支払いに使用'
    },
    {
      id: 5,
      type: 'received',
      amount: 500,
      storeName: 'ユニー鳴海店',
      date: '2025/10/05 09:30',
      description: 'アンケート回答特典'
    },
  ]

  const totalReceived = history
    .filter(h => h.type === 'received')
    .reduce((sum, h) => sum + h.amount, 0)

  const totalUsed = history
    .filter(h => h.type === 'used')
    .reduce((sum, h) => sum + h.amount, 0)

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
          <h1 className="text-xl font-bold text-gray-900">ギフトカード履歴</h1>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="max-w-[428px] mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-4">合計金額</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">受け取り</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ¥{totalReceived.toLocaleString()}
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">利用</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ¥{totalUsed.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 期間フィルター */}
      <div className="max-w-[428px] mx-auto px-4 mb-6">
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

      {/* 履歴一覧 */}
      <div className="max-w-[428px] mx-auto px-4 pb-8">
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.type === 'received'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                    }`}>
                      <Gift className={`w-6 h-6 ${
                        item.type === 'received'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${
                        item.type === 'received'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}>
                        {item.type === 'received' ? '+' : '-'}¥{item.amount}
                      </div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        item.type === 'received'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type === 'received' ? '受け取り' : '利用'}
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
    </div>
    </UserLayout>
  )
}
