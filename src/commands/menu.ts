import { Command } from "../interfaces";
import db from "../utils/db";
import { MENU_FOLDER, MENU_FILE } from "../routes/menu";

/**
 * List all available items in db
 */
const command: Command = {
  key: 'menu',
  handler: async () => {
    // load all items from db
    const menuItems = await db.load(MENU_FOLDER, MENU_FILE)
    if (!menuItems) {
      return console.log('Error while reading menu items!')
    }
    // parse items into JSON
    const { items }: { items: [{ name: string, price: string, id: string }] } = JSON.parse(menuItems)
    // write output to stdout
    items.forEach(({ name, price, id }) => {
      console.log(`Name: ${name}, Price: ${price}, id: ${id}`)
    })
  }
}

export default command