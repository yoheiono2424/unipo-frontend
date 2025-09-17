"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import Link from "next/link";
import {
  Megaphone,
  Users,
  TrendingUp,
  DollarSign,
  BarChart,
  FileText,
} from "lucide-react";

export default function AdvertiserDashboard() {
  const stats = [
    {
      title: "実施中キャンペーン",
      value: "0",
      change: "アクティブ",
      icon: Megaphone,
      color: "bg-purple-500",
    },
    {
      title: "総配布数",
      value: "0",
      change: "+0%",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "リーチ人数",
      value: "0",
      change: "+0%",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "今月の費用",
      value: "¥0",
      change: "予算: ¥0",
      icon: DollarSign,
      color: "bg-yellow-500",
    },
  ];

  const campaigns = [];

  return (
    <AdvertiserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-sm text-gray-600 mt-1">キャンペーンの状況を確認</p>
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

        {/* グラフエリア */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">配布実績</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-400">グラフエリア（データ接続後に表示）</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">アンケート回答率</h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-400">グラフエリア（データ接続後に表示）</p>
            </div>
          </div>
        </div>

        {/* キャンペーン一覧 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">最近のキャンペーン</h2>
          </div>
          <div className="p-6">
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">キャンペーンがありません</p>
                <Link
                  href="/advertiser/campaigns/create"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  新規キャンペーン作成
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* キャンペーン一覧 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  );
}