'use client';

import { useState, useEffect } from 'react';
import { getTracks } from '../lib/tracksService';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  created_at: string;
}

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
    // tu możesz dodać funkcję dodawania tracków do Supabase
    setTitle('');
    setArtist('');
    setAlbum('');
    fetchTracks();
  }

  const inputStyle: React.CSSProperties = {
    marginRight: '8px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
  };

  const thStyle: React.CSSProperties = {
    borderBottom: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const tdStyle: React.CSSProperties = {
    padding: '8px',
    borderBottom: '1px solid #eee',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <div style={{ marginBottom: '16px' }}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} style={inputStyle} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={inputStyle} />
        <button onClick={handleAdd} style={buttonStyle}>Dodaj utwór</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Tytuł</th>
            <th style={thStyle}>Wykonawca</th>
            <th style={thStyle}>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td style={tdStyle}>{track.title}</td>
              <td style={tdStyle}>{track.artist}</td>
              <td style={tdStyle}>{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




