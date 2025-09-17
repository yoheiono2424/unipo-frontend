"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  QrCode,
  Gift,
  Star,
  User,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "ホーム", href: "/user/home", icon: Home },
  { title: "店舗検索", href: "/user/stores", icon: Search },
  { title: "QRスキャン", href: "/user/qrscan", icon: QrCode },
  { title: "ギフトカード", href: "/user/giftcards", icon: Gift },
  { title: "ポイント", href: "/user/points", icon: Star },
  { title: "マイページ", href: "/user/profile", icon: User },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー（モバイル） */}
      <header className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/user/home" className="text-xl font-bold text-blue-600">
            ユニーポ
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-white pt-16">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <span>ログアウト</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* デスクトップサイドバー */}
      <div className="hidden lg:flex">
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-4 border-b">
              <Link href="/user/home" className="text-xl font-bold text-blue-600">
                ユニーポ
              </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-600"
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
            <div className="border-t p-4">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">ゲストユーザー</p>
                <p className="text-xs text-gray-500">ポイント: 0pt</p>
              </div>
              <Link
                href="/"
                className="flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                ログアウト
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className={`${mobileMenuOpen ? 'hidden' : 'block'} pt-16 lg:pt-0 lg:ml-64`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* ボトムナビゲーション（モバイル） */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="grid grid-cols-5 h-16">
          {menuItems.slice(0, 5).map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive(item.href)
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}