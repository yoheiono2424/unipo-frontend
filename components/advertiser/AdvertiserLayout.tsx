"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  BarChart,
  FileText,
  DollarSign,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "ダッシュボード", href: "/advertiser/dashboard", icon: LayoutDashboard },
  { title: "キャンペーン管理", href: "/advertiser/campaigns", icon: Megaphone },
  { title: "配布実績", href: "/advertiser/distributions", icon: FileText },
  { title: "アンケート結果", href: "/advertiser/questionnaires", icon: BarChart },
  { title: "請求管理", href: "/advertiser/invoices", icon: DollarSign },
];

export default function AdvertiserLayout({ children }: { children: React.ReactNode }) {
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
            <Link href="/advertiser/dashboard" className="text-xl font-bold text-purple-600">
              ユニーポ広告主
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
                        ? "bg-purple-50 text-purple-600"
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

          {/* 企業情報 */}
          <div className="border-t p-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">企業名</p>
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
              <span className="text-sm text-gray-600">広告主アカウント</span>
              <div className="h-8 w-8 rounded-full bg-purple-500"></div>
            </div>
          </div>
        </header>

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}