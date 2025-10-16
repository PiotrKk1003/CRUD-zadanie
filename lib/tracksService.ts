import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  created_at: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track, Track>('tracks')
    .select('id, title, artist, album, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from<Track, Omit<Track, 'id' | 'created_at'>>('tracks')
    .insert([track]);

  if (error) throw error;
  return data;
}






