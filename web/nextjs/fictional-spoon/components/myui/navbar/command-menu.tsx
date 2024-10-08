"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { shipToUrl } from "@/lib/myutils"
import { cn } from "@/lib/utils"

import { Button } from "../../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"

interface CommandMenuProps {
  fullShipList: Ship[]
}

const CommandMenu: React.FC<CommandMenuProps> = ({ fullShipList }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
          {fullShipList.map((ship, index) => {
            // TODO: memoize? ; performance is slow on dev
            return (
              <CommandItem
                key={ship.id}
                onSelect={() => {
                  runCommand(() => router.push(shipToUrl(ship)))
                }}
                className="gap-2"
              >
                <Image
                  src={`/assets/thumbs/webpSQ/${ship.id}.webp`}
                  alt={ship.names.en}
                  width={24}
                  height={24}
                  className="rounded-full bg-blue-950"
                />
                <span>{`${ship.names.en} (${ship.hullType})`}</span>
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
