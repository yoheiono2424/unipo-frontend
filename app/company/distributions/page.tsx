'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useState } from 'react'
import { Search } from 'lucide-react'

// モックデータ
const mockDistributions = {
  company: {
    totalDistributed: 12450,
    thisMonth: 1250,
    activeCampaigns: 3
  },
  groups: [
    { id: 'GRP001', name: '関東エリアグループ', distributed: 5200, stores: 12 },
    { id: 'GRP002', name: '関西エリアグループ', distributed: 3850, stores: 8 },
    { id: 'GRP003', name: '中部エリアグループ', distributed: 2100, stores: 5 }
  ],
  stores: [
    { id: 'STORE-001', name: 'カフェ＆ダイニング 渋谷店', groupName: '関東エリアグループ', distributed: 145 },
    { id: 'STORE-002', name: 'レストラン 梅田店', groupName: '関西エリアグループ', distributed: 98 },
    { id: 'STORE-003', name: 'ダイニングバー 名古屋店', groupName: '中部エリアグループ', distributed: 76 }
  ]
}

export default function CompanyDistributionsPage() {
  const [activeTab, setActiveTab] = useState<'company' | 'groups' | 'stores'>('company')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">配布実績管理</h2>
          <p className="text-sm text-gray-600 mt-1">企業全体の配布実績を確認します</p>
        </div>

        {/* タブ */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('company')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'company'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                企業全体
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'groups'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                グループ別
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'stores'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                店舗別
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* 企業全体タブ */}
            {activeTab === 'company' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">総配布枚数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockDistributions.company.totalDistributed.toLocaleString()}枚
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">今月の配布枚数</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockDistributions.company.thisMonth.toLocaleString()}枚
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">実施中キャンペーン</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {mockDistributions.company.activeCampaigns}件
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* グループ別タブ */}
            {activeTab === 'groups' && (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="グループ名で検索"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        グループ名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        店舗数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        配布枚数
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockDistributions.groups.map((group) => (
                      <tr key={group.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {group.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{group.stores}店舗</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {group.distributed.toLocaleString()}枚
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 店舗別タブ */}
            {activeTab === 'stores' && (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="店舗名で検索"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        店舗名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        所属グループ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        配布枚数
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockDistributions.stores.map((store) => (
                      <tr key={store.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{store.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{store.groupName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {store.distributed}枚
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
