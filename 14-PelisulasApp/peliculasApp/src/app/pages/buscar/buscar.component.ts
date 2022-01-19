import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy{

  public movies: Movie[] = [];
  public param: string = '';
  public loading = false;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.loading = true;

      this.addMovies(params);

    })
  }

  @HostListener('window:scroll',['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if ( pos > max ){

      this.activatedRoute.params.subscribe( params => {
        this.addMovies(params);

      })
    }
  }

  addMovies(params: Params) {

    // if(this.param) {

    //   this.peliculasService.buscarPeliculas( this.param )
    //       .subscribe( movies => {
    //         this.movies.push(...movies);
    //         console.log(this.movies);
    //       })
    //   } else {
    //     this.peliculasService.getCarteleraPopular()
    //       .subscribe( resp => {
    //         this.movies.push( ...resp.filter( movie => movie.genre_ids.find( genres => genres === parseInt( this.param ))));
    //         console.log(this.movies);
    //       })
    //   }

    if(params['text']) {
      this.param = params['text'];

      this.peliculasService.buscarPeliculas( params['text'] )
        .subscribe( movies => {
          this.movies.push(...movies.filter( movie => movie.poster_path !== null));
          this.loading = false;
        })
    } else {
      this.param = params['genre'];

      this.peliculasService.getCarteleraPopular()
        .subscribe( resp => {
          this.movies.push(...resp.filter( movie =>
            movie.genre_ids.find( genres => genres === parseInt( this.param )) &&
            movie.poster_path !== null
          ))
          this.loading = false;
        })
    }

  }

  ngOnDestroy(): void {
    this.peliculasService.resetCartelera();
  }

}
