'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Clock, Coins, ChevronRight, CheckCircle } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserSurveysPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available')

  const availableSurveys = [
    {
      id: 1,
      title: '新商品に関するアンケート',
      description: 'ユニーの新商品について、ご意見をお聞かせください',
      points: 50,
      estimatedTime: '5分',
      deadline: '2025/10/31',
      questions: 10
    },
    {
      id: 2,
      title: '店舗サービスに関するアンケート',
      description: '店舗のサービス向上のため、ご協力をお願いします',
      points: 30,
      estimatedTime: '3分',
      deadline: '2025/11/15',
      questions: 8
    },
    {
      id: 3,
      title: 'ユニーポアプリに関するアンケート',
      description: 'アプリの改善のため、ご意見をお聞かせください',
      points: 100,
      estimatedTime: '10分',
      deadline: '2025/11/30',
      questions: 15
    },
  ]

  const completedSurveys = [
    {
      id: 4,
      title: '秋の新商品アンケート',
      description: '秋の新商品についてのアンケート',
      points: 50,
      completedDate: '2025/10/15',
      earnedPoints: 50
    },
    {
      id: 5,
      title: '店舗満足度調査',
      description: '店舗満足度に関するアンケート',
      points: 30,
      completedDate: '2025/10/10',
      earnedPoints: 30
    },
  ]

  const totalEarnedPoints = completedSurveys.reduce((sum, survey) => sum + survey.earnedPoints, 0)

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">アンケート</h1>
          </div>
        </div>

        {/* 獲得ポイントカード */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">アンケートで獲得したポイント</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold">{totalEarnedPoints}</span>
              <span className="text-xl font-medium opacity-90">ポイント</span>
            </div>
            <div className="text-sm opacity-75">
              回答済み: {completedSurveys.length}件
            </div>
          </div>
        </div>

        {/* タブ */}
        <div className="max-w-[428px] mx-auto px-4">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'available'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              回答可能 ({availableSurveys.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'completed'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              回答済み ({completedSurveys.length})
            </button>
          </div>
        </div>

        {/* アンケート一覧 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          {activeTab === 'available' && (
            <div className="space-y-3">
              {availableSurveys.map((survey) => (
                <div
                  key={survey.id}
                  onClick={() => router.push(`/user/surveys/${survey.id}`)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden border-l-4 border-blue-500"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1">{survey.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                              <Coins className="w-3 h-3" />
                              {survey.points}P
                            </div>
                            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              <Clock className="w-3 h-3" />
                              約{survey.estimatedTime}
                            </div>
                            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              <FileText className="w-3 h-3" />
                              {survey.questions}問
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            期限: {survey.deadline}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-3">
              {completedSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden opacity-75 border-l-4 border-gray-300"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{survey.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <Coins className="w-3 h-3" />
                            +{survey.earnedPoints}P 獲得済み
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          回答日: {survey.completedDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
