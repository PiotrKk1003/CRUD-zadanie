import { supabase } from "./supabaseClient";

export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  year?: string;
  rating?: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase.from("tracks").select("*");
  if (error) throw error;
  return data || [];
}

export async function addTrack(track: Omit<Track, "id">) {
  const { error } = await supabase.from("tracks").insert([track]);
  if (error) throw error;
}

export async function updateTrack(id: number, track: Partial<Track>) {
  const { error } = await supabase.from("tracks").update(track).eq("id", id);
  if (error) throw error;
}

export async function deleteTrack(id: number) {
  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) throw error;
}









