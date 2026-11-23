// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
/* Ta sama logika działa w przeglądarce (bez serwera) i w testach Node.js. */
(function (root) { // Uruchamiam funkcję osłaniającą moduł; udostępni ona API w przeglądarce lub Node.js.
  'use strict'; // Włączam tryb ścisły JavaScriptu, który wykrywa część pomyłek.

// ═══ DANE I LIMITY — maksymalne rozmiary i reguły R1–R6 ═══
  const LIMIT = 1000; // Tworzę LIMIT: limit 1000 projektów lub 1000 plików.
  const JSON_BYTE_LIMIT = 20 * 1024 * 1024; // Tworzę JSON_BYTE_LIMIT: limit 20 × 1024 × 1024 bajtów.
  const RULES = [ // Tworzę RULES: sześć reguł R1–R6 z ważnością i instrukcją poprawy.
    { id: 'R1', number: 1, level: 'error', label: 'Nazwa projektu', fix: 'Podaj nazwę projektu.' }, // Definicja jednej reguły: identyfikator, numer, ważność, etykieta i wskazówka naprawy.
    { id: 'R2', number: 2, level: 'warning', label: 'Opis projektu', fix: 'Dodaj opis projektu.' }, // Definicja jednej reguły: identyfikator, numer, ważność, etykieta i wskazówka naprawy.
    { // Ciąg dalszy: Tworzę RULES: sześć reguł R1–R6 z ważnością i instrukcją poprawy.
      id: 'R3', // Pole id: stały identyfikator rekordu.
      number: 3, // Pole number: numer reguły rozstrzygający remis ważności.
      level: 'error', // Pole level: ważność: error to błąd, warning to ostrzeżenie.
      label: 'Obecność README.md', // Pole label: czytelna nazwa reguły.
      fix: 'Dodaj dokładnie README.md do listy plików.' // Pole fix: podpowiedź, jak usunąć brak.
    }, // Zamykam obiekt grupujący powyższe pola.
    { id: 'R4', number: 4, level: 'warning', label: 'Cel w README', fix: 'Uzupełnij sekcję celu w README.' }, // Definicja jednej reguły: identyfikator, numer, ważność, etykieta i wskazówka naprawy.
    { // Ciąg dalszy: Tworzę RULES: sześć reguł R1–R6 z ważnością i instrukcją poprawy.
      id: 'R5', // Pole id: stały identyfikator rekordu.
      number: 5, // Pole number: numer reguły rozstrzygający remis ważności.
      level: 'error', // Pole level: ważność: error to błąd, warning to ostrzeżenie.
      label: 'Uruchomienie w README', // Pole label: czytelna nazwa reguły.
      fix: 'Dodaj instrukcję uruchomienia w README.' // Pole fix: podpowiedź, jak usunąć brak.
    }, // Zamykam obiekt grupujący powyższe pola.
    { id: 'R6', number: 6, level: 'warning', label: 'Testy w README', fix: 'Dodaj sekcję testów w README.' } // Definicja jednej reguły: identyfikator, numer, ważność, etykieta i wskazówka naprawy.
  ]; // Zamykam tablicę z powyższymi elementami.

// ═══ DANE — przykład kontrolny i format zestawu ═══
  const example = () => ({ // Tworzę example: funkcja tworząca świeży projekt MojaGra.
    id: 'MOJAGRA-1', // Pole id: stały identyfikator rekordu.
    name: 'MojaGra', // Pole name: nazwa projektu.
    description: '', // Pole description: krótki opis projektu.
    files: ['index.html', 'README.md'], // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
    readme: { goal: 'Gra edukacyjna', run: '', tests: '' }, // Pole readme: sekcje dokumentacji projektu.
    demoReady: false // Pole demoReady: flaga gotowej demonstracji; nie jest siódmą regułą.
  }); // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  const envelope = (projects) => ({ formatVersion: 1, projects }); // Tworzę envelope: funkcja opakowująca projekty we wspólny format JSON.
  const nonempty = (value) => value.trim().length > 0; // Tworzę nonempty: funkcja sprawdzająca tekst po usunięciu skrajnych spacji.

  // Własne wyszukiwanie: kończy się na PIERWSZYM dopasowaniu.

// ═══ ALGORYTM: WYSZUKIWANIE LINIOWE ═══
// Sprawdzam rekordy po kolei. Kończę na pierwszym dopasowaniu. checked liczy naprawdę odwiedzone rekordy; brak wyniku to index = -1. Złożoność: O(f), pamięć pomocnicza O(1).
  function linearSearch(records, predicate) { // FUNKCJA linearSearch: Sprawdzam rekordy po kolei. Kończę na pierwszym dopasowaniu. checked liczy naprawdę odwiedzone rekordy; brak wyniku to index = -1. Złożoność: O(f), pamięć pomocnicza O(1).
    let checked = 0; // Tworzę checked: licznik naprawdę odwiedzonych rekordów.
    for (let i = 0; i < records.length; i++) { // PĘTLA: odwiedzam rekordy od początku do końca.
      checked++; // Zwiększam checked o 1.
      if (predicate(records[i], i)) return { index: i, checked }; // Przy pierwszym dopasowaniu od razu zwracam indeks i licznik. Dalszych rekordów już nie odwiedzam.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    return { index: -1, checked }; // Po sprawdzeniu całej listy zwracam -1: nie znaleziono dopasowania; checked pokazuje wykonaną pracę.
  } // Koniec funkcji linearSearch.
  // Niższy klucz: błąd przed ostrzeżeniem, potem numer reguły.

// ═══ PORÓWNYWANIE: KLUCZ SORTOWANIA ═══
// Niższa wartość ma pierwszeństwo: error = 0, warning = 1. Przy remisie porównuję numery reguł. Wynik ujemny oznacza, że a ma być przed b.
  function compareIssues(a, b) { // FUNKCJA compareIssues: Niższa wartość ma pierwszeństwo: error = 0, warning = 1. Przy remisie porównuję numery reguł. Wynik ujemny oznacza, że a ma być przed b.
    const priority = (level) => (level === 'error' ? 0 : 1); // Tworzę priority: funkcja zamieniająca ważność na liczbę: błąd 0, ostrzeżenie 1.
    return priority(a.level) - priority(b.level) || a.number - b.number; // Najpierw odejmuję priorytety. Gdy różnica to 0, operator || wybiera różnicę numerów reguł.
  } // Koniec funkcji compareIssues.
  // Własne stabilne sortowanie; nie zmienia tablicy wejściowej.
  // Zliczamy WYŁĄCZNIE rzeczywiste wywołania komparatora, nie warunki pętli.

// ═══ ALGORYTM: SORTOWANIE PRZEZ WSTAWIANIE ═══
// Lewa część tablicy jest już uporządkowana. Biorę key, przesuwam większe klucze w prawo i wstawiam key w lukę. Równych nie przesuwam: sortowanie jest stabilne. Najlepiej O(k), najgorzej O(k²).
  function insertionSort(records, compare, trace = false) { // FUNKCJA insertionSort: Lewa część tablicy jest już uporządkowana. Biorę key, przesuwam większe klucze w prawo i wstawiam key w lukę. Równych nie przesuwam: sortowanie jest stabilne. Najlepiej O(k), najgorzej O(k²).
    const items = records.slice(), // Tworzę items: kopia tablicy wejściowej; oryginał nie jest sortowany w miejscu. Tworzę steps: lista kroków sortowania do wyświetlenia.
      steps = []; // Ustawiam steps: lista kroków sortowania do wyświetlenia.
    let comparisons = 0; // Tworzę comparisons: licznik rzeczywistych wywołań funkcji porównującej.
    for (let i = 1; i < items.length; i++) { // PĘTLA: biorę kolejne elementy od indeksu 1; część po lewej jest uporządkowana.
      const key = items[i]; // Tworzę key: element, który teraz wstawiam w uporządkowaną część.
      const before = trace ? items.map((x) => x.id).join(', ') : ''; // Tworzę before: zapis kolejności identyfikatorów przed wstawieniem.
      let j = i - 1, // Tworzę j: indeks porównywanego elementu po lewej stronie. Tworzę moved: informacja, czy w tym kroku przesunięto elementy.
        moved = false; // Ustawiam moved: informacja, czy w tym kroku przesunięto elementy.
      while (j >= 0) { // DOPÓKI mam element po lewej (j >= 0), porównuję go z key.
        comparisons++; // Zwiększam comparisons o 1 — liczę tylko rzeczywiste porównanie kluczy.
        if (compare(items[j], key) <= 0) break; // Jeśli lewy element ma mniejszy lub równy klucz, kończę przesuwanie. Nie przesuwam równych: zachowuję stabilność.
        items[j + 1] = items[j]; // Przesuwam większy element o jedno miejsce w prawo; key nadal jest bezpiecznie w osobnej zmiennej.
        j--; // Przechodzę o jedną pozycję w lewo, szukając miejsca dla key.
        moved = true; // Zapamiętuję, że w tym kroku nastąpiło co najmniej jedno przesunięcie.
      } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
      items[j + 1] = key; // Wstawiam zapamiętany key w powstałą lukę.
      if (trace) // JEŻELI trace — wykonuję następną instrukcję lub blok.
        steps.push({ // Dopisuję nowy element na końcu tablicy wynikowej.
          before, // Pole before: kolejność przed krokiem.
          decision: moved // Pole decision: opis decyzji o przesunięciu.
            ? `${key.id}: przesuń przed większe klucze` // Ciąg dalszy: Pole decision: opis decyzji o przesunięciu.
            : `${key.id}: pozostaw za mniejszym lub równym kluczem`, // Ciąg dalszy: Pole decision: opis decyzji o przesunięciu.
          after: items.map((x) => x.id).join(', ') // Pole after: kolejność po kroku.
        }); // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    return { items, comparisons, steps }; // Zwracam posortowaną kopię, liczbę porównań i opcjonalną historię kroków.
  } // Koniec funkcji insertionSort.
  // Błędy SCHEMATU odrzucają operację. Puste pola tekstowe są poprawnym
  // manifestem: dopiero reguły R1–R6 klasyfikują braki merytoryczne.

// ═══ WALIDACJA: STRUKTURA I GRANICE DANYCH ═══
// Sprawdzam cały zestaw, zanim aplikacja zastąpi bieżące dane. Nieprawidłowy schemat powoduje wyjątek. Pusty tekst jest dozwolony w schemacie, ale może nie spełnić reguł R1–R6.
  function validateEnvelope(value) { // FUNKCJA validateEnvelope: Sprawdzam cały zestaw, zanim aplikacja zastąpi bieżące dane. Nieprawidłowy schemat powoduje wyjątek. Pusty tekst jest dozwolony w schemacie, ale może nie spełnić reguł R1–R6.
    const fail = (message) => { // Tworzę fail: pomocnicza funkcja rzucająca błąd walidacji.
      throw new Error(message); // Przerywam tę operację wyjątkiem: new Error(message).
    }; // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    const object = (x) => x !== null && typeof x === 'object' && !Array.isArray(x); // Tworzę object: sprawdzenie, czy wartość jest zwykłym obiektem, a nie null lub tablicą.
    const text = (x, label) => { // Tworzę text: tekst albo pomocnicza walidacja tekstu; patrz przypisanie.
      if (typeof x !== 'string' || x.length > 10000) fail(`${label}: wymagany tekst do 10000 znaków.`); // JEŻELI typeof x !== 'string' || x.length > 10000 — wykonuję następną instrukcję lub blok.
    }; // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    if (!object(value) || value.formatVersion !== 1) // JEŻELI !object(value) || value.formatVersion !== 1 — wykonuję następną instrukcję lub blok.
      fail('Nieobsługiwana wersja formatu. Oczekiwano formatVersion: 1.'); // Przerywam walidację: 'Nieobsługiwana wersja formatu. Oczekiwano formatVersion: 1.'.
    if (!Array.isArray(value.projects) || value.projects.length > LIMIT) // JEŻELI !Array.isArray(value.projects) || value.projects.length > LIMIT — wykonuję następną instrukcję lub blok.
      fail('projects musi być tablicą do 1000 projektów.'); // Przerywam walidację: 'projects musi być tablicą do 1000 projektów.'.
    const seen = new Set(); // Tworzę seen: zbiór już spotkanych ID do wykrywania duplikatów.
    const projects = value.projects.map((p, i) => { // Tworzę projects: lista zweryfikowanych projektów.
      if (!object(p)) fail(`Projekt ${i + 1}: nieprawidłowy rekord.`); // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
      if (typeof p.id !== 'string' || !/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(p.id) || p.id.length > 80) // JEŻELI typeof p.id !== 'string' || !/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(p.id) || p.id.length > 80 — wykonuję następną instrukcję lub blok.
        fail('ID musi być niepuste: A–Z, cyfry i łącznik (do 80 znaków).'); // Przerywam walidację: 'ID musi być niepuste: A–Z, cyfry i łącznik (do 80 znaków).'.
      if (seen.has(p.id)) fail(`Powtórzone ID: ${p.id}.`); // JEŻELI wynik wywołania seen.has — wykonuję następną instrukcję lub blok.
      seen.add(p.id); // Zapamiętuję wartość w zbiorze, np. ID wykorzystywane do wykrywania duplikatów.
      text(p.name, 'Nazwa'); // Wywołuję text z przygotowanymi argumentami.
      text(p.description, 'Opis'); // Wywołuję text z przygotowanymi argumentami.
      if (/[\r\n]/.test(p.name)) fail('Nazwa projektu musi mieścić się w jednej linii'); // JEŻELI wynik wywołania /[\r\n]/.test — wykonuję następną instrukcję lub blok.
      if (!Array.isArray(p.files) || p.files.length > LIMIT) fail('Lista plików: maksymalnie 1000 ścieżek.'); // JEŻELI !Array.isArray(p.files) || p.files.length > LIMIT — wykonuję następną instrukcję lub blok.
      const files = p.files.map((path) => { // Tworzę files: lista zweryfikowanych ścieżek plików.
        text(path, 'Ścieżka'); // Wywołuję text z przygotowanymi argumentami.
        if ( // JEŻELI !path.trim() || path.length > 512 || path.startsWith('/') || path.includes('\\') || path.inclu… — wykonuję następną instrukcję lub blok.
          !path.trim() || // Wywołuję path.trim.
          path.length > 512 || // Ciąg dalszy: JEŻELI !path.trim() || path.length > 512 || path.startsWith('/') || path.includes('\\') || path.inclu… — wykonuję następną instrukcję lub blok.
          path.startsWith('/') || // Wywołuję path.startsWith z przygotowanymi argumentami.
          path.includes('\\') || // Wywołuję path.includes z przygotowanymi argumentami.
          path.includes(':') || // Wywołuję path.includes z przygotowanymi argumentami.
          path.split('/').some((part) => part === '..' || part === '.' || !part) || // Wywołuję path.split('/').some z przygotowanymi argumentami.
          /[\x00-\x1f]/.test(path) // Wywołuję /[\x00-\x1f]/.test z przygotowanymi argumentami.
        ) // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
          fail('Wpisz względne ścieżki plików, bez .., pustych segmentów i znaków sterujących.'); // Przerywam walidację: 'Wpisz względne ścieżki plików, bez .., pustych segmentów i znaków sterujących.'.
        return path; // Zwracam path (wbudowany moduł budowania ścieżek).
      }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
      if (!object(p.readme)) fail('Brak obiektu readme.'); // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
      for (const key of ['goal', 'run', 'tests']) text(p.readme[key], `README ${key}`); // PĘTLA: dla każdego key z ['goal', 'run', 'tests'] wykonuję blok.
      if (typeof p.demoReady !== 'boolean') fail('demoReady musi być wartością true lub false.'); // JEŻELI typeof p.demoReady jest różne od 'boolean' — wykonuję następną instrukcję lub blok.
      return { // Zwracam obiekt grupujący powiązane pola.
        id: p.id, // Pole id: stały identyfikator rekordu.
        name: p.name, // Pole name: nazwa projektu.
        description: p.description, // Pole description: krótki opis projektu.
        files, // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
        readme: { goal: p.readme.goal, run: p.readme.run, tests: p.readme.tests }, // Pole readme: sekcje dokumentacji projektu.
        demoReady: p.demoReady // Pole demoReady: flaga gotowej demonstracji; nie jest siódmą regułą.
      }; // Zamykam obiekt grupujący powyższe pola.
    }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
    return envelope(projects); // Nowy obiekt: zatwierdzenie następuje poza walidatorem. // Zwracam wynik wywołania envelope.
  } // Koniec funkcji validateEnvelope.

// ═══ IMPORT: TEKST JSON NA DANE ═══
// Najpierw sprawdzam rozmiar, następnie składnię JSON i poprawność struktury. Błąd przerywa import, a nie zapisuje części danych.
  function parseJSON(text) { // FUNKCJA parseJSON: Najpierw sprawdzam rozmiar, następnie składnię JSON i poprawność struktury. Błąd przerywa import, a nie zapisuje części danych.
    if (typeof text !== 'string') throw new Error('Wymagany tekst JSON.'); // JEŻELI typeof text jest różne od 'string' — wykonuję następną instrukcję lub blok.
    checkJSONSize(text); // Wywołuję checkJSONSize z przygotowanymi argumentami.
    let value; // Tworzę value: odczytana lub sprawdzana wartość.
    try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
      value = JSON.parse(text); // Zapisuję dane odczytane z tekstu JSON do value.
    } catch { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
      throw new Error('Nieprawidłowa składnia JSON.'); // Przerywam tę operację wyjątkiem: new Error('Nieprawidłowa składnia JSON.').
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    return validateEnvelope(value); // Zwracam wynik wywołania validateEnvelope.
  } // Koniec funkcji parseJSON.

// ═══ LIMIT: BAJTY UTF-8 ═══
// 20 MiB to limit bajtów, nie liczby znaków. Polskie litery mogą zajmować więcej niż jeden bajt.
  function checkJSONSize(text) { // FUNKCJA checkJSONSize: 20 MiB to limit bajtów, nie liczby znaków. Polskie litery mogą zajmować więcej niż jeden bajt.
    if (new TextEncoder().encode(text).byteLength > JSON_BYTE_LIMIT) // JEŻELI new TextEncoder().encode(text).byteLength jest większe od JSON_BYTE_LIMIT — wykonuję następną instrukcję lub blok.
      throw new Error('Plik JSON może mieć maksymalnie 20 MiB.'); // Przerywam tę operację wyjątkiem: new Error('Plik JSON może mieć maksymalnie 20 MiB.').
  } // Koniec funkcji checkJSONSize.

// ═══ EKSPORT: DANE NA TEKST JSON ═══
// Ponownie sprawdzam dane i liczę rozmiar gotowego tekstu z wcięciami oraz znakami ucieczki.
  function serializeJSON(value) { // FUNKCJA serializeJSON: Ponownie sprawdzam dane i liczę rozmiar gotowego tekstu z wcięciami oraz znakami ucieczki.
    const text = JSON.stringify(validateEnvelope(value), null, 2); // Tworzę text: tekst albo pomocnicza walidacja tekstu; patrz przypisanie.
    checkJSONSize(text); // Gotowy JSON: UTF-8, razem z wcięciami i znakami ucieczki. // Wywołuję checkJSONSize z przygotowanymi argumentami.
    return text; // Zwracam text (tekst albo pomocnicza walidacja tekstu; patrz przypisanie).
  } // Koniec funkcji serializeJSON.

// ═══ REGUŁY: KONTROLA PROJEKTU ═══
// Sześć warunków daje wynik passed / 6 × 100. Potem sortuję wyłącznie niespełnione reguły. To kontrola deklaracji, a nie uruchamianie kodu projektu.
  function checkProject(project) { // FUNKCJA checkProject: Sześć warunków daje wynik passed / 6 × 100. Potem sortuję wyłącznie niespełnione reguły. To kontrola deklaracji, a nie uruchamianie kodu projektu.
    const p = validateEnvelope(envelope([project])).projects[0]; // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
    const search = linearSearch(p.files, (path) => path === 'README.md'); // Tworzę search: wynik wyszukiwania README.md: indeks i liczba sprawdzeń.
    // R4–R6 są sprawdzane także wtedy, gdy R3 nie jest spełniona.
    const conditions = [ // Tworzę conditions: sześć wartości true/false dla reguł R1–R6.
      nonempty(p.name), // Wywołuję nonempty z przygotowanymi argumentami.
      nonempty(p.description), // Wywołuję nonempty z przygotowanymi argumentami.
      search.index !== -1, // Ciąg dalszy: Tworzę conditions: sześć wartości true/false dla reguł R1–R6.
      nonempty(p.readme.goal), // Wywołuję nonempty z przygotowanymi argumentami.
      nonempty(p.readme.run), // Wywołuję nonempty z przygotowanymi argumentami.
      nonempty(p.readme.tests) // Wywołuję nonempty z przygotowanymi argumentami.
    ]; // Zamykam tablicę z powyższymi elementami.
    let rulesChecked = 0; // Tworzę rulesChecked: licznik sprawdzonych reguł.
    const checks = RULES.map((rule, i) => { // Tworzę checks: pełna lista reguł z informacją, czy spełnione.
      rulesChecked++; // Zwiększam rulesChecked o 1.
      return { ...rule, passed: conditions[i] }; // Zwracam obiekt grupujący powiązane pola.
    }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
    const problems = checks.filter((rule) => !rule.passed); // Tworzę problems: tylko niespełnione reguły do uporządkowania.
    const sorted = insertionSort(problems, compareIssues, true); // Tworzę sorted: wynik własnego sortowania: elementy, licznik, kroki.
    const passed = checks.length - problems.length; // Tworzę passed: liczba spełnionych reguł.
    return { // Zwracam obiekt grupujący powiązane pola.
      projectId: p.id, // Pole projectId: ID projektu, którego dotyczy wynik.
      passed, // Pole passed: liczba spełnionych reguł lub informacja true/false dla jednej reguły.
      total: RULES.length, // Pole total: łączna liczba reguł.
      percent: (passed / RULES.length) * 100, // Pole percent: procent spełnionych reguł.
      checks, // Pole checks: wszystkie reguły z wynikami.
      issues: sorted.items, // Pole issues: niespełnione reguły po sortowaniu.
      steps: sorted.steps, // Pole steps: kolejne kroki sortowania.
      comparisons: sorted.comparisons, // Pole comparisons: liczba porównań kluczy.
      rulesChecked, // Pole rulesChecked: liczba wykonanych sprawdzeń reguł.
      search // Pole search: wynik wyszukiwania liniowego.
    }; // Zamykam obiekt grupujący powyższe pola.
  } // Koniec funkcji checkProject.

// ═══ GENEROWANIE: README ═══
// Tworzę szablon Markdown z danych projektu. Fragmenty w nawiasach kwadratowych jawnie wskazują braki. Tekst szablonu musi pozostać niezmieniony.
  function makeReadme(p) { // FUNKCJA makeReadme: Tworzę szablon Markdown z danych projektu. Fragmenty w nawiasach kwadratowych jawnie wskazują braki. Tekst szablonu musi pozostać niezmieniony.
    p = validateEnvelope(envelope([p])).projects[0]; // Zapisuję validateEnvelope(envelope([p])).projects[0] do p.
    return `# ${p.name.trim() || '[Nazwa projektu]'}\n\n${p.description.trim() || '[Uzupełnij opis]'}\n\n## Cel\n${p.readme.goal.trim() || '[Uzupełnij cel]'}\n\n## Uruchomienie\n${p.readme.run.trim() || '[Uzupełnij instrukcję uruchomienia]'}\n\n## Testy\n${p.readme.tests.trim() || '[Uzupełnij sposób testowania]'}\n\n## Demonstracja\n${p.demoReady ? 'Wersja demonstracyjna przygotowana.' : 'Wersja demonstracyjna nieprzygotowana.'}\n`; // Zwracam tekst składany z wartości w ${...}.
  } // Koniec funkcji makeReadme.

// ═══ GENEROWANIE: RAPORT ═══
// Raport łączy opis zakresu kontroli, dane projektu i wynik. Nie sprawdza zdalnego repozytorium.
  function makeReport(p, result) { // FUNKCJA makeReport: Raport łączy opis zakresu kontroli, dane projektu i wynik. Nie sprawdza zdalnego repozytorium.
    return { // Zwracam obiekt grupujący powiązane pola.
      reportVersion: 1, // Pole reportVersion: wersja struktury raportu.
      scope: 'Kontrola deklarowanego manifestu, nie zdalnego repozytorium.', // Pole scope: opis, co obejmuje kontrola.
      manifest: p, // Pole manifest: dane sprawdzanego projektu.
      result // Pole result: wynik kontroli.
    }; // Zamykam obiekt grupujący powyższe pola.
  } // Koniec funkcji makeReport.

// ═══ POMIARY: PORÓWNANIE ZE WZORCEM ═══
// Mierzę operacje, nie czas. Własne sortowanie porównuję z gotowym sort(), użytym WYŁĄCZNIE jako niezależny wzorzec.
  function benchmark() { // FUNKCJA benchmark: Mierzę operacje, nie czas. Własne sortowanie porównuję z gotowym sort(), użytym WYŁĄCZNIE jako niezależny wzorzec.
    const sorting = []; // Tworzę sorting: wyniki pomiarów sortowania.
    for (const n of [10, 100, 1000]) { // PĘTLA: dla każdego n z [10, 100, 1000] wykonuję blok.
      const ascending = Array.from({ length: n }, (_, i) => ({ id: `A-${i}`, level: 'error', number: i })); // Tworzę ascending: dane uporządkowane rosnąco.
      for (const order of ['uporządkowane', 'odwrócone']) { // PĘTLA: dla każdego order z ['uporządkowane', 'odwrócone'] wykonuję blok.
        const input = order === 'uporządkowane' ? ascending : ascending.slice().reverse(); // Tworzę input: dane wejściowe konkretnego sprawdzenia.
        const own = insertionSort(input, compareIssues); // Tworzę own: wynik własnego sortowania przez wstawianie.
        const reference = input.slice().sort(compareIssues); // Tylko niezależny wzorzec pomiarowy. // Tworzę reference: wynik gotowego sort() do porównania z własnym algorytmem.
        sorting.push({ // Dopisuję nowy element na końcu tablicy wynikowej.
          n, // Pole n: n (liczba elementów, nowy element DOM albo kolejny numer — zależnie od miejsca).
          order, // Pole order: początkowy porządek danych.
          comparisons: own.comparisons, // Pole comparisons: liczba porównań kluczy.
          consistent: own.items.every((x, i) => x.id === reference[i].id) // Pole consistent: czy własny wynik zgadza się ze wzorcem.
        }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
      } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    const records = Array.from({ length: 1000 }, (_, i) => `PLIK-${i}`); // Tworzę records: badana lista rekordów.
    const searching = [ // Tworzę searching: wyniki trzech scenariuszy wyszukiwania.
      ['początek', 'PLIK-0'], // Ciąg dalszy: Wywołuję [ ['początek', 'PLIK-0'], ['koniec', 'PLIK-999'], ['brak', 'NIE-MA'] ].map z przygotowanymi argumentami.
      ['koniec', 'PLIK-999'], // Ciąg dalszy: Wywołuję [ ['początek', 'PLIK-0'], ['koniec', 'PLIK-999'], ['brak', 'NIE-MA'] ].map z przygotowanymi argumentami.
      ['brak', 'NIE-MA'] // Ciąg dalszy: Wywołuję [ ['początek', 'PLIK-0'], ['koniec', 'PLIK-999'], ['brak', 'NIE-MA'] ].map z przygotowanymi argumentami.
    ].map(([scenario, target]) => ({ scenario, ...linearSearch(records, (x) => x === target) })); // Pole scenario: nazwa przypadku pomiarowego.
    return { // Zwracam obiekt grupujący powiązane pola.
      sorting, // Pole sorting: sorting (wyniki pomiarów sortowania).
      searching, // Pole searching: searching (wyniki trzech scenariuszy wyszukiwania).
      interpretation: // Pole interpretation: tekstowe objaśnienie wyników.
        'Dla unikalnych kluczy: uporządkowane n−1 porównań; odwrócone n(n−1)/2. Wyszukiwanie kończy się na pierwszym dopasowaniu.' // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
    }; // Zamykam obiekt grupujący powyższe pola.
  } // Koniec funkcji benchmark.

// ═══ DANE: SCENARIUSZE DO POKAZU ═══
// Przygotowuję nowy przykład kontrolny, typowy, graniczny, większy i pusty zestaw.
  function scenarios() { // FUNKCJA scenarios: Przygotowuję nowy przykład kontrolny, typowy, graniczny, większy i pusty zestaw.
    const typical = example(); // Tworzę typical: projekt z pełnymi informacjami.
    typical.description = 'Gra edukacyjna w przeglądarce'; // Zapisuję tekst „Gra edukacyjna w przeglądarce” do typical.description.
    typical.readme.run = 'Otwórz index.html.'; // Zapisuję tekst „Otwórz index.html.” do typical.readme.run.
    typical.readme.tests = 'Uruchom npm test.'; // Zapisuję tekst „Uruchom npm test.” do typical.readme.tests.
    const boundary = { // Tworzę boundary: projekt z brakującymi lub granicznymi danymi.
      ...example(), // Wywołuję example.
      id: 'GRANICA-1', // Pole id: stały identyfikator rekordu.
      name: '   ', // Pole name: nazwa projektu.
      files: [], // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
      readme: { goal: '', run: '', tests: '' } // Pole readme: sekcje dokumentacji projektu.
    }; // Zamykam obiekt grupujący powyższe pola.
    const large = Array.from({ length: 1000 }, (_, i) => ({ // Tworzę large: zestaw 1000 różnych projektów.
      ...typical, // Ciąg dalszy: Wywołuję Array.from z przygotowanymi argumentami.
      id: `PROJEKT-${i + 1}`, // Pole id: stały identyfikator rekordu.
      name: `Projekt ${i + 1}`, // Pole name: nazwa projektu.
      readme: { ...typical.readme } // Pole readme: sekcje dokumentacji projektu.
    })); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
    return { // Zwracam obiekt grupujący powiązane pola.
      control: envelope([example()]), // Pole control: zestaw kontrolny MojaGra.
      typical: envelope([typical]), // Pole typical: zestaw typowy, z pełnymi informacjami.
      boundary: envelope([boundary]), // Pole boundary: zestaw graniczny z brakami.
      large: envelope(large), // Pole large: większy zestaw 1000 projektów.
      empty: envelope([]) // Pole empty: pusta lista projektów.
    }; // Zamykam obiekt grupujący powyższe pola.
  } // Koniec funkcji scenarios.

// ═══ UDOSTĘPNIANIE MODUŁU — przeglądarka i Node.js ═══
  const api = { // Tworzę api: publiczny zestaw funkcji udostępniany testom i interfejsowi.
    LIMIT, // Pole LIMIT: LIMIT (limit 1000 projektów lub 1000 plików).
    JSON_BYTE_LIMIT, // Pole JSON_BYTE_LIMIT: JSON_BYTE_LIMIT (limit 20 × 1024 × 1024 bajtów).
    RULES, // Pole RULES: RULES (sześć reguł R1–R6 z ważnością i instrukcją poprawy).
    example, // Pole example: example (funkcja tworząca świeży projekt MojaGra).
    envelope, // Pole envelope: envelope (funkcja opakowująca projekty we wspólny format JSON).
    linearSearch, // Pole linearSearch: linearSearch.
    compareIssues, // Pole compareIssues: compareIssues.
    insertionSort, // Pole insertionSort: insertionSort.
    validateEnvelope, // Pole validateEnvelope: validateEnvelope.
    parseJSON, // Pole parseJSON: parseJSON.
    serializeJSON, // Pole serializeJSON: serializeJSON.
    checkProject, // Pole checkProject: checkProject.
    makeReadme, // Pole makeReadme: makeReadme.
    makeReport, // Pole makeReport: makeReport.
    benchmark, // Pole benchmark: benchmark.
    scenarios // Pole scenarios: scenarios (lista przycisków scenariuszy albo generator zestawów).
  }; // Zamykam obiekt grupujący powyższe pola.
  if (typeof module !== 'undefined' && module.exports) module.exports = api; // JEŻELI typeof module !== 'undefined' && module.exports — wykonuję następną instrukcję lub blok.
  else root.RepoCore = api; // Zapisuję api (publiczny zestaw funkcji udostępniany testom i interfejsowi) do root.RepoCore.
})(typeof globalThis !== 'undefined' ? globalThis : this); // Ciąg dalszy: Uruchamiam funkcję osłaniającą moduł; udostępni ona API w przeglądarce lub Node.js.
