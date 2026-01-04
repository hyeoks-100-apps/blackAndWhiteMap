import { useEffect, useState } from 'react';
import { Restaurant } from '../types';

interface RestaurantsState {
  data: Restaurant[];
  loading: boolean;
  error: string | null;
}

export const useRestaurants = () => {
  const [state, setState] = useState<RestaurantsState>({ data: [], loading: true, error: null });

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        const response = await fetch('./data/restaurants.json');
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.');
        }
        const json = (await response.json()) as Restaurant[];
        if (active) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setState({ data: [], loading: false, error: '데이터 로딩에 실패했습니다. 잠시 후 다시 시도해주세요.' });
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return state;
};
