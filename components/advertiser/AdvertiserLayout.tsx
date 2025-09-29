'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Megaphone,
  ChartBar,
  FileQuestion,
  Receipt,
  Bell,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface AdvertiserLayoutProps {
  children: React.ReactNode
}

export default function AdvertiserLayout({ children }: AdvertiserLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const menuItems = [
    {
      title: '広告キャンペーン管理',
      href: '/advertiser/campaigns',
      icon: Megaphone
    },
    {
      title: '配布実績管理',
      href: '/advertiser/distributions',
      icon: ChartBar
    },
    {
      title: 'アンケート管理',
      href: '/advertiser/questionnaires',
      icon: FileQuestion
    },
    {
      title: '請求管理',
      href: '/advertiser/invoices',
      icon: Receipt
    },
    {
      title: 'お知らせ',
      href: '/advertiser/notices',
      icon: Bell
    },
    {
      title: 'システム設定',
      href: '/advertiser/settings',
      icon: LayoutDashboard
    },
    {
      title: 'アカウント設定',
      href: '/advertiser/account',
      icon: User
    }
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* ロゴエリア */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/advertiser/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              {isSidebarOpen && (
                <span className="text-xl font-bold text-gray-800">ユニーポ</span>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* メニュー項目 */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <item.icon size={20} />
                    {isSidebarOpen && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* フッター */}
          <div className="p-4 border-t">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
              <div className="text-sm text-gray-600 mb-3">広告主アカウント</div>
              <div className="space-y-2">
                <Link
                  href="/advertiser/profile"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <User size={18} />
                  <span className="text-sm">プロフィール</span>
                </Link>
                <button
                  onClick={() => {
                    // ログアウト処理
                    window.location.href = '/advertiser/login'
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left text-red-600"
                >
                  <LogOut size={18} />
                  <span className="text-sm">ログアウト</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">広告主管理画面</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* 通知アイコン */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* ユーザー情報 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-700">株式会社サンプル</div>
                  <div className="text-gray-500 text-xs">advertiser@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}