// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
const { test } = require('node:test'); // Tworzę { test }: wynik wywołania require.
const assert = require('node:assert/strict'); // Tworzę assert: narzędzia sprawdzające oczekiwane wyniki.
const fs = require('node:fs'); // Tworzę fs: wbudowany moduł operacji na plikach.
const path = require('node:path'); // Tworzę path: wbudowany moduł budowania ścieżek.
const vm = require('node:vm'); // Tworzę vm: wbudowany moduł uruchamiania JavaScriptu w osobnym kontekście.
const C = require('../02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js'); // Tworzę C: moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację.
const root = path.join(__dirname, '..'); // Tworzę root: obiekt globalny albo główny katalog projektu — znaczenie zależy od pliku.
const html = fs.readFileSync(path.join(root, '01-APLIKACJA/OTWORZ-APLIKACJE.html'), 'utf8'); // Tworzę html: odczytany plik interfejsu do testów.

// Mały adapter DOM: testujemy rzeczywiste handlery app.js bez zależności.

// ═══ TESTY INTERFEJSU: ADAPTER DOM ═══
// To mały model przeglądarki do testów, a nie prawdziwa przeglądarka. Uruchamia rzeczywisty app.js i przechwytuje zdarzenia.
function app() { // FUNKCJA app: To mały model przeglądarki do testów, a nie prawdziwa przeglądarka. Uruchamia rzeczywisty app.js i przechwytuje zdarzenia.
  const nodes = new Map(); // Tworzę nodes: mapa identyfikatorów na sztuczne elementy DOM.
  let downloads = 0, // Tworzę downloads: licznik pobrań w teście. Tworzę confirmations: licznik pytań potwierdzających w teście.
    confirmations = 0; // Ustawiam confirmations: licznik pytań potwierdzających w teście.
  const element = () => ({ // Tworzę element: fabryka sztucznego elementu DOM.
    value: '', // Pole value: wartość pola formularza.
    textContent: '', // Pole textContent: bezpiecznie wyświetlany tekst, nie interpretowany HTML.
    disabled: false, // Pole disabled: czy kontrolka ma być nieaktywna.
    checked: false, // Pole checked: stan zaznaczenia lub licznik — zależnie od obiektu.
    files: [], // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
    dataset: {}, // Pole dataset: niestandardowe atrybuty data-*.
    listeners: {}, // Pole listeners: przechwycone funkcje obsługi zdarzeń w teście.
    addEventListener(event, fn) { // Metoda addEventListener: zachowanie testowego elementu DOM.
      this.listeners[event] = fn; // Zapisuję fn do this.listeners[event].
    }, // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    append() {}, // Metoda append: zachowanie testowego elementu DOM.
    replaceChildren() {}, // Metoda replaceChildren: zachowanie testowego elementu DOM.
    remove() {}, // Metoda remove: zachowanie testowego elementu DOM.
    focus() {}, // Metoda focus: zachowanie testowego elementu DOM.
    click() { // Metoda click: symuluje kliknięcie w teście.
      if (!this.disabled) return this.listeners.click?.(); // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  }); // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  for (const match of html.matchAll(/id="([^"]+)"/g)) nodes.set(match[1], element()); // PĘTLA: dla każdego match z html.matchAll(/id="([^"]+)"/g) wykonuję blok.
  const scenarios = ['typical', 'boundary', 'large', 'empty'].map((name) => // Tworzę scenarios: lista przycisków scenariuszy albo generator zestawów.
    Object.assign(element(), { dataset: { scenario: name }, textContent: name }) // Pole dataset: niestandardowe atrybuty data-*.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  const context = vm.createContext({ // Tworzę context: izolowany kontekst, w którym test uruchamia app.js.
    window: { // Pole window: obiekt grupujący powiązane pola.
      RepoCore: C, // Pole RepoCore: C (moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację).
      confirm: () => { // Pole confirm: funkcja wywoływana później.
        confirmations++; // Zwiększam confirmations o 1.
        return true; // Zwracam true.
      } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    }, // Zamykam obiekt grupujący powyższe pola.
    document: { // Pole document: obiekt grupujący powiązane pola.
      getElementById: (id) => nodes.get(id), // Pole getElementById: funkcja wywoływana później.
      querySelectorAll: () => scenarios, // Pole querySelectorAll: funkcja wywoływana później.
      createElement: (tag) => { // Pole createElement: funkcja wywoływana później.
        const el = element(); // Tworzę el: nowo utworzony element testowy.
        if (tag === 'a') // JEŻELI tag jest dokładnie równe 'a' — wykonuję następną instrukcję lub blok.
          el.click = () => { // Zapisuję funkcja wywoływana później do el.click.
            downloads++; // Zwiększam downloads o 1.
          }; // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
        return el; // Zwracam el (nowo utworzony element testowy).
      }, // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
      body: { append() {} } // Pole body: obiekt grupujący powiązane pola.
    }, // Zamykam obiekt grupujący powyższe pola.
    Blob, // Pole Blob: Blob.
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} }, // Pole URL: obiekt grupujący powiązane pola.
    setTimeout: () => {} // Pole setTimeout: funkcja wywoływana później.
  }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  vm.runInContext(fs.readFileSync(path.join(root, '02-KOD-APLIKACJI/02-formularz-przyciski-i-wyniki.js'), 'utf8'), context); // Wywołuję vm.runInContext z przygotowanymi argumentami.
  return { // Zwracam obiekt grupujący powiązane pola.
    $: (id) => nodes.get(id), // Pole $: funkcja wywoływana później.
    scenario: (name) => scenarios.find((x) => x.dataset.scenario === name), // Pole scenario: nazwa przypadku pomiarowego.
    run: (source) => vm.runInContext(source, context), // Pole run: instrukcja uruchomienia w README.
    downloads: () => downloads, // Pole downloads: funkcja wywoływana później.
    confirmations: () => confirmations // Pole confirmations: funkcja wywoływana później.
  }; // Zamykam obiekt grupujący powyższe pola.
} // Koniec funkcji app.

test('Wczytaj przykład jest poza fieldset i przywraca 3/6 z pustego zestawu', () => { // TEST: Wczytaj przykład jest poza fieldset i przywraca 3/6 z pustego zestawu.
  const fieldsetStart = html.indexOf('<fieldset id="manifestFields"'); // Tworzę fieldsetStart: pozycja początku fieldset w HTML.
  const fieldsetEnd = html.indexOf('</fieldset>', fieldsetStart); // Tworzę fieldsetEnd: pozycja końca fieldset w HTML.
  const control = html.indexOf('id="control"'); // Tworzę control: pozycja przycisku wczytania przykładu w HTML.
  assert.ok(control < fieldsetStart || control > fieldsetEnd); // Sprawdzam, czy warunek jest prawdziwy: control < fieldsetStart || control > fieldsetEnd.
  const a = app(); // Tworzę a: link do pobrania albo obiekt testowej aplikacji.
  a.scenario('empty').click(); // Uruchamiam kliknięcie elementu, np. wybór lub pobranie pliku.
  assert.equal(a.$('manifestFields').disabled, true); // Sprawdzam dokładną równość wartości: a.$('manifestFields').disabled ↔ true.
  a.$('control').click(); // Uruchamiam kliknięcie elementu, np. wybór lub pobranie pliku.
  assert.equal(a.$('manifestFields').disabled, false); // Sprawdzam dokładną równość wartości: a.$('manifestFields').disabled ↔ false.
  assert.equal(a.$('score').textContent, '3/6'); // Sprawdzam dokładną równość wartości: a.$('score').textContent ↔ '3/6'.
  assert.equal(a.$('percent').textContent, '50%'); // Sprawdzam dokładną równość wartości: a.$('percent').textContent ↔ '50%'.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Import nazwy wieloliniowej nie potwierdza ani nie zmienia zestawu lub formularza', async () => { // TEST: Import nazwy wieloliniowej nie potwierdza ani nie zmienia zestawu lub formularza.
  for (const name of ['Moja\nGra', 'Moja\rGra', 'Moja\r\nGra']) { // PĘTLA: dla każdego name z ['Moja\nGra', 'Moja\rGra', 'Moja\r\nGra'] wykonuję blok.
    const a = app(), // Tworzę a: link do pobrania albo obiekt testowej aplikacji. Tworzę before: zapis kolejności identyfikatorów przed wstawieniem.
      before = a.run('JSON.stringify(state)'); // Ustawiam before: zapis kolejności identyfikatorów przed wstawieniem.
    a.$('description').value = 'Niezapisany opis'; // Ustawiam wartość a.$('description').value na tekst „Niezapisany opis”.
    a.$('manifestForm').listeners.input(); // Wywołuję a.$('manifestForm').listeners.input.
    const value = C.scenarios().control; // Tworzę value: odczytana lub sprawdzana wartość.
    value.projects[0].name = name; // Zapisuję name (nazwa pliku, projektu lub scenariusza) do value.projects[0].name.
    a.$('fileInput').files = [{ size: 1000, text: async () => JSON.stringify(value) }]; // Zapisuję tablica 1 elementów do a.$('fileInput').files.
    await a.$('fileInput').listeners.change(); // Wywołuję a.$('fileInput').listeners.change.
    assert.match(a.$('notice').textContent, /Nazwa projektu musi mieścić się w jednej linii/); // Sprawdzam zgodność komunikatu z wyrażeniem regularnym: a.$('notice').textContent ↔ /Nazwa projektu musi mieścić się w jednej linii/.
    assert.equal(a.run('JSON.stringify(state)'), before); // Sprawdzam dokładną równość wartości: a.run('JSON.stringify(state)') ↔ before.
    assert.equal(a.confirmations(), 0); // Sprawdzam dokładną równość wartości: a.confirmations() ↔ 0.
    assert.equal(a.$('description').value, 'Niezapisany opis'); // Sprawdzam dokładną równość wartości: a.$('description').value ↔ 'Niezapisany opis'.
    assert.equal(a.run('dirty'), true); // Sprawdzam dokładną równość wartości: a.run('dirty') ↔ true.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Za duży eksport nie pobiera pliku ani nie zatwierdza zmian formularza', () => { // TEST: Za duży eksport nie pobiera pliku ani nie zatwierdza zmian formularza.
  const a = app(); // Tworzę a: link do pobrania albo obiekt testowej aplikacji.
// UWAGA: poniższy tekst wielowierszowy jest treścią pliku lub scenariusza; komentarz w środku zmieniłby wynik.
  a.run(`state=C.envelope(Array.from({length:270},(_,i)=>{
  const p=C.example();p.id='DUZY-'+i;p.description='ł'.repeat(10000);
  p.readme={goal:p.description,run:p.description,tests:p.description};return p;
 }));activeId=state.projects[0].id;showProject();`);
  const before = a.run('JSON.stringify(state)'); // Tworzę before: zapis kolejności identyfikatorów przed wstawieniem.
  a.$('name').value = 'Niezapisana nazwa'; // Ustawiam wartość a.$('name').value na tekst „Niezapisana nazwa”.
  a.$('manifestForm').listeners.input(); // Wywołuję a.$('manifestForm').listeners.input.
  a.$('exportJSON').click(); // Uruchamiam kliknięcie elementu, np. wybór lub pobranie pliku.
  assert.match(a.$('notice').textContent, /20 MiB.*Eksport anulowany/); // Sprawdzam zgodność komunikatu z wyrażeniem regularnym: a.$('notice').textContent ↔ /20 MiB.*Eksport anulowany/.
  assert.equal(a.downloads(), 0); // Sprawdzam dokładną równość wartości: a.downloads() ↔ 0.
  assert.equal(a.run('JSON.stringify(state)'), before); // Sprawdzam dokładną równość wartości: a.run('JSON.stringify(state)') ↔ before.
  assert.equal(a.$('name').value, 'Niezapisana nazwa'); // Sprawdzam dokładną równość wartości: a.$('name').value ↔ 'Niezapisana nazwa'.
  assert.equal(a.run('dirty'), true); // Sprawdzam dokładną równość wartości: a.run('dirty') ↔ true.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
test('Mały eksport nadal pobiera plik i zapisuje prawidłowy formularz', () => { // TEST: Mały eksport nadal pobiera plik i zapisuje prawidłowy formularz.
  const a = app(); // Tworzę a: link do pobrania albo obiekt testowej aplikacji.
  a.$('run').value = 'Otwórz index.html'; // Ustawiam wartość a.$('run').value na tekst „Otwórz index.html”.
  a.$('manifestForm').listeners.input(); // Wywołuję a.$('manifestForm').listeners.input.
  a.$('exportJSON').click(); // Uruchamiam kliknięcie elementu, np. wybór lub pobranie pliku.
  assert.equal(a.downloads(), 1); // Sprawdzam dokładną równość wartości: a.downloads() ↔ 1.
  assert.equal(a.$('score').textContent, '4/6'); // Sprawdzam dokładną równość wartości: a.$('score').textContent ↔ '4/6'.
  assert.equal(a.$('percent').textContent, '66,7%'); // Sprawdzam dokładną równość wartości: a.$('percent').textContent ↔ '66,7%'.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
