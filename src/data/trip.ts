export type Link = {
  label: string;
  href: string;
};

export type Activity = {
  title: string;
  note: string;
  pace: "easy" | "half day" | "rainy day" | "food" | "snorkel" | "dive" | "beach" | "hike";
  links?: Link[];
};

export type MapSite = {
  name: string;
  note: string;
  /** Geocodable Google Maps query used both for the embedded map and the per-site links. */
  query: string;
};

export type DiarySlot = {
  day: string;
  prompt: string;
  photoSlots: number;
};

export type HotelOption = {
  name: string;
  detail: string;
  status?: "booked" | "preferred" | "candidate" | "to book";
  price?: string;
  location?: string;
  parking?: string;
  breakfast?: string;
  map?: string;
  cancellation?: string;
  fit?: string;
  tradeoff?: string;
  links?: Link[];
};

export type StayBooking = {
  status: "booked" | "preferred" | "to book" | "flexible";
  recommendation: string;
  budget: string;
  cancellation: string;
  nextAction: string;
};

export type Stay = {
  id: string;
  city: string;
  chapter: string;
  dates: string;
  nights: number;
  mood: string;
  colour: string;
  stamp: string;
  booking: StayBooking;
  hotels?: HotelOption[];
  summary: string;
  travelIn?: string;
  travelOut?: string;
  links: Link[];
  thingsToDo: Activity[];
  foodIdeas: Activity[];
  rainyDayIdeas?: Activity[];
  snorkelSpots?: Activity[];
  diveSites?: Activity[];
  practical?: string[];
  diary?: DiarySlot[];
  sourceUrls?: string[];
};

export type Passenger = string;

export type FlightLeg = {
  id: string;
  passenger: Passenger;
  date: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  seat?: string;
  status: "booked" | "candidate" | "to book";
  note?: string;
};

export type GroundLeg = {
  id: string;
  date: string;
  mode: "drive" | "bus" | "boat";
  from: string;
  to: string;
  duration: string;
  passenger?: Passenger;
  note?: string;
  status: "planned" | "booked" | "to book";
};

export type DiveOperator = {
  region: "La Paz" | "Loreto" | "Cabo Pulmo";
  name: string;
  contact?: string;
  highlights: string;
  links?: Link[];
};

export type BookingPriority = {
  title: string;
  detail: string;
  status: "to book" | "planned" | "flexible";
};

export type BookingTask = {
  title: string;
  category: "Hotels" | "Transport" | "Activities" | "World Cup" | "Travel ops";
  owner: "Julian" | "Julian + Anja" | "Manuela" | "Everyone";
  deadline: string;
  status: "booked" | "to book" | "planned" | "flexible";
  detail: string;
};

export type Audience = "Everyone" | "Julian solo" | "Julian + Anja" | "Manuela";

export type ItineraryItem = {
  date: string;
  day: string;
  title: string;
  place: string;
  type: "flight" | "drive" | "bus" | "hotel" | "activity" | "decision";
  status: "booked" | "candidate" | "preferred" | "to book" | "flexible" | "planned";
  time?: string;
  bookedWith?: string;
  cost?: string;
  cancellation?: string;
  note: string;
  audience?: Audience;
  /** Marks the pre-trip Mexico City block (Julian only) so the Days view can fold it away. */
  group?: "cdmx";
  /** One-line headline shown on the collapsed day card. */
  summary?: string;
};

export type RouteLeg = {
  from: string;
  to: string;
  distance: string;
  duration: string;
  note?: string;
};

export type RouteOption = {
  id: string;
  name: string;
  tagline: string;
  status: "preferred" | "alternative";
  recommended?: boolean;
  /** Ordered, geocodable place names used to draw the driving route on the embedded map. */
  waypoints: string[];
  summary: string;
  sequence: string[];
  legs: RouteLeg[];
  manuExit: string;
  pros: string[];
  cons: string[];
};

export const heroStats = [
  { label: "Trip window", value: "16 June to 4 July 2026" },
  { label: "Route", value: "Mexico City, Todos Santos, La Paz, Loreto, Bahía Concepción, Cabo Pulmo" },
  { label: "Style", value: "City food crawl, Baja road trip, diving and snorkelling" },
];

export const flights: FlightLeg[] = [
  {
    id: "out-julian-1-ber-ams",
    passenger: "Julian",
    date: "Tue 16 Jun 2026",
    from: "Berlin Brandenburg",
    fromCode: "BER",
    to: "Amsterdam Schiphol",
    toCode: "AMS",
    airline: "KLM",
    flightNumber: "KL1782",
    departure: "19:15",
    arrival: "20:40",
    status: "booked",
    note: "Boeing 737-800, Economy. Connect at AMS (1h20 layover).",
  },
  {
    id: "out-julian-2-ams-mex",
    passenger: "Julian",
    date: "Tue 16 Jun 2026 → Wed 17 Jun",
    from: "Amsterdam Schiphol",
    fromCode: "AMS",
    to: "Mexico City Benito Juárez",
    toCode: "MEX",
    airline: "KL8990 (operated by Aeroméxico)",
    flightNumber: "KL8990",
    departure: "22:00",
    arrival: "01:55 (+1)",
    status: "booked",
    note: "Boeing 787-9. Lands ~02:00 local — taxi/Uber straight to the Roma Norte Airbnb.",
  },
  {
    id: "dom-mex-sjd-julian",
    passenger: "Julian",
    date: "Fri 19 Jun 2026",
    from: "Mexico City (Terminal 1)",
    fromCode: "MEX",
    to: "San José del Cabo",
    toCode: "SJD",
    airline: "VivaAerobus",
    flightNumber: "VB1212",
    departure: "06:10",
    arrival: "07:15",
    seat: "10F",
    status: "booked",
    note: "Smart fare: 25 kg checked + 15 kg cabin + 1 personal item. Web check-in opens 10 days before.",
  },
  {
    id: "anja-manu-ord-mex",
    passenger: "Anja & Manuela",
    date: "Fri 19 Jun 2026",
    from: "Chicago O'Hare",
    fromCode: "ORD",
    to: "Mexico City Benito Juárez",
    toCode: "MEX",
    airline: "Volaris",
    flightNumber: "Y4 703",
    departure: "01:40",
    arrival: "04:50",
    status: "booked",
    note: "Overnight ORD → MEX, Airbus A321/A320neo. Layover at MEX ~4h10 — long enough to clear immigration + grab breakfast at Terminal 1.",
  },
  {
    id: "anja-manu-mex-sjd",
    passenger: "Anja & Manuela",
    date: "Fri 19 Jun 2026",
    from: "Mexico City Benito Juárez",
    fromCode: "MEX",
    to: "San José del Cabo",
    toCode: "SJD",
    airline: "Volaris",
    flightNumber: "Y4 302",
    departure: "09:00",
    arrival: "10:09",
    status: "booked",
    note: "Connecting Volaris hop, A320neo. Lands SJD 10:09 — meet Julian (whose VB1212 from MEX landed at 07:15).",
  },
  {
    id: "manu-lto-lap-bus",
    passenger: "Manuela",
    date: "Fri 26 Jun 2026 (morning)",
    from: "Loreto bus terminal",
    fromCode: "LTO",
    to: "La Paz Aguila terminal",
    toCode: "LAP",
    airline: "Aguila bus (aguila.com.mx)",
    flightNumber: "Bus leg 1 of 2",
    departure: "~06:30 (check aguila.com.mx for exact slot)",
    arrival: "~11:30",
    status: "to book",
    note: "No direct flight LTO → SJD is cheap, so we route Manu via La Paz on Aguila buses. ~5h, around USD 30 (≈MXN 600). Book the seat in advance at aguila.com.mx.",
  },
  {
    id: "manu-lap-sjd-bus",
    passenger: "Manuela",
    date: "Fri 26 Jun 2026 (afternoon)",
    from: "La Paz",
    fromCode: "LAP",
    to: "San José del Cabo",
    toCode: "SJD",
    airline: "Aguila / Ruta del Cabo bus",
    flightNumber: "Bus leg 2 of 2",
    departure: "~14:00 (lunch break in La Paz first)",
    arrival: "~17:00",
    status: "to book",
    note: "Second Aguila leg. ~3h, around USD 25 (≈MXN 500). Drops her at the SJD bus terminal — short taxi to airport hotels. Total LTO → SJD travel ~10h door-to-door for ~USD 55, vs ~USD 250+ if flying.",
  },
  {
    id: "manu-sjd-ord-return",
    passenger: "Manuela",
    date: "Sat 27 Jun 2026",
    from: "San José del Cabo",
    fromCode: "SJD",
    to: "Chicago O'Hare",
    toCode: "ORD",
    airline: "United Airlines",
    flightNumber: "UA766",
    departure: "11:52",
    arrival: "18:09",
    status: "booked",
    note: "Direct nonstop, daily, A320 or 737-800 (~4h14). Manu should be at SJD by ~10:00 — recommended path is overnighting at a SJD airport hotel on 26 Jun.",
  },
  {
    id: "ret-1-sjd-atl",
    passenger: "Julian + Anja",
    date: "Sat 4 Jul 2026",
    from: "San José del Cabo",
    fromCode: "SJD",
    to: "Atlanta Hartsfield-Jackson",
    toCode: "ATL",
    airline: "KL5375 (operated by Delta Air Lines)",
    flightNumber: "KL5375",
    departure: "13:30",
    arrival: "20:35",
    status: "booked",
    note: "Be at SJD by 11:30 — Payless rental return is at 11:00 same morning. Anja is on this KLM ticket with Julian (only her outbound was via ORD).",
  },
  {
    id: "ret-2-atl-ams",
    passenger: "Julian + Anja",
    date: "Sat 4 Jul 2026 → Sun 5 Jul",
    from: "Atlanta Hartsfield-Jackson",
    fromCode: "ATL",
    to: "Amsterdam Schiphol",
    toCode: "AMS",
    airline: "KLM",
    flightNumber: "KL0622",
    departure: "22:40",
    arrival: "13:10 (+1)",
    status: "booked",
    note: "Boeing 777-300ER, Economy. 2h05 layover at ATL is tight but fine for SkyTeam.",
  },
  {
    id: "ret-3-ams-ber",
    passenger: "Julian + Anja",
    date: "Sun 5 Jul 2026",
    from: "Amsterdam Schiphol",
    fromCode: "AMS",
    to: "Berlin Brandenburg",
    toCode: "BER",
    airline: "KLM",
    flightNumber: "KL1779",
    departure: "15:10",
    arrival: "16:30",
    status: "booked",
    note: "Boeing 737-800, Economy. Home by ~17:30 with luggage.",
  },
];

