import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import useFitText from "use-fit-text"

import { shipToUrl } from "@/lib/myutils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ShipCardProps {
  ship: Ship
}

interface AutoTextProps {
  text: string
}

const ShipCard: React.FC<ShipCardProps> = ({ ship }) => {
  // VVV optional; use truncation instead
  const AutoText: React.FC<AutoTextProps> = ({ text }) => {
    const { fontSize, ref } = useFitText()
    return (
      <div
        ref={ref}
        style={{ fontSize }}
        className="h-6 flex justify-center items-center"
      >
        <p style={{ whiteSpace: "nowrap" }} className="">
          {text}
        </p>
      </div>
    )
  }

  return (
    <>
      <div key={ship.id} className="">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* TODO: this needs to be a custom card class */}
              <Link href={shipToUrl(ship)}>
                <Card className="w-40">
                  {false && (
                    <div className="flex justify-center py-1 bg-blue-950">
                      <p>{ship.names.en}</p>
                    </div>
                  )}
                  {true && <AutoText text={ship.names.en} />}
                  <CardContent className="relative p-0">
                    {/* TODO: use wikiURL as fallback; need a way to check fs; remote routes */}
                    {/* Could also try remote, then update quality dynamically */}
                    {/* use 256 placeholder image in the future (static) or blurData */}
                    {/* https://nextjs.org/docs/app/api-reference/components/image */}
                    {/* <img src={ship.thumbnail} alt="Default" className="" /> */}
                    {/* Vercel images are lazy by default! 🙌 */}
                    <Image
                      src={`/thumbs/webp/${ship.id}.webp`}
                      // src={`/thumbs/webpSQ/${ship.id}.webp`}
                      alt={ship.names.en}
                      width={192}
                      height={256}
                    />
                    {false && (
                      <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
                        <p className="text-center">{ship.names.en}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="font-mono">
              <div className="">
                <p>id: {ship.id}</p>
                <p>hull: {ship.hullType}</p>
                <p>faction: {ship.nationality}</p>
                <p>rarity: {ship.rarity}</p>
                <p>class: {ship.class}</p>
                <p>retrofit: {ship.retrofit ? "y" : "n"}</p>
                <p>{ship.thumbnail}</p>
                <p>
                  skins:{" "}
                  {ship.skins.reduce((partialSum, i) => partialSum + 1, 0)}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

export default ShipCard
