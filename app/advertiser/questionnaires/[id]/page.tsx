'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  BarChart,
  Users,
  TrendingUp,
  List,
  Edit,
  Trash2,
  X,
  AlertTriangle
} from 'lucide-react'

export default function AdvertiserQuestionnaireDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [status, setStatus] = useState('下書き') // モックデータのステータス
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // 削除ボタン押下
  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  // 削除確定処理
  const handleDeleteConfirm = () => {
    // 実際にはここでAPIにステータス更新リクエストを送信
    setStatus('削除済み')
    setShowDeleteModal(false)
    alert('アンケートを削除しました')
    router.push('/advertiser/questionnaires')
  }

  // アンケート詳細データ（モック）
  const questionnaire = {
    id: params.id,
    questionnaireId: 'QST-2025-001',
    title: '春の新生活応援キャンペーン アンケート',
    campaignName: '春の新生活応援キャンペーン',
    campaignId: 'CMP001',
    status: status,
    statusColor: status === '公開' ? 'bg-green-100 text-green-800' :
                 status === '下書き' ? 'bg-gray-100 text-gray-800' :
                 status === '終了' ? 'bg-yellow-100 text-yellow-800' :
                 'bg-red-100 text-red-800',
    createdAt: '2025/01/15',
    startDate: '2025/01/20',
    endDate: '2025/03/31',
    totalQuestions: 5,
    totalResponses: 2456,
    responseRate: '45.2%',
    targetResponses: 5000,
    responseLimit: 5000,
    distributedCardsQR: 5432, // QR読み込みによる配布枚数
    highQualityRate: '78.3%',
    description: 'このアンケートは、春の新生活応援キャンペーンに参加されたお客様を対象に、商品・サービスの満足度や改善点についてお伺いするものです。',
    questions: [
      {
        id: 1,
        question: '今回のギフトカードをどのように知りましたか？',
        type: 'radio',
        options: ['店頭のポスター', 'SNS', '友人・知人の紹介', 'その他']
      },
      {
        id: 2,
        question: '商品・サービスの満足度を教えてください',
        type: 'radio',
        options: ['とても満足', '満足', 'どちらでもない', '不満', 'とても不満']
      },
      {
        id: 3,
        question: '今後も利用したいと思いますか？',
        type: 'radio',
        options: ['はい', 'いいえ', 'わからない']
      },
      {
        id: 4,
        question: '改善してほしい点があれば教えてください',
        type: 'text',
        options: []
      },
      {
        id: 5,
        question: '友人にお勧めしたいと思いますか？（10点満点）',
        type: 'rating',
        options: []
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">アンケート詳細</h1>
              <p className="text-gray-600 mt-1">アンケートID: {questionnaire.questionnaireId}</p>
            </div>
            <div className="flex gap-3">
              {questionnaire.status === '下書き' && (
                <Link
                  href={`/advertiser/questionnaires/${questionnaire.id}/edit`}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit size={18} className="mr-2" />
                  編集
                </Link>
              )}
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} className="mr-2" />
                削除
              </button>
              <Link
                href="/advertiser/questionnaires/responses"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <List size={20} className="mr-2" />
                回答一覧へ
              </Link>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={20} />
              <span className="text-xs text-green-600 font-medium">進行中</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.totalResponses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">総回答数</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+3.1%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.responseRate}</div>
            <div className="text-sm text-gray-600">回答率</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart className="text-purple-600" size={20} />
              <span className="text-xs text-gray-500 font-medium">QR読み込み</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.distributedCardsQR.toLocaleString()}</div>
            <div className="text-sm text-gray-600">配布枚数（QR読み込み数）</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側: アンケート内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${questionnaire.statusColor}`}>
                  {questionnaire.status}
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">アンケート名</div>
                  <div className="text-gray-900 font-medium">{questionnaire.title}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">説明</div>
                  <div className="text-gray-900">{questionnaire.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">作成日</div>
                    <div className="flex items-center text-gray-900">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {questionnaire.createdAt}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">実施期間</div>
                    <div className="text-gray-900">
                      {questionnaire.startDate} ～ {questionnaire.endDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* アンケート設問 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アンケート設問</h2>
              <div className="space-y-6">
                {questionnaire.questions.map((q, index) => (
                  <div key={q.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-blue-600">Q{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">{q.question}</div>
                        <div className="text-sm text-gray-500 mb-2">
                          回答形式: {
                            q.type === 'radio' ? '単一選択' :
                            q.type === 'text' ? '自由記述' :
                            q.type === 'rating' ? '評価（10点満点）' : q.type
                          }
                        </div>
                        {q.options.length > 0 && (
                          <div className="space-y-1">
                            {q.options.map((option, i) => (
                              <div key={i} className="text-sm text-gray-700 pl-4">
                                • {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側: キャンペーン情報 */}
          <div className="lg:col-span-1 space-y-6">
            {/* キャンペーン情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">キャンペーン情報</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーン名</div>
                  <div className="font-medium text-gray-900">{questionnaire.campaignName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">キャンペーンID</div>
                  <div className="text-gray-900 font-mono text-sm">{questionnaire.campaignId}</div>
                </div>
                <div className="pt-3">
                  <Link
                    href={`/advertiser/campaigns/${questionnaire.campaignId}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    キャンペーン詳細を見る →
                  </Link>
                </div>
              </div>
            </div>

            {/* アンケート設定 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アンケート設定</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">設問数</div>
                  <div className="text-gray-900">{questionnaire.totalQuestions}問</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">現在の回答数</div>
                  <div className="text-gray-900 font-semibold">{questionnaire.totalResponses.toLocaleString()}件</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">回答人数上限</div>
                  <div className="text-gray-900">
                    {questionnaire.responseLimit
                      ? `${questionnaire.responseLimit.toLocaleString()}人`
                      : '無制限'
                    }
                  </div>
                </div>
                {questionnaire.responseLimit && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">達成率</div>
                    <div className="text-gray-900 font-semibold">
                      {((questionnaire.totalResponses / questionnaire.responseLimit) * 100).toFixed(1)}%
                      <span className="text-sm text-gray-500 ml-2">
                        ({questionnaire.totalResponses.toLocaleString()}/{questionnaire.responseLimit.toLocaleString()}人)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 削除確認モーダル */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <AlertTriangle className="text-red-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    アンケート削除の確認
                  </h3>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  このアンケートを削除してもよろしいですか？
                </p>
                <p className="text-sm text-gray-600">
                  削除後は「削除済み」ステータスとなり、管理画面にデフォルト表示されなくなります。
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdvertiserLayout>
  )
}