"use client"

import { useEffect, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"

import ShipCardGallery from "./dock-archives/ship-card-gallery"
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
        className={`container flex flex-col items-center gap-6 pb-8 pt-6 md:py-10 ${
          isDevEnv && "dark:bg-gray-900"
        }`}
      >
        <SortFilterBar
          fullShipList={fullShipList}
          updateShipList={setShipList}
        />

        {/* Flexbox split children into columns with gaps (desktop view) */}
        <div
          className={`flex w-full grow flex-row gap-5 ${
            isDevEnv && "dark:bg-blue-900"
          }`}
        >
          <div className={`hidden lg:block ${isDevEnv && "bg-cyan-900"}`}>
            {/* sticky top-24 -> ok if small, bad if filter panel becomes larger */}
            <SortFilterPanel
              fullShipList={fullShipList}
              updateShipList={setShipList}
              className=""
            />
          </div>

          {/* fullship list should set shiplist instead null array logic here VVV */}
          <ShipCardGallery
            shipList={shipList.length > 0 ? shipList : fullShipList}
          />
        </div>
      </section>
    </>
  )
}

export default DockArchivesIndex
