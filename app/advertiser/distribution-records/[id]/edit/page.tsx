"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// モックデータ
const mockDistributionData = {
  "1": {
    id: "1",
    distributedAt: "2025-01-15 10:30:00",
    userId: "USER001",
    storeId: "STR001",
    storeName: "イオンモール幕張新都心",
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    distributionCount: 100
  },
  "2": {
    id: "2",
    distributedAt: "2025-01-16 14:20:00",
    userId: "USER002",
    storeId: "STR002",
    storeName: "ららぽーと豊洲",
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    distributionCount: 200
  }
};

const mockStores = [
  { id: "STR001", name: "イオンモール幕張新都心" },
  { id: "STR002", name: "ららぽーと豊洲" },
  { id: "STR003", name: "渋谷パルコ" },
  { id: "STR004", name: "新宿ルミネ" },
  { id: "STR005", name: "表参道ヒルズ" }
];

const mockCampaigns = [
  { id: "CMP001", name: "春の新生活応援キャンペーン" },
  { id: "CMP002", name: "期間限定ポイント2倍" },
  { id: "CMP003", name: "バレンタインキャンペーン" },
  { id: "CMP004", name: "ホワイトデー特別企画" },
  { id: "CMP005", name: "GW限定キャンペーン" }
];

export default function AdvertiserDistributionRecordEditPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);

  // モックデータから現在のデータを取得
  const currentData = mockDistributionData[resolvedParams.id as keyof typeof mockDistributionData] || mockDistributionData["1"];

  const [formData, setFormData] = useState({
    distributionDateTime: currentData.distributedAt.replace(" ", "T"),
    storeId: currentData.storeId,
    storeName: currentData.storeName,
    campaignId: currentData.campaignId,
    campaignName: currentData.campaignName,
    distributionCount: currentData.distributionCount.toString()
  });

  // 戻り先のパスを決定
  const getReturnPath = () => {
    const from = searchParams.get('from');
    const campaignId = searchParams.get('campaignId') || 'DST001';
    const storeId = searchParams.get('storeId') || 'STR001234';

    if (from === 'store') {
      return `/advertiser/distributions/stores/${storeId}`;
    } else {
      return `/advertiser/distributions/${campaignId}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("配布履歴更新:", formData);
    // TODO: API呼び出し
    router.push(getReturnPath());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStore = mockStores.find(s => s.id === e.target.value);
    if (selectedStore) {
      setFormData(prev => ({
        ...prev,
        storeId: selectedStore.id,
        storeName: selectedStore.name
      }));
    }
  };

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCampaign = mockCampaigns.find(c => c.id === e.target.value);
    if (selectedCampaign) {
      setFormData(prev => ({
        ...prev,
        campaignId: selectedCampaign.id,
        campaignName: selectedCampaign.name
      }));
    }
  };

  return (
    <AdvertiserLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={getReturnPath()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布履歴編集</h1>
            <p className="text-sm text-gray-600 mt-1">配布履歴を編集します</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 配布情報 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">配布情報</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 配布日時 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布日時 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="distributionDateTime"
                    value={formData.distributionDateTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>

                {/* 配布枚数 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布枚数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="distributionCount"
                    value={formData.distributionCount}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    placeholder="例：100"
                  />
                </div>

                {/* 店舗名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.storeId}
                    onChange={handleStoreChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  >
                    {mockStores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 店舗ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗ID
                  </label>
                  <input
                    type="text"
                    name="storeId"
                    value={formData.storeId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none text-gray-900"
                    readOnly
                  />
                </div>

                {/* キャンペーン名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーン名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.campaignId}
                    onChange={handleCampaignChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  >
                    {mockCampaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* キャンペーンID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーンID
                  </label>
                  <input
                    type="text"
                    name="campaignId"
                    value={formData.campaignId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none text-gray-900"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              更新する
            </button>
            <Link
              href={getReturnPath()}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </AdvertiserLayout>
  );
}