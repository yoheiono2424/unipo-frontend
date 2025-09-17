"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
  Store,
  Building,
  CreditCard,
  TrendingUp,
  Activity,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "総会員数",
      value: "0",
      change: "+0%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "加盟店数",
      value: "0",
      change: "+0%",
      icon: Store,
      color: "bg-green-500",
    },
    {
      title: "広告主数",
      value: "0",
      change: "+0%",
      icon: Building,
      color: "bg-purple-500",
    },
    {
      title: "ギフトカード配布数",
      value: "0",
      change: "+0%",
      icon: CreditCard,
      color: "bg-yellow-500",
    },
  ];

  const recentActivities = [
    { id: 1, type: "新規会員登録", description: "データなし", time: "-" },
    { id: 2, type: "加盟店追加", description: "データなし", time: "-" },
    { id: 3, type: "キャンペーン作成", description: "データなし", time: "-" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-sm text-gray-600 mt-1">システム全体の状況を確認</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* グラフとアクティビティ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* グラフエリア */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">月間推移</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-400">グラフエリア（データ接続後に表示）</p>
            </div>
          </div>

          {/* 最近のアクティビティ */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">最近のアクティビティ</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded"
                >
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* システムステータス */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">システムステータス</h3>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">稼働率</span>
                <span className="text-sm font-medium">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">レスポンス時間</span>
                <span className="text-sm font-medium">-ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">エラー率</span>
                <span className="text-sm font-medium">0%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">今月の売上</h3>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">¥0</p>
              <p className="text-sm text-gray-600">前月比: +0%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">目標達成率: 0%</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">アラート</h3>
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 rounded">
                <p className="text-sm text-yellow-800">システムメンテナンス予定なし</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm text-blue-800">新規登録待ち: 0件</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}