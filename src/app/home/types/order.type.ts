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
