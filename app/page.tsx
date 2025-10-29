"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { getTracks, addTrack, Track } from "../lib/tracksService";
import { Session } from "@supabase/supabase-js";

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

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

  async function handleAdd() {
    if (!title || !artist) return;
    await addTrack({ title, artist, album });
    setTitle("");
    setArtist("");
    setAlbum("");
    fetchTracks();
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Rejestracja zakończona — sprawdź e-mail, by potwierdzić konto!");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Zaloguj się lub zarejestruj</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonRow}>
          <button onClick={handleLogin} style={styles.buttonPrimary}>
            Zaloguj
          </button>
          <button onClick={handleRegister} style={styles.buttonSecondary}>
            Zarejestruj
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Lista utworów</h1>
        <button onClick={handleLogout} style={styles.buttonSecondary}>
          Wyloguj
        </button>
      </div>

      <div style={styles.addTrackContainer}>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.inputSmall}
        />
        <input
          placeholder="Artysta"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={styles.inputSmall}
        />
        <input
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          style={styles.inputSmall}
        />
        <button onClick={handleAdd} style={styles.buttonPrimary}>
          Dodaj
        </button>
      </div>

      <ul style={styles.trackList}>
        {tracks.map((t) => (
          <li key={t.id} style={styles.trackItem}>
            <strong>{t.title}</strong> — {t.artist} {t.album && `(${t.album})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    textAlign: "center" as const,
    margin: "0 0 20px 0",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  inputSmall: {
    padding: "8px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  buttonPrimary: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  addTrackContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    marginBottom: "20px",
  },
  trackList: {
    listStyle: "none",
    padding: 0,
  },
  trackItem: {
    padding: "10px",
    marginBottom: "8px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
};











