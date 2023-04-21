#include "baza.h"
#include <iostream>
#include <string>
#include <fstream>
#include <vector>
using namespace std;



void grupa::addPerson(czlowiek* k){
    gr.push_back(k);
    iloscLudzi++;
}


void grupa::grInfo(){
    cout << "|--NAUCZYCIELE--|" << endl;
    nauczycielInfo();
    cout << endl;
    cout << "|--UCZNIOWIE---|" << endl;
    uczenInfo();
}

void grupa::printInOrder(void){
    cout << "------------------------------" << endl;
    for(int i = 0; i < iloscLudzi; i++){
        cout << (i+1) << ". " << gr[i]->getImie() << " " << gr[i]->getNazwisko();
        switch(gr[i]->getId()){
            case 0:
                cout << " (Uczen)" << endl;
            break;
            case 1:
                cout << " (Nauczyciel)" << endl;
            break;
        }
    }
    cout << "------------------------------" << endl;
}


void grupa::nauczycielInfo(){
    for(int i = 0; i < iloscLudzi; i++){
        if(gr[i]->getId() == 1) gr[i]->info(); 
    }
}

void grupa::uczenInfo(){
    for(int i = 0; i < iloscLudzi; i++){
        if(gr[i]->getId() == 0) gr[i]->info(); 
    }
}

void grupa::deletePerson(int i){
    if((i <= iloscLudzi) && (i > 0)){
        gr.erase(gr.begin()+(i-1));
        iloscLudzi--;
    }
    else cout << "\nERROR: Podany czlonek grupy nie istnieje!" << endl;
}

void grupa::modifyPerson(int i){
    if((i <= iloscLudzi) && (i >= 0)){
        gr[i]->info();
        gr[i]->modify();
    }
    else cout << "\nERROR: Podany czlonek grupy nie istnieje!" << endl;
}

void grupa::clear(){
        while(iloscLudzi){
        deletePerson(1);
    }
}

void grupa::placeHolders(void){
    gr.push_back(new uczen(23, 4, 1, 1.8, "Jan", "Nowak"));
    iloscLudzi++;
    gr.push_back(new uczen(20, 0, 0, 1.5, "Arnold", "Jaworski"));
    iloscLudzi++;
    gr.push_back(new uczen(21, 2, 1, 1.7, "Zbigniew", "Kowalski"));
    iloscLudzi++;
    gr.push_back(new uczen(22, 3, 7, 2, "Zofia", "Nowakowska"));
    iloscLudzi++;
    gr.push_back(new nauczyciel(56, 1.8, "dr.", "Ambrozy", "Kleks"));
    iloscLudzi++;
    gr.push_back(new nauczyciel(30, 1.7, "mg. inz.", "Ludwig", "Chrobry"));
    iloscLudzi++;
    gr.push_back(new nauczyciel(36, 1.5, "prof.", "Jacek", "Kempa"));
    iloscLudzi++;
    gr.push_back(new nauczyciel(24000, 2, "dr hab.", "Gandalf", "Szary"));
    iloscLudzi++;
}

int grupa::getUczenNum(){
    int i = 0;
    for(int j = 0; j < iloscLudzi; j++){
        if(gr[j]->getId() == 0) i++;
    }
    return i;
}

int grupa::getNauczycielNum(){
    int i = 0;
    for(int j = 0; j < iloscLudzi; j++){
        if(gr[j]->getId() == 1) i++;
    }
    return i;
}

int grupa::findPerson(string surname){
    int i = 0;
    while(i != iloscLudzi){
        if(gr[i]->getNazwisko() == surname) break;
        i++;
    }
    if(gr[i]->getNazwisko() == surname) return (i+1);
    else return iloscLudzi+1;
}

void grupa::readFromFile(string file){
    ifstream indata;
    string specimen, ttl, im, nz;
    int wi, zd, st, type, counter = 0;
    double wzr;
    indata.open(file);
    if(!indata){
        cout << "\nERROR: Plik konfiguracyjny nie istnieje!" << endl;
        return;
    }
    while (!indata.eof()){
        counter++;
        indata >> specimen;
        switch(counter){
            case 1:
                if(specimen == "UCZEN") type = 1;
                else if (specimen == "NAUCZYCIEL") type = 2;
            break;
            case 2:
                im = specimen;
            break; 
            case 3:
                nz = specimen;
            break;
            case 4:
                wi = stoi(specimen);
            break;
            case 5:
                wzr = stod(specimen);
            break;
            case 6:
                if(type == 2) ttl = specimen;
                else zd = stoi(specimen);
            break;
            case 7:
                if(type == 2){
                    gr.push_back(new nauczyciel(wi, wzr, ttl, im, nz));
                    iloscLudzi++;
                    counter = 0;
                }
                else st = stoi(specimen);
            break;
            case 8:
                gr.push_back(new uczen(wi, zd, st, wzr, im, nz));
                iloscLudzi++;
                counter = 0;
            break;             
        }
    }
    indata.close();
}

int grupa::saveProgress(string file){
    ofstream outdata;
    outdata.open(file);
       if(!outdata){
        cout << "\nERROR: Plik konfiguracyjny nie istnieje!" << endl;
        return 0;
    }
    for(int i = 0; i < iloscLudzi; i++){
        outdata << gr[i]->saveData();
    }
    outdata.close();
    return 1;
}
