import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap, map } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

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
       language: 'en-US',
       page: this.carteleraPage
     }
  }

  resetCartelera() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    console.log('cargando');

    if( this.cargando ) return of([]);



    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, { params: this.params })
            .pipe(
              map( (resp) => resp.results),
              tap( () => {
                this.carteleraPage += 1;
                this.cargando = false;
              })
            );
  }

  buscarPeliculas( text: string): Observable<Movie[]> {


    const params = { ...this.params, page: 1, query: text }

    // const params = new HttpParams()
    //                .set({this.params})
    //                .set('page', 1)
    //                .set('query', text)

    //https://api.themoviedb.org/3/search/movie?page=1&query=messi
    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, { params })
        .pipe(
          map( resp => resp.results )
        );

  }

}
