import * as readline from 'readline'
import * as events from 'events'

namespace Cli {
  class _events extends events { }
  const channell = new _events()
  const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  })

  const processInput = (input: string) => {
    channell.emit(input)
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