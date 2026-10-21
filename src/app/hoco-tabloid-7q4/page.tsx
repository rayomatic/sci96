import type { Metadata } from "next";
import { Contact, Footer, Fund, Header } from "../shared";
import { Tabloid } from "../tabloid";

// Unlisted preview of an alternate tabloid-style homepage.
export const metadata: Metadata = {
  title: "Sci'96 Rocks Hoco 100 · Kingston Bugle (tabloid preview)",
  robots: { index: false, follow: false },
};

export default function TabloidPreview() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Tabloid />
        <Fund />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
