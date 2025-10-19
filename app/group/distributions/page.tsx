'use client'

import GroupLayout from '@/components/group/GroupLayout'
import { useState } from 'react'
import { Search } from 'lucide-react'

// モックデータ
const mockDistributions = {
  group: {
    totalDistributed: 3750,
    thisMonth: 420,
    totalStores: 3
  },
  stores: [
    { id: 'STORE-001', name: 'カフェ＆ダイニング 渋谷店', distributed: 1450, thisMonth: 165 },
    { id: 'STORE-002', name: 'レストラン 新宿店', distributed: 1320, thisMonth: 145 },
    { id: 'STORE-003', name: 'ダイニングバー 池袋店', distributed: 980, thisMonth: 110 }
  ]
}

export default function GroupDistributionsPage() {
  const [activeTab, setActiveTab] = useState<'group' | 'stores'>('group')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = mockDistributions.stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <GroupLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">配布実績管理</h2>
          <p className="text-sm text-gray-600 mt-1">グループ内の配布実績を確認します</p>
        </div>

        {/* タブ */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('group')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'group'
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                グループ全体
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'stores'
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                店舗別
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* グループ全体タブ */}
            {activeTab === 'group' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">総配布枚数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockDistributions.group.totalDistributed.toLocaleString()}枚
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">今月の配布枚数</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {mockDistributions.group.thisMonth.toLocaleString()}枚
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">管理店舗数</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {mockDistributions.group.totalStores}店舗
                    </p>
                  </div>
                </div>
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          店舗名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          総配布枚数
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          今月の配布
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStores.map((store) => (
                        <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {store.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {store.distributed.toLocaleString()}枚
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                            {store.thisMonth.toLocaleString()}枚
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStores.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">検索結果が見つかりませんでした</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GroupLayout>
  )
}
