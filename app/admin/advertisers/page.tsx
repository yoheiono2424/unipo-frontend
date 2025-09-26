"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockAdvertisers } from "@/lib/mock-data";

export default function AdminAdvertisersPage() {
  const [searchAdvertiserName, setSearchAdvertiserName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchMemo1, setSearchMemo1] = useState("");
  const [searchMemo2, setSearchMemo2] = useState("");
  const [searchMemo3, setSearchMemo3] = useState("");
  const [searchMemo4, setSearchMemo4] = useState("");
  const [searchMemo5, setSearchMemo5] = useState("");
  const router = useRouter();

  const advertisers = mockAdvertisers.filter(advertiser => {
    const nameMatch = searchAdvertiserName === "" || advertiser.companyName.toLowerCase().includes(searchAdvertiserName.toLowerCase());
    const addressMatch = searchAddress === "" || searchAddress === "all";
    const statusMatch = searchStatus === "" || searchStatus === "all" || advertiser.status === searchStatus;

    // メモ検索
    const memo1Match = searchMemo1 === "" || (advertiser.memo1 && advertiser.memo1.toLowerCase().includes(searchMemo1.toLowerCase()));
    const memo2Match = searchMemo2 === "" || (advertiser.memo2 && advertiser.memo2.toLowerCase().includes(searchMemo2.toLowerCase()));
    const memo3Match = searchMemo3 === "" || (advertiser.memo3 && advertiser.memo3.toLowerCase().includes(searchMemo3.toLowerCase()));
    const memo4Match = searchMemo4 === "" || (advertiser.memo4 && advertiser.memo4.toLowerCase().includes(searchMemo4.toLowerCase()));
    const memo5Match = searchMemo5 === "" || (advertiser.memo5 && advertiser.memo5.toLowerCase().includes(searchMemo5.toLowerCase()));

    return nameMatch && addressMatch && statusMatch && memo1Match && memo2Match && memo3Match && memo4Match && memo5Match;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">広告主管理</h1>
            <p className="text-sm text-gray-600 mt-1">広告主の一覧と管理</p>
          </div>
          <Link
            href="/admin/advertisers/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規広告主登録
          </Link>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                広告主名
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="広告主名で検索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchAdvertiserName}
                  onChange={(e) => setSearchAdvertiserName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                住所
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              >
                <option value="">すべて</option>
                <option value="承認済み">承認済み</option>
                <option value="審査中">審査中</option>
                <option value="却下">却下</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ1
              </label>
              <input
                type="text"
                placeholder="メモ1で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchMemo1}
                onChange={(e) => setSearchMemo1(e.target.value)}
              />
            </div>

            {/* 第2行 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ2
              </label>
              <input
                type="text"
                placeholder="メモ2で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchMemo2}
                onChange={(e) => setSearchMemo2(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ3
              </label>
              <input
                type="text"
                placeholder="メモ3で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchMemo3}
                onChange={(e) => setSearchMemo3(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ4
              </label>
              <input
                type="text"
                placeholder="メモ4で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchMemo4}
                onChange={(e) => setSearchMemo4(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ5
              </label>
              <input
                type="text"
                placeholder="メモ5で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchMemo5}
                onChange={(e) => setSearchMemo5(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  広告主名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  担当者名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  業種
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーン数
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
              {advertisers.map((advertiser) => (
                <tr
                  key={advertiser.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/advertisers/${advertiser.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {advertiser.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {advertiser.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {advertiser.contactName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {advertiser.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {advertiser.campaigns}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      advertiser.status === '承認済み'
                        ? 'bg-green-100 text-green-800'
                        : advertiser.status === '審査中'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {advertiser.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {advertiser.registeredDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}