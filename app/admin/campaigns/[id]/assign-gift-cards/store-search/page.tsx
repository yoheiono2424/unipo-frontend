"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Search, Store, MapPin } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

// モック店舗データ
const mockStores = [
  {
    id: "ST001",
    name: "カフェ モカ",
    area: "渋谷",
    category: "飲食店",
    address: "東京都渋谷区渋谷1-2-3",
  },
  {
    id: "ST002",
    name: "レストラン サクラ",
    area: "新宿",
    category: "飲食店",
    address: "東京都新宿区新宿3-4-5",
  },
  {
    id: "ST003",
    name: "ブティック ローズ",
    area: "表参道",
    category: "アパレル",
    address: "東京都港区南青山5-6-7",
  },
  {
    id: "ST004",
    name: "パン屋 クロワッサン",
    area: "吉祥寺",
    category: "飲食店",
    address: "東京都武蔵野市吉祥寺本町1-2-3",
  },
];

// 業種リスト
const categories = ["全て", "飲食店", "アパレル", "美容", "雑貨", "その他"];

// エリアリスト
const areas = ["全て", "渋谷", "新宿", "表参道", "吉祥寺", "原宿", "銀座"];

export default function StoreSearchPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全て");
  const [selectedArea, setSelectedArea] = useState("全て");
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  // 店舗をフィルタリング
  const filteredStores = mockStores.filter((store) => {
    const nameMatch = searchName === "" || store.name.toLowerCase().includes(searchName.toLowerCase());
    const categoryMatch = selectedCategory === "全て" || store.category === selectedCategory;
    const areaMatch = selectedArea === "全て" || store.area === selectedArea;
    return nameMatch && categoryMatch && areaMatch;
  });

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores(prev =>
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStores.length === filteredStores.length) {
      setSelectedStores([]);
    } else {
      setSelectedStores(filteredStores.map(store => store.id));
    }
  };

  const handleSubmit = () => {
    // ここで選択された店舗を処理
    console.log("選択された店舗:", selectedStores);
    // 前の画面に戻る
    router.push(`/admin/campaigns/${resolvedParams.id}/assign-gift-cards`);
  };

  const handleCancel = () => {
    router.push(`/admin/campaigns/${resolvedParams.id}/assign-gift-cards`);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/campaigns/${resolvedParams.id}/assign-gift-cards`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">店舗検索</h1>
            <p className="text-sm text-gray-600 mt-1">ギフトカード配布対象の店舗を選択</p>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 店舗名検索 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  店舗名
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="店舗名を検索"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
              </div>

              {/* 業種選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  業種
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* エリア選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  エリア
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 該当店舗リスト */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">該当店舗</h2>
                <span className="text-sm text-gray-500">
                  ({filteredStores.length}店舗中 {selectedStores.length}店舗選択)
                </span>
              </div>
              <button
                onClick={handleSelectAll}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {selectedStores.length === filteredStores.length ? "選択を解除" : "すべて選択"}
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStores.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  該当する店舗が見つかりません
                </p>
              ) : (
                filteredStores.map((store) => (
                  <label
                    key={store.id}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(store.id)}
                      onChange={() => handleStoreToggle(store.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-gray-900">{store.name}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {store.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{store.address}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {store.area}
                    </div>
                  </label>
                ))
              )}
            </div>

            {/* 選択された店舗の表示 */}
            {selectedStores.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  選択中の店舗 ({selectedStores.length}店舗)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStores.map((storeId) => {
                    const store = mockStores.find(s => s.id === storeId);
                    return store ? (
                      <span
                        key={storeId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {store.name}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleStoreToggle(storeId);
                          }}
                          className="ml-1 hover:text-indigo-900"
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ボタン */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedStores.length === 0}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium ${
                  selectedStores.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                登録 ({selectedStores.length}店舗)
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}