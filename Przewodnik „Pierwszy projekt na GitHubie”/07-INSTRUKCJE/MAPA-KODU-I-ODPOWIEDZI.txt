# Kod z komentarzami — przygotowanie do obrony

Autor projektu: Deividas Dirma · ASD1-M2-12.
Komentarze i objaśnienia przygotowano z pomocą AI: to materiał do nauki, nie potwierdzenie samodzielnego napisania programu.

## Jak zacząć

1. Otwórz `01-APLIKACJA/OTWORZ-APLIKACJE.html` w przeglądarce — działa lokalnie, bez instalacji.
2. W edytorze otwórz najpierw `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`. Włącz zawijanie wierszy, bo objaśnienia są na końcu linii.
3. Wyszukuj nagłówki `═══`: wskazują kategorię kodu.
4. Zacznij od `linearSearch`, `compareIssues`, `insertionSort` i `checkProject`.
5. Potem przeczytaj `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js`: łączy formularz z tymi funkcjami.
6. Testy uruchom z folderu projektu: `npm test` (Node.js 20 lub nowszy).

Oryginał projektu pozostał niezmieniony. To osobna, czytelniej rozłożona kopia edukacyjna.
Nie trzeba instalować bibliotek: formatter i parsery służyły wyłącznie przygotowaniu i weryfikacji kopii.

## Kategorie — gdzie znajduje się dana część

| Kategoria | Plik | Co wyjaśniasz |
|---|---|---|
| Struktura i pola formularza | `01-APLIKACJA/OTWORZ-APLIKACJE.html` | Co użytkownik widzi; znaczenie ID elementów |
| Wygląd i responsywność | `02-KOD-APLIKACJI/03-wyglad-strony.css` | Kolory, rozmiary, siatka, telefon |
| Reguły i model danych | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js` | R1–R6, obiekt projektu, ID, limity |
| Wyszukiwanie liniowe | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `linearSearch` | Szukanie pierwszego dokładnego README.md |
| Klucz sortowania | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `compareIssues` | Ważność, potem numer reguły |
| Sortowanie przez wstawianie | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `insertionSort` | Przesuwanie elementów i wstawianie w lukę |
| Walidacja | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `validateEnvelope` | Typy, unikalność ID, ścieżki i granice |
| Wynik kontroli | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `checkProject` | Sprawdzenie reguł i obliczenie procentu |
| Import i eksport tekstu | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `parseJSON`, `serializeJSON` | Schemat JSON i limit 20 MiB |
| Generowanie plików | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js`: `makeReadme`, `makeReport` | README i raport z danych |
| Stan aplikacji | początek `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js` | state, activeId, current, previous, dirty |
| Obsługa ekranu | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js`: funkcje renderujące | Wyświetlanie danych i wyników |
| Kliknięcia, zapis, pobieranie | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js`: addEventListener | Reakcja na działanie użytkownika |
| Testy logiki | `05-TESTY/testy-regul-i-algorytmow.test.cjs` | Znane wyniki, błędy, granice, wzorzec sortowania |
| Testy interfejsu | `05-TESTY/testy-formularza-i-przyciskow.test.cjs` | Model DOM i rzeczywiste funkcje obsługi zdarzeń |
| Pomiary z terminala | `06-NARZEDZIA/pomiary-algorytmow.cjs` | `npm run benchmark` |
| Pomocniczy serwer | `06-NARZEDZIA/serwer-lokalny.cjs` | `npm start`, port 8080; nie jest wymagany do file:// |
| Dane scenariuszy | `04-PRZYKLADOWE-DANE/*.json` | Kontrolne, typowe, graniczne, 1000 projektów, puste i błędna wersja |

## Dokładne miejsca w tej kopii

Numery linii dotyczą plików w tej paczce, nie starej wersji kodu.

