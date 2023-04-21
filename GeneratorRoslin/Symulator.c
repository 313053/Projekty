#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "turtle.h"

// Granica rozmiaru tabeli oraz liczba kroków
#define SIZE 10000

struct Config
{
    int iter;
    int angle;
};

//Funkcja dzieląca łańcuch znaków po wykryciu podanego znaku o wartości const char (potrzebna do czytania pliku config)
char * strtok( char *, const char *);
// Funkcja odczytująca informacje z pliku config
void readConfig(int, int);

// Funkcja kopiująca wnętrze jednej tablicy do drugiej
void copy(char* , char*);

// Funkcja budująca układ Lindenmayera
void expandTree(char* , char*, int);

// Funkcja rysująca drzerwo
void drawTree(char* , int , int, int, int);

// Funkcja drukująca tablicę do konsoli
void printSystem(char*, FILE *);


int main()
{
    // Tablice zawierające dane do układu Lindemayera. Jedna zawiera aktualne dane do użytku,
    // a na drugiej wykonywane są przekształcenia.
    char treeTab[SIZE] = {'B'};
    char treeHelp[SIZE] = {'B'};
    char *tree = treeTab;
    char *treeHid = treeHelp;
    struct Config config;
    char * line = NULL;
    char *odczyt;
    size_t lenght;
    int i, n = 1;
    FILE* config_file = fopen("config.txt", "r");
    if (config_file == NULL)
    {
        printf("UWAGA: NIE WYKRYTO POTRZEBNYCH INFORMACJI W PLIKU KONFIGURACYJNYM");
    }
    while(getline(&line, &lenght, config_file) != -1)
    {
        odczyt = strtok(line, "=");
        i = 1;
        while( odczyt != NULL )
        {
            if(i == 2)
            {
                if(n==1) 
                {
                    config.iter = atoi(odczyt);
                }
                else if(n==2) 
                {
                    config.angle = atoi(odczyt);
                }
            }
            odczyt = strtok(NULL, "=");
            i++;
        }
        n++;
    }
    if((config.angle <= 0) || (config.angle >= 360) ) printf("UWAGA: NIEODPOWIEDNIE WARTOŚCI W PLIKU KONFIGURACYJNYM");
    // Funckja tworzy zestaw informacji o czym je wykonuje przy użyciu biblioteki turtle.h.
    expandTree(tree, treeHid, config.iter);
    drawTree(tree, 50, 80, config.angle, config.iter);
    FILE *wp = fopen("dane.txt", "w");
    printf("Algorytm Wzrostu \n A - galezie drzewa \n B - koncowki drzewa \n < - skret w lewo \n > - skret w prawo \n\n");
    system("pause");
    printSystem(tree, wp);
    fclose(wp);
    printf("\n\nDane zostaly zapisane w pliku .txt.\nGraficzna reprezentacja zostala zapisana w pliku .bmp.\n\n");
    system("pause");
}

// Fukcja po koleji drukuje elementy tablicy
void printSystem(char *g, FILE *wp)
{
    for(int i = 0; i < SIZE; i++)
    {
        if(*(g+i) != 0) 
        {
            printf("%c", *(g+i));
            fprintf(wp, "%c", *(g+i));
        }
    }
}

//Funkcja progresywnie kopiuje wszystkie miejsca z jednej tabeli do drugiej
void copy(char *g, char *h)
{
    for(int i = 0; i < SIZE; i++)
    {
        *(g+i) = *(h+i);
    }
}

// Funkcja na podstawie odczytanej litery decyduje jak ma wyglądać tablica w kolejnej iteracji. Każde A zamieniane jest na A A,
// a każde B zamieniane jest na A < B > A
void expandTree(char *g, char *h, int iter)
{
    int add = 0;

    for(int i = 0; i <= iter; i++)
    {
        for(int j = 0; j < SIZE; j++)
        {
            if(*(g+j) == 'A')
            {
                *(h+add) = 'A';

                add++;

                *(h+add) = 'A';
                add++;
            }

            else if(*(g+j) == 'B')
            {

                *(h+add) = 'A';

                add++;

                *(h+add) = '<';

                add++;

                *(h+add) = 'B';

                add++;

                *(h+add) = '>';

                add++;

                *(h+add) = 'B';

                add++;
            }

            else if(*(g+j) == '<')
            {
                *(h+add) = '<';
                add++;
            }
            else if(*(g+j) == '>')
            {
                *(h+add) = '>';
                add++;
            }
        }

        add = 0;

        copy(g, h);
    }
}

// Funkcja rysuje graf interpretując znaki w tablicy.
void drawTree(char *g, int width, int height, int angle, int iter)
{
    int backupTab[SIZE][3];
    int k = 0;
    int h = 90;

    height += (40/(2.5*iter)) * pow(2,iter);
    for(int i = 0; i < SIZE; i++)
    {
        if(*(g+i) != 0)
        {
            width += (20/(2.5*iter));           // Funkcja zwiększa długość i szerokość płótna bazując na ilośći iteracji
            height += (20/(2.5*iter));
        }
    }

    turtle_init(width, height);
    turtle_pen_up();
    turtle_goto(0, -1 * height/3 );
    turtle_set_heading(90);
    turtle_begin_video(height/4);

    for(int i = 0; i < SIZE; i++)
    {
        turtle_pen_down();
        if(*(g+i) != 0)
        {
            if(*(g+i) == 'B') turtle_forward(40/(2*iter));

            if(*(g+i) == 'A') turtle_forward(60/(2*iter));    // Funkcja dobiera długość każdego przejścia bazując na ilości iteracji

            if(*(g+i) == '<')
            {
                backupTab[k][0] = turtle_get_x();
                backupTab[k][1] = turtle_get_y();   // Funkcja zapisuje miejsca oraz kąt 'żółwia' do których później wraca
                backupTab[k][2] = h;
                k++;
                turtle_turn_left(angle);
                h += angle;
            }
             if(*(g+i) == '>')
            {
                k--;
                turtle_pen_up();
                turtle_goto(backupTab[k][0], backupTab[k][1]);  // Funkcja odstawia 'żółwia' w odpowienie miejsce
                turtle_set_heading(backupTab[k][2]);
                h = backupTab[k][2];
                turtle_pen_down();
                turtle_turn_right(angle);
                h -= angle;
            }
        }
    }
    turtle_pen_up();
    turtle_end_video();
    turtle_save_bmp("Drzewo.bmp");
}

