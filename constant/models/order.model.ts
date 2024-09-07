export interface OrderModel{
  id: number //order pk
  table: number //table number pk
  price: number //total price
  items: number //count of all items
}
export interface OrderItemModel{
  id: number //order item pk
  orderId: number //order fk
  price: number //total items price
  quantity: number //count of items
}