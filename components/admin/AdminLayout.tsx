"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  Building,
  UserCog,
  Megaphone,
  CreditCard,
  Gift,
  FileText,
  Package,
  Folder,
  MapPin,
  Briefcase,
  Bell,
  Settings,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type MenuItem = {
  title: string;
  href?: string;
  icon: any;
  children?: { title: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { title: "ダッシュボード", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "会員管理", href: "/admin/members", icon: Users },
  { title: "加盟店管理", href: "/admin/stores", icon: Store },
  { title: "広告主管理", href: "/admin/advertisers", icon: Building },
  { title: "代理店管理", href: "/admin/agencies", icon: UserCog },
  {
    title: "キャンペーン管理",
    icon: Megaphone,
    children: [
      { title: "キャンペーンプラン一覧", href: "/admin/campaign-plans" },
      { title: "キャンペーンプラン作成", href: "/admin/campaign-plans/create" },
      { title: "広告キャンペーン一覧", href: "/admin/campaigns" },
      { title: "広告キャンペーン詳細", href: "/admin/campaigns/detail" },
    ],
  },
  {
    title: "ギフトカード管理",
    icon: CreditCard,
    children: [
      { title: "ギフトカード一覧", href: "/admin/gift-cards" },
      { title: "ギフトカード割り当て", href: "/admin/gift-cards/assign" },
    ],
  },
  {
    title: "配布管理",
    icon: Gift,
    children: [
      { title: "配布実績作成", href: "/admin/distributions/create" },
      { title: "配布履歴詳細", href: "/admin/distributions/detail" },
    ],
  },
  {
    title: "請求管理",
    icon: FileText,
    children: [
      { title: "請求一覧", href: "/admin/invoices" },
      { title: "請求作成", href: "/admin/invoices/create" },
    ],
  },
  {
    title: "ポイント交換商品",
    icon: Package,
    children: [
      { title: "商品一覧", href: "/admin/point-items" },
      { title: "商品作成", href: "/admin/point-items/create" },
      { title: "商品編集", href: "/admin/point-items/edit" },
    ],
  },
  {
    title: "マスタ管理",
    icon: Folder,
    children: [
      { title: "カテゴリ管理", href: "/admin/categories" },
      { title: "エリア管理", href: "/admin/areas" },
      { title: "業種管理", href: "/admin/industries" },
    ],
  },
  {
    title: "お知らせ管理",
    icon: Bell,
    children: [
      { title: "お知らせ一覧", href: "/admin/notices" },
      { title: "お知らせ作成", href: "/admin/notices/create" },
    ],
  },
  { title: "システム設定", href: "/admin/settings", icon: Settings },
  { title: "ログ管理", href: "/admin/logs", icon: FileSpreadsheet },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const isParentActive = (children?: { href: string }[]) => {
    if (!children) return false;
    return children.some((child) => pathname.startsWith(child.href));
  };

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
            <Link href="/admin/dashboard" className="text-xl font-bold text-indigo-600">
              ユニーポ管理
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
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isParentActive(item.children)
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {expandedItems.includes(item.title) && item.children && (
                        <ul className="mt-1 ml-8 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                  isActive(child.href)
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ログアウト */}
          <div className="border-t p-4">
            <Link
              href="/admin/login"
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
              <span className="text-sm text-gray-600">管理者</span>
              <div className="h-8 w-8 rounded-full bg-indigo-500"></div>
            </div>
          </div>
        </header>

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}