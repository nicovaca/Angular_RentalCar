import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  isUserLoggedIn = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    let storeData = sessionStorage.getItem("isUserLoggedIn");
    console.log("StoreData: " + storeData);

    if( storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
    else
      this.isUserLoggedIn = false;

  }
}
