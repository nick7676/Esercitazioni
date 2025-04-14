import java.util.Scanner;

public class Furgone extends Veicolo {

    public Furgone() {
    }

    public void aggiuntaFurgone() {

        Scanner scan = new Scanner(System.in);

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

        System.out.println("Inserisci la capacità massima: ");
        int capacita = scan.nextInt();
        setCapacita(capacita);

    }

}
