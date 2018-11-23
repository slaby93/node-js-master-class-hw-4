import { Command } from "../interfaces";
import User from "../models/User";
import db from "../utils/db";
import Order from "../models/Order";

const command: Command = {
  key: 'order',
  handler: async (args) => {
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
  handleOrderIdFlag: async (orderId: string) => {
    try {
      const orders: Order[] = await db.loadAll(Order.FOLDER)
      if (!orders) {
        return console.log(`Didn\'t found any orders with ${orderId} id`)
      }
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
      const orders: Order[] = await db.loadAll(Order.FOLDER)
      if (!orders) {
        return console.log('Didn\'t found any orders in last 24 hours!')
      }
      const wantedTimestamp = Date.now() - 1000 * 24 * 60 * 60
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