export type CarRental = {
  operator: string;
  broker?: string;
  category: string;
  pickup: { date: string; time: string; location: string };
  dropoff: { date: string; time: string; location: string };
  inclusions: string[];
  notes: string[];
};

export const carRental: CarRental = {
  operator: "Payless",
  broker: "GotRentalCars.com (booked via Check24)",
  category: "VW Tiguan or similar (SFAR — 4 doors, 5 seats, automatic, A/C)",
  pickup: {
    date: "Fri 19 Jun 2026",
    time: "07:30",
    location: "SJD Airport (Carretera Entronque al APO, Col Las Veredas)",
  },
  dropoff: {
    date: "Sat 4 Jul 2026",
    time: "11:00",
    location: "SJD Airport",
  },
  inclusions: [
    "Liability cover up to EUR 1.1M",
    "Full collision & theft, zero deductible (paid back via the broker)",
    "Glass / tyres / underbody / roof included",
    "Unlimited kilometres",
    "1 additional driver",
  ],
  notes: [
    "Allow ~30 min for the airport-to-counter shuttle on arrival.",
    "Bring a credit card in the main driver's name — deposit ~EUR 1,000 + fuel deposit.",
    "Mexican mandatory insurance is included via the broker — confirm at the counter before signing.",
  ],
};

export const groundLegs: GroundLeg[] = [
  {
    id: "sjd-pescadero",
    date: "19 Jun",
    mode: "drive",
    from: "SJD airport",
    to: "Todos Santos",
    duration: "1h30",
    note: "Pick up the Payless VW Tiguan at SJD 07:30 — confirm Mexican mandatory insurance + glass/tyres cover at the counter. Lunch + first beach at Cerritos en route.",
    status: "planned",
  },
  {
    id: "pescadero-lapaz",
    date: "21 Jun",
    mode: "drive",
    from: "Todos Santos",
    to: "La Paz",
    duration: "1h15",
    status: "planned",
  },
  {
    id: "lapaz-loreto",
    date: "24 Jun",
    mode: "drive",
    from: "La Paz",
    to: "Loreto",
    duration: "4h30",
    note: "Sierra de la Giganta scenic drive. Fuel up in Ciudad Constitución.",
    status: "planned",
  },
  {
    id: "manu-lto-sjd",
    date: "26 Jun",
    mode: "bus",
    from: "Loreto",
    to: "San José del Cabo",
    duration: "~10h via La Paz (06:30 → ~17:00)",
    passenger: "Manuela",
    note: "Two Aguila buses: LTO → LAP (~5h, USD 30) then LAP → SJD (~3h, USD 25), with lunch in La Paz between. Overnight at SJD airport hotel, then UA766 at 11:52 on 27 Jun.",
    status: "to book",
  },
  {
    id: "loreto-bahia",
    date: "27 Jun",
    mode: "drive",
    from: "Loreto",
    to: "Bahía Concepción",
    duration: "1h30",
    note: "Continue north after Manu has caught her LTO connector.",
    status: "planned",
  },
  {
    id: "bahia-lapaz",
    date: "30 Jun",
    mode: "drive",
    from: "Bahía Concepción",
    to: "La Paz",
    duration: "6h",
    note: "Long leg — leave at dawn, fuel break in Loreto.",
    status: "planned",
  },
  {
    id: "lapaz-cabopulmo",
    date: "1 Jul",
    mode: "drive",
    from: "La Paz",
    to: "Cabo Pulmo",
    duration: "3h",
    note: "Last 10 km is unpaved. Top up cash before leaving La Paz — no ATM in Cabo Pulmo.",
    status: "planned",
  },
  {
    id: "cabopulmo-sjd",
    date: "4 Jul",
    mode: "drive",
    from: "Cabo Pulmo",
    to: "SJD airport",
    duration: "2h30",
    note: "Leave by 07:30 — Payless return slot is 11:00, KLM SJD→ATL departs 13:30.",
    status: "planned",
  },
];

export const diveOperators: DiveOperator[] = [
  {
    region: "La Paz",
    name: "Fun Baja",
    highlights:
      "Friend tip for La Paz diving. Worth checking for Espíritu Santo / Balandra-style days and pickup logistics before choosing.",
    links: [{ label: "Website", href: "https://www.funbaja.com/" }],
  },
  {
    region: "La Paz",
    name: "Dive in La Paz (Alexia)",
    highlights: "Boutique operator. Fang Ming wreck, Swanee Reef, day trips to La Reina for mantas (Apr–Jul).",
    links: [{ label: "Website", href: "https://www.diveinlapaz.com/" }],
  },
  {
    region: "La Paz",
    name: "Sea Lions Dive Center",
    highlights: "Reliable Espíritu Santo day boats. Good for mixed levels.",
    links: [{ label: "Website", href: "https://www.sealionsdivecenter.com/" }],
  },
  {
    region: "La Paz",
    name: "Divewithus (Gael)",
    highlights: "Small-group operator, French-speaking. El Bajo trips when conditions align.",
  },
  {
    region: "Loreto",
    name: "Blue Nation Diving (Yago)",
    highlights: "Marine Park specialists: Coronado, Danzante, Punta Lobos, Las Tijeras.",
    links: [{ label: "Website", href: "https://www.bluenation-loreto.com/" }],
  },
  {
    region: "Loreto",
    name: "Dolphin Dive Baja",
    highlights: "Long-running Loreto operator. Good for Las Tijeras and family-style boats.",
  },
  {
    region: "Cabo Pulmo",
    name: "Dive Cabo Pulmo (César)",
    highlights: "El Bajo, El Vencedor wreck, Cantil del Tiburón. Bull shark aggregation in summer.",
    links: [{ label: "Website", href: "https://www.divecabopulmo.com/" }],
  },
  {
    region: "Cabo Pulmo",
    name: "Cabo Pulmo Divers (Mario)",
    highlights: "Reef-focused dives, easy access from the village.",
  },
];

export const snorkelSpots: Activity[] = [
  {
    title: "Los Arbolitos · Cabo Pulmo (shore)",
    note: "Best shore snorkel of the trip. Reef starts a few metres out, ~$5 entry. Bring your own gear.",
    pace: "snorkel",
  },
  {
    title: "Los Frailes · Cabo Pulmo (shore)",
    note: "South end of the bay, northern rocky tip. Sheltered when the wind comes from the north.",
    pace: "snorkel",
  },
  {
    title: "Playa el Coyote · Bahía Concepción (shore)",
    note: "Rocky tips of the bay: pufferfish and sergeant majors. Kayak across for variety.",
    pace: "snorkel",
  },
  {
    title: "Playa Santispac · Bahía Concepción (shore)",
    note: "North end has a small hot spring and decent reef edges.",
    pace: "snorkel",
  },
  {
    title: "Playa Balandra · La Paz (shore)",
    note: "Shallow and landscape-led rather than fish-rich, but the mushroom rock is unmissable.",
    pace: "snorkel",
  },
  {
    title: "Cabo Pulmo reef tour (boat)",
    note: "Boat tour to the main reef. Bull sharks and turtles likely; sea lions only outside protected zones.",
    pace: "snorkel",
  },
  {
    title: "Isla Coronado / Danzante · Loreto (boat)",
    note: "Sheltered coves, clear water, classic Marine Park snorkel circuit.",
    pace: "snorkel",
  },
  {
    title: "Espíritu Santo · La Paz (boat)",
    note: "Ensenada Grande and Playa Bonanza reefs. Note: Los Islotes sea lion site is closed 1 Jun – 1 Sep (breeding).",
    pace: "snorkel",
  },
  {
    title: "Playa el Burro inlet · Bahía Concepción (kayak)",
    note: "Kayak out to the small island and snorkel around it.",
    pace: "snorkel",
  },
];

