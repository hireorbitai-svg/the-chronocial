import { supabase } from './supabase';
import { Story, StoryCategory, StoryStatus } from '../types';
import { StoryRow } from '../types/database';
import {
  LEAD_STORY,
  SECONDARY_LEAD_STORIES,
  TRENDING_STORIES,
  LATEST_STORIES,
  MOST_READ_STORIES,
  HOLLYWOOD_STORIES,
  BOLLYWOOD_STORIES,
  GAMING_STORIES,
  OTT_STORIES,
} from '../data/mockStories';

/**
 * Standard fields for stories query to keep performance optimal.
 */
const STORY_SELECT_FIELDS = `
  id,
  slug,
  title,
  dek,
  summary,
  body,
  excerpt,
  category,
  subcategory,
  status,
  hero_image_url,
  thumbnail_url,
  author_name,
  published_at,
  updated_at,
  is_published,
  is_featured,
  is_trending,
  read_time_minutes,
  source_count,
  verification_notes
`;

/**
 * Map a raw PostgreSQL StoryRow into The Chronicle frontend Story interface.
 */
export function mapRowToStory(row: Partial<StoryRow>): Story {
  const contentParagraphs = row.body
    ? row.body.split('\n\n').map((p) => p.trim()).filter(Boolean)
    : undefined;

  return {
    id: row.id || '',
    slug: row.slug || '',
    title: row.title || 'Untitled Dispatch',
    editorialSubdeck: row.dek || undefined,
    summary: row.summary || row.excerpt || undefined,
    image: row.hero_image_url || row.thumbnail_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    category: (row.category as StoryCategory) || 'Hollywood',
    publishedAt: row.published_at || new Date().toISOString(),
    updatedAt: row.updated_at || undefined,
    status: (row.status as StoryStatus) || 'confirmed',
    author: row.author_name || 'The Chronicle Intelligence Desk',
    authorRole: 'Editorial Correspondent',
    readTime: row.read_time_minutes || 4,
    sourcesCount: row.source_count || 1,
    verificationDetails: row.verification_notes || 'Cross-verified through industry records and official trade registries.',
    contentParagraphs,
    isLeadStory: row.is_featured,
    badgeNote: row.subcategory || undefined,
  };
}

/**
 * Fetch Hero Featured Lead and Secondary Stories.
 */
export async function getFeaturedStories(): Promise<{
  leadStory: Story;
  secondaryStories: Story[];
}> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(3);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getFeaturedStories error, using fallback:', error.message);
      return { leadStory: LEAD_STORY, secondaryStories: SECONDARY_LEAD_STORIES };
    }

    const mapped = (data as Partial<StoryRow>[]).map(mapRowToStory);
    const leadStory = mapped[0] || LEAD_STORY;
    const secondaryStories = mapped.slice(1);

    return {
      leadStory,
      secondaryStories: secondaryStories.length > 0 ? secondaryStories : SECONDARY_LEAD_STORIES,
    };
  } catch (err) {
    console.warn('[Stories] getFeaturedStories exception:', err);
    return { leadStory: LEAD_STORY, secondaryStories: SECONDARY_LEAD_STORIES };
  }
}

/**
 * Fetch Trending Stories.
 */
export async function getTrendingStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .eq('is_trending', true)
      .order('published_at', { ascending: false })
      .limit(6);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getTrendingStories error, using fallback:', error.message);
      return TRENDING_STORIES;
    }

    return (data as Partial<StoryRow>[]).map(mapRowToStory);
  } catch (err) {
    console.warn('[Stories] getTrendingStories exception:', err);
    return TRENDING_STORIES;
  }
}

/**
 * Fetch Latest Published Stories.
 */
export async function getLatestStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getLatestStories error, using fallback:', error.message);
      return LATEST_STORIES;
    }

    return (data as Partial<StoryRow>[]).map(mapRowToStory);
  } catch (err) {
    console.warn('[Stories] getLatestStories exception:', err);
    return LATEST_STORIES;
  }
}

/**
 * Fetch Most Read / High-Traffic Stories.
 */
export async function getMostReadStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .order('source_count', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(5);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getMostReadStories error, using fallback:', error.message);
      return MOST_READ_STORIES;
    }

    return (data as Partial<StoryRow>[]).map(mapRowToStory);
  } catch (err) {
    console.warn('[Stories] getMostReadStories exception:', err);
    return MOST_READ_STORIES;
  }
}

/**
 * Fetch Hollywood Section Stories.
 */
