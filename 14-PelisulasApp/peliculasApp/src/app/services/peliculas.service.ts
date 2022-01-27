import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetail } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { Genre, GenresResponse } from '../interfaces/genres-response';
import { Serie, TVResponse } from '../interfaces/tv-response';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient, private dataService: DataService ) { }

  resetCartelera() {
    this.dataService.carteleraPage = 1;
  }

  getCartelera(type: string): Observable<Movie[]> {

    if( this.dataService.cargando ) return of([]);

    this.dataService.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.dataService.baseUrl }/movie/${type}`, { params: this.dataService.params })
            .pipe(
              map( (resp) => resp.results),
              tap( () => {
                this.dataService.carteleraPage += 1;
                this.dataService.cargando = false;
              })
            );
  }

  buscarPeliculas( text: string): Observable<Movie[]> {

    const params = { ...this.dataService.params, page: this.dataService.carteleraPage, query: text }

    if( this.dataService.cargando ) return of([]);

    this.dataService.cargando = true;
    // const params = new HttpParams()
    //                .set({this.params})
    //                .set('page', 1)
    //                .set('query', text)

    //https://api.themoviedb.org/3/search/movie?page=1&query=messi
    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${ this.dataService.baseUrl }/search/movie`, { params })
        .pipe(
          map( resp => resp.results ),
          tap( () => {
            this.dataService.carteleraPage += 1;
            this.dataService.cargando = false;
          })
        );
  }

  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieDetail>(`${ this.dataService.baseUrl }/movie/${ id }`, {
      params: this.dataService.params
    }).pipe(
      catchError( err => of(null))
    )

  }

  getCast( movieId: string ): Observable<Cast[]> {
    return this.http.get<CreditsResponse>( `${ this.dataService.baseUrl }/movie/${ movieId }/credits`, { params: this.dataService.params } )
      .pipe(
        map( resp => resp.cast ),
        catchError( err => of([])),
      );
  };

  getGenres(): Observable<Genre[]>{
    return this.http.get<GenresResponse>(`${ this.dataService.baseUrl }/genre/movie/list`, { params: this.dataService.params})
      .pipe(
        map( resp => resp.genres)
      )
  }
}
