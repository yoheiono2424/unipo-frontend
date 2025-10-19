'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Store, Users } from 'lucide-react'
import { use } from 'react'

// モックデータ
const mockGroups = [
  {
    id: 'GRP001',
    groupId: 'GRP001',
    name: '関東エリアグループ',
    email: 'kanto@example.com',
    phoneNumber: '03-1234-5678',
    address: '東京都渋谷区渋谷1-1-1',
    description: '関東地方の店舗を管理するグループです',
    loginId: 'kanto_group',
    storeCount: 12,
    distributed: 5200,
    stock: 2800,
    status: 'active',
    createdDate: '2025-01-15',
    stores: [
      { id: 'STORE-001', name: 'カフェ＆ダイニング 渋谷店', distributed: 145 },
      { id: 'STORE-002', name: 'レストラン 新宿店', distributed: 132 },
      { id: 'STORE-003', name: 'ダイニングバー 池袋店', distributed: 98 }
    ]
  }
]

export default function CompanyGroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const group = mockGroups.find(g => g.id === resolvedParams.id) || mockGroups[0]

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">稼働中</span>
    }
    return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">停止中</span>
  }

  return (
    <CompanyLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/company/groups')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
              <p className="text-sm text-gray-600 mt-1">グループID: {group.groupId}</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/company/groups/${resolvedParams.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            編集
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">管理店舗数</p>
                <p className="text-2xl font-bold text-gray-900">{group.storeCount}</p>
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
                <p className="text-2xl font-bold text-gray-900">{group.distributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">総在庫数</p>
                <p className="text-2xl font-bold text-gray-900">{group.stock.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">グループID</dt>
                <dd className="text-sm text-gray-900">{group.groupId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">ステータス</dt>
                <dd className="text-sm text-gray-900">{getStatusBadge(group.status)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">メールアドレス</dt>
                <dd className="text-sm text-gray-900">{group.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">電話番号</dt>
                <dd className="text-sm text-gray-900">{group.phoneNumber}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500 mb-1">住所</dt>
                <dd className="text-sm text-gray-900">{group.address}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500 mb-1">説明</dt>
                <dd className="text-sm text-gray-900">{group.description}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">ログインID</dt>
                <dd className="text-sm text-gray-900">{group.loginId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">作成日</dt>
                <dd className="text-sm text-gray-900">{group.createdDate}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 所属店舗一覧 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">所属店舗一覧</h2>
            <button
              onClick={() => router.push('/company/stores')}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              すべて見る →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    店舗ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    店舗名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    配布枚数
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {group.stores.map((store) => (
                  <tr
                    key={store.id}
                    onClick={() => router.push(`/company/stores/${store.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {store.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.distributed}枚
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
