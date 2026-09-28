import Image from "next/image";
import CountdownBanner from "./countdown";

const WHATSAPP_MAILTO =
  "mailto:Sci96reunion@gmail.com?subject=Add%20me%20to%20the%20Sci%20%2796%20WhatsApp%20group&body=Hi%21%20Please%20add%20me%20to%20the%20Sci%20%2796%20WhatsApp%20group.%0A%0AName%3A%20%0AWhatsApp%20mobile%20number%3A%20%0A";
const TICKETS_URL =
  "https://secureca.imodules.com/s/1922/20/interior.aspx?sid=1922&gid=2&pgid=4274&cid=7030&utm_source=hoco100-registration&utm_medium=landing-page&utm_campaign=2026-adv-hoco100&utm_content=encompass-registrationhoco100";
const DONATE_URL = "https://givetoqueens.ca/sc96fall26";
const PRESENTATION_URL =
  "https://click.advancement.queensu.ca/?qs=ABB7InYiOjEsImQiOjQ5NjB9AA0AAAAAAN0UIdh0cPy267noq4XiaX0I9tqx-fMUSUwpTFJaSisFJ0PLAjdWVtD1G9ziQPfWsQ91H2DvPZAZltBqI6CBNKLn-ni6capUrco";

const sections = [
  { id: "weekend", label: "The Weekend" },
  { id: "tickets", label: "Tickets" },
  { id: "stay", label: "Stay" },
  { id: "fund", label: "Forever Fund" },
  { id: "contact", label: "Stay in Touch" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <CountdownBanner />
        <Hero />
        <Weekend />
        <Tickets />
        <Stay />
        <Fund />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
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

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        <Image
          src="/crest.svg"
          alt="Sci'96 crest"
          width={180}
          height={234}
          priority
          className="h-auto w-32 sm:w-44"
        />
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--queens-red)]">
            Queen&rsquo;s Engineering · Sci&rsquo;96
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            30 years later. <span className="text-[var(--queens-blue)]">We&rsquo;re coming home.</span>
          </h1>
          <p className="max-w-xl text-balance text-lg text-zinc-600 sm:text-xl">
            Homecoming weekend in Kingston · <strong>October 16–18, 2026</strong>.
          </p>
        </div>
        <p className="inline-flex items-center gap-2 text-base font-semibold text-[var(--queens-blue)]">
          It&rsquo;s not too late!{" "}
          <span className="text-[var(--queens-red)]">Join ~150 of us for an amazing weekend</span>
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--queens-red)] px-7 text-base font-semibold text-white shadow-sm transition hover:bg-[#94000c]"
          >
            🎟️ Buy Homecoming tickets
          </a>
          <a
            href={WHATSAPP_MAILTO}
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-7 text-base font-semibold transition hover:border-black/40"
          >
            Join the WhatsApp group
          </a>
        </div>
        <p className="max-w-md text-sm text-zinc-500">
          The WhatsApp group is where it&rsquo;s all happening — updates, planning chatter, and
          reconnecting with classmates you haven&rsquo;t talked to in way too long. To keep the
          spammers out, we add people by email — just hit the button and send.
        </p>
      </div>
    </section>
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

function Weekend() {
  return (
    <section id="weekend" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="The Weekend" title="What&rsquo;s happening when">
          We&rsquo;ve organized a plan for nostalgia, celebration, and questionable decisions.
          Show up, see your people, eat carbs, smile for the camera.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          <DayCard
            day="Friday"
            date="October 16"
            items={[
              { time: "10:00 AM", title: "Line up for Ritual — seriously", body: "Students and alumni are in separate lines, and no guarantee of alumni “front of the line” privileges." },
              { time: "12:00 PM", title: "Ritual at Clark Hall Pub", body: "Where it all begins. Always." },
              { time: "3:00 PM", title: "Re-entry at Clark — or regroup at the Toucan", body: "If the line is too long, you know where to find us." },
              { time: "8:30 PM", title: "Trifac Mixer · The Merchant Tap House", href: "https://www.merchanttaphouse.com/", body: "ArtSci, Commerce, and Engineering all under one roof. Sold out — but doors open at 10:00 PM and you can still join as capacity opens up." },
            ]}
          />
          <DayCard
            day="Saturday"
            date="October 17"
            items={[
              { time: "8:30–11:30 AM", title: "Queen’s Pancake Breakfast", body: "Bookable time slot for the class year photo. Show up, eat carbs, smile for the camera." },
              { time: "~10:00 AM", title: "Pancake Kegger", body: "Student house on William near Division — a proud Sci’96 tradition." },
              { time: "Afternoon", title: "Football Game", body: "Your ticket is included in the reunion package. Sci’96 class block — show up and be loud." },
              { time: "7:00–10:00 PM", title: "University Club Mixer", body: "Finger foods, drinks, good company. The Dean is dropping by to say hi." },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function DayCard({
  day,
  date,
  items,
}: {
  day: string;
  date: string;
  items: { time: string; title: string; body: string; href?: string }[];
}) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-[var(--background)] p-7">
      <header className="flex items-baseline justify-between border-b border-black/10 pb-4">
        <h3 className="text-2xl font-bold text-[var(--queens-blue)]">{day}</h3>
        <p className="text-sm font-medium text-zinc-500">{date}</p>
      </header>
      <ol className="flex flex-col gap-5">
        {items.map((it) => (
          <li key={it.title} className="flex flex-col gap-1">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--queens-red)]">
              {it.time}
            </p>
            <p className="font-semibold">
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
                >
                  {it.title}
                </a>
              ) : (
                it.title
              )}
            </p>
            <p className="text-sm text-zinc-600">{it.body}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

function Tickets() {
  return (
    <section id="tickets" className="border-t border-black/10">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Tickets" title="Tickets are on sale now">
          Registration runs through the Queen&rsquo;s Homecoming portal — one checkout. The catch:
          you have to add each piece yourself, so make sure you select every Sci&rsquo;96 item
          below or you&rsquo;ll miss something. Two heads up: the <strong>Trifac Smoker is sold
          out</strong>, and <strong>the swag order deadline has passed</strong>.
        </SectionHeading>

        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--queens-red)] px-7 text-base font-semibold text-white shadow-sm transition hover:bg-[#94000c]"
        >
          🎟️ Register on the Queen&rsquo;s Homecoming portal
        </a>

        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--queens-red)]">
            When you register, select what&rsquo;s still available
          </p>
          <ol className="mt-5 flex flex-col gap-4">
            <CheckItem
              n="1"
              title="Friday Trifac Smoker"
              body="ArtSci, Commerce, and Engineering under one roof to kick off the weekend. Sold out — but doors open at 10:00 PM and you can still join as capacity opens up."
              badge="Sold out"
            />
            <CheckItem
              n="2"
              title={"Saturday Sci’96 Reunion Package"}
              body="Our class events for Saturday — the heart of the weekend."
            />
            <CheckItem
              n="3"
              title="Football ticket"
              body={"Queen’s has said they’ll seat the Sci’96 class together — grab a ticket and sit with your people."}
            />
            <CheckItem
              n="4"
              title="Swag"
              body="Hoodies, toques, and caps. Orders closed August 1 — if you got yours in before the deadline, you’re set."
              badge="Orders closed"
            />
          </ol>
        </div>

        <div className="mt-8 grid gap-6">
          <Stat label="Registration closes" value="October 1, 2026" />
        </div>
      </div>
    </section>
  );
}

function CheckItem({
  n,
  title,
  body,
  badge,
}: {
  n: string;
  title: string;
  body: string;
  badge?: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--queens-red)] text-sm font-bold text-white">
        {n}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">
          {title}
          {badge ? (
            <span className="ml-2 inline-flex items-center rounded-full bg-[var(--queens-red)] px-2.5 py-0.5 align-middle text-xs font-bold uppercase tracking-wider text-white">
              {badge}
            </span>
          ) : null}
        </p>
        <p className="text-sm text-zinc-600">{body}</p>
      </div>
    </li>
  );
}

