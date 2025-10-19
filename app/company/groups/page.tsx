'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useRouter } from 'next/navigation'
import { Search, Plus } from 'lucide-react'
import { useState } from 'react'

// モックデータ
const mockGroups = [
  {
    id: 'GRP001',
    groupId: 'GRP001',
    name: '関東エリアグループ',
    email: 'kanto@example.com',
    storeCount: 12,
    distributed: 5200,
    stock: 2800,
    status: 'active'
  },
  {
    id: 'GRP002',
    groupId: 'GRP002',
    name: '関西エリアグループ',
    email: 'kansai@example.com',
    storeCount: 8,
    distributed: 3850,
    stock: 2150,
    status: 'active'
  },
  {
    id: 'GRP003',
    groupId: 'GRP003',
    name: '中部エリアグループ',
    email: 'chubu@example.com',
    storeCount: 5,
    distributed: 2100,
    stock: 1400,
    status: 'active'
  },
  {
    id: 'GRP004',
    groupId: 'GRP004',
    name: '九州エリアグループ',
    email: 'kyushu@example.com',
    storeCount: 2,
    distributed: 950,
    stock: 850,
    status: 'active'
  },
  {
    id: 'GRP005',
    groupId: 'GRP005',
    name: '東北エリアグループ',
    email: 'tohoku@example.com',
    storeCount: 1,
    distributed: 350,
    stock: 350,
    status: 'inactive'
  }
]

export default function CompanyGroupsPage() {
  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  const [searchStatus, setSearchStatus] = useState('')

  // フィルタリング
  const filteredGroups = mockGroups.filter(group => {
    const nameMatch = searchName === '' || group.name.toLowerCase().includes(searchName.toLowerCase())
    const statusMatch = searchStatus === '' || searchStatus === 'all' || group.status === searchStatus
    return nameMatch && statusMatch
  })

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">稼働中</span>
    }
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">停止中</span>
  }

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">グループ管理</h2>
            <p className="text-sm text-gray-600 mt-1">企業内のグループ一覧を管理します</p>
          </div>
          <button
            onClick={() => router.push('/company/groups/new')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            新規グループ作成
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">総グループ数</p>
            <p className="text-2xl font-bold text-gray-900">{mockGroups.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">稼働中</p>
            <p className="text-2xl font-bold text-green-600">
              {mockGroups.filter(g => g.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">停止中</p>
            <p className="text-2xl font-bold text-gray-600">
              {mockGroups.filter(g => g.status === 'inactive').length}
            </p>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                グループ名
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="グループ名で検索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ステータス
              </label>
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">すべて</option>
                <option value="active">稼働中</option>
                <option value="inactive">停止中</option>
              </select>
            </div>
          </div>
        </div>

        {/* グループ一覧テーブル */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              グループ一覧（{filteredGroups.length}件）
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    グループID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    グループ名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メールアドレス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布枚数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    在庫数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGroups.map((group) => (
                  <tr
                    key={group.id}
                    onClick={() => router.push(`/company/groups/${group.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{group.groupId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{group.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{group.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{group.storeCount}店舗</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{group.distributed.toLocaleString()}枚</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{group.stock.toLocaleString()}枚</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(group.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
