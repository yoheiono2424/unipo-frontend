"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { Shield, Save, X } from "lucide-react";
import { useState } from "react";

export default function AdvertiserAccountPage() {
  const [profileData, setProfileData] = useState({
    // 企業情報
    companyName: "株式会社サンプル",
    companyNameKana: "カブシキガイシャサンプル",
    industry: "小売業",
    companyUrl: "https://www.sample-company.co.jp",
    postalCode: "1000001",
    prefecture: "東京都",
    city: "千代田区",
    streetAddress: "千代田1-1-1",
    buildingName: "サンプルビル10F",
    phone: "0312345678",
    fax: "0312345679",
    email: "info@sample-company.co.jp",
    // 連絡先情報
    contactDepartment: "営業部",
    contactName: "山田太郎",
    contactPhone: "0312345678",
    // 請求先情報
    billingCompanyName: "株式会社サンプル",
    billingDepartment: "経理部",
    billingContactName: "田中花子",
    billingEmail: "billing@sample-company.co.jp",
    billingPostalCode: "1000001",
    billingPrefecture: "東京都",
    billingCity: "千代田区",
    billingStreetAddress: "千代田1-1-1",
    billingBuildingName: "サンプルビル10F",
    billingPhone: "0312345680",
    billingFax: "0312345681",
    // 契約情報
    paymentTerms: "前払い"
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleProfileSave = async () => {
    setIsSaving(true);
    // API呼び出しのシミュレーション
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingProfile(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1000);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AdvertiserLayout>
      <div className="p-6">
        <div className="space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">アカウント設定</h1>
              <p className="text-sm text-gray-600 mt-1">広告主アカウント情報を管理します</p>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                編集する
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  キャンセル
                </button>
                <button
                  onClick={handleProfileSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:bg-gray-400"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "保存中..." : "保存する"}
                </button>
              </div>
            )}
          </div>

          {/* 成功メッセージ */}
          {showSuccessMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>変更が正常に保存されました</span>
            </div>
          )}

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
                    value={profileData.companyName}
                    onChange={(e) => handleProfileChange("companyName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.companyNameKana}
                    onChange={(e) => handleProfileChange("companyNameKana", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.industry}
                    onChange={(e) => handleProfileChange("industry", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.companyUrl}
                    onChange={(e) => handleProfileChange("companyUrl", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.postalCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("postalCode", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.prefecture}
                    onChange={(e) => handleProfileChange("prefecture", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="大阪府">大阪府</option>
                    <option value="愛知県">愛知県</option>
                  </select>
                </div>

                {/* 市区町村 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    市区町村 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => handleProfileChange("city", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.streetAddress}
                    onChange={(e) => handleProfileChange("streetAddress", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.buildingName}
                    onChange={(e) => handleProfileChange("buildingName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("phone", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.fax}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("fax", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                {/* 担当者部署 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    担当者部署
                  </label>
                  <input
                    type="text"
                    value={profileData.contactDepartment}
                    onChange={(e) => handleProfileChange("contactDepartment", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    placeholder="営業部"
                    maxLength={100}
                  />
                </div>

                {/* 担当者氏名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    担当者氏名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileData.contactName}
                    onChange={(e) => handleProfileChange("contactName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.contactPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("contactPhone", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                {/* 請求先会社名 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先会社名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileData.billingCompanyName}
                    onChange={(e) => handleProfileChange("billingCompanyName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    placeholder="株式会社サンプル"
                    maxLength={100}
                    required
                  />
                </div>

                {/* 請求先部署名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先部署名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileData.billingDepartment}
                    onChange={(e) => handleProfileChange("billingDepartment", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingContactName}
                    onChange={(e) => handleProfileChange("billingContactName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingEmail}
                    onChange={(e) => handleProfileChange("billingEmail", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingPostalCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("billingPostalCode", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingPrefecture}
                    onChange={(e) => handleProfileChange("billingPrefecture", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="大阪府">大阪府</option>
                    <option value="愛知県">愛知県</option>
                  </select>
                </div>

                {/* 請求先市区町村 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先市区町村 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={profileData.billingCity}
                    onChange={(e) => handleProfileChange("billingCity", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingStreetAddress}
                    onChange={(e) => handleProfileChange("billingStreetAddress", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingBuildingName}
                    onChange={(e) => handleProfileChange("billingBuildingName", e.target.value)}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("billingPhone", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                    value={profileData.billingFax}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleProfileChange("billingFax", value);
                    }}
                    disabled={!isEditingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
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
                  <input
                    type="text"
                    value={profileData.paymentTerms}
                    disabled={true}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">※閲覧のみ（編集不可）</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  );
}