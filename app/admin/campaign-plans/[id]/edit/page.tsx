"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const mockCampaignPlans = [
  {
    id: "PLAN001",
    name: "スタンダードプラン",
    issuanceCount: 1000,
    faceValue: 500,
    createdAt: "2024-01-10 09:00:00",
    updatedAt: "2024-03-15 14:30:00",
  },
  {
    id: "PLAN002",
    name: "プレミアムプラン",
    issuanceCount: 5000,
    faceValue: 1000,
    createdAt: "2024-01-15 10:30:00",
    updatedAt: "2024-03-20 16:45:00",
  },
];

export default function CampaignPlanEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const plan = mockCampaignPlans.find(p => p.id === resolvedParams.id) || mockCampaignPlans[0];

  const [formData, setFormData] = useState({
    name: plan.name,
    issuanceCount: plan.issuanceCount.toString(),
    faceValue: plan.faceValue.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/campaign-plans/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/campaign-plans/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/campaign-plans/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">プラン編集</h1>
            <p className="text-sm text-gray-600 mt-1">プランID: {plan.id}</p>
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
                    キャンペーンプラン名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="例: スタンダードプラン"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    発行枚数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.issuanceCount}
                    onChange={(e) => setFormData({ ...formData, issuanceCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ギフトカードの発行枚数を入力してください
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    額面（ギフトカード単価） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.faceValue}
                    onChange={(e) => setFormData({ ...formData, faceValue: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    1枚あたりの金額を円単位で入力してください
                  </p>
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