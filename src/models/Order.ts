import ShoppingCart from "./ShoppingCart";
import db from "../utils/db";

/**
 * Model for Order
 */
class Order {
  static FOLDER = 'order'

  id: string
  cart: ShoppingCart
  userId: string
  receivedPayment: boolean = false
  createdAt: number

  save = async () => {
    const serializedCart = Order.serialize(this)
    await db.save(Order.FOLDER, this.userId, serializedCart)
  }

  update = async () => {
    const serializedCart = Order.serialize(this)
    await db.update(Order.FOLDER, this.userId, serializedCart)
  }

  load = async () => {
    const data: string = await db.load(Order.FOLDER, this.userId)
    const deserializedOrder: Order = await Order.deserialize(data)
    this.id = deserializedOrder.id
    this.cart = deserializedOrder.cart
    this.userId = deserializedOrder.userId
    this.receivedPayment = deserializedOrder.receivedPayment
    this.createdAt = deserializedOrder.createdAt
  }

  delete = async () => {
    await db.delete(Order.FOLDER, this.userId)
  }

  private static serialize = (order: Order): string => {
    const { id, userId, cart, receivedPayment, createdAt } = order
    return JSON.stringify({
      id,
      userId,
      cart: cart.id,
      receivedPayment,
      createdAt
    })
  }

  private static deserialize = async (input: string): Promise<Order> => {
    const parsedData = JSON.parse(input)
    const order = new Order()
    order.userId = parsedData.userId
    order.id = parsedData.id
    order.cart = new ShoppingCart()
    order.cart.userId = order.userId
    order.receivedPayment = parsedData.receivedPayment
    order.createdAt = parsedData.createdAt
    await order.cart.load()
    return order
  }
}

export default Order