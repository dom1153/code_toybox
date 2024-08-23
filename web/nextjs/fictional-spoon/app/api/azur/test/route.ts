import { NextRequest, NextResponse } from "next/server"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import azurapi, { azurShipDB, checkUpdate } from "@/lib/azurapi"
import { isDevEnv } from "@/lib/myutils"

// Unhandled Rejection: Error: EROFS: read-only file system, (new AzurAPI())

export async function GET(request: NextRequest) {
  // if (isDevEnv) await checkUpdate()

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
  if (!isDevEnv) return
  let ids = [`001`, `002`, `003`]
  let x = ids.map((i) => {
    let ship = azurapi?.ships.id(i) as Ship
    return ship
  })
  return x ? x : []
}

function fooGetShipByName() {
  if (!isDevEnv) return
  let x = azurapi?.ships.name(`Glowworm`)
  return x ? x : []
}

function fooGetShipBySearchText(text: string) {
  const lowerText = text.toLowerCase()
  return azurShipDB()?.filter((i: Ship) =>
    i.names.en.toLowerCase().includes(lowerText)
  )
}

function fooGetAll() {
  // let db = azurapi?.ships.raw
  let db = azurShipDB()
  return db ? db : []
}

function fooGetSome() {
  // let db = azurapi?.ships.raw
  let db = azurShipDB()
  let x = db?.filter((s) => s.rarity == "Normal")
  return x ? x : []
}

function printJson(ships: any) {
  if (ships.length >= 1) {
    console.log(ships[0])
  }
}
