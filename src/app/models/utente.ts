import { Prenotazione } from "./prenotazione";
import { Ruolo } from "./ruolo";

export interface Utente {
  id:number;
  nome: string;
  cognome: string;
  dataNascita:Date;
  email: string;
  username:string;
  password:string;
  ruolo:Ruolo;
  prenotazioni:Prenotazione[];
}
