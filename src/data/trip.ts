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

export type SiteMap = {
  title: string;
  caption: string;
  /** Geocodable query the keyless embed is centred on (no API key needed). */
  center: string;
  /** Zoom for the keyless centred map. */
  zoom: number;
  sites: MapSite[];
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
  /** Optional embedded sights map shown inside the expanded day card. */
  siteMap?: SiteMap;
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
  { label: "Route", value: "Mexico City, Todos Santos, Magdalena Bay, Loreto, Bahía Concepción, La Paz, Los Barriles, Cabo Pulmo" },
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
    note: "Direct nonstop, daily, A320 or 737-800 (~4h14). Manu drove from La Paz to SJD on the morning of 27 June to make the 11:52 departure.",
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
    id: "sjd-todossantos",
    date: "19 Jun",
    mode: "drive",
    from: "SJD airport",
    to: "Todos Santos",
    duration: "1h30",
    note: "Pick up the Payless VW Tiguan at SJD 07:30. Lunch + first beach at Cerritos en route.",
    status: "booked",
  },
  {
    id: "todossantos-sancarlos",
    date: "21 Jun",
    mode: "drive",
    from: "Todos Santos",
    to: "Puerto San Carlos",
    duration: "~4h",
    note: "Across to Magdalena Bay via Ciudad Constitución for the whale tour.",
    status: "booked",
  },
  {
    id: "sancarlos-loreto",
    date: "22 Jun",
    mode: "drive",
    from: "Puerto San Carlos",
    to: "Loreto",
    duration: "~2h30",
    note: "After the whale tour and lunch at Tiburón. Swim stop at Bahía Ensenada Blanca.",
    status: "booked",
  },
  {
    id: "loreto-bahia",
    date: "23 Jun",
    mode: "drive",
    from: "Loreto",
    to: "Bahía Concepción",
    duration: "1h45",
    note: "Beach day at Playa Requesón on the way; dinner at Armando's on Santispac.",
    status: "booked",
  },
  {
    id: "bahia-lapaz",
    date: "25 Jun",
    mode: "drive",
    from: "Bahía Concepción",
    to: "La Paz",
    duration: "~6h",
    note: "Return south with a stop in Loreto for the Ecuador–Germany match at Claudia's Margaritas.",
    status: "booked",
  },
  {
    id: "manu-lap-sjd",
    date: "27 Jun",
    mode: "drive",
    from: "La Paz",
    to: "San José del Cabo",
    duration: "~3h",
    passenger: "Manuela",
    note: "Manuela drove from La Paz to SJD on the morning of 27 June for her 11:52 UA766 flight home.",
    status: "booked",
  },
  {
    id: "lapaz-losbarriles",
    date: "27 Jun",
    mode: "drive",
    from: "La Paz",
    to: "Los Barriles",
    duration: "~2h",
    note: "Via La Ventana and the lighthouse at Playa Punta Arena, to Casita Choya.",
    status: "booked",
  },
  {
    id: "losbarriles-cabopulmo",
    date: "30 Jun",
    mode: "drive",
    from: "Los Barriles",
    to: "Cabo Pulmo",
    duration: "~1h",
    note: "Last 10 km unpaved. Top up cash before arriving — no ATM in Cabo Pulmo.",
    status: "planned",
  },
  {
    id: "cabopulmo-sjd",
    date: "3 Jul",
    mode: "drive",
    from: "Cabo Pulmo",
    to: "San José del Cabo",
    duration: "2h30",
    note: "Drive out on 3 Jul for the last night near SJD. Car return 4 Jul 11:00, KLM SJD→ATL 13:30.",
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
    title: "Cabo Pulmo sleep + dives",
    category: "Activities",
    owner: "Julian + Anja",
    deadline: "High priority",
    status: "to book",
    detail:
      "Reserve accommodation and dive operator together for 1–4 July. Small village, limited rooms and boat seats.",
  },
  {
    title: "Todos Santos stay",
    category: "Hotels",
    owner: "Everyone",
    deadline: "Done",
    status: "booked",
    detail: "Estudio con Terraza, 19–21 Jun — done.",
  },
  {
    title: "Magdalena Bay overnight + whale tour",
    category: "Activities",
    owner: "Everyone",
    deadline: "Done",
    status: "booked",
    detail: "Puerto San Carlos overnight (21–22 Jun) and the Magdalena Bay whale tour — done.",
  },
  {
    title: "Loreto, Bahía & La Paz stays",
    category: "Hotels",
    owner: "Everyone",
    deadline: "Done",
    status: "booked",
    detail: "Hotel Oasis (Loreto), Baja Glamping (Bahía Concepción) and the La Paz AirBnB — all done.",
  },
  {
    title: "Los Barriles stay",
    category: "Hotels",
    owner: "Julian + Anja",
    deadline: "Done",
    status: "booked",
    detail: "Casita Choya, 28 Jun – 1 Jul — done.",
  },
  {
    title: "Manuela's flight home",
    category: "Transport",
    owner: "Manuela",
    deadline: "Done",
    status: "booked",
    detail: "UA766 SJD → ORD on 27 Jun — done.",
  },
  {
    title: "Travel basics",
    category: "Travel ops",
    owner: "Everyone",
    deadline: "Before departure",
    status: "booked",
    detail: "Airalo eSIM, offline maps, cash for the bays and the rental-car checklist — sorted.",
  },
];

