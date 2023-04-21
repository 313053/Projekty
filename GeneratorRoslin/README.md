### SYMULATOR WZROSTU ROŚLIN

### Wstęp
Podczas nauki wiele uczniów uważa oraz traktuje matematykę
jako dziedzinę nauki która w dużym stopniu nie występuje w przyrodzie.
W wyniki tego duża ilość osób młodszych, a także starszych 
ma trudności ze zrozumieniem zapotrzebowania na matematykę w 
pozostałych dziedzinach nauki oraz życiu codziennym. 
Skutkiem tego jest obniżony entuzjazm uczniów oraz częsta niechęć
do matematyki towarzysząca dużej ilości społeczeństwa bez względu na wiek.

Jednym z możliwych rozwiązań tego problemu jest pokazanie (zwłaszcza osobom w weku dojrzewającym)
widocznego połączenia między matematyką a przyrodą. 

Ten program stara się wykonać to zadanie poprzez zaimplementowanie fraktali
(na bazie układów Lindenmayera) w tworzeniu modelów roślin.
Osoba przedstawiająca występowanie matematyki w przyrodzie może użyć tego programu,
aby pokazać fraktalne baldachimy przypominające wygląd różnorodnych roślin.
Po włączeniu programu w konsoli pokazuje się legenda tłumacząca ukończony układ
Lindemayera który pokazuje się po kliknięciu dowolnego przycisku. Symulacja rośliny
zapisuje się w pliku bmp w tym samym folderze co program, a sam układ kopiowany jest
do pliku tekstowego.

Jedną z zalet tego programu jest fakt, że osoba korzystająca z programu może
dopasować odpowiednią ilość iteracji oraz kąt, z jakim fraktalny baldachim 
będzie rozwijany. Program jest także względnie prosty w użyciu oraz jedynie wymaga
działającego kompilatora i odpowiedniej ilości pamięci na komputerze. Oprócz samej
bitmapy finałowej wersji baldachimu program zapisuje też bitmapy w odpowiednich etapach
symulacji aby zaprezentować zmiany zachodzące podczas tworzenia grafu.

### Przykład Użycia
![Zdjęcie konsoli](https://github.com/IS-UMK/mp-2022-jpro-project-313053/blob/master/Zrzuty%20ekranu/Konsola.PNG)
![Przykładowy graf](https://github.com/IS-UMK/mp-2022-jpro-project-313053/blob/master/Zrzuty%20ekranu/Ro%C5%9Blina1.PNG)
![Przykładowy graf](https://github.com/IS-UMK/mp-2022-jpro-project-313053/blob/master/Zrzuty%20ekranu/Ro%C5%9Blina2.PNG)

### Dodatkowe Biblioteki
Program korzysta z darmowej biblioteki Turtle.h

### Instrukcja Użytkowania
Aby skorzystać z programu należy wejść do pliku config.txt i wpisać odpowiednie wartości.
Wartość iter odpowiada za odpowiednią ilość iteracji w układzie Lindenmayera (maksymalnie 8),
a wartość angle odpowiada za kąt gałęzi (realizm zachowany jest najlepiej w zakresie około 5-70).

Po ustaleniu wartości należy skompilować program. Do tego wymagany jest darmowy kompilator gcc.
Aby to zrobić należy otworzyć wiersz polecenie (lub inny terminal według własnego wyboru) i
przejść do katalogu z programem przy użyciu funkcji cd. Następnie należy wpisać w konsoli
"gcc -o Symulator Symulator.c Turtle.c". Program powinien się skompilować bez problemów.

Następnie należy włączyć plik .exe, co można zrobić wpisując "Symulator.exe" do konsoli, bądź klikając
na nowo utworzony plik w folderze z oprogramowaniem.

Po włączeniu należy podążać za instrukcjami wyświetlonymi w oknie terminalu. Po użyciu programu w folderze 
pojawią się odpowiednie bitmapy oraz plik tekstowy z utworzonym układem Lindemayera.

UWAGA: Po ponownym użyciu program nadpisze poprzednie bitmapy znajdujące się w folderze.


