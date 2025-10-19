'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Lock, User, Mail, Calendar, UserPlus } from 'lucide-react'

export default function UserRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    nickname: '',
    email: '',
    birthdate: '',
    gender: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // バリデーション
    if (formData.password !== formData.passwordConfirm) {
      alert('パスワードが一致しません')
      return
    }

    if (!formData.agreeToTerms) {
      alert('利用規約に同意してください')
      return
    }

    // モック認証
    console.log('新規登録データ:', formData)
    alert('会員登録が完了しました')
    router.push('/user/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[428px] mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ユニーポ</span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-[428px] mx-auto px-4 py-8">
        {/* ウェルカムメッセージ */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">新規会員登録</h1>
          <p className="text-gray-600">ギフトカードとポイントをゲット</p>
        </div>

        {/* 登録フォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            {/* 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電話番号 <span className="text-red-500">*</span>
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
              <p className="text-xs text-gray-500 mt-1">認証コードを送信します</p>
            </div>

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

            {/* 生年月日 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                生年月日 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
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
                <option value="">選択してください</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
                <option value="no-answer">回答しない</option>
              </select>
            </div>

            {/* パスワード */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                パスワード <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="8文字以上"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* パスワード確認 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                パスワード（確認） <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  placeholder="パスワードを再入力"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* 利用規約同意 */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                <a href="#" className="text-red-500 hover:text-red-600 underline">利用規約</a>
                と
                <a href="#" className="text-red-500 hover:text-red-600 underline">プライバシーポリシー</a>
                に同意します
              </label>
            </div>

            {/* 登録ボタン */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <UserPlus className="w-5 h-5" />
              新規登録
            </button>
          </div>

          {/* ログインへのリンク */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちですか？{' '}
              <button
                type="button"
                onClick={() => router.push('/user/auth/login')}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                ログイン
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
