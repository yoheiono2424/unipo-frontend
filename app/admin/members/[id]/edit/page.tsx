"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { mockMembers } from "@/lib/mock-data";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const member = mockMembers.find(m => m.id === resolvedParams.id) || mockMembers[0];

  const [formData, setFormData] = useState({
    memberStatus: member.memberStatus || "本登録",
    memberRank: member.memberRank || "ブロンズ",
    lastName: member.lastName || "",
    firstName: member.firstName || "",
    birthDate: member.birthDate || "",
    gender: member.gender || "",
    email: member.email || "",
    phone: member.phone || "",
    postalCode: member.postalCode || "",
    prefecture: member.prefecture || "",
    city: member.city || "",
    streetAddress: member.streetAddress || "",
    buildingName: member.buildingName || "",
    memberMemo: member.memberMemo || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("会員情報更新:", formData);
    // 詳細ページに戻る
    router.push(`/admin/members/${resolvedParams.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/members/${resolvedParams.id}`);
  };

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県",
    "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/members/${resolvedParams.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">会員情報編集</h1>
            <p className="text-sm text-gray-600 mt-1">会員ID: {member.id} | 会員NO: {member.memberNo}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* 基本情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 会員ステータス */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会員ステータス <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.memberStatus}
                      onChange={(e) => setFormData({ ...formData, memberStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="仮申請">仮申請</option>
                      <option value="本登録">本登録</option>
                      <option value="休止">休止</option>
                      <option value="自主退会">自主退会</option>
                      <option value="強制退会">強制退会</option>
                    </select>
                  </div>

                  {/* 会員ランク */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会員ランク
                    </label>
                    <select
                      value={formData.memberRank}
                      onChange={(e) => setFormData({ ...formData, memberRank: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="ブロンズ">ブロンズ</option>
                      <option value="シルバー">シルバー</option>
                      <option value="ゴールド">ゴールド</option>
                      <option value="プラチナ">プラチナ</option>
                    </select>
                  </div>

                  {/* 氏名（姓） */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      氏名（姓） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="田中"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 氏名（名） */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      氏名（名） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="太郎"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 生年月日 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      生年月日
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  {/* 性別 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      性別
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">選択してください</option>
                      <option value="男性">男性</option>
                      <option value="女性">女性</option>
                      <option value="その他">その他</option>
                      <option value="回答しない">回答しない</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 連絡先情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">連絡先情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* メールアドレス */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="example@example.com"
                      maxLength={254}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">ユニーク項目です</p>
                  </div>

                  {/* 携帯電話番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      携帯電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="09012345678"
                      maxLength={11}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの11桁で入力（ユニーク項目）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 住所情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">住所情報</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 郵便番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, postalCode: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="1234567"
                      maxLength={7}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの7桁で入力</p>
                  </div>

                  {/* 都道府県 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県
                    </label>
                    <select
                      value={formData.prefecture}
                      onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">選択してください</option>
                      {prefectures.map((pref) => (
                        <option key={pref} value={pref}>{pref}</option>
                      ))}
                    </select>
                  </div>

                  {/* 市区町村 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="渋谷区"
                      maxLength={50}
                    />
                  </div>

                  {/* 町名・丁目・番地 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      町名・丁目・番地
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="神宮前1-2-3"
                      maxLength={50}
                    />
                  </div>

                  {/* 建物名・部屋番号 */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      建物名・部屋番号
                    </label>
                    <input
                      type="text"
                      value={formData.buildingName}
                      onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="サンプルマンション101"
                      maxLength={100}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 会員メモセクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">運営メモ</h2>
              </div>

              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会員メモ（運営のみ閲覧）
                  </label>
                  <textarea
                    value={formData.memberMemo}
                    onChange={(e) => setFormData({ ...formData, memberMemo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="運営用のメモをこちらに記載してください..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">このメモは運営者のみが閲覧できます</p>
                </div>
              </div>
            </div>

            {/* 保存・キャンセルボタン */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                登録日: {member.registeredDate ? new Date(member.registeredDate).toLocaleString('ja-JP') : "—"}
              </p>
              <div className="flex gap-3">
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
        </form>
      </div>
    </AdminLayout>
  );
}