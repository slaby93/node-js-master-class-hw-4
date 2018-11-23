import { Command } from "../interfaces";
import db from "../utils/db";
import { MENU_FOLDER, MENU_FILE } from "../routes/menu";

const command: Command = {
  key: 'menu',
  handler: async () => {
    const menuItems = await db.load(MENU_FOLDER, MENU_FILE)
    if (!menuItems) {
      return console.log('Error while reading menu items!')
    }
    const { items }: { items: [{ name: string, price: string, id: string }] } = JSON.parse(menuItems)
    items.forEach(({ name, price, id }) => {
      console.log(`Name: ${name}, Price: ${price}, id: ${id}`)
    })
  }
}

export default command