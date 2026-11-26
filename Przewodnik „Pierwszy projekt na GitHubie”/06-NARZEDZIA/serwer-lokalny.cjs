// WERSJA DO NAUKI — komentarze AI po polsku; działanie programu pozostaje takie samo.
// Kategorie i odpowiedzi do obrony: 07-INSTRUKCJE/MAPA-KODU-I-ODPOWIEDZI.md (od folderu głównego). Komentarze // nie wykonują się.
// Lokalny serwer deweloperski bez zależności; alternatywa: otwórz 01-APLIKACJA/OTWORZ-APLIKACJE.html.
const http = require('node:http'), // Tworzę http: wbudowany moduł lokalnego serwera HTTP. Tworzę fs: wbudowany moduł operacji na plikach. Tworzę path: wbudowany moduł budowania ścieżek.
  fs = require('node:fs'), // Ustawiam fs: wbudowany moduł operacji na plikach.
  path = require('node:path'); // Ustawiam path: wbudowany moduł budowania ścieżek.
const root = path.resolve(__dirname, '..'); // Tworzę root: obiekt globalny albo główny katalog projektu — znaczenie zależy od pliku.
const types = { // Tworzę types: mapa rozszerzeń plików na typ MIME.
  '.html': 'text/html; charset=utf-8', // Pole .html: tekst „text/html; charset=utf-8”.
  '.js': 'text/javascript; charset=utf-8', // Pole .js: tekst „text/javascript; charset=utf-8”.
  '.css': 'text/css; charset=utf-8', // Pole .css: tekst „text/css; charset=utf-8”.
  '.jpg': 'image/jpeg', // Pole .jpg: tekst „image/jpeg”.
  '.json': 'application/json; charset=utf-8', // Pole .json: tekst „application/json; charset=utf-8”.
  '.png': 'image/png', // Pole .png: tekst „image/png”.
  '.pdf': 'application/pdf' // Pole .pdf: tekst „application/pdf”.
}; // Zamykam obiekt grupujący powyższe pola.
http // Wywołuję http .createServer((req, res) => { let file; try { file = path.resolve(root, '.… z przygotowanymi argumentami.
  .createServer((req, res) => { // Ciąg dalszy: Wywołuję http .createServer z przygotowanymi argumentami.
    let file; // Tworzę file: wybrany plik albo ścieżka obsługiwana przez serwer.
    try { // TRY: rozpoczynam operacje, których błąd przechwycę zamiast uszkodzić stan aplikacji.
      file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); // Zapisuję wynik wywołania path.resolve do file.
    } catch { // CATCH: przechwytuję wyjątek i przygotowuję komunikat o błędzie.
      res.writeHead(400); // Wywołuję res.writeHead z przygotowanymi argumentami.
      return res.end(); // Zwracam wynik wywołania res.end.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    if (file !== root && !file.startsWith(root + path.sep)) { // JEŻELI file !== root && !file.startsWith(root + path.sep) — wykonuję następną instrukcję lub blok.
      res.writeHead(403); // Wywołuję res.writeHead z przygotowanymi argumentami.
      return res.end(); // Zwracam wynik wywołania res.end.
    } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
    if (file === root) file = path.join(root, '01-APLIKACJA/OTWORZ-APLIKACJE.html'); // JEŻELI file jest dokładnie równe root — wykonuję następną instrukcję lub blok.
    fs.readFile(file, (error, data) => { // Wywołuję fs.readFile z przygotowanymi argumentami.
      if (error) { // JEŻELI error (przechwycony błąd z opisem przyczyny) — wykonuję następną instrukcję lub blok.
        res.writeHead(404); // Wywołuję res.writeHead z przygotowanymi argumentami.
        return res.end('Nie znaleziono'); // Zwracam wynik wywołania res.end.
      } // Zamykam bieżący blok, funkcję obsługi lub listę argumentów.
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); // Wywołuję res.writeHead z przygotowanymi argumentami.
      res.end(data); // Wywołuję res.end z przygotowanymi argumentami.
    }); // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  }) // Kończę wywołanie funkcji z argumentami z poprzednich wierszy.
  .listen(8080, '127.0.0.1', () => console.log('Otwórz http://127.0.0.1:8080 · Ctrl+C kończy serwer.')); // Wypisuję wynik lub instrukcję w terminalu.