| Funkcja | Kategoria | Plik i linia |
|---|---|---|
| `linearSearch` | ALGORYTM: WYSZUKIWANIE LINIOWE | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:47` |
| `compareIssues` | PORÓWNYWANIE: KLUCZ SORTOWANIA | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:59` |
| `insertionSort` | ALGORYTM: SORTOWANIE PRZEZ WSTAWIANIE | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:68` |
| `validateEnvelope` | WALIDACJA: STRUKTURA I GRANICE DANYCH | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:101` |
| `parseJSON` | IMPORT: TEKST JSON NA DANE | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:155` |
| `checkJSONSize` | LIMIT: BAJTY UTF-8 | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:169` |
| `serializeJSON` | EKSPORT: DANE NA TEKST JSON | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:176` |
| `checkProject` | REGUŁY: KONTROLA PROJEKTU | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:184` |
| `makeReadme` | GENEROWANIE: README | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:220` |
| `makeReport` | GENEROWANIE: RAPORT | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:227` |
| `benchmark` | POMIARY: PORÓWNANIE ZE WZORCEM | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:238` |
| `scenarios` | DANE: SCENARIUSZE DO POKAZU | `02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js:270` |
| `notice` | INTERFEJS: KOMUNIKATY | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:24` |
| `readDraft` | FORMULARZ: ODCZYT SZKICU | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:31` |
| `renderOptions` | INTERFEJS: LISTA PROJEKTÓW | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:46` |
| `renderEmpty` | INTERFEJS: PUSTY ZESTAW | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:65` |
| `showProject` | INTERFEJS: WYBRANY PROJEKT | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:81` |
| `renderResult` | INTERFEJS: PREZENTACJA WYNIKU | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:106` |
| `checkAndCommit` | ZATWIERDZANIE: NAJPIERW SPRAWDZENIE | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:156` |
| `download` | PLIKI: POBIERANIE | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:180` |
| `replaceAll` | IMPORT: WYMIANA CAŁEGO ZESTAWU | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:194` |
| `addTable` | INTERFEJS: TABELA POMIARÓW | `02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js:292` |
| `app` | TESTY INTERFEJSU: ADAPTER DOM | `05-TESTY/testy-formularza-i-przyciskow.test.cjs:16` |

## Najważniejsze zmienne — powiedz własnymi słowami

- `state`: zatwierdzony zestaw projektów w pamięci.
- `activeId`: identyfikator wybranego projektu.
- `current` / `previous`: aktualny i poprzedni wynik kontroli.
- `dirty`: formularz został zmieniony, ale jeszcze nie zatwierdzony.
- `records`: dane wejściowe algorytmu.
- `items`: płytka kopia tablicy; zmiana kolejności nie zmienia wejściowej tablicy.
- `key`: problem wybrany do wstawienia.
- `i`: miejsce, z którego biorę kolejny problem.
- `j`: pozycja po lewej, którą porównuję z key.
- `comparisons`: licznik wywołań funkcji porównującej, nie wszystkich warunków.
- `steps`: historia kroków: przed, decyzja, po.
- `checked`: w wyszukiwaniu licznik odwiedzonych rekordów; przy checkboxie ta sama nazwa oznacza zaznaczenie.

## Wyszukiwanie liniowe — jak odpowiedzieć

„Sprawdzam pliki po kolei. Jeżeli ścieżka jest dokładnie README.md, od razu zwracam jej indeks i liczbę sprawdzonych plików. Jeżeli nie znajdę, zwracam -1. Dla index.html i README.md odwiedzam dwa pliki”.

Indeksy w kodzie zaczynają się od 0. Pozycja na ekranie to indeks + 1.
To nie jest przeszukiwanie plików na dysku — sprawdzana jest lista nazw w manifeście.
Złożoność: O(f), gdzie f oznacza liczbę wpisów; pamięć pomocnicza O(1).

## Sortowanie przez wstawianie — jak odpowiedzieć

„Lewa część listy jest już uporządkowana. Biorę następny problem jako key. Przesuwam większe klucze w prawo i wstawiam key w wolne miejsce. Błąd ma pierwszeństwo przed ostrzeżeniem. Gdy ważność jest taka sama, porównuję numer reguły”.

