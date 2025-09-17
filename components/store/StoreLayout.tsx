"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  QrCode,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "ダッシュボード", href: "/store/dashboard", icon: LayoutDashboard },
  { title: "店舗情報", href: "/store/info", icon: Store },
  { title: "QRコード", href: "/store/qrcode", icon: QrCode },
  { title: "ギフトカード管理", href: "/store/giftcards", icon: CreditCard },
  { title: "レポート", href: "/store/reports", icon: FileText },
  { title: "お知らせ", href: "/store/notices", icon: Bell },
];

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          {/* ロゴ */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link href="/store/dashboard" className="text-xl font-bold text-green-600">
              ユニーポ加盟店
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* メニュー */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 店舗情報 */}
          <div className="border-t p-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">店舗名</p>
              <p className="text-xs text-gray-500">（未設定）</p>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="h-5 w-5" />
              <span>ログアウト</span>
            </Link>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">加盟店アカウント</span>
              <div className="h-8 w-8 rounded-full bg-green-500"></div>
            </div>
          </div>
        </header>

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}