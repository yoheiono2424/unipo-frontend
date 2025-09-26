"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

const mockGiftCards = [
  {
    id: "GC001",
    serialNumber: "AMZN-2025-0001",
    amount: 500,
    status: "未使用",
    issuedDate: null,
    createdDate: "2025-01-01",
    expiryDate: "2025-12-31",
  },
  {
    id: "GC002",
    serialNumber: "AMZN-2025-0002",
    amount: 1000,
    status: "配布済み",
    issuedDate: "2025-01-15",
    createdDate: "2025-01-01",
    expiryDate: "2025-12-31",
  },
];

export default function GiftCardEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const giftCard = mockGiftCards.find(gc => gc.id === resolvedParams.id) || mockGiftCards[0];

  const [formData, setFormData] = useState({
    serialNumber: giftCard.serialNumber,
    amount: giftCard.amount.toString(),
    status: giftCard.status,
    expiryDate: giftCard.expiryDate,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/gift-cards/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/gift-cards/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/gift-cards/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ギフトカード情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">カードID: {giftCard.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    シリアル番号
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    金額 (円) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min="100"
                    step="100"
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
                    <option value="未使用">未使用</option>
                    <option value="配布済み">配布済み</option>
                    <option value="使用済み">使用済み</option>
                    <option value="期限切れ">期限切れ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効期限 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    作成日: {giftCard.createdDate}
                    {giftCard.issuedDate && ` · 配布日: ${giftCard.issuedDate}`}
                  </p>
                  <div className="flex gap-3">
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
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}