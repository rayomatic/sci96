import Image from "next/image";

const WHATSAPP_URL = "https://chat.whatsapp.com/L3dalZ1lxe0ISX6mQew8Ba?mode=gi_t";
const TICKETS_URL =
  "https://secureca.imodules.com/s/1922/20/interior.aspx?sid=1922&gid=2&pgid=4274&cid=7030&utm_source=hoco100-registration&utm_medium=landing-page&utm_campaign=2026-adv-hoco100&utm_content=encompass-registrationhoco100";

const sections = [
  { id: "weekend", label: "The Weekend" },
  { id: "tickets", label: "Tickets" },
  { id: "stay", label: "Stay" },
  { id: "fund", label: "The Fund" },
  { id: "contact", label: "Stay in Touch" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
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
            Homecoming weekend in Kingston · <strong>October 16–18, 2026</strong>. Nostalgia,
            celebration, and questionable decisions — just like the old days.
          </p>
        </div>
        <p className="inline-flex items-center gap-2 text-base font-semibold text-[var(--queens-blue)]">
          🎟️ Homecoming tickets are{" "}
          <span className="text-[var(--queens-red)]">on sale now</span>
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-7 text-base font-semibold transition hover:border-black/40"
          >
            Join the WhatsApp group
          </a>
        </div>
        <p className="max-w-md text-sm text-zinc-500">
          The WhatsApp group is where it&rsquo;s all happening — updates, planning chatter, and
          reconnecting with classmates you haven&rsquo;t talked to in way too long.
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
              { time: "12:00 PM", title: "Ritual at Clark Hall Pub", body: "Where it all begins. Always." },
              { time: "3:00 PM", title: "Re-entry at Clark — or regroup at the Toucan", body: "If the line is too long, you know where to find us." },
              { time: "Evening", title: "Trifac Mixer · The Tap House", body: "ArtSci, Commerce, and Engineering all under one roof." },
            ]}
          />
          <DayCard
            day="Saturday"
            date="October 17"
            items={[
              { time: "8:30–11:30 AM", title: "Queen’s Pancake Breakfast", body: "Bookable time slot for the class year photo. Show up, eat carbs, smile for the camera." },
              { time: "~10:00 AM", title: "Pancake Kegger", body: "Student house on William near Division — a proud Sci’96 tradition." },
              { time: "Afternoon", title: "Football Game", body: "Your ticket is included in the reunion package. Sci’96 class block — show up and be loud." },
              { time: "Evening", title: "University Club Mixer", body: "Finger foods, drinks, good company. The Dean is dropping by to say hi." },
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
  items: { time: string; title: string; body: string }[];
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
            <p className="font-semibold">{it.title}</p>
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
          you have to add each piece yourself, so make sure you select <strong>all four</strong>
          Sci&rsquo;96 items below or you&rsquo;ll miss something.
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
            When you register, select all four
          </p>
          <ol className="mt-5 flex flex-col gap-4">
            <CheckItem
              n="1"
              title="Friday Trifac Smoker"
              body="ArtSci, Commerce, and Engineering under one roof to kick off the weekend."
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
              body="Hoodies, toques, and caps. Heads up: order by August 1 (see below)."
            />
          </ol>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Stat
            label="Order swag by"
            value="August 1, 2026"
            hint={"The Queen’s flow may not flag this date — don’t leave it late."}
          />
          <Stat label="Registration closes" value="October 1, 2026" />
        </div>
      </div>
    </section>
  );
}

function CheckItem({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--queens-red)] text-sm font-bold text-white">
        {n}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-zinc-600">{body}</p>
      </div>
    </li>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-[var(--queens-blue)]">{value}</p>
      {hint ? <p className="mt-2 text-sm text-zinc-600">{hint}</p> : null}
    </div>
  );
}

function Stay() {
  return (
    <section id="stay" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Stay" title="Where to crash">
          Downtown is mostly sold out, but we have two hotels blocked at Hwy 401 / Division
          (across the parking lot from each other). Easy carpool or party-bus territory.
        </SectionHeading>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-[var(--queens-gold)]/40 bg-[var(--queens-gold)]/10 p-4 text-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--queens-red)]">
            Heads up
          </span>
          <p className="text-zinc-700">
            Both blocks are held until <strong>August 31, 2026</strong>. After that, rooms get
            released back to the public at whatever the going rate is. Book early.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <HotelCard
            name="Comfort Suites"
            roomType="Double-queen rooms"
            rate="$209 / night"
            phone="343-477-0280"
            link="https://www.choicehotels.com/reservations/groups/AJ83J0"
            inventory="10 rooms"
          />
          <HotelCard
            name="Quality Inn & Conference Centre"
            roomType="Single king rooms"
            rate="$189 / night"
            phone="613-546-3661"
            link="https://www.choicehotels.com/reservations/groups/VX25T9"
            inventory="10 rooms"
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
        <p className="text-sm text-zinc-600">{roomType} · {inventory} held</p>
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
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
        <SectionHeading eyebrow="The Fund" title="Something bigger than a weekend">
          A small group of classmates is pulling together a Sci&rsquo;96 class fund to leave a
          mark on Engineering at Queen&rsquo;s — separate from the reunion, but in the same
          spirit. More details coming soon.
        </SectionHeading>
        <p className="mx-auto max-w-2xl text-zinc-600">
          When you register you&rsquo;ll also see an option to donate to Queen&rsquo;s in the
          checkout flow. Our dedicated Sci&rsquo;96 fund is a separate effort — more on that soon.
        </p>
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
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[var(--queens-blue)] shadow-sm transition hover:bg-[var(--queens-gold)]"
        >
          Join the WhatsApp group
        </a>
        <p className="text-sm text-white/60">
          This site is reaching most of the class, but not everyone — spread the word.
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
