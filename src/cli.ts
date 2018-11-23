import * as readline from 'readline'
import * as events from 'events'
import commands from './commands'

/**
 * Handles incomming CLI input,
 * distributes received input to proper handlers via event system
 */
namespace Cli {
  class _events extends events { }
  // Event channell. All events fly over this instance
  const channell = new _events()
  const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  })

  /**
   * Each command declares:
   *  key - on this string it will be actived
   *  handler - function that receives input and computes output
   * This function assigns given handler to each key so that when command is received, 
   * it can be hanlded by handler function
   * 
   */
  commands.forEach(({
    key,
    handler
  }) => {
    // key can be either string or string[]
    (Array.isArray(key) ? key : [key])
      .forEach(key => {
        channell.on(key, handler)
      })
  })


  // Splits main command and all arguments as
  // main command and all flags with values
  const processInput = (input: string) => {
    const [command, ...args] = input.trim().split('--').map(i => {
      const divided = i.trim().split(' ')
      return {
        flag: divided[0],
        value: divided[1]
      }
    })
    channell.emit(command.flag, args)
  }

  // handle new input on CLI
  cliInterface.on('line', input => {
    processInput(input)
    cliInterface.prompt()
  })

  // handle application exit
  cliInterface.on('close', () => {
    process.exit(0)
  })

  export const start = () => {
    cliInterface.prompt()
  }
}

export default Cli