import { supabase } from './supabase';
import {
  CelebrityProfile,
  MovieItem,
  TrailerItem,
  ReleaseCalendarItem,
} from '../types';
import {
  CELEBRITIES,
  MOVIES_ITEMS,
  TRAILERS,
  UPCOMING_RELEASES,
} from '../data/mockStories';
import { PersonRow, MovieRow, TrailerRow, ReleaseDateRow } from '../types/database';

/**
 * Fetch celebrity profiles from Supabase 'people' table,
 * falling back to mock CELEBRITIES on error or empty table.
 */
export async function getCelebrityProfiles(): Promise<CelebrityProfile[]> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Entities] People query notice:', error.message);
      return CELEBRITIES;
    }

    return (data as PersonRow[]).map((person, index) => {
      // Find matching mock item for extra presentation fields if available
      const mockMatch = CELEBRITIES.find((c) => c.name.toLowerCase() === person.name.toLowerCase()) || CELEBRITIES[index % CELEBRITIES.length];

      return {
        id: person.id,
        name: person.name,
        knownFor: person.role || mockMatch?.knownFor || 'Celebrated Talent',
        nationality: mockMatch?.nationality || 'International',
        image: person.image_url || mockMatch?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        latestHeadline: person.bio || mockMatch?.latestHeadline || 'Major upcoming international projects in development.',
        latestCredit: mockMatch?.latestCredit || 'Studio Production',
        statusBadge: mockMatch?.statusBadge || 'Dossier Verified',
        readTime: 3,
        storyId: mockMatch?.storyId || person.id,
      };
    });
  } catch (err) {
    console.warn('[Entities] Fallback to mock celebrities:', err);
    return CELEBRITIES;
  }
}

/**
 * Fetch movies from Supabase 'movies' table,
 * falling back to MOVIES_ITEMS on error or empty table.
 */
export async function getMovieItems(): Promise<MovieItem[]> {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('release_date', { ascending: true })
      .limit(10);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Entities] Movies query notice:', error.message);
      return MOVIES_ITEMS;
    }

    return (data as MovieRow[]).map((movie, index) => {
      const mockMatch = MOVIES_ITEMS.find((m) => m.title.toLowerCase().includes(movie.title.toLowerCase())) || MOVIES_ITEMS[index % MOVIES_ITEMS.length];

      return {
        id: movie.id,
        title: movie.title,
        director: movie.director || mockMatch?.director || 'Director',
        releaseDate: movie.release_date || mockMatch?.releaseDate || 'Upcoming',
        status: mockMatch?.status || 'Upcoming',
        image: movie.poster_url || mockMatch?.image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
        rating: mockMatch?.rating || 4.5,
        criticVerdict: mockMatch?.criticVerdict || 'A major cinematic achievement from a master storyteller.',
        runtime: movie.runtime_minutes ? `${movie.runtime_minutes}m` : (mockMatch?.runtime || '148m'),
        category: (mockMatch?.category as 'Hollywood' | 'International' | 'Indie') || 'Hollywood',
        synopsis: movie.overview || mockMatch?.synopsis || 'Theatrical event feature.',
        storyId: mockMatch?.storyId,
      };
    });
  } catch (err) {
    console.warn('[Entities] Fallback to mock movies:', err);
    return MOVIES_ITEMS;
  }
}

/**
 * Fetch latest trailers from Supabase 'trailers' table,
 * falling back to TRAILERS on error or empty table.
 */
export async function getLatestTrailers(): Promise<TrailerItem[]> {
  try {
    const { data, error } = await supabase
      .from('trailers')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Entities] Trailers query notice:', error.message);
      return TRAILERS;
    }

    return (data as TrailerRow[]).map((tr, index) => {
      const mockMatch = TRAILERS[index % TRAILERS.length];

      // Extract youtube id from url if possible
      let ytId = mockMatch?.youtubeId || '4rgYUipGJNo';
      if (tr.video_url.includes('v=')) {
        ytId = tr.video_url.split('v=')[1].split('&')[0];
      }

      return {
        id: tr.id,
        title: tr.title,
        trailerType: mockMatch?.trailerType || 'Official Trailer',
        category: mockMatch?.category || 'Movies',
        releaseDate: tr.published_at ? new Date(tr.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : (mockMatch?.releaseDate || 'Recently Added'),
        duration: mockMatch?.duration || '2:30',
        thumbnail: tr.thumbnail_url || mockMatch?.thumbnail || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        youtubeId: ytId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}`,
        studioOrPublisher: tr.platform || mockMatch?.studioOrPublisher || 'Studio Official',
        synopsis: mockMatch?.synopsis || tr.title,
      };
    });
  } catch (err) {
    console.warn('[Entities] Fallback to mock trailers:', err);
    return TRAILERS;
  }
}

/**
 * Fetch upcoming releases from Supabase 'release_dates' table,
 * falling back to UPCOMING_RELEASES on error or empty table.
 */
export async function getUpcomingReleases(): Promise<ReleaseCalendarItem[]> {
  try {
    const { data, error } = await supabase
      .from('release_dates')
      .select('*')
      .order('release_date', { ascending: true })
      .limit(8);

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Entities] Releases query notice:', error.message);
      return UPCOMING_RELEASES;
    }

    return (data as ReleaseDateRow[]).map((rel, index) => {
      const mockMatch = UPCOMING_RELEASES[index % UPCOMING_RELEASES.length];

      // Format date badge
      let dayBadge = mockMatch?.dayBadge || 'TBA';
      if (rel.release_date) {
        const d = new Date(rel.release_date);
        dayBadge = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
      }

      return {
        id: rel.id,
        title: rel.title,
        date: rel.release_date || mockMatch?.date || 'TBA',
        dayBadge,
        platform: rel.platform || mockMatch?.platform || 'Global Theaters',
        category: (rel.release_type === 'Video Game' ? 'Gaming' : rel.release_type === 'Television' ? 'TV' : 'Movies') as 'Movies' | 'TV' | 'Gaming',
        medium: (rel.release_type === 'Video Game' ? 'Multiplatform Console' : 'Theatrical') as 'Theatrical' | 'Streaming' | 'Digital' | 'Multiplatform Console',
        verifiedStatus: (mockMatch?.verifiedStatus as 'Confirmed Date' | 'Expected Window') || 'Confirmed Date',
      };
    });
  } catch (err) {
    console.warn('[Entities] Fallback to mock releases:', err);
    return UPCOMING_RELEASES;
  }
}
