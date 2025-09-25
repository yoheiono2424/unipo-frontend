"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { mockAreas } from "@/lib/mock-data";

export default function AreaEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const area = mockAreas.find(a => a.id === resolvedParams.id) || mockAreas[0];

  const [formData, setFormData] = useState({
    name: area.name,
    parentId: area.parentId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/areas/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/areas/${resolvedParams.id}`);
  };

  // 親エリア候補（階層レベル2までの制限、自分自身と子エリアは除く）
  const getParentCandidates = () => {
    const childAreaIds = mockAreas
      .filter(a => a.parentId === area.id)
      .map(a => a.id);

    return mockAreas.filter(a => {
      // 自分自身は除く
      if (a.id === area.id) return false;
      // 自分の子エリアは除く
      if (childAreaIds.includes(a.id)) return false;
      // レベル1（親なし）またはレベル2（親はレベル1のみ）のエリアを返す
      if (!a.parentId) return true; // レベル1
      const parent = mockAreas.find(p => p.id === a.parentId);
      return parent && !parent.parentId; // レベル2（親がレベル1）
    });
  };

  const parentCandidates = getParentCandidates();

  const getHierarchyType = (areaId: string | null) => {
    if (!areaId) return '地方・地域';
    const area = mockAreas.find(a => a.id === areaId);
    if (!area) return '都道府県';
    if (!area.parentId) return '都道府県';
    return '市区町村';
  };

  const hasChildren = mockAreas.some(a => a.parentId === area.id);
  const currentLevel = area.parentId
    ? mockAreas.find(a => a.id === area.parentId)?.parentId ? 3 : 2
    : 1;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/areas/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">エリア編集</h1>
            <p className="text-sm text-gray-600 mt-1">エリアID: {area.id}</p>
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
                    エリア名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: 東京都、渋谷区"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    親エリア
                  </label>
                  <select
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={hasChildren && currentLevel === 1}
                  >
                    <option value="">地方・地域として設定</option>
                    {parentCandidates.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name} ({getHierarchyType(area.parentId)})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    未選択の場合は最上位の地方・地域として設定されます。階層は最大3レベルまでです。
                  </p>
                  {hasChildren && currentLevel === 1 && (
                    <p className="text-xs text-orange-600 mt-1">
                      ⚠️ このエリアには子エリアがあるため、他のエリアの子に変更することはできません
                    </p>
                  )}
                </div>
              </div>

              {/* 階層説明 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">エリア階層について</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• <strong>レベル1（地方・地域）</strong>: 関東、関西、九州など</li>
                  <li>• <strong>レベル2（都道府県）</strong>: 東京都、大阪府、福岡県など</li>
                  <li>• <strong>レベル3（市区町村）</strong>: 渋谷区、大阪市、福岡市など</li>
                </ul>
              </div>

              {/* 注意事項 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">編集時の注意事項</h3>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• このエリアに属する店舗がある場合、エリア変更は慎重に行ってください</li>
                  <li>• 子エリアがある場合、そのエリアを他のエリアの子に変更することはできません</li>
                  <li>• エリア名を変更すると、関連する店舗の表示にも影響します</li>
                  <li>• 階層を変更すると、検索や絞り込み機能に影響する可能性があります</li>
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
                    !formData.parentId
                      ? 'bg-green-100 text-green-800'
                      : getHierarchyType(formData.parentId) === '都道府県'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {getHierarchyType(formData.parentId)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                <div className="text-sm text-gray-600">
                  {formData.parentId && (
                    <p>
                      親エリア: {parentCandidates.find(a => a.id === formData.parentId)?.name || "—"}
                    </p>
                  )}
                  <p>
                    階層レベル: レベル {!formData.parentId ? 1 : getHierarchyType(formData.parentId) === '都道府県' ? 2 : 3}
                  </p>
                  {hasChildren && (
                    <p className="text-orange-600">
                      ⚠️ 子エリア: {mockAreas.filter(a => a.parentId === area.id).length}個
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