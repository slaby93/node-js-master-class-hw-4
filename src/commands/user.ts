import { Command } from "../interfaces";
import User from "../models/User";
import db from "../utils/db";

/**
 * Order command - activates only on supported flags
 * For more info, read README.md
 */
const command: Command = {
  key: 'user',
  handler: async (args) => {
    // here we handle different flag cases
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
    if (!email) { return console.log('email cannot be empty!') }

    try {
      // list all users from User folder
      const users: User[] = await db.loadAll(User.FOLDER)
      if (!users) {
        return console.log(`There is no users in db!`)
      }
      // find specific user within users list
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
      // list all users from User folder
      const users: User[] = await db.loadAll(User.FOLDER)
      // Timestamp from 24 hours ago
      const wantedTimestamp = Date.now() - 1000 * 24 * 60 * 60
      // select users created within 24 hours and display them
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