/* eslint-disable @typescript-eslint/no-empty-function */
export class CartStoreItemMock {
  cart$: any;
  cart: any = {
    products: [
      { product: { id: 1 }, quantity: 2, amount: 200 },
      { product: { id: 2 }, quantity: 1, amount: 200 }
    ],
    totalAmount: 400,
    totalProducts: 3,
  };
  addProduct(): any {};
  removeProduct: any;
  decreaseProductQuantity: any;
  saveCart: any;
  clearCart: any;
}
