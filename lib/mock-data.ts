// モックデータ

export const mockMembers = [
  {
    id: "MEM001",
    name: "田中太郎",
    phone: "090-1234-5678",
    email: "tanaka@example.com",
    registeredDate: "2025-01-01",
    status: "active",
    points: 1500,
    gender: "男性",
    birthdate: "1990-01-15",
    referralCode: "TAN123",
  },
  {
    id: "MEM002",
    name: "鈴木花子",
    phone: "080-2345-6789",
    email: "suzuki@example.com",
    registeredDate: "2025-01-05",
    status: "active",
    points: 2300,
    gender: "女性",
    birthdate: "1985-03-22",
    referralCode: "SUZ456",
  },
  {
    id: "MEM003",
    name: "佐藤健",
    phone: "070-3456-7890",
    email: "sato@example.com",
    registeredDate: "2025-01-10",
    status: "inactive",
    points: 500,
    gender: "男性",
    birthdate: "1995-07-10",
    referralCode: "SAT789",
  },
];

export const mockStores = [
  {
    id: "ST001",
    name: "カフェ モカ",
    company: "株式会社モカ",
    agency: "代理店A",
    area: "東京・渋谷",
    category: "カフェ",
    visitPoint: true,
    status: "営業中",
    address: "東京都渋谷区道玄坂1-2-3",
    phone: "03-1234-5678",
    email: "mocha@example.com",
    businessHours: "10:00-22:00",
    industryCode: "001",
  },
  {
    id: "ST002",
    name: "レストラン サクラ",
    company: "サクラフーズ株式会社",
    agency: "代理店B",
    area: "大阪・梅田",
    category: "レストラン",
    visitPoint: false,
    status: "営業中",
    address: "大阪府大阪市北区梅田2-3-4",
    phone: "06-2345-6789",
    email: "sakura@example.com",
    businessHours: "11:00-23:00",
    industryCode: "001",
  },
  {
    id: "ST003",
    name: "ショップ アオイ",
    company: "アオイ商事",
    agency: "-",
    area: "名古屋・栄",
    category: "小売店",
    visitPoint: true,
    status: "準備中",
    address: "愛知県名古屋市中区栄3-4-5",
    phone: "052-3456-7890",
    email: "aoi@example.com",
    businessHours: "09:00-20:00",
    industryCode: "002",
  },
];

export const mockAdvertisers = [
  {
    id: "ADV001",
    companyName: "株式会社ABC",
    contactName: "山田一郎",
    email: "yamada@abc.com",
    phone: "03-1111-2222",
    industryCode: "003",
    status: "承認済み",
    registeredDate: "2024-12-01",
    campaigns: 3,
    totalBudget: 5000000,
  },
  {
    id: "ADV002",
    companyName: "XYZ株式会社",
    contactName: "佐藤二郎",
    email: "sato@xyz.com",
    phone: "06-3333-4444",
    industryCode: "004",
    status: "審査中",
    registeredDate: "2024-12-15",
    campaigns: 0,
    totalBudget: 0,
  },
];

export const mockAgencies = [
  {
    id: "AGE001",
    name: "代理店A",
    contactName: "代理店太郎",
    email: "agency-a@example.com",
    phone: "03-5555-6666",
    commissionRate: 15,
    stores: 25,
    status: "active",
    registeredDate: "2024-10-01",
  },
  {
    id: "AGE002",
    name: "代理店B",
    contactName: "代理店花子",
    email: "agency-b@example.com",
    phone: "06-7777-8888",
    commissionRate: 12,
    stores: 18,
    status: "active",
    registeredDate: "2024-11-01",
  },
];

