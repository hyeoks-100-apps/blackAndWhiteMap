declare module 'leaflet' {
  export type LatLngExpression = [number, number] | { lat: number; lng: number };
  export type LatLngBoundsExpression = LatLngExpression[] | [LatLngExpression, LatLngExpression];

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    scrollWheelZoom?: boolean | string;
  }

  export interface TileLayerOptions {
    attribution?: string;
  }

  export class Map {
    constructor(element: any, options?: MapOptions);
    fitBounds(bounds: LatLngBoundsExpression, options?: any): void;
    flyTo(latlng: LatLngExpression, zoom?: number, options?: any): void;
  }

  export class Icon<T = any> {
    constructor(options?: T);
    options: T;
  }

  export class Marker<T = any> {
    constructor(latlng: LatLngExpression, options?: T);
    options: T;
  }

  export class TileLayer {
    constructor(urlTemplate: string, options?: TileLayerOptions);
  }

  export const CRS: any;

  const L: {
    Map: typeof Map;
    Icon: typeof Icon;
    Marker: typeof Marker;
    TileLayer: typeof TileLayer;
    CRS: typeof CRS;
  };

  export default L;
}
