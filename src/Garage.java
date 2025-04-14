import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;

public class Garage {

    private ArrayList<Veicolo> veicoli;

    public Garage() {
        veicoli = new ArrayList<>();
    }

    public void aggiuntaVeicolo(Veicolo t) {
        veicoli.add(t);
        ;
        System.out.println("Mezzo aggiunto correttamente...");
    }

    public void stampaVeicoli() {
        if (veicoli.isEmpty()) {
            System.out.println("Nel garage non è presente nessun veicolo...\nRitorno al menu principale...");
        } else {
            for (Veicolo t : veicoli) {
                System.out.println(stampadati(t));
            }
        }
    }

    public String stampadati(Veicolo t) {

        String descrizione_comune = "Targa: " + t.getTarga() + "\n" + "Marca: " + t.getMarca() + "\n" + "Cilindrata: " + t.getCilindrata() + "\n" + "Anno: " + t.getMatricolazione() + "\n" + "Orario di entrata: " + t.getOrario() + "\n";

        if (t instanceof Furgone) {
            descrizione_comune += "Capacità (KG): " + t.getCapacita() + "\n";
        } else if (t instanceof Auto) {
            descrizione_comune += "Porte: " + t.getPorte() + "\n" + "Alimentazione: " + t.getAlimentazione() + "\n";
        } else if (t instanceof Moto) {
            descrizione_comune += "Tempi: " + t.getTempi() + "\n";
        }
        return descrizione_comune;
    }

    public void rimozioneVeicolo() {

        Scanner scan = new Scanner(System.in);

        System.out.println("Inserisci la targa del veicolo in uscita: ");
        String targa = scan.nextLine();

        Pattern pattern = Pattern.compile("^" + Pattern.quote(targa) + ".*", Pattern.CASE_INSENSITIVE);
        ArrayList<Veicolo> risultato = new ArrayList<>();

        for (Veicolo t : veicoli) {
            if (pattern.matcher(t.getTarga()).find()) {
                risultato.add(t);
            }
        }

        if (risultato.isEmpty()) {
            System.out.println("Nessuna veicolo trovato con questa targa...\nRitorno al menu in corso...");
            return;
        }

        if (risultato.size() == 1) {
            Veicolo delete = risultato.get(0);
            veicoli.remove(delete);
            System.out.println("Veicolo rimosso correttamente:\n" + stampadati(delete) + "Ritorno al menu in corso...");
            return;
        }

        System.out.println("Risultati simili all'input: ");
        for (int i = 0; i < risultato.size(); i++) {
            System.out.println((i + 1) + ")\n" + stampadati(risultato.get(i)));
        }

        System.out.println("Decidi quale veicolo rimuovere: ");
        int sc = scan.nextInt();

        if (sc >= 1 && sc <= risultato.size()) {
            Veicolo delete = risultato.get(sc - 1);
            veicoli.remove(delete);
            System.out.println("Veicolo rimosso con successo...\n" + stampadati(delete) + "\nRitorno al menu in corso...");
        } else {
            System.out.println("Scelta non valida...\nRitorno al menu in corso...");
        }

    }

    public void conteggioPorte() {

        int i = 0;
        for (Veicolo t : veicoli) {
            if (t.getPorte() == 4) {
                i++;
            }
        }
        System.out.println("sono presenti: " + i + " auto con 4 porte");
    }

}
