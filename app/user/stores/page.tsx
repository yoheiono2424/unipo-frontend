'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Clock, ChevronRight, Filter } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserStoresPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const areas = [
    { id: 'all', label: 'すべて' },
    { id: 'aichi', label: '愛知県' },
    { id: 'gifu', label: '岐阜県' },
    { id: 'mie', label: '三重県' },
  ]

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'food', label: '食品' },
    { id: 'fashion', label: 'ファッション' },
    { id: 'electronics', label: '家電' },
  ]

  const stores = [
    {
      id: 1,
      name: 'ユニー高蔵寺店',
      area: '愛知県春日井市',
      category: 'food',
      distance: '1.2km',
      hours: '9:00-21:00',
      campaigns: 2,
      image: '🏪'
    },
    {
      id: 2,
      name: 'ユニー稲沢店',
      area: '愛知県稲沢市',
      category: 'food',
      distance: '3.5km',
      hours: '9:00-21:00',
      campaigns: 1,
      image: '🏪'
    },
    {
      id: 3,
      name: 'ユニー鳴海店',
      area: '愛知県名古屋市',
      category: 'food',
      distance: '5.8km',
      hours: '9:00-22:00',
      campaigns: 3,
      image: '🏪'
    },
  ]

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArea = selectedArea === 'all' || store.area.includes(areas.find(a => a.id === selectedArea)?.label || '')
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory
    return matchesSearch && matchesArea && matchesCategory
  })

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* 検索バー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="店舗名で検索"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* フィルター */}
        <div className="max-w-[428px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">絞り込み</span>
          </div>

          {/* エリアフィルター */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">エリア</label>
            <div className="flex gap-2 flex-wrap">
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedArea === area.id
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
        </div>

        {/* 店舗一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">
              {filteredStores.length}件の店舗が見つかりました
            </h2>
          </div>

          <div className="space-y-3">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => router.push(`/user/stores/${store.id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                      {store.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1">{store.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{store.area}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{store.hours}</span>
                      </div>
                      {store.campaigns > 0 && (
                        <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {store.campaigns}件のキャンペーン実施中
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
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
