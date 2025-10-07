'use client'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message?: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message = '配布実績を削除しますか？'
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* モーダルコンテンツ */}
      <div className="relative bg-white rounded-lg p-6 max-w-sm mx-4 w-full">
        <p className="text-center text-gray-900 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            削除
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}
