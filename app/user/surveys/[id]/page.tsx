'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FileText, Coins, CheckCircle, Star } from 'lucide-react'

export default function UserSurveyAnswerPage() {
  const router = useRouter()
  const params = useParams()
  const surveyId = params.id

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // モックデータ
  const survey = {
    id: surveyId,
    title: '新商品に関するアンケート',
    description: 'ユニーの新商品について、ご意見をお聞かせください',
    points: 50,
    estimatedTime: '5分',
    questions: [
      {
        id: 1,
        type: 'multiple',
        question: 'ユニーの商品をどのくらいの頻度で購入しますか？',
        options: ['ほぼ毎日', '週に2-3回', '週に1回', '月に数回', 'あまり利用しない']
      },
      {
        id: 2,
        type: 'multiple',
        question: 'ユニーの新商品についてどのように知りますか？（複数選択可）',
        options: ['店頭のPOP', 'チラシ', 'アプリ通知', 'SNS', '友人・家族'],
        multiple: true
      },
      {
        id: 3,
        type: 'rating',
        question: 'ユニーの商品の品質についてどう思いますか？',
        min: 1,
        max: 5
      },
      {
        id: 4,
        type: 'text',
        question: 'ユニーの新商品に期待することを教えてください'
      },
      {
        id: 5,
        type: 'multiple',
        question: 'どのカテゴリの新商品に興味がありますか？',
        options: ['食品', '日用品', '衣料品', '家電', 'その他']
      },
    ]
  }

  const currentQ = survey.questions[currentQuestion]
  const totalQuestions = survey.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswer = (answer: string | number | string[]) => {
    setAnswers({ ...answers, [currentQ.id]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log('アンケート回答:', answers)
      alert(`アンケートにご協力ありがとうございました！\n${survey.points}ポイントを獲得しました。`)
      router.push('/user/surveys')
    }, 1500)
  }

  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                if (confirm('アンケートを中断しますか？')) {
                  router.back()
                }
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 戻る
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Coins className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-600">{survey.points}P</span>
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-900">{survey.title}</h1>
        </div>

        {/* プログレスバー */}
        <div className="relative h-1 bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-6">
        {/* 質問カウンター */}
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">
            質問 {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          {/* 選択肢（単一選択） */}
          {currentQ.type === 'multiple' && !currentQ.multiple && (
            <div className="space-y-3">
              {currentQ.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    answers[currentQ.id] === option
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answers[currentQ.id] === option && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 選択肢（複数選択） */}
          {currentQ.type === 'multiple' && currentQ.multiple && (
            <div className="space-y-3">
              {currentQ.options?.map((option, index) => {
                const selectedOptions = (answers[currentQ.id] as string[]) || []
                const isSelected = selectedOptions.includes(option)
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isSelected) {
                        handleAnswer(selectedOptions.filter((o: string) => o !== option))
                      } else {
                        handleAnswer([...selectedOptions, option])
                      }
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isSelected && <CheckCircle className="w-5 h-5" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* 評価（星） */}
          {currentQ.type === 'rating' && (
            <div className="flex justify-center gap-2">
              {[...Array(currentQ.max)].map((_, index) => {
                const rating = index + 1
                const isSelected = (answers[currentQ.id] as number || 0) >= rating
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(rating)}
                    className="p-2 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        isSelected ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          )}

          {/* テキスト入力 */}
          {currentQ.type === 'text' && (
            <textarea
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="ご意見をお聞かせください..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 min-h-[120px]"
            />
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex-1 bg-white text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-300"
            >
              前の質問
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isAnswered || isSubmitting}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all shadow-lg ${
              !isAnswered || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                送信中...
              </div>
            ) : currentQuestion < totalQuestions - 1 ? (
              '次の質問'
            ) : (
              '回答を送信'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
