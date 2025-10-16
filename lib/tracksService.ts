import { supabase } from './supabaseClient';

export interface Track {
  id: number;       
  title: string;
  artist: string;
  album: string;
  created_at?: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks') // tylko jeden typ generyczny
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>): Promise<Track> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .insert(track)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}




