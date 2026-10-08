import {
  Story,
  CelebrityProfile,
  MovieItem,
  TrailerItem,
  ReleaseCalendarItem,
  SearchResultItem,
} from "../types";

export const LEAD_STORY: Story = {
  id: "story-lead-01",
  title: "Christopher Nolan Sets Next Epic Feature at Universal for Summer 2027",
  slug: "christopher-nolan-sets-next-epic-feature-universal-2027",
  editorialSubdeck:
    "Universal Pictures has secured global distribution rights to Nolan's confidential 70mm production, with IMAX cameras returning for unprecedented practical-scale sequences.",
  summary:
    "Following the historic ten-Oscar sweep of Oppenheimer, Christopher Nolan is reuniting with Universal Pictures and producer Emma Thomas for his 13th feature film, targeting an exclusive global IMAX and 70mm theatrical engagement in July 2027.",
  image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
  category: "Hollywood",
  publishedAt: "2026-10-07T18:15:00Z",
  updatedAt: "2026-10-07T21:14:00Z",
  status: "confirmed",
  author: "Elena Vasquez",
  authorRole: "Senior Film Business Editor",
  readTime: 5,
  sourcesCount: 4,
  verificationDetails: "Confirmed via Universal Pictures corporate filing and production office memo.",
  isLeadStory: true,
  contentParagraphs: [
    "Universal Pictures has officially committed to Christopher Nolan's next confidential theatrical production, scheduling a worldwide release for July 16, 2027. The project re-teams the auteur with longtime producer Emma Thomas and cinematographer Hoyte van Hoytema, who previously collaborated on Oppenheimer, Tenet, and Dunkirk.",
    "According to studio sources familiar with the package, the production will shoot extensively on newly engineered 65mm IMAX black-and-white and color stocks. While plot specifics remain under tight non-disclosure, casting discussions have begun quietly across London and Los Angeles for four principal leads.",
    "The agreement solidifies Nolan's post-Warner Bros. partnership with Universal Filmed Entertainment Group chair Donna Langley, whose studio delivered $957 million in box office receipts and seven Academy Awards for Oppenheimer.",
    "Nolan's insistence on preserving the theatrical exhibition window continues to serve as an industry barometer. As streaming consolidation recalibrates studio balance sheets, Universal's multi-million commitment underlines belief in large-format cinema events."
  ]
};

export const SECONDARY_LEAD_STORIES: Story[] = [
  {
    id: "story-lead-02",
    title: "Sony and Nintendo Confirm Legend of Zelda Film Commences Principal Photography in New Zealand",
    slug: "sony-nintendo-legend-of-zelda-film-new-zealand-filming",
    summary:
      "Director Wes Ball and producer Shigeru Miyamoto have established production headquarters in Wellington, leaning heavily on practical sets and Wētā Workshop creature prosthetics.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    category: "Movies",
    publishedAt: "2026-10-07T17:40:00Z",
    updatedAt: "2026-10-07T20:45:00Z",
    status: "confirmed",
    author: "Marcus Chen",
    authorRole: "Studio Strategy Correspondent",
    readTime: 4,
    sourcesCount: 3,
    verificationDetails: "Verified with New Zealand Film Commission production filings.",
    isSecondaryLead: true,
    contentParagraphs: [
      "Principal photography has commenced in Wellington for Sony Pictures and Nintendo's live-action adaptation of The Legend of Zelda, helmed by Wes Ball (Kingdom of the Planet of the Apes).",
      "Nintendo representative director Shigeru Miyamoto and Avi Arad are producing, with production insiders confirming a heavy reliance on practical locations across the South Island rather than digital volume stages."
    ]
  },
  {
    id: "story-lead-03",
    title: "Warner Bros. Discovery Reaches Multi-Year Global Theatrical Output Accord with Legendary",
    slug: "warner-bros-discovery-legendary-entertainment-output-deal",
    summary:
      "The pact ensures Monsterverse installments and Denis Villeneuve's Dune Messiah will receive uninterrupted worldwide distribution through 2029.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    category: "Hollywood",
    publishedAt: "2026-10-07T16:20:00Z",
    updatedAt: "2026-10-07T19:30:00Z",
    status: "developing",
    author: "Arthur Sterling",
    authorRole: "Financial & Distribution Analyst",
    readTime: 4,
    sourcesCount: 2,
    verificationDetails: "Co-reported with studio distribution executives in Burbank.",
    isSecondaryLead: true,
    contentParagraphs: [
      "Warner Bros. Discovery and Legendary Entertainment have signed an expansive four-year theatrical distribution extension, cementing Burbank as the primary theatrical pipeline for the Monsterverse and future cinematic extensions of Frank Herbert's Dune universe.",
      "The accord guarantees a minimum 45-day theatrical exclusivity window before any premium video-on-demand or Max streaming exploitation."
    ]
  }
];

