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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchTracks();
    } else {
      setTracks([]);
    }
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Rejestracja zakończona — sprawdź e-mail, by potwierdzić konto!");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h2>Zaloguj się lub zarejestruj</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button onClick={handleLogin} style={{ marginRight: "10px" }}>
          Zaloguj
        </button>
        <button onClick={handleRegister}>Zarejestruj</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Lista utworów</h1>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Wyloguj
      </button>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Artysta"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAdd}>Dodaj</button>
      </div>

      <ul>
        {tracks.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong> — {t.artist} ({t.album})
          </li>
        ))}
      </ul>
    </div>
  );
}










