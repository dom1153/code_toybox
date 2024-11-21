import { Filter } from "lucide-react"

import { isDevEnv } from "@/lib/myutils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import SearchBoxFilter from "./search-box-filter"
import SortFilterPanel, { FilterProps } from "./sort-filter-panel"

const SortFilterBar: React.FC<FilterProps> = ({
  fullShipList,
  updateShipList,
}) => {
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
          className="w-max-[600px] max-h-dvh min-w-[450px] overflow-y-auto sm:w-[600px] sm:max-w-sm md:max-w-md"
        >
          {CustomDialogContent}
        </SheetContent>
      </Sheet>

      <SearchBoxFilter
        fullShipList={fullShipList}
        updateShipList={updateShipList}
      />
    </Card>
  )
}

export default SortFilterBar
