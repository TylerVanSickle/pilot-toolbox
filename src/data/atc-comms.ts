export interface CommScenario {
  id: number;
  category: string;
  title: string;
  situation: string;
  yourCall: string;
  expectedResponse: string;
  tips: string[];
}

export const commCategories = [
  "Ground Operations",
  "Takeoff & Departure",
  "En Route",
  "Pattern & Landing",
  "Emergency",
] as const;

export const commScenarios: CommScenario[] = [
  // === GROUND OPERATIONS ===
  {
    id: 1,
    category: "Ground Operations",
    title: "Listening to ATIS",
    situation:
      "You're at a towered airport (KXYZ) preparing to depart. You need to get the current weather and airport information before contacting ground.",
    yourCall: "(Listen to ATIS frequency — no transmission needed. Note the information identifier letter, e.g., 'Information Bravo')",
    expectedResponse:
      "KXYZ Information Bravo, 1853 Zulu. Wind 270 at 8, visibility 10, sky clear, temperature 22, dew point 14, altimeter 30.12. Landing and departing runway 27. Advise on initial contact you have Information Bravo.",
    tips: [
      "Always listen to ATIS before contacting ground or tower",
      "Write down the ATIS identifier letter — you'll need it in your first call",
      "Note the active runway, winds, and altimeter setting",
    ],
  },
  {
    id: 2,
    category: "Ground Operations",
    title: "Requesting taxi clearance",
    situation:
      "You're at the FBO ramp at a towered airport, ready to taxi. You have ATIS Information Bravo. Your aircraft is a Diamond DA40, callsign Diamond 738AB.",
    yourCall:
      "KXYZ Ground, Diamond 738AB at the FBO ramp, ready to taxi to runway 27, with Information Bravo.",
    expectedResponse:
      "Diamond 738AB, KXYZ Ground, taxi to runway 27 via Alpha, Bravo. Hold short of runway 27.",
    tips: [
      "Who you're calling, who you are, where you are, what you want, ATIS info",
      "Read back all hold-short instructions",
      "Write down the taxi route if it's complex",
    ],
  },
  {
    id: 3,
    category: "Ground Operations",
    title: "Ready for runup at hold-short",
    situation:
      "You've taxied to the run-up area near runway 27 and completed your run-up. You're ready for departure.",
    yourCall:
      "KXYZ Tower, Diamond 738AB, holding short of runway 27, ready for departure, VFR northbound.",
    expectedResponse:
      "Diamond 738AB, KXYZ Tower, runway 27, cleared for takeoff. Wind 270 at 8.",
    tips: [
      "Switch from ground to tower frequency when ready at the hold-short line",
      "State your direction of departure (or flight plan on file)",
      "Read back the clearance: 'Runway 27, cleared for takeoff, Diamond 738AB'",
    ],
  },

  // === TAKEOFF & DEPARTURE ===
  {
    id: 4,
    category: "Takeoff & Departure",
    title: "Departing the pattern",
    situation:
      "You've taken off from runway 27 and are climbing out. Tower told you to make a left crosswind departure.",
    yourCall:
      "(No call needed until tower contacts you, or if leaving their airspace:) KXYZ Tower, Diamond 738AB, clear of your airspace to the north. Switching to advisory frequency.",
    expectedResponse:
      "Diamond 738AB, radar service terminated, squawk VFR, frequency change approved. Have a good flight.",
    tips: [
      "Follow the departure instructions given by tower",
      "Don't switch frequency until tower says 'frequency change approved'",
      "Set your transponder to 1200 (VFR) after leaving controlled airspace",
    ],
  },
  {
    id: 5,
    category: "Takeoff & Departure",
    title: "Requesting flight following",
    situation:
      "You're departing VFR and want radar traffic advisories for your cross-country to KABC at 5,500 feet.",
    yourCall:
      "KXYZ Departure, Diamond 738AB, off runway 27, climbing through 2,000 for 5,500. Request VFR flight following to KABC.",
    expectedResponse:
      "Diamond 738AB, KXYZ Departure, radar contact. Squawk 4521. Altimeter 30.12.",
    tips: [
      "Flight following is a request — ATC can deny it if they're busy",
      "Have your destination, altitude, and aircraft type ready",
      "You're still responsible for see-and-avoid even with flight following",
    ],
  },

  // === EN ROUTE ===
  {
    id: 6,
    category: "En Route",
    title: "Position report at non-towered airport",
    situation:
      "You're approaching a non-towered airport (Smithville Municipal, CTAF 122.8) from the south, about 10 miles out.",
    yourCall:
      "Smithville traffic, Diamond 738AB, 10 miles to the south at 3,500, inbound for landing, Smithville.",
    expectedResponse:
      "(No response expected — but listen for other traffic making position reports)",
    tips: [
      "Say the airport name at the beginning AND end of your transmission",
      "Listen for other traffic and adjust your approach accordingly",
      "Common CTAF calls: 10 miles out, entering pattern, each leg, taking runway, clear of runway",
    ],
  },
  {
    id: 7,
    category: "En Route",
    title: "Transitioning through Class D",
    situation:
      "You're on a cross-country and need to fly through Class D airspace around KXYZ. You're at 3,000 feet, 12 miles southeast.",
    yourCall:
      "KXYZ Tower, Diamond 738AB, 12 miles to the southeast at 3,000, requesting transition through your airspace to the northwest.",
    expectedResponse:
      "Diamond 738AB, KXYZ Tower, transition approved. Maintain 3,000, report clear of the Class Delta.",
    tips: [
      "You MUST establish two-way radio communication before entering Class D",
      "Two-way communication is established when ATC uses your callsign",
      "If they say 'standby' with your callsign, you're cleared to enter. If they say 'aircraft calling, standby' — you are NOT cleared to enter",
    ],
  },
  {
    id: 8,
    category: "En Route",
    title: "Checking in with new frequency",
    situation:
      "Center has handed you off to a new frequency during flight following. The new frequency is 124.5.",
    yourCall:
      "Kansas City Center, Diamond 738AB, level 5,500.",
    expectedResponse:
      "Diamond 738AB, Kansas City Center, radar contact, altimeter 30.08.",
    tips: [
      "Keep check-ins short — who you're calling, who you are, your altitude",
      "Don't repeat all the information from your original request",
      "Read back any new altimeter settings or instructions",
    ],
  },

  // === PATTERN & LANDING ===
  {
    id: 9,
    category: "Pattern & Landing",
    title: "Calling inbound to a towered airport",
    situation:
      "You're returning to your home towered airport (KXYZ) from the east, about 12 miles out at 3,500 feet. You have ATIS Charlie.",
    yourCall:
      "KXYZ Tower, Diamond 738AB, 12 miles to the east at 3,500, inbound for landing with Information Charlie.",
    expectedResponse:
      "Diamond 738AB, KXYZ Tower, make straight-in runway 27, report 3-mile final. Altimeter 30.12.",
    tips: [
      "Get ATIS before calling tower",
      "Tower may give you a straight-in, or tell you to enter the pattern on a specific leg",
      "Read back pattern entry instructions and any assigned runway",
    ],
  },
  {
    id: 10,
    category: "Pattern & Landing",
    title: "Entering the pattern at a non-towered airport",
    situation:
      "You're approaching Smithville Municipal and plan to enter the left downwind for runway 18.",
    yourCall:
      "Smithville traffic, Diamond 738AB, entering left downwind runway 18, Smithville.",
    expectedResponse: "(Listen for other traffic — no ATC response at non-towered fields)",
    tips: [
      "The standard pattern entry is a 45-degree entry to the downwind leg",
      "Make calls on downwind, base, final, and clear of the runway",
      "Overfly the field at pattern altitude + 500 if you need to check the windsock",
    ],
  },
  {
    id: 11,
    category: "Pattern & Landing",
    title: "Go-around",
    situation:
      "You're on short final at a towered airport and the landing doesn't look right — you decide to go around.",
    yourCall: "KXYZ Tower, Diamond 738AB, going around.",
    expectedResponse:
      "Diamond 738AB, roger, make left closed traffic runway 27.",
    tips: [
      "Full power, carb heat off, reduce flaps incrementally",
      "Pitch for Vy and climb — fly the airplane first, then communicate",
      "A go-around is ALWAYS the right call if something doesn't feel right",
    ],
  },

  // === EMERGENCY ===
  {
    id: 12,
    category: "Emergency",
    title: "Declaring an emergency (Mayday)",
    situation:
      "You've had a complete engine failure at 4,000 feet, 8 miles west of KXYZ. You're heading toward a field.",
    yourCall:
      "Mayday, Mayday, Mayday. KXYZ Tower, Diamond 738AB, engine failure, 8 miles west at 4,000 feet, descending. Two souls on board, 3 hours of fuel. Landing in a field.",
    expectedResponse:
      "Diamond 738AB, KXYZ Tower, roger your Mayday. Emergency equipment standing by. Say your intentions.",
    tips: [
      "FLY THE AIRPLANE FIRST — Aviate, Navigate, Communicate",
      "Squawk 7700 on your transponder",
      "Include: who you are, what's wrong, where you are, souls on board, fuel remaining",
      "ATC will clear traffic and provide any assistance they can",
    ],
  },
  {
    id: 13,
    category: "Emergency",
    title: "Declaring urgency (Pan-Pan)",
    situation:
      "You're disoriented in deteriorating weather and need help finding an airport. You're not in immediate danger but need assistance.",
    yourCall:
      "Pan-Pan, Pan-Pan, Pan-Pan. Kansas City Center, Diamond 738AB, VFR pilot, lost in deteriorating weather, request vectors to nearest airport. Currently at 3,500, heading approximately 090.",
    expectedResponse:
      "Diamond 738AB, Kansas City Center, radar contact. Turn left heading 030, nearest airport is 12 miles. Descend at pilot's discretion. Say your fuel remaining and souls on board.",
    tips: [
      "Pan-Pan is for urgent situations that are NOT immediately life-threatening",
      "Don't be afraid to ask for help — that's what ATC is there for",
      "If a Pan-Pan situation worsens, upgrade to a Mayday",
      "ATC can give you no-gyro vectors if your instruments are failing",
    ],
  },
  {
    id: 14,
    category: "Emergency",
    title: "Radio failure at a towered airport",
    situation:
      "You're in the pattern at a towered airport and your radio has failed. You can hear nothing and can't transmit.",
    yourCall: "(No radio call possible — use light gun signals and squawk 7600)",
    expectedResponse:
      "Tower will use light gun signals: Steady green = cleared to land. Flashing green = return for landing. Steady red = give way, continue circling. Flashing red = airport unsafe. Alternating red/green = exercise extreme caution.",
    tips: [
      "Squawk 7600 for communication failure",
      "Look at the tower for light gun signals",
      "Rock your wings or flash your landing light to acknowledge",
      "Remember: steady green in flight = cleared to land, steady green on ground = cleared for takeoff",
    ],
  },
];
