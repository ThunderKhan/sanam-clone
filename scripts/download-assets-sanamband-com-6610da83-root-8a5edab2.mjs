import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ORIGIN = 'https://www.sanamband.com'
const ROOT = 'public/sites/sanamband-com-6610da83/root-8a5edab2'
const SHARED = 'public/sites/sanamband-com-6610da83/shared'

const assets = [
  { url: '/HeroCarousel/TourBannerDesktop.png', out: `${ROOT}/images/hero/tour-banner-desktop.png` },
  { url: '/HeroCarousel/TourBannerMobile.png', out: `${ROOT}/images/hero/tour-banner-mobile.png` },
  { url: '/HeroCarousel/LatestMusicDesktop.jpg', out: `${ROOT}/images/hero/latest-music-desktop.jpg` },
  { url: '/HeroCarousel/LatestMusicMobile.png', out: `${ROOT}/images/hero/latest-music-mobile.png` },
  { url: '/HeroCarousel/MerchBannerDesktop.png', out: `${ROOT}/images/hero/merch-banner-desktop.png` },
  { url: '/HeroCarousel/MerchBannerMobile.png', out: `${ROOT}/images/hero/merch-banner-mobile.png` },
  { url: '/HeroCarousel/GroupBannerDesktop.png', out: `${ROOT}/images/hero/group-banner-desktop.png` },
  { url: '/HeroCarousel/groupBannerMobile.png', out: `${ROOT}/images/hero/group-banner-mobile.png` },
  { url: '/HeroCarousel/MusicBannerDesktop.png', out: `${ROOT}/images/hero/music-banner-desktop.png` },
  { url: '/HeroCarousel/MusicBannerMobile.png', out: `${ROOT}/images/hero/music-banner-mobile.png` },
  { url: '/faces/sanam00.png', out: `${ROOT}/images/faces/sanam00.png` },
  { url: '/faces/sanam0.jpg', out: `${ROOT}/images/faces/sanam0.jpg` },
  { url: '/faces/venky0.jpg', out: `${ROOT}/images/faces/venky0.jpg` },
  { url: '/faces/keshav0.jpg', out: `${ROOT}/images/faces/keshav0.jpg` },
  { url: '/faces/samar0.jpeg', out: `${ROOT}/images/faces/samar0.jpeg` },
  { url: '/faces/venky00.jpg', out: `${ROOT}/images/faces/venky00.jpg` },
  { url: '/faces/keshav00.jpg', out: `${ROOT}/images/faces/keshav00.jpg` },
  { url: '/faces/samar00.jpg', out: `${ROOT}/images/faces/samar00.jpg` },
  { url: '/logo.svg', out: `${ROOT}/images/logo.svg` },
]

async function run() {
  const results = []
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4)
    await Promise.all(
      batch.map(async (a) => {
        try {
          const res = await fetch(ORIGIN + a.url, {
            headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36' },
          })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const buf = Buffer.from(await res.arrayBuffer())
          await mkdir(join(a.out, '..'), { recursive: true })
          await writeFile(a.out, buf)
          results.push({ url: a.url, out: a.out, bytes: buf.length, ok: true })
        } catch (err) {
          results.push({ url: a.url, out: a.out, ok: false, error: String(err) })
        }
      }),
    )
  }
  await mkdir(SHARED, { recursive: true })
  const failed = results.filter((r) => !r.ok)
  console.log(`downloaded ${results.length - failed.length}/${results.length}`)
  for (const f of failed) console.log('FAILED', f.url, f.error)
}

await run()