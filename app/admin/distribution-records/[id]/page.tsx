"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Gift, Store, Calendar, User, CreditCard, TrendingUp, Package } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const mockDistributionRecords = [
  {
    id: "DST001",
    recordId: "DIST-2025-0001",
    giftCardId: "GC001",
    serialNumber: "AMZN-2025-0001",
    amount: 500,
    recipientId: "MEM001",
    recipientName: "田中太郎",
    recipientEmail: "tanaka@example.com",
    storeId: "STR001",
    storeName: "カフェ モカ",
    campaign: "新春キャンペーン2025",
    distributionDate: "2025-01-15",
    usageStatus: "未使用",
    usageDate: null,
    distributionMethod: "メール送信",
    status: "配布済み",
  },
  {
    id: "DST002",
    recordId: "DIST-2025-0002",
    giftCardId: "GC002",
    serialNumber: "AMZN-2025-0002",
    amount: 1000,
    recipientId: "MEM002",
    recipientName: "佐藤花子",
    recipientEmail: "sato@example.com",
    storeId: "STR002",
    storeName: "レストラン サクラ",
    campaign: "新春キャンペーン2025",
    distributionDate: "2025-01-16",
    usageStatus: "使用済み",
    usageDate: "2025-01-20",
    distributionMethod: "店頭配布",
    status: "使用済み",
  },
];

export default function DistributionRecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const record = mockDistributionRecords.find(r => r.id === resolvedParams.id) || mockDistributionRecords[0];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case '配布済み':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case '使用済み':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
      case '期限切れ':
        return 'bg-red-50 text-red-700 ring-1 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  const getUsageStatusBadge = (status: string) => {
    switch(status) {
      case '未使用':
        return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20';
      case '使用済み':
        return 'bg-green-50 text-green-700 ring-1 ring-green-600/20';
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
              href="/admin/distributions"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">配布実績詳細</h1>
              <p className="text-sm text-gray-600 mt-1">記録ID: {record.recordId}</p>
            </div>
          </div>
          <Link
            href={`/admin/distribution-records/${record.id}/edit`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">配布情報</h2>
          </div>

          <div className="p-6">
            {/* ステータス表示 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  <Package className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{record.recordId}</h3>
                  <p className="text-sm text-gray-600 mt-1">配布日: {record.distributionDate}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getUsageStatusBadge(record.usageStatus)}`}>
                      {record.usageStatus}
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
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ギフトカード</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.serialNumber}</p>
                    <p className="text-xs text-gray-600">金額: ￥{record.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Gift className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.campaign}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布先</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.recipientName}</p>
                    <p className="text-xs text-gray-600">{record.recipientEmail}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Store className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布店舗</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.storeName}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布方法</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.distributionMethod}</p>
                  </div>
                </div>
              </div>

              <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">配布日</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{record.distributionDate}</p>
                  </div>
                </div>
              </div>

              {record.usageDate && (
                <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">使用日</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{record.usageDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}