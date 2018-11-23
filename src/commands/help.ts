import { Command } from "../interfaces";

/**
 * Man ( shortcut fro manual ) - List all available commands.
 * For more info, go to README.md
 */
const command: Command = {
  help: {
    menu: 'List all available products in menu',
    'order --recent': 'View all the recent orders in the system (orders placed in the last 24 hours)',
    'order --id <order-id>': 'Lookup the details of a specific order by order ID',
    'user --latest': 'View all the users who have signed up in the last 24 hour',
    'user --id <user-id>': 'Lookup the details of a specific user by email address',
  },
  // activate on one of those commands
  key: ['man', 'help'],
  handler: async () => {
    Object.entries(command.help).forEach(([key, value]) => {
      console.log(key, '<->', value)
    })
  }
}

export default command