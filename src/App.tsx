import { useEffect, useMemo, useState } from 'react';
import { DetailDrawer } from './components/DetailDrawer';
import { FiltersPanel } from './components/Filters';
import { MapView } from './components/MapView';
import { RestaurantList } from './components/RestaurantList';
import { useRestaurants } from './hooks/useRestaurants';
import { Filters, Restaurant } from './types';
import { filterRestaurants } from './utils/filter';
import { readIdFromHash, writeHash } from './utils/hash';

const defaultFilters: Filters = {
  search: '',
  season: 'all',
  team: 'all',
  onlyBooking: false,
  onlyTop7: false,
};

function getSeasons(restaurants: Restaurant[]): number[] {
  const set = new Set<number>();
  restaurants.forEach((item) => {
    if (typeof item.chef.season === 'number') {
      set.add(item.chef.season);
    }
  });
  return Array.from(set).sort((a, b) => a - b);
}

function App() {
  const { data, loading, error } = useRestaurants();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => filterRestaurants(data, filters), [data, filters]);
  const seasons = useMemo(() => getSeasons(data), [data]);

  useEffect(() => {
    if (!data.length) return;
    const initialId = readIdFromHash();
    if (initialId && data.some((item) => item.id === initialId)) {
      setSelectedId(initialId);
    }
  }, [data]);

  useEffect(() => {
    if (selectedId) {
      writeHash(selectedId);
    } else {
      writeHash(null);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedId && !filtered.some((item) => item.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  const selectedRestaurant = data.find((item) => item.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">비공식 팬메이드</p>
          <h1>흑백 요리사 지도 (비공식)</h1>
        </div>
        <p className="muted">검색/필터 후 지도 마커와 리스트가 함께 갱신됩니다.</p>
      </header>

      <section className="promo-banner" aria-label="쿠팡 파트너스 안내">
        <a
          className="promo-link-image"
          href="https://link.coupang.com/a/dlcZG2"
          target="_blank"
          rel="noreferrer noopener sponsored"
        >
          <img
            src="https://ads-partners.coupang.com/banners/728x90_1.png"
            alt="쿠팡 파트너스 배너 - 추천 상품 보기"
            loading="lazy"
          />
        </a>
      </section>

      <main className="layout">
        <section className="left">
          <FiltersPanel filters={filters} seasons={seasons} onChange={setFilters} />
          {loading && <div className="panel list">로딩 중...</div>}
          {error && !loading && <div className="panel list error">{error}</div>}
          {!loading && !error && (
            <RestaurantList restaurants={filtered} selectedId={selectedId} onSelect={handleSelect} />
          )}
        </section>

        <section className="right">
          {!loading && !error && (
            <MapView restaurants={filtered} selectedId={selectedId} onSelect={handleSelect} />
          )}
          {loading && <div className="panel map-placeholder">지도를 불러오는 중...</div>}
          {error && !loading && <div className="panel map-placeholder">지도를 표시할 수 없습니다.</div>}
        </section>
      </main>

      <DetailDrawer restaurant={selectedRestaurant} onClose={() => setSelectedId(null)} />

      <footer className="footer">
        비공식 팬메이드 / 방송·제작사·출연자와 무관 / 정보는 수시로 변동 가능 / 링크는 각 서비스로 연결
      </footer>
    </div>
  );
}

export default App;
