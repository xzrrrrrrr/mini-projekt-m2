## 1. Pierwszy projekt na GitHubie

Zacznij od pytania: skąd początkujący autor wie, czy przygotował podstawowe informacje o swoim projekcie? Ten program sprawdza manifest i podpowiada kolejne poprawki. Nie loguje się do GitHuba i nie ocenia jakości kodu. Autorem oddawanej pracy jest Deividas Dirma, temat ASD1-M2-12. Za chwilę pokażę jeden projekt i drogę od braków do bardziej kompletnego opisu.

## 2. „Co jeszcze muszę uzupełnić?”

Bohaterem przykładu jest autor projektu MojaGra. Nazwa jest wpisana, plik README.md widnieje na liście, a cel jest opisany. Brakuje opisu, uruchomienia i testów. Dlatego aplikacja pokazuje 3 z 6, czyli 50 procent. Kiedy dopiszę instrukcję uruchomienia, spełnione są już 4 warunki: 66,7 procent. To poprawa o jeden warunek, nie dowód poprawności programu. Przejście: sprawdźmy, skąd bierze się ten wynik.

## 3. Sześć pytań zamiast zgadywania

Reguły są jednoznaczne. R1 sprawdza nazwę, R2 opis, R3 dokładnie README.md na liście plików, a R4, R5 i R6 sekcje celu, uruchomienia i testów. Pola tekstowe muszą być niepuste po usunięciu skrajnych spacji. R1, R3 i R5 mają rangę błędu; pozostałe są ostrzeżeniami. R4–R6 działają niezależnie od obecności README. Oprócz kontroli można importować i eksportować JSON, wygenerować szkielet README i pobrać raport. Przejście: reguły potrzebują uporządkowanych danych.

## 4. Manifest to uporządkowana lista danych

Główny obiekt ma formatVersion równy 1 i tablicę projects. Projekt ma unikalne, niezmienne ID, nazwę, opis, listę ścieżek files, sekcje readme oraz demoReady. W readme są goal, run i tests. Flaga demoReady nie jest siódmą regułą. Dozwolone jest do 1000 projektów i do 1000 plików na projekt. Reguła opisuje ID, warunek, ważność i naprawę, a wynik przechowuje spełnione reguły, problemy, kroki i liczniki. Relacja jest prosta: zestaw zawiera projekty, każdy projekt ma pliki i sekcje README.

## 5. Najpierw błąd. Potem ostrzeżenia.

Wyszukiwanie liniowe przechodzi po plikach i kończy się na pierwszym dokładnym README.md. W przykładzie odwiedza index.html i README.md, czyli dwa pliki. Potem własne sortowanie przez wstawianie ustawia problemy według ważności i numeru reguły. Początek to R2, R5, R6. R5 jest błędem, więc przechodzi przed R2. R6 pozostaje za R2. Wynik to R5, R2, R6 i dwa porównania kluczy. Wyszukiwanie kosztuje O(f); sortowanie od O(k) do O(k²) i jest stabilne. Na obronie wskażę odpowiednie pętle w core.js.

## 6. Prosty kod, trzy czytelne warstwy

Aplikacja używa HTML, CSS i JavaScript, bez frameworka. index.html tworzy formularz i natywne rozwijane sekcje. app.js obsługuje zdarzenia, szkic formularza i widok. core.js zawiera reguły, walidację, własne algorytmy i generowanie plików. Dane przenosimy w JSON w wersji 1. Nie ma trwałego zapisu po odświeżeniu, więc pracę należy wyeksportować. Import waliduje cały zestaw przed zastąpieniem. Import i eksport mają wspólny limit 20 MiB liczony w bajtach UTF-8. Błędny plik nie usuwa bieżących danych. Start: index.html lub npm start; testy: npm test.

## 7. Wynik prowadzi do następnego kroku

To aktualny, własny zrzut jasnej aplikacji, wykonany 20 listopada. Po lewej widać manifest, po prawej wynik i plan poprawek. Droga użytkownika to wczytanie przykładu, kliknięcie Sprawdź, odczyt planu i poprawienie wskazanego pola. Po edycji stary wynik jest oznaczany jako nieaktualny; trzeba wykonać nową kontrolę. Szczegóły algorytmów są w rozwijanych sekcjach. Na żywo pokażę dodanie instrukcji uruchomienia, żeby odbiorca zobaczył zmianę wyniku, a nie tylko zrzut.

## 8. 31 testów. Wyniki zgodne ze wzorcem.

Dzisiejsze npm test zakończyło się wynikiem 31 z 31. Testy obejmują przykład kontrolny, granice danych, JSON i regresje: pusty zestaw, nazwy z nową linią i limit eksportu liczony w bajtach. Tabela dotyczy liczby porównań kluczy sortowania, nie czasu. Dla n=10,100,1000 dane uporządkowane wymagają n−1 porównań, a odwrócone n(n−1)/2. Wyniki są porównane z niezależnym wzorcem. Wyszukiwanie pierwszego dopasowania dla 1000 plików odwiedza 1 plik przy trafieniu na początku oraz 1000 przy trafieniu na końcu i przy braku wyniku.

## 9. 100% to kompletność, nie gwarancja jakości

Najważniejsze ograniczenie: 100 procent oznacza jedynie spełnienie sześciu warunków manifestu. Program nie interpretuje sensu opisów, nie uruchamia kodu i nie potwierdza istnienia repozytorium. Przed oddaniem warto sprawdzić prawdziwe treści, a nie tylko wypełnić pola. Źródła: specyfikacja ASD1-M2-12, GitHub Docs — Quickstart for repositories, MDN — HTML details i JSON, dokumentacja Node.js test runner. Codex/OpenClaw pomagał przygotować kod, testy i materiały, w tym tę prezentację. Nie należy deklarować niepotwierdzonego samodzielnego wkładu. Autor powinien przed obroną przećwiczyć kod i uczciwie opisać własne zmiany oraz weryfikację.

## 10. Teraz pokażę to na żywo

Uruchomię aplikację z index.html. Najpierw wczytam MojaGra i wyjaśnię 50 procent oraz kolejność R5, R2, R6. Następnie uzupełnię uruchomienie i uzyskam 66,7 procent. Potem pokażę odrzucenie błędnego JSON-a bez utraty danych, uruchomię npm test i otworzę fragment własnego algorytmu. Będę gotowy zmienić dane lub regułę na polecenie prowadzącego. Repozytorium jest obowiązkowe; jego rzeczywisty URL i commit trzeba uzupełnić przed oddaniem. W tej wersji adres nie jest jeszcze dostępny — nie zastępujemy go fikcyjnym linkiem.