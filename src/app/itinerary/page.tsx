import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  CreditCard,
  MapPin,
  ShieldCheck,
  Train,
} from "lucide-react";
import { itineraryItems } from "@/data/trip";

const statusCopy = {
  booked: "Booked",
  candidate: "Candidate",
  preferred: "Preferred",
  "to book": "To book",
  flexible: "Flexible",
};

const typeIcons = {
  train: Train,
  hotel: BedDouble,
  decision: CircleDashed,
  "day trip": MapPin,
};

const nextActions = [
  "Book or confirm Brussels to Koblenz.",
  "Choose the Koblenz to Heidelberg departure.",
  "Confirm Heidelberg to Freiburg transfer.",
  "Book Freiburg to Cologne and Cologne to Brussels when ready.",
  "Add homebound Eurostar details once booked.",
];

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
          The practical version: what is booked, what needs choosing, how it was booked and what it costs. Sensitive
          booking details stay in email, apps or phone wallet only.
        </p>
      </section>

      <section className="ops-summary" aria-label="Itinerary summary">
        <div>
          <CalendarDays aria-hidden="true" size={20} />
          <span>27 July to 6 August 2026</span>
        </div>
        <div>
          <Train aria-hidden="true" size={20} />
          <span>London, Koblenz, Heidelberg, Freiburg, Cologne, London</span>
        </div>
        <div>
          <ShieldCheck aria-hidden="true" size={20} />
          <span>No sensitive booking details or access codes are stored here</span>
        </div>
      </section>

      <section className="ops-layout">
        <aside className="ops-actions">
          <h2>Next checks</h2>
          <div className="ops-action-list">
            {nextActions.map((action) => (
              <div key={action}>
                <CircleDashed aria-hidden="true" size={17} />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="ops-list" aria-label="Chronological itinerary">
          {itineraryItems.map((item) => {
            const Icon = typeIcons[item.type];

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
