# Weryfikacja kopii z komentarzami — 23.11.2026

Zakres: komentarze edukacyjne i czytelny podział kodu, bez zmiany funkcjonalności.

- 8 plików z komentarzami: HTML, CSS, 2 moduły JS, 2 pliki testów i 2 skrypty pomocnicze.
- 23 funkcje opisane w mapie `CZYTAJ-KOD.md` z aktualnymi numerami linii.
- JavaScript: identyczne AST sześciu plików po pominięciu komentarzy i metadanych lokalizacji.
- CSS: te same reguły i wartości po normalizacji formatowania (białe znaki, zapis koloru i cudzysłów atrybutu).
- HTML: te same elementy, atrybuty i treść po pominięciu komentarzy i formatowania.
- Oryginalne pliki w `projects/pierwszy-projekt-github` zachowane bez zmian.
- Testy aplikacji po komentarzach: 31/31 zaliczonych (osobny raport).
- UI: 10 grup kontroli Chromium / Playwright z file://, bez błędów JS.
- Offline: blokada żądań HTTP i HTTPS na poziomie Playwright route.abort; nie jest to przechwytywanie całego ruchu systemowego.
- 375 px: potwierdzone innerWidth i brak poziomego przewijania całej strony.
- Pobrane i odczytane: JSON, README, raport.
- Pozostałe dokumenty w docs/ zachowano bez zmian; datowane stare testy nie są nowymi testami.
- Nie testowano ręcznie na fizycznym telefonie ani w innych silnikach przeglądarek.

Komentarzy nie dodawano wewnątrz literalnego tekstu README i kodu w scenariuszu testowym, bo zmieniłyby dane. Te fragmenty objaśniono w przewodniku. JSON nie dopuszcza komentarzy; pola opisano osobno.
