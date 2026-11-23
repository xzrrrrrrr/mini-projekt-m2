from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from PIL import Image

D = Path(__file__).resolve().parent
P = Presentation()
P.slide_width, P.slide_height = Inches(13.333), Inches(7.5)
P.core_properties.author = 'Deividas Dirma'
P.core_properties.title = 'Pierwszy projekt na GitHubie — od braków do planu'
PURPLE, INK, MUTED, BG = '532272', '212529', '626670', 'F8F9FA'
GREEN, RED, AMBER = '176547', 'A12238', '865800'
notes = []

def text(s, value, x, y, w, h, size=23, color=INK, bold=False, font='Arial'):
    tf = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h)).text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(.02)
    tf.margin_top = tf.margin_bottom = 0
    for i, line in enumerate(value.split('\n')):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = line
        p.font.name, p.font.size, p.font.bold = font, Pt(size), bold
        p.font.color.rgb = RGBColor.from_string(color)
        p.space_after = Pt(12)

def rect(s, x, y, w, h, fill='FFFFFF', line=None, radius=True):
    sh = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    sh.fill.solid(); sh.fill.fore_color.rgb = RGBColor.from_string(fill)
    sh.line.fill.background() if line is None else None
    if line: sh.line.color.rgb = RGBColor.from_string(line)
    if radius: sh.adjustments[0] = .08
    return sh

def card(s, x, y, w, h, label, detail='', accent=PURPLE):
    rect(s,x,y,w,h)
    rect(s,x,y,.055,h,accent,radius=False)
    text(s,label,x+.23,y+.22,w-.45,.55,24,accent,True)
    if detail: text(s,detail,x+.23,y+.93,w-.45,h-1.05,21)

def arrow(s,x,y): text(s,'→',x,y,.65,.65,32,PURPLE,True)

def new(title, label, note):
    s = P.slides.add_slide(P.slide_layouts[6])
    s.background.fill.solid(); s.background.fill.fore_color.rgb=RGBColor.from_string(BG)
    rect(s,0,0,13.333,.09,PURPLE,radius=False)
    s.shapes.add_picture(str(D/'logo-uwb.jpg'), Inches(10.9), Inches(.24), width=Inches(1.8))
    text(s,label.upper(),.58,.35,10,.35,12,MUTED,True)
    text(s,title,.58,.95,12.1,1.15,34,PURPLE,True)
    n = len(P.slides)
    text(s,'Deividas Dirma · ASD1-M2-12',.6,7.1,9,.25,10,MUTED)
    text(s,f'{n:02d} / 10',11.8,7.07,.9,.3,11,MUTED)
    s.notes_slide.notes_text_frame.text = note
    notes.append((n,title,note))
    return s

s=new('Pierwszy projekt na GitHubie', 'Przewodnik · mini-projekt M2',
'''Zacznij od pytania: skąd początkujący autor wie, czy przygotował podstawowe informacje o swoim projekcie? Ten program sprawdza manifest i podpowiada kolejne poprawki. Nie loguje się do GitHuba i nie ocenia jakości kodu. Autorem oddawanej pracy jest Deividas Dirma, temat ASD1-M2-12. Za chwilę pokażę jeden projekt i drogę od braków do bardziej kompletnego opisu.''')
text(s,'Od brakujących informacji\ndo jasnego planu poprawek.',.65,3.0,6.5,1.5,30,INK,True)
text(s,'Deividas Dirma\nAlgorytmy i struktury danych I · 2026/2027',.65,5.8,7,.8,18,MUTED)
card(s,8.15,2.3,4.4,3.85,'6 prostych reguł','Manifest → kontrola → plan\n\nDziała lokalnie, bez konta.')

