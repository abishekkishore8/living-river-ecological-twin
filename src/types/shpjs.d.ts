declare module 'shpjs' {
  export default function shp(buffer: ArrayBuffer | string): Promise<any>;
}
