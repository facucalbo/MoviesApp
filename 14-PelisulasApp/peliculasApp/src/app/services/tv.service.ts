import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Serie, TVResponse } from '../interfaces/tv-response';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor( private http: HttpClient, private dataService: DataService) { }

  resetCartelera() {
    this.dataService.carteleraPage = 1;
  }

  getSeriesCartelera(type: string): Observable<Serie[]> {
    return this.http.get<TVResponse>(`${ this.dataService.baseUrl }/tv/${type}`, { params: this.dataService.params })
      .pipe(
        map( resp => resp.results),
        tap( () => {
            this.dataService.carteleraPage += 1;
            this.dataService.cargando = false
          }
        )
      )

  }
}
