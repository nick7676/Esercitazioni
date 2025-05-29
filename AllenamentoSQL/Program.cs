using System.Security.Cryptography.Pkcs;
using BookLibrary;

namespace AllenamentoSQL
{
    internal class Program
    {
        static void Main(string[] args)
        {
            InputManager input = new InputManager();
            SqlManager sqlManager = new SqlManager();

            while (true)
            {

                Console.WriteLine("\n[ G E S T O R E   M A G A Z Z I N O ]");
                Console.WriteLine(" (0) Per uscire dal programma");
                Console.WriteLine(" (1) Per aggiungere prodotti");
                Console.WriteLine(" (2) Per visualizzare la lista");
                Console.WriteLine(" (3) Per eliminare un prodotto");
                Console.WriteLine(" (4) Per modificare un prodotto");
                Console.WriteLine(" (5) Per eseguire una ricerca tramite nome");
                int sc = input.intInput();

                switch (sc)
                {
                    case 0:
                        Console.WriteLine("Uscita dal programma in corso...");
                        Environment.Exit(0);
                        break;
                    case 1:
                        sqlManager.ProductADD();
                        break;
                    case 2:
                        sqlManager.FullPrint();
                        break;
                    case 3:
                        sqlManager.ProductDelete();
                        break;
                    case 4:
                        sqlManager.ProductModify();
                        break;
                    case 5:
                        sqlManager.ProductNameResearh();
                        break;
                    default:
                        Console.WriteLine("Opzione non valida. Riprova.");
                        break;
                }
            }
        }
    }
}
