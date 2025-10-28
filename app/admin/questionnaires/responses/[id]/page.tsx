'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, User, Calendar, FileText, MessageSquare } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

function ResponseDetailContent({ params }: PageProps) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const questionnaireId = searchParams.get('questionnaireId') || '1'

  // アンケート回答詳細データ（モック）
  const responseDetail = {
    id: id,
    responseId: `RSP-${id.padStart(5, '0')}`,
    responseDate: '2025/01/29',
    responseTime: '10:30',
    questionnaireTitle: '新商品に関するアンケート',
    userId: 'USR-12345',
    userName: '田中 太郎',
    userAge: '25-34歳',
    userGender: '男性',
    campaignName: '春の新生活応援キャンペーン',
    storeName: 'イオンモール幕張新都心',
    questions: [
      {
        id: 1,
        questionText: '当店のサービスについて、どのように感じましたか？',
        questionType: '単数選択',
        answer: '非常に満足'
      },
      {
        id: 2,
        questionText: '今後利用したい商品やサービスについて教えてください。',
        questionType: '自由記述',
        answer: '新しい季節商品や限定商品の情報をもっと知りたいです。特に春夏シーズンの新作が楽しみです。'
      },
      {
        id: 3,
        questionText: '当店をどのように知りましたか？（複数選択可）',
        questionType: '複数選択',
        answer: 'SNS広告, 友人・知人の紹介'
      },
      {
        id: 4,
        questionText: '商品の品質についてどう思いますか？',
        questionType: '単数選択',
        answer: '満足'
      },
      {
        id: 5,
        questionText: '改善してほしい点があれば教えてください。',
        questionType: '自由記述',
        answer: '店舗の営業時間をもう少し延長してほしいです。'
      }
    ]
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href={`/admin/questionnaires/responses?questionnaireId=${questionnaireId}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">アンケート回答詳細</h1>
          </div>
          <p className="text-gray-600 ml-14">アンケート回答の詳細情報を確認できます</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 text-blue-600" size={20} />
                基本情報
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-600 mb-1">回答日時</div>
                  <div className="text-base font-medium text-gray-900">
                    {responseDetail.responseDate} {responseDetail.responseTime}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-600 mb-1">回答ID</div>
                  <div className="text-base font-medium text-gray-900">{responseDetail.responseId}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors md:col-span-2">
                  <div className="text-sm text-gray-600 mb-1">タイトル</div>
                  <div className="text-base font-medium text-gray-900">{responseDetail.questionnaireTitle}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-600 mb-1">会員ID</div>
                  <div className="text-base font-medium text-gray-900">{responseDetail.userId}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-600 mb-1">会員名</div>
                  <div className="text-base font-medium text-gray-900">{responseDetail.userName}</div>
                </div>
              </div>
            </div>

            {/* 質問と回答 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="mr-2 text-blue-600" size={20} />
                質問と回答
              </h2>
              <div className="space-y-6">
                {responseDetail.questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2">
                            質問 {index + 1}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                            {question.questionType}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-2">{question.questionText}</p>
                    </div>
                    <div className="pl-4 border-l-4 border-blue-200">
                      <div className="text-sm text-gray-600 mb-1">回答内容</div>
                      <p className="text-base text-gray-900 whitespace-pre-wrap">{question.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 回答者情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 text-blue-600" size={20} />
                回答者情報
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">会員ID</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.userId}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">氏名</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.userName}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">年齢層</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.userAge}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">性別</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.userGender}</div>
                </div>
              </div>
            </div>

            {/* 関連情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-600" size={20} />
                関連情報
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">キャンペーン</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.campaignName}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">店舗</div>
                  <div className="text-sm font-medium text-gray-900">{responseDetail.storeName}</div>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Link
                href={`/admin/questionnaires/responses?questionnaireId=${questionnaireId}`}
                className="w-full block text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                回答一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminQuestionnaireResponseDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="p-6">読み込み中...</div>}>
      <ResponseDetailContent params={params} />
    </Suspense>
  )
}
