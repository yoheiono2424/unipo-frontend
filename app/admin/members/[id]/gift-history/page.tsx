"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Search, Download, Calendar, MapPin, Gift } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { mockMembers } from "@/lib/mock-data";

// モックデータ - ギフトカード受取履歴
const mockGiftHistory = [
  {
    id: "GH001",
    memberId: "MEM001",
    receiptDate: "2025-01-28",
    storeName: "東京駅前店",
    storeId: "STR001",
    campaignName: "新春ギフトキャンペーン",
    campaignId: "CAM001",
    giftCardAmount: 1000,
    giftCardCode: "ABC123456",
    status: "使用済"
  },
  {
    id: "GH002",
    memberId: "MEM001",
    receiptDate: "2025-01-25",
    storeName: "渋谷店",
    storeId: "STR002",
    campaignName: "冬のギフトキャンペーン",
    campaignId: "CAM002",
    giftCardAmount: 500,
    giftCardCode: "DEF789012",
    status: "有効"
  },
  {
    id: "GH003",
    memberId: "MEM001",
    receiptDate: "2025-01-20",
    storeName: "新宿西口店",
    storeId: "STR003",
    campaignName: "年末年始キャンペーン",
    campaignId: "CAM003",
    giftCardAmount: 2000,
    giftCardCode: "GHI345678",
    status: "使用済"
  },
  {
    id: "GH004",
    memberId: "MEM001",
    receiptDate: "2025-01-15",
    storeName: "池袋店",
    storeId: "STR004",
    campaignName: "お正月キャンペーン",
    campaignId: "CAM004",
    giftCardAmount: 1500,
    giftCardCode: "JKL901234",
    status: "有効"
  },
  {
    id: "GH005",
    memberId: "MEM001",
    receiptDate: "2025-01-10",
    storeName: "品川店",
    storeId: "STR005",
    campaignName: "新年福袋キャンペーン",
    campaignId: "CAM005",
    giftCardAmount: 3000,
    giftCardCode: "MNO567890",
    status: "期限切れ"
  },
];

export default function GiftHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [searchFilters, setSearchFilters] = useState({
    dateFrom: "",
    dateTo: "",
    storeName: "",
    campaignName: ""
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("検索:", searchFilters);
  };

  const handleReset = () => {
    setSearchFilters({
      dateFrom: "",
      dateTo: "",
      storeName: "",
      campaignName: ""
    });
  };

  // フィルタリング処理
  const filteredHistory = mockGiftHistory.filter(history => {
    if (searchFilters.storeName && !history.storeName.includes(searchFilters.storeName)) {
      return false;
    }
    if (searchFilters.campaignName && !history.campaignName.includes(searchFilters.campaignName)) {
      return false;
    }
    if (searchFilters.dateFrom && new Date(history.receiptDate) < new Date(searchFilters.dateFrom)) {
      return false;
    }
    if (searchFilters.dateTo && new Date(history.receiptDate) > new Date(searchFilters.dateTo)) {
      return false;
    }
    return true;
  });

  // 合計金額の計算
  const totalAmount = filteredHistory.reduce((sum, item) => sum + item.giftCardAmount, 0);

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
              <h1 className="text-2xl font-bold text-gray-900">ギフトカード受取履歴</h1>
              <p className="text-sm text-gray-600 mt-1">
                {member.lastName && member.firstName
                  ? `${member.lastName} ${member.firstName}`
                  : member.name} 様（会員ID: {member.id}）
              </p>
            </div>
          </div>
          <button className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            エクスポート
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">総受取金額</p>
                <p className="text-3xl font-bold mt-2">¥{totalAmount.toLocaleString()}</p>
              </div>
              <Gift className="h-10 w-10 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">受取回数</p>
                <p className="text-3xl font-bold mt-2">{filteredHistory.length}回</p>
              </div>
              <Gift className="h-10 w-10 text-blue-200" />
            </div>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 受取日（From） */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  受取日（From）
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

              {/* 受取日（To） */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  受取日（To）
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

              {/* 店舗名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  店舗名
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchFilters.storeName}
                    onChange={(e) => setSearchFilters({...searchFilters, storeName: e.target.value})}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    placeholder="店舗名を入力"
                  />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* キャンペーン名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キャンペーン名
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchFilters.campaignName}
                    onChange={(e) => setSearchFilters({...searchFilters, campaignName: e.target.value})}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    placeholder="キャンペーン名を入力"
                  />
                  <Gift className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
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

        {/* ギフトカード履歴テーブル */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">受取履歴一覧（{filteredHistory.length}件）</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    受取日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHistory.map((history) => (
                  <tr
                    key={history.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/admin/members/${resolvedParams.id}/gift-history/${history.id}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(history.receiptDate).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.storeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.campaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-purple-600">
                        ¥{history.giftCardAmount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}