s=new('„Co jeszcze muszę uzupełnić?”', '01 · problem użytkownika',
'''Bohaterem przykładu jest autor projektu MojaGra. Nazwa jest wpisana, plik README.md widnieje na liście, a cel jest opisany. Brakuje opisu, uruchomienia i testów. Dlatego aplikacja pokazuje 3 z 6, czyli 50 procent. Kiedy dopiszę instrukcję uruchomienia, spełnione są już 4 warunki: 66,7 procent. To poprawa o jeden warunek, nie dowód poprawności programu. Przejście: sprawdźmy, skąd bierze się ten wynik.''')
rect(s,.65,2.4,3.7,2.9)
rect(s,.65,2.4,.055,2.9,PURPLE,radius=False)
text(s,'Projekt demonstracyjny\n«MojaGra»',.88,2.62,3.25,1.05,22,PURPLE,True)
text(s,'Początkujący autor\nNie wie, czego brakuje.',.88,3.95,3.25,1.1,21)
arrow(s,4.6,3.4)
card(s,5.3,2.4,2.8,2.9,'50%','3 z 6 reguł\nPrzed poprawką')
arrow(s,8.4,3.4)
card(s,9.1,2.4,3.55,2.9,'66,7%','4 z 6 reguł\nPo dodaniu uruchomienia',GREEN)
text(s,'Jedna konkretna zmiana. Widoczny postęp.',.7,5.9,12,.7,26,INK,True)

s=new('Sześć pytań zamiast zgadywania', '02 · funkcje i reguły',
'''Reguły są jednoznaczne. R1 sprawdza nazwę, R2 opis, R3 dokładnie README.md na liście plików, a R4, R5 i R6 sekcje celu, uruchomienia i testów. Pola tekstowe muszą być niepuste po usunięciu skrajnych spacji. R1, R3 i R5 mają rangę błędu; pozostałe są ostrzeżeniami. R4–R6 działają niezależnie od obecności README. Oprócz kontroli można importować i eksportować JSON, wygenerować szkielet README i pobrać raport. Przejście: reguły potrzebują uporządkowanych danych.''')
card(s,.65,2.3,5.8,3.45,'Czy są podstawy?', 'R1 Nazwa  +  R2 Opis\nR3 README.md  +  R4 Cel\nR5 Uruchomienie  +  R6 Testy')
card(s,6.8,2.3,5.85,3.45,'Co dostaje użytkownik?', 'Plan: błędy przed ostrzeżeniami\nPonowną kontrolę po edycji\nJSON, szkielet README i raport')
text(s,'100% oznacza kompletność deklaracji — nie jakość kodu.',.7,6.15,12,.5,22,PURPLE,True)

s=new('Manifest to uporządkowana lista danych', '03 · model danych',
'''Główny obiekt ma formatVersion równy 1 i tablicę projects. Projekt ma unikalne, niezmienne ID, nazwę, opis, listę ścieżek files, sekcje readme oraz demoReady. W readme są goal, run i tests. Flaga demoReady nie jest siódmą regułą. Dozwolone jest do 1000 projektów i do 1000 plików na projekt. Reguła opisuje ID, warunek, ważność i naprawę, a wynik przechowuje spełnione reguły, problemy, kroki i liczniki. Relacja jest prosta: zestaw zawiera projekty, każdy projekt ma pliki i sekcje README.''')
card(s,.65,2.5,3.45,3.25,'Zestaw JSON','formatVersion: 1\nprojects: [...]')
arrow(s,4.22,3.6)
card(s,4.95,2.5,3.45,3.25,'Projekt','ID · nazwa · opis\npliki · README\ndemoReady')
arrow(s,8.5,3.6)
card(s,9.2,2.5,3.45,3.25,'Wynik','Spełnione reguły\nLista problemów\nKroki i liczniki')
text(s,'ID jest unikalne i niezmienne. Dane są sprawdzane przed zapisem.',.7,6.15,12,.5,21,MUTED)

s=new('Najpierw błąd. Potem ostrzeżenia.', '04 · własny algorytm',
'''Wyszukiwanie liniowe przechodzi po plikach i kończy się na pierwszym dokładnym README.md. W przykładzie odwiedza index.html i README.md, czyli dwa pliki. Potem własne sortowanie przez wstawianie ustawia problemy według ważności i numeru reguły. Początek to R2, R5, R6. R5 jest błędem, więc przechodzi przed R2. R6 pozostaje za R2. Wynik to R5, R2, R6 i dwa porównania kluczy. Wyszukiwanie kosztuje O(f); sortowanie od O(k) do O(k²) i jest stabilne. Na obronie wskażę odpowiednie pętle w core.js.''')
card(s,.65,2.2,5.45,3.95,'Pseudokod','Szukaj: idź po plikach do README.md.\n\nSortuj: weź następny problem;\nprzesuń większe klucze;\nwstaw go na wolne miejsce.')
text(s,'PRZED',6.7,2.25,5,.35,13,MUTED,True)
text(s,'R2  ·  R5  ·  R6',6.7,2.75,5.7,.6,30,INK,True)
text(s,'DECYZJA: R5 to błąd → idzie na początek',6.7,3.55,5.7,.8,20,RED,True)
text(s,'PO',6.7,4.45,5,.35,13,MUTED,True)
text(s,'R5  →  R2  →  R6',6.7,4.95,5.7,.6,30,PURPLE,True)
text(s,'2 odwiedzone pliki · 2 porównania kluczy',.7,6.4,12,.4,21,MUTED)

