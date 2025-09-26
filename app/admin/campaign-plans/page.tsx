"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CampaignPlan = {
  id: string;
  name: string;
  issuanceCount: number;
  faceValue: number;
  createdAt: string;
  updatedAt: string;
};

const mockCampaignPlans: CampaignPlan[] = [
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
  {
    id: "PLAN003",
    name: "エンタープライズプラン",
    issuanceCount: 10000,
    faceValue: 2000,
    createdAt: "2024-02-01 11:00:00",
    updatedAt: "2024-03-25 09:15:00",
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
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
                  作成日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  更新日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーンプランID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  キャンペーンプラン名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  発行枚数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  額面（ギフトカード単価）
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {plan.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.issuanceCount.toLocaleString()}枚
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{plan.faceValue.toLocaleString()}
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