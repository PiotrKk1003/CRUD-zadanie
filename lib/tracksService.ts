import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  created_at?: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>): Promise<Track[]> {
  const { data, error } = await supabase.from<Track>('tracks').insert([track]);
  if (error) throw error;
  return data || [];
}





