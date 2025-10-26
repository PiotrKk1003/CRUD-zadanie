Projekt: mini CRUD - Lista utworów

Link do aplikacji (Vercel): https://crud-zadanie-7u2c.vercel.app
Link do GitHubie: https://github.com/PiotrKk1003/CRUD-zadanie.git 
Supabase: https://atltgidsxzorvrmupqyw.supabase.co

annon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bHRnaWRzeHpvcnZybXVwcXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMzMyNTAsImV4cCI6MjA3NTkwOTI1MH0.b0Ol7Im7a8qkVJJ8M7jee50MHtALiAVc7DYlf5jC2r8

Krótki opis:
Prosta aplikacja do zarządzania listą utworów (CRUD) z autoryzacją użytkownika. Frontend: Next.js (TypeScript). Baza danych: Supabase (Postgres). Hosting: Vercel.

Technologie:
- Next.js (App Router) + TypeScript  
- Supabase (Postgres + Auth)  
- Vercel (hosting)  
- GitHub (repozytorium)
- Styl prosty, bez frameworków CSS — czysty JSX + inline style

Konto testowe:
- email: pkonono1@stu.vistula.edu.pl
- password: zenolut123  

Nowe funkcje - Rozszerzenie modułu (Wymaganie B)

<<<<<<< HEAD
Dodane pola do encji Track:
=======
## Nowe funkcje - Rozszerzenie modułu (Wymaganie B)

### Dodane pola do encji Track:

#### 1. **Rok wydania (`year`)**
- Typ: `number` (opcjonalny)
- Opis: Rok wydania utworu
- Walidacja: Wartości między 1900 a 2100
- Użycie: Pozwala na katalogowanie utworów według roku wydania

#### 2. **Ocena (`rating`)**
- Typ: `number` (opcjonalny)
- Opis: Ocena utworu w skali 0-10
- Walidacja: Wartości między 0 a 10 (z dokładnością do 0.1)
- Użycie: Umożliwia użytkownikom ocenianie utworów

### Zmiany w kodzie:

1. **Model/Interfejs** (`lib/tracksService.ts`):
   - Dodano pola `year?: number` i `rating?: number` do interfejsu `Track`
   - Zaktualizowano zapytania do bazy danych o nowe kolumny

2. **API/Service** (`lib/tracksService.ts`):
   - Funkcja `getTracks()` pobiera nowe pola z bazy danych
   - Funkcja `addTrack()` obsługuje nowe pola przy dodawaniu utworów

3. **Frontend** (`app/page.tsx`):
   - Dodano pola formularza do wprowadzania roku i oceny
   - Dodano kolumny w tabeli do wyświetlania roku i oceny
   - Dodano walidację po stronie klienta (type="number", min/max)
   - Obsługa konwersji wartości (parseInt dla roku, parseFloat dla oceny)

## Learn More
>>>>>>> 5b47526d5d0f21ed3a0086a4a22f53c1de4c1637

1.Rok wydania (`year`)
- Typ: `number` (opcjonalny)
- Opis: Rok wydania utworu
- Walidacja: Wartości między 1900 a 2100
- Użycie: Pozwala na katalogowanie utworów według roku wydania

2. Ocena (`rating`)
- Typ: `number` (opcjonalny)
- Opis: Ocena utworu w skali 0-10
- Walidacja: Wartości między 0 a 10 (z dokładnością do 0.1)
- Użycie: Umożliwia użytkownikom ocenianie utworów

Zmiany w kodzie:

1. Model/Interfejs (`lib/tracksService.ts`):
   - Dodano pola `year?: number` i `rating?: number` do interfejsu `Track`
   - Zaktualizowano zapytania do bazy danych o nowe kolumny

2. API/Service (`lib/tracksService.ts`):
   - Funkcja `getTracks()` pobiera nowe pola z bazy danych
   - Funkcja `addTrack()` obsługuje nowe pola przy dodawaniu utworów

3. Frontend (`app/page.tsx`):
   - Dodano pola formularza do wprowadzania roku i oceny
   - Dodano kolumny w tabeli do wyświetlania roku i oceny
   - Dodano walidację po stronie klienta (type="number", min/max)
   - Obsługa konwersji wartości (parseInt dla roku, parseFloat dla oceny)

