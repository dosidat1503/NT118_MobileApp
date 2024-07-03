export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type FindFilterAtHome = {
  name: string,
  list: [],
  propertyNameOfSlectedItem: string
}

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};

export type renderItemPostProp = {
  item: any,
  segment?: any,
}

export interface itemInfoPost {
  IS_SAVE: number;
  IS_LIKE: number;
  LIKE_QUANTITY: number;
  CONTENT: string;
  POST_ID: number;
  NAME: string;
  IMG_URL: string;
  USER_ID: number; 
  TIME: string; 
  id: any; 
  body: any; 
}