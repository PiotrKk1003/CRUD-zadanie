import { supabase } from './supabaseClient';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  rating?: number;
  created_at: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Błąd pobierania danych z Supabase:', error);
    return [];
  }

  return data ?? [];
}

export async function addTrack(track: Partial<Track>): Promise<Track | null> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .insert(track)
    .select()
    .single();

  if (error) {
    console.error('Błąd dodawania:', error);
    return null;
  }
  return data;
}

export async function updateTrack(id: string, track: Partial<Track>): Promise<Track | null> {
  const { data, error } = await supabase
    .from<Track>('tracks')
    .update(track)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Błąd aktualizacji:', error);
    return null;
  }
  return data;
}

export async function deleteTrack(id: string): Promise<boolean> {
  const { error } = await supabase
    .from<Track>('tracks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Błąd usuwania:', error);
    return false;
  }
  return true;
}

