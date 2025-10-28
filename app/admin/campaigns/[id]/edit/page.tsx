"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X, Gift, Hash, Package, FileImage, MapPin, CreditCard, Users, Upload } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockCampaigns, mockStores } from "@/lib/mock-data";

// キャンペーンプランのモックデータ
const campaignPlans = [
  { id: 'plan001', name: 'ベーシックプラン', issueCount: 1000, amount: 500 },
  { id: 'plan002', name: 'スタンダードプラン', issueCount: 5000, amount: 1000 },
  { id: 'plan003', name: 'プレミアムプラン', issueCount: 10000, amount: 3000 },
  { id: 'custom', name: 'カスタムプラン', issueCount: 0, amount: 0 }
];

export default function CampaignEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const campaign = mockCampaigns.find(c => c.id === resolvedParams.id) || mockCampaigns[0];

  const [formData, setFormData] = useState({
    campaignNo: campaign.campaignNo,
    status: campaign.status,
    campaignName: campaign.campaignName,
    campaignPlanId: campaign.campaignPlanId,
    campaignPlanName: campaign.campaignPlanName,
    advertiserId: campaign.advertiserId,
    advertiserName: campaign.advertiserName,
    startDate: campaign.startDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    endDate: campaign.endDate?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    giftCardAmount: campaign.giftCardAmount,
    totalCards: campaign.totalCards,
    budgetAmount: campaign.budgetAmount,
    campaignDescription: campaign.campaignDescription,
    targetStores: campaign.targetStores || [],
    campaignImage: null as File | null,
    // ターゲット設定（モックデータにはないのでデフォルト値）
    isAgeUnrestricted: true,
    ageFrom: "",
    ageTo: "",
    targetGender: "指定なし",
  });

  const [selectedStores, setSelectedStores] = useState<string[]>(campaign.targetStores || []);
  const [imagePreview, setImagePreview] = useState<string>(campaign.campaignImage1 || "");

  // キャンペーンプラン選択時に発行枚数と額面を自動設定
  useEffect(() => {
    if (formData.campaignPlanId === '') {
      // 未選択の場合は変更しない（編集画面なので既存値を保持）
      return;
    }

    const selectedPlan = campaignPlans.find(plan => plan.id === formData.campaignPlanId);
    if (selectedPlan && selectedPlan.id !== 'custom') {
      setFormData(prev => ({
        ...prev,
        campaignPlanName: selectedPlan.name,
        giftCardAmount: selectedPlan.amount,
        totalCards: selectedPlan.issueCount
      }));
    }
    // カスタムプランの場合は既存値を保持（手動入力を許可）
  }, [formData.campaignPlanId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    const saveData = {
      ...formData,
      startDate: formData.startDate.replace(/-/g, ''),
      endDate: formData.endDate.replace(/-/g, ''),
      targetStores: selectedStores,
    };
    console.log("保存データ:", saveData);
    // 詳細ページに戻る
    router.push(`/admin/campaigns/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/campaigns/${resolvedParams.id}`);
  };

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores(prev =>
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
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

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/campaigns/${resolvedParams.id}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">キャンペーン情報編集</h1>
              <p className="text-sm text-gray-600 mt-1">キャンペーンID: {campaign.id} | キャンペーンNO: {campaign.campaignNo}</p>
            </div>
          </div>
          <Link
            href={`/admin/campaigns/${resolvedParams.id}/assign-gift-cards`}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors font-medium"
          >
            <CreditCard className="h-4 w-4" />
            ギフトカード割り当て
          </Link>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="pending">予定</option>
                    <option value="active">実施中</option>
                    <option value="completed">終了</option>
                  </select>
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

          {/* ターゲット設定セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900">ターゲット設定</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* 対象年齢 */}
              <div>
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
                    <label className="ml-2 text-sm text-gray-700">年齢制限なし</label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">From（歳以上）</label>
                      <input
                        type="number"
                        name="ageFrom"
                        value={formData.ageFrom}
                        onChange={(e) => setFormData({ ...formData, ageFrom: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, ageTo: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">女性</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* プラン・広告主情報セクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900">プラン・広告主情報</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーンプラン <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.campaignPlanId}
                    onChange={(e) => setFormData({ ...formData, campaignPlanId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    広告主ID
                  </label>
                  <input
                    type="text"
                    value={formData.advertiserId}
                    onChange={(e) => setFormData({ ...formData, advertiserId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    広告主名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.advertiserName}
                    onChange={(e) => setFormData({ ...formData, advertiserName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="株式会社ABC">株式会社ABC</option>
                    <option value="XYZ株式会社">XYZ株式会社</option>
                    <option value="グローバルフーズ株式会社">グローバルフーズ株式会社</option>
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
                    disabled={formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== ''}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                      formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== '' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    min="100"
                    step="100"
                    required
                  />
                  {formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== '' && (
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
                    disabled={formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== ''}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                      formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== '' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    min="1"
                    required
                  />
                  {formData.campaignPlanId !== 'custom' && formData.campaignPlanId !== '' && (
                    <p className="text-xs text-gray-500 mt-1">※カスタムプランの場合のみ編集可能</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    総予算 (円) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.budgetAmount}
                    onChange={(e) => setFormData({ ...formData, budgetAmount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    min="0"
                    required
                  />
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
                <span className="ml-2 text-sm text-gray-500">({selectedStores.length}店舗選択)</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {mockStores.map((store) => (
                  <label
                    key={store.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(store.id)}
                      onChange={() => handleStoreToggle(store.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{store.storeName || store.name}</span>
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
            <div className="p-6">
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

          {/* 保存ボタン */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky bottom-0">
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
      </div>
    </AdminLayout>
  );
}