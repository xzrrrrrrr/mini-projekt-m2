# Przewodnik „Pierwszy projekt na GitHubie”

**Autor:** Deividas Dirma · **Temat:** ASD1-M2-12 · ASD I, M2, 2026/2027.

Interaktywny asystent manifestu pierwszego repozytorium. Działa lokalnie, bez kont,
API, serwera zewnętrznego i instalacji bibliotek. Nie kontroluje GitHuba ani kodu
projektu: sprawdza wyłącznie informacje zadeklarowane przez użytkownika.

## Uruchomienie

1. Rozpakuj cały katalog, zachowując `src/` i `assets/`.
2. Otwórz **index.html** w aktualnym Chrome, Edge lub Firefox.
3. Alternatywnie z Node.js 20+ wykonaj `npm start` i wejdź na
   `http://127.0.0.1:8080` (Ctrl+C zatrzymuje serwer).

**Nie jest potrzebne `npm install`.** Aplikacja otwierana jako plik też działa.
Node jest potrzebny do testów i opcjonalnego serwera, a nie do samej strony.

## Testy i porównania

```sh
npm test
npm run benchmark
```

- `npm test`: 22 automatyczne przypadki, wejścia i niezależne asercje.
- `npm run benchmark`: porównania 10/100/1000 i zapis `docs/wyniki-porownan.json`.
- W przeglądarce: rozwiń „Porównania…” i naciśnij „Uruchom porównania”.
- Przeprowadzono również 19 scenariuszy interfejsu w Chromium/Playwright;
  dowód i zakres: `docs/weryfikacja-interfejsu.json`. Playwright był wyłącznie
  narzędziem weryfikacji, nie jest zależnością programu ani wymaganych testów.

## Obsługa

Początkowo wczytany jest przykład kontrolny. Kliknij „Sprawdź”, aby ponowić kontrolę.
Wpisz instrukcję uruchomienia: wynik zmieni się z 3/6 (50%) na 4/6 (66,7%).
Po edycji etykieta mówi, że widoczny wynik jest POPRZEDNI; dopiero poprawna
kontrola zatwierdza dane. Niepoprawne ścieżki i złe typy odrzucają zmianę.
Puste pola tekstowe to natomiast prawidłowy schemat manifestu, którego braki
wykazują reguły R1–R6; nie blokują uruchomienia kontroli.

„Pobierz szkielet README” generuje i pobiera README.md (braki oznacza nawiasami).
„Eksport raportu” pobiera manifest oraz bieżący wynik w osobnym JSON.
Eksport JSON manifestów obejmuje cały zestaw; nie jest tym samym co raport.
Eksport po edycji najpierw sprawdza i zatwierdza poprawne dane formularza.

Import sprawdza CAŁY plik przed potwierdzeniem zastąpienia zestawu. Anulowanie
lub błąd nie kasuje zatwierdzonych danych. Uwaga: odświeżenie strony resetuje
pracę, dlatego przed zamknięciem wyeksportuj JSON. Nie ma ukrytego zapisu w sieci.
Wiele projektów wybierasz z listy u góry, a „Nowy projekt” nadaje wolne ID.

## Model JSON, wersja 1

```json
{
  "formatVersion": 1,
  "projects": [{
    "id": "MOJAGRA-1",
    "name": "MojaGra",
    "description": "",
    "files": ["index.html", "README.md"],
    "readme": {"goal": "Gra edukacyjna", "run": "", "tests": ""},
    "demoReady": false
  }]
}
```

