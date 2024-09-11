import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import useFitText from "use-fit-text"

import { isDevEnv, shipToUrl } from "@/lib/myutils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ShipCardProps {
  ship: Ship
  square?: boolean
}

interface AutoTextProps {
  text: string
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, square }) => {
  // VVV optional; use truncation instead
  const AutoText: React.FC<AutoTextProps> = ({ text }) => {
    const { fontSize, ref } = useFitText()
    return (
      <div
        ref={ref}
        style={{ fontSize }}
        className="flex h-6 items-center justify-center"
      >
        <p style={{ whiteSpace: "nowrap" }} className="">
          {text}
        </p>
      </div>
    )
  }

  const ShipCardJsx = (
    <Link href={shipToUrl(ship)}>
      <Card>
        {false && (
          <div className="flex justify-center bg-blue-950 py-1">
            <p>{ship.names.en}</p>
          </div>
        )}
        {/* ... just trucate like how the wiki does */}
        {/* https://azurlane.koumakan.jp/wiki/List_of_Ships_by_Image */}
        {/* {true && <AutoText text={ship.names.en} />} */}
        <p className="overflow-hidden text-ellipsis text-nowrap p-1 text-center text-xs">
          {ship.names.en}
        </p>
        <CardContent className="relative p-0">
          {/* TODO: use wikiURL as fallback; need a way to check fs; remote routes */}
          {/* Could also try remote, then update quality dynamically */}
          {/* use 256 placeholder image in the future (static) or blurData */}
          {/* https://nextjs.org/docs/app/api-reference/components/image */}
          {/* <img src={ship.thumbnail} alt="Default" className="" /> */}
          {/* Vercel images are lazy by default! 🙌 */}
          {square ? (
            <Image
              src={`/assets/thumbs/webpSQ/${ship.id}.webp`}
              // src={`/thumbs/webpSQ/${ship.id}.webp`}
              alt={ship.names.en}
              width={192}
              height={192}
            />
          ) : (
            <Image
              src={`/assets/thumbs/webp/${ship.id}.webp`}
              // src={`/thumbs/webpSQ/${ship.id}.webp`}
              alt={ship.names.en}
              width={192}
              height={256}
            />
          )}
          {isDevEnv && (
            <>
              <p className="text-xs top-0 left-0 absolute bg-background">
                {ship.hullType}
              </p>
              <p className="text-xs bottom-0 right-0 absolute bg-background">
                {ship.nationality}
              </p>
            </>
          )}
          {false && (
            <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
              <p className="text-center">{ship.names.en}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  if (isDevEnv) {
    return (
      <>
        <div key={ship.id} className="">
          <Tooltip>
            <TooltipTrigger asChild>{ShipCardJsx}</TooltipTrigger>
            <TooltipContent className="font-mono">
              <div className="">
                <p>id: {ship.id}</p>
                <p>hullType: {ship.hullType}</p>
                <p>nationality: {ship.nationality}</p>
                <p>rarity: {ship.rarity}</p>
                <p>class: {ship.class}</p>
                <p>retrofit: {ship.retrofit ? "yes" : "no"}</p>
                {/* <p>{ship.thumbnail}</p> */}
                <p>
                  skins:{" "}
                  {ship.skins.reduce((partialSum, i) => partialSum + 1, 0)}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </>
    )
  } else {
    return ShipCardJsx
  }
}

export default ShipCard
