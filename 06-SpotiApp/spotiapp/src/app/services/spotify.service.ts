import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root' // hace que no sea necesario hacer los imports en app.module
})
export class SpotifyService {

  constructor( private http:HttpClient ) { }

  getQuery(query: String) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBB5Mm_fg0tl64qKRW_9AhBtAZwGUZgF4YoteCssGhsSeq5J2Jked3xc6fGnc0IvpR8l2rJK-uiGiLuAq8'
    });
    
    return this.http.get(url, { headers });
  }

  // getAccessToken() {
  //   this.http.post('https://accounts.spotify.com/api/token', {})
  //   .subscribe( data => {

  //   })
  // }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe( map( (data: any) => data['albums'].items))
  }

  getArtists(termino: string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=14`)
              .pipe( map( (data: any) => data['artists'].items));
  }

  getArtist(id: string){
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe( map( (data: any) => data['tracks']));
  }
}
