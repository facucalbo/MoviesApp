import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/interfaces/genres-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styles: [
  ]
})
export class GenerosComponent implements OnInit {

  genres: Genre[] = [];

  constructor( private peliculasService: PeliculasService, private router: Router) { }

  ngOnInit(): void {
    
    this.peliculasService.getGenres().subscribe( genre => {
      console.log(genre);
      this.genres = genre;
    })
  }

  searchByGenre(genre: number){
    console.log(genre);
    this.router.navigate(['/buscar/genero', genre])
  }
}
