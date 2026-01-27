import { Filters } from './types';

export type Locale = 'ko' | 'ja' | 'zh';

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'ko', label: '한국어' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];

export type I18nStrings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
  mapToggle: string;
  mapLoading: string;
  mapError: string;
  listLoading: string;
  listEmpty: string;
  filters: {
    searchLabel: string;
    searchPlaceholder: string;
    seasonLabel: string;
    seasonAll: string;
    seasonOption: (season: number) => string;
    teamLabel: string;
    teamOptions: Record<Filters['team'], string>;
    onlyBooking: string;
    onlyTop7: string;
  };
  badges: {
    top7: string;
    season: (season: number) => string;
    team: (team: Filters['team']) => string;
  };
  detail: {
    close: string;
    address: string;
    category: string;
    tags: string;
    instagram: string;
    updated: string;
    copy: string;
    copied: string;
    naverBooking: string;
    naverPlace: string;
    shareLink: string;
    directions: string;
    call: string;
  };
};

const buildTranslations = (): Record<Locale, I18nStrings> => {
  const koTeamOptions: Record<Filters['team'], string> = {
    all: '팀 전체',
    black: '블랙',
    white: '화이트',
    unknown: '미정',
  };
  const jaTeamOptions: Record<Filters['team'], string> = {
    all: '全チーム',
    black: 'ブラック',
    white: 'ホワイト',
    unknown: '未定',
  };
  const zhTeamOptions: Record<Filters['team'], string> = {
    all: '全部队伍',
    black: '黑队',
    white: '白队',
    unknown: '未知',
  };

  return {
    ko: {
    eyebrow: '비공식 팬메이드',
    title: '흑백 요리사 지도 (비공식)',
    subtitle: '검색/필터 후 지도 마커와 리스트가 함께 갱신됩니다.',
    footer: '비공식 팬메이드 / 방송·제작사·출연자와 무관 / 정보는 수시로 변동 가능 / 링크는 각 서비스로 연결',
    mapToggle: '전체 식당 마커 보기',
    mapLoading: '지도를 불러오는 중...',
    mapError: '지도를 표시할 수 없습니다.',
    listLoading: '로딩 중...',
    listEmpty: '조건에 맞는 식당이 없습니다.',
    filters: {
      searchLabel: '검색',
      searchPlaceholder: '셰프, 식당, 카테고리, 주소, 태그 검색',
      seasonLabel: '시즌',
      seasonAll: '전체',
      seasonOption: (season) => `시즌 ${season}`,
      teamLabel: '팀',
      teamOptions: koTeamOptions,
      onlyBooking: '네이버 예약 가능만',
      onlyTop7: '탑 7 셰프만 보기',
    },
    badges: {
      top7: 'TOP7',
      season: (season) => `시즌 ${season}`,
      team: (team) => `팀 ${koTeamOptions[team]}`,
    },
    detail: {
      close: '닫기',
      address: '주소',
      category: '카테고리',
      tags: '태그',
      instagram: '인스타그램',
      updated: '업데이트',
      copy: '복사',
      copied: '복사됨',
      naverBooking: '네이버 예약',
      naverPlace: '네이버 플레이스',
      shareLink: '링크 복사',
      directions: '길찾기 (Google)',
      call: '전화하기',
    },
  },
  ja: {
    eyebrow: '非公式ファンメイド',
    title: '黒白料理人マップ（非公式）',
    subtitle: '検索/フィルターで地図マーカーとリストが連動して更新されます。',
    footer:
      '非公式ファンメイド / 番組・制作会社・出演者とは無関係 / 情報は随時更新 / リンクは各サービスへ移動',
    mapToggle: '全ての店舗マーカーを表示',
    mapLoading: '地図を読み込み中...',
    mapError: '地図を表示できません。',
    listLoading: '読み込み中...',
    listEmpty: '条件に合う店舗がありません。',
    filters: {
      searchLabel: '検索',
      searchPlaceholder: 'シェフ、店舗、カテゴリ、住所、タグを検索',
      seasonLabel: 'シーズン',
      seasonAll: 'すべて',
      seasonOption: (season) => `シーズン ${season}`,
      teamLabel: 'チーム',
      teamOptions: jaTeamOptions,
      onlyBooking: 'NAVER予約可能のみ',
      onlyTop7: 'トップ7シェフのみ',
    },
    badges: {
      top7: 'TOP7',
      season: (season) => `シーズン ${season}`,
      team: (team) => `チーム ${jaTeamOptions[team]}`,
    },
    detail: {
      close: '閉じる',
      address: '住所',
      category: 'カテゴリ',
      tags: 'タグ',
      instagram: 'Instagram',
      updated: '更新日',
      copy: 'コピー',
      copied: 'コピー済み',
      naverBooking: 'NAVER予約',
      naverPlace: 'NAVERプレイス',
      shareLink: 'リンクをコピー',
      directions: 'ルート案内 (Google)',
      call: '電話する',
    },
  },
  zh: {
    eyebrow: '非官方粉丝制作',
    title: '黑白厨师地图（非官方）',
    subtitle: '搜索/筛选后地图标记与列表会同步更新。',
    footer: '非官方粉丝制作 / 与节目·制作方·出演者无关 / 信息可能随时变动 / 链接跳转至各服务',
    mapToggle: '显示全部餐厅标记',
    mapLoading: '正在加载地图...',
    mapError: '无法显示地图。',
    listLoading: '加载中...',
    listEmpty: '没有符合条件的餐厅。',
    filters: {
      searchLabel: '搜索',
      searchPlaceholder: '搜索厨师、餐厅、分类、地址、标签',
      seasonLabel: '季',
      seasonAll: '全部',
      seasonOption: (season) => `第 ${season} 季`,
      teamLabel: '队伍',
      teamOptions: zhTeamOptions,
      onlyBooking: '仅显示可 NAVER 预约',
      onlyTop7: '只看 TOP7 主厨',
    },
    badges: {
      top7: 'TOP7',
      season: (season) => `第 ${season} 季`,
      team: (team) => `队伍 ${zhTeamOptions[team]}`,
    },
    detail: {
      close: '关闭',
      address: '地址',
      category: '分类',
      tags: '标签',
      instagram: 'Instagram',
      updated: '更新日期',
      copy: '复制',
      copied: '已复制',
      naverBooking: 'NAVER 预约',
      naverPlace: 'NAVER 地点',
      shareLink: '复制链接',
      directions: '路线导航 (Google)',
      call: '拨打电话',
    },
  },
  };
};

export const translations: Record<Locale, I18nStrings> = buildTranslations();
