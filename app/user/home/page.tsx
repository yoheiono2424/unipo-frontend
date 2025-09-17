"use client";

import UserLayout from "@/components/user/UserLayout";
import {
  Search,
  QrCode,
  Gift,
  Star,
  MapPin,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function UserHomePage() {
  const userStats = {
    points: 0,
    giftCards: 0,
    visits: 0,
  };

  const nearbyStores = [];
  const recentGiftCards = [];

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* ウェルカムメッセージ */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">こんにちは、ゲストさん</h1>
          <p>ユニーポで素敵なギフトカードを見つけましょう！</p>
        </div>

        {/* ユーザーステータス */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.points}</p>
            <p className="text-sm text-gray-600">保有ポイント</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <CreditCard className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.giftCards}</p>
            <p className="text-sm text-gray-600">獲得カード</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.visits}</p>
            <p className="text-sm text-gray-600">訪問店舗</p>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/user/stores"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-center"
          >
            <Search className="h-10 w-10 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium">店舗を探す</p>
          </Link>
          <Link
            href="/user/qrscan"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-center"
          >
            <QrCode className="h-10 w-10 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium">QRスキャン</p>
          </Link>
          <Link
            href="/user/giftcards"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-center"
          >
            <Gift className="h-10 w-10 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium">ギフトカード</p>
          </Link>
          <Link
            href="/user/points"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-center"
          >
            <Star className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium">ポイント交換</p>
          </Link>
        </div>

        {/* 近くの加盟店 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">近くの加盟店</h2>
            <Link href="/user/stores" className="text-sm text-blue-600 hover:text-blue-700">
              すべて見る
            </Link>
          </div>
          <div className="p-6">
            {nearbyStores.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">近くの加盟店が見つかりません</p>
                <p className="text-xs text-gray-400 mt-1">位置情報を有効にしてください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 店舗一覧 */}
              </div>
            )}
          </div>
        </div>

        {/* 最近獲得したギフトカード */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">最近のギフトカード</h2>
            <Link href="/user/giftcards/history" className="text-sm text-blue-600 hover:text-blue-700">
              履歴を見る
            </Link>
          </div>
          <div className="p-6">
            {recentGiftCards.length === 0 ? (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">まだギフトカードを獲得していません</p>
                <Link
                  href="/user/stores"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  加盟店を探す
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* ギフトカード一覧 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}