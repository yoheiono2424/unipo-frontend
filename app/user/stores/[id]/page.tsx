'use client'

import { useRouter, useParams } from 'next/navigation'
import { MapPin, Clock, Phone, Globe, Gift, ChevronRight } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserStoreDetailPage() {
  const router = useRouter()
  const params = useParams()
  const storeId = params.id

  // モックユーザーデータ（実際にはログインユーザーの情報を取得）
  const currentUser = {
    birthdate: '1990-05-15', // 生年月日（YYYY-MM-DD形式）
    gender: '男性' // 性別
  }

  // 年齢計算関数
  const calculateAge = (birthdate: string): number => {
    const today = new Date()
    const birthDate = new Date(birthdate)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // キャンペーン表示制御関数
  const shouldDisplayCampaign = (campaign: {
    isAgeUnrestricted?: boolean;
    ageFrom?: string;
    ageTo?: string;
    targetGender?: string;
  }): boolean => {
    const userAge = calculateAge(currentUser.birthdate)
    const userGender = currentUser.gender

    // 年齢チェック
    if (!campaign.isAgeUnrestricted) {
      if (campaign.ageFrom && userAge < parseInt(campaign.ageFrom)) {
        return false // 最低年齢未満
      }
      if (campaign.ageTo && userAge > parseInt(campaign.ageTo)) {
        return false // 最高年齢超過
      }
    }

    // 性別チェック
    if (campaign.targetGender && campaign.targetGender !== '指定なし') {
      if (campaign.targetGender !== userGender) {
        return false // 性別不一致
      }
    }

    return true // すべての条件を満たす
  }

  // モックデータ
  const store = {
    id: storeId,
    name: 'ユニー高蔵寺店',
    area: '愛知県春日井市',
    address: '愛知県春日井市中央台1-2-2',
    hours: '9:00-21:00',
    phone: '0568-91-1211',
    website: 'https://www.uny.co.jp',
    image: '🏪',
    campaigns: [
      {
        id: 1,
        title: '新規会員登録で500円クーポンプレゼント',
        description: '今なら新規会員登録で500円分のクーポンをプレゼント！',
        validUntil: '2025/10/31',
        type: 'giftcard',
        // ターゲット設定（モック）
        isAgeUnrestricted: true,
        ageFrom: '',
        ageTo: '',
        targetGender: '指定なし'
      },
      {
        id: 2,
        title: 'アンケート回答で50ポイント',
        description: '簡単なアンケートに答えて50ポイントゲット！',
        validUntil: '2025/11/15',
        type: 'survey',
        // ターゲット設定（モック）
        isAgeUnrestricted: false,
        ageFrom: '20',
        ageTo: '40',
        targetGender: '男性'
      },
    ]
  }

  // フィルタリング済みキャンペーン
  const filteredCampaigns = store.campaigns.filter(shouldDisplayCampaign)

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-900">店舗詳細</h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-6 space-y-6">
        {/* 店舗基本情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
              {store.image}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{store.name}</h2>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">{store.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">{store.hours}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <a href={`tel:${store.phone}`} className="text-sm text-blue-600 hover:underline">
                {store.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                公式サイト
              </a>
            </div>
          </div>

          {/* マップボタン */}
          <button className="w-full mt-4 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            地図アプリで開く
          </button>
        </div>

        {/* 実施中のキャンペーン */}
        {filteredCampaigns.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">実施中のキャンペーン</h3>
            <div className="space-y-3">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/user/campaigns/${campaign.id}`)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Gift className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                        <p className="text-xs text-gray-500">有効期限: {campaign.validUntil}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* マップ（モック） */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">地図</h3>
          <div className="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">地図表示（実装予定）</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </UserLayout>
  )
}
