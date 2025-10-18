import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Track {
  id: string
  title: string
  artist: string
  album?: string
  year?: number
  rating?: number
  created_at: string
}

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from('tracks')
    .select('id, title, artist, album, year, rating, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Track[]
}

export async function addTrack(track: Omit<Track, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('tracks')
    .insert([track])

  if (error) throw error
  return data
}








