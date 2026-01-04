declare module 'leaflet' {
  export type LatLngBoundsExpression = any;

  export class Icon<T = any> {
    constructor(options?: T);
    options: T;
  }

  export class Marker<T = any> {
    constructor(...args: any[]);
    options: T;
  }

  const L: {
    Icon: typeof Icon;
    Marker: typeof Marker;
  };

  export default L;
}
