import {
  BedDouble,
  BookOpen,
  Camera,
  CloudRain,
  Coffee,
  ExternalLink,
  FerrisWheel,
  LockKeyhole,
  MapPin,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Train,
} from "lucide-react";
import { futureOptions, heroStats, stays, trainLegs, type Activity } from "@/data/trip";

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

export default function Home() {
  return (
    <main>
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
          <p className="hero-copy">
            A playful trip book for trains, city chapters, rainy day saves and the photo diary we&apos;ll fill in as we go.
          </p>
          <div className="hero-actions">
            <a href="#chapters">
              <BookOpen aria-hidden="true" size={18} />
              City chapters
            </a>
            <a href="#scrapbook">
              <Camera aria-hidden="true" size={18} />
              Photo diary
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Trip overview">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="security-strip">
        <LockKeyhole aria-hidden="true" size={20} />
        <p>
          Built for private Vercel deployment. No booking references, booking access codes, emails, phone numbers or home addresses are stored here.
        </p>
      </section>

      <section className="timeline-section" id="timeline">
        <SectionTitle
          kicker="Train trail"
          title="The route at a glance"
          copy="The booked and candidate legs are kept separate so the family can see what&apos;s fixed and what still needs checking."
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
                {leg.cost ? <strong>{leg.cost}</strong> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="chapters" id="chapters">
        <SectionTitle
          kicker="Passport chapters"
          title="Where we&apos;re staying and what we might do"
          copy="Each chapter has practical stay notes, a small shortlist and a journal area ready for photos and daily comments."
        />
        <div className="chapter-stack">
          {stays.map((stay) => (
            <article className="chapter" id={stay.id} key={stay.id} style={{ "--accent": stay.colour } as React.CSSProperties}>
              <div className="chapter-top">
                <div>
                  <span className="chapter-kicker">{stay.chapter}</span>
                  <h3>{stay.city}</h3>
                  <p>{stay.summary}</p>
                </div>
                <div className="stamp">
                  <span>{stay.stamp}</span>
                </div>
              </div>

              <div className="chapter-meta">
                <div>
                  <MapPin aria-hidden="true" size={18} />
                  <span>{stay.dates}</span>
                </div>
                <div>
                  <Sparkles aria-hidden="true" size={18} />
                  <span>{stay.mood}</span>
                </div>
                {stay.nights > 0 ? (
                  <div>
                    <BedDouble aria-hidden="true" size={18} />
                    <span>{stay.nights} nights</span>
                  </div>
                ) : null}
              </div>

              {stay.hotel ? (
                <div className="hotel-card">
                  <div>
                    <p>Base camp</p>
                    <h4>{stay.hotel.name}</h4>
                    <span>{stay.hotel.detail}</span>
                    {stay.hotel.cancellation ? <span>{stay.hotel.cancellation}</span> : null}
                  </div>
                  {stay.hotel.map ? (
                    <a href={stay.hotel.map} rel="noreferrer" target="_blank" title={`Open map for ${stay.hotel.name}`}>
                      <MapPin aria-hidden="true" size={18} />
                      Map
                    </a>
                  ) : null}
                </div>
              ) : null}

              <div className="travel-notes">
                {stay.travelIn ? <p>{stay.travelIn}</p> : null}
                {stay.travelOut ? <p>{stay.travelOut}</p> : null}
              </div>

              <div className="chapter-links" aria-label={`${stay.city} useful links`}>
                {stay.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                    <ExternalLink aria-hidden="true" size={14} />
                  </a>
                ))}
              </div>

              <div className="idea-grid">
                <div>
                  <h4>
                    <FerrisWheel aria-hidden="true" size={18} />
                    Things we might do
                  </h4>
                  <ActivityList items={stay.thingsToDo} icon={<FerrisWheel aria-hidden="true" size={16} />} />
                </div>
                <div>
                  <h4>
                    <Coffee aria-hidden="true" size={18} />
                    Food and drink ideas
                  </h4>
                  <ActivityList items={stay.foodIdeas} icon={<Coffee aria-hidden="true" size={16} />} />
                </div>
                <div>
                  <h4>
                    <CloudRain aria-hidden="true" size={18} />
                    Rainy day saves
                  </h4>
                  <ActivityList items={stay.rainyDayIdeas} icon={<CloudRain aria-hidden="true" size={16} />} />
                </div>
              </div>

              <div className="diary-panel" id={stay.id === "koblenz" ? "scrapbook" : undefined}>
                <div className="diary-heading">
                  <NotebookPen aria-hidden="true" size={20} />
                  <div>
                    <p>After the day</p>
                    <h4>Journal slots</h4>
                  </div>
                </div>
                <div className="diary-grid">
                  {stay.diary.map((entry) => (
                    <div className="diary-card" key={`${stay.id}-${entry.day}`}>
                      <span>{entry.day}</span>
                      <p>{entry.prompt}</p>
                      <div className="photo-slots" aria-label={`${entry.photoSlots} placeholder photo slots`}>
                        {Array.from({ length: entry.photoSlots }).map((_, index) => (
                          <div key={index}>
                            <Camera aria-hidden="true" size={16} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="future-section">
        <div>
          <SectionTitle kicker="Later, not v1" title="Photo diary options" />
          <p>
            Version one stays fast and static. The diary is local editable data, with placeholder image slots ready for the real trip.
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
    </main>
  );
}
