import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  created_at: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track, Track>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>): Promise<Track> {
  const { data, error } = await supabase
    .from<Track, Track>('tracks')
    .insert(track)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTrack(id: string, track: Partial<Omit<Track, 'id' | 'created_at'>>): Promise<Track> {
  const { data, error } = await supabase
    .from<Track, Track>('tracks')
    .update(track)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTrack(id: string): Promise<void> {
  const { error } = await supabase
    .from<Track, Track>('tracks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}



