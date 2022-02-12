export interface Order {
  id: string;
  items: Item[],
  name: string,
  number: string,
  totals: any
}

export interface Item {
  id: string,
  productId: string,
  sku: string,
  name: string,
  quantity: string,
  price: string
}