export const TRENDING_STORIES: Story[] = [
  {
    id: "trend-01",
    title: "S.S. Rajamouli and Mahesh Babu's Globe-Trotting Action Spectacle Enters Jungle Filming Schedule",
    slug: "rajamouli-mahesh-babu-ssmb29-jungle-filming",
    category: "Bollywood",
    publishedAt: "2026-10-07T20:10:00Z",
    trendingRank: 1,
    readTime: 3,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    author: "Pooja Trivedi",
    sourcesCount: 3,
    status: "confirmed"
  },
  {
    id: "trend-02",
    title: "Grand Theft Auto VI: Take-Two Interactive Reaffirms Fall 2026 Release Window in Investor Briefing",
    slug: "gta-6-take-two-reaffirms-fall-2026-investor-briefing",
    category: "Gaming",
    publishedAt: "2026-10-07T19:55:00Z",
    trendingRank: 2,
    readTime: 3,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    author: "Devon Reed",
    sourcesCount: 2,
    status: "confirmed"
  },
  {
    id: "trend-03",
    title: "Cillian Murphy in Early Talks to Headline Danny Boyle's 28 Years Later Sequel Project",
    slug: "cillian-murphy-danny-boyle-28-years-later-talks",
    category: "Celebrities",
    publishedAt: "2026-10-07T18:40:00Z",
    trendingRank: 3,
    readTime: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    author: "Elena Vasquez",
    sourcesCount: 3,
    status: "reported"
  },
  {
    id: "trend-04",
    title: "The White Lotus Season 3 Wraps Production in Thailand; HBO Targets First-Quarter Premiere",
    slug: "white-lotus-season-3-wraps-thailand-hbo",
    category: "TV",
    publishedAt: "2026-10-07T18:05:00Z",
    trendingRank: 4,
    readTime: 3,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80",
    author: "Maya Lindqvist",
    sourcesCount: 2,
    status: "confirmed"
  },
  {
    id: "trend-05",
    title: "A24 Acquires Worldwide Rights to Cannes Grand Prix Contender 'The Silent Coastline'",
    slug: "a24-acquires-silent-coastline-cannes",
    category: "Movies",
    publishedAt: "2026-10-07T16:50:00Z",
    trendingRank: 5,
    readTime: 2,
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    author: "Arthur Sterling",
    sourcesCount: 1,
    status: "updated"
  },
  {
    id: "trend-06",
    title: "FromSoftware Details Elden Ring Nightreign Standalone Expansion and Cross-Platform Testing",
    slug: "fromsoftware-elden-ring-nightreign-expansion",
    category: "Gaming",
    publishedAt: "2026-10-07T15:30:00Z",
    trendingRank: 6,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    author: "Devon Reed",
    sourcesCount: 2,
    status: "confirmed"
  }
];

