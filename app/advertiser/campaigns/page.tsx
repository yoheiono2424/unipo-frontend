"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// 広告主向けのモックデータ
const mockCampaigns = [
  {
    id: "CMP001",
    campaignNo: "CMP-2025-001",
    name: "春の新生活応援キャンペーン",
    advertiser: "株式会社サンプル",
    period: "2025/03/01 - 2025/04/30",
    distributed: 3250,
    total: 5000,
    status: "active"
  },
  {
    id: "CMP002",
    campaignNo: "CMP-2025-002",
    name: "ゴールデンウィーク特別企画",
    advertiser: "株式会社サンプル",
    period: "2025/04/25 - 2025/05/10",
    distributed: 0,
    total: 10000,
    status: "approved"
  },
  {
    id: "CMP003",
    campaignNo: "CMP-2025-003",
    name: "母の日感謝キャンペーン",
    advertiser: "株式会社サンプル",
    period: "2025/04/15 - 2025/05/12",
    distributed: 1350,
    total: 3000,
    status: "active"
  },
  {
    id: "CMP004",
    campaignNo: "CMP-2024-004",
    name: "夏のボーナスキャンペーン",
    advertiser: "株式会社サンプル",
    period: "2024/06/15 - 2024/07/31",
    distributed: 8000,
    total: 8000,
    status: "completed"
  },
  {
    id: "CMP005",
    campaignNo: "CMP-2024-005",
    name: "秋の収穫祭キャンペーン",
    advertiser: "株式会社サンプル",
    period: "2024/09/01 - 2024/10/31",
    distributed: 4200,
    total: 6000,
    status: "completed"
  }
];

export default function AdvertiserCampaignsPage() {
  const router = useRouter();
  const [searchCampaignName, setSearchCampaignName] = useState("");
  const [searchAdvertiserName, setSearchAdvertiserName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // モックデータをフィルタリング
  const campaigns = mockCampaigns.filter(campaign => {
    const nameMatch = searchCampaignName === "" || campaign.name.toLowerCase().includes(searchCampaignName.toLowerCase());
    const advertiserMatch = searchAdvertiserName === "" || campaign.advertiser.toLowerCase().includes(searchAdvertiserName.toLowerCase());
    const statusMatch = searchStatus === "" || searchStatus === "all" || campaign.status === searchStatus;

    return nameMatch && advertiserMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      active: "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800",
    };

    const statusLabels = {
      draft: "下書き",
      pending: "審査中",
      approved: "承認済み",
      rejected: "却下",
      active: "実施中",
      completed: "完了",
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <AdvertiserLayout>
      <div className="p-6">
        <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">広告キャンペーン管理</h1>
            <p className="text-sm text-gray-600 mt-1">キャンペーンの一覧と管理</p>
          </div>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                キャンペーン名
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="キャンペーン名で検索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchCampaignName}
                  onChange={(e) => setSearchCampaignName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                広告主名
              </label>
              <input
                type="text"
                placeholder="広告主名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchAdvertiserName}
                onChange={(e) => setSearchAdvertiserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                キャンペーン期間（開始日）
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchStartDate}
                onChange={(e) => setSearchStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                キャンペーン期間（終了日）
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchEndDate}
                onChange={(e) => setSearchEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ステータス
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              >
                <option value="">すべて</option>
                <option value="draft">下書き</option>
                <option value="pending">審査中</option>
                <option value="approved">承認済み</option>
                <option value="rejected">却下</option>
                <option value="active">実施中</option>
                <option value="completed">完了</option>
              </select>
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーンNo.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーン名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  広告主
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  期間
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  配布枚数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    キャンペーンデータがありません
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/advertiser/campaigns/${campaign.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {campaign.campaignNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.advertiser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.distributed}/{campaign.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(campaign.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </AdvertiserLayout>
  );
}