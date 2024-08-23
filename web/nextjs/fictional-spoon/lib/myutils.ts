import { Ship } from "@azurapi/azurapi/build/types/ship"

// === 'use client' side utils

export const isDevEnv = process.env.NODE_ENV !== "production"

function getWikiName(url: string) {
  let urlType = new URL(url)
  let cut = "/wiki/"
  return urlType.pathname.substring(cut.length)
}

export function shipToUrl(ship: Ship) {
  return `/ship/${getWikiName(ship.wikiUrl)}`
}
