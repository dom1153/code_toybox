"use client"

import React, { FormEvent, useEffect, useState } from "react"
import { all, create } from "mathjs"

import { ReadonlyInput } from "../myui/myinput"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

interface ScreenRatioToolProps {}

interface ScreenSize {
  w: number
  h: number
  label?: string
}
const pixels: ScreenSize[] = [
  { w: 2560, h: 1440 },
  { w: 1920, h: 1080 },
  { w: 2436, h: 1125, label: "iPhone X" },
  { w: 1280, h: 800 },
  { w: 1280, h: 720 },
  { w: 256, h: 256 },
  { w: 256, h: 192 },
]

const ScreenRatioTool: React.FC<ScreenRatioToolProps> = ({}) => {
  const [pWidth, setPWidth] = useState("2560")
  const [pHeight, setPHeight] = useState("1440")
  const [rWidth, setRWidth] = useState(16)
  const [rHeight, setRHeight] = useState(9)
  const [errorText, setErrorText] = useState("")
  const [math] = useState(create(all, { number: "Fraction" }))

  function isInputNumber(i: any) {
    return isNaN(i)
  }

  function printRatio(value: any) {
    return math.format(value, { fraction: "ratio" })
  }

  function doCalcuate() {
    // console.log("doCalculate")
    try {
      const width = parseInt(pWidth)
      const height = parseInt(pHeight)
      // console.log(width, height)
      const ratio = math.fraction(width, height)
      // console.log(printRatio(ratio), ratio.n, ratio.d)
      setRWidth(ratio.n)
      setRHeight(ratio.d)
      setErrorText("")
    } catch (error) {
      console.log(error)
      setErrorText(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    doCalcuate()
  }, [pWidth, pHeight, errorText])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Screen ratio calculation</CardTitle>
          <CardDescription>Get ratio'd</CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: ScrollList with common ratios */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 rounded-md">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {/* TODO: consider combobox (suggestions with user input) */}
                  <Label htmlFor="pWidth">Pixel Width</Label>
                  <Input
                    type="number"
                    id="pWidth"
                    placeholder="2560"
                    value={pWidth}
                    onInput={(e) => {
                      setPWidth(e.target.value)
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="pHeight">Pixel Height</Label>
                  <Input
                    type="number"
                    id="pHeight"
                    placeholder="1440"
                    value={pHeight}
                    onInput={(e) => {
                      setPHeight(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-5 rounded-md">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="rRatio">Ratio</Label>
                  <ReadonlyInput
                    type="text"
                    id="rRatio"
                    value={`${rWidth}:${rHeight}`}
                    disabled
                  />
                </div>
                {/* spacer */}
                <div className="w-full"></div>
              </div>
              {/* <div>
                <Button onClick={doCalcuate}>Calculate</Button>
              </div> */}
              {errorText && <p className="text-red-600">{errorText}</p>}
            </div>
            <ScrollArea className="h-72 rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Common Sizes
                </h4>
                {pixels.map((tag) => (
                  <div key={`${tag.h}x${tag.w}`}>
                    <Button
                      size={"sm"}
                      className="text-sm cursor-pointer"
                      onClick={() => {
                        setPWidth(tag.w)
                        setPHeight(tag.h)
                      }}
                    >
                      {tag.w} x {tag.h} {tag.label ? `(${tag?.label})` : ""}
                    </Button>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ScreenRatioTool
