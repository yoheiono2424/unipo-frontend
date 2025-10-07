'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StoreLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('store@example.com')
  const [password, setPassword] = useState('password123')

  const handleLogin = () => {
    // TODO: 実際の認証処理
    router.push('/store')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[428px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">店舗ログイン</h1>
          <p className="text-sm text-gray-600">アカウント情報を入力してください</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
              placeholder="store@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors mt-6"
          >
            ログイン
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              パスワードを忘れた方
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
