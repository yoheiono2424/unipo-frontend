'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// テストアカウント情報
const TEST_ACCOUNTS = {
  company: {
    email: 'company@example.com',
    password: 'company123',
    label: '企業アカウント',
    route: '/company/home'
  },
  group: {
    email: 'group@example.com',
    password: 'group123',
    label: 'グループアカウント',
    route: '/group/home'
  },
  store: {
    email: 'store@example.com',
    password: 'password123',
    label: '店舗アカウント',
    route: '/store'
  }
}

export default function StoreLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('store@example.com')
  const [password, setPassword] = useState('password123')

  const handleLogin = () => {
    // アカウントタイプに応じて遷移先を変更
    let route = '/store' // デフォルトは店舗

    if (email === TEST_ACCOUNTS.company.email && password === TEST_ACCOUNTS.company.password) {
      route = TEST_ACCOUNTS.company.route
    } else if (email === TEST_ACCOUNTS.group.email && password === TEST_ACCOUNTS.group.password) {
      route = TEST_ACCOUNTS.group.route
    } else if (email === TEST_ACCOUNTS.store.email && password === TEST_ACCOUNTS.store.password) {
      route = TEST_ACCOUNTS.store.route
    }

    router.push(route)
  }

  const handleAccountSelect = (accountType: 'company' | 'group' | 'store') => {
    const account = TEST_ACCOUNTS[accountType]
    setEmail(account.email)
    setPassword(account.password)
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

          {/* テストアカウント情報 */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-3 font-medium">開発用テストアカウント</p>
            <div className="space-y-2">
              {/* 企業アカウント */}
              <button
                type="button"
                onClick={() => handleAccountSelect('company')}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">{TEST_ACCOUNTS.company.label}</p>
                    <p className="text-xs text-gray-600">ID: {TEST_ACCOUNTS.company.email}</p>
                    <p className="text-xs text-gray-600">PASS: {TEST_ACCOUNTS.company.password}</p>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">選択</div>
                </div>
              </button>

              {/* グループアカウント */}
              <button
                type="button"
                onClick={() => handleAccountSelect('group')}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">{TEST_ACCOUNTS.group.label}</p>
                    <p className="text-xs text-gray-600">ID: {TEST_ACCOUNTS.group.email}</p>
                    <p className="text-xs text-gray-600">PASS: {TEST_ACCOUNTS.group.password}</p>
                  </div>
                  <div className="text-xs text-green-600 font-medium">選択</div>
                </div>
              </button>

              {/* 店舗アカウント */}
              <button
                type="button"
                onClick={() => handleAccountSelect('store')}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">{TEST_ACCOUNTS.store.label}</p>
                    <p className="text-xs text-gray-600">ID: {TEST_ACCOUNTS.store.email}</p>
                    <p className="text-xs text-gray-600">PASS: {TEST_ACCOUNTS.store.password}</p>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">選択</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
