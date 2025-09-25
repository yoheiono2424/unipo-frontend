"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { mockIndustries } from "@/lib/mock-data";

export default function IndustryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const industry = mockIndustries.find(i => i.id === resolvedParams.id) || mockIndustries[0];

  const [formData, setFormData] = useState({
    name: industry.name,
    parentId: industry.parentId || "",
    order: (industry.order || 1).toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/industries/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/industries/${resolvedParams.id}`);
  };

  // 親業種候補（自分自身と自分の子業種は除く）
  const parentCandidates = mockIndustries.filter(ind =>
    ind.parentId === null && ind.id !== industry.id
  );

  const hasChildren = mockIndustries.some(i => i.parentId === industry.id);
  const isCurrentlyParent = !industry.parentId;

  const getIndustryType = (hasParent: boolean) => {
    return hasParent ? '小業種' : '大業種';
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/industries/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">業種編集</h1>
            <p className="text-sm text-gray-600 mt-1">業種ID: {industry.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    業種名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: 飲食業、レストラン"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      親業種
                    </label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      disabled={hasChildren && isCurrentlyParent}
                    >
                      <option value="">大業種として設定</option>
                      {parentCandidates.map((ind) => (
                        <option key={ind.id} value={ind.id}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      未選択の場合は大業種として設定されます
                    </p>
                    {hasChildren && isCurrentlyParent && (
                      <p className="text-xs text-orange-600 mt-1">
                        ⚠️ この業種には子業種があるため、他の業種の子に変更することはできません
                      </p>
                    )}
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

              {/* 業種階層説明 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">業種階層について</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• <strong>大業種</strong>: 飲食業、小売業、サービス業など</li>
                  <li>• <strong>小業種</strong>: レストラン、コンビニエンスストア、美容院など</li>
                  <li>• 業種の階層は最大2レベルまでです</li>
                </ul>
              </div>

              {/* 注意事項 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">編集時の注意事項</h3>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• この業種に属する店舗がある場合、業種変更は慎重に行ってください</li>
                  <li>• 子業種がある場合、その業種を他の業種の子に変更することはできません</li>
                  <li>• 業種名を変更すると、関連する店舗・商品の表示にも影響します</li>
                  <li>• 表示順を変更すると、店舗検索や絞り込み機能の順序に影響します</li>
                </ul>
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
                    保存
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
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    formData.parentId
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {getIndustryType(!!formData.parentId)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  {formData.parentId && (
                    <p>
                      親業種: {parentCandidates.find(i => i.id === formData.parentId)?.name || "—"}
                    </p>
                  )}
                  <p>表示順: {formData.order}</p>
                  {hasChildren && (
                    <p className="text-orange-600">
                      ⚠️ 子業種: {mockIndustries.filter(i => i.parentId === industry.id).length}個
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}