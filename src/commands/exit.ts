import { Command } from "../interfaces";

/**
 * When activated, stop server and close appliacation
 */
const command: Command = {
  key: 'exit',
  handler: async () => {
    process.exit(0)
  }
}

export default command