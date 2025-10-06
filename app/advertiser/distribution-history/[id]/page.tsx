"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// モックデータ
const mockDistributionHistory = {
  "1": {
    id: "1",
    distributedAt: "2025-01-15 10:30:00",
    userId: "USER001",
    storeId: "STR001",
    storeName: "イオンモール幕張新都心",
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  },
  "2": {
    id: "2",
    distributedAt: "2025-01-15 11:45:00",
    userId: "USER002",
    storeId: "STR001",
    storeName: "イオンモール幕張新都心",
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  },
  "3": {
    id: "3",
    distributedAt: "2025-01-16 14:20:00",
    userId: "USER003",
    storeId: "STR002",
    storeName: "ららぽーと豊洲",
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  },
  "4": {
    id: "4",
    distributedAt: "2025-01-16 15:30:00",
    userId: "USER004",
    storeId: "STR003",
    storeName: "渋谷パルコ",
    campaignId: "CMP002",
    campaignName: "期間限定ポイント2倍",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  },
  "5": {
    id: "5",
    distributedAt: "2025-01-17 09:15:00",
    userId: "USER005",
    storeId: "STR002",
    storeName: "ららぽーと豊洲",
    campaignId: "CMP002",
    campaignName: "期間限定ポイント2倍",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  }
};

export default function AdvertiserDistributionHistoryDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const history = mockDistributionHistory[id as keyof typeof mockDistributionHistory] || mockDistributionHistory["1"];
  const [returnPath, setReturnPath] = React.useState("/advertiser/distributions/DST001");

  useEffect(() => {
    // クエリパラメータから戻り先を判定
    const from = searchParams.get('from');
    if (from === 'store') {
      const storeId = searchParams.get('storeId') || 'STR001234';
      setReturnPath(`/advertiser/distributions/stores/${storeId}`);
    } else if (from === 'campaign') {
      const campaignId = searchParams.get('campaignId') || 'DST001';
      setReturnPath(`/advertiser/distributions/${campaignId}`);
    }
  }, [searchParams]);

  return (
    <AdvertiserLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={returnPath}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布履歴詳細</h1>
            <p className="text-sm text-gray-600 mt-1">配布履歴ID: {history.id}</p>
          </div>
        </div>

        {/* 配布履歴詳細情報 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">配布履歴情報</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">配布日時</div>
                <div className="text-base text-gray-900">{history.distributedAt}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">ユーザーID</div>
                <div className="text-base text-gray-900">{history.userId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">店舗ID</div>
                <div className="text-base text-gray-900">{history.storeId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">店舗名</div>
                <div className="text-base text-gray-900">{history.storeName}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">キャンペーンID</div>
                <div className="text-base text-gray-900">{history.campaignId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">キャンペーン名</div>
                <div className="text-base text-gray-900">{history.campaignName}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">広告主ID</div>
                <div className="text-base text-gray-900">{history.advertiserId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">広告主名</div>
                <div className="text-base text-gray-900">{history.advertiserName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  );
}