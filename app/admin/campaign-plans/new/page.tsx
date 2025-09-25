"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CampaignPlanNewPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minBudget: "",
    maxBudget: "",
    duration: "",
    targetStores: "",
    features: [""],
    targetAudience: "",
    recommendedIndustries: [""],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    const newPlanData = {
      ...formData,
      id: `PLAN${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: "有効",
      usageCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };
    console.log("新規プランデータ:", newPlanData);
    // 一覧ページに戻る
    router.push("/admin/campaign-plans");
  };

  const handleCancel = () => {
    router.push("/admin/campaign-plans");
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addIndustry = () => {
    setFormData({ ...formData, recommendedIndustries: [...formData.recommendedIndustries, ""] });
  };

  const removeIndustry = (index: number) => {
    const newIndustries = formData.recommendedIndustries.filter((_, i) => i !== index);
    setFormData({ ...formData, recommendedIndustries: newIndustries });
  };

  const updateIndustry = (index: number, value: string) => {
    const newIndustries = [...formData.recommendedIndustries];
    newIndustries[index] = value;
    setFormData({ ...formData, recommendedIndustries: newIndustries });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/campaign-plans"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新規プラン作成</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">プラン情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    プラン名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: スタンダードプラン"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    プラン説明 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="プランの説明を入力してください"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最小予算 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.minBudget}
                    onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="100000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大予算 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.maxBudget}
                    onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="500000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    期間 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="1週間">1週間</option>
                    <option value="2週間">2週間</option>
                    <option value="1ヶ月">1ヶ月</option>
                    <option value="2ヶ月">2ヶ月</option>
                    <option value="3ヶ月">3ヶ月</option>
                    <option value="6ヶ月">6ヶ月</option>
                    <option value="6ヶ月〜">6ヶ月〜</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象店舗数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.targetStores}
                    onChange={(e) => setFormData({ ...formData, targetStores: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="10"
                    min="1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ターゲット顧客層
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="例: 20代〜40代の新規顧客"
                  />
                </div>
              </div>

              {/* プラン機能 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  プラン機能 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="機能名を入力"
                        required
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Plus className="h-4 w-4" />
                    機能を追加
                  </button>
                </div>
              </div>

              {/* 推奨業種 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  推奨業種
                </label>
                <div className="space-y-2">
                  {formData.recommendedIndustries.map((industry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => updateIndustry(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="業種名を入力"
                      />
                      {formData.recommendedIndustries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIndustry(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIndustry}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Plus className="h-4 w-4" />
                    業種を追加
                  </button>
                </div>
              </div>

              {/* 備考 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考・注意事項
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="備考や注意事項があれば入力してください"
                  rows={4}
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
                    作成
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