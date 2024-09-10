import { useState } from "react"
import {
  ArrowDownAZ,
  Check,
  ChevronDown,
  CircleX,
  Filter,
  Search,
} from "lucide-react"

import { isDevEnv } from "@/lib/myutils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { InputCustom } from "../general/input-custom"
import FilterData from "./FilterData.json"
import SortFilterPanel, { FilterProps } from "./sort-filter-panel"

const SortFilterBar: React.FC<FilterProps> = ({
  fullShipList,
  updateShipList,
}) => {
  const [openCombo, setOpenCombo] = useState(false)
  const [valueCombo, setValueCombo] = useState("")

  const CustomComboBox = (
    <Popover open={openCombo} onOpenChange={setOpenCombo}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={openCombo}
          className="w-[200px] justify-between"
        >
          {valueCombo
            ? FilterData.sort.options.find(
                (sortLabel) => sortLabel.value === valueCombo
              )?.label
            : "Default"}
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {FilterData.sort.options.map((sort) => (
                <CommandItem
                  key={sort.value}
                  value={sort.value}
                  onSelect={(currentValue) => {
                    setValueCombo(
                      currentValue === valueCombo ? "" : currentValue
                    )
                    setOpenCombo(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      valueCombo === sort.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sort.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

  const CustomDialogTrigger = (
    <Button variant="outline" className="flex items-center gap-2 bg-background">
      <Filter /> Filter
    </Button>
  )

  const CustomDialogContent = (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="flex items-center gap-2">
          <Filter /> Filter
        </SheetTitle>
      </SheetHeader>

      <SortFilterPanel
        fullShipList={fullShipList}
        updateShipList={updateShipList}
        className={"rounded-none border-0"}
      />
    </>
  )

  return (
    <Card
      className={`sticky top-24 z-50 -mx-2 flex w-full gap-2 p-2 ${
        isDevEnv && "bg-blue-900 sm:bg-red-900"
      } lg:hidden ${isDevEnv && "md:bg-purple-900"}`}
    >
      {/* ^^^ navbar h-16 + padding ; the right height will be tricky */}
      {/* VVV Filter sheet */}
      <Sheet>
        <SheetTrigger asChild>{CustomDialogTrigger}</SheetTrigger>

        <SheetContent
          side="left"
          className="w-max-[600px] min-w-[450px] sm:w-[600px] sm:max-w-sm md:max-w-md"
        >
          {CustomDialogContent}
        </SheetContent>
      </Sheet>

      {/* Search Box */}
      <Card className="flex grow items-center justify-center gap-2 px-2">
        <Search />
        {/* VVV shadcn input but no border no rounding */}
        <InputCustom
          variant="ghost"
          className="grow"
          type="search"
          id="Search"
          placeholder="Search..."
        />

        <CircleX />
      </Card>

      {/* Sort Component */}
      <Card className="hidden sm:flex">
        <Button variant="ghost">
          <ArrowDownAZ />
        </Button>
        {CustomComboBox}
      </Card>
    </Card>
  )
}

export default SortFilterBar
