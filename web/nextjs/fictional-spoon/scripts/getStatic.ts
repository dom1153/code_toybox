import { existsSync, fstat, mkdir, stat, writeFile } from "fs"
import path from "path"
import { Main } from "next/document"
import { MedievalSharp } from "next/font/google"
import axios from "axios"
import sharp from "sharp"

// TODO fixme ; replace with new json
import azurapi, { checkUpdate } from "../lib/azurapi"

// https://byby.dev/node-download-imagehttps://byby.dev/node-download-image
async function download(url: string, filename: string) {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  console.log("trying to write file:", filename)
  writeFile(filename, response.data, (err) => {
    if (err) throw err
    console.log(`File '${filename}' downloaded.`)
  })
}

;(async function main() {
  console.log("Begin")

  const basedir = "./public/data"

  if (!existsSync(basedir)) {
    mkdir(basedir, {}, (err) => {
      if (err) throw err
    })
  }

  console.log("foreach loop")
  // TODO: trim down this data (5mb )
  await Promise.all([
    download(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json",
      `${basedir}/ships.json`
    ),
  ])

  console.log("end")

  //   process.exit()
})()
