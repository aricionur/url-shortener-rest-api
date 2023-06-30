import { Express, Router } from "express"

import { IConfig } from "../util/config/loadConfig"
import shortURLsRoutes from "./shortURLs"

const router = Router()

export const registerRoutes = (app: Express, config: IConfig) => {
  shortURLsRoutes(router, config)

  app.use("/", router)
}