export const beachShortlist: Activity[] = [
  {
    title: "Playa Balandra · La Paz",
    note: "Most photogenic bay of the trip. Go for the afternoon slot if the schedule allows; shallow water, mushroom rock and an easy viewpoint.",
    pace: "beach",
  },
  {
    title: "Los Arbolitos · Cabo Pulmo",
    note: "Beach plus the best shore snorkel. Simple facilities, reef starts close to shore, better mid-morning than late afternoon.",
    pace: "beach",
  },
  {
    title: "Los Frailes · Cabo Pulmo",
    note: "Wilder, quieter beach south of the village. Good fallback if Los Arbolitos is windy or too busy.",
    pace: "beach",
  },
  {
    title: "Playa el Coyote · Bahía Concepción",
    note: "Classic turquoise Bahía Concepción stop: kayak, swim, snorkel rocky edges and keep it slow.",
    pace: "beach",
  },
  {
    title: "Playa Santispac · Bahía Concepción",
    note: "Easy beach day with palapas, a small hot spring near the rocks and simple food close by.",
    pace: "beach",
  },
  {
    title: "Playa Cerritos · Todos Santos",
    note: "Best first Baja sunset. Better as surf-beach atmosphere than a calm swimming beach because rip currents can be strong.",
    pace: "beach",
  },
];

export const hikeAndWalkIdeas: Activity[] = [
  {
    title: "Balandra viewpoint trail",
    note: "Short sandy climb above the bay for the postcard view. Do it before the strongest midday heat.",
    pace: "hike",
  },
  {
    title: "Mirador Sierra de la Giganta · Loreto",
    note: "Sunrise lookout outside Loreto. More viewpoint than hard hike, but worth an early alarm for the bay and mountain light.",
    pace: "hike",
  },
  {
    title: "Mulegé mission + river walk",
    note: "Low-effort half-day when you need shade and a break from driving: mission, river, market and lunch in town.",
    pace: "easy",
  },
  {
    title: "Roma + Condesa evening loop",
    note: "Parque México → Avenida Amsterdam → Plaza Río de Janeiro → Roma Norte dinner. The easy city walk after heavy sightseeing.",
    pace: "easy",
  },
  {
    title: "Los Frailes coastal walk",
    note: "Simple beach walk south of Cabo Pulmo. Go early or around golden hour; bring water and keep it casual.",
    pace: "hike",
  },
];

/** The most important sites to visit around the Zócalo, ordered as a walkable circuit. */
export const zocaloSites: MapSite[] = [
  {
    name: "Plaza de la Constitución (Zócalo)",
    note: "The vast main square at the heart of the Centro Histórico — and the FIFA Fan Festival (Fanmeile) site.",
    query: "Plaza de la Constitución, Centro Histórico, Ciudad de México",
  },
  {
    name: "Catedral Metropolitana",
    note: "The largest cathedral in the Americas, filling the north side of the Zócalo.",
    query: "Catedral Metropolitana, Centro Histórico, Ciudad de México",
  },
  {
    name: "Templo Mayor",
    note: "Excavated Aztec great temple and its museum, just behind the cathedral.",
    query: "Templo Mayor, Centro Histórico, Ciudad de México",
  },
  {
    name: "Palacio Nacional",
    note: "Diego Rivera's epic history murals line the main staircase — free entry, bring photo ID.",
    query: "Palacio Nacional, Centro Histórico, Ciudad de México",
  },
  {
    name: "Casa de los Azulejos",
    note: "The blue-and-white tiled palace (now a Sanborns) — an easy coffee or lunch stop on the walk west.",
    query: "Casa de los Azulejos, Centro Histórico, Ciudad de México",
  },
  {
    name: "Palacio de Bellas Artes",
    note: "The marble art-nouveau concert hall and mural museum, a few blocks west of the square.",
    query: "Palacio de Bellas Artes, Ciudad de México",
  },
  {
    name: "Torre Latinoamericana",
    note: "1950s tower with the best open-air view over the Centro from the 44th-floor mirador.",
    query: "Torre Latinoamericana, Ciudad de México",
  },
];

export const bookingChecklist: BookingTask[] = [
  {
    title: "World Cup nights in CDMX",
    category: "World Cup",
    owner: "Julian",
    deadline: "No ticket needed (fan zones)",
    status: "planned",
    detail:
      "Match-watching is at the fan zones: England v Croatia at the Zócalo Fan Festival on 17 Jun, then Colombia on Paseo de la Reforma the same night, and the crowd at the Ángel de la Independencia on 18 Jun. Only Casa Azul (Coyoacán, 18 Jun) needs a pre-booked slot.",
  },
  {
    title: "Todos Santos stay",
    category: "Hotels",
    owner: "Everyone",
    deadline: "Done",
    status: "booked",
    detail:
      "Estudio con Terraza booked via Booking.com for 19–21 Jun: studio with terrace, 3 adults, US$318.73 total, free cancellation until 11 Jun 23:59 MST.",
  },
  {
    title: "La Paz stay",
    category: "Hotels",
    owner: "Everyone",
    deadline: "Book after Todos Santos",
    status: "to book",
    detail:
      "Check Hotel Catedral first, then El Moro/HBlue if price, parking or dive pickup logistics are better.",
  },
  {
    title: "Loreto stay",
    category: "Hotels",
    owner: "Everyone",
    deadline: "Soon — small inventory",
    status: "to book",
    detail: "Loreto Playa Boutique is preferred, but only five rooms. Book refundable if the price is acceptable.",
  },
  {
    title: "Manu's Loreto → SJD bridge",
    category: "Transport",
    owner: "Manuela",
    deadline: "After route decision",
    status: "to book",
    detail:
      "Aguila LTO → LAP + LAP → SJD on 26 Jun, plus a reliable SJD airport-area hotel for the overnight.",
  },
  {
    title: "Espíritu Santo boat",
    category: "Activities",
    owner: "Everyone",
    deadline: "1–2 weeks ahead",
    status: "to book",
    detail: "Book a non-Los-Islotes route because sea lion zone is closed 1 Jun to 1 Sep.",
  },
  {
    title: "Cabo Pulmo sleep + dives",
    category: "Activities",
    owner: "Julian + Anja",
    deadline: "High priority",
    status: "to book",
    detail:
      "Reserve accommodation and dive operator together. Small village, limited rooms and boat seats.",
  },
  {
    title: "Travel basics",
    category: "Travel ops",
    owner: "Everyone",
    deadline: "Before departure",
    status: "planned",
    detail: "Airalo eSIM, offline maps, cash plan for Bahía/Cabo Pulmo and rental-car counter checklist.",
  },
];

export const nextBookings: BookingPriority[] = [
  {
    title: "World Cup nights in CDMX",
    detail:
      "17 Jun: England v Croatia at the Zócalo FIFA Fan Festival (Fanmeile), then the Colombia match on Paseo de la Reforma. 18 Jun: evening with the crowd at the Ángel de la Independencia. Fan-zone days — no stadium ticket needed.",
    status: "planned",
  },
  {
    title: "Manu's Loreto → SJD bridge",
    detail:
      "Aguila buses LTO → LAP and LAP → SJD on 26 Jun, plus one reliable SJD airport-area hotel before UA766.",
    status: "to book",
  },
  {
    title: "Cabo Pulmo base + dives",
    detail:
      "Book accommodation and the first operator slot together. Small village, small boats, not much backup inventory.",
    status: "to book",
  },
  {
    title: "CDMX timed entries",
    detail:
      "Optional Teotihuacán balloon (18 Jun) and, if you want it, the Casa Azul timed slot for the Coyoacán afternoon (18 Jun). Palacio Nacional Diego Rivera murals are free walk-in on 17 Jun.",
    status: "to book",
  },
  {
    title: "La Paz water days",
    detail:
      "Espíritu Santo boat and one dive day. Fun Baja is a friend tip; Dive in La Paz stays the boutique fallback.",
    status: "planned",
  },
];

