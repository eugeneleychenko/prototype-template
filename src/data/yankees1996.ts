export type Position =
  | "P"
  | "C"
  | "1B"
  | "2B"
  | "3B"
  | "SS"
  | "LF"
  | "CF"
  | "RF"
  | "DH";

export interface TeamSeasonSummary {
  year: number;
  wins: number;
  losses: number;
  runsScored: number;
  runsAllowed: number;
  era: number;
  postseasonSummary: string;
}

export interface GameResult {
  date: string;
  opponent: string;
  homeAway: "Home" | "Away";
  runsFor: number;
  runsAgainst: number;
  phase: "Regular" | "ALDS" | "ALCS" | "WS";
}

export interface PlayerStatLine {
  id: string;
  name: string;
  position: Position;
  jerseyNumber: number;
  photoUrl: string;
  battingAvg: number | null;
  hr: number | null;
  rbi: number | null;
  wins: number | null;
  strikeouts: number | null;
  era: number | null;
  appearancesOrGames: number;
  /** Extra stats for table expansion */
  runs?: number;
  stolenBases?: number;
}

export interface PlayerDetail extends PlayerStatLine {
  highlights: string[];
  bio: string;
  inningsPitched?: number;
  saves?: number;
}

export interface KeyMoment {
  id: string;
  phase: string;
  title: string;
  summary: string;
  highlightGame?: boolean;
}

export const team1996: TeamSeasonSummary = {
  year: 1996,
  wins: 92,
  losses: 70,
  runsScored: 871,
  runsAllowed: 695,
  era: 4.65,
  postseasonSummary: "ALDS vs TEX • ALCS vs BAL • World Series vs ATL",
};

export const comparisonTeams: TeamSeasonSummary[] = [
  {
    year: 1995,
    wins: 79,
    losses: 65,
    runsScored: 794,
    runsAllowed: 703,
    era: 4.72,
    postseasonSummary: "Wild Card → ALDS vs SEA",
  },
  {
    year: 1996,
    wins: 92,
    losses: 70,
    runsScored: 871,
    runsAllowed: 695,
    era: 4.65,
    postseasonSummary: "AL East • World Series champions",
  },
  {
    year: 1998,
    wins: 114,
    losses: 48,
    runsScored: 965,
    runsAllowed: 656,
    era: 3.82,
    postseasonSummary: "AL East • World Series champions",
  },
];

/** Representative subset of the regular season + postseason for demo */
export const gameResults: GameResult[] = [
  {
    date: "Apr 2",
    opponent: "CLE",
    homeAway: "Away",
    runsFor: 7,
    runsAgainst: 1,
    phase: "Regular",
  },
  {
    date: "Apr 15",
    opponent: "TEX",
    homeAway: "Home",
    runsFor: 9,
    runsAgainst: 3,
    phase: "Regular",
  },
  {
    date: "May 17",
    opponent: "SEA",
    homeAway: "Away",
    runsFor: 5,
    runsAgainst: 4,
    phase: "Regular",
  },
  {
    date: "Jun 4",
    opponent: "CHW",
    homeAway: "Home",
    runsFor: 8,
    runsAgainst: 2,
    phase: "Regular",
  },
  {
    date: "Jul 4",
    opponent: "KCR",
    homeAway: "Home",
    runsFor: 4,
    runsAgainst: 0,
    phase: "Regular",
  },
  {
    date: "Aug 25",
    opponent: "ANA",
    homeAway: "Away",
    runsFor: 2,
    runsAgainst: 1,
    phase: "Regular",
  },
  {
    date: "Sep 21",
    opponent: "DET",
    homeAway: "Home",
    runsFor: 12,
    runsAgainst: 3,
    phase: "Regular",
  },
  {
    date: "Oct 1",
    opponent: "TEX",
    homeAway: "Home",
    runsFor: 5,
    runsAgainst: 4,
    phase: "ALDS",
  },
  {
    date: "Oct 4",
    opponent: "TEX",
    homeAway: "Away",
    runsFor: 5,
    runsAgainst: 4,
    phase: "ALDS",
  },
  {
    date: "Oct 9",
    opponent: "BAL",
    homeAway: "Away",
    runsFor: 5,
    runsAgainst: 4,
    phase: "ALCS",
  },
  {
    date: "Oct 13",
    opponent: "BAL",
    homeAway: "Home",
    runsFor: 5,
    runsAgainst: 4,
    phase: "ALCS",
  },
  {
    date: "Oct 20",
    opponent: "ATL",
    homeAway: "Away",
    runsFor: 1,
    runsAgainst: 12,
    phase: "WS",
  },
  {
    date: "Oct 21",
    opponent: "ATL",
    homeAway: "Away",
    runsFor: 4,
    runsAgainst: 0,
    phase: "WS",
  },
  {
    date: "Oct 22",
    opponent: "ATL",
    homeAway: "Home",
    runsFor: 5,
    runsAgainst: 2,
    phase: "WS",
  },
  {
    date: "Oct 23",
    opponent: "ATL",
    homeAway: "Home",
    runsFor: 8,
    runsAgainst: 4,
    phase: "WS",
  },
  {
    date: "Oct 24",
    opponent: "ATL",
    homeAway: "Home",
    runsFor: 1,
    runsAgainst: 0,
    phase: "WS",
  },
];

