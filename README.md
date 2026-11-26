# Przewodnik „Pierwszy projekt na GitHubie”

**Autor:** Deividas Dirma  
**Przedmiot:** Algorytmy i struktury danych I  
**Mini-projekt:** M2 · ASD1-M2-12 · 2026/2027  
**Wersja:** 1.0.0 · dokumenty zaktualizowane 24.11.2026

Lokalna aplikacja sprawdzająca kompletność informacji o projekcie. Użytkownik podaje manifest, a program pokazuje brakujące informacje i ustala kolejność poprawek. Nie loguje się do GitHuba, nie skanuje dysku i nie uruchamia kodu użytkownika.

## 1. Uruchomienie

1. Rozpakuj **cały** folder `projekt-do-obrony`.
2. Otwórz `01-APLIKACJA/OTWORZ-APLIKACJE.html` w przeglądarce.
3. Zachowaj sąsiednie foldery z kodem i obrazkami. Sam plik HTML nie wystarczy.

Nie potrzeba internetu, frameworka ani `npm install`.

Opcjonalnie, mając Node.js 20 lub nowszy, z głównego folderu uruchom:

```sh
npm start
```

Następnie otwórz `http://127.0.0.1:8080`. Serwer działa tylko lokalnie; Ctrl+C go zatrzymuje. Node.js jest potrzebny do serwera i testów, nie do otwarcia samej aplikacji jako pliku.

## 2. Funkcje i obsługa

- Wybór projektu w zestawie, dodawanie rekordu i edycja formularza.
- Sprawdzenie sześciu reguł, procent kompletności i plan naprawy.
- Wyszukiwanie liniowe oraz sortowanie przez wstawianie z licznikami i historią kroków.
- Porównanie bieżącego i poprzedniego wyniku po poprawce.
- Import i eksport zestawu JSON, wygenerowanie szkieletu README i raportu kontroli.
- Scenariusze kontrolny, typowy, graniczny, większy oraz pusty zestaw.
- Porównania algorytmów na 10, 100 i 1000 rekordów.

### Przykład kontrolny

Po uruchomieniu projekt demonstracyjny **MojaGra** ma wynik **3/6 = 50%**. Wpisz w polu „README: uruchomienie” tekst „Otwórz index.html” i kliknij **Sprawdź**. Wynik zmieni się na **4/6 = 66,7%**, a problem R5 zniknie.

Po edycji program oznacza stary wynik jako nieaktualny. Poprawne sprawdzenie zatwierdza dane; błędny schemat ich nie nadpisuje.

**Zapisuj pracę przez Eksport JSON.** Odświeżenie strony resetuje dane. Wygenerowany README nie jest kopią całego zestawu — do odtworzenia danych służy eksport manifestów JSON.

## 3. Reguły kontroli

| ID | Warunek spełnienia | Ważność braku |
|---|---|---|
| R1 | Nazwa niepusta po usunięciu skrajnych spacji | Błąd |
| R2 | Opis niepusty po usunięciu skrajnych spacji | Ostrzeżenie |
| R3 | Dokładnie `README.md` na liście plików | Błąd |
| R4 | Niepusty cel w README | Ostrzeżenie |
| R5 | Niepusta instrukcja uruchomienia w README | Błąd |
| R6 | Niepusty opis testów w README | Ostrzeżenie |

R4–R6 są sprawdzane niezależnie od R3. `readme.md` i `docs/README.md` nie spełniają R3. `demoReady` jest dodatkową flagą, a nie siódmą regułą.

Kompletność = liczba spełnionych reguł / 6 × 100%. **100% nie oznacza, że kod działa lub że opisy są prawdziwe.**

## 4. Dane, walidacja i zapis

Zestaw ma wersję formatu i tablicę projektów:

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

Nazwy `index.html` i `README.md` w tym przykładzie są **danymi sprawdzanego projektu**, nie ścieżkami uruchamiania aplikacji.

Limity:

