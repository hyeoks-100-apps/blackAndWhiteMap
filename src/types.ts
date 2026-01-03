export type Team = 'black' | 'white' | 'unknown';

export interface Chef {
  name: string;
  season?: number;
  team: Team;
  isTop7?: boolean;
}

export interface RestaurantInfo {
  name: string;
  category?: string[];
  address: string;
  lat: number;
  lng: number;
  naverPlaceUrl?: string;
  naverBookingUrl?: string;
  phone?: string;
  instagram?: string;
}

export interface Restaurant {
  id: string;
  chef: Chef;
  restaurant: RestaurantInfo;
  tags?: string[];
  updatedAt?: string;
}

export interface Filters {
  search: string;
  season: 'all' | number;
  team: 'all' | Team;
  onlyBooking: boolean;
  onlyTop7: boolean;
}
