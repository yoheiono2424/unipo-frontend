'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Lock, LogIn } from 'lucide-react'

export default function UserLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '090-1234-5678',
    password: 'password123'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // モック認証
    console.log('ログインデータ:', formData)
    alert('ログインしました')
    router.push('/user/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[428px] mx-auto px-4 py-4 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ユニーポ</span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* ウェルカムメッセージ */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ログイン</h1>
            <p className="text-gray-600">アカウントにログイン</p>
          </div>

          {/* ログインフォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              {/* 電話番号入力 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="090-1234-5678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* パスワード入力 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="パスワードを入力"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* ログインボタン */}
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                ログイン
              </button>
            </div>

            {/* パスワードを忘れた */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                パスワードをお忘れですか？
              </button>
            </div>

            {/* 新規登録へのリンク */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                アカウントをお持ちでないですか？{' '}
                <button
                  type="button"
                  onClick={() => router.push('/user/auth/register')}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  新規登録
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
