'use client';

import { useState, useEffect } from 'react';
import { getTracks, addTrack } from '../lib/tracksService';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  created_at: string;
}

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);

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

  const inputStyle = { marginRight: '10px', padding: '5px' };
  const buttonStyle = { padding: '5px 10px' };
  const thStyle = { textAlign: 'left', paddingRight: '10px' };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista utworów</h1>
      <div style={{ marginBottom: '10px' }}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} style={inputStyle} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={inputStyle} />
        <button onClick={handleAdd} style={buttonStyle}>Dodaj utwór</button>
      </div>

      <table>
        <thead>
          <tr>
            <th style={thStyle}>Tytuł</th>
            <th style={thStyle}>Wykonawca</th>
            <th style={thStyle}>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map(track => (
            <tr key={track.id}>
              <td style={thStyle}>{track.title}</td>
              <td style={thStyle}>{track.artist}</td>
              <td style={thStyle}>{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



