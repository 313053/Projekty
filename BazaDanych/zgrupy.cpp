#include "zgrupy.h"
#include <iostream>
#include <string>
using namespace std;

uczen::uczen(int cz_wi, int cz_za, int cz_st, double cz_wz, string cz_im, string cz_na){
    wiek = cz_wi;
    oddaneZadania = cz_za;
    status = cz_st;
    wzrost = cz_wz;
    imie = cz_im;
    nazwisko = cz_na;
    id = 0;

}
uczen::~uczen(){};

string uczen::saveData(void){
    string out = "UCZEN ";
    out += imie + " " + nazwisko + " " + to_string(wiek) + " " + to_string(wzrost) + " " + to_string(oddaneZadania) + " " + to_string(status) + " | ";
    return out;
}

int uczen::getZadania(void){
    return oddaneZadania;
}

int uczen::getStatus(void){
    return status;
}

void uczen::info(void){
    cout << "\n___" << imie << " " << nazwisko << "___"
         << "\nWiek: " << wiek << " lat"
         << "\nWzrost: " << wzrost << " m"
         << "\nOddane Zadania: " << oddaneZadania;
    if(status == 1) cout << "\nUczen znajduje sie na liscie" << endl;
    else if (status == 0) cout << "\nUczen zostal skreslony z listy" << endl;
    else cout << "\nstatus ucznia nieznany" << endl;     
}

void uczen::setZadania(int x){
    oddaneZadania = x;
}

void uczen::setStatus(int x){
    status = x;
}

void uczen::modify(void){
    int choice, i;
    double d;
    string s; 
    cout << "\nKtory parametr zmienic?" << endl
         << "0 - status\n"
         << "1 - imie\n"
         << "2 - nazwisko\n"
         << "3 - wiek\n"
         << "4 - wzrost\n" 
         << "5 - ilosc oddanych zadan" << endl;
    cin >> choice;
    switch(choice){
        case 0:
            cout << "nowy status (1 - na liscie, 0 - wypisany z listy): ";
            cin >> i;
            status = i;
        break;
        case 1:
            cout << "nowe imie: ";
            cin >> s;
            imie = s;
        break;
        case 2:
            cout << "nowe nazwisko: ";
            cin >> s;
            nazwisko = s;
        break;
        case 3:
            cout << "nowy wiek: ";
            cin >> i;
            wiek = i;
        break;
        case 4:
            cout << "nowy wzrost (m): ";
            cin >> d;
            wzrost = d;
        break;
        case 5:
            cout << "nowa ilosc: ";
            cin >> i;
            wzrost = i;
            
    }
}