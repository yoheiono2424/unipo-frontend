'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import {
  Search,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AdvertiserQuestionnairesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // アンケートデータ（モック）
  const questionnaires = [
    {
      id: 1,
      questionnaireId: 'QST-2025-001',
      title: '春の新生活応援キャンペーン アンケート',
      campaignName: '春の新生活応援キャンペーン',
      campaignId: 'CMP001',
      status: '実施中',
      statusColor: 'bg-green-100 text-green-800',
      createdAt: '2025/01/15',
      startDate: '2025/01/20',
      endDate: '2025/03/31',
      totalQuestions: 5,
      totalResponses: 2456,
      responseRate: '45.2%',
      targetResponses: 5000
    },
    {
      id: 2,
      questionnaireId: 'QST-2024-012',
      title: '母の日感謝キャンペーン アンケート',
      campaignName: '母の日感謝キャンペーン',
      campaignId: 'CMP002',
      status: '終了',
      statusColor: 'bg-gray-100 text-gray-800',
      createdAt: '2024/04/01',
      startDate: '2024/05/01',
      endDate: '2024/05/31',
      totalQuestions: 8,
      totalResponses: 1436,
      responseRate: '38.9%',
      targetResponses: 3000
    },
    {
      id: 3,
      questionnaireId: 'QST-2024-011',
      title: 'ゴールデンウィーク特別企画 アンケート',
      campaignName: 'ゴールデンウィーク特別企画',
      campaignId: 'CMP003',
      status: '終了',
      statusColor: 'bg-gray-100 text-gray-800',
      createdAt: '2024/03/15',
      startDate: '2024/04/25',
      endDate: '2024/05/10',
      totalQuestions: 6,
      totalResponses: 3892,
      responseRate: '52.1%',
      targetResponses: 7500
    },
    {
      id: 4,
      questionnaireId: 'QST-2024-010',
      title: '夏のボーナスキャンペーン アンケート',
      campaignName: '夏のボーナスキャンペーン',
      campaignId: 'CMP004',
      status: '準備中',
      statusColor: 'bg-blue-100 text-blue-800',
      createdAt: '2025/01/28',
      startDate: '2025/06/01',
      endDate: '2025/07/31',
      totalQuestions: 7,
      totalResponses: 0,
      responseRate: '0%',
      targetResponses: 10000
    },
    {
      id: 5,
      questionnaireId: 'QST-2024-009',
      title: '秋の味覚フェア アンケート',
      campaignName: '秋の味覚フェア',
      campaignId: 'CMP005',
      status: '終了',
      statusColor: 'bg-gray-100 text-gray-800',
      createdAt: '2024/08/20',
      startDate: '2024/09/01',
      endDate: '2024/11/30',
      totalQuestions: 9,
      totalResponses: 4521,
      responseRate: '41.3%',
      targetResponses: 11000
    }
  ]

  // 統計データ（モック）
  const statistics = {
    totalQuestionnaires: '12',
    activeQuestionnaires: '3',
    totalResponses: '18,542',
    averageResponseRate: '43.5%'
  }

  // フィルタリング
  const filteredQuestionnaires = questionnaires.filter(questionnaire => {
    const matchesSearch = questionnaire.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         questionnaire.questionnaireId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         questionnaire.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || questionnaire.status === statusFilter
    const matchesCampaign = campaignFilter === 'all' || questionnaire.campaignName === campaignFilter
    return matchesSearch && matchesStatus && matchesCampaign
  })

  // ページネーション
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredQuestionnaires.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedQuestionnaires = filteredQuestionnaires.slice(startIndex, startIndex + itemsPerPage)

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">アンケート管理</h1>
          <p className="text-gray-600 mt-1">作成したアンケートの管理と回答状況を確認できます</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-blue-600" size={20} />
              <span className="text-xs text-gray-600">全体</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalQuestionnaires}</div>
            <div className="text-sm text-gray-600">総アンケート数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">実施中</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.activeQuestionnaires}</div>
            <div className="text-sm text-gray-600">実施中のアンケート</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-purple-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+8.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.totalResponses}</div>
            <div className="text-sm text-gray-600">総回答数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-orange-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+2.1%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{statistics.averageResponseRate}</div>
            <div className="text-sm text-gray-600">平均回答率</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="アンケート名・IDで検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="all">すべてのステータス</option>
              <option value="実施中">実施中</option>
              <option value="準備中">準備中</option>
              <option value="終了">終了</option>
            </select>

            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="all">すべてのキャンペーン</option>
              <option value="春の新生活応援キャンペーン">春の新生活応援キャンペーン</option>
              <option value="母の日感謝キャンペーン">母の日感謝キャンペーン</option>
              <option value="ゴールデンウィーク特別企画">ゴールデンウィーク特別企画</option>
            </select>
          </div>
        </div>

        {/* アンケートテーブル */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アンケートID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アンケート名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    期間
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    回答数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    回答率
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedQuestionnaires.map((questionnaire) => (
                  <tr
                    key={questionnaire.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/advertiser/questionnaires/${questionnaire.id}`}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{questionnaire.questionnaireId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{questionnaire.title}</div>
                      <div className="text-xs text-gray-500">{questionnaire.totalQuestions}問</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{questionnaire.campaignName}</div>
                      <div className="text-xs text-gray-500">{questionnaire.campaignId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{questionnaire.startDate}</div>
                      <div className="text-xs text-gray-500">～ {questionnaire.endDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{questionnaire.totalResponses.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">目標: {questionnaire.targetResponses.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-2">{questionnaire.responseRate}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: questionnaire.responseRate }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${questionnaire.statusColor}`}>
                        {questionnaire.status}
                      </span>
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
                  全 {filteredQuestionnaires.length} 件中 {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredQuestionnaires.length)} 件を表示
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
