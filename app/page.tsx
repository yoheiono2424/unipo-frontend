"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "member", // member, store, advertiser, admin
  });
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バックエンド接続後に実装
    // 現在はアカウントタイプに応じて振り分け
    switch (formData.accountType) {
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "store":
        router.push("/store/dashboard");
        break;
      case "advertiser":
        router.push("/advertiser/dashboard");
        break;
      case "member":
      default:
        router.push("/user/home");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* ロゴ・タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">ユニーポ</h1>
          <p className="text-gray-600">次世代型広告プラットフォームサービス</p>
        </div>

        {/* ログイン/新規登録切り替え */}
        <div className="flex mb-6">
          <button
            onClick={() => setIsNewUser(false)}
            className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors ${
              !isNewUser
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            ログイン
          </button>
          <button
            onClick={() => setIsNewUser(true)}
            className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors ${
              isNewUser
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* アカウントタイプ選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              アカウントタイプ
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.accountType === "member"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="member"
                  checked={formData.accountType === "member"}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="sr-only"
                />
                <span className="text-sm font-medium">会員</span>
              </label>
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.accountType === "store"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="store"
                  checked={formData.accountType === "store"}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="sr-only"
                />
                <span className="text-sm font-medium">加盟店</span>
              </label>
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.accountType === "advertiser"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="advertiser"
                  checked={formData.accountType === "advertiser"}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="sr-only"
                />
                <span className="text-sm font-medium">広告主</span>
              </label>
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.accountType === "admin"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="admin"
                  checked={formData.accountType === "admin"}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="sr-only"
                />
                <span className="text-sm font-medium">運営者</span>
              </label>
            </div>
          </div>

          {/* メールアドレス/電話番号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.accountType === "member" && isNewUser
                ? "電話番号"
                : "メールアドレス"}
            </label>
            <input
              type={formData.accountType === "member" && isNewUser ? "tel" : "email"}
              required
              placeholder={formData.accountType === "member" && isNewUser
                ? "090-0000-0000"
                : "mail@example.com"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {formData.accountType === "member" && isNewUser && (
              <p className="text-xs text-gray-500 mt-1">
                ※会員登録には電話番号認証が必須です
              </p>
            )}
          </div>

          {/* パスワード */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* パスワード確認（新規登録時のみ） */}
          {isNewUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード（確認）
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {/* パスワードを忘れた方（ログイン時のみ） */}
          {!isNewUser && (
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                パスワードをお忘れの方
              </Link>
            </div>
          )}

          {/* 送信ボタン */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {isNewUser ? "新規登録" : "ログイン"}
          </button>

          {/* 利用規約（新規登録時のみ） */}
          {isNewUser && (
            <p className="text-xs text-center text-gray-500 mt-4">
              新規登録することで、
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">利用規約</Link>
              と
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">プライバシーポリシー</Link>
              に同意したものとみなされます
            </p>
          )}
        </form>

        {/* デモ用メモ */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>デモ用：</strong>アカウントタイプを選択してログインボタンをクリックすると、それぞれのダッシュボードへ移動します
          </p>
        </div>
      </div>
    </div>
  );
}