"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Distribution = {
  id: string;
  storeName: string;
  campaignName: string;
  userName: string;
  giftCardSerial: string;
  amount: number;
  distributionDate: string;
  usageDate: string | null;
  status: string;
};

const mockDistributions: Distribution[] = [
  {
    id: "DST001",
    storeName: "ユニーポマート新宿店",
    campaignName: "春の新生活応援キャンペーン",
    userName: "山田太郎",
    giftCardSerial: "AMZN-2024-0001",
    amount: 1000,
    distributionDate: "2024-03-10 14:30",
    usageDate: "2024-03-12 10:15",
    status: "使用済み",
  },
  {
    id: "DST002",
    storeName: "ユニーポストア渋谷店",
    campaignName: "期間限定ポイント2倍",
    userName: "佐藤花子",
    giftCardSerial: "AMZN-2024-0002",
    amount: 500,
    distributionDate: "2024-03-11 16:45",
    usageDate: null,
    status: "配布済み",
  },
  {
    id: "DST003",
    storeName: "ユニーポマート池袋店",
    campaignName: "春の新生活応援キャンペーン",
    userName: "鈴木一郎",
    giftCardSerial: "AMZN-2024-0003",
    amount: 2000,
    distributionDate: "2024-03-12 11:20",
    usageDate: null,
    status: "審査中",
  },
];

export default function AdminDistributionsPage() {
  const [searchStoreName, setSearchStoreName] = useState("");
  const [searchCampaignName, setSearchCampaignName] = useState("");
  const [searchUserName, setSearchUserName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();

  const distributions = mockDistributions.filter(dist => {
    const storeMatch = searchStoreName === "" || dist.storeName.toLowerCase().includes(searchStoreName.toLowerCase());
    const campaignMatch = searchCampaignName === "" || dist.campaignName.toLowerCase().includes(searchCampaignName.toLowerCase());
    const userMatch = searchUserName === "" || dist.userName.toLowerCase().includes(searchUserName.toLowerCase());
    const statusMatch = searchStatus === "" || searchStatus === "all" || dist.status === searchStatus;
    return storeMatch && campaignMatch && userMatch && statusMatch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布実績管理</h1>
            <p className="text-sm text-gray-600 mt-1">ギフトカード配布実績の一覧と管理</p>
          </div>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                店舗名
              </label>
              <input
                type="text"
                placeholder="店舗名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchStoreName}
                onChange={(e) => setSearchStoreName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                キャンペーン名
              </label>
              <input
                type="text"
                placeholder="キャンペーン名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchCampaignName}
                onChange={(e) => setSearchCampaignName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ユーザー名
              </label>
              <input
                type="text"
                placeholder="ユーザー名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchUserName}
                onChange={(e) => setSearchUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                配布日時（開始日）
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchEndDate}
                onChange={(e) => setSearchEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                審査ステータス
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              >
                <option value="">すべて</option>
                <option value="使用済み">使用済み</option>
                <option value="配布済み">配布済み</option>
                <option value="審査中">審査中</option>
                <option value="却下">却下</option>
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
                  配布ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  店舗名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーン
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザー名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  シリアル番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  配布日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  使用日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {distributions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    配布実績データがありません
                  </td>
                </tr>
              ) : (
                distributions.map((dist) => (
                  <tr
                    key={dist.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/distributions/${dist.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dist.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.storeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.campaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.giftCardSerial}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ¥{dist.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.distributionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dist.usageDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        dist.status === '使用済み'
                          ? 'bg-gray-100 text-gray-800'
                          : dist.status === '配布済み'
                          ? 'bg-green-100 text-green-800'
                          : dist.status === '審査中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {dist.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}