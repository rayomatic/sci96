"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TABS = [
  "Registrant",
  "Guest",
  "Sci '96 Events",
  "Friday Events",
  "Saturday Events",
  "Sci '96 Swag",
  "Billing",
  "Review",
  "Finish",
] as const;

type Tab = (typeof TABS)[number];

const QUEENS_BLUE = "#11335d";
const EDITABLE_TABS: readonly Tab[] = ["Sci '96 Events", "Sci '96 Swag"];

const TAB_BY_SLUG: Record<string, Tab> = {
  events: "Sci '96 Events",
  package: "Sci '96 Events", // backward-compat alias for already-shared links
  swag: "Sci '96 Swag",
};
const SLUG_BY_TAB: Partial<Record<Tab, string>> = {
  "Sci '96 Events": "events",
  "Sci '96 Swag": "swag",
};

type PackageContent = {
  title: string;
  price: string;
  pricePer: string;
  intro: string;
  inclusions: { title: string; body: string }[];
  noteTitle: string;
  noteBody: string;
};

const DEFAULT_PACKAGE: PackageContent = {
  title: "Sci '96 Events",
  price: "$35",
  pricePer: "per person · same price for registrants and guests",
  intro:
    "The Sci '96 Events bundles the two class-organized events: the Pancake Kegger on Saturday morning and the University Club mixer on Saturday night.",
  inclusions: [
    {
      title: "Sci '96 Pancake Kegger · Saturday ~10 AM",
      body:
        "A proud Sci '96 tradition. Pancakes, kegs, and classmates packed into a student house on William St (near Division). Wander down after the Queen's Pancake Breakfast and class photo.",
    },
    {
      title: "Sci '96 University Club Mixer · Saturday 7 PM",
      body:
        "Saturday night at the University Club (168 Stuart) — the anchor of the weekend. Finger foods circulating, cash bar, and the Dean of Engineering stopping in to say hi. Same room we picked for the 20-year — easy to catch up with people you haven't seen in years.",
    },
  ],
  noteTitle: "Two more tickets to grab",
  noteBody:
    "The All Faculty '96 Smoker (Fri night) and the football game (Sat afternoon) are not included in this package — Queen's sells those separately. Add the Smoker ticket on the Friday Events tab and the football ticket on the Saturday Events tab.",
};

type SwagItemContent = {
  key: string;
  name: string;
  blurb: string;
  price: number;
  image: string;
  sizes: string[];
  sizing?: string[][];
  /** Overlay the Sci '96 crest on the product photo (mockup). cx/cy = center, w = width — all CSS lengths or percentages. `src` overrides the default /crest.svg (e.g. for the foam-yellow recolour). */
  crestOverlay?: { cx: string; cy: string; w: string; src?: string };
  /** Optional secondary image overlay (e.g. a "Homecoming 2026" ribbon under the crest on the hoodie). */
  bannerOverlay?: { cx: string; cy: string; w: string; src: string; alt?: string };
};

const DEFAULT_SWAG: SwagItemContent[] = [
  {
    key: "hoodie",
    name: "Champion S700 Hoodie",
    blurb:
      "Champion PowerBlend pullover hoodie in navy blue with the Sci '96 crest and a 'Homecoming 2026' discipline bar on the chest.",
    price: 45,
    image: "/swag/hoodie.png",
    sizes: ["S", "M", "L", "XL", "2XL ($50)", "3XL ($50)"],
    sizing: [
      ["SIZE", "S", "M", "L", "XL", "2XL", "3XL"],
      ["BODY WIDTH (in)", "20", "22", "24", "26", "28", "30"],
      ["BODY LENGTH (in)", "27", "28", "29", "30", "31", "32"],
      ["SLEEVE (CB, in)", "36", "36¾", "37½", "38¼", "39", "39⅜"],
    ],
  },
  {
    key: "toque",
    name: "Sportsman Pom Pom Toque",
    blurb:
      "Cuffed pom-pom toque in navy with the Sci '96 crest embroidered on the fold. Spot each other across Richardson Stadium.",
    price: 20,
    image: "/swag/toque.png",
    sizes: ["One size"],
  },
  {
    key: "beanie",
    name: "Cuffed Beanie (No Pom)",
    blurb:
      "Sportsman SP12 cuffed knit beanie in navy with the Sci '96 crest embroidered on the fold. Same warmth as the pom version, just lower-profile if poms aren't your thing.",
    price: 20,
    image: "/swag/beanie-no-pom.png",
    sizes: ["One size"],
  },
  {
    key: "cap-low",
    name: "Low-Profile Cap (Dad Hat)",
    blurb:
      "YP Classics 6245CM unstructured 6-panel dad hat in navy with buckle closure. Embroidered crest on the front, 'Homecoming 2026' on the back.",
    price: 25,
    image: "/swag/cap-low-profile.png",
    sizes: ["One size · adjustable buckle"],
  },
  {
    key: "cap-high",
    name: "High-Profile Cap (Snapback)",
    blurb:
      "YP Classics 5789M structured 5-panel snapback in navy. Taller crown for bigger heads. Embroidered crest on the front, 'Homecoming 2026' on the back.",
    price: 25,
    image: "/swag/cap-high-profile.png",
    sizes: ["One size · snapback"],
  },
  {
    key: "cap-holo-gold",
    name: "Holographic Gold Cap",
    blurb:
      "Iridescent gold PU-leather baseball cap with the Sci '96 crest embroidered on the front. The flashy option — sourced separately, supplier and final pricing TBC.",
    price: 35,
    image: "/swag/golden-dome.jpg",
    sizes: ["One size · adjustable"],
  },
];

