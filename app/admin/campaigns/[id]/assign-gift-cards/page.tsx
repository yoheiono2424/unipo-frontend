"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, CreditCard, Copy, X, Store, Building } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

// モックキャンペーンデータ
const mockCampaign = {
  id: "CAM001",
  campaignNo: "2025010001",
  campaignName: "新春キャンペーン2025",
  totalCards: 1000,
  distributedCards: 300,
  giftCardAmount: 500,
};

// モック割り当て済み店舗データ
const mockAssignedStores = [
  {
    id: "ST001",
    name: "カフェ モカ 渋谷店",
    assignedCards: 50,
  },
  {
    id: "ST002",
    name: "レストラン サクラ 新宿店",
    assignedCards: 30,
  },
  {
    id: "ST003",
    name: "ブティック ローズ 表参道店",
    assignedCards: 40,
  },
  {
    id: "ST004",
    name: "パン屋 クロワッサン 吉祥寺店",
    assignedCards: 25,
  },
];

export default function AssignGiftCardsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const campaign = mockCampaign; // 実際はIDで取得

  const [assignedStores, setAssignedStores] = useState(mockAssignedStores);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleUpdateCards = (storeId: string, value: string) => {
    setAssignedStores(prev =>
      prev.map(store =>
        store.id === storeId
          ? { ...store, assignedCards: parseInt(value) || 0 }
          : store
      )
    );
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // ここで実際の割り当て処理を行う
    console.log("更新データ:", assignedStores);
    // 編集画面に戻る
    router.push(`/admin/campaigns/${resolvedParams.id}/edit`);
  };

  const handleCancel = () => {
    router.push(`/admin/campaigns/${resolvedParams.id}/edit`);
  };

  // 合計割り当て枚数を計算
  const calculateTotal = () => {
    return assignedStores.reduce((sum, store) => sum + store.assignedCards, 0);
  };

  // 残り枚数を計算
  const remainingCards = campaign.totalCards - campaign.distributedCards;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/campaigns/${resolvedParams.id}/edit`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ギフトカード割り当て</h1>
              <p className="text-sm text-gray-600 mt-1">キャンペーン: {campaign.campaignName}</p>
            </div>
          </div>
          <Link
            href={`/admin/campaigns/${resolvedParams.id}/assign-gift-cards/store-search`}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors font-medium"
          >
            <Store className="h-4 w-4" />
            店舗追加
          </Link>
        </div>

        {/* 現在の状況 */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">現在の割り当て状況</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-blue-700">総発行枚数</p>
              <p className="text-2xl font-bold text-blue-900">{campaign.totalCards.toLocaleString()}枚</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">配布済み枚数</p>
              <p className="text-2xl font-bold text-blue-900">{campaign.distributedCards.toLocaleString()}枚</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">残り枚数</p>
              <p className="text-2xl font-bold text-green-600">{remainingCards.toLocaleString()}枚</p>
            </div>
          </div>
        </div>

        {/* 割り当て済み店舗一覧 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-900">ギフトカード割り当て済店舗一覧</h2>
              <span className="ml-2 text-sm text-gray-500">
                ({assignedStores.length}店舗)
              </span>
            </div>
          </div>

          <div className="p-6">
            {assignedStores.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                割り当て済みの店舗はありません
              </p>
            ) : (
              <div className="space-y-3">
                {assignedStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{store.name}</p>
                        <p className="text-xs text-gray-500">店舗ID: {store.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={store.assignedCards}
                        onChange={(e) => handleUpdateCards(store.id, e.target.value)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-semibold"
                        min="0"
                        max={remainingCards + store.assignedCards}
                      />
                      <span className="text-sm text-gray-600">枚</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 合計表示 */}
            {assignedStores.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">合計割り当て枚数</p>
                    <p className="text-xs text-gray-500 mt-1">
                      残り: {remainingCards - calculateTotal() + campaign.distributedCards}枚 / 総数: {campaign.totalCards}枚
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{calculateTotal()}枚</p>
                </div>
              </div>
            )}

            {/* 登録ボタン */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={calculateTotal() > campaign.totalCards}
                  className={`px-6 py-2.5 rounded-lg transition-colors font-medium ${
                    calculateTotal() > campaign.totalCards
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* 確認モーダル */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">割り当て更新確認</h3>

              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">更新内容</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {assignedStores.map((store) => (
                      <div key={store.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{store.name}</span>
                        <span className="font-semibold text-gray-900">{store.assignedCards}枚</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">合計</span>
                    <span className="text-lg font-bold text-indigo-600">{calculateTotal()}枚</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    この操作により、店舗へのギフトカード割り当て数が更新されます。<br />
                    更新を実行してよろしいですか？
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  戻る
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  更新を実行
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}