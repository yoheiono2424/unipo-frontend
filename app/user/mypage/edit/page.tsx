'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, User, Mail, Phone, Save } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserProfileEditPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nickname: 'ユニーポ太郎',
    email: 'unipo@example.com',
    phone: '090-1234-5678',
    birthdate: '1990-01-01',
    gender: 'male'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('更新データ:', formData)
    alert('プロフィールを更新しました')
    router.push('/user/mypage')
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-900">プロフィール編集</h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* プロフィール写真 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500">写真をタップして変更</p>
            </div>
          </div>

          {/* 基本情報 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            {/* ニックネーム */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ニックネーム <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="ユニーポ太郎"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>

            {/* メールアドレス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            {/* 電話番号（変更不可） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電話番号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">電話番号は変更できません</p>
            </div>

            {/* 生年月日 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                生年月日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            {/* 性別 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                性別
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
              >
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
                <option value="no-answer">回答しない</option>
              </select>
            </div>
          </div>

          {/* 保存ボタン */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-5 h-5" />
            変更を保存
          </button>

          {/* キャンセルボタン */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-300"
          >
            キャンセル
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  )
}
