'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function StoreGiftcardsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'monthly' | 'daily'>('monthly')
  const [selectedDate, setSelectedDate] = useState('')

  // モックデータ
  const campaigns = [
    {
      id: '1',
      name: '春の新生活応援キャンペーン',
      stock: 45,
      distributed: 155,
      faceValue: 500,
      image: null
    },
    {
      id: '2',
      name: '母の日感謝キャンペーン',
      stock: 78,
      distributed: 122,
      faceValue: 1000,
      image: null
    },
    {
      id: '3',
      name: '夏のボーナスキャンペーン',
      stock: 120,
      distributed: 80,
      faceValue: 500,
      image: null
    },
    {
      id: '4',
      name: '新商品発売記念',
      stock: 30,
      distributed: 170,
      faceValue: 300,
      image: null
    }
  ]

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <StoreLayout>
      <StoreHeader title="ギフトカード管理" showBackButton={false} />

      <div className="p-4 space-y-5 pb-20">
        {/* 検索 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="キャンペーン名を入力"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* ビューモード切替 */}
        <div className="flex items-center gap-3">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'monthly' | 'daily')}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white shadow-sm"
          >
            <option value="monthly">日別/月別</option>
            <option value="daily">日別</option>
          </select>

          {viewMode === 'daily' && (
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white shadow-sm"
            >
              <option value="">日付を選択</option>
              <option value="2025-10-07">2025/10/07</option>
              <option value="2025-10-06">2025/10/06</option>
              <option value="2025-10-05">2025/10/05</option>
            </select>
          )}

          <button className="p-3 hover:bg-gray-100 rounded-xl bg-white shadow-sm border border-gray-200 transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>

        {/* キャンペーン一覧 */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCampaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/store/giftcards/${campaign.id}`}
              className="block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all active:scale-[0.98] shadow-sm"
            >
              {/* 画像 */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={campaign.image || `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&seed=${campaign.id}`}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 情報 */}
              <div className="p-4 space-y-2">
                <div className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
                  {campaign.name}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">在庫</span>
                    <span className="text-gray-900 font-medium">{campaign.stock}枚</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">配布</span>
                    <span className="text-gray-900 font-medium">{campaign.distributed}枚</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                    <span className="text-gray-500">額面</span>
                    <span className="text-blue-600 font-semibold">¥{campaign.faceValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </StoreLayout>
  )
}
