'use client';

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
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdd() {
    if (!title || !artist || !album) return;
    try {
      await addTrack({ title, artist, album });
      setTitle('');
      setArtist('');
      setAlbum('');
      fetchTracks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Wykonawca" value={artist} onChange={e => setArtist(e.target.value)} />
        <input placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} />
        <button onClick={handleAdd}>Dodaj utwór</button>
      </div>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Wykonawca</th>
            <th>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map(track => (
            <tr key={track.id}>
              <td>{track.title}</td>
              <td>{track.artist}</td>
              <td>{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}







