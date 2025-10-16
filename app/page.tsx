import { useState, useEffect } from 'react';
import { Track, getTracks, addTrack } from '../lib/tracksService';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');

  useEffect(() => {
    async function fetchTracks() {
      const data = await getTracks();
      setTracks(data);
    }
    fetchTracks();
  }, []);

  async function handleAdd() {
    if (!title || !artist || !album) return;
    const newTrack = { title, artist, album };
    const added = await addTrack(newTrack);
    setTracks([...(tracks || []), ...added]);
    setTitle('');
    setArtist('');
    setAlbum('');
  }

  const inputStyle = { margin: '5px', padding: '5px' };
  const buttonStyle = { margin: '5px', padding: '5px' };
  const thStyle = { border: '1px solid black', padding: '5px' };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>
      <div>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} style={inputStyle} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={inputStyle} />
        <button onClick={handleAdd} style={buttonStyle}>Dodaj utwór</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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






