import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './components/register/login/login.component';
import { SigninComponent } from './components/register/signin/signin.component';
import { TvHomeComponent } from './pages/tv-home/tv-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pelicula/:id',
    component: PeliculasComponent
  },
  {
    path: 'buscar/:text',
    component: BuscarComponent
  },
  {
    path: 'buscar/genero/:genre',
    component: BuscarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SigninComponent
  },
  {
    path: 'tv',
    component: TvHomeComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
