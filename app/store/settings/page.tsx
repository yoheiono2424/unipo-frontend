'use client'

import StoreLayout from '@/components/store/StoreLayout'
import StoreHeader from '@/components/store/StoreHeader'
import { useState } from 'react'

export default function StoreSettingsPage() {
  const [email, setEmail] = useState('store@example.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleEmailUpdate = () => {
    alert('メールアドレスを更新しました')
  }

  const handlePasswordUpdate = () => {
    if (currentPassword && newPassword) {
      alert('パスワードを更新しました')
      setCurrentPassword('')
      setNewPassword('')
    } else {
      alert('すべての項目を入力してください')
    }
  }

  return (
    <StoreLayout>
      <StoreHeader title="設定" showBackButton={false} />

      <div className="p-4 space-y-6 pb-20">
        {/* メールアドレス変更 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">メールアドレス</h3>

          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />

            <button
              onClick={handleEmailUpdate}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              変更
            </button>
          </div>
        </div>

        {/* パスワード変更 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">パスワード変更</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                現在のパスワード
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                変更後のパスワード
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handlePasswordUpdate}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-1"
            >
              変更
            </button>
          </div>
        </div>

        {/* ログアウト */}
        <div className="pt-2 text-center">
          <button className="text-red-600 font-medium py-2 hover:text-red-700 transition-colors">
            ログアウト
          </button>
        </div>
      </div>
    </StoreLayout>
  )
}