export const stays: Stay[] = [
  {
    id: "mexico-city",
    city: "Mexico City",
    chapter: "Chapter 1",
    dates: "16 to 19 June",
    nights: 3,
    mood: "Tacos, Roma walks and a slow start to the trip",
    colour: "var(--chapter-ink)",
    stamp: "CDMX · Roma + Condesa",
    booking: {
      status: "booked",
      recommendation: "Keep the Roma Norte Airbnb as the fixed city base.",
      budget: "Booked",
      cancellation: "Check Airbnb cancellation in the app, not in this repo.",
      nextAction: "Add check-in instructions to Wallet/Notes, not here.",
    },
    hotels: [
      {
        name: "Independent Small Rooftop Studio (Airbnb)",
        detail:
          "Roma Norte — 39 Calle Cuernavaca, 06140. Hosts: Lorenza & Mercedes. Check-in from 11:00 on 16 Jun, check-out by 11:00 on 19 Jun.",
        status: "booked",
        location: "Roma Norte, walkable to food and evening routes.",
        parking: "Not needed in CDMX.",
        breakfast: "Self-cater / cafes nearby.",
        fit: "Already solved; low-friction solo base after late arrival.",
        map: "https://maps.google.com/?q=39+Calle+Cuernavaca,+06140+Ciudad+de+M%C3%A9xico",
      },
    ],
    summary:
      "Three nights to land softly: altitude, language, big lunches and walking neighbourhoods. Roma Norte and Condesa are the calmest, food-densest bases.",
    travelIn: "Arrive into MEX on the evening of 16 June. Uber/Cabify into Roma Norte — about 45 min depending on traffic.",
    travelOut: "Short flight MEX → SJD on the morning of 19 June, then drive to Todos Santos (lunch + beach at Cerritos en route).",
    links: [
      { label: "CDMX tourism", href: "https://www.cdmx.gob.mx/turismo" },
      { label: "Roma Norte guide", href: "https://eatingaround.com.mx/" },
      { label: "MEX airport", href: "https://www.aicm.com.mx/" },
    ],
    thingsToDo: [
      {
        title: "Today — Breakfast at Lardo, then up to Castillo de Chapultepec",
        note: "Start at 07:00 with breakfast at Lardo in Condesa, then walk up through Bosque de Chapultepec to the Castillo de Chapultepec — the only royal castle in the Americas, with hilltop views over Reforma and the Museo Nacional de Historia inside.",
        pace: "easy",
        links: [
          { label: "Lardo (map)", href: "https://www.google.com/maps/search/?api=1&query=Lardo+Condesa+Ciudad+de+M%C3%A9xico" },
          { label: "Castillo de Chapultepec (map)", href: "https://www.google.com/maps/search/?api=1&query=Castillo+de+Chapultepec" },
        ],
      },
      {
        title: "Today — Museo Nacional de Antropología",
        note: "From the castle, cross Bosque de Chapultepec to the Museo Nacional de Antropología — the country's flagship museum, easily 2.5–3 hours (the Sala Mexica and the Sun Stone are the must-sees). Then head east to the Centro for the afternoon.",
        pace: "half day",
        links: [{ label: "Museum", href: "https://www.mna.inah.gob.mx/" }],
      },
      {
        title: "Today — Zócalo & Centro Histórico sites + lunch",
        note: "Walk the most important sites around the Zócalo: Catedral Metropolitana, Templo Mayor and the Diego Rivera murals at Palacio Nacional (free, bring photo ID), with Casa de los Azulejos, Bellas Artes and the Torre Latinoamericana mirador a few blocks west. See the map below for the walking circuit. Lunch on the square at Café de Tacuba or El Cardenal — right where the Fan Festival is.",
        pace: "half day",
        links: [
          { label: "Templo Mayor", href: "https://www.templomayor.inah.gob.mx/" },
          { label: "Palacio Nacional", href: "https://www.gob.mx/cultura/palacionacional" },
        ],
      },
      {
        title: "Today — Zócalo Fan Festival: England v Croatia",
        note:
          "Straight after lunch, into the FIFA Fan Festival (the Fanmeile) on the Zócalo to watch England v Croatia on the big screen with the crowd. The official festival sits on the main square, a few steps from the Centro sights.",
        pace: "half day",
        links: [
          {
            label: "Fan Festival",
            href: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/fifa-fan-festival/mexico-city",
          },
        ],
      },
      {
        title: "Tonight — Roma/Condesa wander + Colombia match on Reforma",
        note:
          "Back to Roma/Condesa for a neighbourhood loop: Parque México → Avenida Amsterdam → Plaza Río de Janeiro and a Roma Norte bite. Then out to Paseo de la Reforma to watch the Colombia match with the street crowd.",
        pace: "easy",
      },
      {
        title: "Tomorrow — Early ride to Teotihuacán",
        note: "Early ride out to Teotihuacán to walk the Avenue of the Dead and the Sun and Moon pyramids before the heat and crowds (optional sunrise hot-air balloon ~MXN 1,990, book 1–2 weeks ahead). Hire a guide at the entrance, then back in the city by early afternoon.",
        pace: "half day",
        links: [
          { label: "INAH info", href: "https://www.inah.gob.mx/zonas/82-zona-arqueologica-de-teotihuacan" },
          { label: "WeFly balloon", href: "https://wefly.com.mx/en/teotihuacan/" },
        ],
      },
      {
        title: "Tomorrow — Afternoon in Coyoacán",
        note: "Afternoon in Coyoacán: cobbled streets, Jardín Centenario and Plaza Hidalgo, the Mercado de Coyoacán for tostadas, and Casa Azul (Frida Kahlo) if you pre-book the timed slot — it sells out daily.",
        pace: "half day",
        links: [{ label: "Casa Azul tickets", href: "https://www.museofridakahlo.org.mx/" }],
      },
      {
        title: "Tomorrow night — Ángel de la Independencia, Reforma",
        note:
          "Evening football with the crowd at the Ángel de la Independencia on Paseo de la Reforma — the city's celebration gathering point when the big teams play.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Contramar",
        note: "Lunch only. Pescado a la talla and tuna tostadas. Book ahead.",
        pace: "food",
        links: [{ label: "Contramar", href: "https://contramar.com.mx/" }],
      },
      {
        title: "Pujol",
        note: "Tasting menu, Enrique Olvera. Book 6+ weeks ahead.",
        pace: "food",
        links: [{ label: "Pujol", href: "https://pujol.com.mx/" }],
      },
      {
        title: "El Califa de León / El Califa",
        note: "Classic late-night tacos al pastor. Stand-up counter or sit-down branches in Condesa.",
        pace: "food",
      },
      {
        title: "Lardo · Condesa",
        note: "Brunch and pizza from Elena Reygadas. Walk-in friendly mid-week.",
        pace: "food",
      },
      {
        title: "Taquería Orinoco",
        note: "Friend tip for casual Roma/Condesa tacos. Easy late option after a walk, less formal than a reservation dinner.",
        pace: "food",
      },
      {
        title: "Blanco Colima",
        note: "Roma Norte favourite from the screenshot tips. Better as a proper dinner or cocktail stop than a quick bite.",
        pace: "food",
      },
      {
        title: "Caimán",
        note: "Pre-drinks / copas in Roma Norte. Works before Jardín Paraíso if you still have energy.",
        pace: "food",
      },
      {
        title: "Jardín Paraíso",
        note: "Dancing + drinks option. Fun, but only if Friday's 03:30 airport alarm is not already painful.",
        pace: "food",
      },
      {
        title: "Maximo Bistrot",
        note: "Roma Norte staple. Seasonal, low-key elegant. Reservation recommended.",
        pace: "food",
        links: [{ label: "Maximo", href: "https://maximobistrot.com.mx/" }],
      },
      {
        title: "Mercado Roma",
        note: "Stalls for a quick taco, mezcal flight or oysters. Good for a low-effort lunch.",
        pace: "food",
      },
    ],
    practical: [
      "Buy an Airalo Mexico eSIM at home before flying (1 GB / 7d ≈ USD 4.50, 5 GB / 30d ≈ USD 16). Install + leave inactive; switch on at the gate when you land at MEX — online in 30 seconds, book Uber from baggage claim.",
      "MEX arrival logistics (lands ~02:00): free airport Wi-Fi works for booking Uber as a fallback. T1 official rideshare pickup zone is Salida 8 / Door 8, ground level. Uber MEX → Roma Norte ≈ USD 15–20, ~30 min at that hour.",
      "Altitude 2,240 m — go easy on alcohol the first night.",
      "Uber and Cabify both work well. Avoid street taxis at night.",
      "Tipping: ~10–15% in restaurants, 10 pesos per bag for porters.",
      "Tap water no, bottled or filtered yes. Ice in established restaurants is fine.",
      "Friday morning departure: VB1212 06:10 means leaving Roma Norte by 03:30 in an Uber — Thursday dinner light and early, in bed by 22:00.",
    ],
  },
  {
    id: "pescadero",
    city: "Todos Santos",
    chapter: "Chapter 2",
    dates: "19 to 21 June",
    nights: 2,
    mood: "Pacific surf beach + a slow Baja arrival",
    colour: "var(--chapter-gold)",
    stamp: "Pacific · Sunsets",
    booking: {
      status: "booked",
      recommendation: "Estudio con Terraza is booked as the practical Todos Santos base.",
      budget: "US$318.73 total for 2 nights after Booking.com contribution; property invoice may show US$341.50.",
      cancellation: "Free cancellation until 11 Jun 2026, 23:59 MST; then 50% until arrival day, full price for no-show.",
      nextAction: "Send arrival time to the property and watch for the door code shortly before check-in.",
    },
    hotels: [
      {
        name: "Estudio con Terraza",
        detail: "Booked studio with terrace for Julian, Anja and Manuela.",
        status: "booked",
        price: "US$318.73 total via Booking.com; 2 nights, 3 adults.",
        location: "Heroico Colegio Militar 2, 23300 Todos Santos, Mexico.",
        parking: "Check with the property if needed.",
        breakfast: "No meal included.",
        cancellation: "Free until 11 Jun 2026 23:59 MST; 50% fee from 12 Jun; full price/no-show from arrival day.",
        fit: "Practical pueblo base for the first Baja arrival days.",
        tradeoff: "Door code is sent shortly before arrival; arrival time should be shared in advance.",
        links: [{ label: "Booking page", href: "https://www.booking.com/hotel/mx/suite-en-el-centro-de-todos-santos.es.html" }],
      },
    ],
    summary:
      "Two nights booked at Estudio con Terraza in Todos Santos. Day 1 is airport → Barracuda Cantina at Cerritos for lunch → afternoon on Cerritos beach → check in between 15:00 and 20:30. Then the pueblo, galleries and a first proper Baja sunset.",
    travelIn: "Drive SJD → Cerritos (~1h) for lunch + beach, then on to Estudio con Terraza for check-in from 15:00.",
    travelOut: "Drive Todos Santos → La Paz (~1h15) on 21 June.",
    links: [
      { label: "Todos Santos guide", href: "https://www.todossantos.cc/" },
      { label: "Playa Cerritos info", href: "https://www.discoverbaja.com/cerritos-beach/" },
    ],
    thingsToDo: [
      {
        title: "Playa Las Pocitas / San Pedrito",
        note: "Best swimmable beaches near Pescadero. Cerritos itself has surf and rip currents.",
        pace: "easy",
      },
      {
        title: "Todos Santos pueblo wander",
        note: "Hotel California, galleries, cafés, the old mission. Half-day pace.",
        pace: "half day",
      },
      {
        title: "Sunset at Playa Cerritos",
        note: "Best with a cold beer at one of the beach palapas.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Barracuda Cantina · Cerritos",
        note: "Strong friend tip from the screenshot. Beach-bar tacos, tostadas and a good first Baja dinner right by Cerritos.",
        pace: "food",
        links: [{ label: "Barracuda", href: "https://www.barracudacantina.com/" }],
      },
      {
        title: "Las Tunas Villas & Grill",
        note: "Family-run, grilled fish, the real deal.",
        pace: "food",
      },
      {
        title: "Mejibó",
        note: "Modern Mexican, catch of the day. Reserve.",
        pace: "food",
      },
      {
        title: "La Generala",
        note: "Garden-set Mexican breakfast buffet — solid value.",
        pace: "food",
      },
      {
        title: "Oystera",
        note: "Oyster bar inside an old sugar mill in Todos Santos.",
        pace: "food",
      },
      {
        title: "DŪM",
        note: "Fine dining, menu changes with the moon. Reservation a must.",
        pace: "food",
      },
    ],
  },
  {
    id: "la-paz",
    city: "La Paz",
    chapter: "Chapter 3",
    dates: "21 to 24 June",
    nights: 3,
    mood: "Bay city, Espíritu Santo and the first dive day",
    colour: "var(--chapter-rhine)",
    stamp: "La Paz · Sea of Cortez",
    booking: {
      status: "to book",
      recommendation: "Hotel Catedral is the current best fit: pool, central, useful without feeling flashy.",
      budget: "Target under USD 100/night; stretch only for clear pool/location value.",
      cancellation: "Prefer refundable until 7 days out.",
      nextAction: "Check Catedral vs El Moro pricing and dive pickup logistics.",
    },
    hotels: [
      {
        name: "Hotel Catedral La Paz",
        detail: "Best mid-range bet. Rooftop pool, quieter than the Malecón hotels.",
        status: "candidate",
        price: "Check; likely near/stretch target",
        location: "Centro, quieter than Malecón but still walkable.",
        parking: "Confirm parking.",
        breakfast: "Often included; verify rate.",
        fit: "Best balance: pool plus practical city base.",
        links: [{ label: "Hotel Catedral", href: "https://hotelcatedrallapaz.com/" }],
      },
      {
        name: "Casa al Mar",
        detail: "Boutique directly on the Malecón. Loud on weekends.",
        status: "candidate",
        price: "Likely above target",
        location: "Malecón-front; lively/noisy.",
        parking: "Confirm.",
        breakfast: "Check.",
        fit: "Good view, but probably too boutique and loud.",
      },
      {
        name: "Hotel Suites El Moro",
        detail:
          "Friend tip from a previous dive stay. Practical if the dive operator pickup is nearby; for a couple trip, Centro/Malecón hotels still feel nicer.",
        status: "candidate",
        price: "Often value-friendly",
        location: "Practical if operator pickup is nearby.",
        parking: "Likely easier than Centro.",
        breakfast: "Check.",
        fit: "Most functional friend-tip option; less charming.",
      },
      {
        name: "Malecón 1680",
        detail: "Modern apartments with kitchens. Useful for longer stays.",
        status: "candidate",
        price: "Check",
        location: "Malecón side.",
        parking: "Confirm.",
        breakfast: "Apartment setup; likely none.",
        fit: "Useful if kitchen/space beats hotel services.",
      },
      {
        name: "HBlue Malecón",
        detail: "Rooftop bar, eastern Malecón end, slightly quieter.",
        status: "candidate",
        price: "Check",
        location: "Eastern Malecón, slightly calmer.",
        parking: "Confirm.",
        breakfast: "Check.",
        fit: "Pool/rooftop value if Catedral is too expensive.",
      },
    ],
    summary:
      "Three nights with a boat day to Espíritu Santo, the first dive day with Mantas possible at La Reina, and Balandra for an afternoon.",
    travelIn: "Drive from Todos Santos on 21 June (~1h15).",
    travelOut: "Drive to Loreto on 24 June (~4h30) via the Sierra de la Giganta.",
    links: [
      { label: "La Paz tourism", href: "https://www.golapaz.com/" },
      { label: "Balandra info", href: "https://www.gob.mx/conanp/articulos/playa-balandra" },
      { label: "Punta Baja tours", href: "https://www.puntabajatours.com/" },
    ],
    thingsToDo: [
      {
        title: "Playa Balandra (afternoon)",
        note: "Reservation slots are 8:00 and 12:00 — be there early. The mushroom rock and shallow lagoon.",
        pace: "half day",
        links: [{ label: "Balandra reservation", href: "https://www.gob.mx/conanp/articulos/playa-balandra" }],
      },
      {
        title: "Espíritu Santo boat tour",
        note: "Ensenada Grande, Playa Bonanza. **Los Islotes is closed 1 Jun – 1 Sep** for the sea lion breeding season.",
        pace: "half day",
        links: [
          { label: "Punta Baja", href: "https://www.puntabajatours.com/" },
          { label: "Mar y Aventuras", href: "https://www.kayakbaja.com/" },
          { label: "Alonso Tours", href: "https://alonsotours.com/" },
        ],
      },
      {
        title: "Malecón sunset walk",
        note: "The 5 km waterfront promenade with bronze sculptures. Best from 18:00 onwards.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "El Pez Baja",
        note: "Small new marisco spot — the freshest in town.",
        pace: "food",
      },
      {
        title: "Anzuelo Cocina del Mar",
        note: "Harbour-side, sashimi tostadas, ceviches.",
        pace: "food",
      },
      {
        title: "Tatanka Baja",
        note: "Hidden-alley steak + seafood, often live music.",
        pace: "food",
      },
      {
        title: "Oyster House",
        note: "Oysters and sashimi, properly local.",
        pace: "food",
      },
      {
        title: "Casamarte Oyster Bar",
        note: "Right on the Malecón with sea view.",
        pace: "food",
      },
    ],
    diveSites: [
      {
        title: "Fang Ming Wreck",
        note: "Sunken ship at ~25 m. Good visibility, easy navigation, lots of life.",
        pace: "dive",
      },
      {
        title: "Swanee Reef",
        note: "Easy reef site, often combined with Fang Ming as a two-tank morning.",
        pace: "dive",
      },
      {
        title: "La Reina (Manta season Apr–Jul)",
        note: "Long boat ride, but the best chance for giant mantas. Worth booking the dedicated day trip.",
        pace: "dive",
      },
    ],
  },
  {
    id: "loreto",
    city: "Loreto",
    chapter: "Chapter 4",
    dates: "24 to 27 June",
    nights: 3,
    mood: "Marine Park, mission town and dive day two",
    colour: "var(--chapter-forest)",
    stamp: "Loreto · Marine Park",
    booking: {
      status: "preferred",
      recommendation: "Loreto Playa Boutique is the preferred small-base option.",
      budget: "Check against USD 100 target; inventory is only 5 rooms.",
      cancellation: "Book refundable if available.",
      nextAction: "Check exact room availability before it disappears.",
    },
    hotels: [
      {
        name: "Loreto Playa Boutique Hotel",
        detail: "Five rooms, very personal service, on the Malecón, small pool.",
        status: "preferred",
        price: "Check; may stretch target",
        location: "Malecón, easy town access.",
        parking: "Confirm.",
        breakfast: "Check.",
        fit: "Small, personal, pool: closest to the preferred stay vibe.",
      },
    ],
    summary:
      "Three nights based in the old mission town. One boat day in the Marine Park (Coronado / Danzante), one dive day and an evening in the pueblo.",
    travelIn: "Drive from La Paz on 24 June (~4h30) via Ciudad Constitución.",
    travelOut: "26 June: Manuela leaves early on the Aguila bus south (LTO → LAP → SJD, ~10h). 27 June: she catches UA766 SJD → ORD 11:52; Julian + Anja drive north to Bahía Concepción.",
    links: [
      { label: "Loreto tourism", href: "https://www.gotoloreto.com/" },
      { label: "Marine Park info", href: "https://www.gob.mx/conanp/acciones-y-programas/parque-nacional-bahia-de-loreto" },
      { label: "Aguila bus", href: "https://aguila.com.mx/" },
    ],
    thingsToDo: [
      {
        title: "Marine Park boat day",
        note: "Snorkel circuit Coronado + Danzante. Pack water, sunscreen and a hat.",
        pace: "half day",
      },
      {
        title: "Loreto pueblo evening",
        note: "Plaza, mission church, ice cream at Ágata. Easy 90-minute loop.",
        pace: "easy",
      },
      {
        title: "Mirador Sierra de la Giganta (sunrise)",
        note: "Quick drive out of town for a viewpoint over the bay. Worth setting an alarm.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Romanita Baja Kitchen",
        note: "Modern courtyard restaurant — best dinner in town.",
        pace: "food",
      },
      {
        title: "Orlando's",
        note: "Classic Mexican, Local favourite.",
        pace: "food",
      },
      {
        title: "Mi Loreto",
        note: "Elevated comida casera. Good for a slower lunch.",
        pace: "food",
      },
      {
        title: "La Picazón",
        note: "15 min on dirt road north of town, seaside, fish from their own boat. Lunch only, closed Mondays.",
        pace: "food",
      },
    ],
    diveSites: [
      {
        title: "Coronado wall",
        note: "Drop-off wall on the north side. Reef fish, occasional rays.",
        pace: "dive",
      },
      {
        title: "Punta Lobos",
        note: "Sea lion colony (outside breeding closure). Playful encounters.",
        pace: "dive",
      },
      {
        title: "Las Tijeras",
        note: "Two pinnacles south of town. Larger schools, good visibility.",
        pace: "dive",
      },
    ],
  },
  {
    id: "bahia-concepcion",
    city: "Bahía Concepción",
    chapter: "Chapter 5",
    dates: "27 to 30 June",
    nights: 3,
    mood: "Empty turquoise bays + kayak days (Julian + Anja only)",
    colour: "var(--chapter-sandstone)",
    stamp: "Bahía · Kayak + Palapa",
    booking: {
      status: "flexible",
      recommendation: "Keep this flexible unless a simple beach house appears.",
      budget: "Cheap/simple is fine here; cash palapas are acceptable.",
      cancellation: "No hard booking needed unless choosing glamping.",
      nextAction: "Decide closer to the date based on weather, energy and road timing.",
    },
    hotels: [
      {
        name: "Mulege Beach Glamping (Playa La Escondida)",
        detail: "Simple, pit toilets, direct beach access.",
        status: "candidate",
        price: "Check",
        location: "Beach-first, rustic.",
        parking: "Likely simple.",
        breakfast: "No; self-cater/nearby basics.",
        fit: "Good if you want planned rustic without committing to palapas.",
      },
      {
        name: "Beach palapas · Playa el Burro",
        detail: "~$12/night, very basic huts. Cash only.",
        status: "candidate",
        price: "~USD 12/night cash",
        location: "Directly on the bay.",
        parking: "Simple beach parking.",
        breakfast: "No.",
        fit: "Maximum Baja/simple; comfort tradeoff is real.",
      },
      {
        name: "Beach palapas · Playa Santispac",
        detail: "Same vibe — choose between Burro and Santispac on arrival.",
        status: "candidate",
        price: "Cheap cash stay",
        location: "Easy bay access and food nearby.",
        parking: "Simple beach parking.",
        breakfast: "No.",
        fit: "Best if you want flexibility and do not need comfort.",
      },
      {
        name: "Hotel Las Casitas · Mulegé",
        detail: "Hotel fallback in Mulegé pueblo, garden setting.",
        status: "candidate",
        price: "Check",
        location: "Mulegé pueblo, not directly on the bay.",
        parking: "Likely easier.",
        breakfast: "Restaurant/garden setting.",
        fit: "Comfort fallback if beach basics feel too rough.",
      },
    ],
    summary:
      "Three slow days in the bays north of Loreto. Kayak, snorkel, swim, JC's tacos. Just the two of us from here.",
    travelIn: "Drive Loreto → Bahía Concepción on 27 June (~1h30).",
    travelOut: "Long drive south to La Paz on 30 June (~6h). Early start.",
    links: [
      { label: "Bahía Concepción overview", href: "https://www.bajabound.com/before/aboutbaja/baja-bays.php" },
      { label: "Mulegé tourism", href: "https://mulege.gob.mx/" },
    ],
    thingsToDo: [
      {
        title: "Kayak Playa el Burro",
        note: "Calm bay, paddle to the small island and snorkel around it.",
        pace: "half day",
      },
      {
        title: "Playa Santispac swim + hot spring",
        note: "The north end has a small thermal spring near the rocks at low tide.",
        pace: "easy",
      },
      {
        title: "Mulegé pueblo half-day",
        note: "Old mission, river walk, small market. Easy lunch stop.",
        pace: "half day",
      },
    ],
    foodIdeas: [
      {
        title: "Los Equipales · Mulegé",
        note: "Best breakfast and seafood soup in the area.",
        pace: "food",
      },
      {
        title: "Las Casitas · Mulegé",
        note: "Atmospheric, garden setting — good for one nice dinner.",
        pace: "food",
      },
      {
        title: "JC's · Playa el Burro",
        note: "Beach restaurant, al pastor tacos, Thursday live music. Cash only.",
        pace: "food",
      },
      {
        title: "Armando's · Playa Santispac",
        note: "Beachfront, simple Mexican plates.",
        pace: "food",
      },
    ],
    practical: [
      "Cash only at most beach palapas and JC's.",
      "Cell service is patchy — download offline maps.",
      "Fuel up in Mulegé; the next big station is Loreto or Guerrero Negro.",
    ],
  },
  {
    id: "cabo-pulmo",
    city: "Cabo Pulmo",
    chapter: "Chapter 6",
    dates: "1 to 4 July",
    nights: 3,
    mood: "Reef village, two dive days, the trip's grand finale",
    colour: "var(--chapter-coral)",
    stamp: "Pulmo · Reef + Bull sharks",
    booking: {
      status: "preferred",
      recommendation: "Book accommodation and dive operator together; Cabo Pulmo inventory is tiny.",
      budget: "Stretch is acceptable if it secures dives + sleep in the village.",
      cancellation: "Ask directly; small operators may have stricter policies.",
      nextAction: "Message Beach Resort / Dive Cabo Pulmo first, then Bungalows as backup.",
    },
    hotels: [
      {
        name: "Cabo Pulmo Beach Resort",
        detail: "Bungalows with attached dive shop. The obvious diver pick.",
        status: "preferred",
        price: "Likely above normal target",
        location: "In village, easiest for dive mornings.",
        parking: "Likely easy.",
        breakfast: "Check.",
        fit: "Best operational fit because accommodation and dive logistics align.",
        links: [{ label: "Resort", href: "https://www.cabopulmobeachresort.com/" }],
      },
      {
        name: "Bungalows Cabo Pulmo",
        detail: "Well-equipped bungalows ~50 m from the beach.",
        status: "candidate",
        price: "Check",
        location: "Village/beach-adjacent.",
        parking: "Likely easy.",
        breakfast: "Self-cater / village food.",
        fit: "Good backup if resort is expensive or full.",
      },
      {
        name: "Costa Coral Cabo Pulmo",
        detail: "Newer apartments slightly outside the village. Dive packages available.",
        status: "candidate",
        price: "Check",
        location: "Slightly outside the village.",
        parking: "Likely easy.",
        breakfast: "Apartment setup; likely none.",
        fit: "Useful if dive package/value beats walkability.",
      },
    ],
    summary:
      "Three final nights in the small protected village. Two dive days on the reef, snorkelling at Los Arbolitos, and one nice farewell dinner.",
    travelIn: "Drive from La Paz on 1 July (~3h). Last 10 km unpaved.",
    travelOut: "Drive to SJD on 4 July (~2h30) for the flight home.",
    links: [
      { label: "Marine Park", href: "https://www.gob.mx/conanp/acciones-y-programas/parque-nacional-cabo-pulmo" },
      { label: "Dive Cabo Pulmo", href: "https://www.divecabopulmo.com/" },
    ],
    thingsToDo: [
      {
        title: "Snorkel Los Arbolitos",
        note: "Best shore snorkel of the trip. Reef ~5 m from shore, ~$5 entry. Go mid-morning.",
        pace: "snorkel",
      },
      {
        title: "Sunset Bar 1",
        note: "The one bar in the village. Cold beer, palapa, sunset.",
        pace: "easy",
      },
      {
        title: "Drive south to Los Frailes",
        note: "Half-hour drive, near-empty beach and a secondary snorkel spot.",
        pace: "half day",
      },
    ],
    foodIdeas: [
      {
        title: "El Caballero",
        note: "Best in the village. Burgers and shrimp tacos. Romantic at night.",
        pace: "food",
      },
      {
        title: "Los Tornados",
        note: "Family-run breakfast spot — chilaquiles done well.",
        pace: "food",
      },
      {
        title: "La Palapa",
        note: "Right on the sand, basic and cheap. Cash only.",
        pace: "food",
      },
    ],
    diveSites: [
      {
        title: "El Bajo",
        note: "Big pinnacle, schools of jack and snapper, bull sharks in summer.",
        pace: "dive",
      },
      {
        title: "El Vencedor (wreck)",
        note: "Tuna boat wreck at ~12–17 m. Goliath grouper and turtles common.",
        pace: "dive",
      },
      {
        title: "Cantil del Tiburón",
        note: "'Shark wall'. Reef sharks, occasionally bull sharks. Drift conditions possible.",
        pace: "dive",
      },
      {
        title: "Los Morros",
        note: "Pinnacle dive, big schools. Sometimes combined with El Bajo.",
        pace: "dive",
      },
    ],
    practical: [
      "No ATM in Cabo Pulmo. Bring cash for dives, food and tips.",
      "Phone signal is poor — download offline maps and dive plans.",
      "Water temp 24–27 °C — 3 mm suit is plenty for June/July.",
    ],
  },
];

