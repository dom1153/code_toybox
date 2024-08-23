import { existsSync, fstat, mkdir, stat, writeFile } from "fs"
import path from "path"
import { Main } from "next/document"
import { MedievalSharp } from "next/font/google"
import axios from "axios"
import sharp from "sharp"

// TODO fixme ; replace with new json
import azurapi, { checkUpdate } from "../lib/azurapi"

// https://byby.dev/node-download-imagehttps://byby.dev/node-download-image
async function downloadImage(
  url: string,
  dir: string,
  filename: string,
  ext: string
) {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  const lhs = `${dir}/${ext}/${filename}.${ext}`
  const rhs = `${dir}/webp/${filename}.webp`

  //   console.log("trying to write file:", filename)
  writeFile(lhs, response.data, (err) => {
    if (err) throw err
    console.log(`File '${filename}.${ext}' downloaded.`)
    sharp(lhs).webp({ quality: 80 }).toFile(rhs)
  })
}

;(async function main() {
  console.log("Begin")

  await Promise.all([checkUpdate()])

  const basedir = "./public/thumbs"
  const pngdir = `${basedir}/png`
  const webpdir = `${basedir}/webp`

  console.log("length", azurapi.ships.raw.length)

  if (!existsSync(pngdir)) {
    mkdir(pngdir, {}, (err) => {
      if (err) throw err
    })
  }
  if (!existsSync(webpdir)) {
    mkdir(webpdir, {}, (err) => {
      if (err) throw err
    })
  }

  function getExt(s: string) {
    return s.split(".").pop()
  }

  console.log("foreach time")
  await Promise.all(
    azurapi.ships.map(async (s, i) => {
      if (i > 3) return
      console.log(i)

      // console.log("destination:", destination)
      const result = await downloadImage(
        s.thumbnail,
        basedir,
        `${s.id}`,
        `${getExt(s.thumbnail)}`
      )
      return result
    })
  )

  console.log("end")

  //   process.exit()
})()
