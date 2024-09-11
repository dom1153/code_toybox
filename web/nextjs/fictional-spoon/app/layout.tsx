import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
// @ts-ignore
import data from "@/public/json/ships-details.json"
import { Toaster } from "react-hot-toast"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { isDevEnv, sortDefault } from "@/lib/myutils"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // TODO atomize data; if possible
  // theme provider does something similar, probably
  // https://blog.logrocket.com/guide-state-management-next-js/
  const data = await fetch(
    "https://raw.githubusercontent.com/dom1153/code_toybox/main/web/nextjs/archive/ships-details.json",
    { cache: isDevEnv ? "no-cache" : "default" }
  )
    .then((res) => res.json())
    .then((responseJson) => sortDefault(responseJson))

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex h-screen max-h-screen flex-col">
              <SiteHeader fullShipList={sortDefault(data as any)} />
              <div className="flex flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
