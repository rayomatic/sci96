import { Contact, Footer, Fund, Header } from "./shared";
import { Tabloid } from "./tabloid";

export default function Home() {
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
