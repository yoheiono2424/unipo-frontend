"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { ChevronLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockStores } from "@/lib/mock-data";

export default function NewCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: "",
    advertiserId: "",
    advertiserName: "",
    planId: "",
    planName: "",
    budget: "",
    actualCost: "",
    distributionScheduledDate: "",
    distributionStartDate: "",
    distributionStartTime: "",
    distributionEndDate: "",
    distributionEndTime: "",
    applicableStoreIds: [] as string[],
    campaignThumbnailImageUrl: "",
    campaignBannerImageUrl: "",
    campaignDetailImageUrl1: "",
    campaignDetailImageUrl2: "",
    campaignDetailImageUrl3: "",
    registeredAt: "",
    registeredBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreToggle = (storeId: string) => {
    setFormData((prev) => ({
      ...prev,
      applicableStoreIds: prev.applicableStoreIds.includes(storeId)
        ? prev.applicableStoreIds.filter((id) => id !== storeId)
        : [...prev.applicableStoreIds, storeId],
    }));
  };

  const handleSubmit = () => {
    // 実際のAPIコールはここに実装
    router.push("/admin/campaigns");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/campaigns"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold">新規キャンペーン登録</h1>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/admin/campaigns"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  キャンセル
                </Link>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  登録する
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    キャンペーン名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* プラン・広告主情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">プラン・広告主情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    広告主ID
                  </label>
                  <input
                    type="text"
                    name="advertiserId"
                    value={formData.advertiserId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    広告主名
                  </label>
                  <input
                    type="text"
                    name="advertiserName"
                    value={formData.advertiserName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    プランID
                  </label>
                  <input
                    type="text"
                    name="planId"
                    value={formData.planId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    プラン名
                  </label>
                  <input
                    type="text"
                    name="planName"
                    value={formData.planName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    予算
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    実費用
                  </label>
                  <input
                    type="number"
                    name="actualCost"
                    value={formData.actualCost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 配信設定 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">配信設定</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    配信予定日
                  </label>
                  <input
                    type="date"
                    name="distributionScheduledDate"
                    value={formData.distributionScheduledDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    配信開始日
                  </label>
                  <input
                    type="date"
                    name="distributionStartDate"
                    value={formData.distributionStartDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    配信開始時刻
                  </label>
                  <input
                    type="time"
                    name="distributionStartTime"
                    value={formData.distributionStartTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    配信終了日
                  </label>
                  <input
                    type="date"
                    name="distributionEndDate"
                    value={formData.distributionEndDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    配信終了時刻
                  </label>
                  <input
                    type="time"
                    name="distributionEndTime"
                    value={formData.distributionEndTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 対象店舗 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">対象店舗</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {mockStores.map((store) => (
                  <label key={store.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.applicableStoreIds.includes(store.id)}
                      onChange={() => handleStoreToggle(store.id)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{store.storeName}</div>
                      <div className="text-sm text-gray-500">{store.storeNo}</div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                選択済み: {formData.applicableStoreIds.length}店舗
              </p>
            </div>

            {/* キャンペーン画像 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">キャンペーン画像</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    サムネイル画像URL
                  </label>
                  <input
                    type="url"
                    name="campaignThumbnailImageUrl"
                    value={formData.campaignThumbnailImageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.campaignThumbnailImageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.campaignThumbnailImageUrl}
                        alt="サムネイル画像プレビュー"
                        className="h-24 w-24 object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    バナー画像URL
                  </label>
                  <input
                    type="url"
                    name="campaignBannerImageUrl"
                    value={formData.campaignBannerImageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.campaignBannerImageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.campaignBannerImageUrl}
                        alt="バナー画像プレビュー"
                        className="h-32 w-auto object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細画像URL 1
                  </label>
                  <input
                    type="url"
                    name="campaignDetailImageUrl1"
                    value={formData.campaignDetailImageUrl1}
                    onChange={handleChange}
                    placeholder="https://example.com/detail1.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.campaignDetailImageUrl1 && (
                    <div className="mt-2">
                      <img
                        src={formData.campaignDetailImageUrl1}
                        alt="詳細画像1プレビュー"
                        className="h-32 w-auto object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細画像URL 2
                  </label>
                  <input
                    type="url"
                    name="campaignDetailImageUrl2"
                    value={formData.campaignDetailImageUrl2}
                    onChange={handleChange}
                    placeholder="https://example.com/detail2.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.campaignDetailImageUrl2 && (
                    <div className="mt-2">
                      <img
                        src={formData.campaignDetailImageUrl2}
                        alt="詳細画像2プレビュー"
                        className="h-32 w-auto object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細画像URL 3
                  </label>
                  <input
                    type="url"
                    name="campaignDetailImageUrl3"
                    value={formData.campaignDetailImageUrl3}
                    onChange={handleChange}
                    placeholder="https://example.com/detail3.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.campaignDetailImageUrl3 && (
                    <div className="mt-2">
                      <img
                        src={formData.campaignDetailImageUrl3}
                        alt="詳細画像3プレビュー"
                        className="h-32 w-auto object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}