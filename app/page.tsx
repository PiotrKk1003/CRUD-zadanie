'use client';

import { useState, useEffect } from 'react';
import { getTracks, Track, addTrack, deleteTrack } from '../lib/tracksService';

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setLoading(true);
    const data = await getTracks();
    setTracks(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!title || !artist) {
      alert('Tytuł i Wykonawca są wymagane!');
      return;
    }
    await addTrack({ title, artist, album });
    setTitle('');
    setArtist('');
    setAlbum('');
    loadTracks();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Na pewno chcesz usunąć ten utwór?')) {
      await deleteTrack(id);
      loadTracks();
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista utworów</h1>

      {/* Formularz */}
      <div style={{ marginBottom: '20px', display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input placeholder="Wykonawca" value={artist} onChange={(e) => setArtist(e.target.value)} style={inputStyle} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={inputStyle} />
        <button onClick={handleAdd} style={buttonStyle}>Dodaj utwór</button>
      </div>

      {/* Tabela */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Tytuł</th>
            <th style={thStyle}>Wykonawca</th>
            <th style={thStyle}>Album</th>
            <th style={thStyle}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{track.title}</td>
              <td style={tdStyle}>{track.artist}</td>
              <td style={tdStyle}>{track.album ?? '-'}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(track.id)} style={deleteButtonStyle}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  borderRadius: '4px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px',
  borderBottom: '1px solid #ccc',
};

const tdStyle: React.CSSProperties = {
  padding: '8px',
};



