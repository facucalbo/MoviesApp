import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy, OnChanges{

  public movies: Movie[] = [];
  public param: string = '';
  public loading = false;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnChanges(changes: SimpleChanges): void {
      console.log();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.loading = true;

      if(params['text']) {
        this.param = params['text'];
  
        this.peliculasService.buscarPeliculas( params['text'] )
          .subscribe( movies => {
            this.movies = movies;
            this.loading = false;
          })
      } else {
        this.param = params['genre'];

        this.peliculasService.getCarteleraPopular()
          .subscribe( resp => {
            this.movies = resp.filter( movie => movie.genre_ids.find( genres => genres === parseInt( this.param )))
            this.loading = false;
          })
      }
    })
  }

  @HostListener('window:scroll',['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if ( pos > max ){
      
      if(this.param) {

      this.peliculasService.buscarPeliculas( this.param )
          .subscribe( movies => {
            this.movies.push(...movies);
          })
      } else {
        this.peliculasService.getCarteleraPopular()
          .subscribe( resp => {
            this.movies.push( ...resp.filter( movie => movie.genre_ids.find( genres => genres === parseInt( this.param ))));
          })
      }
    }
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCartelera();
  }
  
}
