import { Router, Request, Response } from "express"
import QRCode from "qrcode"

import ShortURLsService from "../modules/shortURLs/shortURLsService"
import { IConfig } from "../util/config/loadConfig"

export default (router: Router, config: IConfig) => {
  const shortURLservice = new ShortURLsService(config)

  router.get("/shortURLs", (req: Request, res: Response) => {
    if (req.body.short) {
      const shortUrl = shortURLservice.getShortURL(req.body.short)

      if (!shortUrl) return res.sendStatus(404)

      res.json(shortUrl)
    } else {
      const shortURLs = shortURLservice.getShortURLs()

      res.json(shortURLs)
    }
  })

  router.post("/shortURLs", (req: Request, res: Response) => {
    const shortURL = shortURLservice.saveShortURL(req.body)

    res.json(shortURL)
  })

  router.get("/shortURLs/qrcode", (req: Request, res: Response) => {
    QRCode.toDataURL(req.body.short, (err, url) => {
      res.json(url)
    })
  })

  router.get("/:short", async (req: Request, res: Response) => {
    const domain = config.shortLinkDomain
    const shortUrl = shortURLservice.getShortURL(domain + req.params.short)
    if (!shortUrl) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.lastClickedAt = new Date()
    shortURLservice.saveShortURL(shortUrl)

    res.redirect(shortUrl.full)
  })
}
