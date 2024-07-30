import { NextResponse } from "next/server"
import { AzurAPI } from "@azurapi/azurapi"
import { Ship } from "@azurapi/azurapi/build/types/ship"

export async function POST(request: NextResponse) {
  // TODO: api doesn't work the first time the server is started?
  // Try a global ('warms up' the api... or something)
  const client = new AzurAPI()
  let ids = [`001`, `002`, `003`]

  // for some reason the first time this api returns null objects...
  let err = !client.ships.id(`001`)

  let ships = []
  if (!err) {
    // ships = ids.map((i) => {
    //   let ship = client.ships.id(i) as Ship
    //   // console.log(ship, typeof ship)

    //   return ship
    // })

    // ships.name returns a list
    ships = client.ships.name(`Glowworm`)
    // console.log(ships)
  }

  //   console.log("======================")
  //   console.log("Got ship:")
  //   console.log(ship)
  //   console.log("======================")

  return NextResponse.json({ list: [...ships] })
}
