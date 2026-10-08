export type StoryCategory =
  | "Hollywood"
  | "Bollywood"
  | "Celebrities"
  | "Movies"
  | "TV"
  | "Gaming";

export type StoryStatus =
  | "breaking"
  | "developing"
  | "updated"
  | "confirmed"
  | "reported"
  | "rumor";

export interface Story {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  image: string;
  category: StoryCategory;
  publishedAt: string;
  updatedAt?: string;
  status?: StoryStatus;
  author?: string;
  authorRole?: string;
  readTime?: number;
  sourcesCount?: number;
  verificationDetails?: string;
  editorialSubdeck?: string;
  contentParagraphs?: string[];
  platform?: string;
  rating?: number;
  trendingRank?: number;
  isLeadStory?: boolean;
  isSecondaryLead?: boolean;
  isMostRead?: boolean;
  mostReadRank?: number;
  badgeNote?: string;
}

export interface CelebrityProfile {
  id: string;
  name: string;
  knownFor: string;
  nationality: string;
  image: string;
  latestHeadline: string;
  latestCredit: string;
  statusBadge?: string;
  readTime: number;
  storyId: string;
}

export interface MovieItem {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  status: "In Theaters" | "Upcoming" | "Review" | "Trailer Available";
  image: string;
  rating?: number; // Out of 5
  criticVerdict?: string;
  runtime?: string;
  category: "Hollywood" | "International" | "Indie";
  synopsis: string;
  storyId?: string;
}

export interface TrailerItem {
  id: string;
  title: string;
  trailerType: "Official Trailer" | "Teaser Trailer" | "Final Trailer" | "Gameplay Reveal";
  category: "Movies" | "TV" | "Gaming";
  releaseDate: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  embedUrl: string;
  studioOrPublisher: string;
  synopsis: string;
}

export interface ReleaseCalendarItem {
  id: string;
  title: string;
  date: string;
  dayBadge: string;
  platform: string;
  category: "Movies" | "TV" | "Gaming";
  medium: "Theatrical" | "Streaming" | "Digital" | "Multiplatform Console";
  verifiedStatus: "Confirmed Date" | "Expected Window";
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: "People" | "Movies" | "TV Shows" | "Games" | "Stories";
  subtitle: string;
  category?: string;
  meta: string;
  image: string;
  summary?: string;
}
