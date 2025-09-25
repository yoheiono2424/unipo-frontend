"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CampaignPlan = {
  id: string;
  name: string;
  description: string;
  minBudget: number;
  maxBudget: number;
  duration: string;
  targetStores: number;
  features: string[];
  status: string;
  createdDate: string;
};

const mockCampaignPlans: CampaignPlan[] = [
  {
    id: "PLAN001",
    name: "スタンダードプラン",
    description: "基本的なギフトカード配布キャンペーン",
    minBudget: 100000,
    maxBudget: 500000,
    duration: "1ヶ月",
    targetStores: 10,
    features: ["基本配布", "レポート機能", "メール通知"],
    status: "有効",
    createdDate: "2024-01-10",
  },
  {
    id: "PLAN002",
    name: "プレミアムプラン",
    description: "高度な分析機能付きキャンペーン",
    minBudget: 500000,
    maxBudget: 2000000,
    duration: "3ヶ月",
    targetStores: 50,
    features: ["基本配布", "詳細レポート", "リアルタイム分析", "専任サポート"],
    status: "有効",
    createdDate: "2024-01-15",
  },
  {
    id: "PLAN003",
    name: "エンタープライズプラン",
    description: "大規模展開向けカスタマイズ可能プラン",
    minBudget: 2000000,
    maxBudget: 10000000,
    duration: "6ヶ月〜",
    targetStores: 100,
    features: ["全機能", "カスタマイズ可能", "API連携", "24時間サポート"],
    status: "有効",
    createdDate: "2024-02-01",
  },
];

export default function AdminCampaignPlansPage() {
  const [searchPlanName, setSearchPlanName] = useState("");
  const router = useRouter();

  const plans = mockCampaignPlans.filter(plan =>
    searchPlanName === "" || plan.name.toLowerCase().includes(searchPlanName.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">キャンペーンプラン管理</h1>
            <p className="text-sm text-gray-600 mt-1">キャンペーンプランの一覧と管理</p>
          </div>
          <Link
            href="/admin/campaign-plans/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            新規プラン作成
          </Link>
        </div>

        {/* 検索 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              プラン名
            </label>
            <input
              type="text"
              placeholder="プラン名で検索"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchPlanName}
              onChange={(e) => setSearchPlanName(e.target.value)}
            />
          </div>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  プランID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  プラン名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  予算範囲
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  期間
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  対象店舗数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  機能
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作成日
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    プランデータがありません
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/campaign-plans/${plan.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {plan.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {plan.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ¥{plan.minBudget.toLocaleString()} 〜 ¥{plan.maxBudget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      最大{plan.targetStores}店舗
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {plan.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plan.status === '有効'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.createdDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}