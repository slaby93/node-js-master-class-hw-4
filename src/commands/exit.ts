import { Command } from "../interfaces";


const command: Command = {
  key: 'exit',
  handler: async () => {
    process.exit(0)
  }
}

export default command