export const LATEST_STORIES: Story[] = [
  {
    id: "latest-01",
    title: "Paramount and Skydance Finalize Post-Merger Executive Restructuring and Film Division Greenlights",
    slug: "paramount-skydance-merger-executive-restructuring",
    summary:
      "David Ellison takes over chief executive duties with plans to elevate mid-budget theatrical releases and scale animation output.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    category: "Hollywood",
    publishedAt: "2026-10-07T21:05:00Z",
    readTime: 4,
    sourcesCount: 3,
    author: "Arthur Sterling",
    status: "confirmed"
  },
  {
    id: "latest-02",
    title: "Yash's Pan-India Gangster Drama 'Toxic' Locks International Release Date Across 45 Countries",
    slug: "yash-toxic-international-release-geetu-mohandas",
    summary:
      "Directed by Geetu Mohandas, the London and Mumbai production secures IMAX distribution deals across North America, the UK, and Japan.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80",
    category: "Bollywood",
    publishedAt: "2026-10-07T20:25:00Z",
    readTime: 3,
    sourcesCount: 2,
    author: "Pooja Trivedi",
    status: "confirmed"
  },
  {
    id: "latest-03",
    title: "Apple TV+ Renews Sci-Fi Flagship 'Severance' for Fourth Season Ahead of Autumn Premiere",
    slug: "apple-tv-plus-renews-severance-season-four",
    summary:
      "Executive producer Ben Stiller and creator Dan Erickson confirm writer's room resumption at the streaming service's Culver City campus.",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80",
    category: "TV",
    platform: "Apple TV+",
    publishedAt: "2026-10-07T19:40:00Z",
    readTime: 3,
    sourcesCount: 2,
    author: "Maya Lindqvist",
    status: "confirmed"
  },
  {
    id: "latest-04",
    title: "Sony Interactive Entertainment Unveils Next-Generation PlayStation Handheld Technical Specs",
    slug: "sony-playstation-handheld-next-gen-specs",
    summary:
      "Patent filings and developer kit briefings indicate dedicated custom silicon capable of native 1080p rendering alongside Remote Play.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80",
    category: "Gaming",
    publishedAt: "2026-10-07T18:50:00Z",
    readTime: 5,
    sourcesCount: 4,
    author: "Devon Reed",
    status: "reported"
  },
  {
    id: "latest-05",
    title: "Review: 'The Obsidian Glass' Is a Tense, Masterful Chamber Mystery with Florence Pugh at Her Peak",
    slug: "the-obsidian-glass-film-review-florence-pugh",
    summary:
      "Director Todd Field crafts an exacting study of academic deceit, anchored by an electric turn that commands every frame.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    category: "Movies",
    publishedAt: "2026-10-07T17:15:00Z",
    readTime: 6,
    rating: 4.5,
    author: "Julian Vance",
    status: "confirmed"
  }
];

export const MOST_READ_STORIES: Story[] = [
  {
    id: "mostread-01",
    title: "Inside Marvel Studios' Recalibrated Phase 6 Slate: Slower Cadence, High-Budget Practicality",
    slug: "inside-marvel-studios-recalibrated-phase-six-slate",
    category: "Hollywood",
    publishedAt: "2026-10-06T14:00:00Z",
    mostReadRank: 1,
    readTime: 7,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
    author: "Elena Vasquez"
  },
  {
    id: "mostread-02",
    title: "Deepika Padukone and Ranveer Singh Announce Joint Production Banner for Script-Driven Cinema",
    slug: "deepika-padukone-ranveer-singh-production-banner",
    category: "Bollywood",
    publishedAt: "2026-10-06T18:30:00Z",
    mostReadRank: 2,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    author: "Pooja Trivedi"
  },
  {
    id: "mostread-03",
    title: "Pedro Pascal Speaks Candidly on Navigating Concurrent Blockbuster Schedules: 'Preparation Is Sanity'",
    slug: "pedro-pascal-profile-blockbuster-filming-schedules",
    category: "Celebrities",
    publishedAt: "2026-10-06T11:20:00Z",
    mostReadRank: 3,
    readTime: 6,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    author: "Marcus Chen"
  },
  {
    id: "mostread-04",
    title: "The Battle for Sunday Night: How HBO, Netflix and Prime Video Are Spending $80M an Episode",
    slug: "prestige-television-budgets-hbo-netflix-prime-analysis",
    category: "TV",
    publishedAt: "2026-10-05T19:00:00Z",
    mostReadRank: 4,
    readTime: 8,
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80",
    author: "Maya Lindqvist"
  },
  {
    id: "mostread-05",
    title: "Nintendo Switch 2: Full Backwards Compatibility and Cartridge Format Clarified by Supply Chain",
    slug: "nintendo-switch-2-backwards-compatibility-supply-chain",
    category: "Gaming",
    publishedAt: "2026-10-05T09:45:00Z",
    mostReadRank: 5,
    readTime: 5,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&q=80",
    author: "Devon Reed"
  }
];