s=new('Prosty kod, trzy czytelne warstwy', '05 · technologia i zapis',
'''Aplikacja używa HTML, CSS i JavaScript, bez frameworka. index.html tworzy formularz i natywne rozwijane sekcje. app.js obsługuje zdarzenia, szkic formularza i widok. core.js zawiera reguły, walidację, własne algorytmy i generowanie plików. Dane przenosimy w JSON w wersji 1. Nie ma trwałego zapisu po odświeżeniu, więc pracę należy wyeksportować. Import waliduje cały zestaw przed zastąpieniem. Import i eksport mają wspólny limit 20 MiB liczony w bajtach UTF-8. Błędny plik nie usuwa bieżących danych. Start: index.html lub npm start; testy: npm test.''')
card(s,.65,2.35,3.65,2.7,'index.html','Formularz i układ\nstyle.css: wygląd')
arrow(s,4.45,3.25)
card(s,5.1,2.35,3.3,2.7,'app.js','Kliknięcia i edycja\nPrezentacja wyników')
arrow(s,8.5,3.25)
card(s,9.2,2.35,3.45,2.7,'core.js','Reguły i algorytmy\nWalidacja danych')
rect(s,.65,5.6,12,1,'EDEDED')
text(s,'Zapis: eksport JSON  ↔  import JSON   ·   limit 20 MiB',.95,5.88,11.4,.5,24,PURPLE,True)

s=new('Wynik prowadzi do następnego kroku', '06 · działająca aplikacja',
'''To aktualny, własny zrzut jasnej aplikacji, wykonany 20 listopada. Po lewej widać manifest, po prawej wynik i plan poprawek. Droga użytkownika to wczytanie przykładu, kliknięcie Sprawdź, odczyt planu i poprawienie wskazanego pola. Po edycji stary wynik jest oznaczany jako nieaktualny; trzeba wykonać nową kontrolę. Szczegóły algorytmów są w rozwijanych sekcjach. Na żywo pokażę dodanie instrukcji uruchomienia, żeby odbiorca zobaczył zmianę wyniku, a nie tylko zrzut.''')
img=D/'interfejs-fragment.png'
Image.open(D/'interfejs-50.png').crop((0,0,1440,950)).save(img)
iw,ih=Image.open(img).size
w=7.35; h=w*ih/iw
s.shapes.add_picture(str(img), Inches(.65), Inches(2.05), width=Inches(w), height=Inches(h))
x=max(8.25,w+.95)
text(s,'1  Wczytaj przykład\n2  Sprawdź plan\n3  Popraw i sprawdź ponownie',x,2.6,12.65-x,2.7,23,INK,True)
text(s,'Rzeczywisty zrzut\n20.11.2026',x,5.8,12.65-x,.8,16,MUTED)

