"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Building2, User, Phone, Mail, Calendar, TrendingUp, Target, DollarSign } from "lucide-react";
import Link from "next/link";
import { mockAdvertisers, mockCampaigns } from "@/lib/mock-data";
import { use } from "react";

export default function AdvertiserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  const advertiser = mockAdvertisers.find(a => a.id === resolvedParams.id) || mockAdvertisers[0];

  const advertiserCampaigns = mockCampaigns.filter(c => c.advertiser === advertiser.companyName);

  const stats = {
    totalCampaigns: advertiserCampaigns.length,
    activeCampaigns: advertiserCampaigns.filter(c => c.status === 'active').length,
    totalBudget: advertiserCampaigns.reduce((sum, c) => {
      // budgetは数値型なのでそのまま加算
      return sum + (c.budget || 0);
    }, 0),
    totalDistributed: advertiserCampaigns.reduce((sum, c) => sum + c.distributed, 0),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/advertisers"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">広告主詳細</h1>
              <p className="text-sm text-gray-600 mt-1">広告主ID: {advertiser.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/advertisers/${advertiser.id}/edit`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">企業名</p>
                <p className="font-medium">{advertiser.companyName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">担当者名</p>
                <p className="font-medium">{advertiser.contactName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">電話番号</p>
                <p className="font-medium">{advertiser.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p className="font-medium">{advertiser.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 mt-0.5"></div>
              <div>
                <p className="text-sm text-gray-600">業種</p>
                <p className="font-medium">{advertiser.industryCode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">登録日</p>
                <p className="font-medium">{advertiser.registeredDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">ステータス</p>
              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                advertiser.status === '承認済み'
                  ? 'bg-green-100 text-green-800'
                  : advertiser.status === '審査中'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {advertiser.status}
              </span>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
            <p className="text-sm text-gray-600">総キャンペーン数</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
            <p className="text-sm text-gray-600">実施中</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">¥{stats.totalBudget.toLocaleString()}</p>
            <p className="text-sm text-gray-600">累計予算</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalDistributed}</p>
            <p className="text-sm text-gray-600">配布済みギフト</p>
          </div>
        </div>

        {/* キャンペーン履歴 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">キャンペーン履歴</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">キャンペーン名</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">期間</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">予算</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">配布状況</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {advertiserCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      キャンペーン履歴がありません
                    </td>
                  </tr>
                ) : (
                  advertiserCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b">
                      <td className="py-2 text-sm text-gray-600">
                        <Link href={`/admin/campaigns/${campaign.id}`} className="hover:text-indigo-600">
                          {campaign.name}
                        </Link>
                      </td>
                      <td className="py-2 text-sm text-gray-600">{campaign.period}</td>
                      <td className="py-2 text-sm text-gray-600">¥{campaign.budget.toLocaleString()}</td>
                      <td className="py-2 text-sm text-gray-600">
                        {campaign.distributed}/{campaign.total}
                      </td>
                      <td className="py-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : campaign.status === 'completed'
                            ? 'bg-purple-100 text-purple-800'
                            : campaign.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : campaign.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status === 'active' ? '実施中' :
                           campaign.status === 'completed' ? '完了' :
                           campaign.status === 'approved' ? '承認済み' :
                           campaign.status === 'pending' ? '審査中' :
                           campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}