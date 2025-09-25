"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X, Upload } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const mockPointItems = [
  {
    id: "PI001",
    name: "Amazonギフト券 500円",
    category: "ギフト券",
    requiredPoints: 500,
    stock: 100,
    description: "Amazonで利用可能な500円分のギフト券",
    validityPeriod: "発行から6ヶ月",
    status: "有効",
    terms: "• 本ギフト券は現金との交換はできません\n• 有効期限内にご利用ください\n• 一度交換したポイントは返却できません",
  },
  {
    id: "PI002",
    name: "スターバックスカード 1000円",
    category: "ギフト券",
    requiredPoints: 1000,
    stock: 50,
    description: "スターバックスで利用可能な1000円分のカード",
    validityPeriod: "発行から12ヶ月",
    status: "有効",
    terms: "• スターバックス店舗でご利用いただけます\n• オンラインストアでは使用できません\n• 残高の払い戻しはできません",
  },
];

const categories = ["ギフト券", "ポイント", "クーポン", "商品"];
const validityOptions = [
  "無期限",
  "発行から1ヶ月",
  "発行から3ヶ月",
  "発行から6ヶ月",
  "発行から12ヶ月",
];

export default function PointItemEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const item = mockPointItems.find(i => i.id === resolvedParams.id) || mockPointItems[0];

  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    requiredPoints: item.requiredPoints.toString(),
    stock: item.stock.toString(),
    description: item.description,
    validityPeriod: item.validityPeriod,
    status: item.status,
    terms: item.terms || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/point-items/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/point-items/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/point-items/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">商品情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">商品ID: {item.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
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
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    在庫数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="有効">有効</option>
                    <option value="無効">無効</option>
                    <option value="在庫切れ">在庫切れ</option>
                  </select>
                </div>
              </div>

              {/* 画像アップロード */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品画像
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
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
                  placeholder="利用規約や注意事項を入力してください"
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
                    保存
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