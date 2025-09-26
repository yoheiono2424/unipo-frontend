"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// モックデータ
const mockStores = [
  { id: "STR001", name: "カフェ モカ" },
  { id: "STR002", name: "レストラン オリーブ" },
  { id: "STR003", name: "ベーカリー サン" },
  { id: "STR004", name: "居酒屋 月光" },
  { id: "STR005", name: "ラーメン 一番" },
];

const mockCampaigns = [
  { id: "CMP001", name: "新春キャンペーン2025" },
  { id: "CMP002", name: "春の感謝祭" },
  { id: "CMP003", name: "バレンタインキャンペーン" },
  { id: "CMP004", name: "ホワイトデー特別企画" },
  { id: "CMP005", name: "GW限定キャンペーン" },
];

export default function CreateDistributionRecordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 店舗検索関連
  const [storeSearch, setStoreSearch] = useState("");
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [filteredStores, setFilteredStores] = useState(mockStores);

  // キャンペーン検索関連
  const [campaignSearch, setCampaignSearch] = useState("");
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);

  const [formData, setFormData] = useState({
    distributionDateTime: "",
    storeId: "",
    storeName: "",
    campaignId: "",
    campaignName: "",
    distributionCount: "",
  });

  // URLパラメータからキャンペーン情報を取得
  useEffect(() => {
    const campaignId = searchParams.get("campaignId");
    const campaignName = searchParams.get("campaignName");

    if (campaignId && campaignName) {
      setFormData(prev => ({
        ...prev,
        campaignId: campaignId,
        campaignName: decodeURIComponent(campaignName)
      }));
      setCampaignSearch(decodeURIComponent(campaignName));
    }
  }, [searchParams]);

  // 店舗検索処理
  useEffect(() => {
    const filtered = mockStores.filter(store =>
      store.name.toLowerCase().includes(storeSearch.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [storeSearch]);

  // キャンペーン検索処理
  useEffect(() => {
    const filtered = mockCampaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(campaignSearch.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [campaignSearch]);

  const handleStoreSelect = (store: { id: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      storeId: store.id,
      storeName: store.name
    }));
    setStoreSearch(store.name);
    setShowStoreDropdown(false);
  };

  const handleCampaignSelect = (campaign: { id: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      campaignId: campaign.id,
      campaignName: campaign.name
    }));
    setCampaignSearch(campaign.name);
    setShowCampaignDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 店舗IDの自動設定
    if (storeSearch && !formData.storeId) {
      const matchedStore = mockStores.find(s => s.name === storeSearch);
      if (matchedStore) {
        formData.storeId = matchedStore.id;
      }
    }

    // キャンペーンIDの自動設定
    if (campaignSearch && !formData.campaignId) {
      const matchedCampaign = mockCampaigns.find(c => c.name === campaignSearch);
      if (matchedCampaign) {
        formData.campaignId = matchedCampaign.id;
      }
    }

    console.log("配布履歴作成:", formData);
    // TODO: API呼び出し
    router.push("/admin/distribution-records/1");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/distribution-records/1"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布履歴作成</h1>
            <p className="text-sm text-gray-600 mt-1">新しい配布履歴を作成します</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="例：100"
                  />
                </div>

                {/* 店舗名 */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    店舗名 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={storeSearch}
                      onChange={(e) => {
                        setStoreSearch(e.target.value);
                        setShowStoreDropdown(true);
                      }}
                      onFocus={() => setShowStoreDropdown(true)}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="店舗名を検索"
                    />
                  </div>

                  {showStoreDropdown && filteredStores.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredStores.map((store) => (
                        <button
                          key={store.id}
                          type="button"
                          onClick={() => handleStoreSelect(store)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          <div className="font-medium text-gray-900">{store.name}</div>
                          <div className="text-sm text-gray-500">{store.id}</div>
                        </button>
                      ))}
                    </div>
                  )}
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="店舗名選択時に自動入力"
                    readOnly
                  />
                </div>

                {/* キャンペーン名 */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーン名 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={campaignSearch}
                      onChange={(e) => {
                        setCampaignSearch(e.target.value);
                        setShowCampaignDropdown(true);
                      }}
                      onFocus={() => setShowCampaignDropdown(true)}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="キャンペーン名を検索"
                    />
                  </div>

                  {showCampaignDropdown && filteredCampaigns.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredCampaigns.map((campaign) => (
                        <button
                          key={campaign.id}
                          type="button"
                          onClick={() => handleCampaignSelect(campaign)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          <div className="font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.id}</div>
                        </button>
                      ))}
                    </div>
                  )}
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="キャンペーン名選択時に自動入力"
                    readOnly
                  />
                </div>
              </div>

              {/* ドロップダウンを閉じるための透明なオーバーレイ */}
              {(showStoreDropdown || showCampaignDropdown) && (
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => {
                    setShowStoreDropdown(false);
                    setShowCampaignDropdown(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              作成する
            </button>
            <Link
              href="/admin/distribution-records/1"
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}