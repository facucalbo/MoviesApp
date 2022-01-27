import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  onlyLogo: boolean = false;
  baseUrl: string = 'https://api.themoviedb.org/3';
  carteleraPage = 1;
  cargando = false;

  constructor(private http: HttpClient ) { }

  get params() {
    return {
      api_key: '643e9715382a24eca9b3e2308c989260',
      language: 'en-US',
      page: this.carteleraPage
    }
 }
}
