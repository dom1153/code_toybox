"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import axios from "axios"

import { shipToUrl } from "@/lib/myutils"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"

interface CommandMenuProps {}

const CommandMenu: React.FC<CommandMenuProps> = ({}) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [shipList, setShipList] = useState([] as Ship[])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  useEffect(() => {
    // todo store api results in a state for better between page results
    azurApiCall()
  }, [])

  const azurApiCall = useCallback(async () => {
    try {
      await axios
        .get(`/api/azur/test`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list
          setShipList(ships)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error("Callback: error!")
      console.log(error)
    } finally {
      // console.info("Callback: success!")
    }
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search ships...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {shipList.map((s, i) => {
            // TODO: memoize? ; performance is slow on dev
            return (
              <CommandItem
                key={s.id}
                onSelect={() => {
                  runCommand(() => router.push(shipToUrl(s)))
                }}
              >
                {s.names.en} ({s.hullType})
              </CommandItem>
            )
          })}

          {/* <CommandSeparator /> */}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
