import { createFileRoute } from "@tanstack/react-router";

import { JourneyPortrait } from "../components/site";
import { Timeline } from "../components/Timeline";
import { careerLens, journeyNarrative, productPhilosophy } from "../content/profile";
import { seo } from "../lib/site";

const title = "Journey — Rickard Sörlin, AI Product Manager";
const description =
  "From customers' control cabinets to AI-enabled products — 25 years with the customer at the centre of every chapter, told as one continuous chronology.";


export const Route = createFileRoute("/journey")({
  head: () => seo({ title, description, path: "/journey", type: "article" }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <>
      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <p className="text-center font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-teal">
              The journey
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance-tight text-center text-4xl font-semibold text-night-foreground sm:text-[44px]">
              From control cabinets to AI products
            </h1>


            <div className="mt-12">
              <JourneyPortrait />
            </div>

            <div className="mt-12 space-y-5">
              <p className="text-[17.5px] font-semibold leading-[1.7] text-night-foreground">
                {journeyNarrative.lead}
              </p>
              {journeyNarrative.paragraphs.map((p) => (
                <p key={p} className="text-[17px] leading-[1.7] text-night-body">
                  {p}
                </p>
              ))}
              <p className="text-[17.5px] font-semibold leading-[1.7] text-night-foreground">
                {journeyNarrative.emphasis}
              </p>
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {careerLens.map((group) => (
                <section key={group.title}>
                  <h2 className="font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-teal">
                    {group.title}
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-night-border px-3 py-1 text-[13px] text-night-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-14 border-l-2 border-aurora-teal/60 pl-5">
              <h2 className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
                Product philosophy
              </h2>
              <p className="mt-2 text-[16px] leading-relaxed text-night-body">
                {productPhilosophy}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-[1560px] px-5 py-16 sm:py-20 min-[1100px]:px-[clamp(24px,4vw,72px)]">
          <Timeline />
        </div>
      </section>
    </>
  );
}
