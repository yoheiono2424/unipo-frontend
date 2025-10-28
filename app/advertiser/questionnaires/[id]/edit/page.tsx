'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react'
import Link from 'next/link'

type QuestionType = 'free_text' | 'single_choice' | 'multiple_choice'

interface Question {
  id: number
  title: string
  type: QuestionType
  options: string[]
  isExpanded: boolean
}

export default function AdvertiserQuestionnaireEditPage() {
  const router = useRouter()
  const params = useParams()

  // 基本情報
  const [title, setTitle] = useState('')
  const [points, setPoints] = useState('')
  const [responseLimit, setResponseLimit] = useState('')
  const [campaignId, setCampaignId] = useState('')
  const [description, setDescription] = useState('')

  // 質問リスト
  const [questions, setQuestions] = useState<Question[]>([])

  // ポップアップ制御
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)

  // ポップアップ内のフォーム
  const [modalQuestionTitle, setModalQuestionTitle] = useState('')
  const [modalQuestionType, setModalQuestionType] = useState<QuestionType>('free_text')
  const [modalOptions, setModalOptions] = useState<string[]>([''])

  // キャンペーンリスト（モック）
  const campaigns = [
    { id: 'CMP001', name: '春の新生活応援キャンペーン' },
    { id: 'CMP002', name: '母の日感謝キャンペーン' },
    { id: 'CMP003', name: 'ゴールデンウィーク特別企画' }
  ]

  // 既存データの読み込み（モック）
  useEffect(() => {
    // 実際にはここでAPIから既存データを取得
    setTitle('春の新生活応援キャンペーン アンケート')
    setPoints('50')
    setResponseLimit('500')
    setCampaignId('CMP001')
    setDescription('このアンケートは、春の新生活応援キャンペーンに参加されたお客様を対象に、商品・サービスの満足度や改善点についてお伺いするものです。')
    setQuestions([
      {
        id: 1,
        title: '今回のギフトカードをどのように知りましたか？',
        type: 'single_choice',
        options: ['店頭のポスター', 'SNS', '友人・知人の紹介', 'その他'],
        isExpanded: false
      },
      {
        id: 2,
        title: '商品・サービスの満足度を教えてください',
        type: 'single_choice',
        options: ['とても満足', '満足', 'どちらでもない', '不満', 'とても不満'],
        isExpanded: false
      },
      {
        id: 3,
        title: '改善してほしい点があれば教えてください',
        type: 'free_text',
        options: [],
        isExpanded: false
      }
    ])
  }, [params.id])

  // 質問追加ボタン
  const handleAddQuestion = () => {
    setEditingQuestionId(null)
    setModalQuestionTitle('')
    setModalQuestionType('free_text')
    setModalOptions([''])
    setShowQuestionModal(true)
  }

  // 質問編集ボタン
  const handleEditQuestion = (question: Question) => {
    setEditingQuestionId(question.id)
    setModalQuestionTitle(question.title)
    setModalQuestionType(question.type)
    setModalOptions(question.options.length > 0 ? question.options : [''])
    setShowQuestionModal(true)
  }

  // 質問削除
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  // 質問の開閉切り替え
  const toggleQuestionExpand = (id: number) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, isExpanded: !q.isExpanded } : q
    ))
  }

  // 選択肢追加
  const handleAddOption = () => {
    setModalOptions([...modalOptions, ''])
  }

  // 選択肢削除
  const handleRemoveOption = (index: number) => {
    setModalOptions(modalOptions.filter((_, i) => i !== index))
  }

  // 選択肢変更
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...modalOptions]
    newOptions[index] = value
    setModalOptions(newOptions)
  }

  // 質問保存
  const handleSaveQuestion = () => {
    if (!modalQuestionTitle.trim()) {
      alert('質問タイトルを入力してください')
      return
    }

    const filteredOptions = modalQuestionType !== 'free_text'
      ? modalOptions.filter(opt => opt.trim() !== '')
      : []

    if (editingQuestionId !== null) {
      // 編集
      setQuestions(questions.map(q =>
        q.id === editingQuestionId
          ? { ...q, title: modalQuestionTitle, type: modalQuestionType, options: filteredOptions }
          : q
      ))
    } else {
      // 新規追加
      const newQuestion: Question = {
        id: Date.now(),
        title: modalQuestionTitle,
        type: modalQuestionType,
        options: filteredOptions,
        isExpanded: false
      }
      setQuestions([...questions, newQuestion])
    }

    setShowQuestionModal(false)
  }

  // アンケート更新（公開）
  const handlePublish = () => {
    if (!title.trim()) {
      alert('タイトルを入力してください')
      return
    }
    if (!points.trim()) {
      alert('付与ポイント数を入力してください')
      return
    }
    if (!campaignId) {
      alert('キャンペーンIDを選択してください')
      return
    }
    if (questions.length === 0) {
      alert('質問を1つ以上追加してください')
      return
    }

    // 実際にはここでAPIにデータを送信（ステータス：公開）
    alert('アンケートを更新して公開しました')
    router.push(`/advertiser/questionnaires/${params.id}`)
  }

  // アンケート下書き保存
  const handleSaveDraft = () => {
    if (!title.trim()) {
      alert('タイトルを入力してください')
      return
    }
    if (!points.trim()) {
      alert('付与ポイント数を入力してください')
      return
    }
    if (!campaignId) {
      alert('キャンペーンIDを選択してください')
      return
    }
    if (questions.length === 0) {
      alert('質問を1つ以上追加してください')
      return
    }

    // 実際にはここでAPIにデータを送信（ステータス：下書き）
    alert('下書きとして保存しました')
    router.push(`/advertiser/questionnaires/${params.id}`)
  }

  // 回答形式の表示名
  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'free_text': return '自由記述'
      case 'single_choice': return '単数選択'
      case 'multiple_choice': return '複数選択'
    }
  }

  return (
    <AdvertiserLayout>
      <div className="p-6">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href={`/advertiser/questionnaires/${params.id}`}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">アンケート編集</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* 基本情報 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="アンケートのタイトルを入力"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  付与ポイント数
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="例: 50"
                />
              </div>

              {/* 回答人数上限（新規追加） */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  回答人数上限
                </label>
                <input
                  type="number"
                  value={responseLimit}
                  onChange={(e) => setResponseLimit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="未入力の場合は無制限"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キャンペーンID
                </label>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">選択してください</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.id} - {campaign.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  rows={4}
                  placeholder="アンケートの説明を入力"
                />
              </div>
            </div>
          </div>

          {/* 質問管理 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">質問管理</h2>
              <button
                onClick={handleAddQuestion}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={18} className="mr-2" />
                質問追加
              </button>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                質問を追加してください
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 flex items-start">
                        <button
                          onClick={() => toggleQuestionExpand(question.id)}
                          className="mr-3 p-1 hover:bg-gray-100 rounded"
                        >
                          {question.isExpanded ? (
                            <ChevronDown size={20} className="text-gray-600" />
                          ) : (
                            <ChevronRight size={20} className="text-gray-600" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                              {getTypeLabel(question.type)}
                            </span>
                          </div>
                          <div className="font-medium text-gray-900">
                            質問タイトル{index + 1}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {question.title}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditQuestion(question)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit2 size={18} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Trash2 size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {question.isExpanded && question.options.length > 0 && (
                      <div className="mt-4 pl-9">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          選択肢
                        </div>
                        <div className="space-y-1">
                          {question.options.map((option, idx) => (
                            <div key={idx} className="text-sm text-gray-600 pl-4">
                              • {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 更新ボタン */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSaveDraft}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition-colors"
            >
              下書き保存
            </button>
            <button
              onClick={handlePublish}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              更新して公開
            </button>
          </div>
        </div>

        {/* 質問作成/編集モーダル */}
        {showQuestionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingQuestionId !== null ? '質問を編集' : '質問を作成'}
                </h3>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    質問タイトル
                  </label>
                  <input
                    type="text"
                    value={modalQuestionTitle}
                    onChange={(e) => setModalQuestionTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="質問を入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    回答形式
                  </label>
                  <select
                    value={modalQuestionType}
                    onChange={(e) => setModalQuestionType(e.target.value as QuestionType)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="free_text">自由記述</option>
                    <option value="single_choice">単数選択</option>
                    <option value="multiple_choice">複数選択</option>
                  </select>
                </div>

                {(modalQuestionType === 'single_choice' || modalQuestionType === 'multiple_choice') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      選択肢
                    </label>
                    <div className="space-y-2">
                      {modalOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            placeholder={`選択肢${index + 1}`}
                          />
                          {modalOptions.length > 1 && (
                            <button
                              onClick={() => handleRemoveOption(index)}
                              className="p-2 hover:bg-gray-100 rounded"
                            >
                              <Trash2 size={18} className="text-gray-600" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={handleAddOption}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus size={16} className="mr-1" />
                        選択肢を追加
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowQuestionModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleSaveQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdvertiserLayout>
  )
}
