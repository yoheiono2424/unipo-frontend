"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockStoreDistributions, mockAreas, mockIndustries } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

type CampaignDistribution = {
  id: string;
  distributedCount: number;
  campaignId: string;
  campaignName: string;
  advertiserId: string;
  advertiserName: string;
  agencyId: string;
  agencyName: string;
  startDate: string;
  endDate: string;
};

type CompanyDistribution = {
  id: string;
  name: string;
  totalDistributedCount: number;
  groupCount: number;
  storeCount: number;
};

type GroupDistribution = {
  id: string;
  name: string;
  companyId: string;
  distributedCount: number;
  storeCount: number;
};

type StoreDistributionType = typeof mockStoreDistributions[0] & {
  groupId?: string;
  companyId?: string;
};


const mockCampaignDistributions: CampaignDistribution[] = [
  {
    id: "DST001",
    distributedCount: 1500,
    campaignId: "CMP001",
    campaignName: "春の新生活応援キャンペーン",
    advertiserId: "ADV001",
    advertiserName: "株式会社サンプル",
    agencyId: "AGE001",
    agencyName: "エージェンシーA",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "DST002",
    distributedCount: 800,
    campaignId: "CMP002",
    campaignName: "期間限定ポイント2倍",
    advertiserId: "ADV002",
    advertiserName: "サンプル商事株式会社",
    agencyId: "AGE002",
    agencyName: "エージェンシーB",
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
    agencyId: "AGE001",
    agencyName: "エージェンシーA",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
  },
];

// 企業別配布実績モックデータ
const mockCompanyDistributions: CompanyDistribution[] = [
  {
    id: "CMP001",
    name: "株式会社ABC商事",
    totalDistributedCount: 4500,
    groupCount: 3,
    storeCount: 15,
  },
  {
    id: "CMP002",
    name: "XYZ株式会社",
    totalDistributedCount: 2800,
    groupCount: 2,
    storeCount: 8,
  },
  {
    id: "CMP003",
    name: "グローバルフーズ株式会社",
    totalDistributedCount: 6200,
    groupCount: 4,
    storeCount: 23,
  },
];

// グループ別配布実績モックデータ
const mockGroupDistributions: GroupDistribution[] = [
  {
    id: "GRP001",
    name: "東京グループA",
    companyId: "CMP001",
    distributedCount: 1800,
    storeCount: 8,
  },
  {
    id: "GRP002",
    name: "関西エリアグループ",
    companyId: "CMP002",
    distributedCount: 1500,
    storeCount: 5,
  },
  {
    id: "GRP003",
    name: "中部地区グループ",
    companyId: "CMP003",
    distributedCount: 1200,
    storeCount: 3,
  },
  {
    id: "GRP004",
    name: "九州エリアグループ",
    companyId: "CMP001",
    distributedCount: 1400,
    storeCount: 4,
  },
  {
    id: "GRP005",
    name: "北海道グループ",
    companyId: "CMP001",
    distributedCount: 1300,
    storeCount: 3,
  },
];

function DistributionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<'campaign' | 'company'>('campaign');
  const [affiliateType, setAffiliateType] = useState<'company' | 'group' | 'store'>('company');
  const [searchCampaignName, setSearchCampaignName] = useState("");
  const [searchAdvertiserName, setSearchAdvertiserName] = useState("");
  const [searchAgencyName, setSearchAgencyName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");

  // URLパラメータから階層情報を取得
  const selectedCompanyId = searchParams.get('companyId');
  const selectedGroupId = searchParams.get('groupId');

  // URLパラメータに応じて種別を自動切り替え
  useEffect(() => {
    if (selectedGroupId) {
      setAffiliateType('store');
    } else if (selectedCompanyId) {
      setAffiliateType('group');
    } else {
      setAffiliateType('company');
    }
  }, [selectedCompanyId, selectedGroupId]);

  // パンくずリスト用のデータ取得
  const selectedCompany = selectedCompanyId
    ? mockCompanyDistributions.find(c => c.id === selectedCompanyId)
    : null;
  const selectedGroup = selectedGroupId
    ? mockGroupDistributions.find(g => g.id === selectedGroupId)
    : null;

  // キャンペーンタブのフィルタリング
  const campaignDistributions = mockCampaignDistributions.filter(dist => {
    const campaignMatch = searchCampaignName === "" || dist.campaignName.toLowerCase().includes(searchCampaignName.toLowerCase());
    const advertiserMatch = searchAdvertiserName === "" || dist.advertiserName.toLowerCase().includes(searchAdvertiserName.toLowerCase());
    const agencyMatch = searchAgencyName === "" || dist.agencyName.toLowerCase().includes(searchAgencyName.toLowerCase());

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

    return campaignMatch && advertiserMatch && agencyMatch && dateMatch;
  });

  // 企業タブのフィルタリング（種別によって異なるデータを表示）
  let filteredData: CompanyDistribution[] | GroupDistribution[] | typeof mockStoreDistributions = [];

  if (affiliateType === 'company') {
    // 企業一覧を表示
    filteredData = mockCompanyDistributions.filter(company => {
      const nameMatch = searchName === "" || company.name.toLowerCase().includes(searchName.toLowerCase());
      return nameMatch;
    });
  } else if (affiliateType === 'group') {
    // 選択された企業のグループ一覧を表示
    filteredData = mockGroupDistributions.filter(group => {
      const companyMatch = !selectedCompanyId || group.companyId === selectedCompanyId;
      const nameMatch = searchName === "" || group.name.toLowerCase().includes(searchName.toLowerCase());
      return companyMatch && nameMatch;
    });
  } else {
    // 選択されたグループの店舗一覧を表示
    filteredData = mockStoreDistributions.filter(store => {
      // 実際にはgroupIdでフィルタリングすべきですが、モックデータにgroupIdがないため名前検索のみ
      const nameMatch = searchName === "" || store.storeName.toLowerCase().includes(searchName.toLowerCase());
      const areaMatch = searchArea === "" || store.area === searchArea;
      const industryMatch = searchIndustry === "" || store.industry === searchIndustry;
      return nameMatch && areaMatch && industryMatch;
    });
  }

  // ドリルダウン用のナビゲーション関数
  const handleCompanyClick = (companyId: string) => {
    router.push(`/admin/distributions?companyId=${companyId}`);
  };

  const handleGroupClick = (groupId: string) => {
    router.push(`/admin/distributions?companyId=${selectedCompanyId}&groupId=${groupId}`);
  };

  // パンくずリストでの戻る操作
  const handleBreadcrumbClick = (level: 'root' | 'company') => {
    if (level === 'root') {
      router.push('/admin/distributions');
    } else if (level === 'company') {
      router.push(`/admin/distributions?companyId=${selectedCompanyId}`);
    }
  };

  // エリアの選択肢を取得（子要素のみ）
  const areaOptions = mockAreas.filter(area => area.parentId !== null);

  // 業種の選択肢を取得（子要素のみ）
  const industryOptions = mockIndustries.filter(industry => industry.parentId !== null);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">配布実績管理</h1>
            <p className="text-sm text-gray-600 mt-1">ギフトカード配布実績の一覧と管理</p>
          </div>
        </div>

        {/* パンくずリスト */}
        {activeTab === 'company' && (selectedCompanyId || selectedGroupId) && (
          <div className="bg-white rounded-lg shadow p-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={() => handleBreadcrumbClick('root')}
                className="hover:text-indigo-600 transition-colors"
              >
                配布実績
              </button>
              {selectedCompanyId && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <button
                    onClick={() => handleBreadcrumbClick('company')}
                    className={`hover:text-indigo-600 transition-colors ${!selectedGroupId ? 'font-semibold text-gray-900' : ''}`}
                  >
                    {selectedCompany?.name || 'ローディング中...'}
                  </button>
                </>
              )}
              {selectedGroupId && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-semibold text-gray-900">
                    {selectedGroup?.name || 'ローディング中...'}
                  </span>
                </>
              )}
            </nav>
          </div>
        )}

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
                activeTab === 'company'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('company')}
            >
              企業
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
                  広告主名
                </label>
                <input
                  type="text"
                  placeholder="広告主名で検索"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchAdvertiserName}
                  onChange={(e) => setSearchAdvertiserName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  代理店名
                </label>
                <input
                  type="text"
                  placeholder="代理店名で検索"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchAgencyName}
                  onChange={(e) => setSearchAgencyName(e.target.value)}
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
                  加盟店種別
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={affiliateType}
                  onChange={(e) => {
                    setAffiliateType(e.target.value as 'company' | 'group' | 'store');
                    // 種別変更時はドリルダウンをリセット
                    router.push('/admin/distributions');
                  }}
                  disabled={selectedCompanyId !== null || selectedGroupId !== null}
                >
                  <option value="company">企業</option>
                  <option value="group">グループ</option>
                  <option value="store">店舗</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {affiliateType === 'company' ? '企業名' : affiliateType === 'group' ? 'グループ名' : '店舗名'}
                </label>
                <input
                  type="text"
                  placeholder={`${affiliateType === 'company' ? '企業名' : affiliateType === 'group' ? 'グループ名' : '店舗名'}で検索`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              {affiliateType === 'store' && (
                <>
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
                </>
              )}
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
                    広告主ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    広告主名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    代理店ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    代理店名
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
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      配布実績データがありません
                    </td>
                  </tr>
                ) : (
                  campaignDistributions.map((dist) => (
                    <tr
                      key={dist.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/admin/distribution-records/${dist.id}`)}
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
                        {dist.advertiserId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.advertiserName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.agencyId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dist.agencyName}
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
            <>
              {affiliateType === 'company' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        企業ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        企業名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        総配布枚数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        対象グループ数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        対象店舗数
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          配布実績データがありません
                        </td>
                      </tr>
                    ) : (
                      (filteredData as CompanyDistribution[]).map((company) => (
                        <tr
                          key={company.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleCompanyClick(company.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {company.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                            {company.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {company.totalDistributedCount.toLocaleString()}枚
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {company.groupCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {company.storeCount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
              {affiliateType === 'group' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        グループID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        グループ名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        配布枚数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        所属店舗数
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          配布実績データがありません
                        </td>
                      </tr>
                    ) : (
                      (filteredData as GroupDistribution[]).map((group) => (
                        <tr
                          key={group.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleGroupClick(group.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {group.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                            {group.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {group.distributedCount.toLocaleString()}枚
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {group.storeCount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
              {affiliateType === 'store' && (
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
                        配布枚数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        在庫数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        業種
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        エリア
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          配布実績データがありません
                        </td>
                      </tr>
                    ) : (
                      (filteredData as typeof mockStoreDistributions).map((store) => (
                        <tr
                          key={store.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => router.push(`/admin/distribution-records/stores/${store.storeId}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {store.storeId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {store.storeName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {store.distributedCount.toLocaleString()}枚
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {store.inventoryCount.toLocaleString()}枚
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {store.industry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {store.area}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminDistributionsPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-sm text-gray-600">読み込み中...</p>
          </div>
        </div>
      </AdminLayout>
    }>
      <DistributionsContent />
    </Suspense>
  );
}