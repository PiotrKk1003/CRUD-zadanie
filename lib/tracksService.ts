import { supabase } from './supabaseClient';
import { Track } from './types';

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track, Omit<Track, 'id' | 'created_at'>>('tracks') // Row i Insert/Update
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>): Promise<Track> {
  const { data, error } = await supabase
    .from<Track, Omit<Track, 'id' | 'created_at'>>('tracks')
    .insert([track])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}




