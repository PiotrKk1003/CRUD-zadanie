'use client';

import { useState, useEffect } from 'react';
import { Track, getTracks, addTrack } from '../lib/tracksService';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();

  useEffect(() => {
    fetchTracks();
  }, []);

  async function fetchTracks() {
    const data = await getTracks();
    setTracks(data);
  }

  async function handleAdd() {
    if (!title || !artist) return;

    await addTrack({ title, artist, album: album || null, year, rating });
    fetchTracks();
    setTitle(''); setArtist(''); setAlbum('');
    setYear(undefined); setRating(undefined);
  }

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Wykonawca" value={artist} onChange={e => setArtist(e.target.value)} />
      <input placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} />
      <input placeholder="Rok" type="number" value={year ?? ''} onChange={e => setYear(Number(e.target.value))} />
      <input placeholder="Ocena" type="number" value={rating ?? ''} onChange={e => setRating(Number(e.target.value))} />
      <button onClick={handleAdd}>Dodaj utwór</button>
      <ul>
        {tracks.map(t => (
          <li key={t.id}>
            {t.title} – {t.artist} – {t.album} {t.year && `– ${t.year}`} {t.rating && `– ${t.rating}`}
          </li>
        ))}
      </ul>
    </div>
  );
}









