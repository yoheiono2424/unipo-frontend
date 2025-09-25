"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, MapPin, Globe, Hash, Building } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { mockAreas } from "@/lib/mock-data";

export default function AreaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const area = mockAreas.find(a => a.id === resolvedParams.id) || mockAreas[0];

  const getParentArea = () => {
    if (!area.parentId) return null;
    return mockAreas.find(a => a.id === area.parentId);
  };

  const getChildAreas = () => {
    return mockAreas.filter(a => a.parentId === area.id);
  };

  const getHierarchyLevel = () => {
    if (!area.parentId) return 1;
    const parent = mockAreas.find(a => a.id === area.parentId);
    if (!parent) return 2;
    return parent.parentId ? 3 : 2;
  };

  const getHierarchyType = (level: number) => {
    switch(level) {
      case 1: return '地方・地域';
      case 2: return '都道府県';
      case 3: return '市区町村';
      default: return '不明';
    }
  };

  const parentArea = getParentArea();
  const childAreas = getChildAreas();
  const hierarchyLevel = getHierarchyLevel();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/areas"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">エリア詳細</h1>
              <p className="text-sm text-gray-600 mt-1">エリアID: {area.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/areas/${area.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスとエリア情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                  {hierarchyLevel === 1 ? (
                    <Globe className="h-10 w-10" />
                  ) : (
                    <MapPin className="h-10 w-10" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      hierarchyLevel === 1
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : hierarchyLevel === 2
                        ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                        : 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20'
                    }`}>
                      {getHierarchyType(hierarchyLevel)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">子エリア: {childAreas.length}個</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">エリアID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{area.id}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">階層レベル</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">レベル {hierarchyLevel}</p>
                  </div>
                </div>
              </div>

              {parentArea && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">親エリア</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Link
                          href={`/admin/areas/${parentArea.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {parentArea.name}
                        </Link>
                        <span className="text-xs text-gray-500">({parentArea.id})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 子エリア一覧 */}
            {childAreas.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">子エリア一覧</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childAreas.map((child) => (
                    <Link
                      key={child.id}
                      href={`/admin/areas/${child.id}`}
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{child.name}</p>
                          <p className="text-xs text-gray-500">ID: {child.id}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* エリアが使用されている場所の例 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">このエリアを使用している店舗</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  このエリアに属する店舗: <span className="font-medium">8店舗</span>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  ※実際の店舗一覧は店舗管理画面でフィルタして確認できます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}