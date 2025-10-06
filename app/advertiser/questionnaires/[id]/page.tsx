'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  FileText,
  BarChart,
  Users,
  TrendingUp,
  List
} from 'lucide-react'

export default function AdvertiserQuestionnaireDetailPage() {
  const params = useParams()

  // アンケート詳細データ（モック）
  const questionnaire = {
    id: params.id,
    questionnaireId: 'QST-2025-001',
    title: '春の新生活応援キャンペーン アンケート',
    campaignName: '春の新生活応援キャンペーン',
    campaignId: 'CMP001',
    status: '実施中',
    statusColor: 'bg-green-100 text-green-800',
    createdAt: '2025/01/15',
    startDate: '2025/01/20',
    endDate: '2025/03/31',
    totalQuestions: 5,
    totalResponses: 2456,
    responseRate: '45.2%',
    targetResponses: 5000,
    averageCompletionRate: '92.5%',
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
              <Link
                href="/advertiser/questionnaires/responses"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <List size={20} className="mr-2" />
                回答一覧へ
              </Link>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={20} />
              <span className="text-xs text-green-600 font-medium">進行中</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.totalResponses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">総回答数</div>
            <div className="text-xs text-gray-500 mt-1">目標: {questionnaire.targetResponses.toLocaleString()}</div>
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
              <span className="text-xs text-green-600 font-medium">+2.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.averageCompletionRate}</div>
            <div className="text-sm text-gray-600">平均完了率</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-orange-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{questionnaire.highQualityRate}</div>
            <div className="text-sm text-gray-600">高品質回答率</div>
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
                  <div className="text-sm text-gray-600 mb-1">目標回答数</div>
                  <div className="text-gray-900">{questionnaire.targetResponses.toLocaleString()}件</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">現在の回答数</div>
                  <div className="text-gray-900 font-semibold">{questionnaire.totalResponses.toLocaleString()}件</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  )
}