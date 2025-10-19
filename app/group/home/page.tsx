'use client'

import GroupLayout from '@/components/group/GroupLayout'
import { useRouter } from 'next/navigation'
import { Store, Package, TrendingUp } from 'lucide-react'

// モックデータ
const mockGroupData = {
  groupName: '関東エリアグループ',
  companyName: '株式会社サンプル企業',
  totalStores: 12,
  totalDistributed: 5200,
  totalStock: 2800,
  stores: [
    {
      id: 'STORE-001',
      name: 'カフェ＆ダイニング 渋谷店',
      address: '東京都渋谷区',
      distributed: 145,
      stock: 55
    },
    {
      id: 'STORE-002',
      name: 'レストラン 新宿店',
      address: '東京都新宿区',
      distributed: 132,
      stock: 68
    },
    {
      id: 'STORE-003',
      name: 'ダイニングバー 池袋店',
      address: '東京都豊島区',
      distributed: 98,
      stock: 102
    }
  ]
}

export default function GroupHomePage() {
  const router = useRouter()

  return (
    <GroupLayout>
      <div className="p-6">
        {/* ウェルカムメッセージ */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ようこそ、{mockGroupData.groupName}
          </h2>
          <p className="text-gray-600">
            {mockGroupData.companyName} - グループ統計情報とサマリーを表示しています。
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 店舗数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">管理店舗数</p>
                <p className="text-3xl font-bold text-gray-900">{mockGroupData.totalStores}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* 総配布枚数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">総配布枚数</p>
                <p className="text-3xl font-bold text-gray-900">{mockGroupData.totalDistributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* 総在庫数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">総在庫数</p>
                <p className="text-3xl font-bold text-gray-900">{mockGroupData.totalStock.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 店舗一覧サマリー */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">管理店舗一覧</h3>
            <button
              onClick={() => router.push('/group/stores')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              すべて見る →
            </button>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockGroupData.stores.map((store) => (
                    <tr
                      key={store.id}
                      onClick={() => router.push(`/group/stores/${store.id}`)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{store.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
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
      </div>
    </GroupLayout>
  )
}
