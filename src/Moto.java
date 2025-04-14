import java.util.Scanner;

public class Moto extends Veicolo {

    public Moto() {
    }

    public void aggiuntaMoto() {

        Scanner scan = new Scanner(System.in);
        int sc = 0;
        int tempi = 0;

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

        System.out.println("Inserisci l'orario di entrata: ");
        String orario = scan.nextLine();
        setOrario(orario);

        System.out.println("Premere [1] se la moto è a 2 tempi\nPremere [2] se la moto è a 4 tempi");
        sc = scan.nextInt();
        scan.nextLine();

        while (sc < 1 || sc > 2) {
            System.out.println("! Errore !\nEsegui una scelta valida: ");
            sc = scan.nextInt();
            scan.nextLine();
        }
        if (sc == 1) {
            tempi = 2;
            setTempi(tempi);
        } else {
            tempi = 4;
            setTempi(tempi);
        }

    }

}
