'use client';

import { useEffect, useState } from 'react';
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
      console.error('Error fetching tracks:', error);
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
      console.error('Error adding track:', error);
    }
  }

  const thStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const inputStyle: React.CSSProperties = {
    marginRight: '8px',
    padding: '4px 8px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 12px',
    cursor: 'pointer',
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

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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





