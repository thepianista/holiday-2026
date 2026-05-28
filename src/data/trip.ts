export type Link = {
  label: string;
  href: string;
};

export type Activity = {
  title: string;
  note: string;
  pace: "easy" | "half day" | "rainy day" | "food" | "snorkel" | "dive";
  links?: Link[];
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
  map?: string;
  cancellation?: string;
  links?: Link[];
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

export type Passenger = "Julian" | "Wife" | "Both" | "Third";

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
  pnr?: string;
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
};

export const heroStats = [
  { label: "Trip window", value: "16 June to 4 July 2026" },
  { label: "Route", value: "Mexico City, Pescadero, La Paz, Loreto, Bahía Concepción, Cabo Pulmo" },
  { label: "Style", value: "City food crawl, Baja road trip, diving and snorkelling" },
];

export const flights: FlightLeg[] = [
  {
    id: "out-1-ber-ams",
    passenger: "Both",
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
    id: "out-2-ams-mex",
    passenger: "Both",
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
    note: "Boeing 787-9. Long haul. Lands ~02:00 local — taxi/Uber straight to the Airbnb.",
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
    id: "dom-mex-sjd-wife",
    passenger: "Wife",
    date: "Fri 19 Jun 2026",
    from: "Mexico City",
    fromCode: "MEX",
    to: "San José del Cabo",
    toCode: "SJD",
    airline: "TODO — booked separately, paste details",
    flightNumber: "TODO",
    departure: "TBD",
    arrival: "TBD",
    status: "to book",
    note: "Wife is on a different MEX → SJD ticket. Fill in once confirmed.",
  },
  {
    id: "dom-lto-sjd-third",
    passenger: "Third",
    date: "Sat 27 Jun 2026 (after ABC bus from Loreto)",
    from: "San José del Cabo",
    fromCode: "SJD",
    to: "TODO home airport",
    toCode: "—",
    airline: "TODO — paste once booked",
    flightNumber: "TODO",
    departure: "TBD",
    arrival: "TBD",
    status: "to book",
    note: "Third traveller flies home from SJD on 27 Jun after the Loreto → SJD overnight-ish bus.",
  },
  {
    id: "ret-1-sjd-atl",
    passenger: "Both",
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
    note: "Be at SJD by 11:30 — Payless rental return is at 11:00 same morning.",
  },
  {
    id: "ret-2-atl-ams",
    passenger: "Both",
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
    passenger: "Both",
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
    to: "Pescadero",
    duration: "1h30",
    note: "Pick up the Payless VW Tiguan at SJD 07:30 — confirm Mexican mandatory insurance + glass/tyres cover at the counter.",
    status: "planned",
  },
  {
    id: "pescadero-lapaz",
    date: "21 Jun",
    mode: "drive",
    from: "Pescadero",
    to: "La Paz",
    duration: "1h30",
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
    id: "third-bus-sjd",
    date: "27 Jun",
    mode: "bus",
    from: "Loreto",
    to: "San José del Cabo",
    duration: "8–9h",
    passenger: "Third",
    note: "ABC/Águila bus — book in advance at aguila.com.mx (~$50, one early morning departure).",
    status: "to book",
  },
  {
    id: "loreto-bahia",
    date: "27 Jun",
    mode: "drive",
    from: "Loreto",
    to: "Bahía Concepción",
    duration: "1h30",
    note: "Drop the third traveller at the bus first, then continue north.",
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
    hotels: [
      {
        name: "Independent Small Rooftop Studio (Airbnb)",
        detail:
          "Roma Norte — 39 Calle Cuernavaca, 06140. Hosts: Lorenza & Mercedes. Check-in from 11:00 on 16 Jun, check-out by 11:00 on 19 Jun.",
        status: "booked",
        map: "https://maps.google.com/?q=39+Calle+Cuernavaca,+06140+Ciudad+de+M%C3%A9xico",
      },
    ],
    summary:
      "Three nights to land softly: altitude, language, big lunches and walking neighbourhoods. Roma Norte and Condesa are the calmest, food-densest bases.",
    travelIn: "Arrive into MEX on the evening of 16 June. Uber/Cabify into Roma Norte — about 45 min depending on traffic.",
    travelOut: "Short flight MEX → SJD on the morning of 19 June, then 1h30 drive to Pescadero.",
    links: [
      { label: "CDMX tourism", href: "https://www.cdmx.gob.mx/turismo" },
      { label: "Roma Norte guide", href: "https://eatingaround.com.mx/" },
      { label: "MEX airport", href: "https://www.aicm.com.mx/" },
    ],
    thingsToDo: [
      {
        title: "Centro Histórico half-day",
        note: "Zócalo, Catedral Metropolitana, Templo Mayor and the Diego Rivera murals at Palacio Nacional (book online).",
        pace: "half day",
        links: [{ label: "Templo Mayor", href: "https://www.templomayor.inah.gob.mx/" }],
      },
      {
        title: "Museo Nacional de Antropología",
        note: "World-class. Easily a half day. Combine with a walk in Bosque de Chapultepec.",
        pace: "half day",
        links: [{ label: "Museum", href: "https://www.mna.inah.gob.mx/" }],
      },
      {
        title: "Coyoacán + Casa Azul (Frida Kahlo)",
        note: "Pre-book the Casa Azul slot. Wander Coyoacán market for churros and cafés afterwards.",
        pace: "half day",
        links: [{ label: "Casa Azul", href: "https://www.museofridakahlo.org.mx/" }],
      },
      {
        title: "Xochimilco + Museo Dolores Olmedo",
        note: "Half day on the trajineras. Less touristy on weekdays. Bring snacks and a small group is more fun.",
        pace: "half day",
      },
      {
        title: "Roma + Condesa walking loop",
        note: "Parque México → Parque España → Avenida Amsterdam → Plaza Río de Janeiro. Café stops every 30 min.",
        pace: "easy",
      },
      {
        title: "Teotihuacán day trip",
        note: "Pyramids of the Sun and Moon. Best very early to beat heat. Driver/guide combo simpler than DIY.",
        pace: "half day",
        links: [{ label: "INAH info", href: "https://www.inah.gob.mx/zonas/82-zona-arqueologica-de-teotihuacan" }],
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
      "Altitude 2,240 m — go easy on alcohol the first night.",
      "Uber and Cabify both work well. Avoid street taxis at night.",
      "Tipping: ~10–15% in restaurants, 10 pesos per bag for porters.",
      "Tap water no, bottled or filtered yes. Ice in established restaurants is fine.",
    ],
  },
  {
    id: "pescadero",
    city: "Pescadero / Todos Santos",
    chapter: "Chapter 2",
    dates: "19 to 21 June",
    nights: 2,
    mood: "Pacific surf beach + a slow Baja arrival",
    colour: "var(--chapter-gold)",
    stamp: "Pacific · Sunsets",
    hotels: [
      {
        name: "Cerritos Beach Inn",
        detail: "Small boutique right on Playa Cerritos. Good food, casual.",
        status: "candidate",
      },
      {
        name: "Hotel San Cristóbal",
        detail: "Quieter, adults-only, design-led. Higher price point.",
        status: "candidate",
        links: [{ label: "San Cristóbal", href: "https://sancristobalbaja.com/" }],
      },
      {
        name: "Todos Santos Boutique Hotel",
        detail: "Central Todos Santos pueblo, walkable to cafés and galleries.",
        status: "candidate",
      },
      {
        name: "La Poza Boutique",
        detail: "Isolated on the lagoon beach, very quiet. Car needed.",
        status: "candidate",
      },
    ],
    summary:
      "Two nights to land after the flight. Pacific-side surf beaches, the Todos Santos pueblo and a first proper Baja sunset.",
    travelIn: "Drive SJD → Pescadero (~1h30) after the morning flight from MEX.",
    travelOut: "Drive Pescadero → La Paz (~1h30) on 21 June.",
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
    hotels: [
      {
        name: "Hotel Catedral La Paz",
        detail: "Best mid-range bet. Rooftop pool, quieter than the Malecón hotels.",
        status: "candidate",
        links: [{ label: "Hotel Catedral", href: "https://hotelcatedrallapaz.com/" }],
      },
      {
        name: "Casa al Mar",
        detail: "Boutique directly on the Malecón. Loud on weekends.",
        status: "candidate",
      },
      {
        name: "Malecón 1680",
        detail: "Modern apartments with kitchens. Useful for longer stays.",
        status: "candidate",
      },
      {
        name: "HBlue Malecón",
        detail: "Rooftop bar, eastern Malecón end, slightly quieter.",
        status: "candidate",
      },
    ],
    summary:
      "Three nights with a boat day to Espíritu Santo, the first dive day with Mantas possible at La Reina, and Balandra for an afternoon.",
    travelIn: "Drive from Pescadero on 21 June (~1h30).",
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
    hotels: [
      {
        name: "Loreto Playa Boutique Hotel",
        detail: "Five rooms, very personal service, on the Malecón, small pool.",
        status: "preferred",
      },
    ],
    summary:
      "Three nights based in the old mission town. One boat day in the Marine Park (Coronado / Danzante), one dive day and an evening in the pueblo.",
    travelIn: "Drive from La Paz on 24 June (~4h30) via Ciudad Constitución.",
    travelOut: "27 June split: drop the third traveller at the ABC bus → SJD, then Julian + wife drive to Bahía Concepción.",
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
    mood: "Empty turquoise bays + kayak days (wife only)",
    colour: "var(--chapter-sandstone)",
    stamp: "Bahía · Kayak + Palapa",
    hotels: [
      {
        name: "Mulege Beach Glamping (Playa La Escondida)",
        detail: "Simple, pit toilets, direct beach access.",
        status: "candidate",
      },
      {
        name: "Beach palapas · Playa el Burro",
        detail: "~$12/night, very basic huts. Cash only.",
        status: "candidate",
      },
      {
        name: "Beach palapas · Playa Santispac",
        detail: "Same vibe — choose between Burro and Santispac on arrival.",
        status: "candidate",
      },
      {
        name: "Hotel Las Casitas · Mulegé",
        detail: "Hotel fallback in Mulegé pueblo, garden setting.",
        status: "candidate",
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
    hotels: [
      {
        name: "Cabo Pulmo Beach Resort",
        detail: "Bungalows with attached dive shop. The obvious diver pick.",
        status: "preferred",
        links: [{ label: "Resort", href: "https://www.cabopulmobeachresort.com/" }],
      },
      {
        name: "Bungalows Cabo Pulmo",
        detail: "Well-equipped bungalows ~50 m from the beach.",
        status: "candidate",
      },
      {
        name: "Costa Coral Cabo Pulmo",
        detail: "Newer apartments slightly outside the village. Dive packages available.",
        status: "candidate",
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
    bookedWith: "Airbnb (Lorenza & Mercedes)",
    note: "Independent Small Rooftop Studio, 39 Calle Cuernavaca. 3 nights.",
  },
  {
    date: "19 Jun 2026",
    day: "Fri",
    title: "MEX → SJD (VivaAerobus VB1212) + drive Pescadero",
    place: "Mexico City → Pescadero",
    type: "flight",
    status: "booked",
    time: "MEX 06:10 → SJD 07:15",
    bookedWith: "VivaAerobus (Julian) — wife's leg TBD",
    note: "Pick up Payless rental at SJD 07:30, drive ~1h30 to Pescadero.",
  },
  {
    date: "19–21 Jun 2026",
    day: "Fri–Sun",
    title: "Pescadero — Pacific arrival",
    place: "Pescadero / Todos Santos",
    type: "hotel",
    status: "to book",
    cancellation: "Hold a refundable option until 7 days out.",
    note: "2 nights. Strand and pueblo only — keep this slow.",
  },
  {
    date: "21 Jun 2026",
    day: "Sun",
    title: "Drive Pescadero → La Paz",
    place: "La Paz",
    type: "drive",
    status: "planned",
    time: "~1h30",
    note: "Arrive midday so the afternoon Balandra slot is possible.",
  },
  {
    date: "21–24 Jun 2026",
    day: "Sun–Wed",
    title: "La Paz — bay + Espíritu Santo + dive day 1",
    place: "La Paz",
    type: "hotel",
    status: "to book",
    note: "3 nights. Espíritu Santo boat, Balandra slot, first dive day (Fang Ming + Swanee).",
  },
  {
    date: "22 Jun 2026",
    day: "Mon",
    title: "Espíritu Santo boat tour",
    place: "La Paz",
    type: "activity",
    status: "to book",
    note: "Book Punta Baja or Mar y Aventuras. Los Islotes is closed for the season — Ensenada Grande and Bonanza instead.",
  },
  {
    date: "23 Jun 2026",
    day: "Tue",
    title: "Dive day 1",
    place: "La Paz",
    type: "activity",
    status: "to book",
    note: "Fang Ming wreck + Swanee Reef. La Reina mantas if a third tank is doable.",
  },
  {
    date: "24 Jun 2026",
    day: "Wed",
    title: "Drive La Paz → Loreto",
    place: "Loreto",
    type: "drive",
    status: "planned",
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
    note: "Likely Loreto Playa Boutique — only 5 rooms, book ASAP.",
  },
  {
    date: "25 Jun 2026",
    day: "Thu",
    title: "Marine Park boat day",
    place: "Loreto",
    type: "activity",
    status: "to book",
    note: "Coronado + Danzante snorkel circuit.",
  },
  {
    date: "26 Jun 2026",
    day: "Fri",
    title: "Dive day 2",
    place: "Loreto",
    type: "activity",
    status: "to book",
    note: "Coronado wall or Punta Lobos depending on conditions.",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Third traveller: bus Loreto → SJD + flight home",
    place: "Loreto → SJD",
    type: "bus",
    status: "to book",
    time: "Early AM bus, 8–9h",
    bookedWith: "Aguila / ABC (aguila.com.mx)",
    cost: "~USD 50",
    note: "Third person leaves the group here. Book the bus ticket early — one departure per day.",
  },
  {
    date: "27 Jun 2026",
    day: "Sat",
    title: "Julian + wife: drive Loreto → Bahía Concepción",
    place: "Bahía Concepción",
    type: "drive",
    status: "planned",
    time: "~1h30",
    note: "We continue north after dropping the third person at the bus.",
  },
  {
    date: "27–30 Jun 2026",
    day: "Sat–Tue",
    title: "Bahía Concepción — bays + kayak",
    place: "Bahía Concepción",
    type: "hotel",
    status: "flexible",
    note: "3 nights. Can decide between glamping and palapas on arrival.",
  },
  {
    date: "30 Jun 2026",
    day: "Tue",
    title: "Drive Bahía Concepción → La Paz",
    place: "La Paz",
    type: "drive",
    status: "planned",
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
    note: "3 nights. Cabo Pulmo Beach Resort is the obvious choice for divers.",
  },
  {
    date: "2 Jul 2026",
    day: "Thu",
    title: "Dive day 3",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    note: "El Bajo + Cantil del Tiburón. Bull shark aggregation possible in summer.",
  },
  {
    date: "3 Jul 2026",
    day: "Fri",
    title: "Dive day 4 + Los Arbolitos snorkel",
    place: "Cabo Pulmo",
    type: "activity",
    status: "to book",
    note: "El Vencedor wreck in the morning, Los Arbolitos in the afternoon.",
  },
  {
    date: "4 Jul 2026",
    day: "Sat",
    title: "Drive Cabo Pulmo → SJD + KLM home",
    place: "Cabo Pulmo → BER",
    type: "flight",
    status: "booked",
    time: "Drive ~2h30, return car 11:00, fly SJD 13:30",
    bookedWith: "KLM (KL5375 ATL + KL0622 AMS + KL1779 BER)",
    note: "Leave Cabo Pulmo by 07:30. Lands BER Sun 5 Jul 16:30.",
  },
];

export const reservationPriority = [
  "Cabo Pulmo dive operator (Dive Cabo Pulmo) — small slots, fills fast",
  "Espíritu Santo boat tour (Punta Baja, Alonso Tours, Mar y Aventuras)",
  "Hotels Pescadero + La Paz + Loreto",
  "Third traveller: Aguila/ABC bus ticket Loreto → SJD on 27 Jun + flight home",
  "Wife's MEX → SJD domestic ticket on 19 Jun",
  "Cabo Pulmo accommodation (Beach Resort or Bungalows)",
  "Bahía Concepción — can usually be decided on the day",
];
