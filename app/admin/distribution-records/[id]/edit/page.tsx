"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

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
    usageDate: "",
    distributionMethod: "メール送信",
    status: "配布済み",
    adminMemo: "初回キャンペーンでの配布記録",
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
    adminMemo: "",
  },
];

const mockMembers = [
  "田中太郎",
  "佐藤花子",
  "鈴木次郎",
  "高橋三郎",
];

const mockStores = [
  "カフェ モカ",
  "レストラン サクラ",
  "ブティック ローズ",
  "パン屋 クロワッサン",
];

export default function DistributionRecordEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const record = mockDistributionRecords.find(r => r.id === resolvedParams.id) || mockDistributionRecords[0];

  const [formData, setFormData] = useState({
    recipientName: record.recipientName,
    recipientEmail: record.recipientEmail,
    storeName: record.storeName,
    distributionMethod: record.distributionMethod,
    distributionDate: record.distributionDate,
    usageStatus: record.usageStatus,
    usageDate: record.usageDate || "",
    status: record.status,
    adminMemo: record.adminMemo || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("保存データ:", formData);
    // 詳細ページに戻る
    router.push(`/admin/distribution-records/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/distribution-records/${resolvedParams.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/distribution-records/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布実績編集</h1>
            <p className="text-sm text-gray-600 mt-1">記録ID: {record.recordId}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">配布情報</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* 読み取り専用フィールド */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    記録ID
                  </label>
                  <input
                    type="text"
                    value={record.recordId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ギフトカード番号
                  </label>
                  <input
                    type="text"
                    value={record.serialNumber}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    金額
                  </label>
                  <input
                    type="text"
                    value={`￥${record.amount.toLocaleString()}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャンペーン
                  </label>
                  <input
                    type="text"
                    value={record.campaign}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              {/* 編集可能フィールド */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布先会員 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    {mockMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布店舗 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    {mockStores.map((store) => (
                      <option key={store} value={store}>
                        {store}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布方法 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.distributionMethod}
                    onChange={(e) => setFormData({ ...formData, distributionMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="メール送信">メール送信</option>
                    <option value="店頭配布">店頭配布</option>
                    <option value="アプリ通知">アプリ通知</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    配布日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.distributionDate}
                    onChange={(e) => setFormData({ ...formData, distributionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    使用ステータス
                  </label>
                  <select
                    value={formData.usageStatus}
                    onChange={(e) => setFormData({ ...formData, usageStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  >
                    <option value="未使用">未使用</option>
                    <option value="使用済み">使用済み</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    使用日
                  </label>
                  <input
                    type="date"
                    value={formData.usageDate}
                    onChange={(e) => setFormData({ ...formData, usageDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  >
                    <option value="配布済み">配布済み</option>
                    <option value="使用済み">使用済み</option>
                    <option value="期限切れ">期限切れ</option>
                  </select>
                </div>
              </div>

              {/* 運営者メモ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  運営者メモ
                </label>
                <textarea
                  value={formData.adminMemo}
                  onChange={(e) => setFormData({ ...formData, adminMemo: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="例：特記事項や備考を入力"
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
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