Przykład: R2, R5, R6.
1. R2 jest początkową uporządkowaną częścią.
2. Biorę R5. To błąd, więc przesuwam R2 w prawo i wstawiam R5 przed nim.
3. Biorę R6. R2 ma ten sam poziom ważności i mniejszy numer, więc niczego nie przesuwam.
4. Wynik: R5, R2, R6. Są dwa rzeczywiste porównania kluczy.

- `compare(a,b) < 0`: a powinno być przed b.
- `compare(a,b) === 0`: równy klucz; nie zmieniam wzajemnej kolejności — stabilność.
- `compare(a,b) > 0`: a ma trafić za b.
- Samo sortowanie bez zapisywania historii: najlepszy przypadek O(k), najgorszy O(k²), gdzie k to liczba problemów.
- Funkcja robi kopię tablicy, więc pamięć nie jest O(1): bez historii wynosi O(k).
- Opcjonalna historia `trace=true` tworzy teksty długości O(k) w kolejnych krokach i może zwiększyć czas i pamięć do O(k²), nawet gdy porównań jest mało. Pomiary w benchmarku nie zapisują historii.
- W normalnym projekcie jest najwyżej 6 problemów. Zestawy 10/100/1000 to sztuczne dane do porównania algorytmu.
- Gotowe `.sort()` występuje w benchmarku i testach tylko jako wzorzec. Własny algorytm go nie używa.

## Kontrola projektu i błędy — jak odpowiedzieć

„Najpierw sprawdzam schemat danych. Potem oceniam sześć niezależnych warunków. Zliczam spełnione reguły, a niespełnione sortuję. 3/6 daje 50%, a 4/6 daje około 66,7%”.

R1 nazwa, R3 README.md i R5 uruchomienie to błędy; R2 opis, R4 cel i R6 testy to ostrzeżenia.
R4–R6 są sprawdzane także wtedy, gdy nie ma wpisu README.md. `demoReady` nie jest siódmą regułą.
Błąd schematu (np. dwa takie same ID) odrzuca zapis całego zestawu.
Pusty opis jest dozwoloną daną, lecz powoduje niespełnienie R2 — to inne pojęcie niż wadliwy JSON.

## Przepływ od przycisku do wyniku

`01-APLIKACJA/OTWORZ-APLIKACJE.html` → zdarzenie submit w `app.js` → `readDraft()` → `validateEnvelope()` → `checkProject()` → `linearSearch()` i `insertionSort()` → zatwierdzenie `state` → `renderResult()`.

Kod najpierw oblicza poprawne dane i wynik, dopiero potem je zatwierdza. Zmiana pola ustawia `dirty=true` i pokazuje, że stary wynik nie jest aktualny.
Dane są tylko w pamięci. Przed odświeżeniem trzeba pobrać JSON. Nie ma bazy ani logowania do GitHuba.

## JSON i pola danych

JSON nie dopuszcza komentarzy, dlatego `04-PRZYKLADOWE-DANE/*.json` oraz `package.json` pozostawiono bez zmian.

- `formatVersion`: wersja zestawu, obecnie 1.
- `projects`: tablica projektów.
- `id`: unikalne, niezmienne ID projektu.
- `name`, `description`: nazwa i opis.
- `files`: względne ścieżki deklarowane przez użytkownika.
- `readme.goal`, `readme.run`, `readme.tests`: cel, uruchomienie i testy.
- `demoReady`: informacja o gotowej demonstracji, poza sześcioma regułami.
- `package.json`: opis projektu i polecenia `test`, `benchmark`, `start`; aplikacja nie ma zależności npm.

## Jak czytać składnię

