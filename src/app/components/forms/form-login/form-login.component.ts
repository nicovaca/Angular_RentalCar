import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  username!: string
  password!: string


  constructor(
    private utenteService: UtentiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onLogin(){

  }
}
