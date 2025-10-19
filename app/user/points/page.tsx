'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Coins, Package, Sparkles } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserPointsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'giftcard', label: 'ギフトカード' },
    { id: 'coupon', label: 'クーポン' },
    { id: 'product', label: '商品' },
  ]

  const pointItems = [
    {
      id: 1,
      name: '500円ギフトカード',
      category: 'giftcard',
      points: 500,
      image: '🎁',
      description: 'ユニー全店舗で使える500円分のギフトカード',
      inStock: true
    },
    {
      id: 2,
      name: '1000円ギフトカード',
      category: 'giftcard',
      points: 1000,
      image: '🎁',
      description: 'ユニー全店舗で使える1000円分のギフトカード',
      inStock: true
    },
    {
      id: 3,
      name: '10%OFFクーポン',
      category: 'coupon',
      points: 300,
      image: '🎫',
      description: '次回のお買い物で使える10%OFFクーポン',
      inStock: true
    },
    {
      id: 4,
      name: 'ユニーエコバッグ',
      category: 'product',
      points: 800,
      image: '👜',
      description: 'オリジナルデザインのエコバッグ',
      inStock: true
    },
    {
      id: 5,
      name: 'ユニー商品券2000円分',
      category: 'giftcard',
      points: 2000,
      image: '🎁',
      description: 'ユニー全店舗で使える2000円分の商品券',
      inStock: false
    },
  ]

  const filteredItems = pointItems.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  )

  const currentPoints = 1234 // モックデータ

  const handleExchange = (item: typeof pointItems[0]) => {
    if (currentPoints < item.points) {
      alert('ポイントが不足しています')
      return
    }
    if (!item.inStock) {
      alert('この商品は現在在庫切れです')
      return
    }
    if (confirm(`${item.name}を${item.points}ポイントで交換しますか？`)) {
      console.log('ポイント交換:', item)
      alert('ポイント交換が完了しました！')
      router.push('/user/points/history')
    }
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">ポイント交換</h1>
          </div>
        </div>

        {/* 保有ポイントカード */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">保有ポイント</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold">{currentPoints}</span>
              <span className="text-xl font-medium opacity-90">P</span>
            </div>
            <button
              onClick={() => router.push('/user/points/history')}
              className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              ポイント履歴を見る
            </button>
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="max-w-[428px] mx-auto px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 商品一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden ${
                  !item.inStock ? 'opacity-50' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        {!item.inStock && (
                          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ml-2">
                            在庫なし
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-600 font-bold text-lg">
                          <Coins className="w-5 h-5" />
                          <span>{item.points}P</span>
                        </div>
                        <button
                          onClick={() => handleExchange(item)}
                          disabled={!item.inStock || currentPoints < item.points}
                          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1 ${
                            !item.inStock || currentPoints < item.points
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          <Package className="w-4 h-4" />
                          交換
                        </button>
                      </div>
                    </div>
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
