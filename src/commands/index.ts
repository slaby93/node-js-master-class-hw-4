import menu from './menu'
import order from './order'
import user from './user'
import help from './help'
import exit from './exit'
import { Command } from '../interfaces';

/**
 * Aggregates all commands
 */
const commands: Command[] = [
  menu,
  order,
  user,
  help,
  exit
]

export default commands