import { NextResponse } from "next/server"
import { AzurAPI } from "@azurapi/azurapi"

export async function POST(request: NextResponse) {
  const client = new AzurAPI()
  const ship = client.ships.id(`001`)

  //   console.log("======================")
  //   console.log("Got ship:")
  //   console.log(ship)
  //   console.log("======================")

  return NextResponse.json(ship)
}
