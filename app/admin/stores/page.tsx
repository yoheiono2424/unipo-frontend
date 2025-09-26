"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockStores } from "@/lib/mock-data";

export default function AdminStoresPage() {
  const [searchStoreName, setSearchStoreName] = useState("");
  const [searchAgency, setSearchAgency] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchServiceStartFrom, setSearchServiceStartFrom] = useState("");
  const [searchServiceStartTo, setSearchServiceStartTo] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchGroupName, setSearchGroupName] = useState("");
  const [searchMemo1, setSearchMemo1] = useState("");
  const [searchMemo2, setSearchMemo2] = useState("");
  const [searchMemo3, setSearchMemo3] = useState("");
  const [searchMemo4, setSearchMemo4] = useState("");
  const [searchMemo5, setSearchMemo5] = useState("");
  const router = useRouter();

  // モックデータをフィルタリング
  const stores = mockStores.filter(store => {
    const storeNameMatch = searchStoreName === "" || store.name.toLowerCase().includes(searchStoreName.toLowerCase());
    const agencyMatch = searchAgency === "" || store.agency.toLowerCase().includes(searchAgency.toLowerCase());
    const areaMatch = searchArea === "" || searchArea === "all" || store.area.includes(searchArea);
    const statusMatch = searchStatus === "" || searchStatus === "all" || store.status === searchStatus;
    const companyMatch = searchCompany === "" || store.company.toLowerCase().includes(searchCompany.toLowerCase());
    const groupMatch = searchGroupName === "" || (store.groupName && store.groupName.toLowerCase().includes(searchGroupName.toLowerCase()));

    // 利用開始日の範囲フィルタ
    let serviceStartMatch = true;
    if (searchServiceStartFrom || searchServiceStartTo) {
      const serviceStart = store.serviceStartDate;
      if (searchServiceStartFrom && serviceStart < searchServiceStartFrom.replace(/-/g, '')) serviceStartMatch = false;
      if (searchServiceStartTo && serviceStart > searchServiceStartTo.replace(/-/g, '')) serviceStartMatch = false;
    }

    // メモ検索
    const memo1Match = searchMemo1 === "" || (store.memo1 && store.memo1.toLowerCase().includes(searchMemo1.toLowerCase()));
    const memo2Match = searchMemo2 === "" || (store.memo2 && store.memo2.toLowerCase().includes(searchMemo2.toLowerCase()));
    const memo3Match = searchMemo3 === "" || (store.memo3 && store.memo3.toLowerCase().includes(searchMemo3.toLowerCase()));
    const memo4Match = searchMemo4 === "" || (store.memo4 && store.memo4.toLowerCase().includes(searchMemo4.toLowerCase()));
    const memo5Match = searchMemo5 === "" || (store.memo5 && store.memo5.toLowerCase().includes(searchMemo5.toLowerCase()));

    return storeNameMatch && agencyMatch && areaMatch && statusMatch && companyMatch && groupMatch && serviceStartMatch &&
           memo1Match && memo2Match && memo3Match && memo4Match && memo5Match;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">店舗管理</h1>
            <p className="text-sm text-gray-600 mt-1">店舗の一覧と管理</p>
          </div>
          <Link
            href="/admin/stores/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規店舗登録
          </Link>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 第1行 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                店舗名
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="店舗名で検索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchStoreName}
                  onChange={(e) => setSearchStoreName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                代理店名
              </label>
              <input
                type="text"
                placeholder="代理店名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchAgency}
                onChange={(e) => setSearchAgency(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                エリア
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
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
                <option value="営業中">営業中</option>
                <option value="準備中">準備中</option>
                <option value="休止中">休止中</option>
                <option value="審査中">審査中</option>
              </select>
            </div>

            {/* 第2行 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                利用開始日From
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchServiceStartFrom}
                onChange={(e) => setSearchServiceStartFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                利用開始日To
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchServiceStartTo}
                onChange={(e) => setSearchServiceStartTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                企業名
              </label>
              <input
                type="text"
                placeholder="企業名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                グループ名
              </label>
              <input
                type="text"
                placeholder="グループ名で検索"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchGroupName}
                onChange={(e) => setSearchGroupName(e.target.value)}
              />
            </div>

            {/* 第3行 - メモ検索 */}
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
                  店舗ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  店舗名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  企業名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  グループ名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  代理店
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  エリア
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  業種
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  来店ポイント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    店舗データがありません
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr
                    key={store.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/stores/${store.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {store.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.groupName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.agency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        store.visitPoint ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {store.visitPoint ? 'ON' : 'OFF'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        store.status === '営業中'
                          ? 'bg-green-100 text-green-800'
                          : store.status === '準備中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {store.status}
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