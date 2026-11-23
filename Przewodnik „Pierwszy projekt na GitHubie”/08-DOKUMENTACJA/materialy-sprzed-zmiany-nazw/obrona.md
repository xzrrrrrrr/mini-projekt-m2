# Przygotowanie Deividasa do obrony

## Plan pokazu (po 10 slajdach)
1. Otwórz index.html z rozpakowanego katalogu. Wskaż manifest i zakres kontroli.
2. Przykład MojaGra: przejdź R1–R6. Prawidłowy wynik 3/6 = 50%.
3. Dlaczego R5 przed R2? R5 jest błędem, R2 ostrzeżeniem — nie sortujemy
   tylko według numeru. R6 pozostaje za R2, bo oba są ostrzeżeniami.
4. Wyjaśnij stan po pierwszym wstawieniu R5 przed R2. Pokaż drugi krok i 2
   porównania; przeszukanie index.html, README.md daje 2 sprawdzone pliki.
5. Wpisz „Otwórz index.html” w uruchomieniu. Stary wynik jest oznaczony.
   Kliknij Sprawdź: 4/6 = 66,7%; różnica +1; problem R5 znika.
6. Wpisz ../README.md w listę plików: operacja odrzucona, zobacz wyjaśnienie.
   Przywróć poprawne ścieżki. Import wadliwego JSON nie kasuje zestawu.
7. Pobierz README, raport i JSON. Import JSON ma potwierdzenie; pokaż anulowanie.
8. Rozwiń porównania i wykonaj je. Wyjaśnij wzory n−1 i n(n−1)/2.
9. W terminalu w katalogu projektu uruchom npm test. Otwórz wybraną asercję.
10. Pokaż src/core.js i zmień dane lub regułę, o którą poprosi prowadzący.

## Fragmenty kodu, które trzeba rozumieć
- core.js: RULES, conditions w checkProject; funkcje linearSearch, insertionSort,
  compareIssues oraz validateEnvelope.
- app.js: candidate przed state=candidate; replaceAll potwierdza import dopiero
  po walidacji całego pliku. renderResult używa textContent.
- index.html: details/summary to natywne rozwijanie bez JS.
- tests/core.test.cjs: przykład kontrolny i test stabilności remisów.

## Pytania i odpowiedzi do przećwiczenia
**Czy 100% dowodzi działania repozytorium?** Nie. Sprawdzamy deklarację,
nie wykonujemy kodu, nie pytamy GitHuba, nie weryfikujemy prawdziwości instrukcji.
**Czy „testy: abc” wystarczy?** Tak dla R6: wymaganiem jest niepusta sekcja,
a nie analiza jakości testów. To świadome ograniczenie tej aplikacji.
**Dlaczego README.md dokładnie?** Tak określono R3; systemy rozróżniają
wielkość liter, docs/README.md to inna ścieżka.
**Dlaczego R4–R6 przy braku pliku?** Sprawdzamy niezależne pola manifestu;
prowadzący wprost nakazuje niezależność od R3.
**Czy demoReady zwiększa procent?** Nie, sześć warunków jest zamkniętym zbiorem.
**Co oznacza checked?** Liczbę odwiedzonych elementów faktycznej pętli;
trafienie na początku kończy ją po jednym sprawdzeniu.
**Dlaczego sortowanie stabilne?** Przesuwamy tylko, gdy compare>0, nie przy remisie.
**Dlaczego 1000 rekordów, skoro 6 reguł?** Benchmark syntetycznych rekordów
bada algorytm tym samym komparatorem; kontrola projektu ma najwyżej 6 problemów.
**Dlaczego nie gotowe sort()?** Własny algorytm jest wymagany; sort() tylko jako wzorzec.
**Co z niezapisanymi zmianami?** Formularz to szkic; aktualny stan jest zatwierdzany
po walidacji. Nie ma trwałego zapisu po odświeżeniu — trzeba eksportować JSON.

## Krótkie ćwiczenia własne
- Zmień name na spacje i przewidź wynik, zanim klikniesz Sprawdź.
- Usuń README.md, ale zachowaj sekcje — przewidź tylko zmianę R3.
- Wypełnij wszystkie pola, uzyskaj 100%, a następnie wpisz nic nieznaczące treści.
- Prześledź sortowanie odwróconych 3 kluczy na kartce.
- Znajdź test, który zawiedzie po zmianie porządku ważności.
- Spróbuj obsłużyć formularz Tabem i otworzyć szczegóły Enterem.

Te notatki nie są dowodem opanowania materiału; przećwicz pokaz samodzielnie.
