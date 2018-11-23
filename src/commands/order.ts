import { Command } from "../interfaces";
import db from "../utils/db";
import Order from "../models/Order";

/**
 * Order command - activates only on supported flags
 * For more info, read README.md 
 */
const command: Command = {
  key: 'order',
  handler: async (args) => {
    // here we handle different flag cases
    args.forEach(({ flag, value }) => {
      switch (flag) {
        case 'id':
          command.handleOrderIdFlag(value)
          break
        case 'latest':
          command.handleLatestFlag()
          break
      }
    })
  },
  /** 
   * When valid orderId is provided, finds order and returns it 
   */
  handleOrderIdFlag: async (orderId: string) => {
    if (!orderId) { return console.log('orderId cannot be empty!') }

    try {
      // load all order from Order folder
      const orders: Order[] = await db.loadAll(Order.FOLDER)
      if (!orders) {
        return console.log(`There is no orders in db!`)
      }
      // find specific order within order list
      const foundedOrder = orders.filter(order => order.id === orderId)[0]
      if (!foundedOrder) {
        return console.log(`Didn\'t found any orders with ${orderId} id`)
      }
      command.displayOrder(foundedOrder)
    } catch {
      console.log('Error during order lookup!')
    }
  },
  handleLatestFlag: async () => {
    try {
      // list all orders from Order folder
      const orders: Order[] = await db.loadAll(Order.FOLDER)
      if (!orders) {
        return console.log('Didn\'t found any orders in last 24 hours!')
      }
      // Timestamp from 24 hours ago
      const wantedTimestamp = Date.now() - 1000 * 24 * 60 * 60
      // select orders created within 24 hours and display them
      orders.filter(orders => orders.createdAt > wantedTimestamp).forEach(orders => command.displayOrder(orders))
    } catch {
      console.log('Error during offer listing!')
    }
  },
  displayOrder: (order: Order) => {
    console.log(`
    {
      Order:
      Id: ${order.id}
      Cart: ${order.cart}
    }
  `)
  }
}

export default command