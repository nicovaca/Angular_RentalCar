import { PeriodoPrenotazione } from "./periodo-prenotazione";
import { Utente } from "./utente";
import { Veicolo } from "./veicolo";

export interface Prenotazione {
  id:number;
  dataInizio:Date;
  dataFine:Date;
  approvazione:boolean;
  utente:Utente;
  veicolo:Veicolo;
  utenteId?:number
}
