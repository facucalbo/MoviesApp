import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = []
  public moviesSlideShow: Movie[] = []
  public loading = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight)

    if( pos > max ) {
      this.peliculasService.getCartelera('now_playing').subscribe( movies => {
        this.movies.push(...movies)
      });

    }
    // console.log({pos, max});
  }

  constructor( private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.loading = true;

    this.peliculasService.getCartelera('now_playing')
      .subscribe( movies => {
        this.movies = movies;
        this.moviesSlideShow = movies;
        this.loading = false;
       });
  }

  ngOnDestroy(): void {
      this.peliculasService.resetCartelera();
  }

}
