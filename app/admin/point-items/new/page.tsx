"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["ギフト券", "ポイント", "クーポン", "商品"];
const validityOptions = [
  "無期限",
  "発行から1ヶ月",
  "発行から3ヶ月",
  "発行から6ヶ月",
  "発行から12ヶ月",
];

export default function PointItemNewPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "ギフト券",
    requiredPoints: "",
    stock: "",
    description: "",
    validityPeriod: "発行から6ヶ月",
    terms: "",
    requiresStockManagement: "要",
    provider: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    const newItemData = {
      ...formData,
      id: `PI${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: "有効",
      exchangeCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };
    console.log("新規商品データ:", newItemData);
    // 一覧ページに戻る
    router.push("/admin/point-items");
  };

  const handleCancel = () => {
    router.push("/admin/point-items");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/point-items"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新規商品登録</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">商品情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: Amazonギフト券 500円"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    必要ポイント <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.requiredPoints}
                    onChange={(e) => setFormData({ ...formData, requiredPoints: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="500"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    初期在庫数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="100"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効期限 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.validityPeriod}
                    onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    {validityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    在庫管理要否 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.requiresStockManagement}
                    onChange={(e) => setFormData({ ...formData, requiresStockManagement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="要">要</option>
                    <option value="不要">不要</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    提供元 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: Amazon Japan"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    説明 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="商品の説明を入力してください"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* 画像アップロード */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品画像
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    クリックまたはドラッグ&ドロップで画像をアップロード
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG、JPG、GIF形式（最大5MB）
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              {/* 利用規約 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  利用規約・注意事項
                </label>
                <textarea
                  value={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="利用規約や注意事項を入力してください（例: • 本ギフト券は現金との交換はできません）"
                  rows={5}
                />
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
                    登録
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}