import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { StarRatingComponent } from 'ng-starrating';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];

  totalStars = 10;
  readOnly = true;

  constructor() {

   }

  ngOnInit(): void {
    console.log(this.movies);
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
