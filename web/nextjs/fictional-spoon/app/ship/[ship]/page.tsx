// todo make this server rendered
// though; it may have to end up being client side

import Image from "next/image"

import { getShipByUrl } from "@/lib/serverutils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Page({ params }: { params: { ship: string } }) {
  //   VVV this is dumb, but yolo
  // checkUpdate()

  const ship = getShipByUrl(params.ship)

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex flex-col items-start gap-2">
          {ship !== undefined ? (
            <Card>
              <CardHeader>
                <CardTitle>{ship?.names.en}</CardTitle>
                <CardDescription>{ship?.nationality}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-96">
                  {/* <img src={ship.skins[0].image} alt="" /> */}
                  {/* VVV what's the point of width and height if they're ignored... */}
                  <Image
                    src={ship.skins[0].image}
                    alt={""}
                    width={500}
                    height={500}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <a href={ship.wikiUrl} className="text-blue-600">
                  Wiki URL
                </a>
              </CardFooter>
            </Card>
          ) : (
            <p>Ship not found: {params.ship}</p>
          )}
        </div>
      </section>
    </>
  )
}
