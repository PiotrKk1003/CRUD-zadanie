This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
