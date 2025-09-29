'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Target,
  CreditCard,
  FileText,
  Upload,
  Plus,
  Trash2
} from 'lucide-react'

export default function AdvertiserCampaignNewPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  // フォームデータ
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    cardAmount: '1000',
    targetGender: 'all',
    targetAge: 'all',
    targetArea: [] as string[],
    targetIndustry: [] as string[],
    cardDesign: null as File | null,
    surveyQuestions: [
      { id: 1, question: '', type: 'radio', options: [''] }
    ]
  })

  // 質問を追加
  const addQuestion = () => {
    setCampaignData(prev => ({
      ...prev,
      surveyQuestions: [
        ...prev.surveyQuestions,
        { id: Date.now(), question: '', type: 'radio', options: [''] }
      ]
    }))
  }

  // 質問を削除
  const removeQuestion = (id: number) => {
    setCampaignData(prev => ({
      ...prev,
      surveyQuestions: prev.surveyQuestions.filter(q => q.id !== id)
    }))
  }

  // 選択肢を追加
  const addOption = (questionId: number) => {
    setCampaignData(prev => ({
      ...prev,
      surveyQuestions: prev.surveyQuestions.map(q =>
        q.id === questionId
          ? { ...q, options: [...q.options, ''] }
          : q
      )
    }))
  }

  const steps = [
    { number: 1, title: '基本情報', icon: FileText },
    { number: 2, title: 'ターゲット設定', icon: Target },
    { number: 3, title: 'デザイン・アンケート', icon: CreditCard }
  ]

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/advertiser/campaigns"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">新規キャンペーン作成</h1>
          </div>

          {/* ステップインジケーター */}
          <div className="flex items-center justify-between max-w-2xl">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center ${index > 0 ? 'ml-4' : ''}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`ml-3 font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`ml-4 w-20 h-0.5 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* ステップ1: 基本情報 */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キャンペーン名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="春の新生活応援キャンペーン"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  rows={4}
                  placeholder="キャンペーンの概要を入力してください"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    開始日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => setCampaignData({ ...campaignData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    終了日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData({ ...campaignData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    予算 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ギフトカード額面 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={campaignData.cardAmount}
                    onChange={(e) => setCampaignData({ ...campaignData, cardAmount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="500">¥500</option>
                    <option value="1000">¥1,000</option>
                    <option value="3000">¥3,000</option>
                    <option value="5000">¥5,000</option>
                    <option value="10000">¥10,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ステップ2: ターゲット設定 */}
          {currentStep === 2 && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  性別
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="all"
                      checked={campaignData.targetGender === 'all'}
                      onChange={(e) => setCampaignData({ ...campaignData, targetGender: e.target.value })}
                      className="mr-2"
                    />
                    すべて
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={campaignData.targetGender === 'male'}
                      onChange={(e) => setCampaignData({ ...campaignData, targetGender: e.target.value })}
                      className="mr-2"
                    />
                    男性
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={campaignData.targetGender === 'female'}
                      onChange={(e) => setCampaignData({ ...campaignData, targetGender: e.target.value })}
                      className="mr-2"
                    />
                    女性
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  年齢層
                </label>
                <select
                  value={campaignData.targetAge}
                  onChange={(e) => setCampaignData({ ...campaignData, targetAge: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="all">すべて</option>
                  <option value="18-24">18-24歳</option>
                  <option value="25-34">25-34歳</option>
                  <option value="35-44">35-44歳</option>
                  <option value="45-54">45-54歳</option>
                  <option value="55+">55歳以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  対象エリア
                </label>
                <p className="text-sm text-gray-500 mb-2">対象とするエリアを選択してください（複数選択可）</p>
                <div className="grid grid-cols-3 gap-2">
                  {['東京都', '神奈川県', '千葉県', '埼玉県', '大阪府', '愛知県'].map(area => (
                    <label key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        value={area}
                        checked={campaignData.targetArea.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCampaignData({ ...campaignData, targetArea: [...campaignData.targetArea, area] })
                          } else {
                            setCampaignData({ ...campaignData, targetArea: campaignData.targetArea.filter(a => a !== area) })
                          }
                        }}
                        className="mr-2"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  対象業種
                </label>
                <p className="text-sm text-gray-500 mb-2">配布対象とする店舗の業種を選択してください（複数選択可）</p>
                <div className="grid grid-cols-2 gap-2">
                  {['飲食店', '小売店', 'サービス業', '美容・理容', 'エンターテインメント', 'その他'].map(industry => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        value={industry}
                        checked={campaignData.targetIndustry.includes(industry)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCampaignData({ ...campaignData, targetIndustry: [...campaignData.targetIndustry, industry] })
                          } else {
                            setCampaignData({ ...campaignData, targetIndustry: campaignData.targetIndustry.filter(i => i !== industry) })
                          }
                        }}
                        className="mr-2"
                      />
                      {industry}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ステップ3: デザイン・アンケート */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ギフトカードデザイン
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    クリックしてファイルをアップロード<br />
                    または、ファイルをドラッグ＆ドロップ
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG (最大10MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setCampaignData({ ...campaignData, cardDesign: e.target.files[0] })
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    アンケート設問
                  </label>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} className="mr-1" />
                    設問を追加
                  </button>
                </div>

                <div className="space-y-4">
                  {campaignData.surveyQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-medium">設問 {index + 1}</span>
                        {campaignData.surveyQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="質問を入力してください"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />

                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                        <option value="radio">単一選択</option>
                        <option value="checkbox">複数選択</option>
                        <option value="text">自由記述</option>
                      </select>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={`選択肢 ${optionIndex + 1}`}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(question.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          + 選択肢を追加
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1)
                } else {
                  router.push('/advertiser/campaigns')
                }
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {currentStep === 1 ? 'キャンセル' : '戻る'}
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                次へ
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  // キャンペーン作成処理
                  router.push('/advertiser/campaigns')
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                キャンペーンを作成
              </button>
            )}
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}