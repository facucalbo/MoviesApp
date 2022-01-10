import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = []
  public moviesSlideShow: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight)

    if( pos > max ) {
      // TODO llamar al servicio
      this.peliculasService.getCartelera().subscribe( movies => {
        this.movies.push(...movies)
      });

    }
    // console.log({pos, max});
  }

  constructor( private peliculasService: PeliculasService) {



  }

  ngOnInit(): void {

    this.peliculasService.getCartelera()
      .subscribe( movies => {
        this.movies = movies;
        this.moviesSlideShow = movies;
       });
  }

}
