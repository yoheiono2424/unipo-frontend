"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, CreditCard, DollarSign, Calendar, Hash, Shield } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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
    issuedTo: "田中太郎",
    createdDate: "2025-01-01",
    expiryDate: "2025-12-31",
  },
  {
    id: "GC003",
    serialNumber: "AMZN-2025-0003",
    amount: 2000,
    status: "使用済み",
    issuedDate: "2024-12-20",
    issuedTo: "佐藤花子",
    usedDate: "2024-12-25",
    createdDate: "2024-12-01",
    expiryDate: "2025-11-30",
  },
];

export default function GiftCardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const giftCard = mockGiftCards.find(gc => gc.id === resolvedParams.id) || mockGiftCards[0];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '未使用':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '配布済み':
        return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20';
      case '使用済み':
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
              href="/admin/gift-cards"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ギフトカード詳細</h1>
              <p className="text-sm text-gray-600 mt-1">カードID: {giftCard.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/gift-cards/${giftCard.id}/edit`}
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
            {/* ステータスバッジ */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">
                  <CreditCard className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{giftCard.serialNumber}</h3>
                  <p className="text-sm text-gray-600 mt-1">金額: ￥{giftCard.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(giftCard.status)}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {giftCard.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Hash className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">シリアル番号</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{giftCard.serialNumber}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">金額</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">￥{giftCard.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {giftCard.issuedDate && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{giftCard.issuedDate}</p>
                    </div>
                  </div>
                </div>
              )}

              {giftCard.usedDate && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">使用日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{giftCard.usedDate}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{giftCard.createdDate}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">有効期限</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{giftCard.expiryDate}</p>
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