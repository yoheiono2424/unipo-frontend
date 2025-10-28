"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { ChevronLeft, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockStores } from "@/lib/mock-data";

// キャンペーンプランのモックデータ
const campaignPlans = [
  { id: 'plan001', name: 'ベーシックプラン', issueCount: 1000, amount: 500 },
  { id: 'plan002', name: 'スタンダードプラン', issueCount: 5000, amount: 1000 },
  { id: 'plan003', name: 'プレミアムプラン', issueCount: 10000, amount: 3000 },
  { id: 'custom', name: 'カスタムプラン', issueCount: 0, amount: 0 }
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: "",
    advertiserId: "",
    advertiserName: "",
    planId: "",
    planName: "",
    giftCardAmount: 0,
    totalCards: 0,
    budget: "",
    actualCost: "",
    distributionScheduledDate: "",
    distributionStartDate: "",
    distributionStartTime: "",
    distributionEndDate: "",
    distributionEndTime: "",
    applicableStoreIds: [] as string[],
    campaignImage: null as File | null,
    registeredAt: "",
    registeredBy: "",
    // ターゲット設定
    isAgeUnrestricted: true,
    ageFrom: "",
    ageTo: "",
    targetGender: "指定なし",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  // キャンペーンプラン選択時に発行枚数と額面を自動設定
  useEffect(() => {
    if (formData.planId === '') {
      // 未選択の場合は0にする
      setFormData(prev => ({
        ...prev,
        giftCardAmount: 0,
        totalCards: 0
      }));
    } else {
      const selectedPlan = campaignPlans.find(plan => plan.id === formData.planId);
      if (selectedPlan && selectedPlan.id !== 'custom') {
        setFormData(prev => ({
          ...prev,
          planName: selectedPlan.name,
          giftCardAmount: selectedPlan.amount,
          totalCards: selectedPlan.issueCount
        }));
      } else if (selectedPlan && selectedPlan.id === 'custom') {
        // カスタムプランの場合は0にする（手動入力可能）
        setFormData(prev => ({
          ...prev,
          planName: selectedPlan.name,
          giftCardAmount: 0,
          totalCards: 0
        }));
      }
    }
  }, [formData.planId]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ファイルサイズチェック（5MB以内）
      if (file.size > 5 * 1024 * 1024) {
        alert('ファイルサイズは5MB以内にしてください');
        return;
      }
      // ファイル形式チェック
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('JPG、PNG、WEBP形式のファイルをアップロードしてください');
        return;
      }
      setFormData({ ...formData, campaignImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

            {/* ターゲット設定 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">ターゲット設定</h2>

              {/* 対象年齢 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">対象年齢</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAgeUnrestricted"
                      checked={formData.isAgeUnrestricted}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        isAgeUnrestricted: e.target.checked,
                        ageFrom: e.target.checked ? "" : prev.ageFrom,
                        ageTo: e.target.checked ? "" : prev.ageTo
                      }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      年齢制限なし
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">From（歳以上）</label>
                      <input
                        type="number"
                        name="ageFrom"
                        value={formData.ageFrom}
                        onChange={handleChange}
                        disabled={formData.isAgeUnrestricted}
                        min="0"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="例: 20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">To（歳以下）</label>
                      <input
                        type="number"
                        name="ageTo"
                        value={formData.ageTo}
                        onChange={handleChange}
                        disabled={formData.isAgeUnrestricted}
                        min="0"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="例: 40"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 対象性別 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">対象性別</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="指定なし"
                      checked={formData.targetGender === "指定なし"}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">指定なし</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="男性"
                      checked={formData.targetGender === "男性"}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">男性</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="targetGender"
                      value="女性"
                      checked={formData.targetGender === "女性"}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">女性</label>
                  </div>
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
                    キャンペーンプラン <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="planId"
                    value={formData.planId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="plan001">ベーシックプラン</option>
                    <option value="plan002">スタンダードプラン</option>
                    <option value="plan003">プレミアムプラン</option>
                    <option value="custom">カスタムプラン</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ギフトカード金額 (円) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="giftCardAmount"
                    value={formData.giftCardAmount}
                    onChange={(e) => setFormData({ ...formData, giftCardAmount: parseInt(e.target.value) || 0 })}
                    disabled={formData.planId !== 'custom' && formData.planId !== ''}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                      formData.planId !== 'custom' && formData.planId !== '' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    min="100"
                    step="100"
                    required
                  />
                  {formData.planId !== 'custom' && formData.planId !== '' && (
                    <p className="text-xs text-gray-500 mt-1">※カスタムプランの場合のみ編集可能</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    総発行枚数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalCards"
                    value={formData.totalCards}
                    onChange={(e) => setFormData({ ...formData, totalCards: parseInt(e.target.value) || 0 })}
                    disabled={formData.planId !== 'custom' && formData.planId !== ''}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                      formData.planId !== 'custom' && formData.planId !== '' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    min="1"
                    required
                  />
                  {formData.planId !== 'custom' && formData.planId !== '' && (
                    <p className="text-xs text-gray-500 mt-1">※カスタムプランの場合のみ編集可能</p>
                  )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キャンペーン画像 <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  JPG、PNG、WEBP形式（最大5MB）
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {imagePreview ? (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="プレビュー"
                        className="mx-auto mb-4 max-h-64 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, campaignImage: null });
                          setImagePreview('');
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        画像を削除
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 mb-1">クリックして画像をアップロード</span>
                      <span className="text-xs text-gray-500">JPG、PNG、WEBP（最大5MB）</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
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