export const itineraryItems: ItineraryItem[] = [
  {
    date: "16 Jun 2026",
    day: "Tue",
    title: "BER → AMS → MEX (KLM)",
    place: "Berlin → Mexico City",
    type: "flight",
    status: "booked",
    audience: "Julian solo",
    group: "cdmx",
    summary: "Fly out — lands Mexico City ~02:00",
    time: "BER 19:15 → MEX 01:55 (+1)",
    bookedWith: "KLM (KL1782 + KL8990)",
    note: "Lands MEX ~02:00 local on 17 Jun. Taxi/Uber straight to the Roma Norte Airbnb.",
  },
  {
    date: "16–19 Jun 2026",
    day: "Tue–Fri",
    title: "Roma Norte Airbnb",
    place: "Mexico City",
    type: "hotel",
    status: "booked",
    audience: "Julian solo",
    group: "cdmx",
    summary: "Base for 3 nights in Roma Norte",
    bookedWith: "Airbnb (Lorenza & Mercedes)",
    note: "Independent Small Rooftop Studio, 39 Calle Cuernavaca. 3 nights.",
  },
  {
    date: "17 Jun 2026",
    day: "Wed",
    title: "CDMX Day 1 — Chapultepec, Antropología + Zócalo Fan Festival",
    place: "Condesa → Chapultepec → Zócalo → Reforma",
    type: "activity",
    status: "to book",
    audience: "Julian solo",
    group: "cdmx",
    summary: "Castle + big museum, then England v Croatia on the Zócalo",
    time: "Lardo 07:00; museum late morning; Fan Festival from ~13:00",
    note:
      "Breakfast at Lardo (Condesa) at 07:00, then walk up to the Castillo de Chapultepec and across to the Museo Nacional de Antropología (2.5–3h). East to the Zócalo for the Centro sites — Catedral Metropolitana, Templo Mayor, Diego Rivera murals at Palacio Nacional — lunch on the square, then the FIFA Fan Festival (Fanmeile) on the Zócalo for England v Croatia. Back to Roma/Condesa for a neighbourhood wander, then the Colombia match with the crowd on Paseo de la Reforma.",
  },
  {
    date: "18 Jun 2026",
    day: "Thu",
    title: "CDMX Day 2 — Teotihuacán, Coyoacán + Ángel de la Independencia",
    place: "Teotihuacán → Coyoacán → Reforma",
    type: "activity",
    status: "to book",
    audience: "Julian solo",
    group: "cdmx",
    summary: "Pyramids early, Coyoacán afternoon, football on Reforma",
    time: "Early ride out; back early afternoon; Reforma in the evening",
    bookedWith: "Optional balloon (book 1–2 weeks ahead)",
    cost: "Balloon ≈ MXN 1,990 + Uber RT + guide MXN 600–900 (optional)",
    note:
      "Early ride to Teotihuacán for the Avenue of the Dead and the Sun and Moon pyramids before the heat (optional sunrise balloon). Back in the city by early afternoon, then Coyoacán — Jardín Centenario, Mercado de Coyoacán and Casa Azul if you pre-booked the slot. In the evening, watch the match with the crowd at the Ángel de la Independencia on Paseo de la Reforma.",
  },
  {
    date: "19 Jun 2026",
    day: "Fri",
    title: "Group meets at SJD → Cerritos lunch → Todos Santos",
    place: "SJD → Cerritos → Todos Santos",
    type: "flight",
    status: "booked",
    audience: "Everyone",
    summary: "Everyone lands, then beach + Todos Santos",
    time: "Julian SJD 07:15; Anja & Manu SJD 10:09 (via MEX)",
    bookedWith: "VivaAerobus (Julian) + Volaris (Anja & Manu)",
    note: "Julian picks up the Payless rental at SJD 07:30 and waits for the 10:09 ORD arrival. Then drive ~1h to Barracuda Cantina · Cerritos for a first-Baja lunch, spend the afternoon on Cerritos beach, and check into the Todos Santos hotel for 2 nights.",
  },
  {
    date: "19–21 Jun 2026",
    day: "Fri–Sun",
    title: "Todos Santos — Pacific arrival",
    place: "Todos Santos",
    type: "hotel",
    status: "booked",
    audience: "Everyone",
    summary: "Estudio con Terraza — 2 nights",
    bookedWith: "Booking.com",
    cost: "US$318.73 total",
    cancellation: "Free cancellation until 11 Jun 2026 23:59 MST; 50% fee from 12 Jun.",
    note: "2 nights at Estudio con Terraza, Heroico Colegio Militar 2. Check-in 15:00–20:30, check-out 11:00–11:30, no meals included. Door code will be sent shortly before arrival; share expected arrival time with the property.",
  },
  {
    date: "21 Jun 2026",
    day: "Sun",
    title: "Drive Todos Santos → La Paz",
    place: "La Paz",
    type: "drive",
    status: "planned",
    audience: "Everyone",
    summary: "Short hop over to the Sea of Cortez",
    time: "~1h15",
    note: "Arrive midday so the afternoon Balandra slot is possible.",
  },
  {
    date: "21–24 Jun 2026",
    day: "Sun–Wed",
    title: "La Paz — bay + Espíritu Santo + dive day 1",
    place: "La Paz",
    type: "hotel",
    status: "to book",
    audience: "Everyone",
    summary: "3 nights — boat day, Balandra, first dive",
    note: "3 nights. Espíritu Santo boat, Balandra slot, first dive day (Fang Ming + Swanee).",
  },
  {
    date: "22 Jun 2026",
    day: "Mon",
    title: "Espíritu Santo boat tour",
    place: "La Paz",
    type: "activity",
    status: "to book",
    audience: "Everyone",
    summary: "Island boat day — Ensenada Grande + Bonanza",
    note: "Book Punta Baja or Mar y Aventuras. Los Islotes is closed for the season — Ensenada Grande and Bonanza instead.",
  },
  {
    date: "23 Jun 2026",
    day: "Tue",
    title: "Dive day 1",
    place: "La Paz",
    type: "activity",
    status: "to book",
    audience: "Everyone",
    summary: "Fang Ming wreck + Swanee Reef",
    note: "Fang Ming wreck + Swanee Reef. La Reina mantas if a third tank is doable.",
  },
  {
    date: "24 Jun 2026",
    day: "Wed",
    title: "Drive La Paz → Loreto",
    place: "Loreto",
    type: "drive",
    status: "planned",
    audience: "Everyone",
    summary: "Scenic Sierra de la Giganta drive",
    time: "~4h30",
    note: "Sierra de la Giganta scenic drive. Lunch in Ciudad Constitución or Ligüí.",
  },
  {
    date: "24–27 Jun 2026",
    day: "Wed–Sat",
    title: "Loreto — Marine Park + dive day 2",
    place: "Loreto",
    type: "hotel",
    status: "to book",
    audience: "Everyone",
    summary: "3 nights — mission town + Marine Park",
    note: "Likely Loreto Playa Boutique — only 5 rooms, book ASAP.",
  },
  {
    date: "25 Jun 2026",
    day: "Thu",
    title: "Marine Park boat day",
    place: "Loreto",
    type: "activity",
    status: "to book",
    audience: "Everyone",
    summary: "Coronado + Danzante snorkel circuit",
    note: "Coronado + Danzante snorkel circuit.",
  },
  {
    date: "26 Jun 2026",
    day: "Fri",
    title: "Dive day 2",
    place: "Loreto",
    type: "activity",
    status: "to book",
    audience: "Julian + Anja",
    summary: "Coronado wall / Punta Lobos (Manu travels)",
    note: "Coronado wall or Punta Lobos depending on conditions. Manu skips this — she's on the bus south (see Routes for the alternative where she leaves from La Paz instead).",
  },
  {
    date: "26 Jun 2026",
    day: "Fri",
    title: "Manuela: bus Loreto → La Paz → SJD + overnight at airport",
    place: "Loreto → La Paz → SJD",
    type: "bus",
    status: "to book",
    audience: "Manuela",
    summary: "Long bus south — overnight near SJD airport",
    time: "~06:30 → ~17:00 via La Paz",
    bookedWith: "Aguila (aguila.com.mx)",
    cost: "≈USD 55 total",
    note: "Manu skips dive day 2 and takes two Aguila buses south. Lunch break in La Paz, evening check-in at a SJD airport hotel. (Option B in Routes makes this a single short La Paz → SJD bus instead.)",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Manuela: UA766 SJD → ORD",
    place: "SJD → ORD",
    type: "flight",
    status: "booked",
    audience: "Manuela",
    summary: "Flies home from SJD",
    time: "SJD 11:52 → ORD 18:09",
    bookedWith: "United Airlines (UA766)",
    note: "Direct nonstop, ~4h14. Manu walks from the airport hotel to the terminal.",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Julian + Anja: drive Loreto → Bahía Concepción",
    place: "Bahía Concepción",
    type: "drive",
    status: "planned",
    audience: "Julian + Anja",
    summary: "Continue north to the turquoise bays",
    time: "~1h30",
    note: "Continue north after Manu has caught her connector.",
  },
  {
    date: "27–30 Jun 2026",
    day: "Sat–Tue",
    title: "Bahía Concepción — bays + kayak",
    place: "Bahía Concepción",
    type: "hotel",
    status: "flexible",
    audience: "Julian + Anja",
    summary: "3 nights — kayak, snorkel, slow beach days",
    note: "3 nights. Can decide between glamping and palapas on arrival.",
  },
  {
    date: "30 Jun 2026",
    day: "Tue",
    title: "Drive Bahía Concepción → La Paz",
    place: "La Paz",
    type: "drive",
    status: "planned",
    audience: "Julian + Anja",
    summary: "Longest drive of the trip — dawn start",
    time: "~6h",
    note: "Long drive — dawn start, fuel break in Loreto.",
  },
  {
    date: "1 Jul 2026",
    day: "Wed",
    title: "Drive La Paz → Cabo Pulmo",
    place: "Cabo Pulmo",
    type: "drive",
    status: "planned",
    audience: "Julian + Anja",
    summary: "Down to the reef village (last 10 km unpaved)",
    time: "~3h",
    note: "Top up cash and food before leaving La Paz.",
  },
  {
    date: "1–4 Jul 2026",
    day: "Wed–Sat",
    title: "Cabo Pulmo — reef + dive days 3 & 4",
    place: "Cabo Pulmo",
    type: "hotel",
    status: "to book",
    audience: "Julian + Anja",
    summary: "3 nights — the diving grand finale",
    note: "3 nights. Cabo Pulmo Beach Resort is the obvious choice for divers.",
  },
  {
    date: "2 Jul 2026",
    day: "Thu",
    title: "Dive day 3",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    audience: "Julian + Anja",
    summary: "El Bajo + Cantil del Tiburón",
    note: "El Bajo + Cantil del Tiburón. Bull shark aggregation possible in summer.",
  },
  {
    date: "3 Jul 2026",
    day: "Fri",
    title: "Dive day 4 + Los Arbolitos snorkel",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    audience: "Julian + Anja",
    summary: "Wreck dive, then the best shore snorkel",
    note: "El Vencedor wreck in the morning, Los Arbolitos in the afternoon.",
  },
  {
    date: "4 Jul 2026",
    day: "Sat",
    title: "Drive Cabo Pulmo → SJD + KLM home",
    place: "Cabo Pulmo → BER",
    type: "flight",
    status: "booked",
    audience: "Julian + Anja",
    summary: "Drive to SJD and fly home",
    time: "Drive ~2h30, return car 11:00, fly SJD 13:30",
    bookedWith: "KLM (KL5375 ATL + KL0622 AMS + KL1779 BER)",
    note: "Leave Cabo Pulmo by 07:30. Lands BER Sun 5 Jul 16:30.",
  },
];

