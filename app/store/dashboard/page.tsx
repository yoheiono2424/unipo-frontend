"use client";

import StoreLayout from "@/components/store/StoreLayout";
import {
  Store,
  CreditCard,
  TrendingUp,
  Users,
  Package,
  QrCode,
} from "lucide-react";

export default function StoreDashboard() {
  const stats = [
    {
      title: "今月の配布数",
      value: "0",
      change: "+0%",
      icon: CreditCard,
      color: "bg-green-500",
    },
    {
      title: "在庫数",
      value: "0",
      change: "残り0枚",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "来店者数",
      value: "0",
      change: "+0%",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "QRスキャン数",
      value: "0",
      change: "+0%",
      icon: QrCode,
      color: "bg-yellow-500",
    },
  ];

  return (
    <StoreLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-sm text-gray-600 mt-1">店舗の状況を確認</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* グラフとお知らせ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* グラフエリア */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">配布実績推移</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-400">グラフエリア（データ接続後に表示）</p>
            </div>
          </div>

          {/* お知らせ */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">お知らせ</h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium">お知らせはありません</p>
                <p className="text-xs text-gray-600 mt-1">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* QRコード表示エリア */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">店舗QRコード</h2>
          <div className="flex items-center justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
              <QrCode className="h-32 w-32 text-gray-300" />
              <p className="text-sm text-gray-500 mt-4 text-center">
                QRコードが生成されます
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}