Do 1000 projektów, do 1000 ścieżek na projekt. Pusty zestaw jest poprawny.
ID: unikalne, nieedytowalne w formularzu, 1–80 znaków, wielkie litery A–Z,
cyfry i pojedyncze łączniki pomiędzy segmentami. Treść tekstowa do 10000 znaków,
ścieżka do 512, plik importu do 20 MiB. Import odtwarza ID z pliku.
Ścieżki są względne: bez `/` na początku, `..`, `\`, pustych segmentów,
dwukropków i znaków sterujących. Walidator zwraca świeży obiekt, a stan
zastępujemy dopiero po sukcesie. Tekst użytkownika trafia do `textContent`
i pól formularza, nigdy do `innerHTML`.

## Reguły i algorytmy

| ID | Warunek spełnienia | Ważność braku |
|---|---|---|
| R1 | nazwa po trim niepusta | błąd |
| R2 | opis po trim niepusty | ostrzeżenie |
| R3 | dokładnie `README.md` na liście plików | błąd |
| R4 | niepusty cel | ostrzeżenie |
| R5 | niepuste uruchomienie | błąd |
| R6 | niepuste testy | ostrzeżenie |

R4–R6 są sprawdzane niezależnie od R3. `readme.md` i `docs/README.md` nie
spełniają R3. Flaga demonstracji należy do modelu, ale NIE jest siódmą regułą.
Kompletność = spełnione/6 × 100%. 100% nie dowodzi poprawności kodu ani
istnienia lub dostępności repozytorium. Kolejność problemów: błąd przed
ostrzeżeniem, następnie numer reguły.

`src/core.js`:
- `linearSearch`: pierwszy wynik, indeks 0-based lub -1, licznik obejmuje
  każdy faktycznie sprawdzony rekord. Czas O(f), pamięć dodatkowa O(1).
- `insertionSort`: własne stabilne sortowanie, bez bibliotecznego sortowania
  w ścieżce kontroli. Najlepiej O(k), najgorzej O(k²), kopia O(k).
- Liczymy wywołania komparatora, nie wszystkie warunki pętli i nie czas.
- Ślad ma O(k²) znaków w ogólności (kopie kolejnych stanów), ale jest włączony
  tylko dla listy maksymalnie 6 problemów, wyłączony przy benchmarkach.
- `benchmark`: gotowe `.sort()` występuje wyłącznie jako niezależny wzorzec.

**Wyniki:** uporządkowane 9/99/999; odwrócone 45/4950/499500 porównań dla
10/100/1000 unikalnych kluczy. Wyszukiwanie w 1000 rekordach: 1/1000/1000
sprawdzonych dla początku/końca/braku. Sortujemy większe syntetyczne zbiory
rekordów o tym samym komparatorze, nie udajemy, że projekt ma 1000 reguł.

## Pliki i scenariusze

- `index.html`, `style.css`: warstwa wizualna, natywne `<details>/<summary>`.
- `src/core.js`: walidacja, reguły, algorytmy, generowanie plików.
- `src/app.js`: stan, zdarzenia, bezpieczne renderowanie, import/pobieranie.
- `data/control.json`: przykład 50%; `typical.json`: 100%; `boundary.json`:
  spacje, puste sekcje i pliki; `large.json`: 1000 projektów; `empty.json`: [].
- `tests/core.test.cjs`: testy logiki.
- `docs/dokumentacja.pdf`: dokładnie 10 stron; `docs/prezentacja.pdf`: 10 slajdów.
- `docs/obrona.md`: kolejność pokazu i pytania do przygotowania.

## GitHub i oddanie — krok zewnętrzny

Repozytorium GitHub jest obowiązkowe, ale aplikacja NIE łączy się z kontem.
Na etapie przygotowania tej paczki konto GitHub nie było połączone, więc
nie podano fikcyjnego URL. Po utworzeniu repozytorium:
1. Wyślij tę samą wersję kodu, danych, testów, README i dokumentacji.
2. Wpisz rzeczywisty URL do dokumentacji i prezentacji (źródła są edytowalne).
3. Podaj URL osobno w polu „Linki” Dziennika oraz wynik `git rev-parse HEAD`.
4. Zapewnij prowadzącemu dostęp, jeśli repozytorium jest prywatne.
5. Uruchom program i testy z czystej kopii; dołącz pliki, nie tylko link.

## Wsparcie AI i własny wkład

OpenAI Codex w OpenClaw pomógł w analizie wymagań, przygotowaniu kodu,
testów i materiałów; narzędzie generowania obrazów służyło do koncepcji UI.
Niniejsze zrzuty pochodzą już z działającej strony. Właściciel wybrał układ,
minimalistyczny styl, tytuł i rozmieszczenie elementów graficznych.
Nie deklarujemy, że autor już samodzielnie napisał lub zrozumiał cały kod.
Przed obroną powinien przejrzeć kod, wykonać własne próby i opisać rzeczywiście
wykonane zmiany. Automatyczne wyniki są dowodem wykonanych testów, nie
zastępstwem zrozumienia programu.

## Źródła i grafiki

- Specyfikacja prowadzącego: `ASD1-M2-12.html` (M2, 2026/2027).
- GitHub Docs: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories
- MDN details: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
- Node test runner: https://nodejs.org/api/test.html
- MDN textContent: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Logo Filii UwB oraz ikona kota: pliki przekazane przez użytkownika.
  Jasny wariant logo uzyskano CSS (`grayscale`, `invert`, `mix-blend-mode`),
  nie jest deklarowany jako oficjalny wariant identyfikacji uczelni.
