"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building, Hash, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { mockIndustries } from "@/lib/mock-data";

export default function IndustryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const industry = mockIndustries.find(i => i.id === resolvedParams.id) || mockIndustries[0];

  const getParentIndustry = () => {
    if (!industry.parentId) return null;
    return mockIndustries.find(i => i.id === industry.parentId);
  };

  const getChildIndustries = () => {
    return mockIndustries.filter(i => i.parentId === industry.id);
  };

  const getHierarchyLevel = () => {
    return industry.parentId ? 2 : 1; // 業種は最大2レベル
  };

  const getIndustryType = (level: number) => {
    return level === 1 ? '大業種' : '小業種';
  };

  const parentIndustry = getParentIndustry();
  const childIndustries = getChildIndustries();
  const hierarchyLevel = getHierarchyLevel();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/industries"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">業種詳細</h1>
              <p className="text-sm text-gray-600 mt-1">業種ID: {industry.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/industries/${industry.id}/edit`}
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
            {/* ステータスと業種情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white">
                  {hierarchyLevel === 1 ? (
                    <Briefcase className="h-10 w-10" />
                  ) : (
                    <Building className="h-10 w-10" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{industry.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      hierarchyLevel === 1
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                    }`}>
                      {getIndustryType(hierarchyLevel)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">子業種: {childIndustries.length}個</span>
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
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">業種ID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{industry.id}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Target className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">表示順</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{industry.order || 1}</p>
                  </div>
                </div>
              </div>

              {parentIndustry && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Briefcase className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">親業種</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Link
                          href={`/admin/industries/${parentIndustry.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {parentIndustry.name}
                        </Link>
                        <span className="text-xs text-gray-500">({parentIndustry.id})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 子業種一覧 */}
            {childIndustries.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">子業種一覧</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childIndustries.map((child) => (
                    <Link
                      key={child.id}
                      href={`/admin/industries/${child.id}`}
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-teal-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{child.name}</p>
                            <p className="text-xs text-gray-500">ID: {child.id}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          表示順: {child.order || 1}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 業種が使用されている場所の例 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">この業種を使用している店舗</h3>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-700">
                  この業種に属する店舗: <span className="font-medium">12店舗</span>
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  ※実際の店舗一覧は店舗管理画面でフィルタして確認できます
                </p>
              </div>
            </div>

            {/* 業種階層の説明 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">業種階層について</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 mt-0.5 text-blue-600" />
                    <div>
                      <strong>大業種</strong>: 飲食業、小売業、サービス業などの大分類
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-4 w-4 mt-0.5 text-blue-600" />
                    <div>
                      <strong>小業種</strong>: レストラン、コンビニエンスストア、美容院などの詳細分類
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}