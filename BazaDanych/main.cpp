#include <iostream>
#include <string>

#include "zgrupy.h"
#include "nauczyciel.h"
#include "baza.h"
using namespace std;

int main(){
    int ui, wi, zd, st, val;
    string ttl, im, nz, input;
    double wz;
    grupa *gr = new grupa();
    
    // INICJACJA WEKTORA // 
    //gr->readFromFile("data.txt");
    //------------------//
    while (ui){
        cout << "\nBAZA DANYCH V2.0\n" 
            << "1 - Dodaj czlonka grupy\n"
            << "2 - wyswietl liste czlonkow grupy\n"
            << "3 - wyswietl nauczycieli\n"
            << "4 - wyswietl uczniow\n"
            << "5 - wyswietl liste w kolejnosci dodania\n"
            << "6 - usun czlonka grupy\n"
            << "7 - wyczysc liste\n"
            << "8 - zmodyfikuj czlonka grupy\n"
            << "9 - wczytaj grupe z pliku\n"
            << "10 - zapisz postep\n"
            << "0 - wyjscie z programu\n"

            << "\nWybierz opcje: ";
        cin >> ui;
        cout << endl;
        switch(ui){
            case 0:
                return 0;
            break;
            case 1:
                cout << "Student czy nauczyciel? ( 0 - student      1 - nauczyciel): ";
                cin >> val; 
                cout << endl;
                switch(val){
                    case 0:
                        cout << "Podaj imie: ";
                        cin >> im;
                        cout << "\nPodaj nazwisko: ";
                        cin >> nz;
                        cout << "\nPodaj wiek: ";
                        cin >> wi;
                        cout << endl;
                        cout << "Podaj wzrost: ";
                        cin >> wz;
                        cout << "\nPodaj liczbe oddanych zadan: ";
                        cin >> zd;
                        cout << "\nPodaj status ucznia (1 - na liscie, 0 - wypisany z listy): ";
                        cin >> st;                      
                        gr->addPerson(new uczen(wi, zd, st, wz, im, nz));
                    break;
                    case 1:
                        cout << "\nPodaj tytul: ";
                        cin >> ttl;
                        cout << "\nPodaj imie: ";
                        cin >> im;
                        cout << "\nPodaj nazwisko: ";
                        cin >> nz;
                        cout << "\nPodaj wiek: ";
                        cin >> wi;
                        cout << endl;
                        cout << "Podaj wzrost (m): ";
                        cin >> wz;
                        gr->addPerson(new nauczyciel(wi, wz, ttl, im, nz));
                    break;    
                }
            break;
            case 2:
                gr->grInfo();
            break;
            case 3:
                gr->nauczycielInfo();
            break;
            case 4:
                gr->uczenInfo();
            break;
             case 5:
                gr->printInOrder();
            break;
            case 6:
                cout << "Szukac po nazwisku czy kolejnosci w grupie?(1 - po nazwisku    0 - po kolejnosci w grupie): ";
                cin >> val;
                cout << endl;
                switch(val){
                    case 0:
                        cout << "Podaj numer w kolejnosci: ";
                        cin >> wi;
                        gr->deletePerson(wi);
                    break;
                    case 1:
                        cout << "Podaj nazwisko: ";
                        cin >> input;
                        wi = gr->findPerson(input);
                        gr->deletePerson(wi);
                    break;
                }
            break;
            case 7:
                gr->clear();
            break;
            case 8:
                cout << "Szukac po nazwisku czy kolejnosci w grupie?(1 - po nazwisku    0 - po kolejnosci w grupie): ";
                cin >> val;
                cout << endl;
                switch(val){
                    case 0:
                        cout << "Podaj numer w kolejnosci: ";
                        cin >> wi;
                        gr->modifyPerson(wi-1);
                    break;
                    case 1:
                        cout << "Podaj nazwisko: ";
                        cin >> input;
                        wi = gr->findPerson(input);
                        gr->modifyPerson(wi-1);
                    break;
                }

            break;
            case 9:
                gr->clear();
                cout << "Podaj nazwe pliku (domyslny plik - data.txt): ";
                cin >> input;
                gr->readFromFile(input);
            break;
            case 10:
                cout << "Podaj nazwe pliku (domyslny plik - data.txt): ";
                cin >> input;
                val = gr->saveProgress(input);
                if(val == 1) cout << "zapisanie zakonczone sukcesem!" << endl;
                else cout << "ERROR: zapisanie zakonczone niepowodzeniem" << endl;
        }     
    }
    return 0;
}