export type Link = {
  label: string;
  href: string;
};

export type Activity = {
  title: string;
  note: string;
  pace: "easy" | "half day" | "rainy day" | "food";
  links?: Link[];
};

export type DiarySlot = {
  day: string;
  prompt: string;
  photoSlots: number;
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
  hotel?: {
    name: string;
    detail: string;
    cancellation?: string;
    map?: string;
    links?: Link[];
  };
  summary: string;
  travelIn?: string;
  travelOut?: string;
  links: Link[];
  thingsToDo: Activity[];
  foodIdeas: Activity[];
  rainyDayIdeas: Activity[];
  diary: DiarySlot[];
  sourceUrls: string[];
};

export type TrainLeg = {
  date: string;
  from: string;
  to: string;
  time: string;
  detail: string;
  status: "booked" | "candidate" | "preferred" | "alternative";
  cost?: string;
};

export type ItineraryItem = {
  date: string;
  title: string;
  place: string;
  type: "train" | "hotel" | "decision" | "day trip";
  status: "booked" | "candidate" | "preferred" | "to book" | "flexible";
  time?: string;
  bookedWith?: string;
  cost?: string;
  cancellation?: string;
  note: string;
};

export const heroStats = [
  { label: "Trip window", value: "27 July to 6 August 2026" },
  { label: "Route", value: "London, Koblenz, Heidelberg, Freiburg and Cologne" },
  { label: "Style", value: "Trains, old towns, castles, markets and river views" },
];

export const trainLegs: TrainLeg[] = [
  {
    date: "27 July",
    from: "London St Pancras",
    to: "Brussels Midi",
    time: "09:01 to 12:05",
    detail: "Eurostar out. Leave buffer time at St Pancras for passports and snacks.",
    status: "booked",
  },
  {
    date: "27 July",
    from: "Bruxelles Midi",
    to: "Koblenz Hbf",
    time: "12:25 to 15:46",
    detail: "Candidate train via Cologne.",
    status: "candidate",
    cost: "€115.98",
  },
  {
    date: "30 July",
    from: "Koblenz Hbf",
    to: "Heidelberg Hbf",
    time: "09:48 to 11:34 or 11:48 to 13:34",
    detail: "Direct options. Pick the one that fits checkout and breakfast.",
    status: "candidate",
    cost: "€43.98",
  },
  {
    date: "2 August",
    from: "Heidelberg Hbf",
    to: "Freiburg Hbf",
    time: "10:43 to 12:31",
    detail: "Likely train with one transfer.",
    status: "candidate",
    cost: "€59.98",
  },
  {
    date: "5 August",
    from: "Freiburg Hbf",
    to: "Cologne Hbf",
    time: "13:55 to 17:05",
    detail: "Preferred direct train. Alternative is 11:55 to 15:05.",
    status: "preferred",
    cost: "€107.98",
  },
  {
    date: "6 August",
    from: "Cologne Hbf",
    to: "Brussels Midi",
    time: "09:43 to 11:35",
    detail: "Direct ICE 316, then Eurostar home.",
    status: "candidate",
    cost: "€83.98",
  },
];

