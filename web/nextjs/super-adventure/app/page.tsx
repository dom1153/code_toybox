import { promises as fs } from "fs"
import Link from "next/link"
import { AzurAPI } from "@azurapi/azurapi"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AzurApiTest from "@/components/other/azurapi-test"
import LogViewTest from "@/components/other/logview-test"
import TerminalUiTest from "@/components/other/terminal-ui-test"
import ScreenRatioTool from "@/components/tools/screen-ratio"

// const client = new AzurAPI();

export default async function IndexPage() {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8")
  const data = JSON.parse(file)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Super-Adventure
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Just demoing stuff
        </p>
        <Tabs defaultValue="screen-ratio" className="">
          <TabsList>
            <TabsTrigger value="screen-ratio">Screen Ratio</TabsTrigger>
            <TabsTrigger value="terminal-ui">Terminal UI</TabsTrigger>
            <TabsTrigger value="log-view">Log View</TabsTrigger>
            <TabsTrigger value="fs-test">fs</TabsTrigger>
            {false && <TabsTrigger value="azur-api">Azur API</TabsTrigger>}
          </TabsList>
          <TabsContent value="terminal-ui">
            <TerminalUiTest />
          </TabsContent>
          <TabsContent value="log-view">
            <LogViewTest />
          </TabsContent>
          <TabsContent value="azur-api">
            <AzurApiTest />
          </TabsContent>
          <TabsContent value="screen-ratio">
            <ScreenRatioTool />
          </TabsContent>
          <TabsContent value="fs-test">
            <div>
              <h1>{data.title}</h1>
              <p>{data.content}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {false && (
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
      )}
    </section>
  )
}
