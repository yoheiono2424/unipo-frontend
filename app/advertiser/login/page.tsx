"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdvertiserLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "demo@advertiser.com",
    password: "password",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // バックエンド接続後に実装
    router.push("/advertiser/campaigns");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            広告主ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ユニーポ広告管理システム
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-xl" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/advertiser/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              パスワードをお忘れの方
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ログイン
            </button>
          </div>
        </form>

        {/* デモ用のログイン情報表示 */}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-sm text-gray-700 font-medium mb-2">デモ用ログイン情報：</p>
          <p className="text-xs text-gray-600">メール: demo@advertiser.com</p>
          <p className="text-xs text-gray-600">パスワード: password</p>
          <p className="text-xs text-gray-500 mt-2">※フォームに自動入力済みです</p>
        </div>

      </div>
    </div>
  );
}