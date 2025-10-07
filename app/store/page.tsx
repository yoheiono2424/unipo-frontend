'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, X, Download } from 'lucide-react'
import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function StoreHomePage() {
  const [showQRModal, setShowQRModal] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // モックデータ
  const storeData = {
    id: 'ST-001',
    name: 'カフェ＆ダイニング 渋谷店',
    area: '東京都渋谷区',
    address: '東京都渋谷区道玄坂1-2-3',
    phone: '03-1234-5678',
    hours: '10:00 - 22:00',
    visitPoints: 'ON',
    description: '渋谷駅から徒歩5分。落ち着いた雰囲気のカフェ＆ダイニング。こだわりのコーヒーと手作りのスイーツをお楽しみいただけます。',
    image: null
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
      <StoreHeader
        title="店舗管理"
        showBackButton={false}
        rightAction={
          <Link
            href="/store/edit"
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <span className="text-sm text-gray-700 font-medium">編集</span>
          </Link>
        }
      />

      <div className="p-4 space-y-6 pb-20">
        {/* 店舗画像 */}
        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={storeData.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"}
            alt={storeData.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 店舗情報カード */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* 店舗名 */}
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{storeData.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{storeData.area}</p>
          </div>

          {/* 基本情報グリッド */}
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">住所</div>
                <div className="text-sm text-gray-900">{storeData.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone size={16} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">電話番号</div>
                <div className="text-sm text-gray-900">{storeData.phone}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={16} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">営業時間</div>
                <div className="text-sm text-gray-900">{storeData.hours}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star size={16} className="text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">来店ポイント付与</div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  storeData.visitPoints === 'ON'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {storeData.visitPoints}
                </div>
              </div>
            </div>
          </div>

          {/* 店舗説明 */}
          <div className="p-5 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">店舗説明</div>
            <p className="text-sm text-gray-700 leading-relaxed">{storeData.description}</p>
          </div>
        </div>

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
            <div ref={qrRef} className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
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
