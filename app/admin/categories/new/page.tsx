"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockCategories } from "@/lib/mock-data";

export default function CategoryNewPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    parentId: "",
    order: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    const newCategoryData = {
      ...formData,
      id: `CAT${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      parentId: formData.parentId || null,
      order: parseInt(formData.order),
    };
    console.log("新規カテゴリデータ:", newCategoryData);
    // 一覧ページに戻る
    router.push("/admin/categories");
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  // 親カテゴリ候補（既存の親カテゴリのみ）
  const parentCandidates = mockCategories.filter(cat => cat.parentId === null);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/categories"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新規カテゴリ作成</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">カテゴリ情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: 飲食店"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      親カテゴリ
                    </label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">親カテゴリとして作成</option>
                      {parentCandidates.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      未選択の場合は親カテゴリとして作成されます
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      表示順 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      min="1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      数字が小さいほど上位に表示されます
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    作成
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* プレビューエリア */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">プレビュー</h2>
            </div>
            <div className="p-6">
              {formData.name ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      formData.parentId
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {formData.parentId ? '子カテゴリ' : '親カテゴリ'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {formData.parentId && (
                      <p>
                        親カテゴリ: {parentCandidates.find(c => c.id === formData.parentId)?.name || "—"}
                      </p>
                    )}
                    <p>表示順: {formData.order}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  カテゴリ名を入力するとプレビューが表示されます
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}