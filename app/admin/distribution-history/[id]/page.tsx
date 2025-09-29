"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// モックデータ
const mockDistributionHistory = {
  "1": {
    id: "1",
    distributedAt: "2025-01-10 10:00:00",
    userId: "USR001",
    storeId: "STR001",
    storeName: "カフェ モカ",
    campaignId: "CMP001",
    campaignName: "新春キャンペーン2025",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  },
  "2": {
    id: "2",
    distributedAt: "2025-01-11 14:30:00",
    userId: "USR002",
    storeId: "STR002",
    storeName: "レストラン オリーブ",
    campaignId: "CMP002",
    campaignName: "春の感謝祭",
    advertiserId: "ADV002",
    advertiserName: "サンプル商事株式会社"
  },
  "3": {
    id: "3",
    distributedAt: "2025-01-12 09:15:00",
    userId: "USR003",
    storeId: "STR003",
    storeName: "ベーカリー サン",
    campaignId: "CMP003",
    campaignName: "バレンタインキャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル"
  }
};

export default function DistributionHistoryDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const history = mockDistributionHistory[id as keyof typeof mockDistributionHistory] || mockDistributionHistory["1"];
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [returnPath, setReturnPath] = useState("/admin/distribution-records/1");

  useEffect(() => {
    // クエリパラメータかURLから戻り先を判定
    const from = searchParams.get('from');
    if (from === 'store') {
      const storeId = searchParams.get('storeId') || '1';
      setReturnPath(`/admin/distribution-records/stores/${storeId}`);
    } else if (from === 'campaign') {
      const campaignId = searchParams.get('campaignId') || '1';
      setReturnPath(`/admin/distribution-records/${campaignId}`);
    }
  }, [searchParams]);

  const handleCancelClick = () => {
    setShowCancelModal(true);
    setCancelReason("");
  };

  const handleCancelConfirm = () => {
    if (!cancelReason.trim()) {
      alert("取消理由を入力してください");
      return;
    }
    console.log("配布履歴取消:", {
      historyId: history.id,
      reason: cancelReason
    });
    // TODO: API呼び出し
    setShowCancelModal(false);
    alert("配布履歴を取り消しました");
  };

  const handleCancelClose = () => {
    setShowCancelModal(false);
    setCancelReason("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
          {/* 配布履歴取消ボタン（右上） */}
          <button
            onClick={handleCancelClick}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            <XCircle className="h-5 w-5" />
            配布履歴取消
          </button>
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

        {/* 取消理由入力ポップアップ */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">配布履歴取消</h3>
              <p className="text-sm text-gray-600 mb-4">
                この配布履歴を取り消します。取消理由を入力してください。
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  取消理由 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="取消理由を入力してください"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelConfirm}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  取消実行
                </button>
                <button
                  onClick={handleCancelClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}