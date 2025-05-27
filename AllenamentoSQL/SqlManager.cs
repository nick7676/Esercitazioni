using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookLibrary;
using Microsoft.Data.SqlClient;

namespace AllenamentoSQL
{
    internal class SqlManager
    {
        private readonly string _connectionString = "Server=DESKTOP-2GJJE49\\SQLEXPRESS;Database=magazzino;Trusted_Connection=True; Encrypt=False;";

        public void ProductADD()
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                conn.Open();

                InputManager input = new InputManager();

                string query = "INSERT INTO prodotti (Nome, Descrizione, Quantita, Prezzo) VALUES (@Nome, @Descrizione, @Quantita, @Prezzo)";
                using var cmd = new SqlCommand(query, conn);

                Console.WriteLine("Nome: ");
                string nome = input.stringInput();
                cmd.Parameters.AddWithValue("@Nome", nome);

                Console.WriteLine("Descrizione: ");
                string descrizione = input.stringInput();
                cmd.Parameters.AddWithValue("@Descrizione", descrizione);

                Console.WriteLine("Quantità: ");
                int quantita = input.intInput();
                cmd.Parameters.AddWithValue("@Quantita", quantita);

                Console.WriteLine("Prezzo: ");
                float prezzo = input.floatInput();
                cmd.Parameters.AddWithValue("@Prezzo", prezzo);

                cmd.ExecuteNonQuery();

                Console.WriteLine("Prodotto aggiunto con successo!");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Errore SQL: " + ex.Message);
            }
            catch (FormatException ex)
            {
                Console.WriteLine("Errore di formato nei dati inseriti: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Si è verificato un errore: " + ex.Message);
            }
        }

        public void FullPrint()
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                conn.Open();
                string query = "SELECT * FROM prodotti";
                using var cmd = new SqlCommand(query, conn);
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"ID: {reader["Id"]}, Nome: {reader["Nome"]}, Descrizione: {reader["Descrizione"]}, Quantità: {reader["Quantita"]}, Prezzo: {reader["Prezzo"]}");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Errore SQL: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Si è verificato un errore: " + ex.Message);
            }
        }

        public void ProductDelete()
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                conn.Open();

                InputManager input = new InputManager();

                Console.WriteLine("Inserisci l'ID del prodotto da eliminare: ");
                int id = input.intInput();

                string query = "DELETE FROM prodotti WHERE Id = @Id";
                using var cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@Id", id);
                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    Console.WriteLine("Prodotto eliminato con successo!");
                }
                else
                {
                    Console.WriteLine("Nessun prodotto trovato con l'ID specificato.");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Errore SQL: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Si è verificato un errore: " + ex.Message);
            }
        }

        public void ProductModify()
        {

            InputManager input = new InputManager();

            try
            {

                using var conn = new SqlConnection(_connectionString);
                {
                    conn.Open();

                    Console.WriteLine("Inserisci l'Id dell'utente da modificare: ");

                    string query = "UPDATE prodotti SET Nome = @Nome, Descrizione = @Descrizione, Quantita = @Quantita, Prezzo = @Prezzo WHERE Id = @Id";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@Id", input.intInput());
                        Console.WriteLine("Nuovo Nome: ");
                        cmd.Parameters.AddWithValue("@Nome", input.stringInput());
                        Console.WriteLine("Nuova Descrizione: ");
                        cmd.Parameters.AddWithValue("@Descrizione", input.stringInput());
                        Console.WriteLine("Nuova Quantità: ");
                        cmd.Parameters.AddWithValue("@Quantita", input.intInput());
                        Console.WriteLine("Nuovo Prezzo: ");
                        cmd.Parameters.AddWithValue("@Prezzo", input.floatInput());

                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            Console.WriteLine("Prodotto modificato con successo!");
                        }
                        else
                        {
                            Console.WriteLine("Nessun prodotto trovato con l'ID specificato.");
                        }
                    }

                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Errore SQL: " + ex.Message);
            }
            catch (FormatException ex)
            {
                Console.WriteLine("Errore di formato nei dati inseriti: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Si è verificato un errore: " + ex.Message);
            }

        }
    }
}
