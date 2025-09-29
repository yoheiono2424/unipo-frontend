'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Download,
  Calendar,
  MapPin,
  CreditCard,
  TrendingUp,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AdvertiserDistributionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // 配布実績データ（モック）
  const distributions = [
    {
      id: 1,
      date: '2025/01/29',
      time: '14:30',
      storeName: 'イオンモール幕張新都心',
      storeArea: '千葉県',
      campaignName: '春の新生活応援キャンペーン',
      cardCount: 45,
      amount: '¥45,000',
      userId: 'USR-12345'
    },
    {
      id: 2,
      date: '2025/01/29',
      time: '11:15',
      storeName: 'ららぽーと豊洲',
      storeArea: '東京都',
      campaignName: '母の日感謝キャンペーン',
      cardCount: 30,
      amount: '¥30,000',
      userId: 'USR-67890'
    },
    {
      id: 3,
      date: '2025/01/28',
      time: '16:45',
      storeName: '渋谷パルコ',
      storeArea: '東京都',
      campaignName: '春の新生活応援キャンペーン',
      cardCount: 25,
      amount: '¥25,000',
      userId: 'USR-11223'
    },
    {
      id: 4,
      date: '2025/01/28',
      time: '13:20',
      storeName: '新宿ルミネ',
      storeArea: '東京都',
      campaignName: '母の日感謝キャンペーン',
      cardCount: 38,
      amount: '¥38,000',
      userId: 'USR-44556'
    },
    {
      id: 5,
      date: '2025/01/27',
      time: '10:00',
      storeName: '横浜ランドマークプラザ',
      storeArea: '神奈川県',
      campaignName: '春の新生活応援キャンペーン',
      cardCount: 52,
      amount: '¥52,000',
      userId: 'USR-77889'
    }
  ]

  // 統計データ（モック）
  const statistics = {
    totalDistributed: '12,456',
    totalAmount: '¥12,456,000',
    averagePerDay: '415',
    responseRate: '45.2%'
  }

  // フィルタリング
  const filteredDistributions = distributions.filter(dist => {
    const matchesSearch = dist.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dist.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampaign = campaignFilter === 'all' || dist.campaignName === campaignFilter
    return matchesSearch && matchesCampaign
  })

  // ページネーション
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredDistributions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedDistributions = filteredDistributions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">配布実績管理</h1>
          <p className="text-gray-600 mt-1">ギフトカードの配布状況をリアルタイムで確認できます</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="text-blue-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalDistributed}</div>
            <div className="text-sm text-gray-600">総配布枚数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+8.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalAmount}</div>
            <div className="text-sm text-gray-600">総配布金額</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="text-purple-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.averagePerDay}</div>
            <div className="text-sm text-gray-600">日平均配布数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Filter className="text-orange-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+3.1%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.responseRate}</div>
            <div className="text-sm text-gray-600">アンケート回答率</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="店舗名・キャンペーン名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="all">すべてのキャンペーン</option>
              <option value="春の新生活応援キャンペーン">春の新生活応援キャンペーン</option>
              <option value="母の日感謝キャンペーン">母の日感謝キャンペーン</option>
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="開始日"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="終了日"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download size={20} className="mr-2" />
              CSVエクスポート
            </button>
          </div>
        </div>

        {/* 配布実績テーブル */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布日時
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布枚数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユーザーID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedDistributions.map((dist) => (
                  <tr key={dist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{dist.date}</div>
                      <div className="text-xs text-gray-500">{dist.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dist.storeName}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {dist.storeArea}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{dist.campaignName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dist.cardCount} 枚</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dist.amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{dist.userId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/advertiser/distributions/${dist.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  全 {filteredDistributions.length} 件中 {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredDistributions.length)} 件を表示
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdvertiserLayout>
  )
}