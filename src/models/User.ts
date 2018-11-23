import db from './../utils/db'

class User {
  static FOLDER = 'user'

  name: string
  email: string
  address: string
  id: string
  password: string
  createdAt: number

  save = async () => {
    const serializedUser = User.serialize(this)
    await db.save(User.FOLDER, this.id, serializedUser)
  }

  update = async () => {
    const serializedUser = User.serialize(this)
    await db.update(User.FOLDER, this.id, serializedUser)  
  }

  load = async () => {
    const data: string = await db.load(User.FOLDER, this.id)
    const deserializedUser: User = User.deserialize(data)
    this.id = deserializedUser.id
    this.email = deserializedUser.email
    this.address = deserializedUser.address
    this.name = deserializedUser.name
    this.password = deserializedUser.password
    this.createdAt = deserializedUser.createdAt
  }

  delete = async () => {
    await db.delete(User.FOLDER, this.id)
  }

  private static serialize = (user: User): string => {
    const { name, email, address, id, password, createdAt } = user
    return JSON.stringify({
      name,
      email,
      address,
      id,
      password,
      createdAt
    })
  }

  private static deserialize = (input: string): User => {
    const parsedData: User = JSON.parse(input)
    const user = new User()
    user.id = parsedData.id
    user.email = parsedData.email
    user.address = parsedData.address
    user.name = parsedData.name
    user.password = parsedData.password
    user.createdAt = parsedData.createdAt
    return user
  }

}

export default User