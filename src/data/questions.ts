export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const categories = [
  "Aerodynamics",
  "Regulations",
  "Weather",
  "Navigation",
  "Aircraft Systems",
  "Flight Operations",
  "Human Factors",
  "Airport Operations",
] as const;

export const questions: Question[] = [
  // === AERODYNAMICS ===
  {
    id: 1,
    category: "Aerodynamics",
    question: "What are the four forces acting on an aircraft in flight?",
    options: [
      "Lift, Weight, Thrust, Drag",
      "Lift, Gravity, Power, Friction",
      "Thrust, Drag, Torque, Weight",
    ],
    correctIndex: 0,
    explanation:
      "The four forces are Lift (opposes weight), Weight (gravity), Thrust (forward force from the engine), and Drag (air resistance opposing motion).",
  },
  {
    id: 2,
    category: "Aerodynamics",
    question:
      "What happens to the stall speed of an aircraft when the bank angle increases?",
    options: [
      "Stall speed decreases",
      "Stall speed increases",
      "Stall speed remains the same",
    ],
    correctIndex: 1,
    explanation:
      "In a banked turn, the load factor increases, which increases the stall speed. In a 60-degree bank, the load factor is 2G and stall speed increases by about 40%.",
  },
  {
    id: 3,
    category: "Aerodynamics",
    question: "What is the critical angle of attack for most airfoils?",
    options: [
      "Approximately 8-10 degrees",
      "Approximately 15-20 degrees",
      "Approximately 25-30 degrees",
    ],
    correctIndex: 1,
    explanation:
      "Most airfoils reach their critical angle of attack (where the wing stalls) at approximately 15-20 degrees angle of attack, regardless of airspeed or attitude.",
  },
  {
    id: 4,
    category: "Aerodynamics",
    question:
      "An aircraft can stall at any airspeed and any attitude. True or false?",
    options: ["True", "False", "Only at low airspeeds"],
    correctIndex: 0,
    explanation:
      "A stall occurs when the critical angle of attack is exceeded. This can happen at any airspeed and any flight attitude — it is purely a function of angle of attack.",
  },
  {
    id: 5,
    category: "Aerodynamics",
    question: "What causes adverse yaw during a turn?",
    options: [
      "P-factor and torque",
      "The raised aileron creates more drag than the lowered aileron",
      "The lowered aileron creates more drag than the raised aileron",
    ],
    correctIndex: 2,
    explanation:
      "The lowered (down) aileron on the raised wing produces more induced drag than the raised (up) aileron on the lowered wing, causing the nose to yaw opposite the direction of the turn.",
  },
  {
    id: 6,
    category: "Aerodynamics",
    question: "What is ground effect?",
    options: [
      "Increased drag near the ground",
      "A reduction in induced drag when flying within one wingspan of the surface",
      "Turbulence caused by ground heating",
    ],
    correctIndex: 1,
    explanation:
      "Ground effect is the increased efficiency (reduced induced drag and increased lift) that occurs when an aircraft flies within approximately one wingspan of the surface. It can cause the aircraft to become airborne before reaching proper flying speed.",
  },
  {
    id: 7,
    category: "Aerodynamics",
    question: "What effect do flaps have on stall speed?",
    options: [
      "Flaps increase stall speed",
      "Flaps have no effect on stall speed",
      "Flaps decrease stall speed",
    ],
    correctIndex: 2,
    explanation:
      "Flaps increase the coefficient of lift, allowing the wing to produce the required lift at a lower airspeed. This effectively decreases the stall speed.",
  },
  {
    id: 8,
    category: "Aerodynamics",
    question:
      "Which of the three axes does the elevator control movement around?",
    options: ["Lateral axis (pitch)", "Longitudinal axis (roll)", "Vertical axis (yaw)"],
    correctIndex: 0,
    explanation:
      "The elevator controls pitch around the lateral axis. The ailerons control roll around the longitudinal axis. The rudder controls yaw around the vertical axis.",
  },

  // === REGULATIONS ===
  {
    id: 9,
    category: "Regulations",
    question:
      "Under FAR 91.205, what is the minimum equipment required for VFR day flight? (memory aid: A TOMATO FLAMES)",
    options: [
      "Airspeed indicator, Altimeter, Compass, Tachometer, Oil pressure gauge, Oil temperature gauge",
      "Airspeed indicator, Tachometer, Oil pressure & temp gauges, Manifold pressure gauge, Altimeter, Temperature gauge, Oil quantity, Fuel gauge, Landing gear indicator, Anti-collision lights, Magnetic compass, ELT, Seatbelts",
      "Just an airspeed indicator and altimeter",
    ],
    correctIndex: 1,
    explanation:
      "A TOMATO FLAMES: Airspeed indicator, Tachometer, Oil pressure gauge, Manifold pressure gauge (if applicable), Altimeter, Temperature gauge (liquid cooled), Oil temperature gauge, Fuel gauge, Landing gear position indicator (if retractable), Anti-collision lights, Magnetic compass, ELT, Seatbelts/Shoulder harnesses.",
  },
  {
    id: 10,
    category: "Regulations",
    question:
      "What are the VFR cloud clearance and visibility requirements in Class E airspace above 1,200 AGL and below 10,000 MSL?",
    options: [
      "1 SM visibility, clear of clouds",
      "3 SM visibility; 500 below, 1,000 above, 2,000 horizontal from clouds",
      "5 SM visibility; 1,000 below, 1,000 above, 1 SM horizontal",
    ],
    correctIndex: 1,
    explanation:
      "In Class E airspace below 10,000 MSL: 3 statute miles visibility, and cloud clearance of 500 feet below, 1,000 feet above, and 2,000 feet horizontal.",
  },
  {
    id: 11,
    category: "Regulations",
    question:
      "How long before acting as PIC must a pilot have completed 3 takeoffs and landings to carry passengers? (FAR 61.57)",
    options: ["60 days", "90 days", "12 calendar months"],
    correctIndex: 1,
    explanation:
      "Per FAR 61.57, a pilot must have made at least 3 takeoffs and landings within the preceding 90 days in the same category, class, and type (if applicable) to carry passengers.",
  },
  {
    id: 12,
    category: "Regulations",
    question:
      "What is the maximum speed allowed below 2,500 feet AGL within 4 NM of a Class C or D airport?",
    options: ["200 knots", "250 knots", "230 knots"],
    correctIndex: 0,
    explanation:
      "Per FAR 91.117, no person may operate an aircraft at or below 2,500 feet AGL within 4 nautical miles of the primary airport of a Class C or D airspace at more than 200 knots indicated airspeed.",
  },
  {
    id: 13,
    category: "Regulations",
    question:
      "After consuming alcohol, how long must a pilot wait before acting as a required crewmember?",
    options: ["12 hours", "8 hours", "24 hours"],
    correctIndex: 1,
    explanation:
      '8 hours "bottle to throttle." Per FAR 91.17, no person may act as a crewmember within 8 hours after consuming alcohol, while under the influence, or with a BAC of 0.04% or more.',
  },
  {
    id: 14,
    category: "Regulations",
    question:
      "What documents must a pilot have in their personal possession while acting as PIC?",
    options: [
      "Pilot certificate only",
      "Pilot certificate and valid photo ID",
      "Pilot certificate, medical certificate, and valid photo ID",
    ],
    correctIndex: 2,
    explanation:
      "A pilot must carry their pilot certificate, a valid medical certificate (or BasicMed), and a government-issued photo ID when acting as PIC.",
  },
  {
    id: 15,
    category: "Regulations",
    question: "What documents must be on board the aircraft for flight? (ARROW)",
    options: [
      "Airworthiness certificate, Registration, Radio license, Operating handbook, Weight & balance",
      "Airworthiness certificate, Registration, Radio station license (if international), Operating limitations, Weight & balance data",
      "Airworthiness certificate and Registration only",
    ],
    correctIndex: 1,
    explanation:
      "ARROW: Airworthiness certificate, Registration, Radio station license (required for international flights), Operating limitations (POH), Weight & balance data.",
  },
  {
    id: 16,
    category: "Regulations",
    question: "What is the speed limit below 10,000 feet MSL?",
    options: ["200 knots IAS", "250 knots IAS", "288 knots IAS"],
    correctIndex: 1,
    explanation:
      "Per FAR 91.117, no person may operate an aircraft below 10,000 feet MSL at an indicated airspeed greater than 250 knots.",
  },

  // === WEATHER ===
  {
    id: 17,
    category: "Weather",
    question: "What is the standard lapse rate for temperature in the atmosphere?",
    options: [
      "2°C per 1,000 feet",
      "3.5°F per 1,000 feet",
      "2°C (3.5°F) per 1,000 feet",
    ],
    correctIndex: 2,
    explanation:
      "The standard (average) lapse rate is approximately 2°C (3.5°F) per 1,000 feet of altitude gain.",
  },
  {
    id: 18,
    category: "Weather",
    question: "What conditions are necessary for a thunderstorm to form?",
    options: [
      "Sufficient moisture, an unstable lapse rate, and a lifting action",
      "Cold front passage and high pressure",
      "Warm air mass and clear skies",
    ],
    correctIndex: 0,
    explanation:
      "Three ingredients are required for thunderstorm formation: sufficient moisture, an unstable lapse rate (unstable atmosphere), and a lifting action (fronts, orographic lift, convection).",
  },
  {
    id: 19,
    category: "Weather",
    question: "What are the three stages of a thunderstorm?",
    options: [
      "Building, Active, Dissipating",
      "Cumulus, Mature, Dissipating",
      "Formation, Peak, Decay",
    ],
    correctIndex: 1,
    explanation:
      "The three stages are: Cumulus (building, updrafts only), Mature (most dangerous — updrafts and downdrafts, heaviest rain, hail, lightning), and Dissipating (downdrafts dominate, rain decreases).",
  },
  {
    id: 20,
    category: "Weather",
    question:
      "What type of fog forms when warm, moist air moves over a cold surface?",
    options: ["Radiation fog", "Advection fog", "Upslope fog"],
    correctIndex: 1,
    explanation:
      "Advection fog forms when warm, moist air moves (advects) over a cooler surface. Unlike radiation fog, advection fog can form in windy conditions and at any time of day.",
  },
  {
    id: 21,
    category: "Weather",
    question:
      "When the temperature and dew point are converging, what weather phenomenon should a pilot expect?",
    options: [
      "Clear skies",
      "Fog or low clouds (reduced visibility)",
      "Increasing winds",
    ],
    correctIndex: 1,
    explanation:
      "When temperature and dew point converge (spread decreasing), the air is approaching saturation. Expect fog, mist, low clouds, or precipitation. Fog typically forms when the spread is 4°F (2°C) or less.",
  },
  {
    id: 22,
    category: "Weather",
    question:
      "What kind of weather is typically associated with a warm front?",
    options: [
      "Sudden thunderstorms with heavy rain",
      "Gradual cloud buildup, steady precipitation, and poor visibility",
      "Clear skies and gusty winds",
    ],
    correctIndex: 1,
    explanation:
      "Warm fronts bring gradual weather changes: stratus-type clouds, steady precipitation, reduced visibility, and fog. The weather can extend hundreds of miles ahead of the surface front.",
  },
  {
    id: 23,
    category: "Weather",
    question: "What are METARs and TAFs?",
    options: [
      "METAR = forecast; TAF = current observation",
      "METAR = current surface observation; TAF = terminal aerodrome forecast",
      "Both are types of radar weather reports",
    ],
    correctIndex: 1,
    explanation:
      "A METAR is an aviation routine weather report of current surface conditions at an airport. A TAF is a Terminal Aerodrome Forecast that covers a 24- or 30-hour period for the area within 5 SM of the airport.",
  },
  {
    id: 24,
    category: "Weather",
    question: "What causes wind shear and why is it dangerous?",
    options: [
      "It only occurs during hurricanes",
      "A sudden change in wind speed and/or direction over a short distance — can cause loss of lift on approach",
      "High altitude jet streams that don't affect small aircraft",
    ],
    correctIndex: 1,
    explanation:
      "Wind shear is a sudden change in wind speed/direction. It's especially dangerous during takeoff and landing because it can cause sudden loss of airspeed and lift. Common sources: thunderstorms (microbursts), fronts, and temperature inversions.",
  },

  // === NAVIGATION ===
  {
    id: 25,
    category: "Navigation",
    question: "What is the difference between true north and magnetic north?",
    options: [
      "There is no difference",
      "True north is the geographic North Pole; magnetic north is where a compass points, and the difference is called variation",
      "Magnetic north is more accurate than true north",
    ],
    correctIndex: 1,
    explanation:
      "True north is the geographic North Pole. Magnetic north is where a magnetic compass points. The angular difference between them is called magnetic variation (or declination) and varies by location.",
  },
  {
    id: 26,
    category: "Navigation",
    question:
      "When converting from true heading to magnetic heading, which way do you apply westerly variation?",
    options: [
      "Add westerly variation",
      "Subtract westerly variation",
      "Ignore variation",
    ],
    correctIndex: 0,
    explanation:
      '"East is least (subtract), West is best (add)." To convert from true heading to magnetic heading, add westerly variation and subtract easterly variation.',
  },
  {
    id: 27,
    category: "Navigation",
    question:
      "What VFR cruising altitude should you fly when on a magnetic course of 180° to 359°?",
    options: [
      "Odd thousands + 500 feet (e.g., 5,500 / 7,500)",
      "Even thousands + 500 feet (e.g., 4,500 / 6,500)",
      "Any altitude you want",
    ],
    correctIndex: 1,
    explanation:
      "Per FAR 91.159, when above 3,000 AGL on a magnetic course of 180° through 359°, fly at even thousands + 500 feet (4,500, 6,500, 8,500, etc.). Courses 0°–179° use odd thousands + 500.",
  },
  {
    id: 28,
    category: "Navigation",
    question: "What information does a VOR provide?",
    options: [
      "Distance and altitude from the station",
      "Magnetic bearing TO or FROM the station",
      "GPS coordinates of the aircraft",
    ],
    correctIndex: 1,
    explanation:
      "A VOR (VHF Omnidirectional Range) provides the magnetic bearing of the aircraft from the station. By selecting a radial on the OBS, the CDI shows whether you are on, left, or right of that radial.",
  },
  {
    id: 29,
    category: "Navigation",
    question: "What are latitude and longitude lines?",
    options: [
      "Latitude = vertical lines; Longitude = horizontal lines",
      "Latitude = horizontal lines (parallels) measuring N/S position; Longitude = vertical lines (meridians) measuring E/W position",
      "They are the same thing",
    ],
    correctIndex: 1,
    explanation:
      "Latitude lines (parallels) run east-west and measure position north or south of the equator (0° to 90°). Longitude lines (meridians) run north-south and measure position east or west of the Prime Meridian (0° to 180°).",
  },
  {
    id: 30,
    category: "Navigation",
    question: "What does a magenta airport symbol on a sectional chart indicate?",
    options: [
      "Controlled (towered) airport",
      "Uncontrolled (non-towered) airport",
      "Military airport",
    ],
    correctIndex: 1,
    explanation:
      "On sectional charts, magenta indicates an uncontrolled (non-towered) airport. Blue indicates a controlled (towered) airport.",
  },

  // === AIRCRAFT SYSTEMS ===
  {
    id: 31,
    category: "Aircraft Systems",
    question: "What does the green arc on the airspeed indicator represent?",
    options: [
      "Caution range",
      "Normal operating range (flaps up)",
      "Flap operating range",
    ],
    correctIndex: 1,
    explanation:
      "Green arc = normal operating range. White arc = flap operating range. Yellow arc = caution range (smooth air only). Red line = never exceed speed (Vne).",
  },
  {
    id: 32,
    category: "Aircraft Systems",
    question: "What is carburetor icing and when is it most likely to occur?",
    options: [
      "Only in freezing temperatures",
      "Can occur at temps between 20°F and 70°F with visible moisture",
      "Can occur at temps between approximately 20°F and 90°F, especially with high humidity, even on warm days",
    ],
    correctIndex: 2,
    explanation:
      "Carburetor ice can form at outside air temperatures between about 20°F and 90°F with humidity as low as 50%. The venturi effect and fuel vaporization can drop the temperature in the carburetor by up to 70°F. Most likely with high humidity and moderate temperatures.",
  },
  {
    id: 33,
    category: "Aircraft Systems",
    question: "What is the purpose of the mixture control?",
    options: [
      "To control the oil-to-fuel ratio",
      "To adjust the fuel-to-air ratio for different altitudes and conditions",
      "To switch between fuel tanks",
    ],
    correctIndex: 1,
    explanation:
      "The mixture control adjusts the ratio of fuel to air entering the engine. As altitude increases, air density decreases, so the mixture must be leaned to maintain the proper ratio. Running too rich wastes fuel; too lean can damage the engine.",
  },
  {
    id: 34,
    category: "Aircraft Systems",
    question:
      "What does a falling oil pressure indication combined with a rising oil temperature indicate?",
    options: [
      "Normal engine operation",
      "A serious engine problem — prepare for possible engine failure",
      "The oil needs to be changed soon",
    ],
    correctIndex: 1,
    explanation:
      "Falling oil pressure with rising oil temperature indicates a serious engine problem (possible oil leak or pump failure). Land as soon as practicable and be prepared for engine failure.",
  },
  {
    id: 35,
    category: "Aircraft Systems",
    question: "What are the components of the pitot-static system?",
    options: [
      "Pitot tube and static port — powers the airspeed indicator, altimeter, and vertical speed indicator",
      "Pitot tube only — powers all flight instruments",
      "Vacuum pump and gyroscopes",
    ],
    correctIndex: 0,
    explanation:
      "The pitot-static system uses the pitot tube (ram air pressure) and static port (ambient pressure). The airspeed indicator uses both pitot and static pressure. The altimeter and VSI use static pressure only.",
  },
  {
    id: 36,
    category: "Aircraft Systems",
    question:
      "If the pitot tube becomes blocked but the drain hole is open, what instrument is affected and how?",
    options: [
      "Altimeter reads incorrectly",
      "Airspeed indicator reads zero",
      "Airspeed indicator drops to zero as trapped ram air pressure equalizes",
    ],
    correctIndex: 2,
    explanation:
      "If the pitot tube is blocked and the drain hole is open, the ram air pressure will vent out and the airspeed indicator will drop to zero. If both the tube and drain are blocked, the ASI acts like an altimeter.",
  },

  // === FLIGHT OPERATIONS ===
  {
    id: 37,
    category: "Flight Operations",
    question: "What is the standard traffic pattern altitude at an uncontrolled airport?",
    options: [
      "800 feet AGL",
      "1,000 feet AGL",
      "1,500 feet AGL",
    ],
    correctIndex: 1,
    explanation:
      "The standard traffic pattern altitude is 1,000 feet AGL, unless otherwise specified in the Chart Supplement (formerly A/FD) for that airport.",
  },
  {
    id: 38,
    category: "Flight Operations",
    question: "All turns in the traffic pattern are made to the ___?",
    options: ["Right", "Left", "Either direction"],
    correctIndex: 1,
    explanation:
      "Standard traffic pattern turns are to the left, unless right traffic is indicated on the sectional chart or in the Chart Supplement. This is because the PIC typically sits in the left seat and has better visibility in left turns.",
  },
  {
    id: 39,
    category: "Flight Operations",
    question:
      "What actions should a pilot take if they experience an engine failure after takeoff?",
    options: [
      "Immediately turn back to the runway",
      "Pitch for best glide speed, pick a landing spot ahead (within a narrow arc), and attempt a restart if altitude permits",
      "Climb as high as possible before the engine fully quits",
    ],
    correctIndex: 1,
    explanation:
      "The first priority is to fly the airplane — pitch for best glide speed (Vg). Select a landing area within a narrow arc ahead of you. At low altitudes, turning back to the runway is extremely dangerous (the 'impossible turn'). Attempt an engine restart if time and altitude permit.",
  },
  {
    id: 40,
    category: "Flight Operations",
    question:
      "When two aircraft are on a head-on collision course, which direction should each pilot alter course?",
    options: [
      "Both turn left",
      "Both turn right",
      "The lower aircraft has right of way",
    ],
    correctIndex: 1,
    explanation:
      "Per FAR 91.113, when two aircraft are approaching head-on, each pilot shall alter course to the right.",
  },
  {
    id: 41,
    category: "Flight Operations",
    question:
      "Which aircraft has the right-of-way: a balloon, a glider, an airplane, or a rotorcraft?",
    options: [
      "Airplane — it is most maneuverable",
      "Balloon — it is least maneuverable",
      "Rotorcraft — it can hover",
    ],
    correctIndex: 1,
    explanation:
      "The right-of-way priority (from highest to lowest): balloon, glider, airship, airplane/rotorcraft. The least maneuverable aircraft generally has the right of way. An aircraft in distress always has the right of way over all others.",
  },
  {
    id: 42,
    category: "Flight Operations",
    question: "What is the purpose of a NOTAM?",
    options: [
      "A forecast of weather conditions",
      "A notice of conditions or changes that could affect flight safety (runway closures, TFRs, nav aid outages, etc.)",
      "An advisory from your flight instructor",
    ],
    correctIndex: 1,
    explanation:
      "NOTAMs (Notices to Air Missions) alert pilots to hazards or changes along a route or at a location. They include runway closures, TFRs, airspace restrictions, nav aid outages, and more. Checking NOTAMs is a critical part of preflight planning.",
  },

  // === HUMAN FACTORS ===
  {
    id: 43,
    category: "Human Factors",
    question: "What does the IMSAFE checklist assess?",
    options: [
      "Aircraft airworthiness",
      "Pilot fitness to fly: Illness, Medication, Stress, Alcohol, Fatigue, Emotion/Eating",
      "Weather conditions",
    ],
    correctIndex: 1,
    explanation:
      "IMSAFE is a personal fitness checklist: Illness (am I sick?), Medication (am I taking anything that could impair me?), Stress (am I under significant stress?), Alcohol (have I been drinking within 8 hours or am I hungover?), Fatigue (am I rested?), Emotion/Eating (am I emotionally fit and properly nourished?).",
  },
  {
    id: 44,
    category: "Human Factors",
    question: "What are the five hazardous attitudes in aviation and their antidotes?",
    options: [
      "Fear, Anger, Sadness, Confusion, Overconfidence",
      "Anti-authority, Impulsivity, Invulnerability, Macho, Resignation",
      "Recklessness, Laziness, Overconfidence, Stubbornness, Panic",
    ],
    correctIndex: 1,
    explanation:
      "The five hazardous attitudes: Anti-authority ('Follow the rules — they're usually right'), Impulsivity ('Not so fast — think first'), Invulnerability ('It could happen to me'), Macho ('Taking chances is foolish'), Resignation ('I'm not helpless — I can make a difference').",
  },
  {
    id: 45,
    category: "Human Factors",
    question: "What is spatial disorientation?",
    options: [
      "Not knowing your position on a map",
      "The inability to correctly interpret aircraft attitude, altitude, or airspeed due to sensory illusions",
      "Confusion about which runway to use",
    ],
    correctIndex: 1,
    explanation:
      "Spatial disorientation occurs when the body's sensory systems provide conflicting or misleading information about the aircraft's position and motion. It is a leading cause of fatal accidents. The solution: trust your instruments, not your body.",
  },
  {
    id: 46,
    category: "Human Factors",
    question: "What is hypoxia and at what altitude does it become a concern?",
    options: [
      "Dehydration; above 18,000 feet",
      "Oxygen deficiency in body tissues; symptoms can begin as low as 5,000 feet at night, significant risk above 10,000–12,500 feet",
      "Motion sickness; at any altitude",
    ],
    correctIndex: 1,
    explanation:
      "Hypoxia is a lack of sufficient oxygen in the body tissues. Night vision can be affected as low as 5,000 feet. Above 12,500 feet for more than 30 minutes, supplemental oxygen is required per FARs. Symptoms include impaired judgment, euphoria, headache, and cyanosis.",
  },
  {
    id: 47,
    category: "Human Factors",
    question:
      "What is the DECIDE model used for in aviation decision-making?",
    options: [
      "Emergency landing procedures",
      "A structured decision-making process: Detect, Estimate, Choose, Identify, Do, Evaluate",
      "Determining fuel requirements",
    ],
    correctIndex: 1,
    explanation:
      "DECIDE: Detect the problem, Estimate the need to react, Choose a course of action, Identify solutions, Do the best action, Evaluate the results. It's a continuous loop for aeronautical decision-making (ADM).",
  },

  // === AIRPORT OPERATIONS ===
  {
    id: 48,
    category: "Airport Operations",
    question: "What does a steady red light from the tower mean to an aircraft in flight?",
    options: [
      "Cleared to land",
      "Give way and continue circling",
      "Airport unsafe, do not land",
    ],
    correctIndex: 1,
    explanation:
      "Light gun signals for aircraft in flight: Steady green = cleared to land. Steady red = give way, continue circling. Flashing red = airport unsafe, do not land. Flashing green = return for landing. Flashing white = N/A in flight. Alternating red/green = exercise extreme caution.",
  },
  {
    id: 49,
    category: "Airport Operations",
    question: "What does a segmented circle at an airport indicate?",
    options: [
      "The location of the fuel pumps",
      "Traffic pattern information including wind direction, landing runway, and traffic pattern direction",
      "Restricted airspace boundaries",
    ],
    correctIndex: 1,
    explanation:
      "A segmented circle is a visual indicator at airports showing: wind direction (wind sock/tee), recommended landing runway, and traffic pattern direction (L-shaped traffic pattern indicators).",
  },
  {
    id: 50,
    category: "Airport Operations",
    question:
      "What is the correct CTAF (Common Traffic Advisory Frequency) procedure at a non-towered airport?",
    options: [
      "No radio calls are required",
      "Broadcast your position and intentions on the CTAF — typically at 10 miles out, entering downwind, base, final, and clear of the runway",
      "Contact approach control for clearance",
    ],
    correctIndex: 1,
    explanation:
      "At non-towered airports, pilots broadcast their position and intentions on the CTAF. Standard calls: 10 miles out, entering the pattern, each leg of the pattern, taking the runway, and clear of the runway. Listen for other traffic and adjust as needed.",
  },
  {
    id: 51,
    category: "Airport Operations",
    question: "What do the different runway markings indicate?",
    options: [
      "All runways have the same markings",
      "Visual runways have centerline and numbers; precision runways add touchdown zone, aiming point, and threshold markings",
      "Only IFR runways have markings",
    ],
    correctIndex: 1,
    explanation:
      "Runway markings vary by type: Visual runways have centerline, numbers, and threshold. Non-precision instrument runways add a 1,000-foot aiming point marking. Precision instrument runways add touchdown zone markings. Displaced thresholds have arrows; blast pads/stopways have chevrons.",
  },
  {
    id: 52,
    category: "Airport Operations",
    question:
      "What does a hold-short line at an airport look like, and what must a pilot do?",
    options: [
      "A single dashed line — slow down before crossing",
      "Two solid lines and two dashed lines — a pilot must stop and receive clearance before crossing at a towered airport",
      "A red painted area — do not taxi over it",
    ],
    correctIndex: 1,
    explanation:
      "Hold-short lines consist of two solid yellow lines and two dashed yellow lines across the taxiway. Pilots must stop at the solid lines and not cross without ATC clearance at towered airports. At non-towered airports, pilots must verify the runway is clear before crossing.",
  },

  // ============================
  // ADDITIONAL QUESTIONS (53+)
  // ============================

  // === MORE AERODYNAMICS ===
  {
    id: 53,
    category: "Aerodynamics",
    question: "What is P-factor?",
    options: [
      "Engine vibration caused by a failing piston",
      "Asymmetric propeller thrust that causes yaw at high angles of attack",
      "The effect of propeller wash on the horizontal stabilizer",
    ],
    correctIndex: 1,
    explanation: "P-factor (asymmetric thrust) occurs because at high angles of attack, the descending blade (right side) has a higher angle of attack and produces more thrust than the ascending blade. This causes a left-yawing tendency.",
  },
  {
    id: 54,
    category: "Aerodynamics",
    question: "What are the four left-turning tendencies in a single-engine propeller airplane?",
    options: [
      "Lift, drag, thrust, weight",
      "Torque, P-factor, spiraling slipstream, gyroscopic precession",
      "Adverse yaw, Dutch roll, spiral instability, phugoid",
    ],
    correctIndex: 1,
    explanation: "The four left-turning tendencies are: Torque (Newton's 3rd law — engine turns prop right, airplane rolls left), P-factor (asymmetric thrust), Spiraling slipstream (clockwise air hits left side of vertical stab), and Gyroscopic precession (force applied 90° ahead in rotation).",
  },
  {
    id: 55,
    category: "Aerodynamics",
    question: "What is the relationship between angle of attack and airspeed in level flight?",
    options: [
      "As airspeed increases, angle of attack must increase",
      "As airspeed decreases, angle of attack must increase to maintain level flight",
      "Angle of attack stays constant regardless of airspeed",
    ],
    correctIndex: 1,
    explanation: "To maintain level flight at a slower airspeed, the angle of attack must increase to generate sufficient lift. At higher airspeeds, less angle of attack is needed. The critical angle of attack (stall) remains the same regardless of speed.",
  },
  {
    id: 56,
    category: "Aerodynamics",
    question: "What is a slip and when would you use one?",
    options: [
      "A maneuver used to decrease altitude without increasing airspeed — bank one way, opposite rudder",
      "A climbing turn used to gain altitude quickly",
      "An emergency maneuver for engine failure only",
    ],
    correctIndex: 0,
    explanation: "A forward slip is used to lose altitude without gaining airspeed, useful for steep approaches or landings without flaps. The aircraft is banked in one direction while opposite rudder keeps the nose pointed along the flight path, creating drag from the exposed fuselage.",
  },
  {
    id: 57,
    category: "Aerodynamics",
    question: "What is load factor and how is it measured?",
    options: [
      "The weight of cargo divided by aircraft weight",
      "The ratio of lift to weight, measured in G's",
      "The drag coefficient at maximum speed",
    ],
    correctIndex: 1,
    explanation: "Load factor is the ratio of total lift to aircraft weight, expressed in G's. In straight and level flight, load factor is 1G. In a 60° bank turn, load factor is 2G (double the weight). Exceeding the design load factor can cause structural failure.",
  },
  {
    id: 58,
    category: "Aerodynamics",
    question: "In a 60-degree bank turn, what is the load factor?",
    options: ["1.5 G's", "2 G's", "3 G's"],
    correctIndex: 1,
    explanation: "Load factor = 1/cosine of bank angle. At 60°, cos(60°) = 0.5, so load factor = 1/0.5 = 2G. The aircraft 'weighs' twice as much, stall speed increases by ~40%, and structural stress doubles.",
  },
  {
    id: 59,
    category: "Aerodynamics",
    question: "What is Bernoulli's principle and how does it relate to lift?",
    options: [
      "Heavier objects fall faster, creating downwash",
      "As the velocity of a fluid increases, its pressure decreases — faster air over the wing creates lower pressure on top",
      "Equal and opposite reactions create thrust",
    ],
    correctIndex: 1,
    explanation: "Bernoulli's principle states that as fluid velocity increases, pressure decreases. Air flowing over the curved upper surface of a wing moves faster than air below, creating lower pressure above the wing. This pressure differential (combined with Newton's 3rd law deflecting air downward) produces lift.",
  },
  {
    id: 60,
    category: "Aerodynamics",
    question: "What is wake turbulence and when is it most dangerous?",
    options: [
      "Turbulence from thunderstorms near airports",
      "Wingtip vortices from heavier aircraft — most dangerous when following a heavy, clean, slow aircraft",
      "Jet blast from taxiing aircraft",
    ],
    correctIndex: 1,
    explanation: "Wake turbulence is caused by wingtip vortices generated by all aircraft. It is most intense behind heavy, clean (no flaps), slow aircraft. Vortices sink at 300-500 fpm and move laterally with wind. When following a heavy aircraft: stay above their flight path, land beyond their touchdown point, or wait 3+ minutes.",
  },

  // === MORE REGULATIONS ===
  {
    id: 61,
    category: "Regulations",
    question: "What is the minimum visibility and ceiling required to fly VFR in Class B airspace?",
    options: [
      "1 SM visibility, clear of clouds",
      "3 SM visibility, clear of clouds",
      "3 SM visibility, 500 below, 1,000 above, 2,000 horizontal",
    ],
    correctIndex: 1,
    explanation: "Class B airspace: 3 statute miles visibility, clear of clouds. You need ATC clearance to enter ('cleared into the Bravo').",
  },
  {
    id: 62,
    category: "Regulations",
    question: "When is a transponder with Mode C required?",
    options: [
      "Only in Class A airspace",
      "In Class A, B, C airspace; above 10,000 MSL; and within 30nm of a Class B primary airport",
      "Only when IFR",
    ],
    correctIndex: 1,
    explanation: "Per FAR 91.215, Mode C transponder is required in: Class A, B, C airspace; within 30nm of a Class B primary airport (the 'Mode C veil'); and above 10,000 MSL (except at or below 2,500 AGL). Must be inspected every 24 calendar months.",
  },
  {
    id: 63,
    category: "Regulations",
    question: "What are the VFR fuel requirements for day and night?",
    options: [
      "Day: 30 min reserve. Night: 30 min reserve",
      "Day: 45 min reserve. Night: 1 hour reserve",
      "Day: enough to reach destination + 30 min reserve. Night: destination + 45 min reserve",
    ],
    correctIndex: 2,
    explanation: "Per FAR 91.151: Day VFR — enough fuel to fly to the first point of intended landing plus 30 minutes at normal cruise. Night VFR — same plus 45 minutes at normal cruise.",
  },
  {
    id: 64,
    category: "Regulations",
    question: "What is a TFR (Temporary Flight Restriction)?",
    options: [
      "A permanent no-fly zone around military bases",
      "A temporary restriction on flight in a specific area due to events, disasters, VIP movement, or security",
      "A restriction on flying above 18,000 feet",
    ],
    correctIndex: 1,
    explanation: "TFRs temporarily restrict aircraft operations in a defined area. Common reasons: presidential/VIP movement, sporting events, firefighting, disaster relief, and space operations. Always check TFRs during preflight planning. Violating a TFR can result in certificate action, fines, or interception.",
  },
  {
    id: 65,
    category: "Regulations",
    question: "What is the difference between 'Special VFR' and standard VFR?",
    options: [
      "Special VFR allows flight in Class A airspace",
      "Special VFR allows flight in controlled airspace with visibility below standard VFR minimums — requires ATC clearance, 1 SM visibility, and clear of clouds",
      "There is no difference",
    ],
    correctIndex: 1,
    explanation: "Special VFR allows operations in controlled airspace (Class B, C, D, E surface areas) when weather is below VFR minimums. Requirements: ATC clearance, 1 SM flight visibility, clear of clouds. At night: pilot must be instrument rated and aircraft instrument-equipped.",
  },
  {
    id: 66,
    category: "Regulations",
    question: "What is the maximum weight a private pilot can share with passengers for expenses?",
    options: [
      "Passengers must pay 100% of all costs",
      "The pilot pays their pro-rata (equal) share of fuel, oil, airport fees, and aircraft rental",
      "There is no limit — private pilots can charge any amount",
    ],
    correctIndex: 1,
    explanation: "Per FAR 61.113, a private pilot may share operating expenses equally (pro rata) with passengers. This includes fuel, oil, airport expenditures, and rental fees. The pilot MUST pay their equal share — they cannot profit.",
  },
  {
    id: 67,
    category: "Regulations",
    question: "What endorsements does a student pilot need to fly solo cross-country?",
    options: [
      "No endorsements needed — just a student certificate",
      "Solo flight endorsement + solo XC endorsement + endorsement for each XC flight (unless repeated route)",
      "Only a solo flight endorsement",
    ],
    correctIndex: 1,
    explanation: "Student pilots need: (1) a solo endorsement from their CFI, (2) a solo cross-country endorsement, and (3) an endorsement for each specific XC flight, unless the CFI has endorsed repeated flights on the same route. The CFI must also review weather and the student's preparation.",
  },

  // === MORE WEATHER ===
  {
    id: 68,
    category: "Weather",
    question: "What is a temperature inversion and why is it significant for pilots?",
    options: [
      "When temperature drops rapidly — causes clear skies",
      "When temperature increases with altitude (instead of decreasing) — traps fog, smog, and low visibility; creates wind shear",
      "When the dew point rises above the temperature",
    ],
    correctIndex: 1,
    explanation: "A temperature inversion occurs when a warm layer of air sits on top of cooler air. This is significant because: (1) it traps pollutants, fog, and haze near the surface; (2) it can cause significant wind shear at the inversion boundary; (3) it creates very stable air that limits convection.",
  },
  {
    id: 69,
    category: "Weather",
    question: "What is density altitude and how does it affect performance?",
    options: [
      "The altitude shown on the altimeter",
      "Pressure altitude corrected for non-standard temperature — higher density altitude means degraded aircraft performance",
      "The height above sea level of the densest clouds",
    ],
    correctIndex: 1,
    explanation: "Density altitude is pressure altitude corrected for temperature. High density altitude (hot, high, humid) means the air is less dense, which degrades all performance: longer takeoff rolls, reduced climb rates, reduced engine power. The three H's: Hot, High, Humid. Always compute density altitude for performance planning.",
  },
  {
    id: 70,
    category: "Weather",
    question: "What type of weather is associated with a cold front?",
    options: [
      "Gradual clouds, steady rain, poor visibility for days",
      "Rapid weather changes, cumulonimbus clouds, heavy rain/hail, wind shifts, turbulence — then rapid clearing",
      "Clear skies with moderate winds",
    ],
    correctIndex: 1,
    explanation: "Cold fronts bring rapid, dramatic weather: towering cumulus/CB clouds, heavy precipitation, thunderstorms, wind shifts (often from south to northwest), turbulence, and a rapid temperature drop. After passage: rapid clearing, cooler temperatures, improved visibility.",
  },
  {
    id: 71,
    category: "Weather",
    question: "What are the different types of structural icing and which is most dangerous?",
    options: [
      "All ice is the same",
      "Clear, rime, and mixed — clear ice is most dangerous because it's hard to see and difficult to remove",
      "Only rime ice affects aircraft",
    ],
    correctIndex: 1,
    explanation: "Three types: Rime ice (rough, milky, forms quickly in small supercooled droplets), Clear ice (smooth, transparent, hard to detect, forms in large supercooled droplets — most dangerous), Mixed ice (combination). Clear ice is worst because it's heavy, hard to see, and hard to remove. All structural icing degrades aerodynamic performance.",
  },
  {
    id: 72,
    category: "Weather",
    question: "What causes radiation fog and when does it typically form?",
    options: [
      "Warm air moving over cold water during the day",
      "Ground cooling on clear, calm nights with high humidity — typically forms around dawn",
      "Orographic lifting of moist air",
    ],
    correctIndex: 1,
    explanation: "Radiation fog forms when the ground radiates heat on clear, calm nights, cooling the air above it to the dew point. Conditions: clear skies, light winds (calm to 5 kts), high humidity, moist ground. Usually forms in low-lying areas around dawn and burns off after sunrise.",
  },
  {
    id: 73,
    category: "Weather",
    question: "What are SIGMETs and AIRMETs?",
    options: [
      "Both are the same thing",
      "SIGMETs warn of severe weather dangerous to ALL aircraft; AIRMETs warn of weather potentially hazardous to smaller/VFR aircraft",
      "SIGMETs are issued by pilots; AIRMETs are issued by ATC",
    ],
    correctIndex: 1,
    explanation: "SIGMETs (Significant Meteorological Info): severe/extreme turbulence, severe icing, volcanic ash, dust/sandstorms — hazardous to ALL aircraft. Convective SIGMETs: thunderstorm-specific. AIRMETs: moderate icing (Zulu), moderate turbulence/sustained surface winds (Tango), IFR conditions/mountain obscuration (Sierra) — hazardous to light aircraft and VFR pilots.",
  },
  {
    id: 74,
    category: "Weather",
    question: "What is pressure altitude?",
    options: [
      "The altitude above the ground",
      "The altitude indicated when the altimeter is set to 29.92 inHg (standard pressure)",
      "The altitude measured by GPS",
    ],
    correctIndex: 1,
    explanation: "Pressure altitude is the altitude indicated when the altimeter is set to the standard datum plane of 29.92 inches Hg. It is used for density altitude calculations, flight above 18,000 feet MSL (Class A), and performance charts. All aircraft in Class A airspace set 29.92.",
  },

  // === MORE NAVIGATION ===
  {
    id: 75,
    category: "Navigation",
    question: "What is magnetic deviation?",
    options: [
      "The difference between true north and magnetic north",
      "Errors in the compass caused by the aircraft's own magnetic fields — listed on the compass correction card",
      "The drift caused by crosswinds",
    ],
    correctIndex: 1,
    explanation: "Deviation is the compass error caused by the aircraft's own magnetic influences (engine, electrical systems, metal). It varies by heading and is recorded on a compass correction card (deviation card) in the aircraft. Variation is the difference between true and magnetic north; deviation is the difference between magnetic and compass heading.",
  },
  {
    id: 76,
    category: "Navigation",
    question: "What is the order of conversion: True → Magnetic → Compass heading?",
    options: [
      "True ± Deviation = Magnetic ± Variation = Compass",
      "True ± Variation = Magnetic ± Deviation = Compass",
      "True ± Wind Correction = Magnetic ± Variation = Compass",
    ],
    correctIndex: 1,
    explanation: "The order is: True heading ± Variation = Magnetic heading ± Deviation = Compass heading. Remember 'TV Makes Dull Children' (True + Variation = Magnetic + Deviation = Compass). East variation is subtracted, West is added (East is least, West is best).",
  },
  {
    id: 77,
    category: "Navigation",
    question: "What are the three types of altitude?",
    options: [
      "High, medium, low",
      "Indicated, pressure, density (plus true and absolute)",
      "AGL, MSL, and GPS",
    ],
    correctIndex: 1,
    explanation: "Five types of altitude: Indicated (read from altimeter), Pressure (altimeter set to 29.92), Density (pressure altitude corrected for temp), True (actual height above MSL), Absolute (actual height above terrain/AGL). For performance: use density altitude. For navigation: use true altitude.",
  },
  {
    id: 78,
    category: "Navigation",
    question: "What is a pilotage and dead reckoning?",
    options: [
      "Pilotage uses GPS; dead reckoning uses VOR",
      "Pilotage = navigating by visual reference to landmarks; Dead reckoning = navigating by computing heading, speed, time, and distance",
      "They are the same thing",
    ],
    correctIndex: 1,
    explanation: "Pilotage is navigating by visual reference to ground landmarks (roads, rivers, towns, etc.). Dead reckoning (DR) is navigating by calculating heading, groundspeed, time, and distance from a known position. Most VFR navigation uses a combination of both, supplemented by GPS and VOR.",
  },
  {
    id: 79,
    category: "Navigation",
    question: "What is wind correction angle and how do you determine it?",
    options: [
      "The angle you add to true airspeed",
      "The angle between your heading and your course, applied to correct for crosswind drift",
      "The angle of the wind relative to the runway",
    ],
    correctIndex: 1,
    explanation: "Wind correction angle (WCA) is the adjustment to your heading to compensate for crosswind so you track your desired course over the ground. It's calculated using an E6B or electronic flight computer. You crab into the wind: if wind is from the left, your heading is left of course.",
  },

  // === MORE AIRCRAFT SYSTEMS ===
  {
    id: 80,
    category: "Aircraft Systems",
    question: "What instruments are powered by the vacuum (gyroscopic) system?",
    options: [
      "Airspeed indicator and altimeter",
      "Attitude indicator and heading indicator (in most aircraft)",
      "All six flight instruments",
    ],
    correctIndex: 1,
    explanation: "In most training aircraft, the vacuum system powers the attitude indicator (artificial horizon) and the heading indicator (directional gyro). The turn coordinator is typically electrically powered. The airspeed indicator, altimeter, and VSI are part of the pitot-static system.",
  },
  {
    id: 81,
    category: "Aircraft Systems",
    question: "What happens to the altimeter if you fly from high pressure to low pressure without resetting?",
    options: [
      "The altimeter reads correctly",
      "The altimeter reads higher than actual altitude — you are lower than indicated (dangerous!)",
      "The altimeter reads lower than actual altitude",
    ],
    correctIndex: 1,
    explanation: "High to low, look out below! Flying from high to low pressure without adjusting the altimeter causes it to indicate HIGHER than your actual altitude. You're actually lower than you think — dangerous, especially near terrain. Always update the altimeter setting when transitioning areas.",
  },
  {
    id: 82,
    category: "Aircraft Systems",
    question: "What does the alternator/generator do and what happens if it fails?",
    options: [
      "It is the only power source — everything dies immediately",
      "It charges the battery and powers electrical systems; if it fails, the battery provides backup power for a limited time",
      "It powers the engine ignition only",
    ],
    correctIndex: 1,
    explanation: "The alternator generates electrical power to run avionics, lights, and charge the battery during flight. If it fails: the battery provides backup power, but only for a limited time (30-60 minutes typically). Shed non-essential electrical loads, plan to land as soon as practicable. Note: the magneto ignition system is independent — the engine keeps running.",
  },
  {
    id: 83,
    category: "Aircraft Systems",
    question: "What is the purpose of the magneto ignition system and why are there two?",
    options: [
      "One is a backup for engine start only",
      "Two independent magnetos provide redundancy — if one fails, the engine still runs on the other (with slight RPM drop)",
      "They control the fuel injection system",
    ],
    correctIndex: 1,
    explanation: "Magnetos are self-contained ignition systems that don't need electrical power to operate. There are two magnetos (left and right), each firing one of two spark plugs in each cylinder. This provides redundancy (engine runs if one fails) and more complete combustion. During the runup mag check, dropping to a single magneto should show a slight RPM drop (125-175 RPM typical).",
  },
  {
    id: 84,
    category: "Aircraft Systems",
    question: "What are the indications of carburetor ice and how do you remove it?",
    options: [
      "Engine shaking violently — apply full throttle",
      "Gradual RPM drop (fixed pitch) or manifold pressure drop (constant speed) — apply carb heat, expect initial RPM drop, then increase as ice melts",
      "Oil pressure increases — lean the mixture",
    ],
    correctIndex: 1,
    explanation: "Carb ice signs: gradual RPM decrease (fixed pitch) or MP decrease (constant speed), rough engine. Remedy: apply full carburetor heat. Expect an initial further RPM drop and rough running as melted ice goes through the engine, then RPM should recover. In severe conditions, apply carb heat before ice forms.",
  },

  // === MORE FLIGHT OPERATIONS ===
  {
    id: 85,
    category: "Flight Operations",
    question: "What are the legs of a standard traffic pattern?",
    options: [
      "Entry, circuit, exit",
      "Upwind, crosswind, downwind, base, final",
      "Departure, en route, approach",
    ],
    correctIndex: 1,
    explanation: "The five legs: Upwind (parallel to runway, direction of takeoff), Crosswind (perpendicular turn after departure), Downwind (parallel to runway, opposite direction), Base (perpendicular turn toward runway), Final (aligned with runway for landing). Standard entry is a 45° angle to the downwind leg.",
  },
  {
    id: 86,
    category: "Flight Operations",
    question: "What is the 'impossible turn' and why is it dangerous?",
    options: [
      "A chandelle performed at low altitude",
      "Attempting to turn back to the runway after engine failure shortly after takeoff — dangerous due to insufficient altitude and the tendency to stall in the turn",
      "A tight turn in Class B airspace",
    ],
    correctIndex: 1,
    explanation: "The 'impossible turn' is the attempt to turn 180° back to the runway after engine failure on climbout. It's dangerous because: (1) you need significant altitude (typically 800-1,000+ AGL minimum), (2) the turn increases load factor and stall speed, (3) wind affects your glide. Most training recommends landing straight ahead or within a narrow arc. Discuss a personal decision altitude with your CFI.",
  },
  {
    id: 87,
    category: "Flight Operations",
    question: "What is the recommended way to enter the traffic pattern at an uncontrolled airport?",
    options: [
      "Straight-in to final approach",
      "Overfly at pattern altitude + 500 feet to observe, then enter on a 45° angle to the downwind leg",
      "Enter on the crosswind leg",
    ],
    correctIndex: 1,
    explanation: "The recommended entry is to approach at pattern altitude + 500 feet (typically 1,500 AGL), overfly to observe the windsock and traffic, then descend and enter on a 45° angle to the midpoint of the downwind leg. This gives the best visibility and predictability. Make radio calls on CTAF.",
  },
  {
    id: 88,
    category: "Flight Operations",
    question: "What are the emergency transponder codes?",
    options: [
      "7700, 7600, 7500 — all mean the same thing",
      "7700 = emergency, 7600 = communication failure, 7500 = hijack",
      "7700 = hijack, 7600 = emergency, 7500 = comm failure",
    ],
    correctIndex: 1,
    explanation: "7700 = general emergency (Mayday). 7600 = lost communications (radio failure). 7500 = hijack/unlawful interference. Memory aid: '75 taken alive, 76 need a fix, 77 going to heaven.' Normal VFR squawk code is 1200.",
  },
  {
    id: 89,
    category: "Flight Operations",
    question: "What is Vg and why is it the most important speed to memorize?",
    options: [
      "Maximum gear extension speed",
      "Best glide speed — gives maximum distance in a power-off glide, critical for engine failure",
      "Best rate of climb speed",
    ],
    correctIndex: 1,
    explanation: "Vg (best glide speed) gives maximum glide distance with no power. It's the first thing you set in an engine failure. Memorize it for your aircraft. It's typically close to Vy. At Vg, the ratio of lift to drag is at its maximum. Heavier = faster Vg needed (but published Vg is for max gross weight).",
  },
  {
    id: 90,
    category: "Flight Operations",
    question: "What preflight information is required for ALL flights (not just cross-country)?",
    options: [
      "Nothing is required for local flights",
      "Weather reports and forecasts, fuel requirements, alternatives if the flight cannot be completed as planned",
      "Only NOTAMs",
    ],
    correctIndex: 1,
    explanation: "Per FAR 91.103, for ALL flights the PIC must become familiar with: weather reports and forecasts, fuel requirements, and alternatives available if the flight cannot be completed as planned. Cross-country flights add runway lengths, T/O and landing distances, and known ATC delays (NWKRAFT).",
  },

  // === MORE HUMAN FACTORS ===
  {
    id: 91,
    category: "Human Factors",
    question: "What is 'get-there-itis' and why is it one of the most dangerous hazardous attitudes?",
    options: [
      "A medical condition causing fatigue",
      "The overwhelming urge to reach a destination despite deteriorating conditions — leads to poor decision-making and continued flight into danger",
      "A form of vertigo",
    ],
    correctIndex: 1,
    explanation: "Get-there-itis is a leading cause of GA accidents. Pilots feel pressure (schedule, passengers, personal) to continue a flight despite warning signs (bad weather, low fuel, mechanical issues). The antidote: always have a personal minimum, be willing to divert/cancel, and recognize the pressure before it overrides your judgment.",
  },
  {
    id: 92,
    category: "Human Factors",
    question: "What is carbon monoxide poisoning and how might a pilot detect it?",
    options: [
      "It only happens with jet engines",
      "CO is odorless and colorless — symptoms include headache, dizziness, nausea, and cherry-red skin; comes from exhaust leaks into the cabin via the heater",
      "It causes instant unconsciousness with no warning signs",
    ],
    correctIndex: 1,
    explanation: "Carbon monoxide (CO) is a byproduct of combustion. In most GA aircraft, the cabin heater uses exhaust-heated air — if the exhaust system has a crack, CO can enter the cabin. CO is colorless and odorless. Symptoms: headache, drowsiness, dizziness, nausea. If suspected: turn off cabin heat, open air vents, land ASAP. A CO detector is highly recommended.",
  },
  {
    id: 93,
    category: "Human Factors",
    question: "What is the 'leans' in aviation?",
    options: [
      "Leaning the mixture in flight",
      "A vestibular illusion where the pilot perceives a wings-level attitude as a bank, or vice versa",
      "Leaning forward during turbulence",
    ],
    correctIndex: 1,
    explanation: "The leans is the most common form of spatial disorientation. When a gradual bank goes unnoticed, then is corrected, the inner ear falsely senses the correction as a new bank. The pilot feels like they're banking when wings are level. The fix: trust the instruments, resist the urge to 'correct' back into the bank.",
  },
  {
    id: 94,
    category: "Human Factors",
    question: "What effect does alcohol have on a pilot's susceptibility to hypoxia?",
    options: [
      "Alcohol has no effect on hypoxia",
      "Alcohol increases susceptibility to hypoxia — even small amounts lower effective altitude tolerance significantly",
      "Alcohol prevents hypoxia",
    ],
    correctIndex: 1,
    explanation: "Alcohol significantly increases susceptibility to hypoxia. Even a small amount of alcohol (or a hangover) can make a pilot experience hypoxia symptoms at much lower altitudes. A blood alcohol level of 0.04% can equate to a 2,000-foot increase in physiological altitude. This is why the 8-hour bottle-to-throttle rule exists, and why hangovers are dangerous.",
  },
  {
    id: 95,
    category: "Human Factors",
    question: "What is the difference between a runway incursion and a runway excursion?",
    options: [
      "They are the same thing",
      "Incursion = unauthorized presence on a runway; Excursion = aircraft veering off or overrunning the runway",
      "Incursion = hard landing; Excursion = go-around",
    ],
    correctIndex: 1,
    explanation: "Runway incursion: any occurrence at an airport where an aircraft, vehicle, or person is incorrectly on the runway surface (e.g., crossing without clearance). Runway excursion: an aircraft that veers off or overruns the runway (e.g., landing too fast/far). Both are serious safety events. Prevention: maintain situational awareness, read back hold-short instructions, never assume.",
  },

  // === MORE AIRPORT OPERATIONS ===
  {
    id: 96,
    category: "Airport Operations",
    question: "What does a displaced threshold look like and what does it mean?",
    options: [
      "A red area at the end of the runway — never fly over it",
      "White arrows leading to the threshold — you can taxi, take off, and roll out over it, but cannot land before the threshold",
      "A blinking light at the end of the runway",
    ],
    correctIndex: 1,
    explanation: "A displaced threshold is marked with white arrows pointing toward the landing threshold. You CAN: taxi on it, take off from it, roll out/land beyond it on landing. You CANNOT: touch down before the displaced threshold when landing. It's displaced because of obstacles on the approach path.",
  },
  {
    id: 97,
    category: "Airport Operations",
    question: "What is the difference between a blast pad/stopway and a displaced threshold?",
    options: [
      "They are the same thing",
      "Blast pad/stopway has yellow chevrons — cannot be used for taxi, takeoff, or landing (only emergency stopping). Displaced threshold has arrows — can be used for taxi, takeoff, and rollout.",
      "Blast pads are for helicopters only",
    ],
    correctIndex: 1,
    explanation: "Blast pad/stopway: yellow chevrons, NOT available for any normal use (no taxi, takeoff, or landing). Only for emergency overrun. Displaced threshold: white arrows, can be used for taxi, takeoff, and rollout — just can't touch down before it when landing.",
  },
  {
    id: 98,
    category: "Airport Operations",
    question: "What does VASI/PAPI tell you on approach?",
    options: [
      "Your airspeed",
      "Whether you are on, above, or below the correct glidepath — red over white means 'you're alright'",
      "The runway length remaining",
    ],
    correctIndex: 1,
    explanation: "VASI (Visual Approach Slope Indicator) and PAPI (Precision Approach Path Indicator) show your position relative to the glidepath. VASI: red over white = on glidepath ('red over white, you're alright'), white over white = too high ('white over white, you'll fly all night'), red over red = too low ('red over red, you're dead'). PAPI uses 4 lights with the same color logic.",
  },
  {
    id: 99,
    category: "Airport Operations",
    question: "What information is found in the Chart Supplement (formerly Airport/Facility Directory)?",
    options: [
      "Only radio frequencies",
      "Comprehensive airport data: runway info, frequencies, services, lighting, patterns, NOTAMs, and special procedures",
      "Only instrument approach charts",
    ],
    correctIndex: 1,
    explanation: "The Chart Supplement (formerly A/FD) is the definitive airport reference. It includes: runway lengths/surfaces/lighting, traffic pattern altitude and direction, communication frequencies, nav aid info, FBO services, fuel availability, and special notices. It's updated every 56 days and should be consulted during preflight planning.",
  },
  {
    id: 100,
    category: "Airport Operations",
    question: "What do the different taxiway markings and signs mean?",
    options: [
      "All signs are the same — just follow them",
      "Red signs with white text = mandatory (hold position, runway boundary). Yellow/black signs = location/direction. Numbers on pavement = taxiway designators.",
      "Only runway signs are important",
    ],
    correctIndex: 1,
    explanation: "Mandatory signs (red background, white text): runway hold position, ILS critical area. Location signs (yellow background, black text): identify which taxiway you're on. Direction/destination signs (black background, yellow text): point to taxiways/runways/ramp. Runway distance remaining signs: black background, white numbers (thousands of feet remaining).",
  },
];
