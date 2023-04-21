#include "nauczyciel.h"
#include <iostream>
#include <string>
using namespace std;

nauczyciel::nauczyciel(int wi, double wz, string ttl, string im, string nz){
    wiek = wi;
    wzrost = wz;
    tytul = ttl;
    imie = im;
    nazwisko = nz;
    id = 1;
}

string nauczyciel::getTytul(){
    return tytul;
}

string nauczyciel::saveData(void){
    string out = "NAUCZYCIEL ";
    out += imie + " " + nazwisko + " " + to_string(wiek) + " " + to_string(wzrost) + " " + tytul + " | ";
    return out;
}

void nauczyciel::info(){
    cout << "\n___" << tytul << " " << imie << " " << nazwisko << "___" << endl
         << "Wiek: " << wiek << " lat" << endl
         << "Wzrost: " << wzrost << " m" << endl;
}

void nauczyciel::modify(void){
    int choice, i;
    double d;
    string s; 
    cout << "\nKtory parametr zmienic?" << endl
         << "0 - tytul\n"
         << "1 - imie\n"
         << "2 - nazwisko\n"
         << "3 - wiek\n"
         << "4 - wzrost" << endl;
    cin >> choice;
    switch(choice){
        case 0:
            cout << "nowy tytul: ";
            cin >> s;
            tytul = s;
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
    }
}