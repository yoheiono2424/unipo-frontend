"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Folder, FolderOpen, Hash, ArrowUpDown, Building } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { mockCategories } from "@/lib/mock-data";

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const category = mockCategories.find(c => c.id === resolvedParams.id) || mockCategories[0];

  const getParentCategory = () => {
    if (!category.parentId) return null;
    return mockCategories.find(c => c.id === category.parentId);
  };

  const getChildCategories = () => {
    return mockCategories.filter(c => c.parentId === category.id);
  };

  const parentCategory = getParentCategory();
  const childCategories = getChildCategories();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/categories"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">カテゴリ詳細</h1>
              <p className="text-sm text-gray-600 mt-1">カテゴリID: {category.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/categories/${category.id}/edit`}
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
            {/* ステータスとカテゴリ情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                  {category.parentId ? (
                    <Folder className="h-10 w-10" />
                  ) : (
                    <FolderOpen className="h-10 w-10" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      category.parentId
                        ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                        : 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                    }`}>
                      {category.parentId ? '子カテゴリ' : '親カテゴリ'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">子カテゴリ: {childCategories.length}個</span>
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
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{category.id}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <ArrowUpDown className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">表示順</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{category.order}</p>
                  </div>
                </div>
              </div>

              {parentCategory && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <FolderOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">親カテゴリ</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Link
                          href={`/admin/categories/${parentCategory.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {parentCategory.name}
                        </Link>
                        <span className="text-xs text-gray-500">({parentCategory.id})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 子カテゴリ一覧 */}
            {childCategories.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">子カテゴリ一覧</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childCategories.map((child) => (
                    <Link
                      key={child.id}
                      href={`/admin/categories/${child.id}`}
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{child.name}</p>
                          <p className="text-xs text-gray-500">ID: {child.id} | 表示順: {child.order}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* カテゴリが使用されている場所の例 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">このカテゴリを使用している店舗</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  このカテゴリに属する店舗: <span className="font-medium">12店舗</span>
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