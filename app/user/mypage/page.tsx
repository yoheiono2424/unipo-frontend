'use client'

import { useRouter } from 'next/navigation'
import { User, ChevronRight, Bell, LogOut, Shield, Lock, FileText, UserX } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserMyPagePage() {
  const router = useRouter()

  const menuSections = [
    {
      title: 'アカウント',
      items: [
        { id: 'profile', label: 'プロフィール編集', icon: User, path: '/user/mypage/edit', color: 'text-blue-500' },
        { id: 'notifications', label: 'お知らせ', icon: Bell, path: '/user/notifications', color: 'text-yellow-500', badge: 3 },
      ]
    },
    {
      title: '設定・その他',
      items: [
        { id: 'password', label: 'パスワード変更', icon: Lock, path: '/user/password/change', color: 'text-gray-600' },
        { id: 'terms', label: '利用規約', icon: FileText, path: '/user/terms', color: 'text-gray-600' },
        { id: 'privacy', label: 'プライバシーポリシー', icon: Shield, path: '/user/privacy', color: 'text-gray-600' },
      ]
    }
  ]

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      console.log('ログアウト')
      router.push('/user/auth/login')
    }
  }

  const handleWithdraw = () => {
    if (confirm('本当に退会しますか？\n退会すると、すべてのポイントやギフトカードが失われます。')) {
      console.log('退会処理')
      // 退会処理を実装
      router.push('/user/auth/login')
    }
  }

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen pb-8">
        {/* プロフィールカード */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">ユニーポ太郎</h2>
                <p className="text-sm text-gray-600">unipo@example.com</p>
              </div>
            </div>

            {/* ポイント表示 */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">1,234</div>
                <div className="text-xs text-gray-600 mt-1">保有ポイント</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-xs text-gray-600 mt-1">ギフトカード</div>
              </div>
            </div>
          </div>
        </div>

        {/* メニューセクション */}
        <div className="px-4 space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">{section.title}</h3>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {section.items.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => router.push(item.path)}
                      className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
                      {item.badge && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ログアウトボタン */}
        <div className="px-4 mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-white text-orange-600 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-colors border border-red-200 flex items-center justify-center gap-2 shadow-md"
          >
            <LogOut className="w-5 h-5" />
            ログアウト
          </button>
        </div>

        {/* 退会ボタン */}
        <div className="px-4 mt-4">
          <button
            onClick={handleWithdraw}
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <UserX className="w-5 h-5" />
            退会する
          </button>
        </div>
      </div>
    </UserLayout>
  )
}
