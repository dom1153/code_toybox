import { NextRequest, NextResponse } from "next/server"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import azurapi, { checkUpdate } from "@/lib/azurapi"
import { isDevEnv } from "@/lib/myutils"

export async function GET(request: NextRequest) {
  await checkUpdate()

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("searchText")

  let ships: any[] = []
  ships = fooGetAll()
  // ships = fooGetSome()
  // ships = fooGetShips()
  // ships = fooGetShipByName()

  if (query) {
    ships = fooGetShipBySearchText(query)
  }

  // if (isDevEnv) printJson(ships)

  return NextResponse.json({ list: [...ships] })
}

function fooGetShips() {
  let ids = [`001`, `002`, `003`]
  return ids.map((i) => {
    let ship = azurapi.ships.id(i) as Ship
    return ship
  })
}

function fooGetShipByName() {
  return azurapi.ships.name(`Glowworm`)
}

function fooGetShipBySearchText(text: string) {
  let lowerText = text.toLowerCase()
  return azurapi.ships.raw.filter((i) =>
    i.names.en.toLowerCase().includes(text)
  )
}

function fooGetAll() {
  // console.log(azurapi.ships.raw.length)
  return azurapi.ships.raw
}

function fooGetSome() {
  return azurapi.ships.raw.filter((s) => s.rarity == "Normal")
}

function printJson(ships: any) {
  if (ships.length >= 1) {
    console.log(ships[0])
  }
}
