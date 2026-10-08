/**
 * Strongly typed definitions for The Chronicle database schema in Supabase.
 */

export type StoryStatus =
  | 'draft'
  | 'published'
  | 'updated'
  | 'developing'
  | 'confirmed'
  | 'reported'
  | 'rumor'
  | 'archived';

export type SourceType =
  | 'official'
  | 'trade_publication'
  | 'major_media'
  | 'gaming_publication'
  | 'aggregator'
  | 'blog'
  | 'social'
  | 'press_release'
  | 'publication';

export type EntityType = 'person' | 'movie' | 'tv_show' | 'game' | 'company';

export interface SourceRow {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  base_url: string | null;
  source_type: SourceType;
  category?: string | null;
  subcategory?: string | null;
  credibility_tier: 1 | 2 | 3;
  rss_url?: string | null;
  api_endpoint?: string | null;
  polling_priority?: number;
  rate_limit_seconds?: number;
  country?: string;
  language?: string;
  is_active: boolean;
  last_successful_fetch?: string | null;
  last_failed_fetch?: string | null;
  consecutive_failures?: number;
  parser_type?: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StoryRow {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  summary: string | null;
  body: string | null;
  excerpt: string | null;
  category: string;
  subcategory: string | null;
  status: StoryStatus;
  hero_image_url: string | null;
  thumbnail_url: string | null;
  author_name: string | null;
  published_at: string | null;
  updated_at: string;
  discovered_at: string;
  is_published: boolean;
  is_featured: boolean;
  is_trending: boolean;
  read_time_minutes: number;
  source_count: number;
  verification_notes: string | null;
  trending_score?: number;
  ranking_score?: number;
  key_facts?: Record<string, any>[] | null;
  canonical_url?: string | null;
  cluster_hash?: string | null;
  created_at: string;
}

export interface IngestionRunRow {
  id: string;
  run_id: string;
  status: 'running' | 'completed' | 'failed';
  started_at: string;
  completed_at: string | null;
  sources_attempted: number;
  sources_succeeded: number;
  sources_failed: number;
  stories_discovered: number;
  stories_new: number;
  stories_updated: number;
  duplicates_detected: number;
  rejected_items: number;
  ai_failures: number;
  database_failures: number;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface StorySourceRow {
  id: string;
  story_id: string;
  source_id: string | null;
  source_url: string;
  source_title: string | null;
  source_published_at: string | null;
  source_type: string | null;
  is_primary: boolean;
  first_seen_at: string;
  last_checked_at: string;
  created_at: string;
  sources?: SourceRow | null;
}

export interface StoryUpdateRow {
  id: string;
  story_id: string;
  update_type: string | null;
  update_summary: string | null;
  previous_status: string | null;
  new_status: string | null;
  created_at: string;
}

export interface PersonRow {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  image_url: string | null;
  external_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MovieRow {
  id: string;
  title: string;
  slug: string;
  overview: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
  runtime_minutes: number | null;
  director: string | null;
  external_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface TVShowRow {
  id: string;
  title: string;
  slug: string;
  overview: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
  network: string | null;
  external_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface GameRow {
  id: string;
  title: string;
  slug: string;
  overview: string | null;
  cover_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
  developer: string | null;
  publisher: string | null;
  external_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyRow {
  id: string;
  name: string;
  slug: string;
  company_type: string | null;
  logo_url: string | null;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface StoryEntityRow {
  id: string;
  story_id: string;
  entity_type: EntityType;
  entity_id: string;
  relevance_score: number;
  created_at: string;
}

export interface TrailerRow {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  platform: string;
  movie_id: string | null;
  tv_show_id: string | null;
  game_id: string | null;
  published_at: string | null;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  title: string;
  review_body: string | null;
  rating: number | null;
  reviewer_name: string | null;
  movie_id: string | null;
  tv_show_id: string | null;
  game_id: string | null;
  published_at: string | null;
  created_at: string;
}

export interface ReleaseDateRow {
  id: string;
  title: string;
  release_type: string | null;
  movie_id: string | null;
  tv_show_id: string | null;
  game_id: string | null;
  platform: string | null;
  release_date: string | null;
  region: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookmarkRow {
  id: string;
  user_id: string;
  story_id: string;
  created_at: string;
}
