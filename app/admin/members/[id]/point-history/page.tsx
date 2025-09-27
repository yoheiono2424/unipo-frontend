"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Search, Download, Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { mockMembers } from "@/lib/mock-data";

// モックデータ - ポイント履歴
const mockPointHistory = [
  {
    id: "PH001",
    memberId: "MEM001",
    acquisitionDate: "2025-01-28",
    acquisitionTrigger: "来店",
    points: 100,
    storeName: "東京駅前店",
    campaignName: "新春キャンペーン"
  },
  {
    id: "PH002",
    memberId: "MEM001",
    acquisitionDate: "2025-01-25",
    acquisitionTrigger: "アンケート回答",
    points: 50,
    storeName: "渋谷店",
    campaignName: "アンケートキャンペーン"
  },
  {
    id: "PH003",
    memberId: "MEM001",
    acquisitionDate: "2025-01-20",
    acquisitionTrigger: "ギフトカード受取",
    points: 200,
    storeName: "新宿西口店",
    campaignName: "冬のギフトキャンペーン"
  },
  {
    id: "PH004",
    memberId: "MEM001",
    acquisitionDate: "2025-01-15",
    acquisitionTrigger: "友達紹介",
    points: 300,
    storeName: null,
    campaignName: "友達紹介キャンペーン"
  },
  {
    id: "PH005",
    memberId: "MEM001",
    acquisitionDate: "2025-01-10",
    acquisitionTrigger: "来店",
    points: 100,
    storeName: "池袋店",
    campaignName: "お正月キャンペーン"
  },
];

const acquisitionTriggers = [
  "すべて",
  "来店",
  "ギフトカード受取",
  "アンケート回答",
  "友達紹介",
  "運営付与",
  "キャンペーン特典",
  "その他"
];

export default function PointHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [searchFilters, setSearchFilters] = useState({
    dateFrom: "",
    dateTo: "",
    trigger: "すべて"
  });

  const [showPointModal, setShowPointModal] = useState(false);
  const [pointAmount, setPointAmount] = useState("");
  const [pointReason, setPointReason] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("検索:", searchFilters);
  };

  const handleReset = () => {
    setSearchFilters({
      dateFrom: "",
      dateTo: "",
      trigger: "すべて"
    });
  };

  const handlePointGrant = () => {
    console.log("ポイント付与:", { amount: pointAmount, reason: pointReason });
    setShowPointModal(false);
    setPointAmount("");
    setPointReason("");
  };

  // フィルタリング処理
  const filteredHistory = mockPointHistory.filter(history => {
    if (searchFilters.trigger !== "すべて" && history.acquisitionTrigger !== searchFilters.trigger) {
      return false;
    }
    if (searchFilters.dateFrom && new Date(history.acquisitionDate) < new Date(searchFilters.dateFrom)) {
      return false;
    }
    if (searchFilters.dateTo && new Date(history.acquisitionDate) > new Date(searchFilters.dateTo)) {
      return false;
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/members/${resolvedParams.id}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ポイント獲得履歴</h1>
              <p className="text-sm text-gray-600 mt-1">
                {member.lastName && member.firstName
                  ? `${member.lastName} ${member.firstName}`
                  : member.name} 様（会員ID: {member.id}）
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPointModal(true)}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              ポイント付与
            </button>
            <button className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              エクスポート
            </button>
          </div>
        </div>

        {/* 現在の保有ポイント */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">現在の保有ポイント</p>
              <p className="text-4xl font-bold mt-2">{member.points?.toLocaleString() || 0} pt</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">今月の獲得ポイント</p>
              <p className="text-2xl font-semibold mt-2">+650 pt</p>
            </div>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 獲得日（From） */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  獲得日（From）
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={searchFilters.dateFrom}
                    onChange={(e) => setSearchFilters({...searchFilters, dateFrom: e.target.value})}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 獲得日（To） */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  獲得日（To）
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={searchFilters.dateTo}
                    onChange={(e) => setSearchFilters({...searchFilters, dateTo: e.target.value})}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 獲得契機 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  獲得契機
                </label>
                <select
                  value={searchFilters.trigger}
                  onChange={(e) => setSearchFilters({...searchFilters, trigger: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500"
                >
                  {acquisitionTriggers.map(trigger => (
                    <option key={trigger} value={trigger}>{trigger}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 検索・リセットボタン */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                リセット
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                検索
              </button>
            </div>
          </form>
        </div>

        {/* ポイント履歴テーブル */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">獲得履歴一覧（{filteredHistory.length}件）</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    獲得日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    獲得契機
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    獲得ポイント
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    関連店舗
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHistory.map((history) => (
                  <tr
                    key={history.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/admin/members/${resolvedParams.id}/point-history/${history.id}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(history.acquisitionDate).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        history.acquisitionTrigger === '来店'
                          ? 'bg-blue-100 text-blue-700'
                          : history.acquisitionTrigger === 'ギフトカード受取'
                          ? 'bg-purple-100 text-purple-700'
                          : history.acquisitionTrigger === 'アンケート回答'
                          ? 'bg-green-100 text-green-700'
                          : history.acquisitionTrigger === '友達紹介'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {history.acquisitionTrigger}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-green-600">
                        +{history.points}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.storeName || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.campaignName || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ポイント付与モーダル */}
      {showPointModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">ポイント付与</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  付与ポイント数
                </label>
                <input
                  type="number"
                  value={pointAmount}
                  onChange={(e) => setPointAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: 100"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  付与理由
                </label>
                <textarea
                  value={pointReason}
                  onChange={(e) => setPointReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: キャンペーン特典、サービス補償等"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPointModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handlePointGrant}
                disabled={!pointAmount || !pointReason}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                付与する
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}