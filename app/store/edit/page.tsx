'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { useState } from 'react'
import { User } from 'lucide-react'

export default function StoreEditPage() {
  const [formData, setFormData] = useState({
    storeId: 'ST-001',
    storeName: 'カフェ＆ダイニング 渋谷店',
    storeType: '実在店舗',
    category: 'カフェ・喫茶店',
    area: '東京都渋谷区',
    address: '東京都渋谷区道玄坂1-2-3',
    phone: '03-1234-5678',
    description: '渋谷駅から徒歩5分。落ち着いた雰囲気のカフェ＆ダイニング。',
    hours: '10:00 - 22:00',
    visitPoints: 'ON'
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = () => {
    // TODO: 保存処理
    alert('店舗情報を更新しました')
  }

  return (
    <StoreLayout>
      <StoreHeader title="店舗編集" />

      <div className="p-4 space-y-6 pb-20">
        {/* プロフィールアイコン */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <User size={48} className="text-white" />
          </div>
        </div>

        {/* フォーム */}
        <div className="space-y-5 bg-white rounded-2xl shadow-sm p-5">
          {/* 店舗ID */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              店舗ID<br />
              <span className="text-xs text-gray-500">(店舗ID)</span>
            </label>
            <input
              type="text"
              value={formData.storeId}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
          </div>

          {/* 店舗名 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">店舗名</label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          {/* 店舗種別 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">店舗種別</label>
            <select
              value={formData.storeType}
              onChange={(e) => handleChange('storeType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option>実在店舗</option>
              <option>架空店舗</option>
            </select>
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">カテゴリ</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option>カフェ・喫茶店</option>
              <option>レストラン</option>
              <option>小売店</option>
              <option>その他</option>
            </select>
          </div>

          {/* エリア */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">エリア</label>
            <select
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option>東京都渋谷区</option>
              <option>東京都新宿区</option>
              <option>東京都港区</option>
            </select>
          </div>

          {/* 住所 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">住所</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">電話番号</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          {/* 店舗説明 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">店舗説明</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 resize-none"
            />
          </div>

          {/* 営業時間 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">営業時間</label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => handleChange('hours', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          {/* 店舗写真 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">店舗写真</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop"
              ].map((imgUrl, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <img src={imgUrl} alt={`店舗写真${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 来店ポイント付与 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">来店ポイント付与</label>
            <select
              value={formData.visitPoints}
              onChange={(e) => handleChange('visitPoints', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option>ON</option>
              <option>OFF</option>
            </select>
          </div>

        </div>

        {/* 変更ボタン */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          変更を保存
        </button>
      </div>
    </StoreLayout>
  )
}
