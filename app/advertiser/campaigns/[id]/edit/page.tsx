"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { ArrowLeft, Save, X, Gift, Hash, Package, FileImage, MapPin, Copy } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { mockCampaigns, mockStores } from "@/lib/mock-data";

export default function CampaignEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const campaign = mockCampaigns.find(c => c.id === resolvedParams.id) || mockCampaigns[0];

  const [formData, setFormData] = useState({
    campaignNo: campaign.campaignNo,
    campaignName: campaign.campaignName,
    campaignPlanId: campaign.campaignPlanId,
    campaignPlanName: campaign.campaignPlanName,
    startDate: campaign.startDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    endDate: campaign.endDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    giftCardAmount: campaign.giftCardAmount,
    totalCards: campaign.totalCards,
    budgetAmount: campaign.budgetAmount,
    campaignDescription: campaign.campaignDescription,
    targetStores: campaign.targetStores || [],
    distributionMethod: campaign.distributionMethod,
    campaignImage1: campaign.campaignImage1,
    campaignImage2: campaign.campaignImage2,
    campaignImage3: campaign.campaignImage3,
    campaignImage4: campaign.campaignImage4,
    campaignImage5: campaign.campaignImage5,
  });

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saveData = {
      ...formData,
      startDate: formData.startDate.replace(/-/g, ''),
      endDate: formData.endDate.replace(/-/g, ''),
      targetStores: campaign.targetStores || [],
    };
    console.log("保存データ:", saveData);
    router.push(`/advertiser/campaigns/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/advertiser/campaigns/${resolvedParams.id}`);
  };

  const handleDuplicateClick = () => {
    setShowDuplicateModal(true);
  };

  const handleDuplicateConfirm = () => {
    // 新しいキャンペーンIDとNoを生成
    const maxId = Math.max(...mockCampaigns.map(c => parseInt(c.id.replace('camp', ''))));
    const newId = `camp${(maxId + 1).toString().padStart(3, '0')}`;

    const maxCampaignNo = Math.max(...mockCampaigns.map(c => parseInt(c.campaignNo.replace('CMP', ''))));
    const newCampaignNo = `CMP${(maxCampaignNo + 1).toString().padStart(3, '0')}`;

    // 複製データの作成
    const duplicateData = {
      ...formData,
      id: newId,
      campaignNo: newCampaignNo,
      campaignName: formData.campaignName + 'のコピー',
      startDate: formData.startDate.replace(/-/g, ''),
      endDate: formData.endDate.replace(/-/g, ''),
      targetStores: campaign.targetStores || [],
    };

    console.log("複製データ:", duplicateData);
    setShowDuplicateModal(false);
    router.push(`/advertiser/campaigns/${newId}/edit`);
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateModal(false);
  };

  return (
    <AdvertiserLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/advertiser/campaigns/${resolvedParams.id}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">キャンペーン情報編集</h1>
              <p className="text-sm text-gray-600 mt-1">キャンペーンID: {campaign.id} | キャンペーンNO: {campaign.campaignNo}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDuplicateClick}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium"
          >
            <Copy className="h-4 w-4" />
            複製
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーンNO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.campaignNo}
                    onChange={(e) => setFormData({ ...formData, campaignNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーン名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.campaignName}
                    onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* プラン情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900">プラン情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    プラン名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.campaignPlanName}
                    onChange={(e) => setFormData({ ...formData, campaignPlanName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="スタンダードプラン">スタンダードプラン</option>
                    <option value="プレミアムプラン">プレミアムプラン</option>
                    <option value="エンタープライズプラン">エンタープライズプラン</option>
                    <option value="カスタムプラン">カスタムプラン</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 配布設定セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900">配布設定</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    開始日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    終了日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ギフトカード金額 (円) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.giftCardAmount}
                    onChange={(e) => setFormData({ ...formData, giftCardAmount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    min="100"
                    step="100"
                    disabled={formData.campaignPlanName !== 'カスタムプラン'}
                    required
                  />
                  {formData.campaignPlanName !== 'カスタムプラン' && (
                    <p className="text-xs text-gray-500 mt-1">※カスタムプランの場合のみ編集可能</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    総発行枚数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalCards}
                    onChange={(e) => setFormData({ ...formData, totalCards: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    min="1"
                    disabled={formData.campaignPlanName !== 'カスタムプラン'}
                    required
                  />
                  {formData.campaignPlanName !== 'カスタムプラン' && (
                    <p className="text-xs text-gray-500 mt-1">※カスタムプランの場合のみ編集可能</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  キャンペーン説明
                </label>
                <textarea
                  value={formData.campaignDescription}
                  onChange={(e) => setFormData({ ...formData, campaignDescription: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="キャンペーンの詳細説明を入力してください"
                />
              </div>
            </div>
          </div>

          {/* 対象店舗セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">対象店舗</h2>
                <span className="ml-2 text-sm text-gray-500">({(campaign.targetStores || []).length}店舗選択)</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">※対象店舗は編集できません。変更が必要な場合は運営者にお問い合わせください。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {mockStores.map((store) => (
                  <label
                    key={store.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 cursor-not-allowed"
                  >
                    <input
                      type="checkbox"
                      checked={(campaign.targetStores || []).includes(store.id)}
                      disabled
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 opacity-50"
                    />
                    <span className="text-sm text-gray-500">{store.storeName || store.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* キャンペーン画像セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileImage className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">キャンペーン画像</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像1 URL
                  </label>
                  <input
                    type="text"
                    value={formData.campaignImage1}
                    onChange={(e) => setFormData({ ...formData, campaignImage1: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像2 URL
                  </label>
                  <input
                    type="text"
                    value={formData.campaignImage2}
                    onChange={(e) => setFormData({ ...formData, campaignImage2: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像3 URL
                  </label>
                  <input
                    type="text"
                    value={formData.campaignImage3}
                    onChange={(e) => setFormData({ ...formData, campaignImage3: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像4 URL
                  </label>
                  <input
                    type="text"
                    value={formData.campaignImage4}
                    onChange={(e) => setFormData({ ...formData, campaignImage4: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像5 URL
                  </label>
                  <input
                    type="text"
                    value={formData.campaignImage5}
                    onChange={(e) => setFormData({ ...formData, campaignImage5: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="画像URLを入力"
                  />
                </div>
              </div>

              {/* プレビュー */}
              <div className="border-t pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">画像プレビュー</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[formData.campaignImage1, formData.campaignImage2, formData.campaignImage3, formData.campaignImage4, formData.campaignImage5].map((url, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {url ? (
                        <img
                          src={url}
                          alt={`画像${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <FileImage className="h-6 w-6 mb-1" />
                          <span className="text-xs">画像{index + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  配布済み: {campaign.distributedCards?.toLocaleString()}枚 ·
                  進捗率: {Math.round((campaign.distributedCards / campaign.totalCards) * 100)}%
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium"
                  >
                    <X className="h-5 w-5" />
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors font-medium shadow-lg"
                  >
                    <Save className="h-5 w-5" />
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* 複製確認モーダル */}
        {showDuplicateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">キャンペーンの複製確認</h3>
                <p className="text-sm text-gray-600">
                  このキャンペーンを複製してもよろしいですか？
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">元のキャンペーン名:</span>
                  <span className="font-medium text-gray-900">{formData.campaignName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">複製後のキャンペーン名:</span>
                  <span className="font-medium text-gray-900">{formData.campaignName}のコピー</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    ※キャンペーンID・Noは自動で新規採番されます
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDuplicateCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={handleDuplicateConfirm}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  複製する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdvertiserLayout>
  );
}