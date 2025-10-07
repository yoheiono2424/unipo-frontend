'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { useState } from 'react'

export default function StoreQRPage() {
  const [formData, setFormData] = useState({
    storeId: '',
    storeName: ''
  })
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerate = () => {
    if (formData.storeId && formData.storeName) {
      setQrGenerated(true)
    }
  }

  return (
    <StoreLayout>
      <StoreHeader title="QRコード発行" showBackButton={false} />

      <div className="p-4 space-y-6 pb-20">
        {!qrGenerated ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            {/* 店舗ID */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">店舗ID</label>
              <input
                type="text"
                value={formData.storeId}
                onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                placeholder="ST-001"
              />
            </div>

            {/* 店舗名 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">店舗名</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                placeholder="カフェ＆ダイニング 渋谷店"
              />
            </div>

            {/* 発行ボタン */}
            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-2"
            >
              QRコードを発行
            </button>
          </div>
        ) : (
          <div className="space-y-6 bg-white rounded-2xl shadow-sm p-6">
            {/* QRコード表示エリア */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center shadow-lg p-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=store-id-ST-001"
                  alt="店舗QRコード"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* 店舗情報 */}
            <div className="text-center space-y-2">
              <div className="text-sm text-gray-600">店舗ID: {formData.storeId}</div>
              <div className="text-sm text-gray-900 font-medium">{formData.storeName}</div>
            </div>

            {/* アクションボタン */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                ダウンロード
              </button>
              <button
                onClick={() => setQrGenerated(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                再発行
              </button>
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  )
}
