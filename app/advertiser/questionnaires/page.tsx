'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Download,
  Filter,
  FileText,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  BarChart
} from 'lucide-react'

export default function AdvertiserQuestionnairesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // アンケート回答データ（モック）
  const responses = [
    {
      id: 1,
      responseDate: '2025/01/29',
      responseTime: '10:30',
      userId: 'USR-12345',
      userName: '田中 太郎',
      userAge: '25-34歳',
      userGender: '男性',
      campaignName: '春の新生活応援キャンペーン',
      storeName: 'イオンモール幕張新都心',
      completionRate: 100,
      responseQuality: '高'
    },
    {
      id: 2,
      responseDate: '2025/01/28',
      responseTime: '14:15',
      userId: 'USR-67890',
      userName: '佐藤 花子',
      userAge: '35-44歳',
      userGender: '女性',
      campaignName: '母の日感謝キャンペーン',
      storeName: 'ららぽーと豊洲',
      completionRate: 100,
      responseQuality: '高'
    },
    {
      id: 3,
      responseDate: '2025/01/28',
      responseTime: '09:45',
      userId: 'USR-11223',
      userName: '鈴木 一郎',
      userAge: '45-54歳',
      userGender: '男性',
      campaignName: '春の新生活応援キャンペーン',
      storeName: '渋谷パルコ',
      completionRate: 80,
      responseQuality: '中'
    },
    {
      id: 4,
      responseDate: '2025/01/27',
      responseTime: '16:20',
      userId: 'USR-44556',
      userName: '山田 美咲',
      userAge: '18-24歳',
      userGender: '女性',
      campaignName: '母の日感謝キャンペーン',
      storeName: '新宿ルミネ',
      completionRate: 100,
      responseQuality: '高'
    },
    {
      id: 5,
      responseDate: '2025/01/27',
      responseTime: '11:00',
      userId: 'USR-77889',
      userName: '高橋 健太',
      userAge: '25-34歳',
      userGender: '男性',
      campaignName: '春の新生活応援キャンペーン',
      storeName: '横浜ランドマークプラザ',
      completionRate: 90,
      responseQuality: '高'
    }
  ]

  // 統計データ（モック）
  const statistics = {
    totalResponses: '3,892',
    responseRate: '45.2%',
    averageCompletionRate: '92.5%',
    highQualityRate: '78.3%'
  }

  // フィルタリング
  const filteredResponses = responses.filter(response => {
    const matchesSearch = response.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.userId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampaign = campaignFilter === 'all' || response.campaignName === campaignFilter
    return matchesSearch && matchesCampaign
  })

  // ページネーション
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedResponses = filteredResponses.slice(startIndex, startIndex + itemsPerPage)

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">アンケート回答</h1>
          <p className="text-gray-600 mt-1">収集したアンケート回答を確認・分析できます</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-blue-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+15.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalResponses}</div>
            <div className="text-sm text-gray-600">総回答数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+3.1%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.responseRate}</div>
            <div className="text-sm text-gray-600">回答率</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Filter className="text-purple-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+2.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.averageCompletionRate}</div>
            <div className="text-sm text-gray-600">平均完了率</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <User className="text-orange-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.highQualityRate}</div>
            <div className="text-sm text-gray-600">高品質回答率</div>
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
                  placeholder="ユーザー名・IDで検索"
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

          <div className="mt-4 flex justify-end gap-4">
            <Link
              href="/advertiser/questionnaires/analysis"
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <BarChart size={20} className="mr-2" />
              分析レポート
            </Link>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download size={20} className="mr-2" />
              CSVエクスポート
            </button>
          </div>
        </div>

        {/* アンケート回答テーブル */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    回答日時
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユーザー
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    属性
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    完了率
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    品質
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{response.responseDate}</div>
                      <div className="text-xs text-gray-500">{response.responseTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{response.userName}</div>
                      <div className="text-xs text-gray-500">{response.userId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{response.userAge}</div>
                      <div className="text-xs text-gray-500">{response.userGender}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{response.campaignName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{response.storeName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-2">{response.completionRate}%</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${response.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        response.responseQuality === '高'
                          ? 'bg-green-100 text-green-800'
                          : response.responseQuality === '中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {response.responseQuality}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/advertiser/questionnaires/${response.id}`}
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
                  全 {filteredResponses.length} 件中 {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredResponses.length)} 件を表示
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