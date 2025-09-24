export interface Product {
  _id: string;
  brand: string;
  modelName: string;
  color: string;
  stock: number;
  price: number;
  specialPrice?: number;
}

export interface User {
  email: string;
  premium_brands?: string[];
}
