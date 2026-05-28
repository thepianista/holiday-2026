"use client";

import { useEffect, useState } from "react";
import {
  Anchor,
  BedDouble,
  Bus,
  CalendarDays,
  Car,
  Coffee,
  Compass,
  ExternalLink,
  Fish,
  MapPin,
  Plane,
  Sparkles,
  Waves,
} from "lucide-react";
import {
  carRental,
  diveOperators,
  flights,
  groundLegs,
  itineraryItems,
  reservationPriority,
  snorkelSpots,
  stays,
  type Activity,
  type FlightLeg,
  type Stay,
} from "@/data/trip";
import { places } from "@/data/places";

const TABS = [
  { id: "plan", label: "Plan", icon: CalendarDays },
  { id: "stays", label: "Stays", icon: BedDouble },
  { id: "do", label: "Do", icon: Compass },
  { id: "food", label: "Food", icon: Coffee },
  { id: "map", label: "Map", icon: MapPin },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_STORAGE_KEY = "mexico-2026-tab";

const statusLabels: Record<string, string> = {
  booked: "Booked",
  candidate: "Candidate",
  preferred: "Preferred",
  "to book": "To book",
  flexible: "Flexible",
  planned: "Planned",
};

const typeIcons = {
  flight: Plane,
  drive: Car,
  bus: Bus,
  hotel: BedDouble,
  activity: Compass,
  decision: Sparkles,
};

const groundIcons = {
  drive: Car,
  bus: Bus,
  boat: Anchor,
};

function SectionTitle({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p>{kicker}</p>
      <h2>{title}</h2>
      {copy ? <span>{copy}</span> : null}
    </div>
  );
}

function StayHeader({ stay }: { stay: Stay }) {
  return (
    <header className="stay-header">
      <span className="chapter-kicker">{stay.chapter}</span>
      <h3>{stay.city}</h3>
      <div className="stay-meta">
        <span>
          <MapPin aria-hidden="true" size={14} />
          {stay.dates}
        </span>
        <span>
          <Sparkles aria-hidden="true" size={14} />
          {stay.mood}
        </span>
      </div>
    </header>
  );
}

function ActivityList({
  items,
  icon,
}: {
  items: Activity[];
  icon: React.ReactNode;
}) {
  if (!items.length) return null;
  return (
    <div className="activity-list">
      {items.map((item) => (
        <article className="activity" key={item.title}>
          <div className="activity-icon">{icon}</div>
          <div>
            <div className="activity-heading">
              <h4>{item.title}</h4>
              <span>{item.pace}</span>
            </div>
            <p>{item.note}</p>
            {item.links?.length ? (
              <div className="mini-links">
                {item.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                    <ExternalLink aria-hidden="true" size={13} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function FlightCard({ leg }: { leg: FlightLeg }) {
  return (
    <article className="train-card" key={leg.id}>
      <div className="train-date">{leg.date}</div>
      <div className="train-line">
        <Plane aria-hidden="true" size={18} />
        <span>
          {leg.fromCode} → {leg.toCode}
        </span>
      </div>
      <h3>
        {leg.from} <span>to</span> {leg.to}
      </h3>
      <div className="flight-meta">
        <span>
          <strong>Passenger</strong> {leg.passenger}
        </span>
        <span>
          <strong>Airline</strong> {leg.airline}
        </span>
        <span>
          <strong>Flight</strong> {leg.flightNumber}
        </span>
        <span>
          <strong>Departs</strong> {leg.departure}
        </span>
        <span>
          <strong>Arrives</strong> {leg.arrival}
        </span>
        {leg.pnr ? (
          <span>
            <strong>PNR</strong> {leg.pnr}
          </span>
        ) : null}
      </div>
      {leg.note ? <p>{leg.note}</p> : null}
      <div className="card-footer">
        <span className={`status ${leg.status.replace(" ", "-")}`}>{statusLabels[leg.status]}</span>
      </div>
    </article>
  );
}

function PlanTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Day by day"
        title="The trip in order"
        copy="Each row is one day or one continuous stop. Status pills show what is still to book."
      />

      <div className="day-list">
        {itineraryItems.map((item) => {
          const Icon = typeIcons[item.type] ?? Sparkles;
          return (
            <article className="day-card" key={`${item.date}-${item.title}`}>
              <div className="day-card-meta">
                <span className="day-card-date">{item.date}</span>
                <span className="day-card-day">{item.day}</span>
                <span className={`status ${item.status.replace(" ", "-")}`}>{statusLabels[item.status]}</span>
              </div>
              <div className="day-card-body">
                <div className="day-card-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="day-card-place">
                    <MapPin aria-hidden="true" size={14} />
                    {item.place}
                  </p>
                  <p>{item.note}</p>
                  {(item.time || item.bookedWith || item.cost) ? (
                    <div className="day-card-facts">
                      {item.time ? <span>⏱ {item.time}</span> : null}
                      {item.bookedWith ? <span>✓ {item.bookedWith}</span> : null}
                      {item.cost ? <span>$ {item.cost}</span> : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <SectionTitle kicker="Flights" title="Air legs" copy="Placeholders below — fill in once flights are booked." />
      <div className="train-grid">
        {flights.map((leg) => (
          <FlightCard leg={leg} key={leg.id} />
        ))}
      </div>

      <SectionTitle
        kicker="Rental car"
        title="SJD pickup & drop-off"
        copy="One car for the whole road trip. Cover-all package booked via the broker."
      />
      <article className="rental-card">
        <div className="rental-card-top">
          <Car aria-hidden="true" size={20} />
          <div>
            <h4>{carRental.operator}</h4>
            <span>
              {carRental.broker ? `via ${carRental.broker} · ` : ""}
              {carRental.category}
            </span>
          </div>
        </div>
        <div className="rental-card-grid">
          <div>
            <p>Pickup</p>
            <strong>{carRental.pickup.date} · {carRental.pickup.time}</strong>
            <span>{carRental.pickup.location}</span>
          </div>
          <div>
            <p>Drop-off</p>
            <strong>{carRental.dropoff.date} · {carRental.dropoff.time}</strong>
            <span>{carRental.dropoff.location}</span>
          </div>
        </div>
        <div className="rental-card-list">
          <h5>Included</h5>
          <ul>
            {carRental.inclusions.map((inc) => (
              <li key={inc}>{inc}</li>
            ))}
          </ul>
        </div>
        <div className="rental-card-list">
          <h5>At the counter</h5>
          <ul>
            {carRental.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </article>

      <SectionTitle
        kicker="On the ground"
        title="Drives, bus, transfers"
        copy="Total driving is roughly 1,400 km. The 30 June Bahía → La Paz leg is the longest single day."
      />
      <div className="ground-grid">
        {groundLegs.map((leg) => {
          const Icon = groundIcons[leg.mode];
          return (
            <article className="ground-card" key={leg.id}>
              <div className="ground-card-top">
                <Icon aria-hidden="true" size={18} />
                <span>{leg.date}</span>
                <span className={`status ${leg.status.replace(" ", "-")}`}>{statusLabels[leg.status]}</span>
              </div>
              <h4>
                {leg.from} <span>to</span> {leg.to}
              </h4>
              <div className="ground-card-meta">
                <span>{leg.duration}</span>
                {leg.passenger ? <span>{leg.passenger}</span> : null}
              </div>
              {leg.note ? <p>{leg.note}</p> : null}
            </article>
          );
        })}
      </div>

      <SectionTitle kicker="Book first" title="Reservation order" copy="What to lock in first — small operators fill up." />
      <ol className="priority-list">
        {reservationPriority.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function StaysTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Base camps"
        title="Where we are sleeping"
        copy="Hotel candidates per stop. None of these are booked yet — pick one per stay and confirm."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <article className="stay-block" key={stay.id} style={{ "--accent": stay.colour } as React.CSSProperties}>
            <StayHeader stay={stay} />
            <p className="stay-summary">{stay.summary}</p>
            {stay.hotels?.length ? (
              <div className="hotel-grid">
                {stay.hotels.map((hotel) => (
                  <div className="hotel-card" key={hotel.name}>
                    <div>
                      <p>Option</p>
                      <h4>{hotel.name}</h4>
                      <span>{hotel.detail}</span>
                      {hotel.cancellation ? <span>{hotel.cancellation}</span> : null}
                      {hotel.status ? (
                        <span className={`status ${hotel.status.replace(" ", "-")}`}>
                          {statusLabels[hotel.status]}
                        </span>
                      ) : null}
                    </div>
                    <div className="hotel-actions">
                      {hotel.map ? (
                        <a href={hotel.map} rel="noreferrer" target="_blank" title={`Map for ${hotel.name}`}>
                          <MapPin aria-hidden="true" size={16} />
                          Map
                        </a>
                      ) : null}
                      {hotel.links?.map((link) => (
                        <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                          <ExternalLink aria-hidden="true" size={14} />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="travel-notes">
              {stay.travelIn ? <p>{stay.travelIn}</p> : null}
              {stay.travelOut ? <p>{stay.travelOut}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DoTab() {
  const diveStays = stays.filter((s) => s.diveSites?.length);
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Field guide"
        title="Things to do"
        copy="Shortlist per stop. Practical notes inline."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <article className="stay-block" key={stay.id} style={{ "--accent": stay.colour } as React.CSSProperties}>
            <StayHeader stay={stay} />
            {stay.links.length ? (
              <div className="chapter-links" aria-label={`${stay.city} useful links`}>
                {stay.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                    <ExternalLink aria-hidden="true" size={14} />
                  </a>
                ))}
              </div>
            ) : null}
            <ActivityList items={stay.thingsToDo} icon={<Compass aria-hidden="true" size={16} />} />
            {stay.practical?.length ? (
              <div className="practical-list">
                <h4>Practical notes</h4>
                <ul>
                  {stay.practical.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <SectionTitle
        kicker="Underwater"
        title="Dive sites & operators"
        copy="Four dive days planned. Water 24–27 °C, 3 mm suit. Book 1–2 weeks ahead by WhatsApp."
      />
      <div className="stays-list">
        {diveStays.map((stay) => (
          <article className="stay-block" key={`dive-${stay.id}`} style={{ "--accent": stay.colour } as React.CSSProperties}>
            <StayHeader stay={stay} />
            <ActivityList items={stay.diveSites ?? []} icon={<Fish aria-hidden="true" size={16} />} />
            <div className="operator-list">
              <h4>Operators</h4>
              {diveOperators
                .filter((op) => op.region === stay.city || op.region === stay.city.split(" /")[0])
                .map((op) => (
                  <div className="operator" key={op.name}>
                    <h5>{op.name}</h5>
                    <p>{op.highlights}</p>
                    {op.links?.length ? (
                      <div className="mini-links">
                        {op.links.map((link) => (
                          <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                            {link.label}
                            <ExternalLink aria-hidden="true" size={13} />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </article>
        ))}
      </div>

      <SectionTitle
        kicker="Snorkel"
        title="Best snorkel spots"
        copy="Shore-accessible spots first, then boat-only. Los Islotes is closed 1 Jun – 1 Sep."
      />
      <ActivityList items={snorkelSpots} icon={<Waves aria-hidden="true" size={16} />} />
    </section>
  );
}

function FoodTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Eat the trip"
        title="Where to eat"
        copy="Restaurants we want to try, grouped by stop."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <article className="stay-block" key={stay.id} style={{ "--accent": stay.colour } as React.CSSProperties}>
            <StayHeader stay={stay} />
            <ActivityList items={stay.foodIdeas} icon={<Coffee aria-hidden="true" size={16} />} />
          </article>
        ))}
      </div>
    </section>
  );
}

function MapTab() {
  const grouped = places.reduce<Record<string, typeof places>>((acc, place) => {
    const key = place.folder || "Unsorted";
    if (!acc[key]) acc[key] = [];
    acc[key].push(place);
    return acc;
  }, {});

  const folderNames = Object.keys(grouped).sort();
  const hasPlaces = places.length > 0;

  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Saved places"
        title="Google Maps list"
        copy="Synced from your Google My Maps export. Run `npm run import:kml` after dropping data/places.kml."
      />

      {!hasPlaces ? (
        <div className="empty-state">
          <p>
            <strong>No places loaded yet.</strong>
          </p>
          <ol>
            <li>Open your list at <a href="https://www.google.com/maps/d/" rel="noreferrer" target="_blank">google.com/maps/d</a>.</li>
            <li>Three-dot menu → Export to KML → keep as KML.</li>
            <li>Save the file as <code>data/places.kml</code> in this repo.</li>
            <li>Run <code>npm run import:kml</code>.</li>
          </ol>
        </div>
      ) : (
        <div className="places-grid">
          {folderNames.map((folder) => (
            <section className="places-folder" key={folder}>
              <h3>
                {folder}
                <span>{grouped[folder].length}</span>
              </h3>
              <ul>
                {grouped[folder].map((place) => (
                  <li key={place.id}>
                    <h4>{place.name}</h4>
                    {place.description ? <p>{place.description}</p> : null}
                    {place.lat != null && place.lon != null ? (
                      <a
                        className="place-map"
                        href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <MapPin aria-hidden="true" size={13} />
                        Open in Maps
                      </a>
                    ) : place.url ? (
                      <a className="place-map" href={place.url} rel="noreferrer" target="_blank">
                        <MapPin aria-hidden="true" size={13} />
                        Open in Maps
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("plan");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TAB_STORAGE_KEY) as TabId | null;
      if (saved && TABS.some((tab) => tab.id === saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- reading client-only state on mount; SSR uses the default tab
        setActiveTab(saved);
      }
    } catch {
      // localStorage may be unavailable
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(TAB_STORAGE_KEY, activeTab);
    } catch {
      // ignore
    }
  }, [activeTab, hydrated]);

  const handleTabChange = (next: TabId) => {
    setActiveTab(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="passport-mark" aria-hidden="true">
          MX
        </div>
        <div className="hero-content">
          <p className="eyebrow">Private trip field guide</p>
          <h1>
            <span>Mexico</span>
            <span>2026</span>
          </h1>
          <div className="hero-strip" aria-label="Trip summary">
            <p className="hero-dates">16 June – 4 July 2026</p>
            <p className="hero-route">
              <span>CDMX</span>
              <span aria-hidden="true">→</span>
              <span>Pescadero</span>
              <span aria-hidden="true">→</span>
              <span>La Paz</span>
              <span aria-hidden="true">→</span>
              <span>Loreto</span>
              <span aria-hidden="true">→</span>
              <span>Bahía</span>
              <span aria-hidden="true">→</span>
              <span>Cabo Pulmo</span>
            </p>
          </div>
        </div>
      </section>

      <div className="tab-panel">
        {activeTab === "plan" ? <PlanTab /> : null}
        {activeTab === "stays" ? <StaysTab /> : null}
        {activeTab === "do" ? <DoTab /> : null}
        {activeTab === "food" ? <FoodTab /> : null}
        {activeTab === "map" ? <MapTab /> : null}
      </div>

      <nav className="tab-bar" aria-label="Main sections">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-bar-btn${isActive ? " active" : ""}`}
              onClick={() => handleTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={tab.label}
            >
              <Icon aria-hidden="true" size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
