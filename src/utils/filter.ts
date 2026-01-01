import { Filters, Restaurant } from '../types';

const normalize = (value: string) => value.trim().toLowerCase();

const matchesSearch = (restaurant: Restaurant, term: string) => {
  if (!term) return true;
  const haystack = [
    restaurant.chef.name,
    restaurant.restaurant.name,
    restaurant.restaurant.address,
    ...(restaurant.restaurant.category ?? []),
    ...(restaurant.tags ?? []),
  ]
    .filter(Boolean)
    .map((value) => normalize(String(value)))
    .join(' ');

  return haystack.includes(term);
};

export const filterRestaurants = (restaurants: Restaurant[], filters: Filters): Restaurant[] => {
  const searchTerm = normalize(filters.search);

  return restaurants.filter((item) => {
    if (filters.season !== 'all' && item.chef.season !== filters.season) {
      return false;
    }

    if (filters.team !== 'all' && item.chef.team !== filters.team) {
      return false;
    }

    if (filters.onlyBooking && !item.restaurant.naverBookingUrl) {
      return false;
    }

    if (!matchesSearch(item, searchTerm)) {
      return false;
    }

    return true;
  });
};
