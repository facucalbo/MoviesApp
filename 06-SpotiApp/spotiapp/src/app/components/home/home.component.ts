import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  
  // paises: any[] = [];

  nuevasCanciones: any[] = [];
  loading: boolean = true;

  error: boolean = false;
  errorMessage: string = '';
  
  constructor(/*private http: HttpClient*/ private spotify: SpotifyService) { 
    // this.http.get('https://restcountries.com/v3.1/lang/spa')
    //   .subscribe( (ans: any) => {
    //     this.paises = ans;
    //     console.log(this.paises);
    //   })

    this.loading = true;

    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, (errorServicio) => {
        
        this.loading = false;
        this.error = true;
        this.errorMessage = errorServicio.error.error.message;
        
        console.log(errorServicio);
        console.log(errorServicio.error.error.message);
      })
  }

  ngOnInit(): void {
  }

}
