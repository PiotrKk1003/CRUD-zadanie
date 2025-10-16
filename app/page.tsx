"use client";

import { useState, useEffect } from 'react';
import { Track, getTracks, addTrack } from '../lib/tracksService';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  async function fetchTracks() {
    const data = await getTracks();
    setTracks(data);
  }

  async function handleAdd() {
    if (!title || !artist || !album) return;
    await addTrack({ title, artist, album });
    setTitle('');
    setArtist('');
    setAlbum('');
    fetchTracks();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
        <button onClick={handleAdd}>Dodaj utwór</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Tytuł</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Wykonawca</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{track.title}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{track.artist}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}









