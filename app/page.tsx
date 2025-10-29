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

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Twój email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Hasło</label>
        <input
          type="password"
          placeholder="Twoje hasło"
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
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Tytuł</label>
          <input
            placeholder="Tytuł utworu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Artysta</label>
          <input
            placeholder="Artysta"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Album</label>
          <input
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleAdd} style={styles.buttonPrimary}>
          Dodaj
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tytuł</th>
            <th style={styles.th}>Artysta</th>
            <th style={styles.th}>Album</th>
          </tr>
        </thead>
        <tbody>
          {tracks.length > 0 ? (
            tracks.map((t) => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}>{t.title}</td>
                <td style={styles.td}>{t.artist}</td>
                <td style={styles.td}>{t.album}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={styles.noData}>
                Brak utworów do wyświetlenia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
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
    color: "#111",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold" as const,
    color: "#111",
  },
  inputLabel: {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#111",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#111",      // tekst widoczny
    backgroundColor: "#fff", // tło jasne
  },
  inputGroup: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column" as const,
    marginRight: "10px",
    marginBottom: "10px",
  },
  addTrackContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "flex-end",
    marginBottom: "20px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  buttonPrimary: {
    padding: "8px 16px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "8px 16px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
  th: {
    textAlign: "left" as const,
    padding: "8px",
    borderBottom: "2px solid #ccc",
    backgroundColor: "#ddd",
    fontWeight: "bold" as const,
    color: "#111", // nagłówki widoczne
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    color: "#111", // tekst w komórkach widoczny
  },
  tr: {
    backgroundColor: "#fff",
  },
  noData: {
    padding: "8px",
    textAlign: "center" as const,
    color: "#666",
  },
};













