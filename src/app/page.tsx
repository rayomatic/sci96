import { Contact, Footer, Fund, Header, Merch } from "./shared";
import { Tabloid } from "./tabloid";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Tabloid />
        <Merch />
        <Fund />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