export const HOLLYWOOD_STORIES = {
  featured: {
    id: "hwood-feat",
    title: "How Academy Awards Category Changes Are Reshaping Guild Campaigns for Autumn Contenders",
    slug: "academy-awards-category-changes-guild-campaigns",
    summary:
      "With Stunt Design now formally ratified for the 98th Oscars, studios are redesigning FYC screening schedules to showcase choreography alongside directing and editing.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    category: "Hollywood" as const,
    publishedAt: "2026-10-07T17:00:00Z",
    readTime: 5,
    sourcesCount: 3,
    author: "Arthur Sterling",
    status: "confirmed" as const,
    contentParagraphs: [
      "The Board of Governors of the Academy of Motion Picture Arts and Sciences' formal introduction of Best Stunt Design has triggered an immediate restructuring of autumn Oscar campaigns.",
      "Major studios are already booking guild screenings specifically pairing action directors and second-unit coordinators with senior Academy voters.",
      "Insiders note that this long-overdue institutional recognition is reshaping early predictions across technical craft branches."
    ]
  },
  supporting: [
    {
      id: "hwood-01",
      title: "Greta Gerwig Begins Pre-Production in London on Chronicles of Narnia: The Silver Chair",
      slug: "greta-gerwig-narnia-pre-production-london-netflix",
      category: "Hollywood" as const,
      publishedAt: "2026-10-07T15:10:00Z",
      readTime: 3,
      author: "Elena Vasquez",
      sourcesCount: 2,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "hwood-02",
      title: "Box Office Analysis: Mid-Budget Thrillers Outperform $200M Tentpoles in Third Quarter Margins",
      slug: "box-office-analysis-mid-budget-thrillers-q3",
      category: "Hollywood" as const,
      publishedAt: "2026-10-07T13:45:00Z",
      readTime: 4,
      author: "Arthur Sterling",
      sourcesCount: 3,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "hwood-03",
      title: "Guillermo del Toro's Frankenstein Confirmed for Autumn Venice Film Festival World Premiere",
      slug: "guillermo-del-toro-frankenstein-venice-premiere",
      category: "Hollywood" as const,
      publishedAt: "2026-10-07T11:20:00Z",
      readTime: 3,
      author: "Julian Vance",
      sourcesCount: 2,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

export const BOLLYWOOD_STORIES = {
  featured: {
    id: "bwood-feat",
    title: "Indian Cinema's Global Expansion: How Multi-Language Spectacles Broke the $1.5 Billion Overseas Ceiling",
    slug: "indian-cinema-global-expansion-multi-language-spectacles",
    summary:
      "A strategic shift toward synchronized multilingual releases and aggressive theatrical marketing across North America, the Gulf, and East Asia has permanently altered distribution economics.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80",
    category: "Bollywood" as const,
    publishedAt: "2026-10-07T16:30:00Z",
    readTime: 6,
    sourcesCount: 4,
    author: "Pooja Trivedi",
    status: "confirmed" as const,
    contentParagraphs: [
      "The aggregate overseas revenue for Indian theatrical releases surpassed $1.5 billion over the preceding twelve months, driven by Telugu, Hindi, and Tamil tentpoles executing synchronized 8,000-screen international footprints.",
      "Studio executives in Mumbai and Hyderabad are now treating global release windows identically to domestic territories, booking prime IMAX and Dolby Cinema formats across North America.",
      "Industry analysts highlight that storytelling rooted in deep cultural mythology combined with world-class VFX has created a durable cross-demographic audience."
    ]
  },
  supporting: [
    {
      id: "bwood-01",
      title: "Shah Rukh Khan and Suhana Khan Team with Sujoy Ghosh for High-Stakes Actioner 'King'",
      slug: "shah-rukh-khan-sujoy-ghosh-king-action-film",
      category: "Bollywood" as const,
      publishedAt: "2026-10-07T14:15:00Z",
      readTime: 3,
      author: "Pooja Trivedi",
      sourcesCount: 3,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "bwood-02",
      title: "Ayan Mukerji's 'War 2' Enters Final VFX Post-Production; Yash Raj Films Plans Six-City Worldwide Tour",
      slug: "war-2-ayan-mukerji-vfx-post-production-yrf",
      category: "Bollywood" as const,
      publishedAt: "2026-10-07T12:00:00Z",
      readTime: 4,
      author: "Pooja Trivedi",
      sourcesCount: 2,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "bwood-03",
      title: "Kalki 2898 AD Sequel Commences Conceptual Pre-Visualization at Ramoji Film City",
      slug: "kalki-2898-ad-part-two-nag-ashwin-previs",
      category: "Bollywood" as const,
      publishedAt: "2026-10-07T09:30:00Z",
      readTime: 3,
      author: "Pooja Trivedi",
      sourcesCount: 2,
      status: "confirmed" as const,
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

export const CELEBRITIES: CelebrityProfile[] = [
  {
    id: "celeb-01",
    name: "Zendaya",
    knownFor: "Euphoria, Dune, Challengers",
    nationality: "American",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    latestHeadline: "Signs to Star in Luca Guadagnino's Venice-Bound Psychological Drama 'The Gilded Rose'",
    latestCredit: "Production slated for March 2027 in Northern Italy",
    statusBadge: "Confirmed",
    readTime: 4,
    storyId: "celeb-story-01"
  },
  {
    id: "celeb-02",
    name: "Tom Holland",
    knownFor: "Spider-Man, Romeo & Juliet, Uncharted",
    nationality: "British",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    latestHeadline: "Balances West End Stage Commitments While Preparing for Next Christopher Nolan Production",
    latestCredit: "Spider-Man 4 begins camera tests in Pinewood Studios next summer",
    statusBadge: "Confirmed",
    readTime: 5,
    storyId: "celeb-story-02"
  },
  {
    id: "celeb-03",
    name: "Deepika Padukone",
    knownFor: "Kalki 2898 AD, Pathaan, Piku",
    nationality: "Indian",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    latestHeadline: "Establishes Production Fellowship to Support Underrepresented Screenwriters in South Asia",
    latestCredit: "Inaugural grants awarded to six feature scripts",
    statusBadge: "Profile",
    readTime: 4,
    storyId: "celeb-story-03"
  },
  {
    id: "celeb-04",
    name: "Pedro Pascal",
    knownFor: "The Last of Us, Gladiator II, Fantastic Four",
    nationality: "Chilean-American",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    latestHeadline: "Concludes Production on Marvel's Fantastic Four: First Steps Ahead of The Last of Us Season 2 Press Tour",
    latestCredit: "Nominated for Primetime Emmy for Outstanding Lead Actor in a Drama Series",
    statusBadge: "Interview",
    readTime: 6,
    storyId: "celeb-story-04"
  }
];

export const MOVIES_ITEMS: MovieItem[] = [
  {
    id: "mov-01",
    title: "Dune Messiah",
    director: "Denis Villeneuve",
    releaseDate: "December 18, 2026",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    runtime: "165 mins",
    criticVerdict: "Villeneuve concludes his Arrakis trilogy with uncompromising thematic precision and auditory magnificence.",
    category: "Hollywood",
    synopsis: "Paul Atreides faces the irreversible consequences of universal jihad as conspirators within the Imperium conspire to shatter his divine regency."
  },
  {
    id: "mov-02",
    title: "The Phoenician Scheme",
    director: "Wes Anderson",
    releaseDate: "May 2026",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    runtime: "112 mins",
    criticVerdict: "A dark espionage caper marked by Anderson's peerless symmetrical framing and Benicio del Toro's dry melancholy.",
    category: "Hollywood",
    synopsis: "An eccentric corporate fixer untangles an international aviation consortium scandal across post-war Europe."
  },
  {
    id: "mov-03",
    title: "The Obsidian Glass",
    director: "Todd Field",
    releaseDate: "In Theaters Now",
    status: "In Theaters",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    runtime: "148 mins",
    criticVerdict: "Florence Pugh commands an unsettling examination of academic paranoia and intellectual theft.",
    category: "Hollywood",
    synopsis: "An ambitious art historian uncovers a hidden provenance code that threatens to dismantle the century-old foundation she directs."
  },
  {
    id: "mov-04",
    title: "Toxic: A Fairy Tale for Grown-Ups",
    director: "Geetu Mohandas",
    releaseDate: "April 10, 2026",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    runtime: "155 mins",
    criticVerdict: "A gritty, stylized crime drama pairing Kannada superstar Yash with Mohandas's lyrical visual language.",
    category: "International",
    synopsis: "In 1980s Goa, an exiled smuggler must choose between imperial syndicate loyalty and saving his estranged family."
  }
];

export const OTT_STORIES: Story[] = [
  {
    id: "ott-01",
    title: "HBO Gives Series Order to 'A Knight of the Seven Kingdoms' Season 2 Ahead of Debut",
    slug: "hbo-knight-of-seven-kingdoms-season-two-order",
    summary:
      "George R.R. Martin's Westeros novella adaptation starring Peter Claffey and Dexter Sol Ansell secures early backing following stellar internal cut screenings.",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80",
    category: "TV",
    platform: "HBO / Max",
    publishedAt: "2026-10-07T18:30:00Z",
    readTime: 3,
    sourcesCount: 3,
    author: "Maya Lindqvist",
    status: "confirmed"
  },
  {
    id: "ott-02",
    title: "Netflix Renews '3 Body Problem' with Expanded VFX Pipeline for Second and Third Books",
    slug: "netflix-3-body-problem-renewed-vfx-pipeline",
    summary:
      "Showrunners David Benioff, D.B. Weiss, and Alexander Woo begin pre-visualization for the Dark Forest trilogy's climactic fleet encounter.",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80",
    category: "TV",
    platform: "Netflix",
    publishedAt: "2026-10-07T15:50:00Z",
    readTime: 4,
    sourcesCount: 2,
    author: "Maya Lindqvist",
    status: "confirmed"
  },
  {
    id: "ott-03",
    title: "Prime Video Cancels High-Cost Action Spinoff as Platform Curbs Peak Budget Commitments",
    slug: "prime-video-cancels-spinoff-budget-rationalization",
    summary:
      "Amazon MGM Studios consolidates slate around core IP like The Boys, Rings of Power, and Reacher, signaling end of experimental $150M first-season bets.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    category: "TV",
    platform: "Prime Video",
    publishedAt: "2026-10-07T12:40:00Z",
    readTime: 4,
    sourcesCount: 2,
    author: "Arthur Sterling",
    status: "confirmed"
  }
];

export const GAMING_STORIES: (Story & { platforms: string[]; genre: string })[] = [
  {
    id: "game-01",
    title: "Naughty Dog Formally Reveals New Sci-Fi IP 'Sovereign' with PS5 Pro Showcase Trailer",
    slug: "naughty-dog-reveals-sci-fi-ip-sovereign-ps5-pro",
    summary:
      "Neil Druckmann and lead design team present a character-driven space opera featuring dynamic volumetric physics and procedural ecosystem simulations.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    category: "Gaming",
    publishedAt: "2026-10-07T19:15:00Z",
    readTime: 5,
    sourcesCount: 3,
    author: "Devon Reed",
    status: "confirmed",
    platforms: ["PlayStation", "PC"],
    genre: "Action Adventure",
    contentParagraphs: [
      "During an unannounced PlayStation State of Play broadcast, Santa Monica-based Naughty Dog unveiled Sovereign, the studio's first new universe in more than a decade.",
      "The cinematic reveal showcased protagonist Captain Veda navigating a fractured planetary colony, utilizing zero-gravity kinetic tether mechanics and real-time environmental destruction.",
      "Sony confirmed Sovereign will take full advantage of PlayStation 5 Pro PSSR upscaling technology, targeting 60 frames per second at native 4K output."
    ]
  },
  {
    id: "game-02",
    title: "Xbox Game Pass Inks Day-One Publishing Accord for Five Acclaimed Japanese Action RPGs",
    slug: "xbox-game-pass-japanese-action-rpg-deals",
    summary:
      "Microsoft's Tokyo gaming initiatives bear fruit with day-one catalog additions from Square Enix, Capcom, and Atlus partners.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80",
    category: "Gaming",
    publishedAt: "2026-10-07T16:10:00Z",
    readTime: 3,
    sourcesCount: 2,
    author: "Devon Reed",
    status: "confirmed",
    platforms: ["Xbox", "PC"],
    genre: "RPG"
  },
  {
    id: "game-03",
    title: "Esports World Cup Sets Record $75 Million Total Prize Pool Across 24 Tournament Titles",
    slug: "esports-world-cup-record-prize-pool-24-titles",
    summary:
      "Riyadh organizers confirm inclusion of Counter-Strike 2, League of Legends, Valorant, and Street Fighter 6 in unified multi-club championship.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    category: "Gaming",
    publishedAt: "2026-10-07T13:30:00Z",
    readTime: 4,
    sourcesCount: 3,
    author: "Devon Reed",
    status: "confirmed",
    platforms: ["Esports", "PC"],
    genre: "Esports"
  },
  {
    id: "game-04",
    title: "Nintendo Switch 2 Developer Kits Reportedly Showcase DLSS 3.5 Frame Reconstruction",
    slug: "nintendo-switch-2-dlss-frame-reconstruction-report",
    summary:
      "Engineers dissecting Nvidia Tegra architecture indicate handheld targets seamless docking transitions with ray reconstruction capabilities.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80",
    category: "Gaming",
    publishedAt: "2026-10-07T11:00:00Z",
    readTime: 4,
    sourcesCount: 2,
    author: "Devon Reed",
    status: "reported",
    platforms: ["Nintendo"],
    genre: "Hardware"
  }
];

export const TRAILERS: TrailerItem[] = [
  {
    id: "trail-01",
    title: "Superman (2025) — Official Teaser Trailer",
    trailerType: "Official Trailer",
    category: "Movies",
    releaseDate: "July 11, 2025",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    youtubeId: "vBqB31a8Ld4",
    embedUrl: "https://www.youtube-nocookie.com/embed/vBqB31a8Ld4",
    studioOrPublisher: "Warner Bros. Pictures / DC Studios",
    synopsis: "James Gunn directs David Corenswet and Rachel Brosnahan in the inaugural chapter of DC's Gods and Monsters slate."
  },
  {
    id: "trail-02",
    title: "Grand Theft Auto VI — Official Trailer 1",
    trailerType: "Final Trailer",
    category: "Gaming",
    releaseDate: "Fall 2026",
    duration: "1:31",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    youtubeId: "QdBZY2fkU-0",
    embedUrl: "https://www.youtube-nocookie.com/embed/QdBZY2fkU-0",
    studioOrPublisher: "Rockstar Games",
    synopsis: "Vice City beckons as Lucia and Jason navigate the sun-soaked neon streets of Leonida in the most anticipated video game release in history."
  },
  {
    id: "trail-03",
    title: "The Last of Us Season 2 — Official Teaser",
    trailerType: "Teaser Trailer",
    category: "TV",
    releaseDate: "Spring 2025",
    duration: "2:10",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    youtubeId: "pE1qK8KzI6g",
    embedUrl: "https://www.youtube-nocookie.com/embed/pE1qK8KzI6g",
    studioOrPublisher: "HBO / Max",
    synopsis: "Five years of peace in Jackson are shattered as Joel and Ellie confront the harrowing aftermath of their choices in Salt Lake City."
  },
  {
    id: "trail-04",
    title: "Gladiator II — Official Trailer",
    trailerType: "Official Trailer",
    category: "Movies",
    releaseDate: "In Theaters",
    duration: "3:08",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    youtubeId: "4rgYUipGJNo",
    embedUrl: "https://www.youtube-nocookie.com/embed/4rgYUipGJNo",
    studioOrPublisher: "Paramount Pictures",
    synopsis: "Ridley Scott returns to ancient Rome as Paul Mescal and Denzel Washington battle inside the Colosseum for the soul of the empire."
  }
];

export const UPCOMING_RELEASES: ReleaseCalendarItem[] = [
  {
    id: "rel-01",
    title: "The Fantastic Four: First Steps",
    date: "July 25, 2025",
    dayBadge: "JUL 25",
    platform: "Global Theatrical (IMAX)",
    category: "Movies",
    medium: "Theatrical",
    verifiedStatus: "Confirmed Date"
  },
  {
    id: "rel-02",
    title: "Stranger Things Season 5 (Final Season)",
    date: "Autumn 2025",
    dayBadge: "OCT 2025",
    platform: "Netflix",
    category: "TV",
    medium: "Streaming",
    verifiedStatus: "Expected Window"
  },
  {
    id: "rel-03",
    title: "Ghost of Yōtei",
    date: "2025 (TBA)",
    dayBadge: "Q4 2025",
    platform: "PlayStation 5",
    category: "Gaming",
    medium: "Multiplatform Console",
    verifiedStatus: "Confirmed Date"
  },
  {
    id: "rel-04",
    title: "Toxic: A Fairy Tale for Grown-Ups",
    date: "April 10, 2026",
    dayBadge: "APR 10",
    platform: "Worldwide Theatrical",
    category: "Movies",
    medium: "Theatrical",
    verifiedStatus: "Confirmed Date"
  },
  {
    id: "rel-05",
    title: "Grand Theft Auto VI",
    date: "Autumn 2026",
    dayBadge: "FALL 2026",
    platform: "PlayStation 5, Xbox Series X|S",
    category: "Gaming",
    medium: "Multiplatform Console",
    verifiedStatus: "Confirmed Date"
  },
  {
    id: "rel-06",
    title: "Severance Season 3",
    date: "Early 2026",
    dayBadge: "Q1 2026",
    platform: "Apple TV+",
    category: "TV",
    medium: "Streaming",
    verifiedStatus: "Confirmed Date"
  }
];

export const SEARCH_INDEX: SearchResultItem[] = [
  {
    id: "s-01",
    title: "Tom Holland",
    type: "People",
    subtitle: "Actor · London, UK",
    meta: "Spider-Man, Romeo & Juliet, Uncharted",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    summary: "English actor acclaimed for portrayal of Peter Parker / Spider-Man in the Marvel Cinematic Universe and leading stage performances."
  },
  {
    id: "s-02",
    title: "Zendaya",
    type: "People",
    subtitle: "Actor & Producer · Los Angeles, CA",
    meta: "Euphoria, Dune, Challengers",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    summary: "Two-time Primetime Emmy Award winner and fashion icon known for nuanced dramatic and blockbuster performances."
  },
  {
    id: "s-03",
    title: "Christopher Nolan",
    type: "People",
    subtitle: "Director & Writer · London / Los Angeles",
    meta: "Oppenheimer, Inception, The Dark Knight",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80",
    summary: "Academy Award-winning British-American filmmaker recognized for large-format IMAX productions and philosophical non-linear narratives."
  },
  {
    id: "s-04",
    title: "Dune Messiah",
    type: "Movies",
    subtitle: "Directed by Denis Villeneuve",
    category: "Sci-Fi / Drama",
    meta: "Warner Bros. Pictures · December 2026",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=200&q=80",
    summary: "The concluding chapter of Denis Villeneuve's Frank Herbert adaptations, starring Timothée Chalamet and Zendaya."
  },
  {
    id: "s-05",
    title: "The White Lotus",
    type: "TV Shows",
    subtitle: "Created by Mike White",
    category: "Satirical Drama / Anthology",
    meta: "HBO / Max · 3 Seasons",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=200&q=80",
    summary: "Social satire following the exploits of various employees and guests at an exclusive luxury resort over the span of a week."
  },
  {
    id: "s-06",
    title: "Grand Theft Auto VI",
    type: "Games",
    subtitle: "Rockstar Games",
    category: "Open World Action",
    meta: "PS5, Xbox Series X|S · Fall 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=200&q=80",
    summary: "The next evolution in open-world storytelling set across the neon-soaked state of Leonida."
  },
  {
    id: "s-07",
    title: "Christopher Nolan Sets Next Epic Feature at Universal for Summer 2027",
    type: "Stories",
    subtitle: "The Chronicle Exclusive",
    category: "Hollywood",
    meta: "By Elena Vasquez · 5 min read",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80",
    summary: "Universal Pictures secures global distribution rights for confidential 70mm production."
  }
];