export const stays: Stay[] = [
  {
    id: "koblenz",
    city: "Koblenz",
    chapter: "Chapter 1",
    dates: "27 to 30 July",
    nights: 3,
    mood: "River junctions and fortress views",
    colour: "var(--chapter-rhine)",
    stamp: "Rhein + Mosel",
    hotel: {
      name: "Hotel Trierer Hof",
      detail: "Booked via Booking.com, including breakfast.",
      cancellation: "Free cancellation up to 26 July.",
      map: "https://maps.google.com/?q=Hotel+Trierer+Hof+Koblenz",
      links: [
        { label: "Booking.com", href: "https://www.booking.com/hotel/de/trierer-hof.de.html" },
        {
          label: "Tripadvisor",
          href: "https://www.tripadvisor.co.uk/Hotel_Review-g187391-d632940-Reviews-Trierer_Hof-Koblenz_Rhineland_Palatinate.html",
        },
      ],
    },
    summary:
      "Koblenz is the gentle start: old town lanes, the Rhine and Moselle meeting at Deutsches Eck, a cable car over the water and an easy fortress afternoon.",
    travelIn: "Arrive by train from Brussels on 27 July.",
    travelOut: "Train to Heidelberg on 30 July.",
    links: [
      { label: "Visit Koblenz", href: "https://www.visit-koblenz.de/" },
      { label: "Cable car", href: "https://www.seilbahn-koblenz.de/" },
      { label: "KD river cruises", href: "https://www.k-d.com/en/" },
      { label: "Day trips from Koblenz", href: "https://www.visit-koblenz.de/en/region/day-trips" },
    ],
    thingsToDo: [
      {
        title: "Deutsches Eck and the riverside",
        note: "Start with the big confluence view where the Moselle meets the Rhine, then wander the promenade towards St Castor and the old town.",
        pace: "easy",
        links: [{ label: "Deutsches Eck", href: "https://www.visit-koblenz.de/en/sights/deutsches-eck" }],
      },
      {
        title: "Cable car to Ehrenbreitstein Fortress",
        note: "Take the panoramic cabins over the Rhine. The fortress has wide views, exhibitions and space to roam if the weather is kind.",
        pace: "half day",
        links: [
          { label: "Cable car info", href: "https://www.seilbahn-koblenz.de/" },
          { label: "Fortress", href: "https://www.tor-zum-welterbe.de/" },
        ],
      },
      {
        title: "Rhine or Moselle boat loop",
        note: "Keep this as a flexible river day. KD and local operators list seasonal sightseeing trips from Koblenz.",
        pace: "half day",
        links: [
          { label: "KD cruises", href: "https://www.k-d.com/en/" },
          { label: "Koblenz boats", href: "https://www.schifffahrtkoblenz.de/" },
        ],
      },
      {
        title: "Burg Eltz day trip",
        note: "The big fairytale castle, deep in the woods above the Moselle. Train from Koblenz to Moselkern (about 30 min), then a pretty 35 minute walk through the forest to the castle. Shuttle buses also run in summer.",
        pace: "half day",
        links: [
          { label: "Eltz Castle", href: "https://www.visit-koblenz.de/en/region/eifel/eltz-castle" },
          { label: "Burg Eltz official", href: "https://burg-eltz.de/en/" },
        ],
      },
      {
        title: "Marksburg Castle at Braubach",
        note: "The only Middle Rhine hilltop castle that has never been destroyed. Quick regional train south from Koblenz to Braubach (around 15 min), then a steep but short walk up. Good guided tour and proper castle feel for the kids.",
        pace: "half day",
        links: [
          { label: "Marksburg", href: "https://www.marksburg.de/en/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Attraction_Review-g1180686-d275462-Reviews-Marksburg_Castle-Braubach_Rhineland_Palatinate.html" },
        ],
      },
      {
        title: "Stolzenfels Castle",
        note: "Pretty Prussian summer palace just up the Rhine from Koblenz. Bus 650 from the city centre takes about 15 minutes to Schloss Stolzenfels, then a 20 minute walk up through the landscaped park with grottoes and waterfalls.",
        pace: "half day",
        links: [
          { label: "Stolzenfels Castle", href: "https://www.visit-koblenz.de/en/sights/stolzenfels-castle" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Attraction_Review-g187391-d266028-Reviews-Stolzenfels_Castle-Koblenz_Rhineland_Palatinate.html" },
        ],
      },
      {
        title: "Cochem on the Moselle",
        note: "Storybook Moselle town with the Reichsburg perched above it. Around 35 to 50 minutes by train from Koblenz, then a 20 minute walk up to the castle or a small shuttle bus. Good as a full day if the river day works for the weather.",
        pace: "half day",
        links: [
          { label: "Cochem tourism", href: "https://www.cochem.de/en/" },
          { label: "Reichsburg Cochem", href: "https://reichsburg-cochem.de/en/" },
        ],
      },
    ],
    foodIdeas: [
      {
        title: "Old town dinner stroll",
        note: "Pick somewhere near the old town or riverfront once everyone has found their bearings.",
        pace: "food",
      },
      {
        title: "Fortress terrace pause",
        note: "If the cable car day works, use the fortress views as the built-in drink stop.",
        pace: "food",
      },
    ],
    rainyDayIdeas: [
      {
        title: "Forum Confluentes and museums",
        note: "A simple fallback near the centre if the river plans look wet.",
        pace: "rainy day",
      },
      {
        title: "Fortress exhibitions",
        note: "Still useful in patchy weather, especially if the cable car is running and visibility is decent.",
        pace: "rainy day",
      },
    ],
    diary: [
      { day: "27 July", prompt: "Arrival day: first German snack, first river photo, first favourite street.", photoSlots: 3 },
      { day: "28 July", prompt: "Fortress or river day notes, best view and funniest travel moment.", photoSlots: 4 },
      { day: "29 July", prompt: "Slow Koblenz day: what would we recommend to another family?", photoSlots: 4 },
    ],
    sourceUrls: [
      "https://www.visit-koblenz.de/en/sights/deutsches-eck",
      "https://www.seilbahn-koblenz.de/",
      "https://www.tor-zum-welterbe.de/",
      "https://www.k-d.com/en/",
      "https://www.visit-koblenz.de/en/region/day-trips",
      "https://www.visit-koblenz.de/en/region/eifel/eltz-castle",
      "https://www.marksburg.de/en/",
      "https://www.visit-koblenz.de/en/sights/stolzenfels-castle",
      "https://www.cochem.de/en/",
    ],
  },
  {
    id: "heidelberg",
    city: "Heidelberg",
    chapter: "Chapter 2",
    dates: "30 July to 2 August",
    nights: 3,
    mood: "Castle, bridge and river town wandering",
    colour: "var(--chapter-sandstone)",
    stamp: "Schloss + Neckar",
    hotel: {
      name: "Premier Inn Heidelberg City Centre",
      detail: "Booked via Booking.com, with cancellation.",
      map: "https://maps.google.com/?q=Premier+Inn+Heidelberg+City+Centre",
      links: [
        {
          label: "Booking.com",
          href: "https://www.booking.com/hotel/de/premier-inn-heidelberg-city-centre-heidelberg1.de.html",
        },
        {
          label: "Tripadvisor",
          href: "https://www.tripadvisor.co.uk/Hotel_Review-g187286-d4869776-Reviews-Premier_Inn_Heidelberg_City_Zentrum_hotel-Heidelberg_Baden_Wurttemberg.html",
        },
      ],
    },
    summary:
      "Heidelberg is the storybook middle: castle ruins above the old town, the Old Bridge across the Neckar and a walk with one of the best city views.",
    travelIn: "Direct train from Koblenz on 30 July.",
    travelOut: "Train to Freiburg on 2 August.",
    links: [
      { label: "Heidelberg tourism", href: "https://www.tourism-heidelberg.com/" },
      { label: "Heidelberg Castle", href: "https://www.schloss-heidelberg.de/en/" },
      { label: "Bergbahn funicular", href: "https://www.bergbahn-heidelberg.de/en/" },
      { label: "Weisse Flotte boats", href: "https://www.weisse-flotte-heidelberg.de/en/" },
      { label: "Speyer tourism", href: "https://www.speyer.de/en/" },
    ],
    thingsToDo: [
      {
        title: "Castle and old town",
        note: "Use the castle as the big anchor, then drift down through Kornmarkt, Marktplatz and the Hauptstrasse.",
        pace: "half day",
        links: [{ label: "Castle", href: "https://www.schloss-heidelberg.de/en/" }],
      },
      {
        title: "Old Bridge and bridge monkey",
        note: "Good for an early evening loop over the Neckar and back into the old town.",
        pace: "easy",
        links: [{ label: "Old Bridge", href: "https://www.tourism-heidelberg.com/explore/historical-sights/altstadt/old-bridge/index_eng.html" }],
      },
      {
        title: "Philosopher's Walk",
        note: "A climb, but the reward is the classic city, river and castle view. Save it for a clear, cooler spell.",
        pace: "half day",
        links: [{ label: "Philosopher's Walk", href: "https://www.tourism-heidelberg.com/explore/historical-sights/heiligenberg/philosophers-walk/index_eng.html" }],
      },
      {
        title: "Königstuhl funicular to the top",
        note: "Hop on Germany's oldest funicular from Kornmarkt up past the castle to Molkenkur, then change to the historic wooden upper section that climbs to Königstuhl at 568m. Wide views over Heidelberg and the Neckar valley, plus walking trails at the top.",
        pace: "half day",
        links: [
          { label: "Funicular railway", href: "https://www.tourism-heidelberg.com/explore/historical-sights/koenigstuhl/funicular-railway/index_eng.html" },
          { label: "Bergbahn tickets", href: "https://www.bergbahn-heidelberg.de/en/" },
        ],
      },
      {
        title: "Neckar boat to Neckarsteinach",
        note: "Easy half day on the water: the Weisse Flotte runs upstream past four castles to Neckarsteinach, the little 'four castles town'. Lovely if a Heidelberg day needs to slow down.",
        pace: "half day",
        links: [
          { label: "Weisse Flotte Heidelberg", href: "https://www.weisse-flotte-heidelberg.de/en/" },
          { label: "Boat info", href: "https://www.tourism-heidelberg.com/destination/getting-around/boat/index_eng.html" },
        ],
      },
      {
        title: "Possible Speyer day trip",
        note: "Keep this as a maybe. Speyer works if everyone wants a change from Heidelberg and a cathedral day. About 30 minutes by train, with the UNESCO Imperial Cathedral and an easy walk to the Rhine.",
        pace: "half day",
        links: [
          { label: "Speyer", href: "https://www.speyer.de/en/" },
          { label: "Imperial Cathedral", href: "https://www.dom-zu-speyer.de/en/" },
        ],
      },
    ],
    foodIdeas: [
      {
        title: "Market square dinner",
        note: "Look around Marktplatz or side streets after the castle. It keeps the evening simple.",
        pace: "food",
      },
      {
        title: "River picnic option",
        note: "Grab easy food and use the Neckar as the view if the weather is warm.",
        pace: "food",
      },
    ],
    rainyDayIdeas: [
      {
        title: "Palatinate Museum",
        note: "A central old town option if rain makes the castle less appealing.",
        pace: "rainy day",
      },
      {
        title: "Castle interiors and cafe pause",
        note: "Still feels like Heidelberg even if the paths are damp.",
        pace: "rainy day",
      },
    ],
    diary: [
      { day: "30 July", prompt: "First Heidelberg impressions: castle spotted, best lane and dinner verdict.", photoSlots: 3 },
      { day: "31 July", prompt: "Bridge, castle or walk day: collect one postcard view and one tiny detail.", photoSlots: 5 },
      { day: "1 August", prompt: "Free choice day: Heidelberg again or Speyer side quest notes.", photoSlots: 5 },
    ],
    sourceUrls: [
      "https://www.tourism-heidelberg.com/explore/historical-sights/altstadt/index_eng.html",
      "https://www.tourism-heidelberg.com/explore/historical-sights/altstadt/old-bridge/index_eng.html",
      "https://www.tourism-heidelberg.com/explore/historical-sights/heiligenberg/philosophers-walk/index_eng.html",
      "https://www.schloss-heidelberg.de/en/",
      "https://www.tourism-heidelberg.com/explore/historical-sights/koenigstuhl/funicular-railway/index_eng.html",
      "https://www.bergbahn-heidelberg.de/en/",
      "https://www.weisse-flotte-heidelberg.de/en/",
      "https://www.speyer.de/en/",
      "https://www.dom-zu-speyer.de/en/",
    ],
  },
  {
    id: "freiburg",
    city: "Freiburg im Breisgau",
    chapter: "Chapter 3",
    dates: "2 to 5 August",
    nights: 3,
    mood: "Market mornings and Black Forest edges",
    colour: "var(--chapter-forest)",
    stamp: "Muenster + Baechle",
    hotel: {
      name: "Mercure Hotel Freiburg am Münster",
      detail: "Booked direct with Accor.",
      cancellation: "Free cancellation up to 1 August.",
      map: "https://maps.google.com/?q=Mercure+Hotel+Freiburg+am+M%C3%BCnster",
      links: [
        {
          label: "Booking.com",
          href: "https://www.booking.com/hotel/de/mercure-freiburg-am-munster.html",
        },
        {
          label: "Tripadvisor",
          href: "https://www.tripadvisor.co.uk/Hotel_Review-g187281-d199837-Reviews-Mercure_Hotel_Freiburg_am_Muenster-Freiburg_im_Breisgau_Baden_Wurttemberg.html",
        },
      ],
    },
    summary:
      "Freiburg is the sunny old town chapter: Münsterplatz, market food, little Bächle channels, Schlossberg views and an easy base for Gengenbach.",
    travelIn: "Train from Heidelberg on 2 August.",
    travelOut: "Preferred direct train to Cologne on 5 August.",
    links: [
      { label: "Visit Freiburg", href: "https://visit.freiburg.de/en" },
      { label: "Münstermarkt", href: "https://visit.freiburg.de/en/attractions/muenstermarkt-freiburg" },
      { label: "Schlossberg", href: "https://visit.freiburg.de/schlossberg" },
      { label: "Schauinslandbahn", href: "https://www.bergwelt-schauinsland.de/en/" },
      { label: "Kaiserstuhl", href: "https://visit.freiburg.de/en/discover/excursion-destinations-around-freiburg/kaiserstuhl-and-tuniberg" },
      { label: "Titisee", href: "https://hochschwarzwald.de/en/locations/titisee" },
    ],
    thingsToDo: [
      {
        title: "Münsterplatz and the morning market",
        note: "Go early enough for the bustle around the Minster. The market is the obvious breakfast, snack and photo target.",
        pace: "easy",
        links: [{ label: "Münstermarkt", href: "https://visit.freiburg.de/en/attractions/muenstermarkt-freiburg" }],
      },
      {
        title: "Bächle and old town wander",
        note: "Follow the little water channels through the old town and give everyone a small mission to spot details.",
        pace: "easy",
      },
      {
        title: "Schlossberg sunset",
        note: "Walk or ride up from the Stadtgarten area for views over the old town, the Minster and towards the hills.",
        pace: "half day",
        links: [{ label: "Schlossberg", href: "https://visit.freiburg.de/schlossberg" }],
      },
      {
        title: "Schauinslandbahn cable car",
        note: "Germany's longest circulating cable car. Tram 2 from the centre to Günterstal, then bus 21 to Talstation Schauinslandbahn. The cabin climbs to 1,220m in about 20 minutes, with easy 2 to 3km walks and a tower viewpoint at the top.",
        pace: "half day",
        links: [
          { label: "Schauinslandbahn", href: "https://www.bergwelt-schauinsland.de/en/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Attraction_Review-g1124211-d5490327-Reviews-Schauinslandbahn-Horben_Baden_Wurttemberg.html" },
        ],
      },
      {
        title: "Kaiserstuhl wine country",
        note: "The sunniest spot in Germany, ringed by vineyards and little wine villages. S-Bahn S1 from Freiburg out to Endingen or Breisach, then walk between vines. Easy to keep gentle: pick one village, a short loop and a long lunch.",
        pace: "half day",
        links: [
          { label: "Kaiserstuhl and Tuniberg", href: "https://visit.freiburg.de/en/discover/excursion-destinations-around-freiburg/kaiserstuhl-and-tuniberg" },
          { label: "Hiking the Kaiserstuhl", href: "https://visit.freiburg.de/en/discover/outdoor-activities/hiking/kaiserstuhl" },
        ],
      },
      {
        title: "Titisee in the Black Forest",
        note: "Classic Black Forest lake town, about 40 minutes by direct regional train from Freiburg. Easy lakeside walk, paddle boats and pedalos, lots of cuckoo clocks and Black Forest gâteau in town. Good fallback if the family wants a slower water day.",
        pace: "half day",
        links: [
          { label: "Titisee tourism", href: "https://hochschwarzwald.de/en/locations/titisee" },
          { label: "Day trips guide", href: "https://www.hochschwarzwald.de/en/things-to-see/day-trips" },
        ],
      },
    ],
    foodIdeas: [
      {
        title: "Lange Rote at the market",
        note: "The classic Freiburg sausage stop. There are also fruit, bread, cheese and sweet options around the stalls.",
        pace: "food",
      },
      {
        title: "Münsterplatz cafe pause",
        note: "Good low effort choice near the hotel if energy dips.",
        pace: "food",
      },
    ],
    rainyDayIdeas: [
      {
        title: "Museum für Neue Kunst or Augustinermuseum",
        note: "Central museum options for a wet afternoon close to the old town.",
        pace: "rainy day",
      },
      {
        title: "Covered cafe and tram loop",
        note: "Keep it gentle: market if it clears, cafe if it doesn't.",
        pace: "rainy day",
      },
    ],
    diary: [
      { day: "2 August", prompt: "Arrival and Münsterplatz: first market snack to remember.", photoSlots: 3 },
      { day: "3 August", prompt: "Freiburg old town day: best Bächle moment and best view.", photoSlots: 5 },
      { day: "4 August", prompt: "Day trip or slow day: what felt most Black Forest?", photoSlots: 5 },
    ],
    sourceUrls: [
      "https://visit.freiburg.de/en",
      "https://visit.freiburg.de/en/attractions/muenstermarkt-freiburg",
      "https://visit.freiburg.de/en/muensterplatz-freiburg",
      "https://visit.freiburg.de/schlossberg",
      "https://www.bergwelt-schauinsland.de/en/",
      "https://visit.freiburg.de/en/discover/excursion-destinations-around-freiburg/kaiserstuhl-and-tuniberg",
      "https://hochschwarzwald.de/en/locations/titisee",
      "https://www.hochschwarzwald.de/en/things-to-see/day-trips",
    ],
  },
  {
    id: "gengenbach",
    city: "Gengenbach day trip",
    chapter: "Side quest",
    dates: "From Freiburg",
    nights: 0,
    mood: "Black Forest old town in one easy outing",
    colour: "var(--chapter-gold)",
    stamp: "Black Forest",
    summary:
      "Gengenbach stays as a day trip, not an overnight stop. It gives the trip a smaller Black Forest town: gates, towers, half timbered streets and a slower pace.",
    travelIn: "Use Freiburg as the base and check train times closer to travel.",
    travelOut: "Return to Freiburg for the night.",
    links: [
      { label: "Gengenbach tourism", href: "https://www.stadt-gengenbach.de/rathaus/kultur-tourismus-gmbh" },
      { label: "Train planning", href: "https://int.bahn.de/en" },
    ],
    thingsToDo: [
      {
        title: "Old town loop",
        note: "Aim for the market square, timber framed streets, towers and gates without over planning it.",
        pace: "easy",
      },
      {
        title: "Photo walk",
        note: "Make this the scrapbook day: doors, signs, rooftops, fountains and a family photo in the square.",
        pace: "easy",
      },
      {
        title: "Black Forest feeling",
        note: "Use the trip as a contrast to Freiburg: smaller scale, slower streets and a greener backdrop.",
        pace: "half day",
      },
    ],
    foodIdeas: [
      {
        title: "Cake stop",
        note: "Leave space for a cafe stop. This is the right day for something sweet.",
        pace: "food",
      },
      {
        title: "Simple lunch near the square",
        note: "Keep the plan loose and choose once you're there.",
        pace: "food",
      },
    ],
    rainyDayIdeas: [
      {
        title: "Shortened old town visit",
        note: "If it rains, make it a quick train outing with cafe time rather than a full walking day.",
        pace: "rainy day",
      },
      {
        title: "Swap with Freiburg museum time",
        note: "Keep the Gengenbach day movable until the forecast is clearer.",
        pace: "rainy day",
      },
    ],
    diary: [
      { day: "Flexible", prompt: "Side quest notes: best sign, best cake and best little street.", photoSlots: 6 },
    ],
    sourceUrls: ["https://www.stadt-gengenbach.de/rathaus/kultur-tourismus-gmbh", "https://int.bahn.de/en"],
  },
  {
    id: "cologne",
    city: "Cologne",
    chapter: "Final night",
    dates: "5 to 6 August",
    nights: 1,
    mood: "Cathedral, river and easy final dinner",
    colour: "var(--chapter-ink)",
    stamp: "Dom + Rhine",
    hotel: {
      name: "Hilton Cologne",
      detail: "Booked with Hilton.",
      cancellation: "Cancellation up to 4 August.",
      map: "https://maps.google.com/?q=Hilton+Cologne",
    },
    summary:
      "Cologne is deliberately low effort: arrive, check in, see the cathedral, wander the old town or river and choose dinner without making the final night complicated.",
    travelIn: "Direct train from Freiburg on 5 August if the preferred option is booked.",
    travelOut: "Direct ICE to Brussels on 6 August, then Eurostar home.",
    links: [
      { label: "Cologne tourism", href: "https://www.koelntourismus.de/en" },
      { label: "Cologne Cathedral", href: "https://www.koelner-dom.de/en" },
      { label: "Hilton Cologne dining", href: "https://www.hilton.com/en/hotels/cgnhihi-hilton-cologne/dining/" },
    ],
    thingsToDo: [
      {
        title: "Cologne Cathedral",
        note: "The hotel is close enough to keep this simple. Go for the outside drama, then decide whether anyone has energy to go in.",
        pace: "easy",
        links: [{ label: "Cathedral", href: "https://www.koelner-dom.de/en" }],
      },
      {
        title: "Old town and Rhine loop",
        note: "A gentle last evening: old town lanes, river edge and maybe the Hohenzollern Bridge view.",
        pace: "easy",
        links: [{ label: "Old Town", href: "https://willkommen.koelntourismus.de/en/poi/cologne-old-town" }],
      },
      {
        title: "Rheinboulevard view",
        note: "If everyone is up for a bridge walk, the Deutz side gives a strong skyline view back to the old town.",
        pace: "easy",
        links: [{ label: "Rhine Boulevard", href: "https://willkommen.koelntourismus.de/en/poi/rhine-boulevard" }],
      },
    ],
    foodIdeas: [
      {
        title: "Hotel fallback",
        note: "Hilton Cologne has Pigeon Post Bar & Eatery, useful if the travel day wins.",
        pace: "food",
        links: [{ label: "Hotel dining", href: "https://www.hilton.com/en/hotels/cgnhihi-hilton-cologne/dining/" }],
      },
      {
        title: "Haxenhaus zum Rheingarten",
        note: "Riverside classic on the Frankenwerft, about 10 minutes' walk from the Hilton. Terrace right on the Rhine in good weather and famous for pork knuckle (Haxe) in nine variations with Kölsch. Old timber building dating back to 1178.",
        pace: "food",
        links: [
          { label: "Haxenhaus", href: "https://www.haxenhaus.de/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Restaurant_Review-g187371-d715369-Reviews-Haxenhaus-Cologne_North_Rhine_Westphalia.html" },
        ],
      },
      {
        title: "Em Krützche",
        note: "On the Rhine promenade just along from Haxenhaus, in a 16th century house. A slightly more refined take on classic German cooking: sauerbraten, herring, roast suckling pig and a small terrace facing the river.",
        pace: "food",
        links: [
          { label: "Em Krützche", href: "https://www.em-kruetzche.de/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Restaurant_Review-g187371-d695643-Reviews-Em_Krutzche-Cologne_North_Rhine_Westphalia.html" },
        ],
      },
      {
        title: "Brauhaus FRÜH am Dom",
        note: "The big classic Cologne brauhaus right behind the cathedral, a couple of minutes from the Hilton. Freshly tapped Früh Kölsch, hearty Rhenish food and proper Köbes waiters who keep refilling until you put the beermat on top.",
        pace: "food",
        links: [
          { label: "Früh am Dom", href: "https://www.frueh-am-dom.de/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Restaurant_Review-g187371-d7235024-Reviews-Fruh_am_Dom-Cologne_North_Rhine_Westphalia.html" },
        ],
      },
      {
        title: "Peters Brauhaus",
        note: "Historic Altstadt brauhaus on Mühlengasse, about 7 minutes from the Hilton. Beautiful stained glass ceiling, dark wood, Peters Kölsch and the usual schnitzel, sausages and Himmel un Ääd. Quintessential Cologne evening.",
        pace: "food",
        links: [
          { label: "Peters Brauhaus", href: "https://peters-brauhaus.de/en/" },
          { label: "Tripadvisor", href: "https://www.tripadvisor.co.uk/Restaurant_Review-g187371-d718270-Reviews-Peters_Brauhaus-Cologne_North_Rhine_Westphalia.html" },
        ],
      },
    ],
    rainyDayIdeas: [
      {
        title: "Cathedral plus hotel dinner",
        note: "The simplest wet weather plan, with very little walking.",
        pace: "rainy day",
      },
      {
        title: "Museum Ludwig",
        note: "Close to the cathedral and main station if you want one cultural stop before dinner.",
        pace: "rainy day",
      },
    ],
    diary: [
      { day: "5 August", prompt: "Last German evening: cathedral photo, final dinner and trip highlights.", photoSlots: 5 },
      { day: "6 August", prompt: "Home journey: best train snack and one thing we'd do again.", photoSlots: 3 },
    ],
    sourceUrls: [
      "https://www.koelntourismus.de/en",
      "https://willkommen.koelntourismus.de/en/poi/cologne-old-town",
      "https://willkommen.koelntourismus.de/en/poi/rhine-boulevard",
      "https://www.koelner-dom.de/en",
      "https://www.hilton.com/en/hotels/cgnhihi-hilton-cologne/dining/",
      "https://www.haxenhaus.de/",
      "https://www.em-kruetzche.de/",
      "https://www.frueh-am-dom.de/",
      "https://peters-brauhaus.de/en/",
    ],
  },
];

export const futureOptions = [
  "Keep using local data and commit diary updates through GitHub.",
  "Add Supabase if comments, sign ins or shared editing become useful.",
  "Add Vercel Blob if the main need is simple private photo storage.",
  "Add Sanity if the diary becomes a proper edited family travel journal.",
];

export const itineraryItems: ItineraryItem[] = [
  {
    date: "27 July 2026",
    title: "Eurostar to Brussels",
    place: "London St Pancras to Brussels Midi",
    type: "train",
    status: "booked",
    time: "09:01 to 12:05",
    bookedWith: "Eurostar",
    note: "Outbound train. Keep tickets and sensitive booking details in email or phone wallet.",
  },
  {
    date: "27 July 2026",
    title: "Brussels to Koblenz",
    place: "Bruxelles Midi to Koblenz Hbf via Cologne",
    type: "train",
    status: "candidate",
    time: "12:25 to 15:46",
    cost: "EUR 115.98",
    note: "Candidate connection. Check platform buffer at Brussels and Cologne before booking.",
  },
  {
    date: "27 to 30 July 2026",
    title: "Hotel Trierer Hof",
    place: "Koblenz",
    type: "hotel",
    status: "booked",
    bookedWith: "Booking.com",
    cost: "GBP 521 including breakfast",
    cancellation: "Free cancellation up to 26 July",
    note: "Sensitive booking details stay in email or phone only.",
  },
  {
    date: "30 July 2026",
    title: "Koblenz to Heidelberg",
    place: "Koblenz Hbf to Heidelberg Hbf",
    type: "train",
    status: "candidate",
    time: "09:48 to 11:34 or 11:48 to 13:34",
    cost: "EUR 43.98",
    note: "Direct options. Decide based on checkout, breakfast and how early everyone wants to move.",
  },
  {
    date: "30 July to 2 August 2026",
    title: "Premier Inn Heidelberg City Centre",
    place: "Heidelberg",
    type: "hotel",
    status: "booked",
    bookedWith: "Booking.com",
    cost: "GBP 347.05",
    cancellation: "Cancellation available",
    note: "Booking details stay in email or phone only.",
  },
  {
    date: "2 August 2026",
    title: "Heidelberg to Freiburg",
    place: "Heidelberg Hbf to Freiburg Hbf",
    type: "train",
    status: "candidate",
    time: "10:43 to 12:31",
    cost: "EUR 59.98",
    note: "Likely train with one transfer. Check final connection before booking.",
  },
  {
    date: "2 to 5 August 2026",
    title: "Mercure Hotel Freiburg am Muenster",
    place: "Freiburg im Breisgau",
    type: "hotel",
    status: "booked",
    bookedWith: "Accor direct",
    cost: "EUR 538.65, about GBP 468",
    cancellation: "Free cancellation up to 1 August",
    note: "Address: Auf der Zinnen 1, 79098 Freiburg. Booking details stay in email or phone only.",
  },
  {
    date: "Flexible from Freiburg",
    title: "Gengenbach day trip",
    place: "Freiburg to Gengenbach return",
    type: "day trip",
    status: "flexible",
    note: "Keep this movable around weather. It is a day trip, not an overnight stay.",
  },
  {
    date: "5 August 2026",
    title: "Freiburg to Cologne",
    place: "Freiburg Hbf to Cologne Hbf",
    type: "train",
    status: "preferred",
    time: "13:55 to 17:05",
    cost: "EUR 107.98",
    note: "Preferred direct train. Alternative is 11:55 to 15:05 at EUR 119.98.",
  },
  {
    date: "5 to 6 August 2026",
    title: "Hilton Cologne",
    place: "Cologne",
    type: "hotel",
    status: "booked",
    bookedWith: "Hilton",
    cost: "83k Hilton points",
    cancellation: "Cancellation up to 4 August",
    note: "Final night close to the station and cathedral. Booking details stay in Hilton account, email or phone only.",
  },
  {
    date: "6 August 2026",
    title: "Cologne to Brussels",
    place: "Cologne Hbf to Brussels Midi",
    type: "train",
    status: "candidate",
    time: "09:43 to 11:35",
    bookedWith: "ICE 316",
    cost: "EUR 83.98",
    note: "Direct ICE to Brussels, then Eurostar home.",
  },
  {
    date: "6 August 2026",
    title: "Eurostar home",
    place: "Brussels Midi to London St Pancras",
    type: "train",
    status: "to book",
    note: "Add final Eurostar details once booked. Keep sensitive booking details in email or phone only.",
  },
];
