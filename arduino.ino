const int brocheCapteur = 2;
const int brocheLEDRouge = 11; 
const int brocheLEDVerte = 12;
int valeurCapteur = 0;

void setup () {
    pinMode(brocheLEDVerte, OUTPUT);
    pinMode(brocheLEDRouge, OUTPUT);
    pinMode(brocheCapteur, INPUT) ;
}

