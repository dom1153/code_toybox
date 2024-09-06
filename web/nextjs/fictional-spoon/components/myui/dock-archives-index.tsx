"use client"

import { useEffect, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { ScrollArea } from "../ui/scroll-area"
import CardGallery from "./dock-archives/card-gallery"
import SortFilterBar from "./dock-archives/sort-filter-md-bar"
import SortFilterPanel from "./dock-archives/sort-filter-panel"

interface AzurApiIndexProps {
  fullShipList: Ship[]
}

// VVV nextjs call ; helps with force cache reset?
// @refresh reset
const DockArchivesIndex = ({ fullShipList }: AzurApiIndexProps) => {
  // TOOD is shiplist not stored between pages? is it possible to change that?
  const [shipList, setShipList] = useState([] as Ship[])
  // https://tailwindcss.com/docs/responsive-design ; 640 768 1024 1280
  // const isDesktop = useMediaQuery("(min-width: 1024px)")

  // // TODO: focus input bar via ref
  useEffect(() => {
    const bindKey = false
    if (bindKey) {
      const down = (e: KeyboardEvent) => {
        if ((e.key === "f" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return
          }

          e.preventDefault()
          // setOpen((open) => !open)
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }
  }, [])

  return (
    <>
      {/* Container add padding and fill screen */}
      <section
        className={`container grid items-center gap-6 pb-8 pt-6 md:py-10 ${
          isDevEnv && "dark:bg-gray-900"
        }`}
      >
        <SortFilterBar
          fullShipList={fullShipList}
          updateShipList={setShipList}
        />
        {/* Flexbox split children into columns with gaps */}
        <div
          className={`flex flex-row gap-5 ${isDevEnv && "dark:bg-blue-900"}`}
        >
          <div className={`hidden md:block ${isDevEnv && "bg-cyan-900"}`}>
            <SortFilterPanel
              fullShipList={fullShipList}
              updateShipList={setShipList}
              className="sticky top-24"
            />
          </div>

          {/* fullship list should set shiplist instead null array logic here VVV */}
          <ScrollArea className="w-full">
            <CardGallery
              shipList={shipList.length > 0 ? shipList : fullShipList}
            />
          </ScrollArea>
        </div>
      </section>
    </>
  )
}

export default DockArchivesIndex
