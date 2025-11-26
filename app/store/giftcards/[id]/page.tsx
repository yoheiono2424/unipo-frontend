'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import DeleteConfirmModal from '@/components/store/DeleteConfirmModal'
import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, FileText, Package, CheckCircle, DollarSign, Plus } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function StoreGiftcardDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [distributedCount, setDistributedCount] = useState('155')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // モックデータ
  const campaign = {
    id: id,
    name: '春の新生活応援キャンペーン',
    stock: 45,
    distributed: 155,
    faceValue: 500,
    image: null
  }

  const distributionHistory = [
    { id: '1', userId: 'USR-12345', userName: '田中 太郎', date: '2025/10/07', time: '14:23', count: 1, method: '自動', canEdit: false },
    { id: '2', userId: 'USR-67890', userName: '佐藤 花子', date: '2025/10/07', time: '11:15', count: 1, method: '自動', canEdit: false },
    { id: '3', userId: 'USR-11223', userName: '鈴木 一郎', date: '2025/10/06', time: '16:45', count: 1, method: '手動', canEdit: true },
    { id: '4', userId: 'USR-44556', userName: '山田 美咲', date: '2025/10/06', time: '10:30', count: 1, method: '自動', canEdit: false },
    { id: '5', userId: 'USR-77889', userName: '高橋 健太', date: '2025/10/05', time: '13:20', count: 1, method: '手動', canEdit: true },
    { id: '6', userId: 'USR-22334', userName: '伊藤 愛', date: '2025/10/05', time: '09:50', count: 1, method: '自動', canEdit: false },
    { id: '7', userId: 'USR-55667', userName: '渡辺 健', date: '2025/10/04', time: '15:10', count: 1, method: '自動', canEdit: false },
    { id: '8', userId: 'USR-88990', userName: '中村 翔太', date: '2025/10/04', time: '12:05', count: 1, method: '手動', canEdit: true }
  ]

  const handleUpdate = () => {
    alert(`配布数を${distributedCount}枚に更新しました`)
  }

  const handleDelete = () => {
    alert(`配布実績を削除しました`)
    setShowDeleteModal(false)
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  return (
    <StoreLayout>
      <StoreHeader
        title="ギフトカード詳細"
        rightAction={
          <button
            onClick={() => router.push(`/store/giftcards/${id}/create-distribution`)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors active:scale-95 whitespace-nowrap"
          >
            <Plus size={18} />
            <span>配布作成</span>
          </button>
        }
      />

      <div className="p-4 space-y-6 pb-20">
        {/* キャンペーン画像 */}
        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={campaign.image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop"}
            alt={campaign.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* キャンペーン情報 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText size={16} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">キャンペーン名</div>
              <div className="text-sm text-gray-900 font-medium">{campaign.name}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Package size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">在庫数</div>
              <div className="text-sm text-gray-900 font-medium">{campaign.stock}枚</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">配布数（手動入力可）</div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={distributedCount}
                  onChange={(e) => setDistributedCount(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium"
                />
                <span className="text-sm text-gray-600">枚</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <DollarSign size={16} className="text-yellow-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">額面</div>
              <div className="text-sm text-gray-900 font-semibold">¥{campaign.faceValue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* 変更ボタン */}
        <button
          onClick={handleUpdate}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          配布数を更新
        </button>

        {/* 配布実績 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">配布実績</h3>

          <div className="space-y-2">
            {distributionHistory.map((history) => (
              <div
                key={history.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-900 font-medium">{history.userName}</span>
                    <span className="text-xs text-gray-500">({history.userId})</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-2">
                    <span>{history.date} {history.time}</span>
                    <span className="text-gray-400">·</span>
                    <span className="font-medium">{history.count}枚</span>
                    <span className="text-gray-400">·</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      history.method === '自動'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {history.method}
                    </span>
                  </div>
                </div>

                {history.canEdit && (
                  <button
                    onClick={() => openDeleteModal()}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </StoreLayout>
  )
}
