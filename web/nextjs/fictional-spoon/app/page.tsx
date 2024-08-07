import Link from "next/link"
import { AzurAPI } from "@azurapi/azurapi"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import AzurApiTest from "@/components/azurapi-test"
import LogViewTest from "@/components/logview-test"
import TerminalUiTest from "@/components/terminal-ui-test"

// const client = new AzurAPI();

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Foo Bar
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Just demoing stuff
        </p>
        {false && <TerminalUiTest />}
        {false && <LogViewTest />}
        {true && <AzurApiTest />}
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
