'use client'

import CompanyLayout from '@/components/company/CompanyLayout'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Ticket, Package } from 'lucide-react'
import { use } from 'react'

// モックデータ
const mockStores = [
  {
    id: 'STORE-001',
    storeId: 'STORE-001',
    name: 'カフェ＆ダイニング 渋谷店',
    groupId: 'GRP001',
    groupName: '関東エリアグループ',
    email: 'shibuya@example.com',
    phoneNumber: '03-1234-5678',
    address: '東京都渋谷区渋谷1-1-1',
    description: '渋谷駅から徒歩5分のカフェ＆ダイニングです',
    loginId: 'shibuya_store',
    distributed: 1450,
    stock: 850,
    status: 'active',
    createdDate: '2025-02-01'
  }
]

export default function CompanyStoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const store = mockStores.find(s => s.id === resolvedParams.id) || mockStores[0]

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
              onClick={() => router.push('/company/stores')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
              <p className="text-sm text-gray-600 mt-1">店舗ID: {store.storeId}</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/company/stores/${resolvedParams.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            編集
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">配布枚数</p>
                <p className="text-2xl font-bold text-gray-900">{store.distributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">在庫数</p>
                <p className="text-2xl font-bold text-gray-900">{store.stock.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
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
                <dt className="text-sm font-medium text-gray-500 mb-1">店舗ID</dt>
                <dd className="text-sm text-gray-900">{store.storeId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">ステータス</dt>
                <dd className="text-sm text-gray-900">{getStatusBadge(store.status)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">所属グループ</dt>
                <dd className="text-sm text-gray-900">
                  <button
                    onClick={() => router.push(`/company/groups/${store.groupId}`)}
                    className="text-green-600 hover:text-green-700 hover:underline"
                  >
                    {store.groupName} ({store.groupId})
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">メールアドレス</dt>
                <dd className="text-sm text-gray-900">{store.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">電話番号</dt>
                <dd className="text-sm text-gray-900">{store.phoneNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">作成日</dt>
                <dd className="text-sm text-gray-900">{store.createdDate}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500 mb-1">住所</dt>
                <dd className="text-sm text-gray-900">{store.address}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500 mb-1">説明</dt>
                <dd className="text-sm text-gray-900">{store.description}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">ログインID</dt>
                <dd className="text-sm text-gray-900">{store.loginId}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
