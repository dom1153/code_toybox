import { Ship } from "@azurapi/azurapi/build/types/ship"

// import axios from "axios"

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

// export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

// todo make a class shipUtils or something, whatever it is in js land
export function sortDefault(ships: Ship[]) {
  ships.sort((a: Ship, b: Ship) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  })
  return ships
}

export enum ShipSort {
  default,
}

export function searchShipList(
  ships: Ship[],
  text: string,
  options?: {
    hull?: string
    faction?: string
    rarity?: string
    availability?: string
    special?: string
    sort?: ShipSort
  }
) {
  const lowerText = text.toLowerCase()

  let list = ships.filter((i: Ship) =>
    i.names.en.toLowerCase().includes(lowerText)
  )

  return sortDefault(list)
}
