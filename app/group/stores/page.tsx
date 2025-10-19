'use client'

import GroupLayout from '@/components/group/GroupLayout'
import { useRouter } from 'next/navigation'
import { Plus, Search, Store, Ticket, Package } from 'lucide-react'
import { useState } from 'react'

// モックデータ
const mockStores = [
  {
    id: 'STORE-001',
    name: 'カフェ＆ダイニング 渋谷店',
    address: '東京都渋谷区渋谷1-1-1',
    phoneNumber: '03-1234-5678',
    distributed: 1450,
    stock: 850,
    status: 'active',
    createdDate: '2025-02-01'
  },
  {
    id: 'STORE-002',
    name: 'レストラン 新宿店',
    address: '東京都新宿区新宿2-2-2',
    phoneNumber: '03-2345-6789',
    distributed: 1320,
    stock: 680,
    status: 'active',
    createdDate: '2025-02-05'
  },
  {
    id: 'STORE-003',
    name: 'ダイニングバー 池袋店',
    address: '東京都豊島区池袋3-3-3',
    phoneNumber: '03-3456-7890',
    distributed: 980,
    stock: 420,
    status: 'inactive',
    createdDate: '2025-02-10'
  }
]

export default function GroupStoresPage() {
  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  const [searchStatus, setSearchStatus] = useState('')

  const filteredStores = mockStores.filter(store => {
    const nameMatch = searchName === '' || store.name.toLowerCase().includes(searchName.toLowerCase())
    const statusMatch = searchStatus === '' || searchStatus === 'all' || store.status === searchStatus
    return nameMatch && statusMatch
  })

  const totalStores = mockStores.length
  const totalDistributed = mockStores.reduce((sum, store) => sum + store.distributed, 0)
  const totalStock = mockStores.reduce((sum, store) => sum + store.stock, 0)

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">稼働中</span>
    }
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">停止中</span>
  }

  return (
    <GroupLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">店舗管理</h2>
            <p className="text-sm text-gray-600 mt-1">グループ内の店舗を管理します</p>
          </div>
          <button
            onClick={() => router.push('/group/stores/new')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新規店舗作成
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">総店舗数</p>
                <p className="text-2xl font-bold text-gray-900">{totalStores}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">総配布枚数</p>
                <p className="text-2xl font-bold text-gray-900">{totalDistributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">総在庫数</p>
                <p className="text-2xl font-bold text-gray-900">{totalStock.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 検索・フィルター */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">店舗名で検索</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="店舗名を入力..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              >
                <option value="">すべて</option>
                <option value="active">稼働中</option>
                <option value="inactive">停止中</option>
              </select>
            </div>
          </div>
        </div>

        {/* 店舗一覧テーブル */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">店舗一覧</h3>
            <p className="text-sm text-gray-600 mt-1">{filteredStores.length}件の店舗が見つかりました</p>
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
                    住所
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
                {filteredStores.map((store) => (
                  <tr
                    key={store.id}
                    onClick={() => router.push(`/group/stores/${store.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {store.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.distributed.toLocaleString()}枚
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.stock.toLocaleString()}枚
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(store.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GroupLayout>
  )
}
