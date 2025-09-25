"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockAreas } from "@/lib/mock-data";

export default function AdminAreasPage() {
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const filteredAreas = mockAreas.filter(area =>
    searchName === "" || area.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    const parent = mockAreas.find(area => area.id === parentId);
    return parent ? parent.name : "—";
  };

  const getChildrenCount = (areaId: string) => {
    return mockAreas.filter(area => area.parentId === areaId).length;
  };

  const getHierarchyLevel = (area: typeof mockAreas[0]) => {
    if (!area.parentId) return 1;
    const parent = mockAreas.find(a => a.id === area.parentId);
    if (!parent) return 2;
    return parent.parentId ? 3 : 2;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">エリア管理</h1>
            <p className="text-sm text-gray-600 mt-1">地域・エリア情報の管理</p>
          </div>
          <Link
            href="/admin/areas/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規エリア作成
          </Link>
        </div>

        {/* 検索 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="エリア名で検索"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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
                  エリアID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  エリア名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  親エリア
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  子エリア数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  階層レベル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  階層タイプ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAreas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    エリアデータがありません
                  </td>
                </tr>
              ) : (
                filteredAreas.map((area) => {
                  const hierarchyLevel = getHierarchyLevel(area);
                  return (
                    <tr
                      key={area.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/admin/areas/${area.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {area.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        <div className="flex items-center">
                          {hierarchyLevel > 1 && (
                            <span className="text-gray-400 mr-2">
                              {Array.from({ length: hierarchyLevel - 1 }, (_, i) => (
                                <ChevronRight key={i} className="h-4 w-4 inline" />
                              ))}
                            </span>
                          )}
                          <MapPin className="h-4 w-4 mr-2" />
                          {area.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getParentName(area.parentId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getChildrenCount(area.id)}個
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        レベル {hierarchyLevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          hierarchyLevel === 1
                            ? 'bg-green-100 text-green-800'
                            : hierarchyLevel === 2
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {hierarchyLevel === 1 ? '地方・地域' : hierarchyLevel === 2 ? '都道府県' : '市区町村'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}