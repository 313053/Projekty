#pragma once
#ifndef NAUCZYCIEL_H
#define NAUCZYCIEL_H
#include "czlowiek.h"
#include <string>
using namespace std;

class nauczyciel: public czlowiek{
private:
    string tytul;
public:
    nauczyciel(int, double, string, string, string); //konstruktor
    void info(void); //wyswietla informacje o obiekcie
    void modify(void); //modyfikuje wybrany parametr obiektu
    string getTytul(void); //pobiera tytul obiektu
    string saveData(void); //zwraca informacje zapisywane do pliku tekstowego



};



#endif