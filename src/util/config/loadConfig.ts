export interface IConfig {
  port: number
  shortLinkDomain: string
}

export const loadConfig = (): IConfig => {
  const port = (process.env.PORT && +process.env.PORT) || 3000
  const shortLinkDomain = process.env.SHORT_LINK_DOMAIN || "http://localhost:3000/"

  return { port, shortLinkDomain }
}
