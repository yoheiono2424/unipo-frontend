'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useRouter } from 'next/navigation'
import { Users, Store, Package, TrendingUp } from 'lucide-react'

// モックデータ
const mockCompanyData = {
  companyName: '株式会社サンプル企業',
  totalGroups: 5,
  totalStores: 28,
  totalDistributed: 12450,
  totalStock: 7550,
  groups: [
    {
      id: 'GRP001',
      name: '関東エリアグループ',
      storeCount: 12,
      distributed: 5200,
      stock: 2800
    },
    {
      id: 'GRP002',
      name: '関西エリアグループ',
      storeCount: 8,
      distributed: 3850,
      stock: 2150
    },
    {
      id: 'GRP003',
      name: '中部エリアグループ',
      storeCount: 5,
      distributed: 2100,
      stock: 1400
    },
    {
      id: 'GRP004',
      name: '九州エリアグループ',
      storeCount: 2,
      distributed: 950,
      stock: 850
    },
    {
      id: 'GRP005',
      name: '東北エリアグループ',
      storeCount: 1,
      distributed: 350,
      stock: 350
    }
  ],
  recentStores: [
    {
      id: 'STORE-001',
      name: 'カフェ＆ダイニング 渋谷店',
      groupName: '関東エリアグループ',
      distributed: 145,
      stock: 55
    },
    {
      id: 'STORE-002',
      name: 'レストラン 梅田店',
      groupName: '関西エリアグループ',
      distributed: 98,
      stock: 102
    },
    {
      id: 'STORE-003',
      name: 'ダイニングバー 名古屋店',
      groupName: '中部エリアグループ',
      distributed: 76,
      stock: 124
    }
  ]
}

export default function CompanyHomePage() {
  const router = useRouter()

  return (
    <CompanyLayout>
      <div className="p-6">
        {/* ウェルカムメッセージ */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ようこそ、{mockCompanyData.companyName}
          </h2>
          <p className="text-gray-600">企業全体の統計情報とサマリーを表示しています。</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* グループ数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">グループ数</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyData.totalGroups}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* 店舗数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">総店舗数</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyData.totalStores}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* 総配布枚数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">総配布枚数</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyData.totalDistributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* 総在庫数 */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">総在庫数</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyData.totalStock.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* グループ一覧サマリー */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">グループ一覧</h3>
            <button
              onClick={() => router.push('/company/groups')}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
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
                      グループ名
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCompanyData.groups.map((group) => (
                    <tr
                      key={group.id}
                      onClick={() => router.push(`/company/groups/${group.id}`)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 最近登録された店舗 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">最近登録された店舗</h3>
            <button
              onClick={() => router.push('/company/stores')}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
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
                      所属グループ
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
                  {mockCompanyData.recentStores.map((store) => (
                    <tr
                      key={store.id}
                      onClick={() => router.push(`/company/stores/${store.id}`)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{store.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{store.groupName}</div>
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
    </CompanyLayout>
  )
}
