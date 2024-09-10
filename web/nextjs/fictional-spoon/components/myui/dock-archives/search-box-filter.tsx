import { useState } from "react"
import { ArrowDownAZ, Check, ChevronDown, CircleX, Search } from "lucide-react"

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

import { InputCustom } from "../general/input-custom"
import FilterData from "./FilterData.json"

interface SearchBoxFilterProps {
  filterComboLeftAlign?: boolean
}

const SearchBoxFilter: React.FC<SearchBoxFilterProps> = ({
  filterComboLeftAlign,
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
          className="justify-between"
        >
          {valueCombo
            ? FilterData.sort.options.find(
                (sortLabel) => sortLabel.value === valueCombo
              )?.label
            : "Default"}
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0"
        align={filterComboLeftAlign ? "start" : "end"}
      >
        <Command className="">
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

  return (
    <>
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

      <div className="hidden items-center gap-2 sm:flex">
        <h1 className="hidden text-lg font-bold lg:inline">Sort</h1>

        {/* Sort Component */}
        <Card className="flex">
          <Button variant="ghost">
            <ArrowDownAZ />
          </Button>
          {CustomComboBox}
        </Card>
      </div>
    </>
  )
}

export default SearchBoxFilter
