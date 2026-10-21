import Image from "next/image";
import { Anton, Oswald } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const oswald = Oswald({ weight: ["500", "700"], subsets: ["latin"] });

export function Tabloid() {
  return (
    <section id="top" className="bg-[var(--queens-blue)]/10 px-3 py-8 sm:px-6 sm:py-14">
      <article className={`${oswald.className} mx-auto max-w-5xl bg-white text-[var(--foreground)] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)]`}>
        <header className="flex items-stretch gap-3 bg-white p-3 sm:gap-5 sm:p-5">
          <div className="flex flex-1 items-center bg-[var(--queens-red)] px-3 py-2 sm:px-6 sm:py-3">
            <p
              className={`${anton.className} -skew-x-6 whitespace-nowrap text-[10vw] uppercase leading-none tracking-tight text-white sm:text-7xl`}
            >
              Kingston Bugle
            </p>
          </div>
          <div className="hidden w-48 flex-col justify-center gap-1 text-right text-xs font-bold uppercase leading-tight sm:flex">
            <span>Wednesday, October 21, 2026</span>
            <span className="text-[var(--queens-red)]">Homecoming Extra</span>
            <span>One Toonie</span>
          </div>
        </header>

        <div className="px-3 sm:px-5">
          <p className="bg-[var(--queens-blue)] px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--queens-gold)] sm:text-sm">
            Best crest ever returns to campus
          </p>

          <h1
            className={`${anton.className} mt-3 text-center text-[17vw] uppercase leading-[0.88] tracking-tight sm:text-[9.5rem]`}
          >
            Sci &rsquo;96 rocks <span className="text-[var(--queens-red)]">Hoco 100!</span>
          </h1>

          <figure className="relative mt-4">
            <Image
              src="/hoco100-class-photo.jpg"
              alt="Sci'96 classmates in gold jackets with foam 'Sci 96 Rocks Hoco' fingers, at Mitchell Hall during Homecoming 2026"
              width={2048}
              height={1362}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-auto w-full"
              style={{ filter: "saturate(1.15) contrast(1.05)" }}
            />
            <div className="absolute -top-3 right-2 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-[var(--queens-gold)] text-center text-[10px] font-bold uppercase leading-tight shadow-md ring-4 ring-white sm:-top-6 sm:right-6 sm:h-32 sm:w-32 sm:text-base">
              Exclusive
              <br />
              photo!
            </div>
            <figcaption className="absolute bottom-0 left-0 bg-[var(--queens-blue)]/85 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white sm:text-xs">
              Mitchell Hall · Saturday, Oct. 17
            </figcaption>
          </figure>

          <p className="mt-4 text-center text-xl font-bold uppercase leading-tight sm:text-3xl">
            Foam fingers and golden domes dominate campus
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 border-t-4 border-[var(--queens-blue)] text-sm font-bold uppercase leading-tight sm:grid-cols-3">
          <p className="border-b-2 border-black/15 p-3 sm:border-r-2 sm:border-b-0 sm:p-4">
            <span className="text-[var(--queens-red)]">Ritual:</span> Other classes squeezed out
          </p>
          <p className="border-b-2 border-black/15 p-3 sm:border-r-2 sm:border-b-0 sm:p-4">
            <span className="text-[var(--queens-red)]">Pancake Kegger:</span> Pancakes &amp; kegstands pair surprisingly well
          </p>
          <a href="#fund" className="block bg-[var(--queens-gold)] p-3 hover:bg-[#fec94a] sm:p-4">
            Forever Fund: Your class needs you ↓
          </a>
        </div>
      </article>
    </section>
  );
}