export type ExtraStay = {
  id: string;
  for: string;
  city: string;
  dates: string;
  nights: number;
  reason: string;
  hotels: HotelOption[];
};

export const extraStays: ExtraStay[] = [
  {
    id: "manu-sjd-overnight",
    for: "Manuela (solo)",
    city: "SJD Airport area",
    dates: "Fri 26 Jun (1 night)",
    nights: 1,
    reason:
      "Bridge between the long Aguila bus journey from Loreto and the 27 Jun 11:52 UA766 SJD → ORD departure. Lets Manu drop bags, sleep and walk to the terminal.",
    hotels: [
      {
        name: "Hampton by Hilton Los Cabos",
        detail: "Closest brand-name option to SJD — ~5 min by hotel shuttle. Free breakfast, reliable.",
        status: "candidate",
        map: "https://maps.google.com/?q=Hampton+by+Hilton+Los+Cabos",
        links: [
          {
            label: "Hilton",
            href: "https://www.hilton.com/en/hotels/sjdcohx-hampton-los-cabos/",
          },
        ],
      },
      {
        name: "Holiday Inn Express Los Cabos",
        detail: "Same plaza as the Hampton, similar pricing. Solid IHG points option.",
        status: "candidate",
        map: "https://maps.google.com/?q=Holiday+Inn+Express+Los+Cabos+San+Jose",
      },
      {
        name: "City Express by Marriott San José del Cabo",
        detail: "Cheapest reliable option near the airport. Basic but clean.",
        status: "candidate",
        map: "https://maps.google.com/?q=City+Express+San+Jose+del+Cabo",
      },
    ],
  },
];

