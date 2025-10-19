'use client'

import { useState } from 'react'
import { Users, Copy, Check, Key, Sparkles } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserReferralPage() {
  const [copied, setCopied] = useState(false)
  const [friendCode, setFriendCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // モックデータ
  const referralCode = 'UNIPO2025ABC'
  const referralLink = `https://unipo.app/invite/${referralCode}`

  const referrals = [
    { id: 1, name: '友達A', date: '2025/10/15', points: 200, status: 'completed' },
    { id: 2, name: '友達B', date: '2025/10/10', points: 200, status: 'completed' },
    { id: 3, name: '友達C', date: '2025/10/05', points: 200, status: 'completed' },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitFriendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // モック処理
    setTimeout(() => {
      console.log('友達の招待コード:', friendCode)
      alert('招待コードを登録しました！\n200ポイント獲得しました。')
      setIsSubmitting(false)
      setFriendCode('')
    }, 1500)
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen pb-8">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">友達紹介</h1>
          </div>
        </div>

        {/* 友達の招待コード入力 */}
        <div className="max-w-[428px] mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-500" />
              友達の招待コードを入力
            </h2>
            <form onSubmit={handleSubmitFriendCode} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
                  placeholder=""
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-center text-lg font-mono tracking-wider"
                  required
                  maxLength={12}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || friendCode.length < 10}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isSubmitting || friendCode.length < 10
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    登録中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    招待コードを登録
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 紹介コード */}
        <div className="max-w-[428px] mx-auto px-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-bold text-gray-900 mb-4">あなたの紹介コード</h2>

            {/* コード表示 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">紹介コード</div>
                <div className="text-3xl font-bold text-gray-900 tracking-wider">
                  {referralCode}
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <button
              onClick={handleCopy}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  コピー完了
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  コピー
                </>
              )}
            </button>
          </div>
        </div>

        {/* 紹介履歴 */}
        <div className="max-w-[428px] mx-auto px-4">
          <h2 className="font-bold text-gray-900 mb-4">紹介履歴</h2>
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{referral.name}</div>
                      <div className="text-xs text-gray-500">{referral.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">+{referral.points}P</div>
                    <div className="text-xs text-gray-500">{referral.status === 'completed' ? '完了' : '保留中'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