/** Migrate stored swag items so anyone with old image paths or overlays still sees the new mockups. */
const SWAG_IMAGE_MIGRATIONS: Record<string, string> = {
  "/swag/hoodie.jpg": "/swag/hoodie.png",
  "/swag/cap-low-profile.svg": "/swag/cap-low-profile.png",
  "/swag/cap-high-profile.svg": "/swag/cap-high-profile.png",
  "/swag/cap-holo-gold.jpg": "/swag/golden-dome.jpg",
};
const SWAG_KEYS_WITH_BAKED_CREST = new Set([
  "hoodie",
  "toque",
  "beanie",
  "cap-low",
  "cap-high",
  "cap-holo-gold",
]);

function migrateStoredSwag(stored: SwagItemContent[]): SwagItemContent[] {
  return stored.map((item) => {
    const next: SwagItemContent = { ...item };
    const remapped = SWAG_IMAGE_MIGRATIONS[item.image];
    if (remapped) next.image = remapped;
    // Eleanor's new mockups bake the crest into the image; clear our overlays so they don't double-print.
    if (SWAG_KEYS_WITH_BAKED_CREST.has(item.key)) {
      delete next.crestOverlay;
      delete next.bannerOverlay;
    }
    return next;
  });
}

const STORAGE_KEY_PKG = "sci96-mockup-package-v9";
const STORAGE_KEY_SWAG = "sci96-mockup-swag-v22";

// Older storage keys that were bumped during early iteration. If a current-key entry is missing
// but a prior key has data, recover from the most recent prior key so organizers don't lose edits
// they made on prod under an older version.
const PRIOR_PKG_KEYS = Array.from({ length: 8 }, (_, i) => `sci96-mockup-package-v${8 - i}`);
const PRIOR_SWAG_KEYS = Array.from({ length: 21 }, (_, i) => `sci96-mockup-swag-v${21 - i}`);

