import Server from './server'
import cli from './cli'
import config from './config'

// Main entry of aplpication
const app = {
  initialize: () => {
    // create and start server
    new Server()
      .start(config.PORT)
    // Crate and start CLI instance
    cli.start()
  }
}

app.initialize()
