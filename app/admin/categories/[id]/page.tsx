"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Hash, ArrowUpDown, Tag } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { mockCategories } from "@/lib/mock-data";

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const category = mockCategories.find(c => c.id === resolvedParams.id) || mockCategories[0];


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
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Tag className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">カテゴリID: {category.id}</p>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <Tag className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{category.name}</p>
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
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}