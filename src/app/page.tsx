"use client";

import { useEffect, useState } from "react";
import {
  Anchor,
  BedDouble,
  Bus,
  CalendarDays,
  Car,
  ChevronDown,
  Coffee,
  Compass,
  ExternalLink,
  Fish,
  MapPin,
  MapPinned,
  Plane,
  Route as RouteIcon,
  Sparkles,
  Ticket,
  Users,
  Waves,
} from "lucide-react";
import {
  beachShortlist,
  carRental,
  diveOperators,
  extraStays,
  flights,
  groundLegs,
  heroStats,
  hikeAndWalkIdeas,
  itineraryItems,
  nextBookings,
  reservationPriority,
  routeOptions,
  snorkelSpots,
  stays,
  type Activity,
  type Audience,
  type FlightLeg,
  type ItineraryItem,
  type RouteOption,
  type Stay,
} from "@/data/trip";
import { places } from "@/data/places";

const TABS = [
  { id: "days", label: "Days", icon: CalendarDays },
  { id: "stays", label: "Stays", icon: BedDouble },
  { id: "activities", label: "Activities", icon: Waves },
  { id: "food", label: "Food", icon: Coffee },
  { id: "logistics", label: "Logistics", icon: Plane },
  { id: "routes", label: "Routes", icon: RouteIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_STORAGE_KEY = "mexico-2026-tab";
const SHARED_MAP_URL = "https://maps.app.goo.gl/YWHSjyy2dgK7EiS68";

const statusLabels: Record<string, string> = {
  booked: "Booked",
  candidate: "Candidate",
  preferred: "Preferred",
  "to book": "To book",
  flexible: "Flexible",
  planned: "Planned",
  alternative: "Alternative",
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

const audienceClass: Record<Audience, string> = {
  Everyone: "audience-everyone",
  "Julian solo": "audience-julian",
  "Julian + Anja": "audience-pair",
  Manuela: "audience-manu",
};

function AudienceBadge({ audience }: { audience: Audience }) {
  return (
    <span className={`audience-badge ${audienceClass[audience]}`}>
      <Users aria-hidden="true" size={12} />
      {audience}
    </span>
  );
}

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
        {stay.id === "mexico-city" ? <AudienceBadge audience="Julian solo" /> : null}
      </div>
    </header>
  );
}

function StayCollapsible({
  stay,
  defaultOpen,
  children,
}: {
  stay: Stay;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      className="stay-block collapsible"
      open={defaultOpen}
      style={{ "--accent": stay.colour } as React.CSSProperties}
    >
      <summary>
        <StayHeader stay={stay} />
        <ChevronDown aria-hidden="true" className="collapsible-chevron" size={20} />
      </summary>
      <div className="collapsible-body">{children}</div>
    </details>
  );
}

function ThemeGroup({
  icon,
  title,
  description,
  defaultOpen,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="theme-group collapsible" open={defaultOpen}>
      <summary>
        <div className="theme-group-summary">
          {icon}
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <ChevronDown aria-hidden="true" className="collapsible-chevron" size={18} />
      </summary>
      <div className="collapsible-body">{children}</div>
    </details>
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

function TripMenu({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  return (
    <nav className="trip-menu" aria-label="Trip sections">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={isActive ? "active" : ""}
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={17} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function NextBookings({ compact = false }: { compact?: boolean }) {
  const items = compact ? nextBookings.slice(0, 3) : nextBookings;
  return (
    <div className={compact ? "booking-stack compact" : "booking-stack"}>
      {items.map((booking, index) => (
        <article className="booking-card" key={booking.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h4>{booking.title}</h4>
            <p>{booking.detail}</p>
          </div>
          <strong className={`status ${booking.status.replace(" ", "-")}`}>{statusLabels[booking.status]}</strong>
        </article>
      ))}
    </div>
  );
}

function DayCard({ item, defaultOpen }: { item: ItineraryItem; defaultOpen?: boolean }) {
  const Icon = typeIcons[item.type] ?? Sparkles;
  return (
    <details className="day-card collapsible" open={defaultOpen}>
      <summary>
        <div className="day-card-summary">
          <div className="day-card-meta">
            <span className="day-card-date">{item.date}</span>
            <span className="day-card-day">{item.day}</span>
            {item.audience ? <AudienceBadge audience={item.audience} /> : null}
            <span className={`status ${item.status.replace(" ", "-")}`}>{statusLabels[item.status]}</span>
          </div>
          <div className="day-card-headline">
            <div className="day-card-icon">
              <Icon aria-hidden="true" size={18} />
            </div>
            <div>
              <h3>{item.title}</h3>
              {item.summary ? <p className="day-card-tagline">{item.summary}</p> : null}
            </div>
          </div>
        </div>
        <ChevronDown aria-hidden="true" className="collapsible-chevron" size={18} />
      </summary>
      <div className="day-card-detail">
        <p className="day-card-place">
          <MapPin aria-hidden="true" size={14} />
          {item.place}
        </p>
        <p>{item.note}</p>
        {item.time || item.bookedWith || item.cost ? (
          <div className="day-card-facts">
            {item.time ? <span>⏱ {item.time}</span> : null}
            {item.bookedWith ? <span>✓ {item.bookedWith}</span> : null}
            {item.cost ? <span>$ {item.cost}</span> : null}
          </div>
        ) : null}
      </div>
    </details>
  );
}

function DaysTab() {
  const cdmxDays = itineraryItems.filter((item) => item.group === "cdmx");
  const mainDays = itineraryItems.filter((item) => item.group !== "cdmx");

  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Day by day"
        title="The plan, day by day"
        copy="Tap any day to open the detail — drives, what to do, where you sleep. Mexico City (Julian only, before the group meets) is folded away at the top."
      />

      <details className="day-group collapsible">
        <summary>
          <div className="day-group-summary">
            <div className="day-group-icon">
              <Compass aria-hidden="true" size={18} />
            </div>
            <div>
              <h3>Mexico City — before the group meets</h3>
              <p>16–19 Jun · 3 nights · Julian solo</p>
            </div>
            <AudienceBadge audience="Julian solo" />
          </div>
          <ChevronDown aria-hidden="true" className="collapsible-chevron" size={18} />
        </summary>
        <div className="day-list nested">
          {cdmxDays.map((item) => (
            <DayCard item={item} key={`${item.date}-${item.title}`} />
          ))}
        </div>
      </details>

      <div className="day-list">
        {mainDays.map((item) => (
          <DayCard item={item} key={`${item.date}-${item.title}`} />
        ))}
      </div>
    </section>
  );
}

function HotelOptionCard({ hotel }: { hotel: { name: string; detail: string; status?: string; cancellation?: string; map?: string; links?: { label: string; href: string }[] } }) {
  return (
    <div className="hotel-card">
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
  );
}

function StaysTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Base camps"
        title="Where we are sleeping"
        copy="One card per stop — tap to see hotel options. The Mexico City Airbnb is booked; the rest are still to pick."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <StayCollapsible stay={stay} key={stay.id}>
            <p className="stay-summary">{stay.summary}</p>
            {stay.hotels?.length ? (
              <div className="hotel-grid">
                {stay.hotels.map((hotel) => (
                  <HotelOptionCard hotel={hotel} key={hotel.name} />
                ))}
              </div>
            ) : null}
            <div className="travel-notes">
              {stay.travelIn ? <p>{stay.travelIn}</p> : null}
              {stay.travelOut ? <p>{stay.travelOut}</p> : null}
            </div>
          </StayCollapsible>
        ))}
      </div>

      <SectionTitle
        kicker="One-off overnights"
        title="Solo stays outside the main loop"
        copy="Connection nights for travellers leaving on their own schedule."
      />
      <div className="stays-list">
        {extraStays.map((extra) => (
          <details
            className="stay-block collapsible"
            key={extra.id}
            style={{ "--accent": "var(--chapter-ink)" } as React.CSSProperties}
          >
            <summary>
              <header className="stay-header">
                <span className="chapter-kicker">{extra.for}</span>
                <h3>{extra.city}</h3>
                <div className="stay-meta">
                  <span>
                    <MapPin aria-hidden="true" size={14} />
                    {extra.dates}
                  </span>
                  <span>
                    <Sparkles aria-hidden="true" size={14} />
                    {extra.reason}
                  </span>
                </div>
              </header>
              <ChevronDown aria-hidden="true" className="collapsible-chevron" size={20} />
            </summary>
            <div className="collapsible-body">
              <div className="hotel-grid">
                {extra.hotels.map((hotel) => (
                  <HotelOptionCard hotel={hotel} key={hotel.name} />
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function ActivityOverviewCard({
  title,
  meta,
  copy,
  icon,
}: {
  title: string;
  meta: string;
  copy: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="activity-overview-card">
      <div className="activity-overview-icon">{icon}</div>
      <div>
        <span>{meta}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function ActivitiesTab() {
  const diveStays = stays.filter((s) => s.diveSites?.length);
  const diveSiteCount = diveStays.reduce((sum, stay) => sum + (stay.diveSites?.length ?? 0), 0);

  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Activities"
        title="Baja field guide"
        copy="Snorkel, dive, beach and walk ideas. Tap a stop to open its shortlist, or use the themed lists lower down."
      />

      <div className="activity-overview-grid">
        <ActivityOverviewCard
          title="Snorkelling"
          meta={`${snorkelSpots.length} saved spots`}
          copy="Shore-first shortlist, with boat-only days called out where they need planning."
          icon={<Waves aria-hidden="true" size={18} />}
        />
        <ActivityOverviewCard
          title="Diving"
          meta={`${diveSiteCount} dive sites`}
          copy="Four planned dive days across La Paz, Loreto and Cabo Pulmo, with operators grouped by region."
          icon={<Fish aria-hidden="true" size={18} />}
        />
        <ActivityOverviewCard
          title="Beaches"
          meta={`${beachShortlist.length} beach picks`}
          copy="The swimmable, scenic and sunset beaches worth keeping on the map."
          icon={<MapPin aria-hidden="true" size={18} />}
        />
        <ActivityOverviewCard
          title="Walks & hikes"
          meta={`${hikeAndWalkIdeas.length} easy routes`}
          copy="Low-friction viewpoints and evening loops, not hardcore hiking days."
          icon={<Compass aria-hidden="true" size={18} />}
        />
      </div>

      <SectionTitle
        kicker="By stop"
        title="Things to do"
        copy="Tap a stop to open its shortlist. Practical notes inline."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <StayCollapsible stay={stay} key={stay.id}>
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
          </StayCollapsible>
        ))}
      </div>

      <ThemeGroup
        icon={<Waves aria-hidden="true" size={18} />}
        title="Best snorkel spots"
        description="Shore-accessible first, then boat-only. Los Islotes closed 1 Jun – 1 Sep."
      >
        <ActivityList items={snorkelSpots} icon={<Waves aria-hidden="true" size={16} />} />
      </ThemeGroup>

      <ThemeGroup
        icon={<Fish aria-hidden="true" size={18} />}
        title="Dive sites & operators"
        description="Four dive days. Water 24–27 °C, 3 mm suit. Book 1–2 weeks ahead by WhatsApp."
      >
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
      </ThemeGroup>

      <ThemeGroup
        icon={<MapPin aria-hidden="true" size={18} />}
        title="Schönste Strände"
        description="The beach shortlist for swimming, snorkelling, sunsets and slower days."
      >
        <ActivityList items={beachShortlist} icon={<MapPin aria-hidden="true" size={16} />} />
      </ThemeGroup>

      <ThemeGroup
        icon={<Compass aria-hidden="true" size={18} />}
        title="Walks & hikes"
        description="Small routes and viewpoints that fit between driving, food and beach time."
      >
        <ActivityList items={hikeAndWalkIdeas} icon={<Compass aria-hidden="true" size={16} />} />
      </ThemeGroup>
    </section>
  );
}

function FoodTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Eat the trip"
        title="Where to eat"
        copy="Tap a stop to open its restaurant shortlist."
      />
      <div className="stays-list">
        {stays.map((stay) => (
          <StayCollapsible stay={stay} key={stay.id}>
            <ActivityList items={stay.foodIdeas} icon={<Coffee aria-hidden="true" size={16} />} />
          </StayCollapsible>
        ))}
      </div>
    </section>
  );
}

function FlightCard({ leg }: { leg: FlightLeg }) {
  return (
    <details className="flight-collapsible collapsible" key={leg.id}>
      <summary>
        <div className="flight-summary">
          <span className="flight-summary-date">{leg.date}</span>
          <div className="flight-summary-line">
            <Plane aria-hidden="true" size={16} />
            <strong>
              {leg.fromCode} → {leg.toCode}
            </strong>
            <span>{leg.passenger}</span>
          </div>
        </div>
        <span className={`status ${leg.status.replace(" ", "-")}`}>{statusLabels[leg.status]}</span>
        <ChevronDown aria-hidden="true" className="collapsible-chevron" size={18} />
      </summary>
      <div className="collapsible-body">
        <h3 className="flight-route">
          {leg.from} <span>to</span> {leg.to}
        </h3>
        <div className="flight-meta">
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
          {leg.seat ? (
            <span>
              <strong>Seat</strong> {leg.seat}
            </span>
          ) : null}
        </div>
        {leg.note ? <p className="flight-note">{leg.note}</p> : null}
      </div>
    </details>
  );
}

function LogisticsTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Book first"
        title="The booking queue"
        copy="The working list of what to lock in — small operators fill up fast."
      />
      <NextBookings />

      <ThemeGroup
        icon={<Ticket aria-hidden="true" size={18} />}
        title="Reservation order"
        description="What to lock in first."
        defaultOpen
      >
        <ol className="priority-list">
          {reservationPriority.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </ThemeGroup>

      <SectionTitle kicker="Flights" title="Air legs" copy="Tap a leg for times and aircraft. Booking codes stay in your wallet/email." />
      <div className="flight-list">
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
    </section>
  );
}

function RouteOptionCard({ option }: { option: RouteOption }) {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(option.mapQuery)}&output=embed`;
  return (
    <article className={`route-option ${option.status}`}>
      <header className="route-option-head">
        <div>
          <span className="route-option-tag">{option.tagline}</span>
          <h3>{option.name}</h3>
        </div>
        <span className={`status ${option.recommended ? "preferred" : "alternative"}`}>
          {option.recommended ? "Recommended" : "Alternative"}
        </span>
      </header>

      <div className="route-sequence" aria-label="Route stops">
        {option.sequence.map((stop, index) => (
          <span className="route-stop" key={`${option.id}-${stop}-${index}`}>
            {stop}
            {index < option.sequence.length - 1 ? <span aria-hidden="true">→</span> : null}
          </span>
        ))}
      </div>

      <p className="route-summary">{option.summary}</p>

      <iframe
        title={`${option.name} map`}
        className="route-map"
        src={embedUrl}
        referrerPolicy="no-referrer-when-downgrade"
        loading="lazy"
      />

      <div className="route-legs">
        <h4>Legs</h4>
        {option.legs.map((leg, index) => (
          <div className="route-leg" key={`${option.id}-leg-${index}`}>
            <div className="route-leg-line">
              <strong>
                {leg.from} → {leg.to}
              </strong>
              <span>
                {leg.distance} · {leg.duration}
              </span>
            </div>
            {leg.note ? <p>{leg.note}</p> : null}
          </div>
        ))}
      </div>

      <div className="route-manu">
        <h4>
          <Bus aria-hidden="true" size={15} />
          Manu&apos;s exit
        </h4>
        <p>{option.manuExit}</p>
      </div>

      <div className="route-proscons">
        <div className="route-pros">
          <h4>Pros</h4>
          <ul>
            {option.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="route-cons">
          <h4>Cons</h4>
          <ul>
            {option.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function RoutesTab() {
  const grouped = places.reduce<Record<string, typeof places>>((acc, place) => {
    const key = place.folder || "Unsorted";
    if (!acc[key]) acc[key] = [];
    acc[key].push(place);
    return acc;
  }, {});

  const folderNames = Object.keys(grouped).sort();
  const hasPlaces = places.length > 0;
  const placesWithCoordinates = places.filter((place) => place.lat != null && place.lon != null).length;
  const placesSummary = hasPlaces
    ? `${places.length} places across ${folderNames.length} list${folderNames.length === 1 ? "" : "s"}.`
    : "No places imported yet.";

  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Still deciding"
        title="Two ways to run the loop"
        copy="The order is open because Manu leaves early. Compare the routes, then we lock one. Distances and drive times are rough."
      />

      <div className="route-options">
        {routeOptions.map((option) => (
          <RouteOptionCard option={option} key={option.id} />
        ))}
      </div>

      <ThemeGroup
        icon={<MapPinned aria-hidden="true" size={18} />}
        title="Saved Google Maps places"
        description={placesSummary}
      >
        {!hasPlaces ? (
          <div className="empty-state">
            <p>
              <strong>No places loaded yet.</strong>
            </p>
            <ol>
              <li>Open your list at <a href="https://www.google.com/maps/d/" rel="noreferrer" target="_blank">google.com/maps/d</a>.</li>
              <li>Three-dot menu → Export to KML → keep as KML.</li>
              <li>Save the file as <code>data/places.kml</code> in this repo.</li>
              <li>Run <code>npm run import:places</code>.</li>
            </ol>
          </div>
        ) : (
          <>
            <div className="map-summary">
              <span>
                <strong>{places.length}</strong>
                saved places
              </span>
              <span>
                <strong>{folderNames.length}</strong>
                list
              </span>
              <span>
                <strong>{placesWithCoordinates}</strong>
                mapped pins
              </span>
            </div>
            <div className="map-actions">
              <a href={SHARED_MAP_URL} rel="noreferrer" target="_blank">
                <MapPinned aria-hidden="true" size={15} />
                Open shared list
              </a>
            </div>
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
          </>
        )}
      </ThemeGroup>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("days");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TAB_STORAGE_KEY);
      const legacy: Record<string, TabId> = { plan: "days", do: "activities", map: "routes" };
      if (saved && legacy[saved]) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- migrate old tab ids after the restructure
        setActiveTab(legacy[saved]);
        setHydrated(true);
        return;
      }
      if (saved && TABS.some((tab) => tab.id === saved)) {
        setActiveTab(saved as TabId);
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
        <div className="hero-content">
          <div className="hero-headline">
            <p className="eyebrow">Private trip field guide</p>
            <h1>
              <span>Mexico</span>
              <span>2026</span>
            </h1>
            <div className="passport-mark" aria-hidden="true">
              MX
            </div>
          </div>
          <div className="hero-strip" aria-label="Trip summary">
            <p className="hero-dates">16 June – 4 July 2026</p>
            <p className="hero-route">
              <span>CDMX</span>
              <span aria-hidden="true">→</span>
              <span>Todos Santos</span>
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
        <aside className="hero-side" aria-label="Quick trip facts">
          <div className="hero-facts">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <TripMenu activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="tab-panel">
        {activeTab === "days" ? <DaysTab /> : null}
        {activeTab === "stays" ? <StaysTab /> : null}
        {activeTab === "activities" ? <ActivitiesTab /> : null}
        {activeTab === "food" ? <FoodTab /> : null}
        {activeTab === "logistics" ? <LogisticsTab /> : null}
        {activeTab === "routes" ? <RoutesTab /> : null}
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