function Stat({
  label,
  value,
  hint,
  urgent,
}: {
  label: string;
  value: string;
  hint?: string;
  urgent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        urgent ? "border-[var(--queens-red)]/40 bg-[var(--queens-red)]/5" : "border-black/10 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p
        className={`mt-2 text-xl font-bold ${
          urgent ? "text-[var(--queens-red)]" : "text-[var(--queens-blue)]"
        }`}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-sm text-zinc-600">{hint}</p> : null}
    </div>
  );
}

function Stay() {
  return (
    <section id="stay" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Stay" title="Where to crash">
          Downtown is mostly sold out, but our two reunion hotels at Hwy 401 / Division
          (across the parking lot from each other) are still worth calling. Easy carpool or
          party-bus territory.
        </SectionHeading>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-[var(--queens-gold)]/40 bg-[var(--queens-gold)]/10 p-4 text-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--queens-red)]">
            Heads up
          </span>
          <p className="text-zinc-700">
            The discounted group blocks have now <strong>closed</strong>, and unbooked rooms went
            back to the public. Both hotels may still have rooms at regular rates — call directly,
            mention the reunion, and ask if they&rsquo;ll honour the group rate. No promises, but
            it never hurts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <HotelCard
            name="Comfort Suites"
            roomType="Two-queen-bed rooms"
            rate="$209 / night"
            phone="343-477-0280"
            link="https://www.choicehotels.com/reservations/groups/AJ83J0"
            inventory="Group block closed — call for availability"
          />
          <HotelCard
            name="Quality Inn & Conference Centre"
            roomType="Two-queen-bed rooms"
            rate="$189 / night"
            phone="613-546-3661"
            link="https://www.choicehotels.com/reservations/groups/VX25T9"
            inventory="Group block closed — call for availability"
          />
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-black/10 bg-[var(--background)] p-6 text-sm text-zinc-700 sm:grid-cols-2">
          <Detail label="Group name (when calling)" value={'"Queen\u2019s Sci\u201996 30th Reunion"'} />
          <Detail label="Bookable nights" value="Thu Oct 15 – Sun Oct 18 (Thu also at group rate)" />
          <Detail label="Minimum stay" value="2 nights (Fri + Sat)" />
          <Detail label="Taxes & parking" value="Rates exclude 5% MAT + 13% HST · $6 / night parking" />
          <Detail label="Check-in / out" value="3:00 PM / 11:00 AM" />
          <Detail label="Cancellation" value="Free up to 7 days before arrival; after that, 1 night + tax" />
        </div>
      </div>
    </section>
  );
}

