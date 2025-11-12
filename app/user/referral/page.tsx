'use client'

import { useState } from 'react'
import { Users, Copy, Check } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserReferralPage() {
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // モックデータ
  const referralCode = 'UNIPO2025ABC'
  const referralLink = `https://unipo.app/invite/${referralCode}`

  const referrals = [
    { id: 1, name: '友達A', date: '2025/10/15', points: 200, status: 'completed' },
    { id: 2, name: '友達B', date: '2025/10/10', points: 200, status: 'completed' },
    { id: 3, name: '友達C', date: '2025/10/05', points: 200, status: 'completed' },
  ]

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(referralLink)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen pb-8">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">友達紹介</h1>
          </div>
        </div>

        {/* 紹介URL・コード */}
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-4">
          {/* 紹介URL */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-bold text-gray-900 mb-4">あなたの紹介URL</h2>

            {/* URL表示 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">紹介URL</div>
                <div className="text-sm font-mono text-gray-900 break-all px-2">
                  {referralLink}
                </div>
              </div>
            </div>

            {/* URLコピーボタン */}
            <button
              onClick={handleCopyUrl}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                copiedUrl
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {copiedUrl ? (
                <>
                  <Check className="w-5 h-5" />
                  コピー完了
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  URLをコピー
                </>
              )}
            </button>
          </div>

          {/* 招待コード */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-bold text-gray-900 mb-4">あなたの招待コード</h2>

            {/* コード表示 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">招待コード</div>
                <div className="text-3xl font-bold text-gray-900 tracking-wider">
                  {referralCode}
                </div>
              </div>
            </div>

            {/* コードコピーボタン */}
            <button
              onClick={handleCopyCode}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                copiedCode
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {copiedCode ? (
                <>
                  <Check className="w-5 h-5" />
                  コピー完了
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  コードをコピー
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
