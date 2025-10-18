'use client';

import { useState, useEffect } from 'react';
import { Track, getTracks, addTrack } from '../lib/tracksService';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  async function fetchTracks() {
    const data = await getTracks();
    setTracks(data);
  }

  async function handleAdd() {
    if (!title || !artist) return;
    await addTrack({ 
      title, 
      artist, 
      album: album || undefined,
      year: year ? parseInt(year) : undefined,
      rating: rating ? parseFloat(rating) : undefined
    });
    setTitle('');
    setArtist('');
    setAlbum('');
    setYear('');
    setRating('');
    fetchTracks();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Wykonawca" value={artist} onChange={e => setArtist(e.target.value)} />
        <input placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} />
        <input 
          type="number" 
          placeholder="Rok" 
          value={year} 
          onChange={e => setYear(e.target.value)} 
          min="1900"
          max="2100"
        />
        <input 
          type="number" 
          placeholder="Ocena (0-10)" 
          value={rating} 
          onChange={e => setRating(e.target.value)} 
          min="0"
          max="10"
          step="0.1"
        />
        <button onClick={handleAdd}>Dodaj utwór</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Wykonawca</th>
            <th>Album</th>
            <th>Rok</th>
            <th>Ocena</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map(track => (
            <tr key={track.id}>
              <td>{track.title}</td>
              <td>{track.artist}</td>
              <td>{track.album}</td>
              <td>{track.year}</td>
              <td>{track.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}









