"use client";

import { useEffect, useState } from "react";
import {
  BedDouble,
  Camera,
  CloudRain,
  Coffee,
  ExternalLink,
  FerrisWheel,
  MapPin,
  ShieldCheck,
  Sparkles,
  Train,
} from "lucide-react";
import { futureOptions, stays, trainLegs, type Activity, type Stay } from "@/data/trip";

const TABS = [
  { id: "travel", label: "Travel", icon: Train },
  { id: "stays", label: "Stays", icon: BedDouble },
  { id: "do", label: "See & do", icon: FerrisWheel },
  { id: "food", label: "Food", icon: Coffee },
  { id: "photos", label: "Photos", icon: Camera },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_STORAGE_KEY = "holiday-2026-tab";

const statusLabels = {
  booked: "Booked",
  candidate: "Candidate",
  preferred: "Preferred",
  alternative: "Alternative",
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

function ActivityList({ items, icon }: { items: Activity[]; icon: React.ReactNode }) {
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

function TravelTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Train trail"
        title="The route at a glance"
        copy={"The booked and candidate legs are kept separate so the family can see what's fixed and what still needs checking."}
      />
      <div className="train-grid">
        {trainLegs.map((leg) => (
          <article className="train-card" key={`${leg.date}-${leg.from}-${leg.to}`}>
            <div className="train-date">{leg.date}</div>
            <div className="train-line">
              <Train aria-hidden="true" size={18} />
              <span>{leg.time}</span>
            </div>
            <h3>
              {leg.from} <span>to</span> {leg.to}
            </h3>
            <p>{leg.detail}</p>
            <div className="card-footer">
              <span className={`status ${leg.status}`}>{statusLabels[leg.status]}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StaysTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Base camps"
        title="Where we're staying"
        copy="Hotels confirmed for each chapter, with cancellation notes and booking links."
      />
      <div className="stays-list">
        {stays
          .filter((stay) => stay.hotel)
          .map((stay) => (
            <article className="stay-block" key={stay.id} style={{ "--accent": stay.colour } as React.CSSProperties}>
              <StayHeader stay={stay} />
              <div className="hotel-card">
                <div>
                  <p>Base camp</p>
                  <h4>{stay.hotel!.name}</h4>
                  <span>{stay.hotel!.detail}</span>
                  {stay.hotel!.cancellation ? <span>{stay.hotel!.cancellation}</span> : null}
                </div>
                <div className="hotel-actions">
                  {stay.hotel!.map ? (
                    <a href={stay.hotel!.map} rel="noreferrer" target="_blank" title={`Open map for ${stay.hotel!.name}`}>
                      <MapPin aria-hidden="true" size={18} />
                      Map
                    </a>
                  ) : null}
                  {stay.hotel!.links?.map((link) => (
                    <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                      <ExternalLink aria-hidden="true" size={16} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
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
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Field guide"
        title="Things to see and do"
        copy="A shortlist per city, with rainy day saves if the weather turns."
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
            <div className="idea-stack">
              <div>
                <h4>
                  <FerrisWheel aria-hidden="true" size={18} />
                  Things we might do
                </h4>
                <ActivityList items={stay.thingsToDo} icon={<FerrisWheel aria-hidden="true" size={16} />} />
              </div>
              <div>
                <h4>
                  <CloudRain aria-hidden="true" size={18} />
                  Rainy day saves
                </h4>
                <ActivityList items={stay.rainyDayIdeas} icon={<CloudRain aria-hidden="true" size={16} />} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FoodTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Eat the journey"
        title="Food and drink ideas"
        copy="Restaurants, markets and easy snack stops we'll pick from on the day."
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

function PhotosTab() {
  return (
    <section className="tab-section">
      <SectionTitle
        kicker="Scrapbook"
        title="Photo diary"
        copy="A chronological log of the trip, city by city. Empty slots fill in once we start uploading photos and notes."
      />
      <div className="photo-feed">
        {stays.flatMap((stay) =>
          stay.diary.map((entry) => (
            <article
              className="photo-day"
              key={`${stay.id}-${entry.day}`}
              style={{ "--accent": stay.colour } as React.CSSProperties}
            >
              <div className="photo-day-header">
                <div>
                  <span className="chapter-kicker">{stay.city}</span>
                  <h4>{entry.day}</h4>
                </div>
                <span className="stamp-small">{stay.stamp}</span>
              </div>
              <p>{entry.prompt}</p>
              <div className="photo-slots" aria-label={`${entry.photoSlots} placeholder photo slots`}>
                {Array.from({ length: entry.photoSlots }).map((_, index) => (
                  <div key={index}>
                    <Camera aria-hidden="true" size={16} />
                  </div>
                ))}
              </div>
            </article>
          )),
        )}
      </div>

      <section className="future-section photos-footer">
        <div>
          <SectionTitle kicker="Coming up" title="Photos and comments next" />
          <p>
            Version one stays fast and static. When we&apos;re ready, we can add uploads and family comments — these are the routes we&apos;d
            most likely take.
          </p>
        </div>
        <div className="future-grid">
          {futureOptions.map((option) => (
            <div key={option}>
              <ShieldCheck aria-hidden="true" size={18} />
              <span>{option}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("travel");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TAB_STORAGE_KEY) as TabId | null;
      if (saved && TABS.some((tab) => tab.id === saved)) {
        setActiveTab(saved);
      }
    } catch {
      // ignore — localStorage may be unavailable
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
          DE
        </div>
        <div className="hero-content">
          <p className="eyebrow">Private family field guide</p>
          <h1>
            <span>Germany</span>
            <span>2026</span>
          </h1>
          <div className="hero-strip" aria-label="Trip summary">
            <p className="hero-dates">27 July – 6 August 2026</p>
            <p className="hero-route">
              <span>London</span>
              <span aria-hidden="true">→</span>
              <span>Koblenz</span>
              <span aria-hidden="true">→</span>
              <span>Heidelberg</span>
              <span aria-hidden="true">→</span>
              <span>Freiburg</span>
              <span aria-hidden="true">→</span>
              <span>Cologne</span>
              <span aria-hidden="true">→</span>
              <span>London</span>
            </p>
          </div>
        </div>
      </section>

      <div className="tab-panel">
        {activeTab === "travel" ? <TravelTab /> : null}
        {activeTab === "stays" ? <StaysTab /> : null}
        {activeTab === "do" ? <DoTab /> : null}
        {activeTab === "food" ? <FoodTab /> : null}
        {activeTab === "photos" ? <PhotosTab /> : null}
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