export async function getHollywoodStories(): Promise<{
  featured: Story;
  supporting: Story[];
}> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .eq('category', 'Hollywood')
      .order('published_at', { ascending: false })
      .limit(4);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getHollywoodStories error, using fallback:', error.message);
      return HOLLYWOOD_STORIES;
    }

    const mapped = (data as Partial<StoryRow>[]).map(mapRowToStory);
    return {
      featured: mapped[0] || HOLLYWOOD_STORIES.featured,
      supporting: mapped.slice(1).length > 0 ? mapped.slice(1) : HOLLYWOOD_STORIES.supporting,
    };
  } catch (err) {
    console.warn('[Stories] getHollywoodStories exception:', err);
    return HOLLYWOOD_STORIES;
  }
}

/**
 * Fetch Bollywood / Pan-India Stories.
 */
export async function getBollywoodStories(): Promise<{
  featured: Story;
  supporting: Story[];
}> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .eq('category', 'Bollywood')
      .order('published_at', { ascending: false })
      .limit(4);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getBollywoodStories error, using fallback:', error.message);
      return BOLLYWOOD_STORIES;
    }

    const mapped = (data as Partial<StoryRow>[]).map(mapRowToStory);
    return {
      featured: mapped[0] || BOLLYWOOD_STORIES.featured,
      supporting: mapped.slice(1).length > 0 ? mapped.slice(1) : BOLLYWOOD_STORIES.supporting,
    };
  } catch (err) {
    console.warn('[Stories] getBollywoodStories exception:', err);
    return BOLLYWOOD_STORIES;
  }
}

/**
 * Fetch TV & OTT Stories.
 */
export async function getOTTStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .eq('category', 'TV & OTT')
      .order('published_at', { ascending: false })
      .limit(5);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getOTTStories error, using fallback:', error.message);
      return OTT_STORIES;
    }

    return (data as Partial<StoryRow>[]).map(mapRowToStory);
  } catch (err) {
    console.warn('[Stories] getOTTStories exception:', err);
    return OTT_STORIES;
  }
}

/**
 * Fetch Gaming Stories.
 */
export async function getGamingStories(): Promise<(Story & { platforms?: string[]; genre?: string })[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .eq('category', 'Gaming')
      .order('published_at', { ascending: false })
      .limit(5);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Stories] getGamingStories error, using fallback:', error.message);
      return GAMING_STORIES;
    }

    return (data as Partial<StoryRow>[]).map((row) => ({
      ...mapRowToStory(row),
      platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
      genre: row.subcategory || 'Interactive Entertainment',
    }));
  } catch (err) {
    console.warn('[Stories] getGamingStories exception:', err);
    return GAMING_STORIES;
  }
}

/**
 * Fetch Single Story by Slug (for /story/:slug routing).
 */
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn('[Stories] getStoryBySlug error:', error.message);
      // Fallback search across mock stories
      const allMocks = [
        LEAD_STORY,
        ...SECONDARY_LEAD_STORIES,
        ...TRENDING_STORIES,
        ...LATEST_STORIES,
        ...MOST_READ_STORIES,
        HOLLYWOOD_STORIES.featured,
        ...HOLLYWOOD_STORIES.supporting,
        BOLLYWOOD_STORIES.featured,
        ...BOLLYWOOD_STORIES.supporting,
        ...GAMING_STORIES,
        ...OTT_STORIES,
      ];
      return allMocks.find((s) => s.slug === slug) || null;
    }

    return mapRowToStory(data as Partial<StoryRow>);
  } catch (err) {
    console.warn('[Stories] getStoryBySlug exception:', err);
    return null;
  }
}

/**
 * Fetch all stories for global indexing, search routing, and recommendations.
 */
export async function getAllStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(STORY_SELECT_FIELDS)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(30);

    if (error || !data || data.length === 0) {
      return [
        LEAD_STORY,
        ...SECONDARY_LEAD_STORIES,
        ...TRENDING_STORIES,
        ...LATEST_STORIES,
        ...MOST_READ_STORIES,
        HOLLYWOOD_STORIES.featured,
        ...HOLLYWOOD_STORIES.supporting,
        BOLLYWOOD_STORIES.featured,
        ...BOLLYWOOD_STORIES.supporting,
        ...GAMING_STORIES,
        ...OTT_STORIES,
      ];
    }

    return (data as Partial<StoryRow>[]).map(mapRowToStory);
  } catch (err) {
    console.warn('[Stories] getAllStories exception:', err);
    return [
      LEAD_STORY,
      ...SECONDARY_LEAD_STORIES,
      ...TRENDING_STORIES,
      ...LATEST_STORIES,
      ...MOST_READ_STORIES,
      HOLLYWOOD_STORIES.featured,
      ...HOLLYWOOD_STORIES.supporting,
      BOLLYWOOD_STORIES.featured,
      ...BOLLYWOOD_STORIES.supporting,
      ...GAMING_STORIES,
      ...OTT_STORIES,
    ];
  }
}
