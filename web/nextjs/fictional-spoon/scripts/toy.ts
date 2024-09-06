import {
  existsSync,
  fstat,
  mkdir,
  readFileSync,
  statSync,
  writeFile,
  writeFileSync,
} from "fs"
import { Ship } from "@azurapi/azurapi/build/types/ship"
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
  const rhsSq = `${dir}/webpSQ/${filename}.webp`

  //   console.log("trying to write file:", filename)
  writeFile(lhs, response.data, (err) => {
    if (err) throw err
    console.log(`File '${filename}.${ext}' downloaded.`)
    sharp(lhs)
      .resize({ width: 192, height: 256 })
      .webp({ quality: 80 })
      .toFile(rhs)
    sharp(lhs)
      .extract({ left: 0, top: 0, width: 192, height: 192 })
      .webp({ quality: 80 })
      .toFile(rhsSq)
    // 192 × 256
  })
}

function getFileSize(filename: string) {
  const stats = statSync(filename)
  var fileSizeInBytes = stats.size
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
  return fileSizeInMB
}

;(async function main() {
  console.log("Begin")

  await Promise.all([checkUpdate()])

  const basedir = "./public/thumbs"
  const pngdir = `${basedir}/png`
  const webpdir = `${basedir}/webp`
  const webpSQdir = `${basedir}/webpSQ`

  console.log("length", azurapi?.ships.raw.length)

  // make directories
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
  if (!existsSync(webpSQdir)) {
    mkdir(webpSQdir, {}, (err) => {
      if (err) throw err
    })
  }

  // util: get file extension from string
  function getExt(s: string) {
    return s.split(".").pop()
  }

  console.log("foreach time")

  const download = false
  if (download) {
    if (azurapi) {
      console.log("doing download")
      // TODO VVV make this sync...
      await Promise.all(
        azurapi.ships.map(async (s, i) => {
          const limiter = false
          if (limiter && i >= 3) {
            // console.log("ignoring ", i)
            return
          }
          // console.log(i)

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
    } else {
      console.error("azurapi is undefined")
    }
  } else {
    console.log("Skipping download")
  }

  const jsonTrim = true
  if (jsonTrim) {
    console.log("doing json trim")
    const starterFile = "./tmp/ships.json"
    const outputFile = "./tmp/ships-min.json"
    const outputFileDetails = "./tmp/ships-details.json"
    const data = readFileSync(starterFile, {}) as any
    const ships = JSON.parse(data) as Ship[]
    const size = getFileSize(starterFile)
    // console.log(ships[0])
    // console.log(size.toFixed(2), "MB")

    console.log(`trimming ${starterFile}...`)
    const newShips = ships.map((s) => {
      return {
        wikiUrl: s.wikiUrl,
        id: s.id,
        names: { en: s.names.en },
        class: s.class,
        nationality: s.nationality,
        hullType: s.hullType,
        rarity: s.rarity,
      }
    })
    // we 'could' write a json for each ship
    const newShipDetails = ships.map((s) => {
      return {
        wikiUrl: s.wikiUrl,
        id: s.id,
        names: { en: s.names.en },
        class: s.class,
        nationality: s.nationality,
        hullType: s.hullType,
        rarity: s.rarity,
        // stats: s.stats, // (0.62)
        // skills: s.skills, // (0.67)
        // construction: s.construction,
        // obtainedFrom: s.obtainedFrom,
        // misc: s.misc, // (0.18)
        skins: s.skins, // (1.42)
        // gallery: s.gallery, // (0.23)
      }
    })

    writeFileSync(outputFile, JSON.stringify(newShips), "utf8")
    const newSize = getFileSize(outputFile)
    console.log(`wrote file file ${outputFile} (${newSize} MB)`)

    writeFileSync(outputFileDetails, JSON.stringify(newShipDetails), "utf8")
    const newSizeDetails = getFileSize(outputFileDetails)
    console.log(`wrote file file ${outputFileDetails} (${newSizeDetails} MB)`)
  } else {
    console.log("skipping json trim")
  }

  console.log("end of function (main)")

  process.exit()
})()
