export interface Product {
  item_name: string;
  item_id: number;
  gender_id: number;
  size: string;
  departName: string;
  intlDesc: string;
  material?: string;
  materialAr?: string;
  description?: string;
  descriptionAr?: string;
  long_desc: string;
  dept_id: string;
  msrp: string;
  rtp: string;
  color1_id: string;
  colorDesc: string;
  season_id: string;
  systemPrice: string;
  qty: number;
  slides?:any;
  colorCode?:string;
}

export interface Item {
  item_name: string;
  item_id: number;
  msrp: string;
  rtp: string;
  image:string;
}