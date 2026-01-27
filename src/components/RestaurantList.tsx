import { Restaurant } from '../types';

interface ListProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  labels: {
    empty: string;
    top7: string;
    season: (season: number) => string;
    team: (team: Restaurant['chef']['team']) => string;
  };
}

export function RestaurantList({ restaurants, selectedId, onSelect, labels }: ListProps) {
  if (!restaurants.length) {
    return <div className="panel list empty">{labels.empty}</div>;
  }

  return (
    <div className="panel list">
      {restaurants.map((item) => {
        const isActive = item.id === selectedId;
        return (
          <button
            key={item.id}
            className={`list-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <div className="list-title">{item.restaurant.name}</div>
            <div className="list-sub">{item.chef.name}</div>
            <div className="badges">
              {item.chef.isTop7 && <span className="badge primary">{labels.top7}</span>}
              {item.chef.season && (
                <span className="badge">{labels.season(item.chef.season)}</span>
              )}
              <span className={`badge team ${item.chef.team}`}>{labels.team(item.chef.team)}</span>
              {item.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="badge muted">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
