#pragma once
#ifndef ZGRUPY_H
#define ZGRUPY_H
#include "czlowiek.h"
#include <string>
#include <vector>
using namespace std;

class uczen: public czlowiek {
private:    
    int oddaneZadania; //liczba wykonanych zadań
    int status; //status ucznia (1 - na liście, 0 - wypisany z listy)
public:
    uczen(int, int, int, double, string, string); //tworzy obiekt z podanymi wartosciami
    string saveData(void); //zwraca informacje zapisywane do pliku tekstowego
    int getZadania(void); //pobiera wartość 'oddaneZadania' obiektu
    int getStatus(void); //pobiera wartość 'status' obiektu
    void setZadania(int); //zmienia oddaną liczbę zadań ucznia
    void setStatus(int); //zmienia status ucznia
    void info(void); //wypisuje informacje o danym obiekcie
    void modify(void); //modyfikuje parametr klasy
    ~uczen(); //destruktor
};


#endif