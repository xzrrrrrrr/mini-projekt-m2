// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
const fs = require('node:fs'), // Tworzę fs: wbudowany moduł operacji na plikach. Tworzę path: wbudowany moduł budowania ścieżek. Tworzę C: moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację.
  path = require('node:path'), // Ustawiam path: wbudowany moduł budowania ścieżek.
  C = require('../02-KOD-APLIKACJI/01-reguly-algorytmy-i-dane.js'); // Ustawiam C: moduł logiki RepoCore; udostępnia reguły, algorytmy i walidację.
const output = C.benchmark(); // Tworzę output: wynik pomiarów zapisywany do raportu.
fs.writeFileSync(path.join(__dirname, '../09-WYNIKI-SPRAWDZEN/wyniki-porownan.json'), JSON.stringify(output, null, 2)); // Zapisuję wygenerowane wyniki pomiarów do pliku JSON.
console.table(output.sorting); // Wypisuję wynik lub instrukcję w terminalu.
console.table(output.searching); // Wypisuję wynik lub instrukcję w terminalu.
console.log(output.interpretation); // Wypisuję wynik lub instrukcję w terminalu.
