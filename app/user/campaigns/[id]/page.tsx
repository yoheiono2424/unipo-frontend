'use client'

import { useRouter, useParams } from 'next/navigation'
import { Gift, Calendar, ArrowLeft, Store, CheckCircle2 } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserCampaignDetailPage() {
  const router = useRouter()
  const params = useParams()
  const campaignId = params.id

  // モックキャンペーンデータ
  const campaign = {
    id: campaignId,
    title: '新規会員登録で500円クーポンプレゼント',
    description: '今なら新規会員登録で500円分のクーポンをプレゼント！お買い物でご利用いただけます。',
    longDescription: 'この度、ユニーポイント会員になっていただいた方全員に、500円分のクーポンをプレゼントいたします。店内のお好きな商品にご利用いただけます。この機会にぜひご登録ください！',
    validUntil: '2025/10/31',
    validFrom: '2025/01/01',
    storeName: 'ユニー高蔵寺店',
    storeId: 1,
    imageUrl: '🎁',
    type: 'giftcard',
    giftAmount: '¥500',
    conditions: [
      '新規会員登録された方が対象',
      '1人1回まで利用可能',
      'クーポンの有効期限は発行日から30日間',
      '一部対象外商品あり'
    ]
  }

  const handleParticipate = () => {
    // 実際にはキャンペーン参加処理を行う
    alert('キャンペーンに参加しました！')
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-900">キャンペーン詳細</h1>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
          {/* キャンペーン画像/アイコン */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
              <div className="text-8xl">{campaign.imageUrl}</div>
            </div>
          </div>

          {/* キャンペーン情報カード */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {/* タイトル */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
              <p className="text-sm text-gray-600">{campaign.description}</p>
            </div>

            {/* 金額バッジ */}
            {campaign.giftAmount && (
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold text-lg">
                <Gift className="w-5 h-5 mr-2" />
                {campaign.giftAmount}
              </div>
            )}

            {/* 有効期限 */}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>有効期限: {campaign.validFrom} ～ {campaign.validUntil}</span>
            </div>

            {/* 対象店舗 */}
            <div className="flex items-center text-sm text-gray-600">
              <Store className="w-4 h-4 mr-2 text-gray-400" />
              <span>{campaign.storeName}</span>
            </div>
          </div>

          {/* 詳細説明 */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">キャンペーン詳細</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{campaign.longDescription}</p>
          </div>

          {/* 利用条件 */}
          {campaign.conditions && campaign.conditions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">利用条件</h3>
              <ul className="space-y-2">
                {campaign.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 参加ボタン */}
          <div className="sticky bottom-0 pb-6 pt-4 bg-gradient-to-t from-white to-transparent">
            <button
              onClick={handleParticipate}
              className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95"
            >
              このキャンペーンに参加する
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
