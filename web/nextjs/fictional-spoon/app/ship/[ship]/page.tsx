// todo make this server rendered
// though; it may have to end up being client side

import Image from "next/image"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"
import { getShipByUrl } from "@/lib/serverutils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function Page({ params }: { params: { ship: string } }) {
  // yeah this is gonna be terrible for performance
  const data = await fetch(
    "https://raw.githubusercontent.com/dom1153/code_toybox/main/web/nextjs/archive/ships-details.json",
    { cache: isDevEnv ? "no-cache" : "default" }
  ).then((res) => res.json())

  const ship = getShipByUrl(data, params.ship)

  function ShipSkin({ ship }: { ship: Ship }) {
    return (
      <>
        <Card className=" flex justify-center">
          {/* TODO: resizable pange for ship image */}
          {/* TODO ship details + ship gallery experimentation */}
          {/* Consider a few experimental views (gallery embed; gallery top; left align) */}
          {/* Single staboard with collapsable */}

          {/* Experiment with tabs etc */}
          {/* <img src={ship.skins[0].image} alt="" /> */}
          {/* VVV what's the point of width and height if they're ignored... */}
          <Image
            src={ship.skins[0].image}
            alt={"skin"}
            width={500}
            height={500}
          />
        </Card>
      </>
    )
  }

  function ShipDetails({ ship }: { ship: Ship }) {
    return (
      <Card className="flex-1 p-2">
        <div className="flex items-center">
          <div>
            <Image
              src={ship.skins[0].chibi}
              alt={"chibi"}
              width={123}
              height={149}
              className=""
            />
          </div>

          <div className="flex-1">
            <CardTitle>{ship?.names.en}</CardTitle>
            <table className="flex-none">
              <tr>
                <td className="border-r pr-4">Class</td>
                <td className="pl-4">{ship.class}</td>
              </tr>
              <tr>
                <td>Rarity</td>
                <td className="pl-4">{ship.rarity}</td>
              </tr>
              <tr>
                <td>Hull</td>
                <td className="pl-4">{ship.hullType}</td>
              </tr>
            </table>
          </div>
        </div>
        {false && (
          <CardFooter>
            <a href={ship.wikiUrl} className="text-blue-600">
              Wiki URL
            </a>
          </CardFooter>
        )}
      </Card>
    )
  }

  if (ship) {
    return (
      <>
        <section className="container pt-6 md:py-10">
          <div className="flex flex-wrap items-start gap-2">
            <ShipSkin ship={ship} />

            <ShipDetails ship={ship} />
          </div>
        </section>
      </>
    )
  } else {
    return <p>Ship not found: {params.ship}</p>
  }
}
