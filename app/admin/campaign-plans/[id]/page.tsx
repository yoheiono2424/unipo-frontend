"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Package, DollarSign, Clock, Store, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";

const mockCampaignPlans = [
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
    updatedDate: "2025-01-15",
    usageCount: 25,
    averagePerformance: "85%",
    targetAudience: "20代〜40代の新規顧客",
    recommendedIndustries: ["飲食店", "小売業", "サービス業"],
    notes: "最も利用されているベーシックなプランです。初めてのキャンペーンに最適。",
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
    updatedDate: "2025-01-20",
    usageCount: 15,
    averagePerformance: "92%",
    targetAudience: "全年齢層の幅広い顧客",
    recommendedIndustries: ["大型商業施設", "チェーン店", "百貨店"],
    notes: "分析機能が充実しており、PDCAサイクルを回しやすいプランです。",
  },
];

export default function CampaignPlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const plan = mockCampaignPlans.find(p => p.id === resolvedParams.id) || mockCampaignPlans[0];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '有効':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '無効':
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900">プラン詳細</h1>
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
            <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
          </div>

          <div className="p-6">
            {/* ステータスとプラン情報 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Package className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(plan.status)}`}>
                      {plan.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">利用実績: {plan.usageCount}件</span>
                    </div>
                    <span className="text-sm text-gray-500">平均達成率: {plan.averagePerformance}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">予算範囲</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ¥{plan.minBudget.toLocaleString()} 〜 ¥{plan.maxBudget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">期間</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.duration}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Store className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">対象店舗数</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">最大{plan.targetStores}店舗</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{plan.updatedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 機能一覧 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">プラン機能</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ターゲット情報 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ターゲット情報</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">ターゲット顧客層</p>
                  <p className="text-sm text-gray-600">{plan.targetAudience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">推奨業種</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.recommendedIndustries.map((industry, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 備考 */}
            {plan.notes && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">備考</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{plan.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}