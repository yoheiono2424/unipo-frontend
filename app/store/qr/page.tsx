'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { useState, useRef } from 'react'
import { X, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function StoreQRPage() {
  const [showQRModal, setShowQRModal] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // モックデータ（店舗情報を自動取得する想定）
  const storeData = {
    id: 'STORE-001',
    name: 'カフェ＆ダイニング 渋谷店'
  }

  // QRコードダウンロード機能
  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    canvas.width = 1000
    canvas.height = 1000

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 1000, 1000)
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `${storeData.name}_QRコード.png`
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <StoreLayout>
      <StoreHeader title="QRコード" showBackButton={false} />

      <div className="p-4 space-y-6 pb-20">
        {/* QRコード表示エリア */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">店舗QRコード</h3>
            <p className="text-sm text-gray-500 mt-1">タップで拡大表示・ダウンロードが可能です</p>
          </div>

          <div className="p-8">
            <div
              onClick={() => setShowQRModal(true)}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-400 transition-all active:scale-95 mx-auto w-fit"
            >
              <QRCodeSVG
                value={`https://uniepo.com/store/${storeData.id}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">店舗ID: {storeData.id}</p>
              <p className="text-sm text-gray-900 font-medium mt-1">{storeData.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QRコード拡大モーダル */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* タイトル */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{storeData.name}</h3>
              <p className="text-sm text-gray-500 mt-1">店舗QRコード</p>
            </div>

            {/* QRコード表示 */}
            <div ref={qrRef} className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6 flex items-center justify-center">
              <QRCodeSVG
                value={`https://uniepo.com/store/${storeData.id}`}
                size={280}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* 店舗情報 */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">店舗ID: {storeData.id}</p>
              <p className="text-xs text-gray-400 mt-1">このQRコードで来店ポイントを付与できます</p>
            </div>

            {/* ダウンロードボタン */}
            <button
              onClick={handleDownloadQR}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Download size={20} />
              <span>QRコードをダウンロード</span>
            </button>
          </div>
        </div>
      )}
    </StoreLayout>
  )
}
