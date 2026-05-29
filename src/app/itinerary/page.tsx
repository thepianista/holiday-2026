import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bus,
  CalendarDays,
  Car,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Compass,
  CreditCard,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { itineraryItems, reservationPriority } from "@/data/trip";

const statusCopy: Record<string, string> = {
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

export default function ItineraryPage() {
  return (
    <main className="ops-page">
      <section className="ops-hero">
        <Link className="back-link" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Field guide
        </Link>
        <p className="eyebrow">Private trip operations</p>
        <h1>Itinerary</h1>
        <p>
          The practical view: what is booked, what needs choosing and how much each piece costs. Sensitive booking
          details (PNRs, confirmation codes, room numbers) stay in email, the airline app or phone wallet only.
        </p>
      </section>

      <section className="ops-summary" aria-label="Itinerary summary">
        <div>
          <CalendarDays aria-hidden="true" size={20} />
          <span>16 June to 4 July 2026 — 18 days total</span>
        </div>
        <div>
          <MapPin aria-hidden="true" size={20} />
          <span>Mexico City → Todos Santos → La Paz → Loreto → Bahía Concepción → Cabo Pulmo</span>
        </div>
        <div>
          <ShieldCheck aria-hidden="true" size={20} />
          <span>No PNRs or access codes stored here. Password-protected via HOLIDAY_SITE_PASSWORD on Vercel.</span>
        </div>
      </section>

      <section className="ops-layout">
        <aside className="ops-actions">
          <h2>Book in this order</h2>
          <div className="ops-action-list">
            {reservationPriority.map((action) => (
              <div key={action}>
                <CircleDashed aria-hidden="true" size={17} />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="ops-list" aria-label="Chronological itinerary">
          {itineraryItems.map((item) => {
            const Icon = typeIcons[item.type] ?? Sparkles;

            return (
              <article className="ops-card" key={`${item.date}-${item.title}`}>
                <div className="ops-date">
                  <span>{item.date}</span>
                  <strong className={`ops-status ${item.status.replace(" ", "-")}`}>{statusCopy[item.status]}</strong>
                </div>
                <div className="ops-card-body">
                  <div className="ops-icon">
                    <Icon aria-hidden="true" size={19} />
                  </div>
                  <div>
                    <p className="ops-type">{item.type}</p>
                    <h2>{item.title}</h2>
                    <div className="ops-place">
                      <MapPin aria-hidden="true" size={16} />
                      <span>{item.place}</span>
                    </div>
                    <p className="ops-note">{item.note}</p>
                    <div className="ops-facts">
                      {item.time ? (
                        <span>
                          <Clock3 aria-hidden="true" size={15} />
                          {item.time}
                        </span>
                      ) : null}
                      {item.bookedWith ? (
                        <span>
                          <CheckCircle2 aria-hidden="true" size={15} />
                          {item.bookedWith}
                        </span>
                      ) : null}
                      {item.cost ? (
                        <span>
                          <CreditCard aria-hidden="true" size={15} />
                          {item.cost}
                        </span>
                      ) : null}
                      {item.cancellation ? (
                        <span>
                          <CalendarDays aria-hidden="true" size={15} />
                          {item.cancellation}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