export const nextBookings: BookingPriority[] = [
  {
    title: "Cabo Pulmo base + dives",
    detail:
      "The last thing to lock: accommodation and the first dive operator slot together for 1–4 July. Small village, small boats, limited inventory.",
    status: "to book",
  },
  {
    title: "Cabo Pulmo → SJD timing (4 July)",
    detail:
      "Leave Cabo Pulmo by ~07:30 on 4 July: Payless car return is 11:00 and KLM SJD → ATL departs 13:30.",
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
    travelOut: "Drive Todos Santos → Puerto San Carlos / Magdalena Bay on 21 June (~4h via Ciudad Constitución) for the whale tour.",
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
    id: "magdalena-bay",
    city: "Puerto San Carlos",
    chapter: "Chapter 3",
    dates: "21 to 22 June",
    nights: 1,
    mood: "Overnight on Magdalena Bay for the whale tour",
    colour: "var(--chapter-tide)",
    stamp: "Magdalena Bay · Whales",
    booking: {
      status: "booked",
      recommendation: "One night at Hotel Whale Tours Vista Mag-Bay to catch the early whale tour.",
      budget: "Booked",
      cancellation: "n/a — single night.",
      nextAction: "Done.",
    },
    hotels: [
      {
        name: "Hotel Whale Tours Vista Mag-Bay",
        detail: "Simple overnight in Puerto San Carlos, set up for the early Magdalena Bay whale tour.",
        status: "booked",
        location: "Puerto San Carlos, on Magdalena Bay.",
        breakfast: "Self-cater.",
        fit: "One-night base right by the whale-tour departure.",
        links: [{ label: "Vista Mag-Bay (map)", href: "https://www.google.com/maps/search/?api=1&query=Whale+Tours+Vista+Mag-Bay+Puerto+San+Carlos" }],
      },
    ],
    summary:
      "A one-night stop in the Pacific lagoon town of Puerto San Carlos: arrive from Todos Santos, an early whale-watching tour on Magdalena Bay, lunch at Tiburón and onward to Loreto. Dinner the first night was just leftovers in the room.",
    travelIn: "Drive from Todos Santos on 21 June (~4h via Ciudad Constitución).",
    travelOut: "Whale tour in the morning, lunch at Tiburón, then drive to Loreto (~2.5h) with a swim stop at Bahía Ensenada Blanca.",
    links: [
      { label: "Puerto San Carlos (map)", href: "https://www.google.com/maps/search/?api=1&query=Puerto+San+Carlos+Baja+California+Sur" },
    ],
    thingsToDo: [
      {
        title: "Whale tour on Magdalena Bay",
        note: "Early boat tour out into the lagoon — the reason for the overnight. Back for lunch before the drive north.",
        pace: "half day",
      },
    ],
    foodIdeas: [
      {
        title: "Restaurante Tiburón · Puerto San Carlos",
        note: "Lunch after the whale tour before driving on to Loreto.",
        pace: "food",
        links: [{ label: "Tiburón (map)", href: "https://www.google.com/maps/search/?api=1&query=Restaurante+Tiburon+Puerto+San+Carlos" }],
      },
    ],
  },
  {
    id: "loreto",
    city: "Loreto",
    chapter: "Chapter 4",
    dates: "22 to 23 June",
    nights: 1,
    mood: "One-night stop in the mission town — Hotel Oasis",
    colour: "var(--chapter-forest)",
    stamp: "Loreto · Mission Town",
    booking: {
      status: "booked",
      recommendation: "Hotel Oasis on the Loreto seafront, one night.",
      budget: "Booked",
      cancellation: "n/a.",
      nextAction: "Done.",
    },
    hotels: [
      {
        name: "Hotel Oasis",
        detail: "Long-running beachfront hotel on the Loreto Malecón, with a pool and gardens.",
        status: "booked",
        location: "On the seafront, short walk to the plaza and mission.",
        breakfast: "On site.",
        fit: "Easy one-night stop in the mission town.",
        links: [{ label: "Hotel Oasis (map)", href: "https://www.google.com/maps/search/?api=1&query=Hotel+Oasis+Loreto" }],
      },
    ],
    summary:
      "A single night in the old mission town. Arrive after the Magdalena Bay whale tour with a swim at Bahía Ensenada Blanca on the way, dinner at Zapata Cantina, then on to Bahía Concepción the next morning. On the return south two days later we stopped here again for the Ecuador–Germany match at Claudia's Margaritas.",
    travelIn: "Drive from Puerto San Carlos on 22 June after the whale tour (~2.5h), swimming at Bahía Ensenada Blanca on the way.",
    travelOut: "Drive north to Bahía Concepción on 23 June (~1h45), with a beach day at Playa Requesón on the way.",
    links: [
      { label: "Loreto tourism", href: "https://www.gotoloreto.com/" },
      { label: "Marine Park info", href: "https://www.gob.mx/conanp/acciones-y-programas/parque-nacional-bahia-de-loreto" },
    ],
    thingsToDo: [
      {
        title: "Swim at Bahía Ensenada Blanca",
        note: "Swim stop on Highway 1 just south of Loreto (near Ligüí / Danzante) on the drive in.",
        pace: "easy",
      },
      {
        title: "Loreto pueblo + mission",
        note: "Quick evening loop of the plaza, the Misión de Loreto and the Malecón before dinner.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Zapata Cantina",
        note: "Dinner on the evening in Loreto.",
        pace: "food",
        links: [{ label: "Zapata Cantina (map)", href: "https://www.google.com/maps/search/?api=1&query=Zapata+Cantina+Loreto" }],
      },
      {
        title: "Claudia's Margaritas",
        note: "Return-trip stop on 25 June — watched the Ecuador–Germany match here over margaritas.",
        pace: "food",
        links: [{ label: "Claudia's Margaritas (map)", href: "https://www.google.com/maps/search/?api=1&query=Claudias+Margaritas+Loreto" }],
      },
    ],
  },
  {
    id: "bahia-concepcion",
    city: "Bahía Concepción",
    chapter: "Chapter 5",
    dates: "23 to 25 June",
    nights: 2,
    mood: "Turquoise bays, glamping and slow beach days",
    colour: "var(--chapter-sandstone)",
    stamp: "Bahía · Glamping",
    booking: {
      status: "booked",
      recommendation: "Two nights at Baja Glamping on the bay.",
      budget: "Booked",
      cancellation: "n/a.",
      nextAction: "Done.",
    },
    hotels: [
      {
        name: "Baja Glamping",
        detail: "Tented glamping on the Bahía Concepción shore — direct beach access.",
        status: "booked",
        location: "On the bay north of Loreto.",
        breakfast: "Self-cater / nearby beach food.",
        fit: "Two slow nights right on the turquoise bay.",
        links: [{ label: "Baja Glamping (map)", href: "https://www.google.com/maps/search/?api=1&query=Baja+Glamping+Bahia+Concepcion" }],
      },
    ],
    summary:
      "Two nights at Baja Glamping on Bahía Concepción. Day one (23 June) was a beach day at Playa Requesón on the way in, with dinner at Armando's on Playa Santispac. Day two on Playa el Coyote, then dinner at La Casita in Mulegé.",
    travelIn: "Drive from Loreto on 23 June (~1h45), a beach day at Playa Requesón on the way, dinner at Armando's on Playa Santispac.",
    travelOut: "Drive back south on 25 June, stopping in Loreto for the Ecuador–Germany match at Claudia's Margaritas, then on to La Paz.",
    links: [
      { label: "Bahía Concepción overview", href: "https://www.bajabound.com/before/aboutbaja/baja-bays.php" },
      { label: "Mulegé tourism", href: "https://mulege.gob.mx/" },
    ],
    thingsToDo: [
      {
        title: "Beach day at Playa Requesón",
        note: "The sandbar beach on the way in from Loreto — turquoise water, easy swimming.",
        pace: "half day",
      },
      {
        title: "Playa el Coyote",
        note: "Second day on this classic Bahía Concepción beach — swim, relax, rocky edges to snorkel.",
        pace: "half day",
      },
      {
        title: "Playa Santispac",
        note: "Neighbouring bay with palapas and Armando's right on the sand.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Armando's · Playa Santispac",
        note: "Beachfront dinner on the first night (23 June).",
        pace: "food",
      },
      {
        title: "La Casita · Mulegé",
        note: "Dinner in Mulegé pueblo on the second night.",
        pace: "food",
        links: [{ label: "La Casita (map)", href: "https://www.google.com/maps/search/?api=1&query=La+Casita+Mulege" }],
      },
      {
        title: "Los Equipales · Mulegé",
        note: "Good breakfast and seafood soup if passing through the pueblo.",
        pace: "food",
      },
    ],
    practical: [
      "Cash only at most beach palapas and small spots.",
      "Cell service is patchy — download offline maps.",
      "Fuel up in Mulegé or Loreto.",
    ],
  },
  {
    id: "la-paz",
    city: "La Paz",
    chapter: "Chapter 6",
    dates: "25 to 27 June",
    nights: 2,
    mood: "Beach mornings and Malecón sundowners from Casa Madero",
    colour: "var(--chapter-rhine)",
    stamp: "La Paz · Sea of Cortez",
    booking: {
      status: "booked",
      recommendation: "Casa Madero apartment, one block from the Malecón, two nights.",
      budget: "Booked",
      cancellation: "Check the booking app.",
      nextAction: "Done.",
    },
    hotels: [
      {
        name: "Casa Madero",
        detail: "Beautiful 2-bedroom apartment one block from the Malecón — best location.",
        status: "booked",
        location: "One block from the La Paz Malecón.",
        breakfast: "Self-cater.",
        fit: "Central couple base after the long Baja loop.",
      },
    ],
    summary:
      "Two nights from Casa Madero, an apartment one block off the Malecón, after the drive back south. A beach morning at Playa Balandra and Playa Tecolote, back to the apartment, then a Malecón sundowner at Lapa and dinner at 32 Sabores.",
    travelIn: "Arrive from Bahía Concepción on 25 June after the Loreto match stop.",
    travelOut: "Drive to Los Barriles on 27 June (~2h) via La Ventana and the Punta Arena lighthouse.",
    links: [
      { label: "La Paz tourism", href: "https://www.golapaz.com/" },
      { label: "Balandra info", href: "https://www.gob.mx/conanp/articulos/playa-balandra" },
    ],
    thingsToDo: [
      {
        title: "Playa Balandra (early)",
        note: "Go early for the mushroom rock and the shallow turquoise lagoon before it fills up.",
        pace: "half day",
        links: [{ label: "Balandra info", href: "https://www.gob.mx/conanp/articulos/playa-balandra" }],
      },
      {
        title: "Playa Tecolote",
        note: "The long open beach just past Balandra — easy swimming and a view across to Espíritu Santo.",
        pace: "easy",
      },
      {
        title: "Malecón sundowner at Lapa",
        note: "Sunset drinks on the La Paz Malecón before dinner.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "32 Sabores",
        note: "Dinner in La Paz.",
        pace: "food",
        links: [{ label: "32 Sabores (map)", href: "https://www.google.com/maps/search/?api=1&query=32+Sabores+La+Paz" }],
      },
      {
        title: "Lapa · Malecón",
        note: "Sundowner spot on the waterfront.",
        pace: "food",
        links: [{ label: "Lapa (map)", href: "https://www.google.com/maps/search/?api=1&query=Lapa+Malecon+La+Paz" }],
      },
      {
        title: "Anzuelo Cocina del Mar",
        note: "Harbour-side ceviches and sashimi tostadas if you want another seafood meal.",
        pace: "food",
      },
    ],
  },
  {
    id: "los-barriles",
    city: "Los Barriles",
    chapter: "Chapter 7",
    dates: "27 to 30 June",
    nights: 3,
    mood: "East Cape base — snorkel, La Ventana and the lighthouse",
    colour: "var(--chapter-plum)",
    stamp: "Los Barriles · East Cape",
    booking: {
      status: "booked",
      recommendation: "Casita Choya in Los Barriles, three nights.",
      budget: "Booked",
      cancellation: "Check the booking.",
      nextAction: "Done.",
    },
    hotels: [
      {
        name: "Casita Choya",
        detail: "Three-night base in Los Barriles on the East Cape, an easy hop on to Cabo Pulmo.",
        status: "booked",
        location: "Los Barriles.",
        breakfast: "Self-cater.",
        fit: "Quiet East Cape stop bridging La Paz and Cabo Pulmo.",
        links: [{ label: "Los Barriles (map)", href: "https://www.google.com/maps/search/?api=1&query=Los+Barriles+Baja+California+Sur" }],
      },
    ],
    summary:
      "Three nights at Casita Choya in Los Barriles — a relaxed East Cape base on the Sea of Cortez. Arrived via La Ventana and the lighthouse at Playa Punta Arena. Plans here are snorkelling and easy beach days before the Cabo Pulmo dive finale.",
    travelIn: "Drive from La Paz on 27 June (~2h), via La Ventana and the lighthouse at Playa Punta Arena.",
    travelOut: "Drive to Cabo Pulmo on 30 June (~1h) for the dive finale.",
    links: [
      { label: "Los Barriles (map)", href: "https://www.google.com/maps/search/?api=1&query=Los+Barriles+Baja+California+Sur" },
    ],
    thingsToDo: [
      {
        title: "Snorkel at Punta Pescadero",
        note: "Rocky reef point ~15 min north of Los Barriles — the closest good shore snorkel on Bahía de Palmas.",
        pace: "snorkel",
        links: [{ label: "Punta Pescadero (map)", href: "https://www.google.com/maps/search/?api=1&query=Punta+Pescadero+Baja+California+Sur" }],
      },
      {
        title: "Snorkel day trip to Cabo Pulmo",
        note: "The protected reef ~40 min south (Los Arbolitos) is the best snorkelling on the East Cape — easy as a day trip before you base there.",
        pace: "snorkel",
        links: [{ label: "Los Arbolitos (map)", href: "https://www.google.com/maps/search/?api=1&query=Los+Arbolitos+Cabo+Pulmo" }],
      },
      {
        title: "Snorkel at Bahía de los Muertos",
        note: "Sheltered cove toward La Ventana with a beach club, calm water and rocky edges to snorkel.",
        pace: "snorkel",
        links: [{ label: "Bahía de los Muertos (map)", href: "https://www.google.com/maps/search/?api=1&query=Bahia+de+los+Muertos+Baja+California+Sur" }],
      },
      {
        title: "La Ventana + Punta Arena lighthouse",
        note: "Day trip to the kite town of La Ventana and the lighthouse at Playa Punta Arena (done on the way in on 27 June).",
        pace: "half day",
      },
      {
        title: "East Cape beach days",
        note: "Long Sea-of-Cortez beach for swimming and slow days from Casita Choya.",
        pace: "easy",
      },
    ],
    foodIdeas: [
      {
        title: "Town tacos & beach bars",
        note: "Casual taquerías and beachfront bars in Los Barriles.",
        pace: "food",
      },
    ],
  },
  {
    id: "cabo-pulmo",
    city: "Cabo Pulmo",
    chapter: "Chapter 8",
    dates: "30 June to 3 July",
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
    travelIn: "Drive from Los Barriles on 30 June (~1h). Last 10 km unpaved.",
    travelOut: "Drive to the San José del Cabo area on 3 July for the last night, then car return + flight home on 4 July.",
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
    siteMap: {
      title: "Zócalo & Centro Histórico — most important sights",
      caption: "The walkable cluster around the main square. Lunch on the Zócalo, then into the Fan Festival.",
      center: "Zócalo, Centro Histórico, Ciudad de México",
      zoom: 15,
      sites: zocaloSites,
    },
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
    title: "Drive Todos Santos → Puerto San Carlos (Magdalena Bay)",
    place: "Todos Santos → Puerto San Carlos",
    type: "drive",
    status: "booked",
    audience: "Everyone",
    summary: "Across to the Pacific lagoon for the whale tour",
    time: "~4h via Ciudad Constitución",
    note: "Drive from Todos Santos across to Puerto San Carlos on Magdalena Bay — an overnight at Hotel Whale Tours Vista Mag-Bay, set up for the early whale tour the next morning. Dinner was leftovers in the room.",
  },
  {
    date: "21–22 Jun 2026",
    day: "Sun–Mon",
    title: "Puerto San Carlos — Magdalena Bay",
    place: "Puerto San Carlos",
    type: "hotel",
    status: "booked",
    audience: "Everyone",
    summary: "One night on the lagoon",
    bookedWith: "Hotel Whale Tours Vista Mag-Bay",
    note: "Overnight in Puerto San Carlos before the Magdalena Bay whale tour.",
  },
  {
    date: "22 Jun 2026",
    day: "Mon",
    title: "Whale tour + drive to Loreto",
    place: "Magdalena Bay → Loreto",
    type: "activity",
    status: "booked",
    audience: "Everyone",
    summary: "Whale tour, Tiburón lunch, swim at Ensenada Blanca",
    time: "Tour in the morning; in Loreto by evening",
    note: "Morning whale tour on Magdalena Bay, lunch at Tiburón, then drive over to Loreto (~2.5h) with a swim stop at Bahía Ensenada Blanca. Check into Hotel Oasis, dinner at Zapata Cantina.",
  },
  {
    date: "22–23 Jun 2026",
    day: "Mon–Tue",
    title: "Loreto — Hotel Oasis",
    place: "Loreto",
    type: "hotel",
    status: "booked",
    audience: "Everyone",
    summary: "1 night in the mission town",
    bookedWith: "Hotel Oasis",
    note: "One night at Hotel Oasis on the seafront. Evening at Zapata Cantina, on to Bahía Concepción the next morning.",
  },
  {
    date: "23 Jun 2026",
    day: "Tue",
    title: "Drive Loreto → Bahía Concepción",
    place: "Loreto → Bahía Concepción",
    type: "drive",
    status: "booked",
    audience: "Everyone",
    summary: "Beach day at Playa Requesón on the way",
    time: "~1h45 plus a beach day",
    note: "Drive north to Bahía Concepción, spending the day at Playa Requesón on the way and having dinner at Armando's on Playa Santispac before checking into Baja Glamping.",
  },
  {
    date: "23–25 Jun 2026",
    day: "Tue–Thu",
    title: "Bahía Concepción — Baja Glamping",
    place: "Bahía Concepción",
    type: "hotel",
    status: "booked",
    audience: "Everyone",
    summary: "2 nights glamping on the bay",
    bookedWith: "Baja Glamping",
    note: "Two nights at Baja Glamping on the turquoise bay.",
  },
  {
    date: "24 Jun 2026",
    day: "Wed",
    title: "Playa el Coyote + Mulegé",
    place: "Bahía Concepción → Mulegé",
    type: "activity",
    status: "booked",
    audience: "Everyone",
    summary: "Beach day at Coyote, dinner in Mulegé",
    note: "Full day on Playa el Coyote, then dinner at La Casita in Mulegé.",
  },
  {
    date: "25 Jun 2026",
    day: "Thu",
    title: "Return south: Loreto match stop → La Paz",
    place: "Bahía Concepción → Loreto → La Paz",
    type: "drive",
    status: "booked",
    audience: "Everyone",
    summary: "Ecuador–Germany in Loreto, then on to La Paz",
    time: "Loreto midday; La Paz by evening",
    note: "Drive back south, stopping in Loreto to watch the Ecuador–Germany match at Claudia's Margaritas, then continue to La Paz and Casa Madero.",
  },
  {
    date: "25–27 Jun 2026",
    day: "Thu–Sat",
    title: "La Paz — Casa Madero",
    place: "La Paz",
    type: "hotel",
    status: "booked",
    audience: "Everyone",
    summary: "2 nights back on the Sea of Cortez",
    bookedWith: "Casa Madero",
    note: "Two nights at Casa Madero, an apartment one block off the Malecón.",
  },
  {
    date: "26 Jun 2026",
    day: "Fri",
    title: "La Paz — Balandra, Tecolote + Malecón",
    place: "La Paz",
    type: "activity",
    status: "booked",
    audience: "Everyone",
    summary: "Beach morning, sundowner at Lapa, dinner 32 Sabores",
    note: "Early to Playa Balandra, then Playa Tecolote, back to Casa Madero. Sundowner at Lapa on the Malecón and dinner at 32 Sabores.",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Manuela: La Paz → SJD + UA766 home",
    place: "La Paz → SJD → ORD",
    type: "flight",
    status: "booked",
    audience: "Manuela",
    summary: "Early drive to SJD, then flies home",
    time: "La Paz → SJD a.m.; SJD 11:52 → ORD 18:09",
    bookedWith: "United Airlines (UA766)",
    note: "Drove from La Paz to SJD on the morning of 27 June for the 11:52 UA766 nonstop to Chicago (~4h14).",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Drive La Paz → Los Barriles",
    place: "La Paz → Los Barriles",
    type: "drive",
    status: "booked",
    audience: "Julian + Anja",
    summary: "Over to the East Cape via La Ventana",
    time: "~2h plus stops",
    note: "Drive to Los Barriles on the East Cape via La Ventana and the lighthouse at Playa Punta Arena. Casita Choya for three nights.",
  },
  {
    date: "27–30 Jun 2026",
    day: "Sat–Tue",
    title: "Los Barriles — Casita Choya",
    place: "Los Barriles",
    type: "hotel",
    status: "booked",
    audience: "Julian + Anja",
    summary: "3 nights on the East Cape — snorkelling",
    bookedWith: "Casita Choya",
    note: "Three nights at Casita Choya. Snorkelling and easy beach days before the Cabo Pulmo finale.",
  },
  {
    date: "30 Jun 2026",
    day: "Tue",
    title: "Drive Los Barriles → Cabo Pulmo",
    place: "Cabo Pulmo",
    type: "drive",
    status: "planned",
    audience: "Julian + Anja",
    summary: "Down to the reef village (last 10 km unpaved)",
    time: "~1h",
    note: "Short hop south to Cabo Pulmo. Top up cash and food before leaving Los Barriles.",
  },
  {
    date: "30 Jun – 3 Jul 2026",
    day: "Tue–Fri",
    title: "Cabo Pulmo — reef + dive days",
    place: "Cabo Pulmo",
    type: "hotel",
    status: "to book",
    audience: "Julian + Anja",
    summary: "3 nights — the diving grand finale",
    note: "3 nights. Cabo Pulmo Beach Resort is the obvious choice for divers.",
  },
  {
    date: "1 Jul 2026",
    day: "Wed",
    title: "Dive day — El Bajo + Cantil del Tiburón",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    audience: "Julian + Anja",
    summary: "El Bajo + Cantil del Tiburón",
    note: "El Bajo + Cantil del Tiburón. Bull shark aggregation possible in summer.",
  },
  {
    date: "2 Jul 2026",
    day: "Thu",
    title: "Dive day + Los Arbolitos snorkel",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    audience: "Julian + Anja",
    summary: "Wreck dive, then the best shore snorkel",
    note: "El Vencedor wreck in the morning, Los Arbolitos in the afternoon.",
  },
  {
    date: "3 Jul 2026",
    day: "Fri",
    title: "Drive Cabo Pulmo → SJD (last night)",
    place: "Cabo Pulmo → San José del Cabo",
    type: "drive",
    status: "planned",
    audience: "Julian + Anja",
    summary: "Out before the flight; last night near the airport",
    time: "~2h30",
    note: "Leave Cabo Pulmo and drive to the San José del Cabo area for the last night, ready for the car return and flight the next morning.",
  },
  {
    date: "4 Jul 2026",
    day: "Sat",
    title: "SJD → home (KLM)",
    place: "SJD → BER",
    type: "flight",
    status: "booked",
    audience: "Julian + Anja",
    summary: "Return car and fly home",
    time: "Car return 11:00, fly SJD 13:30",
    bookedWith: "KLM (KL5375 ATL + KL0622 AMS + KL1779 BER)",
    note: "Payless car return 11:00, KLM SJD → ATL 13:30. Lands BER Sun 5 Jul 16:30.",
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

export const extraStays: ExtraStay[] = [];

export const routeOptions: RouteOption[] = [
  {
    id: "actual-route",
    name: "The Baja loop we drove",
    tagline: "SJD up to Magdalena Bay & Bahía Concepción, back down to Cabo Pulmo",
    status: "preferred",
    recommended: true,
    waypoints: [
      "San Jose del Cabo Airport",
      "Todos Santos, BCS",
      "Puerto San Carlos, BCS",
      "Loreto, BCS",
      "Mulege, BCS",
      "La Paz, BCS",
      "Los Barriles, BCS",
      "Cabo Pulmo, BCS",
    ],
    summary:
      "The route as actually driven: down the Pacific to Todos Santos, across to Puerto San Carlos for the Magdalena Bay whale tour, up to Loreto and the bays of Bahía Concepción, then back south to La Paz, on to Los Barriles and finally the Cabo Pulmo reef before flying home from SJD.",
    sequence: [
      "Todos Santos",
      "Magdalena Bay",
      "Loreto",
      "Bahía Concepción",
      "La Paz",
      "Los Barriles",
      "Cabo Pulmo",
    ],
    legs: [
      { from: "SJD airport", to: "Todos Santos", distance: "~75 km", duration: "1h30", note: "Via Cerritos for lunch + first beach." },
      { from: "Todos Santos", to: "Puerto San Carlos", distance: "~290 km", duration: "~4h", note: "Across to Magdalena Bay via Ciudad Constitución." },
      { from: "Puerto San Carlos", to: "Loreto", distance: "~180 km", duration: "~2h30", note: "After the whale tour; swim at Bahía Ensenada Blanca." },
      { from: "Loreto", to: "Bahía Concepción", distance: "~135 km", duration: "1h45", note: "Beach day at Playa Requesón on the way." },
      { from: "Bahía Concepción", to: "La Paz", distance: "~500 km", duration: "~6h", note: "Return south with the Ecuador–Germany match stop in Loreto." },
      { from: "La Paz", to: "Los Barriles", distance: "~110 km", duration: "~2h", note: "Via La Ventana and the Punta Arena lighthouse." },
      { from: "Los Barriles", to: "Cabo Pulmo", distance: "~45 km", duration: "~1h", note: "Last 10 km unpaved." },
      { from: "Cabo Pulmo", to: "SJD airport", distance: "~100 km", duration: "2h30" },
    ],
    manuExit:
      "Manuela flew home on 27 June (UA766 SJD → ORD 11:52). She drove from La Paz to SJD on the morning of 27 June for the flight, while Julian + Anja carried on to Los Barriles.",
    pros: [
      "Magdalena Bay whale tour added on the way north.",
      "Bahía Concepción bays and a glamping stop in the middle of the trip.",
      "Cabo Pulmo kept as the diving grand finale right before flying home.",
    ],
    cons: [
      "The Bahía Concepción → La Paz return leg (~6h) is a long driving day.",
      "Backtracking south past Loreto on the return adds distance.",
    ],
  },
];

export const reservationPriority = [
  "Cabo Pulmo accommodation + dive operator for 1–4 July (the last thing still open)",
  "Cabo Pulmo → SJD on 4 July: leave by ~07:30 for the 11:00 car return and 13:30 KLM flight",
  "Everything earlier (CDMX, Todos Santos, Magdalena Bay whale tour, Loreto, Bahía Concepción, La Paz, Los Barriles, Manuela's flight) is done",
];
