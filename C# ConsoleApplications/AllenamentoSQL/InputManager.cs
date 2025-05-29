using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary
{
    internal class InputManager
    {

        public void inputErrorMessage()
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("! ERRORE ! Inserisci un input valido");
            Console.ResetColor();
        }

        public int intInput()
        {
            string input = Console.ReadLine();

            if (int.TryParse(input, out int n))
            {
                return n;
            }
            else
            {
                inputErrorMessage();
                return intInput();
            }
        }

        public float floatInput()
        {
            string input = Console.ReadLine();

            if (float.TryParse(input, out float n))
            {
                return n;
            }
            else
            {
                inputErrorMessage();
                return floatInput();
            }
        }

        public string stringInputNoEmptyString()
        {
            string input = Console.ReadLine();

            if(input == "")
            {
                inputErrorMessage();
                return stringInputNoEmptyString();
            }
            else
            {
                return input;
            }
        }

    }
}
