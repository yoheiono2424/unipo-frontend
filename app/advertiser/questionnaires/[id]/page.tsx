'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  Star,
  Download
} from 'lucide-react'

export default function AdvertiserQuestionnaireDetailPage() {
  const params = useParams()

  // アンケート回答詳細データ（モック）
  const response = {
    id: params.id,
    responseDate: '2025/01/29',
    responseTime: '10:30:45',
    userId: 'USR-12345',
    userName: '田中 太郎',
    userAge: '25-34歳',
    userGender: '男性',
    userEmail: 'tanaka@example.com',
    campaignName: '春の新生活応援キャンペーン',
    campaignId: 'CP-2025-001',
    storeName: 'イオンモール幕張新都心',
    storeId: 'STR-001234',
    distributionDate: '2025/01/28',
    completionRate: 100,
    responseQuality: '高',
    questions: [
      {
        id: 1,
        question: '今回のギフトカードをどのように知りましたか？',
        type: 'radio',
        answer: '店頭のポスター'
      },
      {
        id: 2,
        question: '商品・サービスの満足度を教えてください',
        type: 'radio',
        answer: 'とても満足'
      },
      {
        id: 3,
        question: '今後も利用したいと思いますか？',
        type: 'radio',
        answer: 'はい'
      },
      {
        id: 4,
        question: '改善してほしい点があれば教えてください',
        type: 'text',
        answer: '特にありません。とても良いキャンペーンだと思います。今後も継続してほしいです。'
      },
      {
        id: 5,
        question: '友人にお勧めしたいと思いますか？（10点満点）',
        type: 'rating',
        answer: '9'
      }
    ]
  }

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/advertiser/questionnaires"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">アンケート回答詳細</h1>
          </div>
          <p className="text-gray-600 ml-12">回答ID: RESP-{response.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側: 回答内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 回答情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">回答情報</h2>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  response.responseQuality === '高'
                    ? 'bg-green-100 text-green-800'
                    : response.responseQuality === '中'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  品質: {response.responseQuality}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">回答日時</div>
                  <div className="flex items-center text-gray-900">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {response.responseDate} {response.responseTime}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">完了率</div>
                  <div className="flex items-center">
                    <div className="text-gray-900 font-medium mr-2">{response.completionRate}%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${response.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">配布日</div>
                  <div className="text-gray-900">{response.distributionDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">回答までの日数</div>
                  <div className="text-gray-900">1日</div>
                </div>
              </div>
            </div>

            {/* アンケート回答 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アンケート回答</h2>
              <div className="space-y-6">
                {response.questions.map((q, index) => (
                  <div key={q.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-blue-600">Q{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">{q.question}</div>
                        {q.type === 'rating' ? (
                          <div className="flex items-center">
                            <div className="flex mr-3">
                              {[...Array(10)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={20}
                                  className={i < parseInt(q.answer) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-gray-900">{q.answer}/10</span>
                          </div>
                        ) : q.type === 'text' ? (
                          <div className="bg-gray-50 rounded-lg p-3 text-gray-700">{q.answer}</div>
                        ) : (
                          <div className="flex items-center">
                            <CheckCircle size={16} className="text-green-600 mr-2" />
                            <span className="text-gray-900">{q.answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側: ユーザー情報とキャンペーン情報 */}
          <div className="lg:col-span-1 space-y-6">
            {/* ユーザー情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ユーザー情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">氏名</div>
                  <div className="flex items-center text-gray-900">
                    <User size={16} className="mr-2 text-gray-400" />
                    {response.userName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">ユーザーID</div>
                  <div className="text-gray-900 font-mono text-sm">{response.userId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">属性</div>
                  <div className="text-gray-900">
                    {response.userGender} / {response.userAge}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">メールアドレス</div>
                  <div className="text-gray-900 text-sm">{response.userEmail}</div>
                </div>
              </div>
            </div>

            {/* キャンペーン情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">キャンペーン情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーン名</div>
                  <div className="font-medium text-gray-900">{response.campaignName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーンID</div>
                  <div className="text-gray-900 font-mono text-sm">{response.campaignId}</div>
                </div>
              </div>
            </div>

            {/* 店舗情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">店舗情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">店舗名</div>
                  <div className="flex items-center text-gray-900">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {response.storeName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">店舗ID</div>
                  <div className="text-gray-900 font-mono text-sm">{response.storeId}</div>
                </div>
              </div>
            </div>

            {/* アクション */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download size={20} className="mr-2" />
                回答をダウンロード
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}