- `const`: nazwa, której przypisania nie zastępuję; zawartość wskazywanego obiektu nadal może się zmienić.
- `let`: zmienna, której wartość może się zmieniać.
- `if` / `else`: decyzja zależnie od warunku.
- `for`, `for...of`, `while`: pętle; powtarzają fragment kodu.
- `return`: kończy funkcję i oddaje wynik.
- `throw`: zgłasza błąd; `try` / `catch` pozwalają go obsłużyć.
- `===`: ścisłe porównanie; `=`: przypisanie wartości.
- `&&`: oba warunki; `||`: pierwszy prawdziwy warunek albo wartość zapasowa.
- `? :`: wybór jednej z dwóch wartości.
- `.map()`: tworzy nową tablicę z przekształconych elementów.
- `.filter()`: wybiera tylko elementy pasujące do warunku.
- `...`: rozwija elementy tablicy lub pola obiektu; nie robi głębokiej kopii.
- `=>`: skrócony zapis funkcji.
- `$()` w tym projekcie: skrót `document.getElementById()`, nie jQuery.
- `addEventListener()`: rejestruje reakcję, nie wykonuje jej natychmiast.
- `textContent`: wyświetla tekst bez wykonywania zawartego w nim HTML.

## Dlaczego nie ma // w środku tekstu README i scenariusza testu

Komentarz dodano do każdej zwykłej niepustej linii kodu i do znaczników HTML oraz reguł CSS.
Linie wewnątrz wielowierszowych literałów są danymi, a nie osobnymi instrukcjami. Dodanie tam // zmieniłoby treść README albo kod scenariusza testu.
Dlatego taki fragment ma komentarz przed nim, a poniżej znajduje się opis jego linii. Puste wiersze pozostają odstępami.
Dokumenty w `08-DOKUMENTACJA/` nie są kodem aplikacji — zachowano je bez zmian, a ich stare raporty nie są nową weryfikacją.

### Wielowierszowy szablon README w makeReadme

- `# ${...}`: tytuł projektu; przy braku nazwy jawny tekst zastępczy.
- następny akapit: opis lub pole do uzupełnienia.
- `## Cel`: zawartość `readme.goal`.
- `## Uruchomienie`: zawartość `readme.run`.
- `## Testy`: zawartość `readme.tests`.
- `## Demonstracja`: tekst zależny od `demoReady`.
- puste linie: odstępy w Markdown.

### Wielowierszowy scenariusz testowy a.run(...)

- przypisanie `state`: tworzy 270 projektów.
- `p.id`: nadaje każdemu inne ID.
- `p.description`: powtarza polską literę ł 10 000 razy.
- `p.readme`: wypełnia trzy sekcje długim tekstem.
- `return p`: oddaje przygotowany rekord do tablicy.
- `activeId=...; showProject()`: wybiera pierwszy projekt i pokazuje go w testowym formularzu.
- cel: dowieść, że eksport większy niż 20 MiB nie pobiera pliku i nie zatwierdza szkicu formularza.

## Krótki plan nauki

1. Pokaż, które pliki odpowiadają za wygląd i które za logikę.
2. Opowiedz o sześciu regułach i wyniku 3/6.
3. Przejdź ręcznie przez wyszukiwanie dwóch plików.
4. Przejdź ręcznie przez sortowanie R2, R5, R6.
5. Pokaż przepływ przycisku Sprawdź i odrzucenie błędnych danych.
6. Uruchom testy i wskaż jeden test algorytmu.

Nie ucz się każdego komentarza na pamięć. Potrafisz wyjaśnić program dopiero wtedy, gdy umiesz przewidzieć wynik po zmianie danych.


## Zmiana nazw plików

Ścieżki w tym przewodniku podano od głównego folderu projektu. Funkcje zachowują nazwy, ale pliki mają polskie opisy. Przykładowe dane MojaGra nadal zawierają index.html i README.md — to nazwy plików sprawdzanego projektu, a nie ścieżki uruchamiania tej aplikacji. Nie zmieniamy tego wymaganego przykładu.

Dokumenty w 08-DOKUMENTACJA/materialy-sprzed-zmiany-nazw są archiwalne i mogą podawać stare nazwy plików. Mapa starych i nowych nazw znajduje się w 07-INSTRUKCJE/STARE-I-NOWE-NAZWY.txt.
