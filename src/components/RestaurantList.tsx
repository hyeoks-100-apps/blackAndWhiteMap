import { Restaurant } from '../types';

interface ListProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RestaurantList({ restaurants, selectedId, onSelect }: ListProps) {
  if (!restaurants.length) {
    return <div className="panel list empty">조건에 맞는 식당이 없습니다.</div>;
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
              {item.chef.isTop7 && (
                <span className="badge primary">TOP7</span>
              )}
              {item.chef.season && <span className="badge">시즌 {item.chef.season}</span>}
              <span className={`badge team ${item.chef.team}`}>팀 {item.chef.team}</span>
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
