import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];

  loading: boolean = false;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {

    this.loading = true;

    this.router.params.subscribe( params => {
     this.getArtist(params['id']); // se obtiene lo que este en la url (el id del artista)
     this.getTopTracks(params['id']);
    })
   }

   getArtist( id : string){
    
      this.spotify.getArtist( id )
          .subscribe( artist => {
            this.artista = artist
            this.loading = false;
          })
   }

   getTopTracks(id: string) {

      this.spotify.getTopTracks( id )
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks
        });
   }

}
