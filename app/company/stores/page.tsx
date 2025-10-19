'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useRouter } from 'next/navigation'
import { Search, Plus } from 'lucide-react'
import { useState } from 'react'

// モックデータ
const mockStores = [
  {
    id: 'STORE-001',
    storeId: 'STORE-001',
    name: 'カフェ＆ダイニング 渋谷店',
    groupId: 'GRP001',
    groupName: '関東エリアグループ',
    address: '東京都渋谷区',
    distributed: 145,
    stock: 55,
    status: 'active'
  },
  {
    id: 'STORE-002',
    storeId: 'STORE-002',
    name: 'レストラン 梅田店',
    groupId: 'GRP002',
    groupName: '関西エリアグループ',
    address: '大阪府大阪市',
    distributed: 98,
    stock: 102,
    status: 'active'
  },
  {
    id: 'STORE-003',
    storeId: 'STORE-003',
    name: 'ダイニングバー 名古屋店',
    groupId: 'GRP003',
    groupName: '中部エリアグループ',
    address: '愛知県名古屋市',
    distributed: 76,
    stock: 124,
    status: 'active'
  }
]

export default function CompanyStoresPage() {
  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  const [searchGroup, setSearchGroup] = useState('')

  // フィルタリング
  const filteredStores = mockStores.filter(store => {
    const nameMatch = searchName === '' || store.name.toLowerCase().includes(searchName.toLowerCase())
    const groupMatch = searchGroup === '' || searchGroup === 'all' || store.groupId === searchGroup
    return nameMatch && groupMatch
  })

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">店舗管理</h2>
            <p className="text-sm text-gray-600 mt-1">企業内の全店舗を管理します</p>
          </div>
          <button
            onClick={() => router.push('/company/stores/new')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            新規店舗作成
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">総店舗数</p>
            <p className="text-2xl font-bold text-gray-900">{mockStores.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">総配布枚数</p>
            <p className="text-2xl font-bold text-green-600">
              {mockStores.reduce((sum, s) => sum + s.distributed, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">総在庫数</p>
            <p className="text-2xl font-bold text-orange-600">
              {mockStores.reduce((sum, s) => sum + s.stock, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                店舗名
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="店舗名で検索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所属グループ
              </label>
              <select
                value={searchGroup}
                onChange={(e) => setSearchGroup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">すべて</option>
                <option value="GRP001">関東エリアグループ</option>
                <option value="GRP002">関西エリアグループ</option>
                <option value="GRP003">中部エリアグループ</option>
              </select>
            </div>
          </div>
        </div>

        {/* 店舗一覧テーブル */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              店舗一覧（{filteredStores.length}件）
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    所属グループ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    住所
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布枚数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    在庫数
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStores.map((store) => (
                  <tr
                    key={store.id}
                    onClick={() => router.push(`/company/stores/${store.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{store.storeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{store.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{store.groupName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{store.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{store.distributed}枚</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{store.stock}枚</div>
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
