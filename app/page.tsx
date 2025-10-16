'use client';

import { useState, useEffect } from 'react';
import { getTracks, Track } from '../lib/tracksService';

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
    if (data) {
      setTracks(data);
    }
  }

  async function handleAdd() {
    setTitle('');
    setArtist('');
    setAlbum('');
    await fetchTracks();
  }

  const inputStyle = {
    margin: '5px',
    padding: '5px',
    width: '200px',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '5px 10px',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <div>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} style={inputStyle} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={inputStyle} />
        <button onClick={handleAdd} style={buttonStyle}>Dodaj utwór</button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tytuł</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Wykonawca</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{track.title}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{track.artist}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{track.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




