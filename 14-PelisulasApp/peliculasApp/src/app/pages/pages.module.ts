import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TvHomeComponent } from './tv-home/tv-home.component';




@NgModule({
  declarations: [
    HomeComponent,
    PeliculasComponent,
    BuscarComponent,
    RegisterComponent,
    TvHomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule
  ],
  providers: [NavbarComponent]
})
export class PagesModule { }
