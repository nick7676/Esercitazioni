import java.util.Scanner;

public class GestioneGarage extends Garage {
    public GestioneGarage() {
    }

    public void aggiuntaVeicolo() {

        Scanner scan = new Scanner(System.in);
        int sc = 0;

        while (true) {

            System.out.println("[ M E N U per l'aggiunta di un veicolo ]\n Premere [0] per uscire \n Premere [1] per aggiungere un furgone\n Premere [2] per aggiungere una macchina\n Premere [3] per aggiungere una moto");
            sc = scan.nextInt();
            scan.nextLine();

            if (sc == 0) {
                System.out.println("Chiusura progamma aggiunta veicolo in corso...\nRitorno al menu principale...");
                return;
            } else if (sc == 1) {
                Furgone furgone = new Furgone();
                furgone.aggiuntaFurgone();
                aggiuntaVeicolo(furgone);

            } else if (sc == 2) {

                Auto auto = new Auto();
                auto.aggiuntaAuto();
                aggiuntaVeicolo(auto);

            } else if (sc == 3) {
                Moto moto = new Moto();
                moto.aggiuntaMoto();
                aggiuntaVeicolo(moto);
            } else {
                System.out.println("Input non valido...\nRitorno al menu...");
            }
        }
    }


}