- Do 1000 projektów i 1000 plików na projekt; pusty zestaw jest dozwolony.
- Tekst do 10 000 znaków, ID do 80, ścieżka do 512 znaków.
- ID jest unikalne i niezmienne w formularzu: A–Z, cyfry i pojedyncze łączniki między segmentami.
- Ścieżki względne, bez `..`, początkowego `/`, dwukropka, pustych segmentów i znaków sterujących.
- Import i eksport do **20 MiB w bajtach UTF-8**, z uwzględnieniem wcięć i znaków ucieczki w JSON.

Import najpierw sprawdza cały zestaw, potem pyta o zastąpienie danych. Błędny plik lub anulowanie potwierdzenia nie nadpisuje zatwierdzonego stanu. Puste pola tekstowe są poprawne strukturalnie, ale wykazywane jako braki przez reguły.

## 5. Algorytmy

Implementacje: `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`.

### Wyszukiwanie liniowe — `linearSearch`

Sprawdza wpisy po kolei i kończy na pierwszym dopasowaniu. Zwraca indeks i liczbę sprawdzonych rekordów. Brak wyniku to indeks −1. Dla dwóch plików `index.html`, `README.md` licznik wynosi 2. Najlepszy czas O(1), najgorszy O(f), dodatkowa pamięć O(1).

### Sortowanie przez wstawianie — `insertionSort`

Bierze kolejny problem, przesuwa większe klucze w prawo i wstawia problem w lukę. Klucz: **błąd przed ostrzeżeniem**, następnie numer reguły. Przy remisie elementy zachowują kolejność — sortowanie jest stabilne. Wejściowa tablica nie jest przestawiana: powstaje kopia.

Przykład: `R2, R5, R6` → `R5, R2, R6`, dwa rzeczywiste porównania kluczy.

Bez historii: najlepszy czas O(k), najgorszy O(k²); kopia wymaga O(k) pamięci. Historia tekstowa `trace=true` może zwiększyć czas i pamięć do O(k²). W kontroli projektu jest najwyżej sześć problemów, a w pomiarach dużych zbiorów historia jest wyłączona.

Gotowe `.sort()` jest użyte **wyłącznie jako niezależny wzorzec** w testach i pomiarach, nie zamiast własnego algorytmu.

## 6. Testy i pomiary

Z głównego folderu, w którym jest `package.json`:

```sh
npm test
npm run benchmark
```

Weryfikacja 24.11.2026: **31/31 testów** — 27 testów logiki i 4 testy obsługi formularza. Obejmują przykład kontrolny, granice, ID, JSON, pierwsze dopasowanie, remisy i stabilność, limity bajtów oraz ochronę zatwierdzonych danych przy błędach.

Osobno wykonano **10 grup kontroli UI** w Chromium z `file://`, przy zablokowanym HTTP/HTTPS. Sprawdzono m.in. wyniki, import, eksport, pusty zestaw i viewport 375 px. Nie są one doliczane do 31 testów. Nie deklaruje się ręcznych prób na fizycznym telefonie ani na każdej przeglądarce.

| Rekordy | Porównania: uporządkowane | Porównania: odwrócone |
|---|---|---|
| 10 | 9 | 45 |
| 100 | 99 | 4950 |
| 1000 | 999 | 499500 |

Wyszukiwanie w 1000 rekordach: 1 odwiedzony rekord dla trafienia na początku, 1000 na końcu i 1000 przy braku dopasowania. Wyniki zgodne z niezależnym wzorcem.

`npm run benchmark` zapisuje `09-WYNIKI-SPRAWDZEN/wyniki-porownan.json`. Mierzymy operacje, nie czas. Raporty bieżącego sprawdzenia znajdują się w `09-WYNIKI-SPRAWDZEN/dokumenty-2026-11-24/`.

## 7. Struktura projektu

