"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, Store, Phone, Mail, MapPin, Clock, QrCode, CreditCard } from "lucide-react";
import Link from "next/link";
import { mockStores } from "@/lib/mock-data";
import { use } from "react";

export default function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  // モックデータから該当店舗を取得
  const store = mockStores.find(s => s.id === resolvedParams.id) || mockStores[0];

  const giftCardStats = {
    total: 100,
    distributed: 45,
    remaining: 55,
  };

  const recentDistributions = [
    { date: "2025-01-15", member: "田中太郎", cardType: "Amazon 500円" },
    { date: "2025-01-14", member: "鈴木花子", cardType: "Amazon 1000円" },
    { date: "2025-01-13", member: "佐藤健", cardType: "Amazon 500円" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/stores"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">加盟店詳細</h1>
              <p className="text-sm text-gray-600 mt-1">店舗ID: {store.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/stores/${store.id}/edit`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              編集
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Store className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">店舗名</p>
                <p className="font-medium">{store.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 mt-0.5"></div>
              <div>
                <p className="text-sm text-gray-600">企業名</p>
                <p className="font-medium">{store.company}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">電話番号</p>
                <p className="font-medium">{store.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p className="font-medium">{store.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">住所</p>
                <p className="font-medium">{store.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">営業時間</p>
                <p className="font-medium">{store.businessHours}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">カテゴリ</p>
              <p className="font-medium">{store.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">エリア</p>
              <p className="font-medium">{store.area}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">業種コード</p>
              <p className="font-medium">{store.industryCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">代理店</p>
              <p className="font-medium">{store.agency || "直接契約"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">来店ポイント</p>
              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                store.visitPoint
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {store.visitPoint ? '有効' : '無効'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">ステータス</p>
              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                store.status === '営業中'
                  ? 'bg-green-100 text-green-800'
                  : store.status === '準備中'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {store.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QRコード */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">店舗QRコード</h2>
              <QrCode className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <QrCode className="h-32 w-32 text-gray-300" />
                <p className="text-sm text-gray-500 mt-4 text-center">
                  QRコード: {store.id}-QR
                </p>
              </div>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              QRコードをダウンロード
            </button>
          </div>

          {/* ギフトカード在庫 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">ギフトカード在庫</h2>
              <CreditCard className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">配布済み</span>
                  <span className="text-sm font-medium">{giftCardStats.distributed} / {giftCardStats.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(giftCardStats.distributed / giftCardStats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{giftCardStats.remaining}</p>
                  <p className="text-sm text-gray-600">残り枚数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{giftCardStats.distributed}</p>
                  <p className="text-sm text-gray-600">配布済み</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近の配布履歴 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">最近の配布履歴</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">日時</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">会員名</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">カード種別</th>
                </tr>
              </thead>
              <tbody>
                {recentDistributions.map((dist, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-sm text-gray-600">{dist.date}</td>
                    <td className="py-2 text-sm text-gray-600">{dist.member}</td>
                    <td className="py-2 text-sm text-gray-600">{dist.cardType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href={`/admin/stores/${store.id}/distributions`}
            className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-700"
          >
            すべての配布履歴を見る →
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}