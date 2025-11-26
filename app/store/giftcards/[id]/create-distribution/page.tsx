'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Users, Calendar, FileText } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

interface Member {
  id: string
  number: string
  name: string
  age: number
  gender: string
}

export default function CreateDistributionPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'member' | 'other'>('member')

  // 会員配布タブの状態
  const [memberNumber, setMemberNumber] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  // その他配布タブの状態
  const [distributionCount, setDistributionCount] = useState('1')

  // 共通の状態
  const [distributionDate, setDistributionDate] = useState('')
  const [memo, setMemo] = useState('')

  // モックデータ：ギフトカード情報
  const campaign = {
    id: id,
    name: '春の新生活応援キャンペーン',
    stock: 45,
    distributed: 155,
    faceValue: 500
  }

  // モックデータ：会員一覧
  const mockMembers = [
    { id: 'M001', number: 'USR-12345', name: '田中 太郎', age: 28, gender: '男性' },
    { id: 'M002', number: 'USR-67890', name: '佐藤 花子', age: 35, gender: '女性' },
    { id: 'M003', number: 'USR-11223', name: '鈴木 一郎', age: 42, gender: '男性' },
    { id: 'M004', number: 'USR-44556', name: '山田 美咲', age: 31, gender: '女性' },
    { id: 'M005', number: 'USR-77889', name: '高橋 健太', age: 26, gender: '男性' }
  ]

  // 現在日時を初期値として設定
  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    setDistributionDate(`${year}-${month}-${day}T${hours}:${minutes}`)
  }, [])

  // リアルタイム会員番号検索
  useEffect(() => {
    if (memberNumber.trim() === '') {
      setSearchResults([])
      setSelectedMember(null)
      return
    }

    const results = mockMembers.filter(member =>
      member.number.toLowerCase().includes(memberNumber.toLowerCase())
    )
    setSearchResults(results)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberNumber])

  // 会員選択
  const handleSelectMember = (member: Member) => {
    setSelectedMember(member)
    setMemberNumber(member.number)
    setSearchResults([])
  }

  // 登録処理
  const handleSubmit = () => {
    // 在庫チェック
    const count = activeTab === 'member' ? 1 : parseInt(distributionCount)
    if (count > campaign.stock) {
      alert('在庫数を超える配布枚数は登録できません')
      return
    }

    // 会員配布タブの場合、会員が選択されているかチェック
    if (activeTab === 'member' && !selectedMember) {
      alert('会員を選択してください')
      return
    }

    // 登録処理（実際はAPIコール）
    if (activeTab === 'member' && selectedMember) {
      alert(`会員配布を登録しました\n会員: ${selectedMember.name}\n配布枚数: 1枚`)
    } else {
      alert(`その他配布を登録しました\n配布枚数: ${count}枚`)
    }

    // ギフトカード詳細画面に戻る
    router.push(`/store/giftcards/${id}`)
  }

  return (
    <StoreLayout>
      <StoreHeader title="配布実績作成" />

      <div className="p-4 space-y-6 pb-20">
        {/* キャンペーン情報 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-xs text-gray-500 mb-1">キャンペーン名</div>
          <div className="text-sm text-gray-900 font-medium mb-3">{campaign.name}</div>
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-500">在庫数：</span>
              <span className="text-gray-900 font-semibold">{campaign.stock}枚</span>
            </div>
            <div>
              <span className="text-gray-500">額面：</span>
              <span className="text-gray-900 font-semibold">¥{campaign.faceValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* タブ */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('member')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'member'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User size={18} />
                <span>会員配布</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'other'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users size={18} />
                <span>その他配布</span>
              </div>
            </button>
          </div>

          <div className="p-5 space-y-5">
            {activeTab === 'member' ? (
              // 会員配布タブ
              <>
                {/* 会員番号検索 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会員番号
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={memberNumber}
                      onChange={(e) => setMemberNumber(e.target.value)}
                      placeholder="会員番号を入力"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                    />

                    {/* 検索候補 */}
                    {searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {searchResults.map((member) => (
                          <button
                            key={member.id}
                            onClick={() => handleSelectMember(member)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="text-sm font-medium text-gray-900">{member.number}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 選択された会員 */}
                  {selectedMember && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="text-sm font-medium text-gray-900">{selectedMember.name}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {selectedMember.number} · {selectedMember.age}歳 · {selectedMember.gender}
                      </div>
                    </div>
                  )}
                </div>

                {/* 配布枚数（固定） */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布枚数
                  </label>
                  <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 font-medium">
                    1枚（固定）
                  </div>
                </div>
              </>
            ) : (
              // その他配布タブ
              <>
                {/* 配布枚数 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布枚数 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={campaign.stock}
                      value={distributionCount}
                      onChange={(e) => setDistributionCount(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium"
                    />
                    <span className="text-sm text-gray-600">枚</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    在庫数: {campaign.stock}枚まで入力可能
                  </div>
                </div>
              </>
            )}

            {/* 配布日時（共通） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                配布日時 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="datetime-local"
                  value={distributionDate}
                  onChange={(e) => setDistributionDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                />
              </div>
            </div>

            {/* メモ（共通・任意） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メモ（任意）
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="配布に関するメモを入力"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 登録ボタン */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/store/giftcards/${id}`)}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors active:scale-[0.98]"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          >
            登録する
          </button>
        </div>
      </div>
    </StoreLayout>
  )
}
