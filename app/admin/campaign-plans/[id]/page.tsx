"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Package, Hash, CreditCard, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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
  {
    id: "PLAN003",
    name: "エンタープライズプラン",
    issuanceCount: 10000,
    faceValue: 2000,
    createdAt: "2024-02-01 11:00:00",
    updatedAt: "2024-03-25 09:15:00",
  },
];

export default function CampaignPlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const plan = mockCampaignPlans.find(p => p.id === resolvedParams.id) || mockCampaignPlans[0];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/campaign-plans"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">キャンペーンプラン詳細</h1>
              <p className="text-sm text-gray-600 mt-1">プランID: {plan.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/campaign-plans/${plan.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">プラン情報</h2>
          </div>

          <div className="p-6">
            {/* プラン名とアイコン */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Package className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">キャンペーンプランID: {plan.id}</p>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド - 一覧と同じ6項目 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">作成日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">更新日時</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.updatedAt}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーンプランID</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.id}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーンプラン名</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.name}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">発行枚数</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.issuanceCount.toLocaleString()}枚</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">額面（ギフトカード単価）</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">¥{plan.faceValue.toLocaleString()}</p>
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