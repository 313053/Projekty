#pragma once
#ifndef CZLOWIEK_H
#define CZLOWIEK_H
#include <string>
using namespace std;

class czlowiek{
protected:
    int wiek;
    int id; //0 - uczen     1 - nauczyciel
    double wzrost;
    string imie;
    string nazwisko;
public:
    virtual void info() = 0; //wyświetla informacje o osobie
    virtual void modify() = 0; //modyfikuje wybrany parametr
    virtual string saveData(void) = 0; //zwraca informacje zapisywane do pliku konfiguracyjnego
    int getWiek(void); //pobiera wartość 'wiek' obiektu
    double getWzrost(void); //pobiera wartość 'wzrost' obiektu
    int getId(void); //pobiera id
    string getImie(void); //pobiera wartość 'imie' obiektu
    string getNazwisko(void); //pobiera wartość 'nazwisko' obiektu
};

#endif