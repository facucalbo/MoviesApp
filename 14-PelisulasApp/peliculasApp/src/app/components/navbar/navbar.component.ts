import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router, public dataService: DataService) {

    this.dataService.onlyLogo = false;

   }

  ngOnInit(): void {

  }

  buscarPelicula( text: string ) {
    text = text.trim();

    if ( text.length === 0 ) return;

    this.router.navigate(['/buscar', text])
  }

  signUpPage() {
    this.router.navigate(['signup'])
  }

  logInPage() {
    this.router.navigate(['login'])
  }

  seriesPage() {
    this.router.navigate(['tv'])
  }


}
