import { supabase } from "./supabaseClient";

export interface Track {
  id: string; 
  title: string;
  artist: string;
  album?: string;
  year?: number;
  rating?: number;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase.from("tracks").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, "id">) {
  const { error } = await supabase.from("tracks").insert([track]);
  if (error) throw error;
}

export async function updateTrack(id: string, track: Partial<Track>) {
  const { error } = await supabase.from("tracks").update(track).eq("id", id);
  if (error) throw error;
}

export async function deleteTrack(id: string) {
  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) throw error;
}









