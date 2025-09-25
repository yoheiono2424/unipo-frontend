"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Group = {
  id: string;
  name: string;
  companyName: string;
  address: string;
  memberCount: number;
  storeCount: number;
  status: string;
  registeredDate: string;
};

const mockGroups: Group[] = [
  {
    id: "GRP001",
    name: "東京グループA",
    companyName: "株式会社ABC商事",
    address: "東京都渋谷区",
    memberCount: 125,
    storeCount: 8,
    status: "承認済み",
    registeredDate: "2024-01-20",
  },
  {
    id: "GRP002",
    name: "関西エリアグループ",
    companyName: "XYZ株式会社",
    address: "大阪府大阪市",
    memberCount: 78,
    storeCount: 5,
    status: "審査中",
    registeredDate: "2024-02-15",
  },
  {
    id: "GRP003",
    name: "中部地区グループ",
    companyName: "グローバルフーズ株式会社",
    address: "名古屋市中区",
    memberCount: 45,
    storeCount: 3,
    status: "承認済み",
    registeredDate: "2024-03-01",
  },
];

export default function AdminGroupsPage() {
  const [searchGroupName, setSearchGroupName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();

  const groups = mockGroups.filter(group => {
    const nameMatch = searchGroupName === "" || group.name.toLowerCase().includes(searchGroupName.toLowerCase());
    const addressMatch = searchAddress === "" || searchAddress === "all" || group.address.includes(searchAddress);
    const statusMatch = searchStatus === "" || searchStatus === "all" || group.status === searchStatus;
    return nameMatch && addressMatch && statusMatch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">グループ管理</h1>
            <p className="text-sm text-gray-600 mt-1">グループの一覧と管理</p>
          </div>
          <Link
            href="/admin/groups/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規グループ登録
          </Link>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                グループ名
              </label>
              <input
                type="text"
                placeholder="グループ名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchGroupName}
                onChange={(e) => setSearchGroupName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                住所
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              >
                <option value="">すべて</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="名古屋">名古屋</option>
                <option value="福岡">福岡</option>
                <option value="その他">その他</option>
              </select>
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
                <option value="承認済み">承認済み</option>
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
                  グループID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  グループ名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所属企業
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  住所
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メンバー数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  店舗数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登録日
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    グループデータがありません
                  </td>
                </tr>
              ) : (
                groups.map((group) => (
                  <tr
                    key={group.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/groups/${group.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {group.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.memberCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.storeCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        group.status === '承認済み'
                          ? 'bg-green-100 text-green-800'
                          : group.status === '審査中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.registeredDate}
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