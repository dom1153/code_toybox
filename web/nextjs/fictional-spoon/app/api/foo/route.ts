import { NextResponse } from "next/server"
import { AzurAPI } from "@azurapi/azurapi"

export async function POST(request: NextResponse) {
  // TODO: api doesn't work the first time the server is started?
  // Try a global ('warms up' the api... or something)
  const client = new AzurAPI()
  let ids = [`001`, `002`, `003`]

  let err = false
  let ships = ids.map((i) => {
    let ship = client.ships.id(i)
    console.log(ship, typeof ship)

    // for some reason the first time this api returns null objects...
    if (!ship) {
      err = true
      return undefined
    }

    return ship
  })

  if (err) {
    ships = []
  }

  //   console.log("======================")
  //   console.log("Got ship:")
  //   console.log(ship)
  //   console.log("======================")

  return NextResponse.json({ list: [...ships] })
}
