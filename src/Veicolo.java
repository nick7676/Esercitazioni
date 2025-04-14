public class Veicolo {

    private String marca;
    private String targa;
    private int matricolazione;
    private int cilindrata;
    private int capacita;
    private int tempi;
    private int porte;
    private String alimentazione;
    private String orario;

    public Veicolo() {
    }

    public String getTarga() {
        return targa;
    }

    public int getCilindrata() {
        return cilindrata;
    }

    public int getMatricolazione() {
        return matricolazione;
    }

    public String getMarca() {
        return marca;
    }

    public int getCapacita() {
        return capacita;
    }

    public int getTempi() {
        return tempi;
    }

    public int getPorte() {
        return porte;
    }

    public String getAlimentazione() {
        return alimentazione;
    }

    public String getOrario() {
        return orario;
    }

    public void setOrario(String orario) {
        this.orario = orario;
    }

    public void setCapacita(int capacita) {
        this.capacita = capacita;
    }

    public void setPorte(int porte) {
        this.porte = porte;
    }

    public void setAlimentazione(String alimentazione) {
        this.alimentazione = alimentazione;
    }

    public void setTarga(String targa) {
        this.targa = targa;
    }

    public void setTempi(int tempi) {
        this.tempi = tempi;
    }

    public void setCilindrata(int cilindrata) {
        this.cilindrata = cilindrata;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setMatricolazione(int matricolazione) {
        this.matricolazione = matricolazione;
    }

}
