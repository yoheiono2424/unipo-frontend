'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import {
  TrendingUp,
  Users,
  FileText,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Calendar,
  Target,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function AdvertiserDashboardPage() {
  const [period, setPeriod] = useState('month')

  // KPIデータ（モック）
  const kpiData = {
    activeUsers: {
      value: '15,234',
      change: '+12.5%',
      isUp: true,
      label: 'アクティブユーザー'
    },
    distributedCards: {
      value: '8,456',
      change: '+8.2%',
      isUp: true,
      label: '配布ギフトカード'
    },
    surveyResponses: {
      value: '3,892',
      change: '+15.3%',
      isUp: true,
      label: 'アンケート回答数'
    },
    totalCost: {
      value: '¥2,456,000',
      change: '-5.2%',
      isUp: false,
      label: '今月の費用'
    }
  }

  // アクティブキャンペーン（モック）
  const activeCampaigns = [
    {
      id: 1,
      name: '春の新生活応援キャンペーン',
      status: '配信中',
      progress: 65,
      budget: '¥500,000',
      period: '2025/03/01 - 2025/04/30'
    },
    {
      id: 2,
      name: 'ゴールデンウィーク特別企画',
      status: '準備中',
      progress: 0,
      budget: '¥1,000,000',
      period: '2025/04/25 - 2025/05/10'
    },
    {
      id: 3,
      name: '母の日感謝キャンペーン',
      status: '配信中',
      progress: 45,
      budget: '¥300,000',
      period: '2025/04/15 - 2025/05/12'
    }
  ]

  // 最近の配布実績（モック）
  const recentDistributions = [
    { date: '2025/01/29', store: 'イオンモール幕張新都心', count: 234, amount: '¥234,000' },
    { date: '2025/01/28', store: 'ららぽーと豊洲', count: 189, amount: '¥189,000' },
    { date: '2025/01/27', store: '渋谷パルコ', count: 156, amount: '¥156,000' },
    { date: '2025/01/26', store: '新宿ルミネ', count: 203, amount: '¥203,000' },
    { date: '2025/01/25', store: '横浜ランドマークプラザ', count: 178, amount: '¥178,000' }
  ]

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600 mt-1">キャンペーンの状況を一覧で確認できます</p>
        </div>

        {/* 期間選択 */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white">
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                period === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              週間
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 text-sm font-medium ${
                period === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              月間
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                period === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              年間
            </button>
          </div>
        </div>

        {/* KPIカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* アクティブユーザー */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpiData.activeUsers.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.activeUsers.isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{kpiData.activeUsers.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpiData.activeUsers.value}</div>
            <div className="text-sm text-gray-600 mt-1">{kpiData.activeUsers.label}</div>
          </div>

          {/* 配布ギフトカード */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpiData.distributedCards.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.distributedCards.isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{kpiData.distributedCards.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpiData.distributedCards.value}</div>
            <div className="text-sm text-gray-600 mt-1">{kpiData.distributedCards.label}</div>
          </div>

          {/* アンケート回答数 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpiData.surveyResponses.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.surveyResponses.isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{kpiData.surveyResponses.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpiData.surveyResponses.value}</div>
            <div className="text-sm text-gray-600 mt-1">{kpiData.surveyResponses.label}</div>
          </div>

          {/* 今月の費用 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpiData.totalCost.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.totalCost.isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{kpiData.totalCost.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpiData.totalCost.value}</div>
            <div className="text-sm text-gray-600 mt-1">{kpiData.totalCost.label}</div>
          </div>
        </div>

        {/* アクティブキャンペーンと最近の配布実績 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* アクティブキャンペーン */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">アクティブキャンペーン</h2>
                <Link href="/advertiser/campaigns" className="text-sm text-blue-600 hover:underline">
                  すべて見る
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === '配信中'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div className="flex items-center mb-1">
                        <Calendar size={14} className="mr-1" />
                        {campaign.period}
                      </div>
                      <div className="flex items-center">
                        <Target size={14} className="mr-1" />
                        予算: {campaign.budget}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">進捗</span>
                        <span className="font-medium">{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 最近の配布実績 */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">最近の配布実績</h2>
                <Link href="/advertiser/distributions" className="text-sm text-blue-600 hover:underline">
                  すべて見る
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">店舗</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">枚数</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentDistributions.map((dist, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{dist.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{dist.store}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{dist.count}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">{dist.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* お知らせ */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mt-0.5 mr-3" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">お知らせ</h3>
              <p className="text-sm text-blue-700 mt-1">
                2025年2月1日より、新しいアンケート機能が追加されます。より詳細な顧客分析が可能になります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}