function HotelCard({
  name,
  roomType,
  rate,
  phone,
  link,
  inventory,
}: {
  name: string;
  roomType: string;
  rate: string;
  phone: string;
  link: string;
  inventory: string;
}) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-[var(--background)] p-7">
      <header className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[var(--queens-blue)]">{name}</h3>
        <p className="text-sm text-zinc-600">
          {roomType} · <span className="font-semibold text-[var(--queens-red)]">{inventory}</span>
        </p>
      </header>
      <p className="text-3xl font-bold tracking-tight">{rate}</p>
      <div className="flex flex-col gap-2 text-sm">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--queens-blue)] px-5 font-semibold text-white transition hover:bg-[#0a2143]"
        >
          Book online
        </a>
        <a
          href={`tel:${phone.replace(/-/g, "")}`}
          className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-5 font-semibold transition hover:border-black/40"
        >
          Call {phone}
        </a>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function Fund() {
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
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-3xl font-bold tracking-tight text-[var(--queens-blue)]">
              $125,000{" "}
              <span className="text-base font-semibold text-zinc-500">raised so far</span>
            </p>
            <p className="text-sm font-semibold text-zinc-600">
              Goal: $250,000 by the end of Homecoming weekend
            </p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
            <div className="h-full w-1/2 rounded-full bg-[var(--queens-red)]" />
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            We&rsquo;re halfway there. $250,000 establishes the fund as a permanent endowment —
            and the campaign continues with another $250,000 committed over the following five
            years. Every gift brings us closer to a lasting source of support for Smith
            Engineering students, for generations.
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

function Contact() {
  return (
    <section id="contact" className="border-t border-black/10 bg-[var(--queens-blue)] text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--queens-gold)]">
          Stay in Touch
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Got your tickets? Now stay in the loop
        </h2>
        <p className="max-w-xl text-lg text-white/80">
          Buying your tickets is the big one — but don&rsquo;t stop there. Get on the Sci&rsquo;96
          WhatsApp group, where the planning chatter, the updates, and the reconnecting actually
          happen.
        </p>
        <a
          href={WHATSAPP_MAILTO}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[var(--queens-blue)] shadow-sm transition hover:bg-[var(--queens-gold)]"
        >
          Join the WhatsApp group
        </a>
        <p className="text-sm text-white/60">
          The button opens an email to Sci96reunion@gmail.com — we add people by hand to keep
          the spammers out. This site is reaching most of the class, but not everyone — spread
          the word.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[var(--background)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>Built by the Sci&rsquo;96 reunion organizing committee.</p>
        <p className="font-semibold tracking-wider text-[var(--queens-red)]">Cha Gheill!</p>
      </div>
    </footer>
  );
}
