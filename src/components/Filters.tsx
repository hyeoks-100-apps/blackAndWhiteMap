import { Filters } from '../types';

interface FiltersProps {
  filters: Filters;
  seasons: number[];
  onChange: (filters: Filters) => void;
  labels: {
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
}

export function FiltersPanel({ filters, seasons, onChange, labels }: FiltersProps) {
  const handleInput = (key: keyof Filters, value: Filters[keyof Filters]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="panel filters">
      <div className="field">
        <label htmlFor="search">{labels.searchLabel}</label>
        <input
          id="search"
          type="text"
          placeholder={labels.searchPlaceholder}
          value={filters.search}
          onChange={(e) => handleInput('search', e.target.value)}
        />
      </div>

      <div className="field-group">
        <div className="field">
          <label htmlFor="season">{labels.seasonLabel}</label>
          <select
            id="season"
            value={filters.season}
            onChange={(e) =>
              handleInput('season', e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
          >
            <option value="all">{labels.seasonAll}</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {labels.seasonOption(season)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="team">{labels.teamLabel}</label>
          <select
            id="team"
            value={filters.team}
            onChange={(e) => handleInput('team', e.target.value as Filters['team'])}
          >
            {(['all', 'black', 'white', 'unknown'] as Filters['team'][]).map((team) => (
              <option key={team} value={team}>
                {labels.teamOptions[team]}
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
        {labels.onlyBooking}
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={filters.onlyTop7}
          onChange={(e) => handleInput('onlyTop7', e.target.checked)}
        />
        {labels.onlyTop7}
      </label>
    </div>
  );
}
