"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockCampaigns } from "@/lib/mock-data";

const mockAdvertisers = [
  "株式会社ABC",
  "XYZ株式会社",
  "グローバルフーズ株式会社",
];

const mockCampaignPlans = [
  {
    id: "PLAN001",
    name: "スタンダードプラン",
    issuanceCount: 1000,
    faceValue: 500,
  },
  {
    id: "PLAN002",
    name: "プレミアムプラン",
    issuanceCount: 5000,
    faceValue: 1000,
  },
  {
    id: "PLAN003",
    name: "エンタープライズプラン",
    issuanceCount: 10000,
    faceValue: 2000,
  },
];

export default function InvoiceNewPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    advertiser: "",
    campaign: "",
    billingPeriod: "",
    issueDate: "",
    dueDate: "",
    paymentMethod: "銀行振込",
    description: "",
  });

  // キャンペーン選択時に金額を自動計算
  const calculateAmounts = () => {
    if (!formData.campaign) {
      return { amount: 0, tax: 0, totalAmount: 0 };
    }

    const selectedCampaign = mockCampaigns.find(c => c.campaignName === formData.campaign);
    if (!selectedCampaign) {
      return { amount: 0, tax: 0, totalAmount: 0 };
    }

    const campaignPlan = mockCampaignPlans.find(p => p.id === selectedCampaign.campaignPlanId);
    if (!campaignPlan) {
      return { amount: 0, tax: 0, totalAmount: 0 };
    }

    const amount = campaignPlan.issuanceCount * campaignPlan.faceValue;
    const tax = Math.floor(amount * 0.1);
    const totalAmount = amount + tax;
    return { amount, tax, totalAmount };
  };

  const { amount, tax, totalAmount } = calculateAmounts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    const newInvoiceData = {
      ...formData,
      amount,
      tax,
      totalAmount,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: "未払い",
    };
    console.log("新規請求データ:", newInvoiceData);
    // 一覧ページに戻る
    router.push("/admin/invoices");
  };

  const handleCancel = () => {
    router.push("/admin/invoices");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/invoices"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新規請求作成</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">請求情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    広告主 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.advertiser}
                    onChange={(e) => setFormData({ ...formData, advertiser: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="">選択してください</option>
                    {mockAdvertisers.map((advertiser) => (
                      <option key={advertiser} value={advertiser}>
                        {advertiser}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーン <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.campaign}
                    onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="">選択してください</option>
                    {mockCampaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.campaignName}>
                        {campaign.campaignName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求期間 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.billingPeriod}
                    onChange={(e) => setFormData({ ...formData, billingPeriod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="例: 2025年1月"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    発行日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払期限 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払方法
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  >
                    <option value="銀行振込">銀行振込</option>
                    <option value="クレジットカード">クレジットカード</option>
                    <option value="請求書払い">請求書払い</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    備考
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="請求に関する備考を入力してください"
                    rows={3}
                  />
                </div>
              </div>

              {/* 金額計算結果 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">金額計算</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">小計</span>
                    <span className="text-sm font-medium text-gray-900">￥{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">消費税（10%）</span>
                    <span className="text-sm font-medium text-gray-900">￥{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-base font-semibold text-gray-900">合計金額</span>
                    <span className="text-lg font-bold text-gray-900">￥{totalAmount.toLocaleString()}</span>
                  </div>
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