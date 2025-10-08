"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdvertiserCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    status: "審査中",
    serviceStartDate: "",
    serviceEndDate: "",
    companyName: "",
    companyNameKana: "",
    industry: "",
    postalCode: "",
    prefecture: "",
    city: "",
    streetAddress: "",
    buildingName: "",
    phone: "",
    fax: "",
    email: "",
    companyUrl: "",
    contactName: "",
    contactPhone: "",
    billingDepartment: "",
    billingContactName: "",
    billingEmail: "",
    billingPostalCode: "",
    billingPrefecture: "",
    billingCity: "",
    billingStreetAddress: "",
    billingBuildingName: "",
    billingPhone: "",
    billingFax: "",
    paymentTerms: "前払い",
    memo1: "",
    memo2: "",
    memo3: "",
    memo4: "",
    memo5: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("新規広告主データ:", formData);
    // 一覧ページに戻る
    router.push("/admin/advertisers");
  };

  const handleCancel = () => {
    router.push("/admin/advertisers");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/advertisers"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新規広告主登録</h1>
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
                  {/* ステータス */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ステータス
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="審査中">審査中</option>
                      <option value="承認済み">承認済み</option>
                      <option value="停止中">停止中</option>
                    </select>
                  </div>

                  <div></div>

                  {/* 利用開始日 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      利用開始日
                    </label>
                    <input
                      type="text"
                      value={formData.serviceStartDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, serviceStartDate: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="20250101"
                      maxLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">YYYYMMDD形式で入力</p>
                  </div>

                  {/* 利用終了日 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      利用終了日
                    </label>
                    <input
                      type="text"
                      value={formData.serviceEndDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, serviceEndDate: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="20251231"
                      maxLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">YYYYMMDD形式で入力</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 企業情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">企業情報</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 企業名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      企業名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="株式会社ABC"
                      maxLength={100}
                      required
                    />
                  </div>

                  {/* 企業名（カナ） */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      企業名（カナ） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyNameKana}
                      onChange={(e) => setFormData({ ...formData, companyNameKana: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="カブシキガイシャエービーシー"
                      maxLength={100}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">全角カナで入力</p>
                  </div>

                  {/* 業種 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      業種 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="小売業">小売業</option>
                      <option value="IT・通信">IT・通信</option>
                      <option value="製造業">製造業</option>
                      <option value="飲食業">飲食業</option>
                      <option value="サービス業">サービス業</option>
                      <option value="不動産">不動産</option>
                      <option value="金融・保険">金融・保険</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  {/* 企業URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      企業URL
                    </label>
                    <input
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="https://www.example.com"
                      maxLength={2048}
                    />
                  </div>

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
                      都道府県 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.prefecture}
                      onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="北海道">北海道</option>
                      <option value="青森県">青森県</option>
                      <option value="岩手県">岩手県</option>
                      <option value="宮城県">宮城県</option>
                      <option value="秋田県">秋田県</option>
                      <option value="山形県">山形県</option>
                      <option value="福島県">福島県</option>
                      <option value="茨城県">茨城県</option>
                      <option value="栃木県">栃木県</option>
                      <option value="群馬県">群馬県</option>
                      <option value="埼玉県">埼玉県</option>
                      <option value="千葉県">千葉県</option>
                      <option value="東京都">東京都</option>
                      <option value="神奈川県">神奈川県</option>
                      <option value="新潟県">新潟県</option>
                      <option value="富山県">富山県</option>
                      <option value="石川県">石川県</option>
                      <option value="福井県">福井県</option>
                      <option value="山梨県">山梨県</option>
                      <option value="長野県">長野県</option>
                      <option value="岐阜県">岐阜県</option>
                      <option value="静岡県">静岡県</option>
                      <option value="愛知県">愛知県</option>
                      <option value="三重県">三重県</option>
                      <option value="滋賀県">滋賀県</option>
                      <option value="京都府">京都府</option>
                      <option value="大阪府">大阪府</option>
                      <option value="兵庫県">兵庫県</option>
                      <option value="奈良県">奈良県</option>
                      <option value="和歌山県">和歌山県</option>
                      <option value="鳥取県">鳥取県</option>
                      <option value="島根県">島根県</option>
                      <option value="岡山県">岡山県</option>
                      <option value="広島県">広島県</option>
                      <option value="山口県">山口県</option>
                      <option value="徳島県">徳島県</option>
                      <option value="香川県">香川県</option>
                      <option value="愛媛県">愛媛県</option>
                      <option value="高知県">高知県</option>
                      <option value="福岡県">福岡県</option>
                      <option value="佐賀県">佐賀県</option>
                      <option value="長崎県">長崎県</option>
                      <option value="熊本県">熊本県</option>
                      <option value="大分県">大分県</option>
                      <option value="宮崎県">宮崎県</option>
                      <option value="鹿児島県">鹿児島県</option>
                      <option value="沖縄県">沖縄県</option>
                    </select>
                  </div>

                  {/* 市区町村 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="千代田区"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 町名・丁目・番地 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      町名・丁目・番地 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="大手町1-1-1"
                      maxLength={50}
                      required
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
                      placeholder="大手町ビル10F"
                      maxLength={100}
                    />
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="0311112222"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの10-11桁で入力</p>
                  </div>

                  {/* FAX番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      FAX番号
                    </label>
                    <input
                      type="tel"
                      value={formData.fax}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, fax: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="0311112223"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの10-11桁で入力</p>
                  </div>

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
                      placeholder="info@example.com"
                      maxLength={254}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">ログインIDとして使用</p>
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
                  {/* 担当者氏名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      担当者氏名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="山田一郎"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 担当者電話番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      担当者電話番号
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, contactPhone: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="0311112222"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの10-11桁で入力</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 請求先情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">請求先情報</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 請求先部署名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先部署名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.billingDepartment}
                      onChange={(e) => setFormData({ ...formData, billingDepartment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="経理部"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 請求先担当者名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.billingContactName}
                      onChange={(e) => setFormData({ ...formData, billingContactName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="田中花子"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 請求先メールアドレス */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.billingEmail}
                      onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="billing@example.com"
                      maxLength={254}
                      required
                    />
                  </div>

                  {/* 請求先郵便番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先郵便番号
                    </label>
                    <input
                      type="text"
                      value={formData.billingPostalCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, billingPostalCode: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="1234567"
                      maxLength={7}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの7桁で入力</p>
                  </div>

                  {/* 請求先都道府県 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先都道府県 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.billingPrefecture}
                      onChange={(e) => setFormData({ ...formData, billingPrefecture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="北海道">北海道</option>
                      <option value="青森県">青森県</option>
                      <option value="岩手県">岩手県</option>
                      <option value="宮城県">宮城県</option>
                      <option value="秋田県">秋田県</option>
                      <option value="山形県">山形県</option>
                      <option value="福島県">福島県</option>
                      <option value="茨城県">茨城県</option>
                      <option value="栃木県">栃木県</option>
                      <option value="群馬県">群馬県</option>
                      <option value="埼玉県">埼玉県</option>
                      <option value="千葉県">千葉県</option>
                      <option value="東京都">東京都</option>
                      <option value="神奈川県">神奈川県</option>
                      <option value="新潟県">新潟県</option>
                      <option value="富山県">富山県</option>
                      <option value="石川県">石川県</option>
                      <option value="福井県">福井県</option>
                      <option value="山梨県">山梨県</option>
                      <option value="長野県">長野県</option>
                      <option value="岐阜県">岐阜県</option>
                      <option value="静岡県">静岡県</option>
                      <option value="愛知県">愛知県</option>
                      <option value="三重県">三重県</option>
                      <option value="滋賀県">滋賀県</option>
                      <option value="京都府">京都府</option>
                      <option value="大阪府">大阪府</option>
                      <option value="兵庫県">兵庫県</option>
                      <option value="奈良県">奈良県</option>
                      <option value="和歌山県">和歌山県</option>
                      <option value="鳥取県">鳥取県</option>
                      <option value="島根県">島根県</option>
                      <option value="岡山県">岡山県</option>
                      <option value="広島県">広島県</option>
                      <option value="山口県">山口県</option>
                      <option value="徳島県">徳島県</option>
                      <option value="香川県">香川県</option>
                      <option value="愛媛県">愛媛県</option>
                      <option value="高知県">高知県</option>
                      <option value="福岡県">福岡県</option>
                      <option value="佐賀県">佐賀県</option>
                      <option value="長崎県">長崎県</option>
                      <option value="熊本県">熊本県</option>
                      <option value="大分県">大分県</option>
                      <option value="宮崎県">宮崎県</option>
                      <option value="鹿児島県">鹿児島県</option>
                      <option value="沖縄県">沖縄県</option>
                    </select>
                  </div>

                  {/* 請求先市区町村 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.billingCity}
                      onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="千代田区"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 請求先町名・丁目・番地 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先町名・丁目・番地 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.billingStreetAddress}
                      onChange={(e) => setFormData({ ...formData, billingStreetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="大手町1-1-1"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* 請求先建物名・部屋番号 */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先建物名・部屋番号
                    </label>
                    <input
                      type="text"
                      value={formData.billingBuildingName}
                      onChange={(e) => setFormData({ ...formData, billingBuildingName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="大手町ビル10F"
                      maxLength={100}
                    />
                  </div>

                  {/* 請求先電話番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先電話番号
                    </label>
                    <input
                      type="tel"
                      value={formData.billingPhone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, billingPhone: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="0311112224"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの10-11桁で入力</p>
                  </div>

                  {/* 請求先FAX番号 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求先FAX番号
                    </label>
                    <input
                      type="tel"
                      value={formData.billingFax}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, billingFax: value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="0311112225"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">ハイフンなしの10-11桁で入力</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 契約情報セクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">契約情報</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 支払条件 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      支払条件 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="前払い">前払い</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">初期は「前払い」のみ選択可能</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 運営メモセクション */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900">運営メモ（機密情報）</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メモ{num}（運営のみ閲覧）
                    </label>
                    <textarea
                      value={formData[`memo${num}` as keyof typeof formData] as string}
                      onChange={(e) => setFormData({ ...formData, [`memo${num}`]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-red-50 text-gray-900"
                      placeholder={`運営用のメモ${num}をこちらに記載してください...`}
                      rows={3}
                    />
                    <p className="text-xs text-red-500 mt-1">このメモは運営者のみが閲覧できます</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 保存・キャンセルボタン */}
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
                登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
