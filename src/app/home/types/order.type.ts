export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  amount: number;
}

export interface Order {
  userName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  total: number;
  userEmail: string;
  orderDetails: OrderItem[];
}

export interface OrderHistory {
  id: number;
  user_name: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  total: number;
  order_date: string;
}

export interface OrderHistoryProduct {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  amount: number;
}
