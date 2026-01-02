import { Filters } from '../types';

interface FiltersProps {
  filters: Filters;
  seasons: number[];
  onChange: (filters: Filters) => void;
}

const teamLabel: Record<Filters['team'], string> = {
  all: '팀 전체',
  black: '블랙',
  white: '화이트',
  unknown: '미정',
};

export function FiltersPanel({ filters, seasons, onChange }: FiltersProps) {
  const handleInput = (key: keyof Filters, value: Filters[keyof Filters]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="panel filters">
      <div className="field">
        <label htmlFor="search">검색</label>
        <input
          id="search"
          type="text"
          placeholder="셰프, 식당, 카테고리, 주소, 태그 검색"
          value={filters.search}
          onChange={(e) => handleInput('search', e.target.value)}
        />
      </div>

      <div className="field-group">
        <div className="field">
          <label htmlFor="season">시즌</label>
          <select
            id="season"
            value={filters.season}
            onChange={(e) =>
              handleInput('season', e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
          >
            <option value="all">전체</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                시즌 {season}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="team">팀</label>
          <select
            id="team"
            value={filters.team}
            onChange={(e) => handleInput('team', e.target.value as Filters['team'])}
          >
            {(['all', 'black', 'white', 'unknown'] as Filters['team'][]).map((team) => (
              <option key={team} value={team}>
                {teamLabel[team]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={filters.onlyBooking}
          onChange={(e) => handleInput('onlyBooking', e.target.checked)}
        />
        네이버 예약 가능만
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={filters.onlyTop7}
          onChange={(e) => handleInput('onlyTop7', e.target.checked)}
        />
        탑 7 셰프만 보기
      </label>
    </div>
  );
}
