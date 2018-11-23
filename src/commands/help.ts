import { Command } from "../interfaces";


const command: Command = {
  help: {
    menu: 'List all available products in menu',
    'order --recent': 'View all the recent orders in the system (orders placed in the last 24 hours)',
    'order --id <order-id>': 'Lookup the details of a specific order by order ID',
    'user --latest': 'View all the users who have signed up in the last 24 hour',
    'user --id <user-id>': 'Lookup the details of a specific user by email address',
  },
  key: ['man', 'help'],
  handler: async () => {
    Object.entries(command.help).forEach(([key, value]) => {
      console.log(key, '<->', value)
    })
  }
}

export default command