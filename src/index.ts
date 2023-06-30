import bodyParser from "body-parser"
import express, { Express } from "express"
import dotenv from "dotenv"

import { loadConfig } from "./util/config/loadConfig"
import { registerRoutes } from "./route"

dotenv.config()
const config = loadConfig()

const app: Express = express()
const port: number = config.port

app.use(bodyParser.json())

registerRoutes(app, config)

app.listen(port, () => {
  console.log(`Server started at:${port}`)
})

export default app
