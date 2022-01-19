import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieDetail } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public movie?: MovieDetail;
  public cast: Cast[] = [];
  public loading = false;

  constructor( private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService,
      private location: Location,
      private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    combineLatest([
      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )
      
    ]).subscribe( ([movie, cast]) => {
      this.loading = true;
      if( !movie ) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie = movie;
      this.cast = cast.filter( actor => actor.profile_path !== null);
      this.loading = false;
    })

    // this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {
    //   if( !movie ) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
      
    //   this.movie = movie;
    // });

    // this.peliculasService.getCast( id ).subscribe( cast => {
    //   this.cast = cast.filter( actor => actor.profile_path !== null);
    // });
  }

  onBack() {
    this.location.back();
  }
}
