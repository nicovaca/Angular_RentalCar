import {Injectable} from '@angular/core';
import {Utenti} from '../models/utenti';
import {utenti} from '../environments/utenti';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  items: Utenti[] = utenti;
  item!: Utenti;


  addUser(nome:string, cognome:string, email:string, eta:number) {
    let id = this.items.length+1;
    let utente:Utenti = {id:id,nome:nome,cognome:cognome,email:email,eta:eta}
    this.items.push(utente);
  }

  getUserById(id: number):Utenti  {
    return this.items.find(item => item.id === id)!;
  }

  updateUser(id:number, nome:string, cognome:string, email:string, eta:number) {
    let user = this.getUserById(id);
    console.log(user)
    user.nome = nome
    user.cognome = cognome
    user.email = email
    user.eta = eta
    console.log("update user id=",id)
  }

  deleteUser(id: number) {
    let user = this.getUserById(id);
    let index = this.items.indexOf(user);
    this.items.slice(index, 1);
    console.log("eliminato id=",id)
    console.log(user)
  }

}
