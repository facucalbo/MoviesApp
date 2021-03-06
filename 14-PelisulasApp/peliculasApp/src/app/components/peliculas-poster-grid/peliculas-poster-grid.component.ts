import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Input() homePosition: number = 0;

  totalStars = 10;
  readOnly = true;

  constructor( private router: Router) {   }

  ngOnInit(): void {
  }

  // onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
  //   alert(`Old Value:${$event.oldValue},
  //     New Value: ${$event.newValue},
  //     Checked Color: ${$event.starRating.checkedcolor},
  //     Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  // }

  onMovieClick( movie: Movie) {
    this.router.navigate(['/pelicula', movie.id])
  }

}
