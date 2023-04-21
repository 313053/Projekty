#pragma once
#ifndef BAZA_H
#define BAZA_H
#include <iostream>
#include <string>
#include <vector>
#include "zgrupy.h"
#include "nauczyciel.h"
using namespace std;

class grupa{
    private:
        int iloscLudzi = 0;
        vector<czlowiek*> gr;
    public:
    void addPerson(czlowiek*);
    void grInfo(void);
    void uczenInfo(void);
    void nauczycielInfo(void);
    void deletePerson(int);
    void modifyPerson(int);
    void clear(void);
    void placeHolders(void);
    void printInOrder(void);
    void readFromFile(string);
    int saveProgress(string);
    int getUczenNum(void);
    int getNauczycielNum(void);
    int findPerson(string);



};



#endif