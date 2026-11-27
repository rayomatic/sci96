import Image from "next/image";

const WHATSAPP_MAILTO =
  "mailto:Sci96reunion@gmail.com?subject=Add%20me%20to%20the%20Sci%20%2796%20WhatsApp%20group&body=Hi%21%20Please%20add%20me%20to%20the%20Sci%20%2796%20WhatsApp%20group.%0A%0AName%3A%20%0AWhatsApp%20mobile%20number%3A%20%0A";
const DONATE_URL = "https://givetoqueens.ca/sc96fall26";
const PRESENTATION_URL =
  "https://click.advancement.queensu.ca/?qs=ABB7InYiOjEsImQiOjQ5NjB9AA0AAAAAAN0UIdh0cPy267noq4XiaX0I9tqx-fMUSUwpTFJaSisFJ0PLAjdWVtD1G9ziQPfWsQ91H2DvPZAZltBqI6CBNKLn-ni6capUrco";

const MERCH_URL = "https://stainsbystudios.com/pages/30th-homecoming-reunion-merch";

const sections = [
  { id: "merch", label: "Merch" },
  { id: "fund", label: "Forever Fund" },
  { id: "contact", label: "Stay in Touch" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/crest.svg" alt="" width={28} height={36} priority />
          <span>Sci&rsquo;96</span>
        </a>
        <nav className="hidden gap-6 text-sm text-zinc-600 sm:flex">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-[var(--queens-red)]">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--queens-red)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children ? <p className="max-w-2xl text-lg text-zinc-600">{children}</p> : null}
    </div>
  );
}

export function Fund() {
  return (
    <section id="fund" className="border-t border-black/10">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Our Class Legacy" title="The Science &rsquo;96 Forever Fund">
          For most of us, it was what happened outside the classroom — the clubs, teams,
          and other extra-curricular organizations — that made Queen&rsquo;s unforgettable.
          The Science &rsquo;96 Forever Fund is our class legacy: a permanent endowment
          supporting student activities and programming in Smith Engineering, so today&rsquo;s
          students get the same transformative experiences we did.
        </SectionHeading>

        <Image
          src="/class-photo.jpg"
          alt="Sci'96 classmates in their Applied Science '96 jackets"
          width={1600}
          height={1110}
          className="mb-10 h-auto w-full rounded-2xl border border-black/10"
        />

        <div className="rounded-2xl border border-black/10 bg-white p-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Updated October 23, 2026
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-3xl font-bold tracking-tight text-[var(--queens-blue)]">
              $208,000{" "}
              <span className="text-base font-semibold text-zinc-500">raised so far</span>
            </p>
            <p className="text-sm font-semibold text-zinc-600">
              Goal: $250,000
            </p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
            <div className="h-full rounded-full bg-[var(--queens-red)]" style={{ width: "83%" }} />
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-3xl font-bold tracking-tight text-[var(--queens-blue)]">
              47{" "}
              <span className="text-base font-semibold text-zinc-500">classmates have given</span>
            </p>
            <p className="text-sm font-semibold text-zinc-600">Goal: 100 donors</p>
          </div>
          <div className="mt-4 flex items-center" role="img" aria-label="Participation: 47 of 100 donors">
            <div className="relative z-10 -mr-2 h-8 w-8 shrink-0 rounded-full border-4 border-white bg-[var(--queens-gold)] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
            <div className="relative h-4 flex-1 overflow-hidden rounded-r-full bg-black/10">
              <div className="h-full rounded-r-full bg-[var(--queens-gold)]" style={{ width: "47%" }} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, transparent 0, transparent calc(10% - 1px), rgba(0,0,0,0.18) calc(10% - 1px), rgba(0,0,0,0.18) 10%)",
                }}
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            We&rsquo;re more than 80% of the way there. $250,000 establishes the fund as a permanent endowment —
            and the campaign continues with another $250,000 committed over the following five
            years. Every gift brings us closer to a lasting source of support for Smith
            Engineering students, for generations. Gifts of any size count toward participation: help us reach 100 Sci&rsquo;96 donors.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--queens-red)] px-7 text-base font-semibold text-white shadow-sm transition hover:bg-[#94000c]"
            >
              Give now
            </a>
            <a
              href={PRESENTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-7 text-base font-semibold transition hover:border-black/40"
            >
              Learn more
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export function Merch() {
  return (
    <section id="merch" className="border-t border-black/10 bg-[var(--queens-gold)]">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--queens-red)]">
            Sci&rsquo;96 Merch · Orders open until Dec. 31
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--queens-blue)] sm:text-4xl">
            Missed the swag? Get it now.
          </h2>
          <p className="max-w-xl text-lg text-[var(--queens-blue)]/80">
            Hoodies, caps, toques and mugs from Homecoming are back for one more run, thanks to
            Eleanor Stainsby at Stainsby Studios. Everything ships in mid-to-late January.
          </p>
        </div>
        <a
          href={MERCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[var(--queens-blue)] px-7 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--queens-red)]"
        >
          Shop the merch
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-black/10 bg-[var(--queens-blue)] text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--queens-gold)]">
          Stay in Touch
        </p>
        <p className="max-w-xl text-lg text-white/80">
          The Sci&rsquo;96 WhatsApp group is where the photos, the stories, and the reconnecting
          carry on. If you&rsquo;re not in yet, now&rsquo;s the time.
        </p>
        <a
          href={WHATSAPP_MAILTO}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[var(--queens-blue)] shadow-sm transition hover:bg-[var(--queens-gold)]"
        >
          Join the WhatsApp group
        </a>
        <p className="text-sm text-white/60">
          The button opens an email to Sci96reunion@gmail.com — we add people by hand to keep
          the spammers out.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[var(--background)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>Built by the Sci&rsquo;96 reunion organizing committee.</p>
      </div>
    </footer>
  );
}
