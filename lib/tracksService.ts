import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  created_at: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .select('id, title, artist, album, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .insert(track)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0] || null;
}







