import type { Role } from "../content/experience";
import { BulletList, Callout, Disclosure, Eyebrow, FlowSteps, TagList } from "./ui-bits";

export function ExperienceCard({ role }: { role: Role }) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <Eyebrow>{role.period}</Eyebrow>
      <h3 className="mt-2 text-2xl font-semibold">{role.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {role.company}
        {role.subtitle ? ` · ${role.subtitle}` : ""}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{role.summary}</p>

      <div className="mt-6">
        <BulletList items={role.bullets} />
      </div>

      {role.flow ? (
        <div className="mt-6">
          <FlowSteps steps={role.flow} label="Progression" />
        </div>
      ) : null}

      <div className="mt-6">
        <Disclosure summary="Explore the detail">
          <div className="grid gap-6 sm:grid-cols-2">
            {role.detailGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold">{group.title}</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {role.notes?.length ? (
            <div className="mt-6 space-y-3">
              {role.notes.map((note) => (
                <Callout key={note.label} label={note.label}>
                  {note.body}
                </Callout>
              ))}
            </div>
          ) : null}
        </Disclosure>
      </div>

      <p className="mt-6 text-sm italic leading-relaxed text-muted-foreground">
        {role.progression}
      </p>

      <div className="mt-5">
        <TagList items={role.tags} />
      </div>
    </article>
  );
}
