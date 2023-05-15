import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn = false;
  ruolo: string = ''


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    let storeData = sessionStorage.getItem("isUserLoggedIn");
    let ruolo = sessionStorage.getItem("ruolo");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
      if (ruolo=='admin'){
        this.ruolo=ruolo
      }else if (ruolo=='customer')
        this.ruolo=ruolo
  else
    this.isUserLoggedIn = false;

  }
}
