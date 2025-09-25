"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Building, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockIndustries } from "@/lib/mock-data";

export default function AdminIndustriesPage() {
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const filteredIndustries = mockIndustries.filter(industry =>
    searchName === "" || industry.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    const parent = mockIndustries.find(industry => industry.id === parentId);
    return parent ? parent.name : "—";
  };

  const getChildrenCount = (industryId: string) => {
    return mockIndustries.filter(industry => industry.parentId === industryId).length;
  };

  const getHierarchyLevel = (industry: typeof mockIndustries[0]) => {
    if (!industry.parentId) return 1;
    return 2; // 業種は最大2レベルのみ
  };

  const getIndustryType = (level: number) => {
    return level === 1 ? '大業種' : '小業種';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">業種管理</h1>
            <p className="text-sm text-gray-600 mt-1">業種情報の管理</p>
          </div>
          <Link
            href="/admin/industries/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規業種作成
          </Link>
        </div>

        {/* 検索 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="業種名で検索"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 業種階層の説明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">業種階層について</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <strong>大業種</strong>: 飲食業、小売業、サービス業など</li>
            <li>• <strong>小業種</strong>: レストラン、コンビニエンスストア、美容院など</li>
          </ul>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  業種ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  業種名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  親業種
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  子業種数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  表示順
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  業種タイプ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIndustries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    業種データがありません
                  </td>
                </tr>
              ) : (
                filteredIndustries.map((industry) => {
                  const hierarchyLevel = getHierarchyLevel(industry);
                  return (
                    <tr
                      key={industry.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/admin/industries/${industry.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {industry.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        <div className="flex items-center">
                          {hierarchyLevel > 1 && (
                            <span className="text-gray-400 mr-2">
                              <ChevronRight className="h-4 w-4 inline" />
                            </span>
                          )}
                          <Building className="h-4 w-4 mr-2" />
                          {industry.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getParentName(industry.parentId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getChildrenCount(industry.id)}個
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {industry.order || 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          hierarchyLevel === 1
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {getIndustryType(hierarchyLevel)}
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