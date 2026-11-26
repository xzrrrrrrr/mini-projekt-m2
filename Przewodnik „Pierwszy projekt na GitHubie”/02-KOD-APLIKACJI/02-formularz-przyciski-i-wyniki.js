// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
'use strict'; // Włączam tryb ścisły JavaScriptu, który wykrywa część pomyłek.

// ═══ POŁĄCZENIE Z RDZENIEM I STAN APLIKACJI ═══
const C = window.RepoCore; // Tworzę C: moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację.
const $ = (id) => document.getElementById(id); // Tworzę $: funkcja wywoływana później.
let state = C.scenarios().control, // Tworzę state: zatwierdzony zestaw projektów w pamięci. Tworzę activeId: ID projektu aktualnie pokazanego w formularzu.
  activeId = state.projects[0].id; // Ustawiam activeId: ID projektu aktualnie pokazanego w formularzu.
let current = null, // Tworzę current: bieżący wynik kontroli. Tworzę previous: poprzedni wynik do porównania. Tworzę dirty: flaga zmian formularza, które nie są jeszcze zatwierdzone.
  previous = null, // Ustawiam previous: poprzedni wynik do porównania.
  dirty = false; // Ustawiam dirty: flaga zmian formularza, które nie są jeszcze zatwierdzone.
const saved = () => state.projects.find((p) => p.id === activeId); // Tworzę saved: funkcja znajdująca aktywny projekt w zatwierdzonym zestawie.
const node = (tag, text, className) => { // Tworzę node: funkcja tworząca element HTML i ustawiająca bezpiecznie jego tekst.
  const n = document.createElement(tag); // Tworzę n: liczba elementów, nowy element DOM albo kolejny numer — zależnie od miejsca.
  if (text !== undefined) n.textContent = text; // JEŻELI text jest różne od undefined — wykonuję następną instrukcję lub blok.
  if (className) n.className = className; // JEŻELI className — wykonuję następną instrukcję lub blok.
  return n; // Zwracam n (liczba elementów, nowy element DOM albo kolejny numer — zależnie od miejsca).
}; // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
const pct = (n) => new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 1 }).format(n) + '%'; // Tworzę pct: funkcja formatująca procent po polsku.

// ═══ INTERFEJS: KOMUNIKATY ═══
// Wyświetlam informację dla użytkownika i wybieram zwykły albo błędny wygląd komunikatu.
function notice(message, bad = false) { // FUNKCJA notice: Wyświetlam informację dla użytkownika i wybieram zwykły albo błędny wygląd komunikatu.
  $('notice').textContent = message; // Wyświetlam tekst w $('notice'): message.
  $('notice').className = 'notice visible' + (bad ? ' bad' : ''); // Zapisuję 'notice visible' plus bad ? ' bad' : '' do $('notice').className.
} // Koniec funkcji notice.

// ═══ FORMULARZ: ODCZYT SZKICU ═══
// Odczytuję wartości pól. To jeszcze nie zatwierdzone dane: walidacja nastąpi później.
function readDraft() { // FUNKCJA readDraft: Odczytuję wartości pól. To jeszcze nie zatwierdzone dane: walidacja nastąpi później.
  return { // Zwracam obiekt grupujący powiązane pola.
    id: activeId, // Pole id: stały identyfikator rekordu.
    name: $('name').value, // Pole name: nazwa projektu.
    description: $('description').value, // Pole description: krótki opis projektu.
    files: $('files') // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
      .value.split(/\r?\n/) // Ciąg dalszy: Wywołuję $('files') .value.split z przygotowanymi argumentami.
      .filter((x) => x.trim() !== ''), // Wywołuję x.trim.
    readme: { goal: $('goal').value, run: $('run').value, tests: $('tests').value }, // Pole readme: sekcje dokumentacji projektu.
    demoReady: $('demoReady').checked // Pole demoReady: flaga gotowej demonstracji; nie jest siódmą regułą.
  }; // Zamykam obiekt grupujący powyższe pola.
} // Koniec funkcji readDraft.

