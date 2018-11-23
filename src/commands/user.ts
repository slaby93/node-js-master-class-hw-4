import { Command } from "../interfaces";
import User from "../models/User";
import db from "../utils/db";

const command: Command = {
  key: 'user',
  handler: async (args) => {
    args.forEach(({ flag, value }) => {
      switch (flag) {
        case 'email':
          command.handleEmailFlag(value)
          break
        case 'latest':
          command.handleLatestFlag()
          break
      }
    })
  },
  handleEmailFlag: async (email: string) => {
    try {
      const users: User[] = await db.loadAll(User.FOLDER)
      const foundUser: User = users.filter(user => user.email === email)[0]
      if (!foundUser) {
        return console.log('Can\'t find user with provided email!')
      }
      command.displayUser(foundUser)
      return
    } catch (error) {
      console.log('Can\'t find user with provided email!')
    }
  },
  handleLatestFlag: async () => {
    try {
      const users: User[] = await db.loadAll(User.FOLDER)
      const wantedTimestamp = Date.now() - 1000 * 24 * 60 * 60
      users.filter(user => user.createdAt > wantedTimestamp).forEach(user => command.displayUser(user))
    } catch {
      console.log('Error during listing users!')
    }
  },
  displayUser: (user: User) => {
    console.log(`
    {
      User
      Name: ${user.name}
      Email: ${user.email}
      Address: ${user.address}
      Id: ${user.id}
    }
  `)
  }
}

export default command