export const routeOptions: RouteOption[] = [
  {
    id: "option-a",
    name: "Option A — South loop (current plan)",
    tagline: "La Paz and Loreto early, Manu exits from Loreto",
    status: "preferred",
    recommended: true,
    waypoints: [
      "San Jose del Cabo Airport",
      "Todos Santos, BCS",
      "La Paz, BCS",
      "Loreto, BCS",
      "Mulege, BCS",
      "Cabo Pulmo, BCS",
    ],
    summary:
      "The route as currently planned: drive north as far as Loreto in the first week, then loop back south through Bahía Concepción, La Paz and Cabo Pulmo. The catch is Manu's exit — she has to backtrack the whole way from Loreto to SJD by bus on 26 Jun.",
    sequence: [
      "Todos Santos",
      "La Paz",
      "Loreto",
      "Bahía Concepción",
      "La Paz",
      "Cabo Pulmo",
    ],
    legs: [
      { from: "SJD airport", to: "Todos Santos", distance: "~75 km", duration: "1h30", note: "Via Cerritos for lunch + first beach." },
      { from: "Todos Santos", to: "La Paz", distance: "~80 km", duration: "1h15" },
      { from: "La Paz", to: "Loreto", distance: "~360 km", duration: "4h30", note: "Sierra de la Giganta scenic drive." },
      { from: "Loreto", to: "Bahía Concepción", distance: "~135 km", duration: "1h45" },
      { from: "Bahía Concepción", to: "La Paz", distance: "~500 km", duration: "6h", note: "Longest single day — dawn start." },
      { from: "La Paz", to: "Cabo Pulmo", distance: "~120 km", duration: "3h", note: "Last 10 km unpaved." },
      { from: "Cabo Pulmo", to: "SJD airport", distance: "~100 km", duration: "2h30" },
    ],
    manuExit:
      "Manu leaves from Loreto on 26 Jun: two Aguila buses LTO → La Paz → SJD, ~10h door-to-door, overnight at a SJD airport hotel, then UA766 at 11:52 on 27 Jun.",
    pros: [
      "Dive days in La Paz and Loreto land in the first week while everyone is fresh.",
      "Cabo Pulmo stays as the grand finale right before the flight home.",
      "Bahía Concepción slow days come after the diving, not before.",
    ],
    cons: [
      "Manu's exit is a long ~10h, two-bus backtrack from Loreto.",
      "The Bahía → La Paz leg (~6h) is a hard driving day for Julian + Anja.",
    ],
  },
  {
    id: "option-b",
    name: "Option B — North first, La Paz finale for Manu",
    tagline: "Manu leaves from La Paz on one short bus",
    status: "alternative",
    waypoints: [
      "San Jose del Cabo Airport",
      "Todos Santos, BCS",
      "Mulege, BCS",
      "Loreto, BCS",
      "La Paz, BCS",
      "Cabo Pulmo, BCS",
    ],
    summary:
      "Draft alternative to make Manu's exit easy: push north to Bahía Concepción / Loreto first, then come back down so the group is in La Paz around 26 Jun. Manu then leaves on a single short La Paz → SJD bus (~3h) instead of the 10h Loreto backtrack. Stop order and overnights still to confirm together.",
    sequence: [
      "Todos Santos",
      "Bahía Concepción",
      "Loreto",
      "La Paz",
      "Cabo Pulmo",
    ],
    legs: [
      { from: "SJD airport", to: "Todos Santos", distance: "~75 km", duration: "1h30", note: "Via Cerritos for lunch + first beach." },
      { from: "Todos Santos", to: "Bahía Concepción", distance: "~635 km", duration: "8h+", note: "Too long in one go — break it with a night in La Paz or Loreto on the way up." },
      { from: "Bahía Concepción", to: "Loreto", distance: "~135 km", duration: "1h45" },
      { from: "Loreto", to: "La Paz", distance: "~360 km", duration: "4h30", note: "Arrive La Paz around 26 Jun." },
      { from: "La Paz", to: "SJD (Manu only)", distance: "~210 km", duration: "~3h bus", note: "Single Aguila/Ruta del Cabo leg for Manu's exit." },
      { from: "La Paz", to: "Cabo Pulmo", distance: "~120 km", duration: "3h" },
      { from: "Cabo Pulmo", to: "SJD airport", distance: "~100 km", duration: "2h30" },
    ],
    manuExit:
      "Manu leaves from La Paz on ~26 Jun: one short bus La Paz → SJD (~3h), overnight at a SJD airport hotel, then UA766 at 11:52 on 27 Jun. Much easier than the Loreto backtrack.",
    pros: [
      "Manu's exit is one short bus from La Paz instead of a 10h, two-bus day.",
      "Avoids the brutal ~6h Bahía → La Paz return leg.",
    ],
    cons: [
      "The northbound Todos Santos → Bahía run needs a break night (La Paz or Loreto).",
      "Dive-day sequencing in La Paz / Loreto has to be re-planned around the new order.",
      "Cabo Pulmo still sits at the end, so the far-north days come earlier when legs are longest.",
    ],
  },
];

export const reservationPriority = [
  "World Cup fan zones: England v Croatia at the Zócalo Fan Festival + Colombia on Reforma (17 Jun), then the Ángel de la Independencia (18 Jun) — no ticket needed",
  "Manu's Aguila buses LTO → LAP and LAP → SJD on 26 Jun + SJD airport hotel for that night",
  "Cabo Pulmo dive operator (Dive Cabo Pulmo) — small slots, fills fast",
  "Espíritu Santo boat tour (Punta Baja, Alonso Tours, Mar y Aventuras)",
  "Airalo Mexico eSIM (buy + install before flying — avoids the 02:00 MEX SIM scramble)",
  "Teotihuacán balloon for 18 Jun (optional shared seat, ~MXN 1,990 — book 1–2 weeks ahead)",
  "Casa Azul Frida Kahlo timed-entry tickets — optional, only if you want it on 18 Jun",
  "Hotels La Paz + Loreto",
  "Cabo Pulmo accommodation (Beach Resort or Bungalows)",
  "Bahía Concepción — can usually be decided on the day",
];
