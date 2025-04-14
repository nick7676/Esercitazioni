import java.util.Scanner;

public class Auto extends Veicolo {

    public Auto() {
    }

    public void aggiuntaAuto() {

        Scanner scan = new Scanner(System.in);

        String alimentanzione;

        System.out.println("Aggiungi la Targa: ");
        String targa = scan.nextLine();
        setTarga(targa);

        System.out.println("Aggiungi la marca: ");
        String marca = scan.nextLine();
        setMarca(marca);

        System.out.println("Aggiungi la cilindrata: ");
        int cilindrata = scan.nextInt();
        setCilindrata(cilindrata);

        System.out.println("Inserisci l'anno di matricolazione: ");
        int matricolazione = scan.nextInt();
        setMatricolazione(matricolazione);
        scan.nextLine();

        System.out.println("Inserisci l'orario di entrata: ");
        String orario = scan.nextLine();
        setOrario(orario);

        System.out.println("Insersci il numero di porte: ");
        int porte = scan.nextInt();
        setPorte(porte);
        scan.nextLine();

        while (porte < 1) {
            System.out.println("Inserisci un numero di porte valido: ");
            porte = scan.nextInt();
        }

        System.out.println("| Scelta alimentazione |\nPremi [1] per la benzina\nPremi [2] per il DIESEL\nPremi [3] per il GPL\nPremi [4] per il BIO DIESEL\nPremi [5] per i veicoli elettrici\nPremi [6] per i veicoli ibridi");
        int sc = scan.nextInt();
        scan.nextLine();

        while (sc < 1 || sc > 6) {
            System.out.println("! Errore !\nEsegui una scelta valida: ");
            sc = scan.nextInt();
            scan.nextLine();
        }

        if (sc == 1) {
            alimentanzione = "benzina";
            setAlimentazione(alimentanzione);
        } else if (sc == 2) {
            alimentanzione = "DIESEL";
            setAlimentazione(alimentanzione);
        } else if (sc == 3) {
            alimentanzione = "GPL";
            setAlimentazione(alimentanzione);
        } else if (sc == 4) {
            alimentanzione = "BIO DIESEL";
            setAlimentazione(alimentanzione);
        } else if (sc == 5) {
            alimentanzione = "elettica";
            setAlimentazione(alimentanzione);
        } else {
            alimentanzione = "Ibrida";
            setAlimentazione(alimentanzione);
        }
    }

}
