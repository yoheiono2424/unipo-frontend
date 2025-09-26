"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const mockPointItems = [
  {
    id: "PI001",
    name: "Amazonギフト券 500円",
    category: "ギフト券",
    requiredPoints: 500,
    stock: 100,
    description: "Amazonで利用可能な500円分のギフト券",
    validityPeriod: "発行から6ヶ月",
    status: "有効",
    requiresStockManagement: "要",
    provider: "Amazon Japan",
  },
  {
    id: "PI002",
    name: "スターバックスカード 1000円",
    category: "ギフト券",
    requiredPoints: 1000,
    stock: 50,
    description: "スターバックスで利用可能な1000円分のカード",
    validityPeriod: "発行から12ヶ月",
    status: "有効",
    requiresStockManagement: "要",
    provider: "スターバックスジャパン",
  },
  {
    id: "PI003",
    name: "楽天ポイント 1000pt",
    category: "ポイント",
    requiredPoints: 1000,
    stock: 200,
    description: "楽天市場で利用可能な1000ポイント",
    validityPeriod: "発行から3ヶ月",
    status: "有効",
    requiresStockManagement: "不要",
    provider: "楽天グループ",
  },
  {
    id: "PI004",
    name: "ユニクロクーポン 2000円",
    category: "クーポン",
    requiredPoints: 2000,
    stock: 30,
    description: "ユニクロ店舗・オンラインで利用可能な2000円分のクーポン",
    validityPeriod: "発行から6ヶ月",
    status: "有効",
    requiresStockManagement: "要",
    provider: "ファーストリテイリング",
  },
  {
    id: "PI005",
    name: "iTunesカード 3000円",
    category: "ギフト券",
    requiredPoints: 3000,
    stock: 0,
    description: "App Store、iTunes Storeで利用可能な3000円分のカード",
    validityPeriod: "無期限",
    status: "在庫切れ",
    requiresStockManagement: "要",
    provider: "Apple Japan",
  },
];

export default function AdminPointItemsPage() {
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();

  const filteredItems = mockPointItems.filter(item => {
    const nameMatch = searchName === "" || item.name.toLowerCase().includes(searchName.toLowerCase());
    const categoryMatch = searchCategory === "" || item.category === searchCategory;
    const statusMatch = searchStatus === "" || item.status === searchStatus;
    return nameMatch && categoryMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '有効':
        return 'bg-green-100 text-green-800';
      case '無効':
        return 'bg-gray-100 text-gray-800';
      case '在庫切れ':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ポイント交換商品管理</h1>
            <p className="text-sm text-gray-600 mt-1">ポイント交換商品の登録と管理</p>
          </div>
          <Link
            href="/admin/point-items/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規商品登録
          </Link>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="商品名で検索"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">すべてのカテゴリ</option>
                <option value="ギフト券">ギフト券</option>
                <option value="ポイント">ポイント</option>
                <option value="クーポン">クーポン</option>
                <option value="商品">商品</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              >
                <option value="">すべてのステータス</option>
                <option value="有効">有効</option>
                <option value="無効">無効</option>
                <option value="在庫切れ">在庫切れ</option>
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
                  商品ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  必要ポイント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  在庫
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  在庫管理要否
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  提供元
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  有効期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    商品データがありません
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/point-items/${item.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.requiredPoints.toLocaleString()} pt
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.requiresStockManagement === '要' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.requiresStockManagement}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.validityPeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                        {item.status}
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