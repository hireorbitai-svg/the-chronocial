import { supabase } from './supabase';
import { SourceRow, StorySourceRow } from '../types/database';

/**
 * Fetch all active editorial sources.
 */
export async function getSources(): Promise<SourceRow[]> {
  try {
    const { data, error } = await supabase
      .from('sources')
      .select('*')
      .eq('is_active', true)
      .order('credibility_tier', { ascending: true });

    if (error) {
      console.warn('[Sources] Supabase query warning:', error.message);
      return [];
    }

    return (data as SourceRow[]) || [];
  } catch (err) {
    console.warn('[Sources] Network or query error:', err);
    return [];
  }
}

/**
 * Fetch all sources associated with a specific story.
 */
export async function getStorySources(storyId: string): Promise<StorySourceRow[]> {
  try {
    const { data, error } = await supabase
      .from('story_sources')
      .select('*, sources(*)')
      .eq('story_id', storyId)
      .order('is_primary', { ascending: false });

    if (error) {
      console.warn('[StorySources] Query warning:', error.message);
      return [];
    }

    return (data as StorySourceRow[]) || [];
  } catch (err) {
    console.warn('[StorySources] Network or query error:', err);
    return [];
  }
}