// ═══ INTERFEJS: LISTA PROJEKTÓW ═══
// Buduję opcje wyboru, licznik projektów oraz blokadę dodawania przy limicie 1000.
function renderOptions() { // FUNKCJA renderOptions: Buduję opcje wyboru, licznik projektów oraz blokadę dodawania przy limicie 1000.
  $('projectSelect').replaceChildren(); // Czyszczę dotychczasowe elementy, żeby wynik się nie dublował.
  for (const p of state.projects) { // PĘTLA: dla każdego p z state.projects wykonuję blok.
    const o = node('option', `${p.id} · ${p.name.trim() || '(bez nazwy)'}`); // Tworzę o: nowa opcja listy projektów.
    o.value = p.id; // Ustawiam wartość o.value na p.id.
    $('projectSelect').append(o); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  if (!state.projects.length) { // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
    const o = node('option', 'Brak projektów'); // Tworzę o: nowa opcja listy projektów.
    o.value = ''; // Ustawiam wartość o.value na tekst „”.
    $('projectSelect').append(o); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  $('projectSelect').value = activeId || ''; // Ustawiam wartość $('projectSelect').value na activeId || ''.
  $('setCount').textContent = `${state.projects.length}/1000 projektów`; // Wyświetlam tekst w $('setCount'): tekst składany z wartości w ${...}.
  $('addProject').disabled = state.projects.length >= C.LIMIT; // Ustawiam blokadę kontrolki zgodnie z state.projects.length jest co najmniej C.LIMIT.
} // Koniec funkcji renderOptions.

// ═══ INTERFEJS: PUSTY ZESTAW ═══
// Czyszczę stary wynik, liczniki, kroki i podgląd, gdy nie ma projektu.
function renderEmpty() { // FUNKCJA renderEmpty: Czyszczę stary wynik, liczniki, kroki i podgląd, gdy nie ma projektu.
  $('score').textContent = '—'; // Wyświetlam tekst w $('score'): tekst „—”.
  $('percent').textContent = '—'; // Wyświetlam tekst w $('percent'): tekst „—”.
  $('completion').value = 0; // Ustawiam wartość $('completion').value na 0.
  $('comparison').textContent = 'Brak projektów do porównania.'; // Wyświetlam tekst w $('comparison'): tekst „Brak projektów do porównania.”.
  $('freshness').textContent = ''; // Wyświetlam tekst w $('freshness'): tekst „”.
  $('issues').replaceChildren(node('li', 'Pusty zestaw. Dodaj projekt lub zaimportuj manifest.')); // Zastępuję dotychczasową zawartość elementu nowymi węzłami.
  $('trace').replaceChildren(); // Czyszczę dotychczasowe elementy, żeby wynik się nie dublował.
  $('checks').replaceChildren(); // Czyszczę dotychczasowe elementy, żeby wynik się nie dublował.
  $('counters').textContent = 'Sprawdzone pliki: 0 · Reguły: 0 · Porównania kluczy: 0'; // Wyświetlam tekst w $('counters'): tekst „Sprawdzone pliki: 0 · Reguły: 0 · Porównania kluczy: 0”.
  $('searchInfo').textContent = 'Brak wyszukiwania.'; // Wyświetlam tekst w $('searchInfo'): tekst „Brak wyszukiwania.”.
  $('readmePreview').textContent = ''; // Wyświetlam tekst w $('readmePreview'): tekst „”.
} // Koniec funkcji renderEmpty.

// ═══ INTERFEJS: WYBRANY PROJEKT ═══
// Wczytuję dane wybranego projektu do formularza i obliczam jego wynik albo pokazuję pusty zestaw.
function showProject() { // FUNKCJA showProject: Wczytuję dane wybranego projektu do formularza i obliczam jego wynik albo pokazuję pusty zestaw.
  renderOptions(); // Odświeżam listę projektów i jej licznik.
  const p = saved(); // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  $('manifestFields').disabled = !p; // Ustawiam blokadę kontrolki zgodnie z zaprzeczenie warunku (true zamienia na false i odwrotnie).
  for (const key of ['readme', 'report']) $(key).disabled = !p; // PĘTLA: dla każdego key z ['readme', 'report'] wykonuję blok.
  $('projectId').textContent = p ? p.id : '—'; // Wyświetlam tekst w $('projectId'): wartość wybrana zależnie od warunku przed znakiem ?.
  $('formError').textContent = ''; // Wyświetlam tekst w $('formError'): tekst „”.
  for (const key of ['name', 'description']) $(key).value = p ? p[key] : ''; // PĘTLA: dla każdego key z ['name', 'description'] wykonuję blok.
  $('files').value = p ? p.files.join('\n') : ''; // Ustawiam wartość $('files').value na wartość wybrana zależnie od warunku przed znakiem ?.
  for (const [id, key] of [ // PĘTLA: dla każdego [id, key] z [ ['goal', 'goal'], ['run', 'run'], ['tests', 'tests'] ] wykonuję blok.
    ['goal', 'goal'], // Dalszy fragment powyższego wyrażenia lub warunku.
    ['run', 'run'], // Dalszy fragment powyższego wyrażenia lub warunku.
    ['tests', 'tests'] // Dalszy fragment powyższego wyrażenia lub warunku.
  ]) // Zamykam tablicę z powyższymi elementami.
    $(id).value = p ? p.readme[key] : ''; // Ustawiam wartość $(id).value na wartość wybrana zależnie od warunku przed znakiem ?.
  $('demoReady').checked = Boolean(p?.demoReady); // Ustawiam zaznaczenie checkboxa: wynik wywołania Boolean.
  dirty = false; // Ustawiam flagę niezapisanych zmian na false.
  previous = null; // Zapisuję null, czyli brak wyniku do previous.
  current = p ? C.checkProject(p) : null; // Zapisuję wartość wybrana zależnie od warunku przed znakiem ? do current.
  if (current) renderResult(); // JEŻELI current (bieżący wynik kontroli) — wykonuję następną instrukcję lub blok.
  else renderEmpty(); // Pokazuję bezpieczny widok pustego zestawu.
} // Koniec funkcji showProject.

// ═══ INTERFEJS: PREZENTACJA WYNIKU ═══
// Pokazuję procent, listę problemów, wszystkie reguły, kroki sortowania i liczniki. textContent wyświetla tekst bez wykonywania HTML użytkownika.
function renderResult() { // FUNKCJA renderResult: Pokazuję procent, listę problemów, wszystkie reguły, kroki sortowania i liczniki. textContent wyświetla tekst bez wykonywania HTML użytkownika.
  const r = current, // Tworzę r: bieżący wynik kontroli. Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
    p = saved(); // Ustawiam p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
  $('score').textContent = `${r.passed}/${r.total}`; // Wyświetlam tekst w $('score'): tekst składany z wartości w ${...}.
  $('percent').textContent = pct(r.percent); // Wyświetlam tekst w $('percent'): wynik wywołania pct.
  $('completion').value = r.passed; // Ustawiam wartość $('completion').value na r.passed.
  $('comparison').textContent = // Wyświetlam tekst w $('comparison'): tekst składany z wartości w ${...}.
    `Poprzednio: ${previous ? previous.passed + '/6' : '—'} → Teraz: ${r.passed}/6${previous ? ' · Zmiana: ' + (r.passed - previous.passed > 0 ? '+' : '') + (r.passed - previous.passed) : ''}`; // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
  $('freshness').textContent = 'Wynik aktualny dla zatwierdzonych danych.'; // Wyświetlam tekst w $('freshness'): tekst „Wynik aktualny dla zatwierdzonych danych.”.
  $('issues').replaceChildren(); // Czyszczę dotychczasowe elementy, żeby wynik się nie dublował.
  for (const issue of r.issues) { // PĘTLA: dla każdego issue z r.issues wykonuję blok.
    const li = node('li'); // Tworzę li: wiersz listy problemów.
    li.append( // Dołączam przygotowane elementy do rodzica w interfejsie.
      node('span', issue.level === 'error' ? 'Błąd' : 'Ostrzeżenie', 'badge ' + issue.level), // Wywołuję node z przygotowanymi argumentami.
      node('span', `${issue.id} ${issue.fix}`) // Wywołuję node z przygotowanymi argumentami.
    ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
    $('issues').append(li); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  if (!r.issues.length) $('issues').append(node('li', 'Brak problemów. Wszystkie 6 reguł spełnione.', 'pass')); // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
  $('checks').replaceChildren( // Zastępuję dotychczasową zawartość elementu nowymi węzłami.
    ...r.checks.map((rule) => // Wywołuję r.checks.map z przygotowanymi argumentami.
      node( // Wywołuję node z przygotowanymi argumentami.
        'li', // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
        `${rule.passed ? '✓ Spełniona' : '✕ Niespełniona'} · ${rule.id} · ${rule.label}`, // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
        rule.passed ? 'pass' : '' // Ciąg dalszy: Wywołuję node z przygotowanymi argumentami.
      ) // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    ) // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  $('trace').replaceChildren(); // Czyszczę dotychczasowe elementy, żeby wynik się nie dublował.
  for (const step of r.steps) { // PĘTLA: dla każdego step z r.steps wykonuję blok.
    const tr = node('tr'); // Tworzę tr: wiersz tabeli.
    for (const text of [step.before, step.decision, step.after]) tr.append(node('td', text)); // PĘTLA: dla każdego text z [step.before, step.decision, step.after] wykonuję blok.
    $('trace').append(tr); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  if (!r.steps.length) { // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
    const tr = node('tr'), // Tworzę tr: wiersz tabeli. Tworzę td: komórka tabeli.
      td = node('td', 'Mniej niż 2 problemy — sortowanie nie wymaga porównań.'); // Ustawiam td: komórka tabeli.
    td.colSpan = 3; // Zapisuję 3 do td.colSpan.
    tr.append(td); // Dołączam przygotowane elementy do rodzica w interfejsie.
    $('trace').append(tr); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  $('counters').textContent = // Wyświetlam tekst w $('counters'): tekst składany z wartości w ${...}.
    `Sprawdzone pliki: ${r.search.checked} · Reguły: ${r.rulesChecked} · Porównania kluczy: ${r.comparisons}`; // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
  $('searchInfo').textContent = // Wyświetlam tekst w $('searchInfo'): tekst składany z wartości w ${...}.
    `Wyszukiwanie liniowe: ${r.search.index < 0 ? 'README.md nie znaleziono.' : 'README.md znaleziono na pozycji ' + (r.search.index + 1) + '.'} Szukamy pierwszego dopasowania.`; // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
  $('readmePreview').textContent = C.makeReadme(p); // Wyświetlam tekst w $('readmePreview'): wynik wywołania C.makeReadme.
} // Koniec funkcji renderResult.

// ═══ ZATWIERDZANIE: NAJPIERW SPRAWDZENIE ═══
// Dopiero po pomyślnej walidacji całego zestawu i kontroli projektu zastępuję state. Wyjątek nie może nadpisać poprzednich danych.
function checkAndCommit(announce = true) { // FUNKCJA checkAndCommit: Dopiero po pomyślnej walidacji całego zestawu i kontroli projektu zastępuję state. Wyjątek nie może nadpisać poprzednich danych.
  if (!saved()) return false; // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
  try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
    const draft = readDraft(); // Tworzę draft: niezatwierdzony odczyt formularza.
    const candidate = C.validateEnvelope(C.envelope(state.projects.map((p) => (p.id === activeId ? draft : p)))); // Tworzę candidate: kandydat na nowy zestaw; wymaga sprawdzenia przed zapisem.
    const result = C.checkProject(draft); // Tworzę result: obliczony wynik kontroli projektu.
    previous = current; // Zapisuję current (bieżący wynik kontroli) do previous.
    state = candidate; // Zastępuję zatwierdzony zestaw danymi, które już przeszły walidację.
    current = result; // Zapisuję result (obliczony wynik kontroli projektu) do current.
    dirty = false; // Ustawiam flagę niezapisanych zmian na false.
    $('formError').textContent = ''; // Wyświetlam tekst w $('formError'): tekst „”.
    renderOptions(); // Odświeżam listę projektów i jej licznik.
    renderResult(); // Odświeżam wynik, listę problemów i kroki algorytmów.
    if (announce) notice(`Sprawdzono projekt: ${result.passed}/6 (${pct(result.percent)}).`); // JEŻELI announce — wykonuję następną instrukcję lub blok.
    return true; // Zwracam true.
  } catch (error) { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
    $('formError').textContent = error.message; // Wyświetlam tekst w $('formError'): error.message.
    notice('Dane odrzucone. Zatwierdzony zestaw nie został zmieniony.', true); // Pokazuję komunikat użytkownikowi: 'Dane odrzucone. Zatwierdzony zestaw nie został zmieniony.'.
    return false; // Zwracam false.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
} // Koniec funkcji checkAndCommit.

// ═══ PLIKI: POBIERANIE ═══
// Tworzę plik w pamięci, tymczasowy URL i niewidoczny link. Po pobraniu zwalniam URL.
function download(name, text, type) { // FUNKCJA download: Tworzę plik w pamięci, tymczasowy URL i niewidoczny link. Po pobraniu zwalniam URL.
  const blob = new Blob([text], { type }); // Tworzę blob: plik z tekstem utworzony w pamięci przeglądarki.
  const url = URL.createObjectURL(blob); // Tworzę url: tymczasowy adres pobieranego pliku.
  const a = node('a'); // Tworzę a: link do pobrania albo obiekt testowej aplikacji.
  a.href = url; // Zapisuję url (tymczasowy adres pobieranego pliku) do a.href.
  a.download = name; // Zapisuję name (nazwa pliku, projektu lub scenariusza) do a.download.
  document.body.append(a); // Dołączam przygotowane elementy do rodzica w interfejsie.
  a.click(); // Uruchamiam kliknięcie elementu, np. wybór lub pobranie pliku.
  a.remove(); // Usuwam tymczasowy element z dokumentu.
  setTimeout(() => URL.revokeObjectURL(url), 1000); // Zlecam późniejsze zwolnienie zasobu po pobraniu pliku.
} // Koniec funkcji download.

// ═══ IMPORT: WYMIANA CAŁEGO ZESTAWU ═══
// Najpierw waliduję, potem pytam o zgodę na zastąpienie danych. Anulowanie lub błąd zostawia bieżący zestaw.
function replaceAll(candidate, label) { // FUNKCJA replaceAll: Najpierw waliduję, potem pytam o zgodę na zastąpienie danych. Anulowanie lub błąd zostawia bieżący zestaw.
  try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
    const validated = C.validateEnvelope(candidate); // Cały zestaw, zanim pojawi się potwierdzenie. // Tworzę validated: zestaw po pełnej walidacji.
    if ( // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
      !window.confirm( // Wywołuję window.confirm z przygotowanymi argumentami.
        `${label}: ${validated.projects.length} projektów. Zastąpić cały bieżący zestaw? Niezapisane zmiany formularza zostaną utracone.` // Dalszy fragment tekstu lub argumentu; jego treść jest częścią wyniku programu.
      ) // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
    ) // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
      return; // Kończę funkcję bez dalszego działania.
    state = validated; // Zastępuję zatwierdzony zestaw danymi, które już przeszły walidację.
    activeId = state.projects[0]?.id || null; // Zapisuję state.projects[0]?.id || null do activeId.
    showProject(); // Wczytuję aktywny projekt do formularza i odświeżam jego wynik.
    notice('Wczytano poprawny zestaw. Poprzednie dane zastąpiono w całości.'); // Pokazuję komunikat użytkownikowi: 'Wczytano poprawny zestaw. Poprzednie dane zastąpiono w całości.'.
  } catch (error) { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
    notice(`${error.message} Bieżący zestaw pozostaje bez zmian.`, true); // Pokazuję komunikat użytkownikowi: `${error.message} Bieżący zestaw pozostaje bez zmian.`.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
} // Koniec funkcji replaceAll.

// ═══ ZDARZENIA — przyciski, edycja i przełączanie projektu ═══
$('manifestForm').addEventListener('submit', (event) => { // ZDARZENIE „submit”: podpinam funkcję reagującą na działanie użytkownika.
  event.preventDefault(); // Wywołuję event.preventDefault.
  checkAndCommit(); // Waliduję formularz i zatwierdzam dane wyłącznie przy poprawnym wyniku.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('manifestForm').addEventListener('input', () => { // ZDARZENIE „input”: podpinam funkcję reagującą na działanie użytkownika.
  dirty = true; // Ustawiam flagę niezapisanych zmian na true.
  $('freshness').textContent = 'Dane zmienione — widoczny wynik jest poprzedni. Kliknij „Sprawdź”.'; // Wyświetlam tekst w $('freshness'): tekst „Dane zmienione — widoczny wynik jest poprzedni. Kliknij „Sprawdź”.”.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('projectSelect').addEventListener('change', () => { // ZDARZENIE „change”: podpinam funkcję reagującą na działanie użytkownika.
  const selected = $('projectSelect').value; // Tworzę selected: ID projektu wybranego przez użytkownika.
  if (dirty && !window.confirm('Porzucić niezapisane zmiany formularza?')) { // JEŻELI dirty && !window.confirm('Porzucić niezapisane zmiany formularza?') — wykonuję następną instrukcję lub blok.
    $('projectSelect').value = activeId; // Ustawiam wartość $('projectSelect').value na activeId (ID projektu aktualnie pokazanego w formularzu).
    return; // Kończę funkcję bez dalszego działania.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  activeId = selected; // Zapisuję selected (ID projektu wybranego przez użytkownika) do activeId.
  showProject(); // Wczytuję aktywny projekt do formularza i odświeżam jego wynik.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('addProject').addEventListener('click', () => { // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
  if (state.projects.length >= C.LIMIT) return; // JEŻELI state.projects.length jest co najmniej C.LIMIT — wykonuję następną instrukcję lub blok.
  if (dirty && !window.confirm('Porzucić niezapisane zmiany formularza?')) return; // JEŻELI dirty && !window.confirm('Porzucić niezapisane zmiany formularza?') — wykonuję następną instrukcję lub blok.
  let n = 1; // Tworzę n: liczba elementów, nowy element DOM albo kolejny numer — zależnie od miejsca.
  while (state.projects.some((p) => p.id === `PROJEKT-${n}`)) n++; // DOPÓKI wynik wywołania state.projects.some, powtarzam instrukcję.
  const p = { // Tworzę p: bieżący projekt lub tekst akapitu — zależnie od wyrażenia.
    id: `PROJEKT-${n}`, // Pole id: stały identyfikator rekordu.
    name: '', // Pole name: nazwa projektu.
    description: '', // Pole description: krótki opis projektu.
    files: [], // Pole files: lista względnych ścieżek; to deklaracja, nie skan dysku.
    readme: { goal: '', run: '', tests: '' }, // Pole readme: sekcje dokumentacji projektu.
    demoReady: false // Pole demoReady: flaga gotowej demonstracji; nie jest siódmą regułą.
  }; // Zamykam obiekt grupujący powyższe pola.
  state = C.validateEnvelope(C.envelope([...state.projects, p])); // Zastępuję zatwierdzony zestaw danymi, które już przeszły walidację.
  activeId = p.id; // Zapisuję p.id do activeId.
  showProject(); // Wczytuję aktywny projekt do formularza i odświeżam jego wynik.
  $('name').focus(); // Przenoszę kursor do pola nazwy nowego projektu.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('control').addEventListener('click', () => replaceAll(C.scenarios().control, 'Przykład kontrolny')); // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
for (const button of document.querySelectorAll('[data-scenario]')) // PĘTLA: dla każdego button z document.querySelectorAll('[data-scenario]') wykonuję blok.
  button.addEventListener('click', () => replaceAll(C.scenarios()[button.dataset.scenario], button.textContent)); // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.

// ═══ PLIKI — import JSON ═══
$('importJSON').addEventListener('click', () => $('fileInput').click()); // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
$('fileInput').addEventListener('change', async () => { // ZDARZENIE „change”: podpinam funkcję reagującą na działanie użytkownika.
  const file = $('fileInput').files[0]; // Tworzę file: wybrany plik albo ścieżka obsługiwana przez serwer.
  if (!file) return; // JEŻELI zaprzeczenie warunku (true zamienia na false i odwrotnie) — wykonuję następną instrukcję lub blok.
  try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
    if (file.size > C.JSON_BYTE_LIMIT) throw new Error('Plik przekracza 20 MiB.'); // JEŻELI file.size jest większe od C.JSON_BYTE_LIMIT — wykonuję następną instrukcję lub blok.
    const candidate = C.parseJSON(await file.text()); // Tworzę candidate: kandydat na nowy zestaw; wymaga sprawdzenia przed zapisem.
    replaceAll(candidate, 'Import JSON'); // Przekazuję cały nowy zestaw do walidacji i potwierdzenia zastąpienia danych.
  } catch (error) { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
    notice(`${error.message} Nie zmieniono bieżących danych.`, true); // Pokazuję komunikat użytkownikowi: `${error.message} Nie zmieniono bieżących danych.`.
  } finally { // FINALLY: sprzątam po operacji niezależnie od sukcesu lub błędu.
    $('fileInput').value = ''; // Ustawiam wartość $('fileInput').value na tekst „”.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.

// ═══ PLIKI — eksport JSON, README i raportu ═══
$('exportJSON').addEventListener('click', () => { // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
  try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
    const candidate = dirty ? C.envelope(state.projects.map((p) => (p.id === activeId ? readDraft() : p))) : state; // Tworzę candidate: kandydat na nowy zestaw; wymaga sprawdzenia przed zapisem.
    const text = C.serializeJSON(candidate); // Sprawdź rozmiar przed zmianą stanu i pobraniem. // Tworzę text: tekst albo pomocnicza walidacja tekstu; patrz przypisanie.
    if (dirty && !checkAndCommit(false)) return; // JEŻELI dirty && !checkAndCommit(false) — wykonuję następną instrukcję lub blok.
    download('manifesty.json', text, 'application/json'); // Rozpoczynam pobieranie pliku 'manifesty.json'.
    notice('Wyeksportowano cały zatwierdzony zestaw.'); // Pokazuję komunikat użytkownikowi: 'Wyeksportowano cały zatwierdzony zestaw.'.
  } catch (error) { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
    notice(`${error.message} Eksport anulowany. Nie zmieniono bieżących danych.`, true); // Pokazuję komunikat użytkownikowi: `${error.message} Eksport anulowany. Nie zmieniono bieżących danych.`.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('readme').addEventListener('click', () => { // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
  if (dirty && !checkAndCommit(false)) return; // JEŻELI dirty && !checkAndCommit(false) — wykonuję następną instrukcję lub blok.
  if (saved()) download('README.md', C.makeReadme(saved()), 'text/markdown;charset=utf-8'); // JEŻELI wynik wywołania saved — wykonuję następną instrukcję lub blok.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
$('report').addEventListener('click', () => { // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
  if (dirty && !checkAndCommit(false)) return; // JEŻELI dirty && !checkAndCommit(false) — wykonuję następną instrukcję lub blok.
  if (saved()) // JEŻELI wynik wywołania saved — wykonuję następną instrukcję lub blok.
    download('raport-kontroli.json', JSON.stringify(C.makeReport(saved(), current), null, 2), 'application/json'); // Rozpoczynam pobieranie pliku 'raport-kontroli.json'.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.

// ═══ INTERFEJS: TABELA POMIARÓW ═══
// Buduję tabelę z nagłówkami i wierszami jako elementy DOM.
function addTable(parent, headers, rows) { // FUNKCJA addTable: Buduję tabelę z nagłówkami i wierszami jako elementy DOM.
  const wrap = node('div', undefined, 'table-scroll'), // Tworzę wrap: opakowanie elementów w zestaw lub kontener przewijanej tabeli. Tworzę table: tworzona tabela HTML. Tworzę thead: nagłówek tabeli. Tworzę tr: wiersz tabeli.
    table = node('table'), // Ustawiam table: tworzona tabela HTML.
    thead = node('thead'), // Ustawiam thead: nagłówek tabeli.
    tr = node('tr'); // Ustawiam tr: wiersz tabeli.
  headers.forEach((x) => tr.append(node('th', x))); // Wykonuję podaną operację dla każdego elementu tablicy.
  thead.append(tr); // Dołączam przygotowane elementy do rodzica w interfejsie.
  table.append(thead); // Dołączam przygotowane elementy do rodzica w interfejsie.
  const body = node('tbody'); // Tworzę body: część tabeli zawierająca wyniki.
  for (const row of rows) { // PĘTLA: dla każdego row z rows wykonuję blok.
    const tr = node('tr'); // Tworzę tr: wiersz tabeli.
    row.forEach((x) => tr.append(node('td', String(x)))); // Wykonuję podaną operację dla każdego elementu tablicy.
    body.append(tr); // Dołączam przygotowane elementy do rodzica w interfejsie.
  } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
  table.append(body); // Dołączam przygotowane elementy do rodzica w interfejsie.
  wrap.append(table); // Dołączam przygotowane elementy do rodzica w interfejsie.
  parent.append(wrap); // Dołączam przygotowane elementy do rodzica w interfejsie.
} // Koniec funkcji addTable.

// ═══ POMIARY — uruchomienie i pokazanie tabel porównań ═══
$('benchmark').addEventListener('click', () => { // ZDARZENIE „click”: podpinam funkcję reagującą na działanie użytkownika.
  const results = C.benchmark(), // Tworzę results: wyniki pomiarów algorytmów. Tworzę box: miejsce wyświetlania wyników pomiarów.
    box = $('benchmarkResults'); // Ustawiam box: miejsce wyświetlania wyników pomiarów.
  box.replaceChildren(node('h3', 'Sortowanie — porównania kluczy')); // Zastępuję dotychczasową zawartość elementu nowymi węzłami.
  addTable( // Dodaję tabelę z wynikami pomiarów.
    box, // Ciąg dalszy: Dodaję tabelę z wynikami pomiarów.
    ['Rekordy', 'Porządek', 'Porównania', 'Wzorzec'], // Ciąg dalszy: Dodaję tabelę z wynikami pomiarów.
    results.sorting.map((x) => [x.n, x.order, x.comparisons, x.consistent ? 'Zgodny' : 'NIEZGODNY']) // Wywołuję results.sorting.map z przygotowanymi argumentami.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  box.append(node('h3', 'Wyszukiwanie — 1000 rekordów')); // Dołączam przygotowane elementy do rodzica w interfejsie.
  addTable( // Dodaję tabelę z wynikami pomiarów.
    box, // Ciąg dalszy: Dodaję tabelę z wynikami pomiarów.
    ['Przypadek', 'Sprawdzone rekordy', 'Wynik'], // Ciąg dalszy: Dodaję tabelę z wynikami pomiarów.
    results.searching.map((x) => [x.scenario, x.checked, x.index < 0 ? 'Brak' : 'Pozycja ' + (x.index + 1)]) // Wywołuję results.searching.map z przygotowanymi argumentami.
  ); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  box.append(node('p', results.interpretation, 'small')); // Dołączam przygotowane elementy do rodzica w interfejsie.
}); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
showProject(); // Wczytuję aktywny projekt do formularza i odświeżam jego wynik.
