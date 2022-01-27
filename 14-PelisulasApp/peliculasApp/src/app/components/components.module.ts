import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';


import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './register/login/login.component';
import { SigninComponent } from './register/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenerosComponent } from './generos/generos.component';
import { VariousSlideshowComponent } from './various-slideshow/various-slideshow.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent,
    LoadingComponent,
    LoginComponent,
    SigninComponent,
    GenerosComponent,
    VariousSlideshowComponent
  ],
  exports: [
    NavbarComponent, // como lo usamos fuera del path components, se debe exportar
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent,
    LoadingComponent,
    SigninComponent,
    LoginComponent,
    GenerosComponent,
    VariousSlideshowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