s=new('31 testów. Wyniki zgodne ze wzorcem.', '07 · testy i porównania',
'''Dzisiejsze npm test zakończyło się wynikiem 31 z 31. Testy obejmują przykład kontrolny, granice danych, JSON i regresje: pusty zestaw, nazwy z nową linią i limit eksportu liczony w bajtach. Tabela dotyczy liczby porównań kluczy sortowania, nie czasu. Dla n=10,100,1000 dane uporządkowane wymagają n−1 porównań, a odwrócone n(n−1)/2. Wyniki są porównane z niezależnym wzorcem. Wyszukiwanie pierwszego dopasowania dla 1000 plików odwiedza 1 plik przy trafieniu na początku oraz 1000 przy trafieniu na końcu i przy braku wyniku.''')
rect(s,.65,2.3,3.6,3.5,PURPLE)
text(s,'31 / 31',.95,2.85,3,.9,49,'FFFFFF',True)
text(s,'testów zaliczonych\nnpm test · 20.11.2026',.95,4.15,3,1,20,'FFFFFF')
text(s,'Porównania kluczy w sortowaniu',4.8,2.35,7.6,.6,23,INK,True)
table=s.shapes.add_table(4,3,Inches(4.8),Inches(3.15),Inches(7.8),Inches(2.45)).table
data=[['Rekordy','Uporządkowane','Odwrócone'],['10','9','45'],['100','99','4 950'],['1 000','999','499 500']]
for i,row in enumerate(data):
    for j,value in enumerate(row):
        c=table.cell(i,j);c.text=value;c.fill.solid();c.fill.fore_color.rgb=RGBColor.from_string(PURPLE if i==0 else 'FFFFFF')
        for p in c.text_frame.paragraphs:
            p.font.name='Arial';p.font.size=Pt(18);p.font.bold=i==0;p.font.color.rgb=RGBColor.from_string('FFFFFF' if i==0 else INK)
text(s,'Odwrócone dane → więcej przesunięć i porównań.',4.8,6.05,7.8,.7,22,PURPLE,True)

s=new('100% to kompletność, nie gwarancja jakości', '08 · wnioski i źródła',
'''Najważniejsze ograniczenie: 100 procent oznacza jedynie spełnienie sześciu warunków manifestu. Program nie interpretuje sensu opisów, nie uruchamia kodu i nie potwierdza istnienia repozytorium. Przed oddaniem warto sprawdzić prawdziwe treści, a nie tylko wypełnić pola. Źródła: specyfikacja ASD1-M2-12, GitHub Docs — Quickstart for repositories, MDN — HTML details i JSON, dokumentacja Node.js test runner. Codex/OpenClaw pomagał przygotować kod, testy i materiały, w tym tę prezentację. Nie należy deklarować niepotwierdzonego samodzielnego wkładu. Autor powinien przed obroną przećwiczyć kod i uczciwie opisać własne zmiany oraz weryfikację.''')
card(s,.65,2.4,3.75,3.5,'Co wiemy?', 'Sześć warunków\nzostało spełnionych.',GREEN)
card(s,4.8,2.4,3.75,3.5,'Czego nie wiemy?', 'Czy kod działa?\nCzy opis jest prawdziwy?',AMBER)
card(s,8.95,2.4,3.7,3.5,'Na czym bazujemy?', 'Specyfikacja, MDN,\nGitHub Docs, Node.js\nWsparcie: Codex/OpenClaw')

s=new('Teraz pokażę to na żywo', '09 · demonstracja i repozytorium',
'''Uruchomię aplikację z index.html. Najpierw wczytam MojaGra i wyjaśnię 50 procent oraz kolejność R5, R2, R6. Następnie uzupełnię uruchomienie i uzyskam 66,7 procent. Potem pokażę odrzucenie błędnego JSON-a bez utraty danych, uruchomię npm test i otworzę fragment własnego algorytmu. Będę gotowy zmienić dane lub regułę na polecenie prowadzącego. Repozytorium jest obowiązkowe; jego rzeczywisty URL i commit trzeba uzupełnić przed oddaniem. W tej wersji adres nie jest jeszcze dostępny — nie zastępujemy go fikcyjnym linkiem.''')
card(s,.65,2.4,3.65,2.45,'01 · Przykład','50% → wyjaśnienie\nPoprawka → 66,7%')
card(s,4.85,2.4,3.65,2.45,'02 · Błędne dane','Odrzucony JSON\nBieżąca praca zostaje')
card(s,9,2.4,3.65,2.45,'03 · Kod i testy','npm test\nZmiana danych lub reguły')
rect(s,.65,5.55,12,1.05,'F7ECDC')
text(s,'GitHub: przed oddaniem uzupełnij prawdziwy URL i commit.',.95,5.88,11.4,.5,22,AMBER,True)

P.save(D/'prezentacja-story.pptx')
check=Presentation(D/'prezentacja-story.pptx')
assert len(check.slides)==10
assert all(len(sl.notes_slide.notes_text_frame.text)>100 for sl in check.slides)
(D/'NOTATKI-PRELEGENTA.md').write_text('\n\n'.join(f'## {n}. {title}\n\n{note}' for n,title,note in notes))
print('10 slides, 10 speaker notes, editable text and diagrams')