export const players: PlayerDetail[] = [
  {
    id: "bernie-williams",
    name: "Bernie Williams",
    position: "CF",
    jerseyNumber: 51,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bernie_Williams_%282014%29.jpg/440px-Bernie_Williams_%282014%29.jpg",
    battingAvg: 0.305,
    hr: 29,
    rbi: 102,
    wins: null,
    strikeouts: null,
    era: null,
    appearancesOrGames: 143,
    runs: 108,
    stolenBases: 17,
    inningsPitched: undefined,
    saves: undefined,
    highlights: [
      "1996 AL batting champion (.305)",
      "Four hits in ALCS Game 1 vs Baltimore",
      "Go-ahead home run in ALDS Game 4 vs Texas",
    ],
    bio: "Switch-hitting center fielder and clubhouse calming presence; anchored the outfield during the club's first title run since 1978.",
  },
  {
    id: "derek-jeter",
    name: "Derek Jeter",
    position: "SS",
    jerseyNumber: 2,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Derek_Jeter_2007_%28cropped%29.jpg/440px-Derek_Jeter_2007_%28cropped%29.jpg",
    battingAvg: 0.314,
    hr: 10,
    rbi: 78,
    wins: null,
    strikeouts: null,
    era: null,
    appearancesOrGames: 157,
    runs: 104,
    stolenBases: 14,
    highlights: [
      "AL Rookie of the Year",
      "Leadoff home run in Game 1 of the ALCS vs Baltimore",
      "Game-saving relay cut-off play in ALDS vs Texas",
    ],
    bio: "Rookie shortstop who handled pressure at Yankee Stadium like a veteran on opening day and beyond.",
  },
  {
    id: "tino-martinez",
    name: "Tino Martinez",
    position: "1B",
    jerseyNumber: 24,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Tino_Martinez_2009.jpg/440px-Tino_Martinez_2009.jpg",
    battingAvg: 0.292,
    hr: 25,
    rbi: 117,
    wins: null,
    strikeouts: null,
    era: null,
    appearancesOrGames: 157,
    runs: 89,
    stolenBases: 4,
    highlights: [
      "Team RBI leader",
      "Grand slam vs Texas in ALDS",
      "Multiple clutch hits through ALCS",
    ],
    bio: "Free-agent first baseman brought power and steady defense to replace Don Mattingly.",
  },
  {
    id: "cecil-fielder",
    name: "Cecil Fielder",
    position: "DH",
    jerseyNumber: 45,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Cecil_Fielder_1996.jpg/440px-Cecil_Fielder_1996.jpg",
    battingAvg: 0.253,
    hr: 13,
    rbi: 53,
    wins: null,
    strikeouts: null,
    era: null,
    appearancesOrGames: 53,
    runs: 26,
    stolenBases: 0,
    highlights: [
      "Trade-deadline acquisition",
      "Late-season power surge into October",
      "Key RBI bat off the bench in October",
    ],
    bio: "Former MVP slugger acquired mid-season to add middle-of-the-order thunder.",
  },
  {
    id: "paul-oneill",
    name: "Paul O'Neill",
    position: "RF",
    jerseyNumber: 21,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Paul_ONeill_%282009%29.jpg/440px-Paul_ONeill_%282009%29.jpg",
    battingAvg: 0.302,
    hr: 19,
    rbi: 91,
    wins: null,
    strikeouts: null,
    era: null,
    appearancesOrGames: 122,
    runs: 61,
    stolenBases: 12,
    highlights: [
      "Game 5 ALCS home run vs Orioles",
      "High-average corner outfield production",
      "Fiery competitor setting clubhouse tone",
    ],
    bio: "Right field mainstay known for intensity and left-handed line drives into the short porch.",
  },
  {
    id: "andy-pettitte",
    name: "Andy Pettitte",
    position: "P",
    jerseyNumber: 46,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Andy_Pettitte_2009.jpg/440px-Andy_Pettitte_2009.jpg",
    battingAvg: null,
    hr: null,
    rbi: null,
    wins: 21,
    strikeouts: 162,
    era: 3.87,
    appearancesOrGames: 35,
    inningsPitched: 221,
    saves: 0,
    highlights: [
      "21 wins — staff leader",
      "Strong Game 5 outing in World Series",
      "Reliable innings through division race",
    ],
    bio: "Left-handed starter from Louisiana who emerged as the rotation's workhorse.",
  },
  {
    id: "mariano-rivera",
    name: "Mariano Rivera",
    position: "P",
    jerseyNumber: 42,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mariano_Rivera_allison_7_29_07.jpg/440px-Mariano_Rivera_allison_7_29_07.jpg",
    battingAvg: null,
    hr: null,
    rbi: null,
    wins: 8,
    strikeouts: 130,
    era: 2.09,
    appearancesOrGames: 61,
    inningsPitched: 107.2,
    saves: 5,
    highlights: [
      "43 saves — stepping into closer role",
      "Dominant postseason relief appearances",
      "Cut fastball emerging as signature weapon",
    ],
    bio: "Panamanian right-hander converted from starter to late-game weapon.",
  },
  {
    id: "david-cone",
    name: "David Cone",
    position: "P",
    jerseyNumber: 36,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/David_Cone_1988.jpg/440px-David_Cone_1988.jpg",
    battingAvg: null,
    hr: null,
    rbi: null,
    wins: 11,
    strikeouts: 155,
    era: 3.82,
    appearancesOrGames: 22,
    inningsPitched: 131,
    saves: 0,
    highlights: [
      "Mid-season trade from Toronto",
      "Key starts down the stretch",
      "October experience on the mound",
    ],
    bio: "Veteran starter acquired at the deadline to bolster October aspirations.",
  },
  {
    id: "john-wetteland",
    name: "John Wetteland",
    position: "P",
    jerseyNumber: 35,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/John_Wetteland.jpg/440px-John_Wetteland.jpg",
    battingAvg: null,
    hr: null,
    rbi: null,
    wins: 2,
    strikeouts: 69,
    era: 2.03,
    appearancesOrGames: 62,
    inningsPitched: 62,
    saves: 43,
    highlights: [
      "Saved final game of World Series",
      "Perfect ninth inning to clinch title",
      "Shut-down ninth innings through playoffs",
    ],
    bio: "Texas-born closer who handled ninth-inning assignments before Rivera assumed full-time duties.",
  },
];

export const keyMoments: KeyMoment[] = [
  {
    id: "ws-game-4",
    phase: "World Series Game 4",
    title: "Jim Leyritz ties it late",
    summary:
      "Trailing late in Atlanta, Leyritz's legendary home run shifted momentum back toward the Bronx.",
    highlightGame: true,
  },
  {
    id: "ws-game-6",
    phase: "World Series Game 6",
    title: "Charlie Hayes catches the final out",
    summary:
      "Foul pop sealed the Yankees' first championship since 1978 — baseball card moment at River Ave.",
    highlightGame: true,
  },
  {
    id: "alcs-jeter",
    phase: "ALCS Game 1",
    title: "Jeter opens with authority",
    summary:
      "Leadoff home run at Yankee Stadium announced October belonged to the rookie shortstop.",
    highlightGame: false,
  },
  {
    id: "alds-martinez",
    phase: "ALDS vs Rangers",
    title: "Martinez puts Texas away",
    summary:
      "Grand slam power showed what the new middle of the order could do under playoff lights.",
    highlightGame: false,
  },
];

/** Postseason-only aggregate for banner */
export const postseasonRecord = { wins: 11, losses: 5 };
