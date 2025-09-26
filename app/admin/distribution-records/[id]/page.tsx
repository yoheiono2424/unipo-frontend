"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Calendar, Building2, Users, Hash, Package, Plus, Search } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const mockDistributionRecords = [
  {
    id: "DST001",
    recordId: "DIST-2025-0001",
    distributionCount: 1000,
    campaignId: "CMP001",
    campaignName: "新春キャンペーン2025",
    advertiserId: "ADV001",
    advertiserName: "株式会社ABC商事",
    agencyId: "AGC001",
    agencyName: "株式会社XYZエージェンシー",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "実施中",
  },
  {
    id: "DST002",
    recordId: "DIST-2025-0002",
    distributionCount: 500,
    campaignId: "CMP002",
    campaignName: "バレンタインキャンペーン2025",
    advertiserId: "ADV002",
    advertiserName: "株式会社DEFコーポレーション",
    agencyId: "AGC002",
    agencyName: "株式会社LMN代理店",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
    status: "配布完了",
  },
];

// モック配布履歴データ
const mockDistributionHistory = [
  {
    id: "DH001",
    distributionDate: "2025-01-15 10:30:00",
    userId: "USER001",
    storeId: "STR001",
    storeName: "カフェ モカ",
    campaignId: "CMP001",
    campaignName: "新春キャンペーン2025",
    advertiserId: "ADV001",
    advertiserName: "株式会社ABC商事",
  },
  {
    id: "DH002",
    distributionDate: "2025-01-15 11:45:00",
    userId: "USER002",
    storeId: "STR001",
    storeName: "カフェ モカ",
    campaignId: "CMP001",
    campaignName: "新春キャンペーン2025",
    advertiserId: "ADV001",
    advertiserName: "株式会社ABC商事",
  },
  {
    id: "DH003",
    distributionDate: "2025-01-16 14:20:00",
    userId: "USER003",
    storeId: "STR002",
    storeName: "レストラン サクラ",
    campaignId: "CMP001",
    campaignName: "新春キャンペーン2025",
    advertiserId: "ADV001",
    advertiserName: "株式会社ABC商事",
  },
  {
    id: "DH004",
    distributionDate: "2025-01-16 15:30:00",
    userId: "USER004",
    storeId: "STR003",
    storeName: "ショップ ひまわり",
    campaignId: "CMP002",
    campaignName: "バレンタインキャンペーン2025",
    advertiserId: "ADV002",
    advertiserName: "株式会社DEFコーポレーション",
  },
  {
    id: "DH005",
    distributionDate: "2025-01-17 09:15:00",
    userId: "USER005",
    storeId: "STR002",
    storeName: "レストラン サクラ",
    campaignId: "CMP002",
    campaignName: "バレンタインキャンペーン2025",
    advertiserId: "ADV002",
    advertiserName: "株式会社DEFコーポレーション",
  },
];

export default function DistributionRecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const record = mockDistributionRecords.find(r => r.id === resolvedParams.id) || mockDistributionRecords[0];
  const router = useRouter();

  // 配布履歴検索用のstate
  const [searchStoreName, setSearchStoreName] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  // 配布履歴のフィルタリング
  const filteredHistory = mockDistributionHistory.filter(history => {
    const storeNameMatch = searchStoreName === "" ||
      history.storeName.toLowerCase().includes(searchStoreName.toLowerCase());
    const userIdMatch = searchUserId === "" ||
      history.userId.toLowerCase().includes(searchUserId.toLowerCase());

    // 日付フィルタリング
    let dateMatch = true;
    if (searchStartDate || searchEndDate) {
      const historyDate = new Date(history.distributionDate);
      if (searchStartDate) {
        const startDate = new Date(searchStartDate + " 00:00:00");
        dateMatch = dateMatch && historyDate >= startDate;
      }
      if (searchEndDate) {
        const endDate = new Date(searchEndDate + " 23:59:59");
        dateMatch = dateMatch && historyDate <= endDate;
      }
    }

    return storeNameMatch && userIdMatch && dateMatch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '実施中':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case '配布完了':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '準備中':
        return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20';
      case '終了':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/distributions"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">配布実績詳細</h1>
              <p className="text-sm text-gray-600 mt-1">記録ID: {record.recordId}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/distribution-records/create"
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              配布履歴作成
            </Link>
            <Link
              href={`/admin/distribution-records/${record.id}/edit`}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">配布情報</h2>
          </div>

          <div className="p-6">
            {/* ステータス表示 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  <Package className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{record.recordId}</h3>
                  <p className="text-sm text-gray-600 mt-1">キャンペーン: {record.campaignName}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20">
                      配布枚数: {record.distributionCount.toLocaleString()}枚
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布枚数</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.distributionCount.toLocaleString()}枚</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーンID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.campaignId}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.campaignName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">広告主ID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.advertiserId}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">広告主名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.advertiserName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">代理店ID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.agencyId}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">代理店名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.agencyName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">開始日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.startDate}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">終了日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配布履歴セクション */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">配布履歴</h2>
          </div>

          {/* 検索フィルター */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  店舗名
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="店舗名で検索"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                    value={searchStoreName}
                    onChange={(e) => setSearchStoreName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ユーザーID
                </label>
                <input
                  type="text"
                  placeholder="ユーザーIDで検索"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  配布日時（開始日）
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  配布日時（終了日）
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* 検索結果件数 */}
            <div className="mt-4 text-sm text-gray-600">
              検索結果: {filteredHistory.length}件
            </div>
          </div>

          {/* 配布履歴テーブル */}
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
                    店舗ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗名
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      {searchStoreName || searchUserId || searchStartDate || searchEndDate
                        ? "検索条件に一致する配布履歴がありません"
                        : "配布履歴データがありません"}
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((history) => (
                    <tr
                      key={history.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/admin/distribution-history/${history.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {history.distributionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {history.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {history.storeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {history.storeName}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ページネーション（必要に応じて） */}
          {filteredHistory.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-700">
                <div>
                  全 {filteredHistory.length} 件
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    前へ
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    次へ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}