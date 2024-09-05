"use client"

import { useEffect, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"

import CardGallery from "./dock-archives/card-gallery"
import SortFilterPanel from "./dock-archives/sort-filter-panel"

interface AzurApiIndexProps {
  fullShipList: Ship[]
}

const fuseTextSearchOptions = {
  keys: ["names.en"],
  sortFn: (a: any, b: any) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  },
  includeScore: true,
}

// VVV nextjs call ; helps with force cache reset?
// @refresh reset
const DockArchivesIndex = ({ fullShipList }: AzurApiIndexProps) => {
  // TOOD is shiplist not stored between pages? is it possible to change that?
  const [shipList, setShipList] = useState([] as Ship[])

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
        {/* Flexbox split children into columns with gaps */}
        <div
          className={`flex flex-row gap-5 ${isDevEnv && "dark:bg-blue-900"}`}
        >
          <SortFilterPanel
            fullShipList={fullShipList}
            updateShipList={setShipList}
          />
          {/* fullship list should set shiplist instead null array logic here VVV */}
          <CardGallery
            shipList={shipList.length > 0 ? shipList : fullShipList}
          />
        </div>
      </section>
    </>
  )
}

export default DockArchivesIndex