/** Read a File as a data URL, downscale via canvas, and return the data URL. Keeps localStorage payloads small. */
function imageFileToDataUrl(file: File, maxDim = 800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Could not decode image"));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No 2D context"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        // Preserve PNG transparency for SVG-like sources, otherwise compress as JPEG.
        const isPng = file.type === "image/png" || file.type === "image/svg+xml";
        resolve(canvas.toDataURL(isPng ? "image/png" : "image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function useLocalState<T>(
  key: string,
  defaults: T,
  migrate?: (raw: T) => T,
  priorKeys: readonly string[] = [],
): [T, (next: T) => void, () => void] {
  const [value, setValue] = useState<T>(defaults);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      let raw = window.localStorage.getItem(key);
      let recoveredFromKey: string | null = null;
      if (!raw) {
        // Fall back to the newest prior key that still has data — recovers edits made under
        // an older storage version that got bumped during iteration.
        for (const priorKey of priorKeys) {
          const priorRaw = window.localStorage.getItem(priorKey);
          if (priorRaw) {
            raw = priorRaw;
            recoveredFromKey = priorKey;
            break;
          }
        }
      }
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        const final = migrate ? migrate(parsed) : parsed;
        setValue(final);
        if (migrate || recoveredFromKey) {
          try {
            window.localStorage.setItem(key, JSON.stringify(final));
            if (recoveredFromKey) window.localStorage.removeItem(recoveredFromKey);
          } catch {}
        }
      }
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = (next: T) => {
    setValue(next);
    if (hydrated) {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    }
  };
  const reset = () => {
    setValue(defaults);
    try {
      window.localStorage.removeItem(key);
    } catch {}
  };
  return [value, set, reset];
}

export default function TicketingMockup() {
  const [tab, setTabState] = useState<Tab>("Sci '96 Events");
  const [editMode, setEditMode] = useState(false);
  const [pkg, setPkg, resetPkg] = useLocalState<PackageContent>(
    STORAGE_KEY_PKG,
    DEFAULT_PACKAGE,
    undefined,
    PRIOR_PKG_KEYS,
  );
  const [swag, setSwag, resetSwag] = useLocalState<SwagItemContent[]>(
    STORAGE_KEY_SWAG,
    DEFAULT_SWAG,
    migrateStoredSwag,
    PRIOR_SWAG_KEYS,
  );

  // Sync state ← URL on mount and on browser back/forward.
  useEffect(() => {
    const sync = () => {
      const slug = new URLSearchParams(window.location.search).get("tab");
      if (slug && TAB_BY_SLUG[slug]) setTabState(TAB_BY_SLUG[slug]);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // Wrapper that also writes the URL so any tab is shareable as ?tab=package | ?tab=swag.
  const setTab = (next: Tab) => {
    setTabState(next);
    const slug = SLUG_BY_TAB[next];
    if (slug && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", slug);
      window.history.replaceState({}, "", url);
    }
  };

  const onResetAll = () => {
    if (window.confirm("Reset Package and Swag content to defaults?")) {
      resetPkg();
      resetSwag();
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <TopBar />
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-24">
        <div className="mb-4 flex items-center justify-between gap-3">
          <MockupBanner />
        </div>
        <EditToolbar editMode={editMode} setEditMode={setEditMode} onResetAll={onResetAll} />
        <Tabs active={tab} onChange={setTab} />
        <div className="mt-8">
          {tab === "Registrant" && <RegistrantPanel />}
          {tab === "Guest" && <GuestPanel />}
          {tab === "Sci '96 Events" && (
            <PackagePanel content={pkg} setContent={setPkg} editMode={editMode} />
          )}
          {tab === "Friday Events" && <FridayPanel />}
          {tab === "Saturday Events" && <SaturdayPanel />}
          {tab === "Sci '96 Swag" && (
            <SwagPanel items={swag} setItems={setSwag} editMode={editMode} />
          )}
          {tab === "Billing" && <BillingPanel />}
          {tab === "Review" && <ReviewPanel />}
          {tab === "Finish" && <FinishPanel />}
        </div>
      </div>
    </div>
  );
}

function EditToolbar({
  editMode,
  setEditMode,
  onResetAll,
}: {
  editMode: boolean;
  setEditMode: (b: boolean) => void;
  onResetAll: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded border border-black/10 bg-zinc-50 px-4 py-2 text-sm">
      <div className="text-zinc-600">
        {editMode ? (
          <span>
            <strong className="text-amber-700">Edit mode on.</strong> Changes save to your browser only.
          </span>
        ) : (
          <span>Click <strong>Edit content</strong> to tweak prices, copy, or items in the Package and Swag tabs.</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {editMode && (
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex h-9 items-center rounded border border-black/15 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:border-black/40"
          >
            Reset to defaults
          </button>
        )}
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={
            "inline-flex h-9 items-center rounded px-3 text-xs font-semibold transition " +
            (editMode
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "border border-[color:var(--queens-blue,#11335d)] text-[color:var(--queens-blue,#11335d)] hover:bg-[color:var(--queens-blue,#11335d)] hover:text-white")
          }
        >
          {editMode ? "Done editing" : "✎ Edit content"}
        </button>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="border-b border-black/10" style={{ backgroundColor: QUEENS_BLUE }}>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-3 text-white">
        <Image src="/crest.svg" alt="" width={28} height={36} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">Queen&rsquo;s Homecoming · Reunion Registration</span>
          <span className="text-xs text-white/70">Sci &rsquo;96 — 30th Reunion · October 16–18, 2026</span>
        </div>
      </div>
    </div>
  );
}

function MockupBanner() {
  return (
    <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Mockup only.</strong> This page exists to illustrate the proposed structure for the Queen&rsquo;s
      ticketing portal — nothing here charges or saves anything. For organizer review.
    </div>
  );
}

function Tabs({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="flex flex-wrap items-center gap-x-0 gap-y-2 border-b border-black/10">
      {TABS.map((t, i) => {
        const isActive = active === t;
        const isEditable = EDITABLE_TABS.includes(t);
        return (
          <div key={t} className="flex items-center">
            {i > 0 && <span className="mx-1 text-black/15">|</span>}
            <button
              type="button"
              disabled={!isEditable}
              aria-disabled={!isEditable}
              title={isEditable ? undefined : "Mockup: only Sci '96 Events and Sci '96 Swag are interactive"}
              onClick={() => isEditable && onChange(t)}
              className={
                "px-3 py-3 text-sm transition " +
                (isActive
                  ? "font-semibold text-[color:var(--queens-blue,#11335d)]"
                  : isEditable
                    ? "text-zinc-700 hover:text-zinc-900"
                    : "cursor-not-allowed text-zinc-400")
              }
              style={isActive ? { boxShadow: `inset 0 -3px 0 0 ${QUEENS_BLUE}` } : undefined}
            >
              {t}
            </button>
          </div>
        );
      })}
    </nav>
  );
}

function PanelHeading({ title }: { title: string }) {
  return (
    <header
      className="mb-6 rounded-sm px-5 py-3 text-lg font-semibold text-white"
      style={{ backgroundColor: QUEENS_BLUE }}
    >
      {title}
    </header>
  );
}

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-zinc-800">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 rounded border border-black/20 bg-white px-3 text-sm outline-none focus:border-[color:var(--queens-blue,#11335d)] focus:ring-2 focus:ring-[color:var(--queens-blue,#11335d)]/20"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-10 rounded border border-black/20 bg-white px-3 text-sm outline-none focus:border-[color:var(--queens-blue,#11335d)] focus:ring-2 focus:ring-[color:var(--queens-blue,#11335d)]/20"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="rounded border border-black/20 bg-white p-3 text-sm outline-none focus:border-[color:var(--queens-blue,#11335d)] focus:ring-2 focus:ring-[color:var(--queens-blue,#11335d)]/20"
    />
  );
}

function Checkbox({ label, hint }: { label: string; hint?: string }) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input type="checkbox" className="mt-1" />
      <span>
        <span className="font-medium">{label}</span>
        {hint && <span className="ml-1 text-zinc-500">— {hint}</span>}
      </span>
    </label>
  );
}

function RegistrantPanel() {
  return (
    <section>
      <PanelHeading title="Registrant Information" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required>
          <TextInput placeholder="Jane" />
        </Field>
        <Field label="Last name" required>
          <TextInput placeholder="Doe" />
        </Field>
        <Field label="Maiden / former last name (if different)">
          <TextInput />
        </Field>
        <Field label="Email" required>
          <TextInput type="email" placeholder="you@example.com" />
        </Field>
        <Field label="Mobile number">
          <TextInput type="tel" placeholder="(555) 555-5555" />
        </Field>
        <Field label="City of residence">
          <TextInput placeholder="Toronto, ON" />
        </Field>
        <Field label="Were you a member of Sci '96?" required>
          <Select defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>Yes — Sci &rsquo;96 graduate</option>
            <option>Sci &rsquo;96 (left before grad / different year)</option>
            <option>No — but invited as a guest</option>
          </Select>
        </Field>
        <Field label="Discipline">
          <Select defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {[
              "Chemical",
              "Civil",
              "Computing & Electrical",
              "Electrical",
              "Engineering Chemistry",
              "Engineering Physics",
              "Geological",
              "Mathematics & Engineering",
              "Mechanical",
              "Mining",
              "Other",
            ].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
        </Field>
        <Field label="Dietary restrictions / allergies" hint="Used for the Sat night University Club mixer.">
          <TextInput placeholder="e.g. vegetarian, gluten-free, nut allergy" />
        </Field>
        <Field label="Accessibility needs">
          <TextInput />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Checkbox
          label="I'd like to be listed in the Sci '96 attendee directory shared with classmates."
          hint="Just name + city, never email."
        />
        <Checkbox label="Please add me to the Sci '96 community WhatsApp group." />
      </div>
    </section>
  );
}

function GuestPanel() {
  return (
    <section>
      <PanelHeading title="Guest Information" />
      <p className="mb-6 text-sm text-zinc-600">
        Bringing a partner, spouse, or other guest? Add their details here. You can register up to 2 guests on
        one ticket package; the second guest is added at the bottom.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Guest first name">
          <TextInput />
        </Field>
        <Field label="Guest last name">
          <TextInput />
        </Field>
        <Field label="Relationship">
          <Select defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>Spouse / partner</option>
            <option>Family member</option>
            <option>Friend</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Dietary restrictions / allergies">
          <TextInput />
        </Field>
      </div>

      <div className="mt-6 rounded border border-dashed border-black/15 p-4 text-sm text-zinc-600">
        <strong>Note:</strong> Guest packages are priced separately from registrant packages. See the{" "}
        <em>Sci &rsquo;96 Package</em> tab for pricing.
      </div>
    </section>
  );
}

function EditableText({
  value,
  onChange,
  editMode,
  className,
  multiline,
  placeholder,
  as: Tag = "span",
}: {
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: "span" | "p" | "h3" | "strong";
}) {
  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={"w-full rounded border border-amber-400 bg-amber-50/40 p-2 outline-none focus:bg-white " + (className ?? "")}
      />
    );
  }
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={"w-full rounded border border-amber-400 bg-amber-50/40 px-2 py-1 outline-none focus:bg-white " + (className ?? "")}
    />
  );
}

function PackagePanel({
  content,
  setContent,
  editMode,
}: {
  content: PackageContent;
  setContent: (c: PackageContent) => void;
  editMode: boolean;
}) {
  const update = (patch: Partial<PackageContent>) => setContent({ ...content, ...patch });
  const updateInclusion = (i: number, patch: Partial<PackageContent["inclusions"][number]>) => {
    const next = content.inclusions.map((inc, idx) => (idx === i ? { ...inc, ...patch } : inc));
    setContent({ ...content, inclusions: next });
  };

  const agenda: { day: string; date: string; items: { time: string; title: string; status: "package" | "friday" | "saturday" | "free" }[] }[] = [
    {
      day: "Friday",
      date: "October 16",
      items: [
        { time: "12:00 PM", title: "Ritual at Clark Hall Pub", status: "free" },
        { time: "9:00 PM", title: "All Faculty '96 Smoker · The Tap House (6 Princess St)", status: "friday" },
      ],
    },
    {
      day: "Saturday",
      date: "October 17",
      items: [
        { time: "8:30–11:30 AM", title: "Queen's Pancake Breakfast + class photo", status: "free" },
        { time: "~10:00 AM", title: "Sci '96 Pancake Kegger (William St)", status: "package" },
        { time: "Afternoon", title: "Football Game · Sci '96 class block", status: "saturday" },
        { time: "7:00 PM", title: "University Club Mixer (168 Stuart)", status: "package" },
      ],
    },
  ];

  return (
    <section>
      <PanelHeading title="Sci '96 Reunion Events" />
      <div className="mb-6 text-sm text-zinc-600">
        <EditableText
          value={content.intro}
          onChange={(v) => update({ intro: v })}
          editMode={editMode}
          multiline
          as="p"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4 rounded border-2 border-[color:var(--queens-blue,#11335d)] bg-white p-5">
          <div className="text-lg font-semibold" style={{ color: QUEENS_BLUE }}>
            <EditableText value={content.title} onChange={(v) => update({ title: v })} editMode={editMode} />
          </div>
          <div className="text-4xl font-bold tracking-tight">
            <EditableText value={content.price} onChange={(v) => update({ price: v })} editMode={editMode} />
          </div>
          <div className="text-xs text-zinc-500">
            <EditableText value={content.pricePer} onChange={(v) => update({ pricePer: v })} editMode={editMode} />
          </div>
          <ul className="space-y-3 text-sm text-zinc-700">
            {content.inclusions.map((inc, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span className="flex-1">
                  <span className="font-semibold">
                    <EditableText
                      value={inc.title}
                      onChange={(v) => updateInclusion(i, { title: v })}
                      editMode={editMode}
                    />
                  </span>{" "}
                  <span className="text-zinc-600">
                    <EditableText
                      value={inc.body}
                      onChange={(v) => updateInclusion(i, { body: v })}
                      editMode={editMode}
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Field label="Add for me">
              <Select defaultValue="1">
                {[0, 1].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Add for guests">
              <Select defaultValue="0">
                {[0, 1, 2].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </div>

        <aside className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">
            ⚠️{" "}
            <EditableText
              value={content.noteTitle}
              onChange={(v) => update({ noteTitle: v })}
              editMode={editMode}
            />
          </p>
          <div className="mt-2">
            <EditableText
              value={content.noteBody}
              onChange={(v) => update({ noteBody: v })}
              editMode={editMode}
              multiline
              as="p"
            />
          </div>
        </aside>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded border border-[color:var(--queens-blue,#11335d)]/30 bg-[color:var(--queens-blue,#11335d)]/5 p-4 text-sm">
        <p className="text-zinc-700">
          📌 Check{" "}
          <a
            href="https://sci96.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: QUEENS_BLUE }}
          >
            sci96.ca
          </a>{" "}
          for the latest details on events, accommodations, and swag.
        </p>
        <a
          href="https://sci96.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center rounded px-3 text-xs font-semibold text-white"
          style={{ backgroundColor: QUEENS_BLUE }}
        >
          Visit sci96.ca →
        </a>
      </div>

      <h3 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Draft weekend agenda
      </h3>
      <div className="overflow-hidden rounded border border-black/10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 text-xs uppercase tracking-wider text-zinc-600">
            <tr>
              <th className="w-32 px-4 py-2 text-left">When</th>
              <th className="px-4 py-2 text-left">Event</th>
              <th className="w-56 px-4 py-2 text-left">How to get a ticket</th>
            </tr>
          </thead>
          <tbody>
            {agenda.map((day) => (
              <FragmentRows key={day.day} day={day} />
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
}

function FragmentRows({
  day,
}: {
  day: { day: string; date: string; items: { time: string; title: string; status: "package" | "friday" | "saturday" | "free" }[] };
}) {
  const tag: Record<"package" | "friday" | "saturday" | "free", { label: string; cls: string }> = {
    package: { label: "✓ In Sci '96 Events", cls: "bg-emerald-100 text-emerald-800" },
    friday: { label: "Friday Events tab →", cls: "bg-amber-100 text-amber-900" },
    saturday: { label: "Saturday Events tab →", cls: "bg-amber-100 text-amber-900" },
    free: { label: "n/a: Just show up!", cls: "bg-zinc-100 text-zinc-700" },
  };
  return (
    <>
      <tr className="border-t border-black/10 bg-zinc-50/60">
        <td className="px-4 py-2 font-semibold" style={{ color: QUEENS_BLUE }} colSpan={3}>
          {day.day} · {day.date}
        </td>
      </tr>
      {day.items.map((it) => (
        <tr key={it.title} className="border-t border-black/5">
          <td className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-500">{it.time}</td>
          <td className="px-4 py-2">{it.title}</td>
          <td className="px-4 py-2">
            <span className={"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " + tag[it.status].cls}>
              {tag[it.status].label}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

function FridayPanel() {
  return (
    <section>
      <PanelHeading title="Friday, October 16 — Optional Add-Ons" />
      <p className="mb-6 text-sm text-zinc-600">
        Ritual at Clark Hall is free and unticketed (12 PM start, mandatory re-entry at 3 PM). The two
        ticketed Friday items are below.
      </p>

      <div className="space-y-4">
        <EventRow
          name="Pancake Kegger Contribution"
          when="Sat morning · William St near Division"
          desc="Helps cover the keg, groceries, and supplies for the Sci '96 student-house pancake stop. Suggested $5–10/person; pick what you can."
          price="$5–$10"
          options={["$5", "$10", "$15", "$20"]}
        />
        <EventRow
          name="All Faculty '96 Smoker · The Tap House"
          when="Friday 9 PM · The Tap House, 6 Princess St"
          desc="ArtSci '96, Comm '96, and Sci '96 under one roof — separate Queen's-sold ticket, not bundled in the Sci '96 Events package."
          price="$45"
          options={["1 ticket", "2 tickets", "3 tickets", "4 tickets"]}
        />
      </div>
    </section>
  );
}

function SaturdayPanel() {
  return (
    <section>
      <PanelHeading title="Saturday, October 17 — Optional Add-Ons" />
      <p className="mb-6 text-sm text-zinc-600">
        Football and the University Club mixer are included in the package. The Pancake Breakfast is hosted by
        Queen&rsquo;s and is its own ticket.
      </p>

      <div className="space-y-4">
        <EventRow
          name="Queen's Pancake Breakfast"
          when="Sat 8:30–11:30 AM · Queen's"
          desc="Hosted by the university. Bookable time slot for the Sci '96 class year photo. Show up, eat carbs, smile for the camera."
          price="$15"
          options={["1 ticket", "2 tickets", "3 tickets", "4 tickets"]}
        />
        <EventRow
          name="Football Game · Queen's Homecoming"
          when="Sat afternoon · Richardson Stadium"
          desc="General-admission Homecoming football ticket — separate purchase, not bundled with the Sci '96 Events. When you buy in the Sci '96 block, Queen's seats us together so the whole class is in one section."
          price="$25 / ticket"
          options={["1 ticket", "2 tickets", "3 tickets", "4 tickets"]}
        />
        <EventRow
          name="University Club Mixer"
          when="Sat evening · 168 Stuart St"
          desc="Hors d'oeuvres, cash bar, the Dean dropping by. Included in the Sci '96 Events."
          price="Included"
          options={["Included with package", "Add à la carte ($25)"]}
        />
      </div>
    </section>
  );
}

function EventRow({
  name,
  when,
  desc,
  price,
  options,
}: {
  name: string;
  when: string;
  desc: string;
  price: string;
  options: string[];
}) {
  return (
    <article className="grid gap-3 rounded border border-black/15 bg-white p-4 sm:grid-cols-[1fr_220px]">
      <div>
        <h3 className="font-semibold" style={{ color: QUEENS_BLUE }}>
          {name}
        </h3>
        <p className="text-xs uppercase tracking-wider text-zinc-500">{when}</p>
        <p className="mt-2 text-sm text-zinc-700">{desc}</p>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <p className="text-lg font-semibold">{price}</p>
        <Select className="w-full">
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      </div>
    </article>
  );
}

function SwagPanel({
  items,
  setItems,
  editMode,
}: {
  items: SwagItemContent[];
  setItems: (next: SwagItemContent[]) => void;
  editMode: boolean;
}) {
  const updateItem = (key: string, patch: Partial<SwagItemContent>) => {
    setItems(items.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  };
  const removeItem = (key: string, name: string) => {
    if (!window.confirm(`Remove "${name}" from the swag list?`)) return;
    setItems(items.filter((s) => s.key !== key));
  };
  const addItem = () => {
    const key = `item-${Date.now()}`;
    const blank: SwagItemContent = {
      key,
      name: "New item",
      blurb: "Add a description.",
      price: 0,
      image: "/crest.svg",
      sizes: ["One size"],
    };
    setItems([...items, blank]);
  };

  return (
    <section>
      <PanelHeading title="Sci '96 Swag" />
      <p className="mb-6 text-sm text-zinc-600">
        Order closes <strong>September 1, 2026</strong>; no late additions after that. We&rsquo;ll follow up
        with pick up details. <strong>Stickers are included free with any swag order</strong> (Sci &rsquo;96
        crest + Clark Hall Pub die-cut vinyl).
      </p>

      <div className="space-y-6">
        {items.map((item) => (
          <SwagItemCard
            key={item.key}
            item={item}
            editMode={editMode}
            onUpdate={(patch) => updateItem(item.key, patch)}
            onRemove={() => removeItem(item.key, item.name)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-start gap-4 rounded border border-black/10 bg-zinc-50 p-4 text-sm text-zinc-700">
        <div className="flex shrink-0 gap-2">
          <div className="relative h-16 w-16 rounded border border-black/10 bg-white p-1">
            <Image
              src="/swag/sticker-crest.png"
              alt="Sci '96 crest sticker"
              fill
              sizes="64px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="relative h-16 w-16 rounded border border-black/10 bg-white p-1">
            <Image
              src="/swag/sticker-chp.png"
              alt="Clark Hall Pub sticker"
              fill
              sizes="64px"
              className="object-contain p-0.5"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold">Stickers · included with any swag purchase</p>
          <p className="mt-1">
            Custom die-cut vinyl by Sira Print, approximately 3″ tall each. You&rsquo;ll get a Sci &rsquo;96
            crest sticker and a Clark Hall Pub sticker tucked into your swag pickup — no separate order needed.
          </p>
        </div>
      </div>

      {editMode && (
        <button
          type="button"
          onClick={addItem}
          className="mt-6 inline-flex h-10 items-center rounded border border-amber-400 bg-amber-50 px-4 text-sm font-semibold text-amber-800 hover:bg-amber-100"
        >
          + Add a swag item
        </button>
      )}
    </section>
  );
}

function SwagItemCard({
  item,
  editMode,
  onUpdate,
  onRemove,
}: {
  item: SwagItemContent;
  editMode: boolean;
  onUpdate: (patch: Partial<SwagItemContent>) => void;
  onRemove: () => void;
}) {
  return (
    <article className="grid gap-6 rounded-lg border border-black/10 bg-white p-5 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col gap-3">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded border border-black/10 bg-zinc-50">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            className="h-full w-full object-contain"
            unoptimized
          />
          {item.crestOverlay && (
            <Image
              src={item.crestOverlay.src ?? "/crest.svg"}
              alt=""
              aria-hidden
              width={64}
              height={83}
              className="pointer-events-none absolute drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
              style={{
                left: item.crestOverlay.cx,
                top: item.crestOverlay.cy,
                width: item.crestOverlay.w,
                height: "auto",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          {item.bannerOverlay && (
            <Image
              src={item.bannerOverlay.src}
              alt={item.bannerOverlay.alt ?? ""}
              aria-hidden={!item.bannerOverlay.alt}
              width={120}
              height={30}
              className="pointer-events-none absolute drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
              style={{
                left: item.bannerOverlay.cx,
                top: item.bannerOverlay.cy,
                width: item.bannerOverlay.w,
                height: "auto",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
        {editMode && (
          <>
            <Field label="Product image" hint="Upload from your device — saved to your browser only.">
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const dataUrl = await imageFileToDataUrl(file, 800, 0.85);
                      onUpdate({ image: dataUrl });
                    } catch {
                      window.alert("Couldn't read that image. Try a smaller PNG or JPEG.");
                    } finally {
                      e.target.value = "";
                    }
                  }}
                  className="text-xs file:mr-2 file:cursor-pointer file:rounded file:border file:border-black/15 file:bg-white file:px-2 file:py-1 file:text-xs file:font-medium hover:file:bg-zinc-50"
                />
                {item.image.startsWith("data:") ? (
                  <div className="flex items-center justify-between gap-2 rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                    <span>Custom uploaded image</span>
                    <button
                      type="button"
                      onClick={() => onUpdate({ image: "/crest.svg" })}
                      className="font-semibold underline hover:no-underline"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <TextInput
                    value={item.image}
                    onChange={(e) => onUpdate({ image: e.target.value })}
                    placeholder="/swag/your-image.jpg"
                  />
                )}
              </div>
            </Field>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Logo cx">
                <TextInput
                  value={item.crestOverlay?.cx ?? ""}
                  onChange={(e) =>
                    onUpdate({
                      crestOverlay: { ...(item.crestOverlay ?? { cx: "50%", cy: "50%", w: "20%" }), cx: e.target.value },
                    })
                  }
                  placeholder="50%"
                />
              </Field>
              <Field label="Logo cy">
                <TextInput
                  value={item.crestOverlay?.cy ?? ""}
                  onChange={(e) =>
                    onUpdate({
                      crestOverlay: { ...(item.crestOverlay ?? { cx: "50%", cy: "50%", w: "20%" }), cy: e.target.value },
                    })
                  }
                  placeholder="50%"
                />
              </Field>
              <Field label="Logo width">
                <TextInput
                  value={item.crestOverlay?.w ?? ""}
                  onChange={(e) =>
                    onUpdate({
                      crestOverlay: { ...(item.crestOverlay ?? { cx: "50%", cy: "50%", w: "20%" }), w: e.target.value },
                    })
                  }
                  placeholder="20%"
                />
              </Field>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-lg font-semibold" style={{ color: QUEENS_BLUE }}>
            <EditableText value={item.name} onChange={(v) => onUpdate({ name: v })} editMode={editMode} />
          </div>
          {editMode ? (
            <div className="w-32">
              <TextInput
                type="number"
                min={0}
                step="0.01"
                value={item.price}
                onChange={(e) => onUpdate({ price: Number(e.target.value) || 0 })}
              />
            </div>
          ) : (
            <p className="text-xl font-bold whitespace-nowrap">${item.price.toFixed(2)}</p>
          )}
        </div>

        <div className="text-sm text-zinc-700">
          <EditableText
            value={item.blurb}
            onChange={(v) => onUpdate({ blurb: v })}
            editMode={editMode}
            multiline
            as="p"
          />
        </div>

        {editMode && (
          <Field label="Sizes" hint="Comma-separated values shown in the size dropdown">
            <TextInput
              value={item.sizes.join(", ")}
              onChange={(e) =>
                onUpdate({
                  sizes: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
        )}

        {item.sizes.length > 1 ? (
          <div className="grid gap-3 sm:grid-cols-[2fr_1fr_auto]">
            <Field label="Size">
              <Select defaultValue="">
                <option value="" disabled>
                  Select size…
                </option>
                {item.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <Field label="Quantity">
              <TextInput type="number" min={0} defaultValue={0} />
            </Field>
            <div className="flex items-end">
              <button
                type="button"
                className="inline-flex h-10 w-full items-center justify-center rounded px-4 text-sm font-semibold text-white sm:w-auto"
                style={{ backgroundColor: QUEENS_BLUE }}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Field label={`Quantity · ${item.sizes[0] ?? "One size"}`}>
              <TextInput type="number" min={0} defaultValue={0} />
            </Field>
            <div className="flex items-end">
              <button
                type="button"
                className="inline-flex h-10 w-full items-center justify-center rounded px-4 text-sm font-semibold text-white sm:w-auto"
                style={{ backgroundColor: QUEENS_BLUE }}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {item.sizing && !editMode && (
          <details className="mt-1 rounded border border-black/10 bg-zinc-50/60">
            <summary className="cursor-pointer select-none px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Size chart (Champion S700)
            </summary>
            <div className="overflow-x-auto p-3 pt-0">
              <table className="w-full border-collapse text-xs">
                <tbody>
                  {item.sizing.map((row, ri) => (
                    <tr key={ri} className={ri === 0 ? "bg-zinc-100 font-semibold" : ""}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="border border-black/10 px-2 py-1 text-center">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}

        {editMode && (
          <button
            type="button"
            onClick={onRemove}
            className="mt-1 inline-flex h-9 w-fit items-center rounded border border-red-300 bg-white px-3 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Remove this item
          </button>
        )}
      </div>
    </article>
  );
}

function BillingPanel() {
  return (
    <section>
      <PanelHeading title="Billing" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cardholder name" required>
          <TextInput />
        </Field>
        <Field label="Card number" required>
          <TextInput placeholder="•••• •••• •••• ••••" />
        </Field>
        <Field label="Expiry" required>
          <TextInput placeholder="MM / YY" />
        </Field>
        <Field label="CVC" required>
          <TextInput placeholder="•••" />
        </Field>
        <Field label="Billing address" required>
          <TextInput />
        </Field>
        <Field label="City" required>
          <TextInput />
        </Field>
        <Field label="Province / State" required>
          <TextInput />
        </Field>
        <Field label="Postal / ZIP" required>
          <TextInput />
        </Field>
      </div>

      <div className="mt-6 rounded border border-black/10 bg-zinc-50 p-4 text-sm text-zinc-700">
        Payment is processed by Queen&rsquo;s University. You&rsquo;ll receive a receipt by email; the
        organizing committee never sees your card details.
      </div>
    </section>
  );
}

function ReviewPanel() {
  const lines = [
    { label: "Sci '96 Registrant Package", qty: 1, amount: 185 },
    { label: "Guest Package — partner", qty: 1, amount: 155 },
    { label: "Pancake Kegger contribution", qty: 1, amount: 10 },
    { label: "Queen's Pancake Breakfast (×2)", qty: 2, amount: 30 },
    { label: "Sci '96 Hoodie · Large", qty: 1, amount: 95 },
    { label: "Sci '96 Toque", qty: 1, amount: 32 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const hst = +(subtotal * 0.13).toFixed(2);
  const total = +(subtotal + hst).toFixed(2);

  return (
    <section>
      <PanelHeading title="Review your order" />
      <div className="overflow-hidden rounded border border-black/10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100">
            <tr>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-right">Qty</th>
              <th className="px-4 py-2 text-right">Amount (CAD)</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.label} className="border-t border-black/5">
                <td className="px-4 py-2">{l.label}</td>
                <td className="px-4 py-2 text-right">{l.qty}</td>
                <td className="px-4 py-2 text-right">${l.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-zinc-50 text-sm">
            <tr className="border-t border-black/10">
              <td className="px-4 py-2 text-right font-medium" colSpan={2}>
                Subtotal
              </td>
              <td className="px-4 py-2 text-right">${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-right font-medium" colSpan={2}>
                HST (13%)
              </td>
              <td className="px-4 py-2 text-right">${hst.toFixed(2)}</td>
            </tr>
            <tr className="border-t border-black/10">
              <td className="px-4 py-3 text-right font-semibold" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-3 text-right text-base font-bold" style={{ color: QUEENS_BLUE }}>
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Checkbox label="I confirm the registrant and guest details are correct." />
        <Checkbox label="I understand that the swag order is final after September 1, 2026." />
        <Checkbox label="No refunds within 30 days of Homecoming weekend." />
      </div>
    </section>
  );
}

function FinishPanel() {
  return (
    <section>
      <PanelHeading title="You're in." />
      <div className="rounded border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="text-lg font-semibold">See you in Kingston.</p>
        <p className="mt-2 text-sm">
          A confirmation has been emailed to you. Digital tickets will arrive via the Queen&rsquo;s Homecoming
          app closer to the weekend. Swag pickup details (Grant Hall and University Club) will follow in
          September.
        </p>
        <p className="mt-4 text-sm">
          The #1 thing to do next: <strong>join the Sci &rsquo;96 WhatsApp group</strong> if you&rsquo;re not
          already in it.
        </p>
      </div>
    </section>
  );
}

