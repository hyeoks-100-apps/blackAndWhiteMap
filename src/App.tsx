import { useEffect, useMemo, useState } from 'react';
import { DetailDrawer } from './components/DetailDrawer';
import { FiltersPanel } from './components/Filters';
import { AdsenseBanner } from './components/AdsenseBanner';
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
  const [showAllMarkers, setShowAllMarkers] = useState(true);

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
  const mapRestaurants =
    selectedId && !showAllMarkers ? filtered.filter((item) => item.id === selectedId) : filtered;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowAllMarkers(false);
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

      <main className="layout">
        <section className="left">
          <FiltersPanel filters={filters} seasons={seasons} onChange={setFilters} />
          <AdsenseBanner className="panel adsense-panel" />
          {loading && <div className="panel list">로딩 중...</div>}
          {error && !loading && <div className="panel list error">{error}</div>}
          {!loading && !error && (
            <RestaurantList restaurants={filtered} selectedId={selectedId} onSelect={handleSelect} />
          )}
        </section>

        <section className="right">
          <div className="map-controls">
            <label className="map-toggle">
              <input
                type="checkbox"
                checked={showAllMarkers}
                onChange={(event) => setShowAllMarkers(event.target.checked)}
              />
              전체 식당 마커 보기
            </label>
          </div>
          {!loading && !error && (
            <MapView restaurants={mapRestaurants} selectedId={selectedId} onSelect={handleSelect} />
          )}
          {loading && <div className="panel map-placeholder">지도를 불러오는 중...</div>}
          {error && !loading && <div className="panel map-placeholder">지도를 표시할 수 없습니다.</div>}

          <section className="map-banner" aria-label="쿠팡 파트너스 안내">
            <a
              className="promo-image-link"
              href="https://link.coupang.com/a/dlfLQi"
              target="_blank"
              rel="noreferrer noopener sponsored"
              referrerPolicy="unsafe-url"
            >
              <img
                src="https://image9.coupangcdn.com/image/affiliate/banner/54fab81672c161135ffdd8abbd084b40@2x.jpg"
                alt="크리넥스 데코 앤 소프트 수딩플러스 천연펄프 3겹 고급롤화장지, 27m, 24개입, 1개"
                width={96}
                height={192}
                loading="lazy"
              />
            </a>
          </section>
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
