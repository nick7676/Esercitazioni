import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        GestioneGarage garage = new GestioneGarage();

        int sc = 0;

        while (true) {

            System.out.println("| M E N U |\nBenvenuto nella gestione garage!\n Premere [0] per uscire\n Premere [1] per aggiungere un veicolo \n Premere [2] per stampare i veicoli aggiunti al garage\n Premere [3] per rimuovere un veicolo\n Premere [4] per visualizzare quante 4 porte sono presenti nel garage");
            sc = scan.nextInt();
            scan.nextLine();

            if (sc == 0) {
                System.out.println("Programma in chiusura...");
                System.exit(0);
            } else if (sc == 1) {
                garage.aggiuntaVeicolo();
            } else if (sc == 2) {
                garage.stampaVeicoli();
            } else if (sc == 3) {
                garage.rimozioneVeicolo();
            } else if (sc == 4) {
                garage.conteggioPorte();
            } else {
                System.out.println("Input non valido...\nRitorno al menu...");
            }
        }

    }
}
