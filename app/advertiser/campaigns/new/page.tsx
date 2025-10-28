'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

// キャンペーンプランのモックデータ
const campaignPlans = [
  { id: 'plan001', name: 'ベーシックプラン', issueCount: 1000, amount: 500 },
  { id: 'plan002', name: 'スタンダードプラン', issueCount: 5000, amount: 1000 },
  { id: 'plan003', name: 'プレミアムプラン', issueCount: 10000, amount: 3000 },
  { id: 'custom', name: 'カスタムプラン', issueCount: 0, amount: 0 }
]

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
    issueCount: '0',
    amount: '0',
    targetDescription: '',
    // ターゲット設定
    isAgeUnrestricted: true,
    ageFrom: "",
    ageTo: "",
    targetGender: "指定なし",
  })

  const [imagePreview, setImagePreview] = useState<string>('')

  // キャンペーンプラン選択時に発行枚数と額面を自動設定
  useEffect(() => {
    if (formData.planId === '') {
      // 未選択の場合は0にする
      setFormData(prev => ({
        ...prev,
        issueCount: '0',
        amount: '0'
      }))
    } else {
      const selectedPlan = campaignPlans.find(plan => plan.id === formData.planId)
      if (selectedPlan && selectedPlan.id !== 'custom') {
        setFormData(prev => ({
          ...prev,
          issueCount: selectedPlan.issueCount.toString(),
          amount: selectedPlan.amount.toString()
        }))
      } else if (selectedPlan && selectedPlan.id === 'custom') {
        // カスタムプランの場合は空にする
        setFormData(prev => ({
          ...prev,
          issueCount: '',
          amount: ''
        }))
      }
    }
  }, [formData.planId])

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
                  disabled={formData.planId !== 'custom'}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    formData.planId !== 'custom' ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
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
                  disabled={formData.planId !== 'custom'}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    formData.planId !== 'custom' ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
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

            {/* ターゲット設定 */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ターゲット設定</h3>

              {/* 対象年齢 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">対象年齢</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAgeUnrestricted"
                      checked={formData.isAgeUnrestricted}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        isAgeUnrestricted: e.target.checked,
                        ageFrom: e.target.checked ? "" : prev.ageFrom,
                        ageTo: e.target.checked ? "" : prev.ageTo
                      }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">年齢制限なし</label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">From（歳以上）</label>
                      <input
                        type="number"
                        name="ageFrom"
                        value={formData.ageFrom}
                        onChange={(e) => setFormData({ ...formData, ageFrom: e.target.value })}
                        disabled={formData.isAgeUnrestricted}
                        min="0"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="例: 20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">To（歳以下）</label>
                      <input
                        type="number"
                        name="ageTo"
                        value={formData.ageTo}
                        onChange={(e) => setFormData({ ...formData, ageTo: e.target.value })}
                        disabled={formData.isAgeUnrestricted}
                        min="0"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="例: 40"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 対象性別 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">対象性別</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="指定なし"
                      checked={formData.targetGender === "指定なし"}
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">指定なし</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="男性"
                      checked={formData.targetGender === "男性"}
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">男性</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="女性"
                      checked={formData.targetGender === "女性"}
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">女性</label>
                  </div>
                </div>
              </div>
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
