'use client'

import AdvertiserLayout from '@/components/advertiser/AdvertiserLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CampaignDistribution = {
  id: string;
  distributedCount: number;
  campaignId: string;
  campaignName: string;
  advertiserId: string;
  advertiserName: string;
  startDate: string;
  endDate: string;
};

type StoreDistribution = {
  id: string;
  storeId: string;
  storeName: string;
  area: string;
  industry: string;
  inventoryCount: number;
  distributedCount: number;
};

const mockCampaignDistributions: CampaignDistribution[] = [
  {
    id: "DST001",
    distributedCount: 1500,
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "DST002",
    distributedCount: 800,
    campaignId: "CMP002",
    campaignName: "期間限定ポイント2倍",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
  },
  {
    id: "DST003",
    distributedCount: 2300,
    campaignId: "CMP003",
    campaignName: "バレンタインキャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
  },
];

const mockStoreDistributions: StoreDistribution[] = [
  {
    id: "STR001",
    storeId: "STR001234",
    storeName: "イオンモール幕張新都心",
    area: "千葉県",
    industry: "ショッピングモール",
    inventoryCount: 1250,
    distributedCount: 750,
  },
  {
    id: "STR002",
    storeId: "STR001235",
    storeName: "ららぽーと豊洲",
    area: "東京都",
    industry: "ショッピングモール",
    inventoryCount: 980,
    distributedCount: 520,
  },
  {
    id: "STR003",
    storeId: "STR001236",
    storeName: "渋谷パルコ",
    area: "東京都",
    industry: "ファッション",
    inventoryCount: 650,
    distributedCount: 350,
  },
];

const mockAreas = [
  { id: 1, name: "東京都", parentId: null },
  { id: 2, name: "神奈川県", parentId: null },
  { id: 3, name: "千葉県", parentId: null },
  { id: 4, name: "埼玉県", parentId: null },
];

const mockIndustries = [
  { id: 1, name: "ショッピングモール", parentId: null },
  { id: 2, name: "ファッション", parentId: null },
  { id: 3, name: "飲食店", parentId: null },
  { id: 4, name: "コンビニエンスストア", parentId: null },
];

export default function AdvertiserDistributionsPage() {
  const [activeTab, setActiveTab] = useState<'campaign' | 'store'>('campaign');
  const [searchCampaignName, setSearchCampaignName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStoreName, setSearchStoreName] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const router = useRouter();

  const campaignDistributions = mockCampaignDistributions.filter(dist => {
    const campaignMatch = searchCampaignName === "" || dist.campaignName.toLowerCase().includes(searchCampaignName.toLowerCase());

    let dateMatch = true;
    if (searchStartDate && searchEndDate) {
      const startDate = new Date(searchStartDate);
      const endDate = new Date(searchEndDate);
      const distStartDate = new Date(dist.startDate);
      const distEndDate = new Date(dist.endDate);
      dateMatch = (distStartDate >= startDate && distStartDate <= endDate) ||
                  (distEndDate >= startDate && distEndDate <= endDate) ||
                  (distStartDate <= startDate && distEndDate >= endDate);
    }

    return campaignMatch && dateMatch;
  });

  const storeDistributions = mockStoreDistributions.filter(dist => {
    const storeMatch = searchStoreName === "" || dist.storeName.toLowerCase().includes(searchStoreName.toLowerCase());
    const areaMatch = searchArea === "" || dist.area === searchArea;
    const industryMatch = searchIndustry === "" || dist.industry === searchIndustry;
    return storeMatch && areaMatch && industryMatch;
  });

  // エリアの選択肢を取得
  const areaOptions = mockAreas.filter(area => area.parentId === null);

  // 業種の選択肢を取得
  const industryOptions = mockIndustries.filter(industry => industry.parentId === null);

  return (
    <AdvertiserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布実績管理</h1>
            <p className="text-sm text-gray-600 mt-1">ギフトカード配布実績の一覧と管理</p>
          </div>
        </div>

        {/* タブ切り替え */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'campaign'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('campaign')}
            >
              キャンペーン
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'store'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('store')}
            >
              店舗
            </button>
          </div>
        </div>

        {/* 検索・フィルタ */}
        <div className="bg-white rounded-lg shadow p-4">
          {activeTab === 'campaign' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キャンペーン名
                </label>
                <input
                  type="text"
                  placeholder="キャンペーン名で検索"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchCampaignName}
                  onChange={(e) => setSearchCampaignName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キャンペーン期間（開始日）
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キャンペーン期間（終了日）
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  店舗名
                </label>
                <input
                  type="text"
                  placeholder="店舗名で検索"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchStoreName}
                  onChange={(e) => setSearchStoreName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  エリア
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchArea}
                  onChange={(e) => setSearchArea(e.target.value)}
                >
                  <option value="">すべてのエリア</option>
                  {areaOptions.map((area) => (
                    <option key={area.id} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  業種
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchIndustry}
                  onChange={(e) => setSearchIndustry(e.target.value)}
                >
                  <option value="">すべての業種</option>
                  {industryOptions.map((industry) => (
                    <option key={industry.id} value={industry.name}>
                      {industry.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'campaign' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布枚数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーンID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    キャンペーン名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    開始日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    終了日
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaignDistributions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      配布実績データがありません
                    </td>
                  </tr>
                ) : (
                  campaignDistributions.map((dist) => (
                    <tr
                      key={dist.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/advertiser/distributions/${dist.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dist.distributedCount.toLocaleString()}枚
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.campaignId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.campaignName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.endDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    店舗名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    エリア
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    業種
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ギフトカード在庫数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配布枚数
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {storeDistributions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      配布実績データがありません
                    </td>
                  </tr>
                ) : (
                  storeDistributions.map((dist) => (
                    <tr
                      key={dist.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/advertiser/distributions/stores/${dist.storeId}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dist.storeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.storeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.area}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.inventoryCount.toLocaleString()}枚
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.distributedCount.toLocaleString()}枚
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdvertiserLayout>
  )
}