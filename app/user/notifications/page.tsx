'use client'

import { Bell, Gift, Megaphone, Info, ChevronRight } from 'lucide-react'
import UserLayout from '@/components/user/UserLayout'

export default function UserNotificationsPage() {

  const notifications = [
    {
      id: 1,
      type: 'campaign',
      icon: Megaphone,
      title: '新キャンペーン開始！',
      message: 'ユニー高蔵寺店で使える500円クーポンプレゼント',
      date: '2025/10/19',
      isNew: true,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'giftcard',
      icon: Gift,
      title: 'ギフトカードが届きました',
      message: 'ユニー稲沢店から500円分のギフトカードが届きました',
      date: '2025/10/18',
      isNew: true,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      type: 'point',
      icon: Bell,
      title: 'ポイントを獲得しました',
      message: 'ユニー高蔵寺店で50ポイント獲得しました',
      date: '2025/10/17',
      isNew: true,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'info',
      icon: Info,
      title: 'システムメンテナンスのお知らせ',
      message: '2025/10/20 02:00-05:00の間、システムメンテナンスを実施します',
      date: '2025/10/16',
      isNew: false,
      color: 'text-gray-500'
    },
    {
      id: 5,
      type: 'campaign',
      icon: Megaphone,
      title: 'アンケート回答のお願い',
      message: '新商品に関するアンケートにご協力ください（10ポイント獲得）',
      date: '2025/10/15',
      isNew: false,
      color: 'text-red-500'
    },
  ]

  return (
    <UserLayout>
      <div className="bg-gradient-to-b from-red-50 to-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-[428px] mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">お知らせ</h1>
          </div>
        </div>

        {/* お知らせリスト */}
        <div className="max-w-[428px] mx-auto px-4 py-6 space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden ${
                  notification.isNew ? 'border-2 border-red-200' : ''
                }`}
                onClick={() => console.log('お知らせ詳細:', notification.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {notification.isNew && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* すべて読み込み済み表示 */}
        <div className="max-w-[428px] mx-auto px-4 pb-8">
          <div className="text-center text-sm text-gray-500">
            すべてのお知らせを表示しました
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