export const mockCampaigns = [
  {
    id: "CAM001",
    name: "新春キャンペーン2025",
    advertiser: "株式会社ABC",
    period: "2025/01/01 - 2025/01/31",
    budget: 1000000,
    distributed: 1200,
    total: 5000,
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  },
  {
    id: "CAM002",
    name: "バレンタインキャンペーン",
    advertiser: "XYZ株式会社",
    period: "2025/02/01 - 2025/02/14",
    budget: 500000,
    distributed: 0,
    total: 2000,
    status: "pending",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
  },
  {
    id: "CAM003",
    name: "クリスマスキャンペーン2024",
    advertiser: "株式会社ABC",
    period: "2024/12/01 - 2024/12/25",
    budget: 2000000,
    distributed: 8500,
    total: 10000,
    status: "completed",
    startDate: "2024-12-01",
    endDate: "2024-12-25",
  },
];

export const mockGiftCards = [
  {
    id: "GC001",
    serialNumber: "AMZN-2025-0001",
    amount: 500,
    status: "未使用",
    campaign: "新春キャンペーン2025",
    assignedStore: "カフェ モカ",
    issuedDate: null,
  },
  {
    id: "GC002",
    serialNumber: "AMZN-2025-0002",
    amount: 1000,
    status: "配布済み",
    campaign: "新春キャンペーン2025",
    assignedStore: "レストラン サクラ",
    issuedDate: "2025-01-15",
    issuedTo: "田中太郎",
  },
];

export const mockInvoices = [
  {
    id: "INV001",
    advertiser: "株式会社ABC",
    amount: 1080000,
    dueDate: "2025-01-31",
    status: "未払い",
    issuedDate: "2025-01-01",
    campaign: "新春キャンペーン2025",
  },
  {
    id: "INV002",
    advertiser: "株式会社ABC",
    amount: 2160000,
    dueDate: "2024-12-31",
    status: "支払済み",
    issuedDate: "2024-12-01",
    campaign: "クリスマスキャンペーン2024",
    paidDate: "2024-12-28",
  },
];

export const mockPointItems = [
  {
    id: "PI001",
    name: "Amazonギフト券 500円",
    requiredPoints: 500,
    stock: 100,
    category: "ギフト券",
    description: "Amazon.co.jpで使える500円分のギフト券",
    image: "/images/amazon-500.jpg",
  },
  {
    id: "PI002",
    name: "スターバックスカード 1000円",
    requiredPoints: 1000,
    stock: 50,
    category: "ギフト券",
    description: "スターバックスで使える1000円分のカード",
    image: "/images/starbucks-1000.jpg",
  },
];

export const mockNotices = [
  {
    id: "NOT001",
    title: "新春キャンペーン開始のお知らせ",
    content: "2025年1月1日より新春キャンペーンを開始しました。",
    targetType: "全体",
    publishDate: "2025-01-01",
    status: "公開中",
  },
  {
    id: "NOT002",
    title: "システムメンテナンスのお知らせ",
    content: "2025年1月20日 AM2:00-4:00にシステムメンテナンスを実施します。",
    targetType: "全体",
    publishDate: "2025-01-15",
    status: "予約",
  },
];

export const mockCategories = [
  { id: "CAT001", name: "飲食", parentId: null, order: 1 },
  { id: "CAT002", name: "レストラン", parentId: "CAT001", order: 1 },
  { id: "CAT003", name: "カフェ", parentId: "CAT001", order: 2 },
  { id: "CAT004", name: "小売", parentId: null, order: 2 },
  { id: "CAT005", name: "ファッション", parentId: "CAT004", order: 1 },
];

export const mockAreas = [
  { id: "AREA001", name: "関東", parentId: null },
  { id: "AREA002", name: "東京", parentId: "AREA001" },
  { id: "AREA003", name: "渋谷", parentId: "AREA002" },
  { id: "AREA004", name: "関西", parentId: null },
  { id: "AREA005", name: "大阪", parentId: "AREA004" },
];

export const mockIndustries = [
  { id: "001", code: "001", name: "飲食業", category: "サービス業" },
  { id: "002", code: "002", name: "小売業", category: "販売業" },
  { id: "003", code: "003", name: "IT・通信", category: "情報産業" },
  { id: "004", code: "004", name: "製造業", category: "工業" },
];