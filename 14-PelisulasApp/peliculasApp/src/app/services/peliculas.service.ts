import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetail } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { Genre, GenresResponse } from '../interfaces/genres-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor( private http: HttpClient ) { }

  get params() {
     return {
       api_key: '643e9715382a24eca9b3e2308c989260',
       language: 'es-ES',
       page: this.carteleraPage
     }
  }

  resetCartelera() {
    this.carteleraPage = 1;
  }

  getCartelera(type: string): Observable<Movie[]> {

    if( this.cargando ) return of([]);

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/${type}`, { params: this.params })
            .pipe(
              map( (resp) => resp.results),
              tap( () => {
                this.carteleraPage += 1;
                this.cargando = false;
              })
            );
  }

  buscarPeliculas( text: string): Observable<Movie[]> {

    const params = { ...this.params, page: this.carteleraPage, query: text }

    if( this.cargando ) return of([]);

    this.cargando = true;
    // const params = new HttpParams()
    //                .set({this.params})
    //                .set('page', 1)
    //                .set('query', text)

    //https://api.themoviedb.org/3/search/movie?page=1&query=messi
    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, { params })
        .pipe(
          map( resp => resp.results ),
          tap( () => {
            this.carteleraPage += 1;
            this.cargando = false;
          })
        );
  }

  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieDetail>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )

  }

  getCast( movieId: string ): Observable<Cast[]> {
    return this.http.get<CreditsResponse>( `${ this.baseUrl }/movie/${ movieId }/credits`, { params: this.params } )
      .pipe(
        map( resp => resp.cast ),
        catchError( err => of([])),
      );
  };

  getGenres(): Observable<Genre[]>{
    return this.http.get<GenresResponse>(`${ this.baseUrl }/genre/movie/list`, { params: this.params})
      .pipe(
        map( resp => resp.genres)
      )
  }
}
