"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { getTracks, addTrack, updateTrack, deleteTrack, Track } from "../lib/tracksService";
import { Session } from "@supabase/supabase-js";

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchTracks();
    else setTracks([]);
  }, [session]);

  async function fetchTracks() {
    const data = await getTracks();
    setTracks(data);
  }

  async function handleAddOrUpdate() {
    if (!title.trim() || !artist.trim()) {
      alert("Uzupełnij tytuł i artystę!");
      return;
    }

    const trackData = {
      title,
      artist,
      album: album || undefined,
      year: year ? parseInt(year) : undefined,
      rating: rating ? parseFloat(rating) : undefined,
    };

    try {
      if (editingId) {
        await updateTrack(editingId, trackData);
        setEditingId(null);
      } else {
        await addTrack(trackData);
      }

      setTitle(""); setArtist(""); setAlbum(""); setYear(""); setRating("");
      fetchTracks();
    } catch (error: unknown) {
      if (error instanceof Error) alert("Błąd: " + error.message);
      else alert("Nieznany błąd");
    }
  }

  function handleEdit(track: Track) {
    setEditingId(track.id);
    setTitle(track.title);
    setArtist(track.artist);
    setAlbum(track.album || "");
    setYear(track.year?.toString() || "");
    setRating(track.rating?.toString() || "");
  }

  async function handleDelete(id: string) {
    if (confirm("Czy na pewno chcesz usunąć ten utwór?")) {
      await deleteTrack(id);
      fetchTracks();
    }
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Rejestracja zakończona — sprawdź e-mail!");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!session) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Zaloguj się lub zarejestruj</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <div style={styles.buttonRow}>
          <button onClick={handleLogin} style={styles.buttonPrimary}>Zaloguj</button>
          <button onClick={handleRegister} style={styles.buttonSecondary}>Zarejestruj</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Lista utworów</h1>
        <button onClick={handleLogout} style={styles.buttonSecondary}>Wyloguj</button>
      </div>

      <div style={styles.addTrackContainer}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
        <input placeholder="Artysta" value={artist} onChange={(e) => setArtist(e.target.value)} style={styles.input} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} style={styles.input} />
        <input placeholder="Rok" value={year} onChange={(e) => setYear(e.target.value)} style={styles.input} />
        <input placeholder="Ocena" value={rating} onChange={(e) => setRating(e.target.value)} style={styles.input} />
        <button onClick={handleAddOrUpdate} style={styles.buttonPrimary}>{editingId ? "Zapisz" : "Dodaj"}</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tytuł</th><th>Artysta</th><th>Album</th><th>Rok</th><th>Ocena</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tracks.length ? tracks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.artist}</td>
              <td>{t.album}</td>
              <td>{t.year}</td>
              <td>{t.rating}</td>
              <td>
                <button onClick={() => handleEdit(t)} style={styles.smallButton}>Edytuj</button>
                <button onClick={() => handleDelete(t.id)} style={{ ...styles.smallButton, backgroundColor: "#f44336" }}>Usuń</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={6} style={{ textAlign: "center" }}>Brak utworów</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center" as const },
  input: { padding: "8px", margin: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  buttonRow: { display: "flex", justifyContent: "center" as const, gap: "10px", marginTop: "10px" },
  buttonPrimary: { padding: "8px 16px", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px" },
  buttonSecondary: { padding: "8px 16px", backgroundColor: "#e0e0e0", border: "none", borderRadius: "4px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" as const },
  addTrackContainer: { display: "flex", flexWrap: "wrap" as const, gap: "10px", marginTop: "20px", marginBottom: "20px" },
  smallButton: { padding: "4px 8px", marginRight: "5px", border: "none", borderRadius: "4px", backgroundColor: "#0070f3", color: "#fff" },
  table: { width: "100%", borderCollapse: "collapse" as const }
};















