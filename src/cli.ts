import * as readline from 'readline'
import * as events from 'events'
import commands from './commands'

namespace Cli {
  class _events extends events { }
  const channell = new _events()
  const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  })

  commands.forEach(({
    key,
    handler
  }) => {
    (Array.isArray(key) ? key : [key])
      .forEach(key => {
        channell.on(key, handler)
      })
  })


  // Splits main command and all arguments as
  // {command, arguments}
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

  cliInterface.on('line', input => {
    processInput(input)
    cliInterface.prompt()
  })

  cliInterface.on('close', () => {
    process.exit(0)
  })

  export const start = () => {
    cliInterface.prompt()
  }
}

export default Cli