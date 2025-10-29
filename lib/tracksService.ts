import { supabase } from "./supabaseClient";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  rating?: number;
  created_at?: string;
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from<Track, Track>("tracks") 
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function addTrack(track: Omit<Track, "id" | "created_at">): Promise<void> {
  const { error } = await supabase.from("tracks").insert([track]);
  if (error) throw new Error(error.message);
}

export async function updateTrack(id: string, track: Partial<Omit<Track, "id" | "created_at">>): Promise<void> {
  const { error } = await supabase.from("tracks").update(track).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteTrack(id: string): Promise<void> {
  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}










