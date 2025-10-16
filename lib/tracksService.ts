import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string | null;
  year?: number | null;
  rating?: number | null;
  created_at: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .insert([track]);

  if (error) throw error;
  return data;
}





