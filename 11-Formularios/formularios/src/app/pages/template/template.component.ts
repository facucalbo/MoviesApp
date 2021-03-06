import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario ={
    nombre: 'Facundo',
    apellido: 'Calbo',
    correo: 'facundo@gmail.com',
    pais: 'ARG'
  }

  paises: any[] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises()
      .subscribe( paises => {
        this.paises = <any[]> paises;

        this.paises.unshift({
          nombre: '[ Seleccione Pais ]',
          codigo: ''
        })
      });

  }

  guardar(forma: NgForm) {
    console.log(forma);

    if ( forma.invalid ){

      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      })

      return;
    }
  }

}
