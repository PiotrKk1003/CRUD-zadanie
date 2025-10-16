import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track, 'id'>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id'>) {
  const { data, error } = await supabase
    .from<Track, 'id'>('tracks')
    .insert([track]);

  if (error) throw error;
  return data;
}





