import { supabase } from './supabase';
import { SearchResultItem } from '../types';
import { SEARCH_INDEX } from '../data/mockStories';

/**
 * Real-time indexed search across Stories, People, Movies, TV Shows, and Games in Supabase,
 * with graceful fallback to SEARCH_INDEX if offline or empty.
 */
export async function searchChronicle(
  query: string,
  selectedCategory: string = 'All'
): Promise<SearchResultItem[]> {
  const trimmed = query.trim();

  // If query is empty, return top default search index items filtered by category
  if (!trimmed) {
    if (selectedCategory === 'All') return SEARCH_INDEX.slice(0, 8);
    return SEARCH_INDEX.filter((item) => item.type === selectedCategory).slice(0, 8);
  }

  const results: SearchResultItem[] = [];
  const searchPattern = `%${trimmed}%`;

  try {
    const promises: Promise<void>[] = [];

    // 1. Stories
    if (selectedCategory === 'All' || selectedCategory === 'Stories') {
      promises.push(
        (async () => {
          const { data } = await supabase
            .from('stories')
            .select('id, slug, title, category, author_name, read_time_minutes, thumbnail_url, hero_image_url, summary')
            .eq('is_published', true)
            .ilike('title', searchPattern)
            .limit(6);

          if (data) {
            data.forEach((s) => {
              results.push({
                id: s.id,
                title: s.title,
                type: 'Stories',
                subtitle: `The Chronicle ${s.category} Desk`,
                category: s.category,
                meta: `By ${s.author_name || 'Editorial Desk'} · ${s.read_time_minutes || 4} min read`,
                image: s.thumbnail_url || s.hero_image_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80',
                summary: s.summary || undefined,
              });
            });
          }
        })()
      );
    }

    // 2. People
    if (selectedCategory === 'All' || selectedCategory === 'People') {
      promises.push(
        (async () => {
          const { data } = await supabase
            .from('people')
            .select('id, name, role, bio, image_url')
            .ilike('name', searchPattern)
            .limit(4);

          if (data) {
            data.forEach((p) => {
              results.push({
                id: p.id,
                title: p.name,
                type: 'People',
                subtitle: p.role || 'Talent',
                meta: 'Bureau Dossier Verified',
                image: p.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                summary: p.bio || undefined,
              });
            });
          }
        })()
      );
    }

    // 3. Movies
    if (selectedCategory === 'All' || selectedCategory === 'Movies') {
      promises.push(
        (async () => {
          const { data } = await supabase
            .from('movies')
            .select('id, title, director, poster_url, release_date, overview')
            .ilike('title', searchPattern)
            .limit(4);

          if (data) {
            data.forEach((m) => {
              results.push({
                id: m.id,
                title: m.title,
                type: 'Movies',
                subtitle: m.director ? `Directed by ${m.director}` : 'Theatrical Feature',
                category: 'Movies',
                meta: m.release_date ? `Release: ${m.release_date}` : 'Upcoming Release',
                image: m.poster_url || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80',
                summary: m.overview || undefined,
              });
            });
          }
        })()
      );
    }

    // 4. TV Shows
    if (selectedCategory === 'All' || selectedCategory === 'TV Shows') {
      promises.push(
        (async () => {
          const { data } = await supabase
            .from('tv_shows')
            .select('id, title, network, poster_url, overview')
            .ilike('title', searchPattern)
            .limit(4);

          if (data) {
            data.forEach((t) => {
              results.push({
                id: t.id,
                title: t.title,
                type: 'TV Shows',
                subtitle: t.network || 'Streaming Series',
                category: 'TV & OTT',
                meta: 'Episodic Television',
                image: t.poster_url || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=200&q=80',
                summary: t.overview || undefined,
              });
            });
          }
        })()
      );
    }

    // 5. Games
    if (selectedCategory === 'All' || selectedCategory === 'Games') {
      promises.push(
        (async () => {
          const { data } = await supabase
            .from('games')
            .select('id, title, developer, publisher, cover_url, overview')
            .ilike('title', searchPattern)
            .limit(4);

          if (data) {
            data.forEach((g) => {
              results.push({
                id: g.id,
                title: g.title,
                type: 'Games',
                subtitle: g.developer || g.publisher || 'Studio Title',
                category: 'Gaming',
                meta: 'Interactive Media',
                image: g.cover_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=200&q=80',
                summary: g.overview || undefined,
              });
            });
          }
        })()
      );
    }

    await Promise.all(promises);

    // If database returned results, return them
    if (results.length > 0) {
      return results;
    }

    // Fallback to searching mock index
    return fallbackSearch(trimmed, selectedCategory);
  } catch (err) {
    console.warn('[Search] Query exception, using fallback search index:', err);
    return fallbackSearch(trimmed, selectedCategory);
  }
}

function fallbackSearch(query: string, selectedCategory: string): SearchResultItem[] {
  const lowerQuery = query.toLowerCase();
  return SEARCH_INDEX.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.type === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(lowerQuery) ||
      item.subtitle.toLowerCase().includes(lowerQuery) ||
      item.meta.toLowerCase().includes(lowerQuery);
    return matchesCategory && matchesQuery;
  });
}
