import type { Metadata } from "next";
import Image from "next/image";
import { Contact, Footer, Fund, Header } from "../shared";
import { Old_Standard_TT, Playfair_Display, UnifrakturMaguntia } from "next/font/google";

const blackletter = UnifrakturMaguntia({ weight: "400", subsets: ["latin"] });
const headline = Playfair_Display({ weight: ["700", "900"], subsets: ["latin"] });
const oldstyle = Old_Standard_TT({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"] });

// Unlisted: the original sepia Bugle front page, kept after the tabloid became the homepage.
export const metadata: Metadata = {
  title: "Sci'96 Rocks Hoco 100 · Kingston Bugle (sepia)",
  robots: { index: false, follow: false },
};

export default function BuglePreview() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Bugle />
        <Fund />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Bugle() {
  return (
    <section id="top" className="bg-[#e7dcc3] px-3 py-8 sm:px-6 sm:py-14">
      <article
        className={`${oldstyle.className} mx-auto max-w-5xl border border-[#1c1a17]/30 bg-[#f4ecd8] px-4 pt-4 pb-8 text-[#1c1a17] shadow-[0_18px_40px_-20px_rgba(60,40,10,0.55)] sm:px-10 sm:pt-6 sm:pb-12`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(ellipse at 85% 90%, rgba(120,90,40,0.12), transparent 55%)",
        }}
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#1c1a17] pb-1 text-[10px] uppercase tracking-[0.15em] sm:text-xs">
          <span>Vol. XXX · No. 100</span>
          <span className="hidden font-bold sm:inline">Homecoming Extra</span>
          <span>One Toonie</span>
        </div>

        <h1
          className={`${blackletter.className} py-2 text-center text-[13vw] leading-none sm:py-3 sm:text-8xl`}
        >
          The Kingston Bugle
        </h1>

        <div className="border-y-[3px] border-double border-[#1c1a17] py-1 text-center text-[10px] uppercase tracking-[0.15em] sm:flex sm:justify-between sm:text-xs">
          <span className="block">Kingston, Ontario</span>
          <span className="block">Tuesday, October 20, 2026</span>
          <a href="#fund" className="block underline-offset-2 hover:underline">
            Inside: The Forever Fund ↓
          </a>
        </div>

        <h2
          className={`${headline.className} mt-5 text-center text-[11.5vw] font-black uppercase leading-[0.95] tracking-tight sm:mt-7 sm:text-[5.75rem]`}
        >
          Sci&nbsp;&rsquo;96 Rocks Hoco&nbsp;100
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-base italic sm:mt-4 sm:text-xl">
          Class of &rsquo;96 returns in force for Queen&rsquo;s 100th Homecoming; gold jackets and
          foam fingers sighted across campus
        </p>

        <figure className="mt-6 sm:mt-8">
          <div className="relative overflow-hidden border border-[#1c1a17]">
            <Image
              src="/hoco100-class-photo.jpg"
              alt="Sci'96 classmates in gold jackets with foam 'Sci 96 Rocks Hoco' fingers, on the steps of Mitchell Hall at Homecoming 2026"
              width={2048}
              height={1362}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-auto w-full"
              style={{ filter: "grayscale(1) sepia(0.35) contrast(1.12) brightness(1.02)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-25"
              style={{
                backgroundImage: "radial-gradient(rgba(28,26,23,0.9) 0.6px, transparent 0.9px)",
                backgroundSize: "3px 3px",
              }}
            />
          </div>
          <figcaption className="mt-2 border-b border-[#1c1a17]/40 pb-2 text-xs sm:text-sm">
            <strong className="mr-1 uppercase tracking-wide">Strength in numbers.</strong> The class of
            Science &rsquo;96, thirty years on, at Mitchell Hall on Saturday, Oct. 17.
          </figcaption>
        </figure>

        <div className="mt-6 gap-8 text-justify text-[15px] leading-relaxed hyphens-auto sm:columns-3 sm:text-base">
          <p className="first-letter:float-left first-letter:mr-2 first-letter:font-bold first-letter:leading-[0.8] first-letter:text-6xl">
            <span className="mr-1 font-bold uppercase">Kingston —</span> Thirty years after they first
            pulled on the gold jackets, the engineers of Science &rsquo;96 descended on Queen&rsquo;s
            University for the 100th Homecoming, and by every available account, they rocked it.
          </p>
          <p className="mt-4">
            Witnesses report sightings at Clark Hall Pub, a Pancake Kegger on William Street, and a
            class photo at Mitchell Hall that called for a very wide lens and considerable
            patience. Foam fingers bearing the words &ldquo;Sci &rsquo;96 Rocks Hoco&rdquo; were
            raised throughout.
          </p>
          <p className="mt-4">
            The weekend is over, but the class&rsquo;s legacy outlasts the hangovers: the Science
            &rsquo;96 Forever Fund campaign continues.{" "}
            <a href="#fund" className="font-bold underline underline-offset-2">
              Full story below.
            </a>
          </p>
        </div>
      </article>
    </section>
  );
}
