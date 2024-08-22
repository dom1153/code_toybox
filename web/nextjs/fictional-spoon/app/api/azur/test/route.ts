import { NextResponse } from "next/server"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import azurapi, { checkUpdate } from "@/lib/azurapi"
import { isDevEnv } from "@/lib/myutils"

export async function GET() {
  if (isDevEnv) await checkUpdate()

  let ships: any[] = []
  ships = fooGetAll()
  ships = fooGetSome()
  // ships = fooGetShips()
  // ships = fooGetShipByName()

  // console.log("foo length:", ships.length)

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

function fooGetAll() {
  return azurapi.ships.raw
}

function fooGetSome() {
  return azurapi.ships.raw.filter((s) => s.rarity == "Normal")
}
