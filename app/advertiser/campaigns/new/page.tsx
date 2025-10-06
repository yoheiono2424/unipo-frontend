'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

export default function AdvertiserCampaignNewPage() {
  const router = useRouter()

  // フォームデータ
  const [formData, setFormData] = useState({
    planId: '',
    campaignName: '',
    startDate: '',
    endDate: '',
    creativeUrl: '',
    bannerImage: null as File | null,
    issueCount: '',
    amount: '',
    targetDescription: ''
  })

  const [imagePreview, setImagePreview] = useState<string>('')

  // 画像アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, bannerImage: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 作成処理
  const handleSubmit = () => {
    // TODO: バックエンドへの送信処理
    console.log('フォームデータ:', formData)
    router.push('/advertiser/campaigns')
  }

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/advertiser/campaigns"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">広告キャンペーン作成</h1>
          </div>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl">
          <div className="space-y-6">
            {/* キャンペーンプラン */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                キャンペーンプラン <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.planId}
                onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">選択してください</option>
                <option value="plan001">ベーシックプラン</option>
                <option value="plan002">スタンダードプラン</option>
                <option value="plan003">プレミアムプラン</option>
                <option value="custom">カスタムプラン</option>
              </select>
            </div>

            {/* キャンペーン名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                キャンペーン名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.campaignName}
                onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="春の新生活応援キャンペーン"
              />
            </div>

            {/* 開始日・終了日 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  開始日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  終了日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            {/* 広告クリエイティブURL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                広告クリエイティブURL
              </label>
              <input
                type="url"
                value={formData.creativeUrl}
                onChange={(e) => setFormData({ ...formData, creativeUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="https://example.com/campaign"
              />
            </div>

            {/* バナー画像 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                バナー画像
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="text-center">
                    <img
                      src={imagePreview}
                      alt="プレビュー"
                      className="mx-auto mb-4 max-h-48 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, bannerImage: null })
                        setImagePreview('')
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-sm text-gray-600 mb-2">
                      クリックしてファイルをアップロード
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (最大10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="inline-block mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      ファイルを選択
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* 発行枚数・額面 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  発行枚数 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.issueCount}
                  onChange={(e) => setFormData({ ...formData, issueCount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="1000"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  額面 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">選択してください</option>
                  <option value="500">¥500</option>
                  <option value="1000">¥1,000</option>
                  <option value="3000">¥3,000</option>
                  <option value="5000">¥5,000</option>
                  <option value="10000">¥10,000</option>
                </select>
              </div>
            </div>

            {/* ターゲット層 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ターゲット層
              </label>
              <textarea
                value={formData.targetDescription}
                onChange={(e) => setFormData({ ...formData, targetDescription: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                rows={6}
                placeholder="例：20代〜30代の女性、都内在住、美容・ファッションに関心が高い層"
              />
            </div>
          </div>

          {/* ボタン */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/advertiser/campaigns')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              作成
            </button>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}
