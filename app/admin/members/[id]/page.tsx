"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Edit, User, Phone, Mail, Calendar, Gift, Star } from "lucide-react";
import Link from "next/link";
import { mockMembers } from "@/lib/mock-data";
import { use } from "react";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsをアンラップ
  const resolvedParams = use(params);
  // モックデータから該当会員を取得
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const pointHistory = [
    { date: "2025-01-15", type: "獲得", points: 100, description: "来店ポイント" },
    { date: "2025-01-10", type: "獲得", points: 500, description: "アンケート回答" },
    { date: "2025-01-05", type: "利用", points: -300, description: "商品交換" },
  ];

  const giftCardHistory = [
    { date: "2025-01-15", store: "カフェ モカ", cardType: "Amazon 500円", status: "受け取り済み" },
    { date: "2025-01-08", store: "レストラン サクラ", cardType: "Amazon 1000円", status: "受け取り済み" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/members"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">会員詳細</h1>
              <p className="text-sm text-gray-600 mt-1">会員ID: {member.id}</p>
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Edit className="h-4 w-4" />
            編集
          </button>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">氏名</p>
                <p className="font-medium">{member.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">電話番号</p>
                <p className="font-medium">{member.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p className="font-medium">{member.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">登録日</p>
                <p className="font-medium">{member.registeredDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">性別</p>
              <p className="font-medium">{member.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">生年月日</p>
              <p className="font-medium">{member.birthdate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">紹介コード</p>
              <p className="font-medium">{member.referralCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ステータス</p>
              <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                member.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {member.status === 'active' ? '有効' : '無効'}
              </span>
            </div>
          </div>
        </div>

        {/* ポイント情報 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">ポイント情報</h2>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">保有ポイント</p>
                <p className="text-3xl font-bold text-indigo-600">{member.points} pt</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">ポイント履歴</p>
                <div className="space-y-2">
                  {pointHistory.map((history, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{history.description}</p>
                        <p className="text-gray-500">{history.date}</p>
                      </div>
                      <span className={`font-medium ${
                        history.points > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {history.points > 0 ? '+' : ''}{history.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                ポイント手動調整
              </button>
            </div>
          </div>

          {/* ギフトカード履歴 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">ギフトカード履歴</h2>
              <Gift className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-3">
              {giftCardHistory.map((history, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{history.cardType}</p>
                      <p className="text-xs text-gray-500">{history.store}</p>
                      <p className="text-xs text-gray-500">{history.date}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {history.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 活動履歴 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">活動履歴</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">アンケート回答</p>
                <p className="text-xs text-gray-500">2025-01-10 14:30</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">来店（カフェ モカ）</p>
                <p className="text-xs text-gray-500">2025-01-08 12:15</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">ポイント交換</p>
                <p className="text-xs text-gray-500">2025-01-05 18:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}