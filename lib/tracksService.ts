import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './supabaseClient';

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  created_at?: string;
};

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id'>) {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .insert([track]);

  if (error) throw error;
  return data;
}





