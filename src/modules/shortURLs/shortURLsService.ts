import shortid from "shortid"

import { IConfig } from "../../util/config/loadConfig"
import { ShortURLDto } from "./dto/shortURLDto"

class ShortURLsService {
  private shortURLs: ShortURLDto[] = []
  private shortLinkDomain: string

  constructor(config: IConfig) {
    this.shortLinkDomain = config.shortLinkDomain
  }

  getShortURLs(): ShortURLDto[] {
    return this.shortURLs
  }

  getShortURL(short: string): ShortURLDto | undefined {
    return this.shortURLs.find((item) => item.short === short)
  }

  saveShortURL(data: ShortURLDto): ShortURLDto | undefined {
    if (data.short) {
      const foundIndex = this.shortURLs.findIndex((item) => item.short === data.short)

      if (foundIndex === -1) return

      this.shortURLs[foundIndex] = data

      return data
    }

    // Check full url does already exist in db
    const shortUrRL = this.shortURLs.find((item) => item.full === data.full)
    if (shortUrRL) return shortUrRL

    // Create new short URL
    data.short = this.shortLinkDomain + shortid.generate()
    data.clicks = 0
    data.createdAt = new Date()

    this.shortURLs.push(data)

    return data
  }
}

export default ShortURLsService