| Ścieżka | Zawartość |
|---|---|
| `README.md` | Ten opis projektu; wersja tekstowa: README.txt |
| `DOKUMENTACJA.docx` | Edytowalny raport Word |
| `DOKUMENTACJA.pdf` | Wymagany raport, dokładnie 10 stron |
| `01-APLIKACJA/OTWORZ-APLIKACJE.html` | Strona startowa i struktura interfejsu |
| `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js` | Reguły, model, algorytmy, walidacja i generowanie plików |
| `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js` | Formularz, przyciski, stan aplikacji i wyniki |
| `02-KOD-APLIKACJI/03-wyglad-strony.css` | Jasny wygląd i układ responsywny |
| `03-OBRAZKI/` | Lokalne logo uczelni i kot |
| `04-PRZYKLADOWE-DANE/` | JSON: kontrolny, kompletny, graniczny, duży, pusty i błędna wersja |
| `05-TESTY/` | Testy reguł, algorytmów, formularza i przycisków |
| `06-NARZEDZIA/` | Opcjonalny serwer lokalny oraz pomiary |
| `07-INSTRUKCJE/` | Mapa funkcji z liniami, komentarze i wyjaśnienia do obrony |
| `08-DOKUMENTACJA/PREZENTACJA-AKTUALNA.pptx` | Prezentacja PowerPoint, 10 slajdów i notatki |
| `08-DOKUMENTACJA/PREZENTACJA-AKTUALNA.pdf` | Podgląd prezentacji |
| `08-DOKUMENTACJA/zrodla/` | Specyfikacja prowadzącego |
| `09-WYNIKI-SPRAWDZEN/` | Raporty testów i pomiarów |

W kodzie znajdują się polskie komentarze i nagłówki kategorii. Włącz zawijanie wierszy w edytorze. JSON nie dopuszcza komentarzy, więc znaczenie pól opisano tutaj i w mapie kodu.

## 8. Architektura i ograniczenia

Formularz → szkic → walidacja → kontrola → zatwierdzenie `state` → widok wyniku.

`current` i `previous` przechowują wyniki tego samego projektu, `activeId` wskazuje aktywny rekord, a `dirty` oznacza niezatwierdzone zmiany. Tekst jest wyświetlany przez `textContent`, nie przez wykonywanie HTML użytkownika. Pobieranie plików wykorzystuje `Blob` i tymczasowy URL.

Nie ma bazy danych, trwałego zapisu po odświeżeniu, kont użytkowników ani połączenia z GitHub API. Opcjonalnych profili reguł Python/JavaScript nie dodano.

## 9. Wsparcie AI i wkład autora

OpenAI Codex w OpenClaw pomagał w analizie wymagań, kodzie i algorytmach, interfejsie, testach, poprawkach, komentarzach i materiałach. Dla obecnej sesji potwierdzono **GPT-6.1-sol** i poziom rozumowania **medium**; nie potwierdza to modelu każdego wcześniejszego etapu.

Wkład autora: określanie wymagań i oczekiwań, decyzje o wyglądzie interfejsu, zgłaszanie uwag oraz kierowanie poprawkami. Nie przypisuje się autorowi samodzielnego napisania kodu lub wykonania testów bez potwierdzenia. Materiał z komentarzami pomaga w nauce, ale nie zastępuje zrozumienia programu.

## 10. Repozytorium i oddanie

**Repozytorium:** [https://github.com/xzrrrrrrr/mini-projekt-m2](https://github.com/xzrrrrrrr/mini-projekt-m2)

Przy oddaniu projektu:

1. Zachowaj ten sam adres repozytorium w prezentacji, dokumentacji i README.
2. Wklej go osobno w polu „Linki” przy oddawaniu M2 w Dzienniku.
3. Podaj oznaczenie commitu i zapewnij prowadzącemu dostęp.
4. Repozytorium musi zawierać tę samą wersję kodu, danych, testów i README co oddawana paczka.
5. Dołącz wymagane pliki — sam link ich nie zastępuje.

## Źródła i grafiki

- Specyfikacja ASD1-M2-12 prowadzącego, M2 2026/2027 — kopia w `08-DOKUMENTACJA/zrodla/`.
- GitHub Docs: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories
- MDN details: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
- MDN textContent: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Node.js test runner: https://nodejs.org/api/test.html
- Logo Filii UwB i ikona kota — pliki przekazane przez użytkownika. Zrzuty raportu — uruchomiona aplikacja, 24.11.2026.
