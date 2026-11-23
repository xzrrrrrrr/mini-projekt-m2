// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
const { test } = require('node:test'); // Tworzę { test }: wynik wywołania require.
const assert = require('node:assert/strict'); // Tworzę assert: narzędzia sprawdzające oczekiwane wyniki.
const C = require('../02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js'); // Tworzę C: moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację.
const wrap = (p) => C.envelope([p]); // Tworzę wrap: opakowanie elementów w zestaw lub kontener przewijanej tabeli.
const ids = (items) => items.map((x) => x.id); // Tworzę ids: funkcja wyciągająca identyfikatory rekordów.
const full = () => C.scenarios().typical.projects[0]; // Tworzę full: funkcja zwracająca kompletny projekt.
test('Przykład kontrolny: 3/6, 50%, R5 R2 R6, 2 porównania i 2 kroki', () => { // TEST: Przykład kontrolny: 3/6, 50%, R5 R2 R6, 2 porównania i 2 kroki.
  const r = C.checkProject(C.example()); // Tworzę r: bieżący wynik kontroli.
  assert.equal(r.passed, 3); // Sprawdzam dokładną równość wartości: r.passed ↔ 3.
  assert.equal(r.percent, 50); // Sprawdzam dokładną równość wartości: r.percent ↔ 50.
  assert.deepEqual(ids(r.issues), ['R5', 'R2', 'R6']); // Sprawdzam równość zawartości tablic lub obiektów: ids(r.issues) ↔ ['R5', 'R2', 'R6'].
  assert.equal(r.comparisons, 2); // Sprawdzam dokładną równość wartości: r.comparisons ↔ 2.
  assert.equal(r.steps.length, 2); // Sprawdzam dokładną równość wartości: r.steps.length ↔ 2.
  assert.equal(r.rulesChecked, 6); // Sprawdzam dokładną równość wartości: r.rulesChecked ↔ 6.
  assert.deepEqual(r.search, { index: 1, checked: 2 }); // Sprawdzam równość zawartości tablic lub obiektów: r.search ↔ { index: 1, checked: 2 }.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Po poprawieniu uruchomienia: 4/6 i 66,7%', () => { // TEST: Po poprawieniu uruchomienia: 4/6 i 66,7%.
  const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.readme.run = 'Otwórz index.html'; // Zapisuję tekst „Otwórz index.html” do p.readme.run.
  const r = C.checkProject(p); // Tworzę r: bieżący wynik kontroli.
  assert.equal(r.passed, 4); // Sprawdzam dokładną równość wartości: r.passed ↔ 4.
  assert.equal(r.percent.toFixed(1), '66.7'); // Sprawdzam dokładną równość wartości: r.percent.toFixed(1) ↔ '66.7'.
  assert.deepEqual(ids(r.issues), ['R2', 'R6']); // Sprawdzam równość zawartości tablic lub obiektów: ids(r.issues) ↔ ['R2', 'R6'].
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Same białe znaki: pusta nazwa i pozostałe sekcje', () => { // TEST: Same białe znaki: pusta nazwa i pozostałe sekcje.
  const p = full(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.name = ' \t '; // Zapisuję tekst „” do p.name.
  p.description = ' '; // Zapisuję tekst „” do p.description.
  p.readme = { goal: '\t', run: ' ', tests: '\n' }; // Zapisuję obiekt grupujący powiązane pola do p.readme.
  assert.equal(C.checkProject(p).passed, 1); // Sprawdzam dokładną równość wartości: C.checkProject(p).passed ↔ 1.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Brak README nie pomija R4–R6; kolejność błędów i ostrzeżeń', () => { // TEST: Brak README nie pomija R4–R6; kolejność błędów i ostrzeżeń.
  const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.files = ['readme.md', 'docs/README.md']; // Zapisuję tablica 2 elementów do p.files.
  p.readme.goal = ''; // Zapisuję tekst „” do p.readme.goal.
  const r = C.checkProject(p); // Tworzę r: bieżący wynik kontroli.
  assert.deepEqual(ids(r.issues), ['R3', 'R5', 'R2', 'R4', 'R6']); // Sprawdzam równość zawartości tablic lub obiektów: ids(r.issues) ↔ ['R3', 'R5', 'R2', 'R4', 'R6'].
  assert.equal(r.rulesChecked, 6); // Sprawdzam dokładną równość wartości: r.rulesChecked ↔ 6.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Pełny manifest: 100% i brak problemów', () => { // TEST: Pełny manifest: 100% i brak problemów.
  const r = C.checkProject(full()); // Tworzę r: bieżący wynik kontroli.
  assert.equal(r.percent, 100); // Sprawdzam dokładną równość wartości: r.percent ↔ 100.
  assert.deepEqual(r.issues, []); // Sprawdzam równość zawartości tablic lub obiektów: r.issues ↔ [].
  assert.equal(r.comparisons, 0); // Sprawdzam dokładną równość wartości: r.comparisons ↔ 0.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Ponowne sprawdzenie nie dubluje komunikatów', () => { // TEST: Ponowne sprawdzenie nie dubluje komunikatów.
  const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  const a = C.checkProject(p), // Tworzę a: link do pobrania albo obiekt testowej aplikacji. Tworzę b: drugi wynik kontroli albo zestaw pomiarów.
    b = C.checkProject(p); // Ustawiam b: drugi wynik kontroli albo zestaw pomiarów.
  assert.equal(a.issues.length, 3); // Sprawdzam dokładną równość wartości: a.issues.length ↔ 3.
  assert.deepEqual(b, a); // Sprawdzam równość zawartości tablic lub obiektów: b ↔ a.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Pusta lista projektów i puste algorytmy', () => { // TEST: Pusta lista projektów i puste algorytmy.
  assert.deepEqual(C.validateEnvelope(C.envelope([])), { formatVersion: 1, projects: [] }); // Sprawdzam równość zawartości tablic lub obiektów: C.validateEnvelope(C.envelope([])) ↔ { formatVersion: 1, projects: [] }.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: C.linearSearch([], () => true) ↔ { index: -1, checked: 0 }.
    C.linearSearch([], () => true), // Wywołuję C.linearSearch z przygotowanymi argumentami.
    { index: -1, checked: 0 } // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.deepEqual(C.insertionSort([], C.compareIssues), { items: [], comparisons: 0, steps: [] }); // Sprawdzam równość zawartości tablic lub obiektów: C.insertionSort([], C.compareIssues) ↔ { items: [], comparisons: 0, steps: [] }.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Eksport/import odtwarza dane i wynik', () => { // TEST: Eksport/import odtwarza dane i wynik.
  const input = C.scenarios().control; // Tworzę input: dane wejściowe konkretnego sprawdzenia.
  const decoded = C.parseJSON(JSON.stringify(input)); // Tworzę decoded: dane odtworzone z JSON.
  assert.deepEqual(decoded, input); // Sprawdzam równość zawartości tablic lub obiektów: decoded ↔ input.
  assert.deepEqual(C.checkProject(decoded.projects[0]), C.checkProject(input.projects[0])); // Sprawdzam równość zawartości tablic lub obiektów: C.checkProject(decoded.projects[0]) ↔ C.checkProject(input.projects[0]).
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Błędny import nie mutuje istniejącego zestawu', () => { // TEST: Błędny import nie mutuje istniejącego zestawu.
  const state = C.scenarios().control, // Tworzę state: zatwierdzony zestaw projektów w pamięci. Tworzę snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
    snapshot = JSON.stringify(state); // Ustawiam snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
  const invalid = JSON.parse(snapshot); // Tworzę invalid: celowo błędne dane testowe.
  invalid.projects.push({ ...invalid.projects[0], name: 'Zmiana' }); // Dopisuję nowy element na końcu tablicy wynikowej.
  assert.throws(() => C.validateEnvelope(invalid), /Powtórzone ID/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(invalid) ↔ /Powtórzone ID/.
  assert.equal(JSON.stringify(state), snapshot); // Sprawdzam dokładną równość wartości: JSON.stringify(state) ↔ snapshot.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Odrzuca JSON uszkodzony, złą wersję i zły typ', () => { // TEST: Odrzuca JSON uszkodzony, złą wersję i zły typ.
  assert.throws(() => C.parseJSON('{'), /składnia/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.parseJSON('{') ↔ /składnia/.
  assert.throws(() => C.parseJSON('{"formatVersion":2,"projects":[]}'), /wersja/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.parseJSON('{"formatVersion":2,"projects":[]}') ↔ /wersja/.
  assert.throws(() => C.validateEnvelope({ formatVersion: 1, projects: null }), /tablicą/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope({ formatVersion: 1, projects: null }) ↔ /tablicą/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Odrzuca brak ID, duplikat i niepoprawne znaki', () => { // TEST: Odrzuca brak ID, duplikat i niepoprawne znaki.
  for (const id of ['', 'moja_gra', 'A--B']) { // PĘTLA: dla każdego id z ['', 'moja_gra', 'A--B'] wykonuję blok.
    const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
    p.id = id; // Zapisuję id do p.id.
    assert.throws(() => C.validateEnvelope(wrap(p)), /ID/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(wrap(p)) ↔ /ID/.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  assert.throws(() => C.validateEnvelope(C.envelope([C.example(), C.example()])), /Powtórzone/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(C.envelope([C.example(), C.example()])) ↔ /Powtórzone/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('ID pozostaje niezmienne podczas kontroli; obiekt nie jest mutowany', () => { // TEST: ID pozostaje niezmienne podczas kontroli; obiekt nie jest mutowany.
  const p = C.example(), // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia. Tworzę snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
    snapshot = JSON.stringify(p); // Ustawiam snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
  C.checkProject(p); // Wywołuję C.checkProject z przygotowanymi argumentami.
  assert.equal(JSON.stringify(p), snapshot); // Sprawdzam dokładną równość wartości: JSON.stringify(p) ↔ snapshot.
  assert.equal(p.id, 'MOJAGRA-1'); // Sprawdzam dokładną równość wartości: p.id ↔ 'MOJAGRA-1'.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Odrzuca złe typy tekstu i flagi demonstracji', () => { // TEST: Odrzuca złe typy tekstu i flagi demonstracji.
  const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.description = 12; // Zapisuję 12 do p.description.
  assert.throws(() => C.validateEnvelope(wrap(p)), /Opis/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(wrap(p)) ↔ /Opis/.
  p.description = ''; // Zapisuję tekst „” do p.description.
  p.demoReady = 'false'; // Zapisuję tekst „false” do p.demoReady.
  assert.throws(() => C.validateEnvelope(wrap(p)), /demoReady/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(wrap(p)) ↔ /demoReady/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Ścieżki względne; dopuszcza plik w podkatalogu, ale nie jako R3', () => { // TEST: Ścieżki względne; dopuszcza plik w podkatalogu, ale nie jako R3.
  const p = C.example(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.files = ['src/index.js', 'docs/README.md']; // Zapisuję tablica 2 elementów do p.files.
  assert.equal(C.checkProject(p).checks[2].passed, false); // Sprawdzam dokładną równość wartości: C.checkProject(p).checks[2].passed ↔ false.
  for (const path of ['/README.md', '../README.md', 'src/../README.md', 'C:\\test', 'a//b']) { // PĘTLA: dla każdego path z ['/README.md', '../README.md', 'src/../README.md', 'C:\\test', 'a//b'] wykonuję blok.
    p.files = [path]; // Zapisuję tablica 1 elementów do p.files.
    assert.throws(() => C.validateEnvelope(wrap(p)), /ścieżki/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(wrap(p)) ↔ /ścieżki/.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Limit: 1000 projektów dozwolone, 1001 odrzucone', () => { // TEST: Limit: 1000 projektów dozwolone, 1001 odrzucone.
  const x = C.scenarios().large; // Tworzę x: bieżący element lub pomocnicza wartość.
  assert.equal(C.validateEnvelope(x).projects.length, 1000); // Sprawdzam dokładną równość wartości: C.validateEnvelope(x).projects.length ↔ 1000.
  x.projects.push({ ...C.example(), id: 'NADMIAR-1' }); // Dopisuję nowy element na końcu tablicy wynikowej.
  assert.throws(() => C.validateEnvelope(x), /1000/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(x) ↔ /1000/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Limit plików: 1000 dozwolone, 1001 odrzucone', () => { // TEST: Limit plików: 1000 dozwolone, 1001 odrzucone.
  const p = full(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.files = Array.from({ length: 1000 }, (_, i) => `${i}.txt`); // Zapisuję wynik wywołania Array.from do p.files.
  assert.equal(C.validateEnvelope(wrap(p)).projects[0].files.length, 1000); // Sprawdzam dokładną równość wartości: C.validateEnvelope(wrap(p)).projects[0].files.length ↔ 1000.
  p.files.push('extra'); // Dopisuję nowy element na końcu tablicy wynikowej.
  assert.throws(() => C.validateEnvelope(wrap(p)), /1000/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.validateEnvelope(wrap(p)) ↔ /1000/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Wyszukiwanie: początek, koniec, brak i pierwsze dopasowanie', () => { // TEST: Wyszukiwanie: początek, koniec, brak i pierwsze dopasowanie.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: C.linearSearch(['A', 'B', 'C'], (x) => x === 'A') ↔ { index: 0, checked: 1 }.
    C.linearSearch(['A', 'B', 'C'], (x) => x === 'A'), // Wywołuję C.linearSearch z przygotowanymi argumentami.
    { index: 0, checked: 1 } // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: C.linearSearch(['A', 'B', 'C'], (x) => x === 'C') ↔ { index: 2, checked: 3 }.
    C.linearSearch(['A', 'B', 'C'], (x) => x === 'C'), // Wywołuję C.linearSearch z przygotowanymi argumentami.
    { index: 2, checked: 3 } // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: C.linearSearch(['A', 'B', 'C'], (x) => x === 'D') ↔ { index: -1, checked: 3 }.
    C.linearSearch(['A', 'B', 'C'], (x) => x === 'D'), // Wywołuję C.linearSearch z przygotowanymi argumentami.
    { index: -1, checked: 3 } // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: C.linearSearch(['A', 'A'], (x) => x === 'A') ↔ { index: 0, checked: 1 }.
    C.linearSearch(['A', 'A'], (x) => x === 'A'), // Wywołuję C.linearSearch z przygotowanymi argumentami.
    { index: 0, checked: 1 } // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Sortowanie: uporządkowane, odwrócone i remisy względem wzorca', () => { // TEST: Sortowanie: uporządkowane, odwrócone i remisy względem wzorca.
  const records = [ // Tworzę records: badana lista rekordów.
    { id: 'A', level: 'error', number: 1 }, // Pole level: ważność: error to błąd, warning to ostrzeżenie.
    { id: 'B', level: 'warning', number: 2 }, // Pole level: ważność: error to błąd, warning to ostrzeżenie.
    { id: 'C', level: 'warning', number: 2 }, // Pole level: ważność: error to błąd, warning to ostrzeżenie.
    { id: 'D', level: 'warning', number: 3 } // Pole level: ważność: error to błąd, warning to ostrzeżenie.
  ]; // Zamykam tablicę z powyższymi elementami.
  for (const input of [records, records.slice().reverse(), [records[2], records[0], records[1], records[3]]]) { // PĘTLA: dla każdego input z [records, records.slice().reverse(), [records[2], records[0], records[1], records[3]]] wykonuję blok.
    const snapshot = JSON.stringify(input); // Tworzę snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
    assert.deepEqual(C.insertionSort(input, C.compareIssues).items, input.slice().sort(C.compareIssues)); // Sprawdzam równość zawartości tablic lub obiektów: C.insertionSort(input, C.compareIssues).items ↔ input.slice().sort(C.compareIssues).
    assert.equal(JSON.stringify(input), snapshot); // Sprawdzam dokładną równość wartości: JSON.stringify(input) ↔ snapshot.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  assert.deepEqual(ids(C.insertionSort(records, C.compareIssues).items), ['A', 'B', 'C', 'D']); // Sprawdzam równość zawartości tablic lub obiektów: ids(C.insertionSort(records, C.compareIssues).items) ↔ ['A', 'B', 'C', 'D'].
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Pomiary 10/100/1000: znane liczniki i zgodność wzorca', () => { // TEST: Pomiary 10/100/1000: znane liczniki i zgodność wzorca.
  const b = C.benchmark(); // Tworzę b: drugi wynik kontroli albo zestaw pomiarów.
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: b.sorting.map((x) => x.comparisons) ↔ [9, 45, 99, 4950, 999, 499500].
    b.sorting.map((x) => x.comparisons), // Wywołuję b.sorting.map z przygotowanymi argumentami.
    [9, 45, 99, 4950, 999, 499500] // Ciąg dalszy: Sprawdzam równość zawartości tablic lub obiektów: b.sorting.map((x) => x.comparisons) ↔ [9, 45, 99, 4950, 999, 499500].
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.ok(b.sorting.every((x) => x.consistent)); // Sprawdzam, czy warunek jest prawdziwy: b.sorting.every((x) => x.consistent).
  assert.deepEqual( // Sprawdzam równość zawartości tablic lub obiektów: b.searching.map((x) => x.checked) ↔ [1, 1000, 1000].
    b.searching.map((x) => x.checked), // Wywołuję b.searching.map z przygotowanymi argumentami.
    [1, 1000, 1000] // Ciąg dalszy: Sprawdzam równość zawartości tablic lub obiektów: b.searching.map((x) => x.checked) ↔ [1, 1000, 1000].
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Generator README zawiera wszystkie sekcje, braki są jawne', () => { // TEST: Generator README zawiera wszystkie sekcje, braki są jawne.
  const md = C.makeReadme(C.example()); // Tworzę md: tekst README w formacie Markdown.
  assert.ok(md.startsWith('# MojaGra')); // Sprawdzam, czy warunek jest prawdziwy: md.startsWith('# MojaGra').
  for (const s of ['## Cel', '## Uruchomienie', '## Testy', '[Uzupełnij instrukcję uruchomienia]']) // PĘTLA: dla każdego s z ['## Cel', '## Uruchomienie', '## Testy', '[Uzupełnij instrukcję uruchomienia]'] wykonuję blok.
    assert.ok(md.includes(s)); // Sprawdzam, czy warunek jest prawdziwy: md.includes(s).
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Raport rozdziela zakres kontroli, manifest i wynik', () => { // TEST: Raport rozdziela zakres kontroli, manifest i wynik.
  const p = C.example(), // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia. Tworzę r: bieżący wynik kontroli.
    r = C.makeReport(p, C.checkProject(p)); // Ustawiam r: bieżący wynik kontroli.
  assert.equal(r.reportVersion, 1); // Sprawdzam dokładną równość wartości: r.reportVersion ↔ 1.
  assert.equal(r.result.passed, 3); // Sprawdzam dokładną równość wartości: r.result.passed ↔ 3.
  assert.match(r.scope, /nie zdalnego/); // Sprawdzam zgodność komunikatu z wyrażeniem regularnym: r.scope ↔ /nie zdalnego/.
  assert.deepEqual(r.manifest, p); // Sprawdzam równość zawartości tablic lub obiektów: r.manifest ↔ p.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Tekst HTML pozostaje danymi, nie jest usuwany ani wykonywany przez rdzeń', () => { // TEST: Tekst HTML pozostaje danymi, nie jest usuwany ani wykonywany przez rdzeń.
  const p = full(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  p.name = '<img src=x onerror=alert(1)>'; // Zapisuję tekst „<img src=x onerror=alert(1)>” do p.name.
  assert.equal(C.checkProject(p).checks[0].passed, true); // Sprawdzam dokładną równość wartości: C.checkProject(p).checks[0].passed ↔ true.
  assert.equal(C.validateEnvelope(wrap(p)).projects[0].name, p.name); // Sprawdzam dokładną równość wartości: C.validateEnvelope(wrap(p)).projects[0].name ↔ p.name.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Nazwy z LF, CR i CRLF są odrzucane bez zmiany danych', () => { // TEST: Nazwy z LF, CR i CRLF są odrzucane bez zmiany danych.
  const state = C.scenarios().control, // Tworzę state: zatwierdzony zestaw projektów w pamięci. Tworzę snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
    snapshot = JSON.stringify(state); // Ustawiam snapshot: zapis danych przed operacją do wykrywania niechcianych zmian.
  for (const name of ['Moja\nGra', 'Moja\rGra', 'Moja\r\nGra', 'MojaGra\n']) { // PĘTLA: dla każdego name z ['Moja\nGra', 'Moja\rGra', 'Moja\r\nGra', 'MojaGra\n'] wykonuję blok.
    const candidate = structuredClone(state); // Tworzę candidate: kandydat na nowy zestaw; wymaga sprawdzenia przed zapisem.
    candidate.projects[0].name = name; // Zapisuję name (nazwa pliku, projektu lub scenariusza) do candidate.projects[0].name.
    assert.throws(() => C.parseJSON(JSON.stringify(candidate)), /Nazwa projektu musi mieścić się w jednej linii/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.parseJSON(JSON.stringify(candidate)) ↔ /Nazwa projektu musi mieścić się w jednej linii/.
    assert.equal(JSON.stringify(state), snapshot); // Sprawdzam dokładną równość wartości: JSON.stringify(state) ↔ snapshot.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Limit importu w bajtach: dokładnie 20 MiB dozwolone, bajt więcej odrzucony', () => { // TEST: Limit importu w bajtach: dokładnie 20 MiB dozwolone, bajt więcej odrzucony.
  const json = C.serializeJSON(C.scenarios().control); // Tworzę json: tekst w formacie JSON.
  const boundary = json + ' '.repeat(C.JSON_BYTE_LIMIT - Buffer.byteLength(json)); // Tworzę boundary: projekt z brakującymi lub granicznymi danymi.
  assert.deepEqual(C.parseJSON(boundary), C.scenarios().control); // Sprawdzam równość zawartości tablic lub obiektów: C.parseJSON(boundary) ↔ C.scenarios().control.
  assert.throws(() => C.parseJSON(boundary + ' '), /20 MiB/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.parseJSON(boundary + ' ') ↔ /20 MiB/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Eksport sprawdza bajty UTF-8, a nie liczbę znaków; nie mutuje danych', () => { // TEST: Eksport sprawdza bajty UTF-8, a nie liczbę znaków; nie mutuje danych.
  const state = C.envelope( // Tworzę state: zatwierdzony zestaw projektów w pamięci.
    Array.from({ length: 270 }, (_, i) => { // Pole length: 270.
      const p = full(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
      p.id = `UTF8-${i}`; // Zapisuję tekst składany z wartości w ${...} do p.id.
      p.description = 'ł'.repeat(10000); // Zapisuję wynik wywołania 'ł'.repeat do p.description.
      p.readme = { goal: p.description, run: p.description, tests: p.description }; // Zapisuję obiekt grupujący powiązane pola do p.readme.
      return p; // Zwracam p (bieżący projekt lub tekst akapitu — zależnie od wyrażenia).
    }) // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  const json = JSON.stringify(state, null, 2); // Tworzę json: tekst w formacie JSON.
  assert.ok(json.length < C.JSON_BYTE_LIMIT); // Sprawdzam, czy warunek jest prawdziwy: json.length < C.JSON_BYTE_LIMIT.
  assert.ok(Buffer.byteLength(json) > C.JSON_BYTE_LIMIT); // Sprawdzam, czy warunek jest prawdziwy: Buffer.byteLength(json) > C.JSON_BYTE_LIMIT.
  assert.throws(() => C.serializeJSON(state), /20 MiB/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.serializeJSON(state) ↔ /20 MiB/.
  assert.throws(() => C.parseJSON(json), /20 MiB/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.parseJSON(json) ↔ /20 MiB/.
  assert.equal(state.projects.length, 270); // Sprawdzam dokładną równość wartości: state.projects.length ↔ 270.
  assert.equal(state.projects[0].description, 'ł'.repeat(10000)); // Sprawdzam dokładną równość wartości: state.projects[0].description ↔ 'ł'.repeat(10000).
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Eksport uwzględnia znaki ucieczki w gotowym JSON-ie', () => { // TEST: Eksport uwzględnia znaki ucieczki w gotowym JSON-ie.
  const state = C.envelope( // Tworzę state: zatwierdzony zestaw projektów w pamięci.
    Array.from({ length: 100 }, (_, i) => { // Pole length: 100.
      const p = full(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
      p.id = `ESCAPE-${i}`; // Zapisuję tekst składany z wartości w ${...} do p.id.
      p.description = '\u0000'.repeat(10000); // Zapisuję wynik wywołania '\u0000'.repeat do p.description.
      p.readme = { goal: p.description, run: p.description, tests: p.description }; // Zapisuję obiekt grupujący powiązane pola do p.readme.
      return p; // Zwracam p (bieżący projekt lub tekst akapitu — zależnie od wyrażenia).
    }) // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  assert.throws(() => C.serializeJSON(state), /20 MiB/); // Sprawdzam, czy błędne dane wywołują oczekiwany wyjątek: () => C.serializeJSON(state) ↔ /20 MiB/.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Pobrany JSON odtwarza pusty, kontrolny i większy zestaw z Unicode', () => { // TEST: Pobrany JSON odtwarza pusty, kontrolny i większy zestaw z Unicode.
  for (const state of [C.envelope([]), C.scenarios().control, C.scenarios().large]) { // PĘTLA: dla każdego state z [C.envelope([]), C.scenarios().control, C.scenarios().large] wykonuję blok.
    if (state.projects.length) state.projects[0].name = 'Zażółć 🐈'; // JEŻELI state.projects.length — wykonuję następną instrukcję lub blok.
    const json = C.serializeJSON(state); // Tworzę json: tekst w formacie JSON.
    assert.ok(Buffer.byteLength(json) <= C.JSON_BYTE_LIMIT); // Sprawdzam, czy warunek jest prawdziwy: Buffer.byteLength(json) <= C.JSON_BYTE_LIMIT.
    assert.deepEqual(C.parseJSON(json), state); // Sprawdzam równość zawartości tablic lub obiektów: C.parseJSON(json) ↔ state.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
