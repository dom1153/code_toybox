import { existsSync, mkdir, writeFile } from "fs"
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

;(async function main() {
  console.log("Begin")

  await Promise.all([checkUpdate()])

  const basedir = "./public/thumbs"
  const pngdir = `${basedir}/png`
  const webpdir = `${basedir}/webp`
  const webpSQdir = `${basedir}/webpSQ`

  console.log("length", azurapi?.ships.raw.length)

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

  function getExt(s: string) {
    return s.split(".").pop()
  }

  console.log("foreach time")
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

  console.log("end")

  //   process.exit()
})()
