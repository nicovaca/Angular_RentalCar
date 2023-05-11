import { PeriodoPrenotazione } from "./periodo-prenotazione";
import { Utente } from "./utente";
import { Veicolo } from "./veicolo";

export interface Prenotazione {
  id:number;
  periodoPrenotazione:PeriodoPrenotazione;
  approvazione:boolean;
  utente:Utente;
  veicolo:Veicolo;
}
