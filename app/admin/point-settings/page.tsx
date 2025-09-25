"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Save, Award } from "lucide-react";
import { useState } from "react";

export default function PointSettingsPage() {
  const [formData, setFormData] = useState({
    visitPoint: "10",
    surveyPoint: "50",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで保存処理を行う（実際にはAPIコール等）
    console.log("ポイント設定保存:", formData);
    alert("ポイント設定を保存しました。");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ポイント設定</h1>
          <p className="text-sm text-gray-600 mt-1">ポイントシステムの各種設定管理</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ポイント設定 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">ポイント設定</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                各アクションに対して付与されるポイント数を設定できます
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    来店ポイント <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.visitPoint}
                    onChange={(e) => setFormData({ ...formData, visitPoint: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="10"
                    min="0"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    会員が店舗に来店した際に付与されるポイント数
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    アンケート回答ポイント <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.surveyPoint}
                    onChange={(e) => setFormData({ ...formData, surveyPoint: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="50"
                    min="0"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    会員がアンケートに回答した際に付与されるポイント数
                  </p>
                </div>
              </div>

              {/* 現在の設定プレビュー */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-3">現在の設定</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">来店時</span>
                    <span className="text-sm font-semibold text-blue-800">
                      {formData.visitPoint}ポイント
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">アンケート回答時</span>
                    <span className="text-sm font-semibold text-blue-800">
                      {formData.surveyPoint}ポイント
                    </span>
                  </div>
                </div>
              </div>

              {/* 注意事項 */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">設定時の注意事項</h3>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• ポイント設定の変更は即座に反映されます</li>
                  <li>• 過去に付与されたポイントには影響しません</li>
                  <li>• 設定値は0以上の整数で入力してください</li>
                  <li>• ポイントバランスを考慮して適切な値を設定してください</li>
                </ul>
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  設定を保存
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}