"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStoreDistributions } from "@/lib/mock-data";
import {
  ArrowLeft,
  Store,
  MapPin,
  Package,
  TrendingUp,
  Gift,
  Search
} from "lucide-react";

export default function StoreDistributionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;

  // 検索条件の状態管理
  const [searchUserId, setSearchUserId] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  // モックデータから該当店舗を検索
  const storeData = mockStoreDistributions.find(store => store.storeId === storeId);

  // モックデータ：配布履歴
  const distributionHistory = [
    { id: "1", date: "2025-01-29 14:30", userId: "U001234", campaignId: "CMP001", campaignName: "新春キャンペーン2025" },
    { id: "2", date: "2025-01-29 13:45", userId: "U001235", campaignId: "CMP001", campaignName: "新春キャンペーン2025" },
    { id: "3", date: "2025-01-29 12:20", userId: "U001236", campaignId: "CMP002", campaignName: "冬の感謝祭" },
    { id: "4", date: "2025-01-28 16:15", userId: "U001237", campaignId: "CMP001", campaignName: "新春キャンペーン2025" },
    { id: "5", date: "2025-01-28 15:00", userId: "U001238", campaignId: "CMP003", campaignName: "バレンタインフェア" },
  ];

  // フィルタリング処理
  const filteredHistory = distributionHistory.filter(item => {
    const userIdMatch = searchUserId === "" || item.userId.toLowerCase().includes(searchUserId.toLowerCase());
    const dateMatch = true; // 日付フィルタリングのロジックは実装時に追加
    return userIdMatch && dateMatch;
  });

  if (!storeData) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">店舗データが見つかりません</p>
            <button
              onClick={() => router.push('/admin/distributions')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              配布実績管理に戻る
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/distributions')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              戻る
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">店舗配布実績詳細</h1>
              <p className="text-sm text-gray-600 mt-1">{storeData.storeName}の配布実績詳細</p>
            </div>
          </div>
        </div>

        {/* 基本情報カード */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Store className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">店舗ID</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.storeId}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Store className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">店舗名</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.storeName}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">エリア</p>
                  <p className="text-base text-gray-900 mt-1">{storeData.area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配布統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">割り当て枚数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.allocatedCount.toLocaleString()}枚
                </p>
              </div>
              <Package className="h-8 w-8 text-indigo-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">配布枚数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.distributedCount.toLocaleString()}枚
                </p>
              </div>
              <Gift className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">在庫数</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {storeData.inventoryCount.toLocaleString()}枚
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* 配布進捗 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">配布進捗</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">配布率</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((storeData.distributedCount / storeData.allocatedCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(storeData.distributedCount / storeData.allocatedCount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">配布済み</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {storeData.distributedCount.toLocaleString()}枚
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">残り</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {storeData.inventoryCount.toLocaleString()}枚
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配布履歴 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">配布履歴</h2>
          </div>

          {/* 検索フィルター */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ユーザーID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ユーザーIDで検索"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    value={searchUserId}
                    onChange={(e) => setSearchUserId(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  配布日時（開始）
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  配布日時（終了）
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布日時
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユーザーID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーンID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン名
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      配布履歴がありません
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/admin/distribution-history/${item.id}?from=store&storeId=${storeId}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.campaignId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.campaignName}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}