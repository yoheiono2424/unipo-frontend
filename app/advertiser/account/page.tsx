"use client";

import AdvertiserLayout from "@/components/advertiser/AdvertiserLayout";
import { Mail, Phone, Building, MapPin, Lock, Camera, Shield } from "lucide-react";
import { useState } from "react";

export default function AdvertiserAccountPage() {
  const [profileData, setProfileData] = useState({
    companyName: "株式会社サンプル",
    representativeName: "山田太郎",
    email: "info@sample-company.co.jp",
    phone: "03-1234-5678",
    postalCode: "100-0001",
    address: "東京都千代田区千代田1-1-1",
    businessType: "小売業",
    employeeCount: "100-500名",
    website: "https://www.sample-company.co.jp"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

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

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("新しいパスワードと確認用パスワードが一致しません");
      return;
    }

    setIsSaving(true);
    // API呼び出しのシミュレーション
    setTimeout(() => {
      setIsSaving(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
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
              <p className="text-sm text-gray-600 mt-1">アカウント情報とセキュリティ設定を管理します</p>
            </div>
          </div>

          {/* 成功メッセージ */}
          {showSuccessMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>変更が正常に保存されました</span>
            </div>
          )}

          {/* タブ切り替え */}
          <div className="bg-white rounded-lg shadow-sm p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                企業プロフィール
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "password"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                パスワード変更
              </button>
            </div>
          </div>

          {activeTab === "profile" ? (
            /* 企業プロフィール */
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-900">企業情報</h2>
                  </div>
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      編集する
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        キャンセル
                      </button>
                      <button
                        onClick={handleProfileSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:bg-gray-400"
                      >
                        {isSaving ? "保存中..." : "保存する"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* プロフィール画像 */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="h-12 w-12 text-blue-600" />
                  </div>
                  {isEditingProfile && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      ロゴ画像を変更
                    </button>
                  )}
                </div>

                {/* 入力フィールド */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.companyName}
                      onChange={(e) => handleProfileChange("companyName", e.target.value)}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      代表者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.representativeName}
                      onChange={(e) => handleProfileChange("representativeName", e.target.value)}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        disabled={!isEditingProfile}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        disabled={!isEditingProfile}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      value={profileData.postalCode}
                      onChange={(e) => handleProfileChange("postalCode", e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="100-0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      住所
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => handleProfileChange("address", e.target.value)}
                        disabled={!isEditingProfile}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      業種
                    </label>
                    <select
                      value={profileData.businessType}
                      onChange={(e) => handleProfileChange("businessType", e.target.value)}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    >
                      <option value="小売業">小売業</option>
                      <option value="製造業">製造業</option>
                      <option value="サービス業">サービス業</option>
                      <option value="IT・通信業">IT・通信業</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      従業員数
                    </label>
                    <select
                      value={profileData.employeeCount}
                      onChange={(e) => handleProfileChange("employeeCount", e.target.value)}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    >
                      <option value="1-10名">1-10名</option>
                      <option value="11-50名">11-50名</option>
                      <option value="51-100名">51-100名</option>
                      <option value="100-500名">100-500名</option>
                      <option value="500名以上">500名以上</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ウェブサイト
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange("website", e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* パスワード変更 */
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">パスワード変更</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="max-w-md space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      現在のパスワード
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      新しいパスワード
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="••••••••"
                    />
                    <p className="text-xs text-gray-500 mt-1">8文字以上で、英数字を含めてください</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      新しいパスワード（確認）
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handlePasswordChange}
                      disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "変更中..." : "パスワードを変更"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* セキュリティ情報 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">セキュリティのヒント</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>パスワードは定期的に変更することをお勧めします</li>
                  <li>他のサービスと同じパスワードを使用しないでください</li>
                  <li>2段階認証を有効にすることでアカウントをより安全に保護できます</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvertiserLayout>
  );
}