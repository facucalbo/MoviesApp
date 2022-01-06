import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styles: [
  ]
})
export class ClasesComponent implements OnInit {

  alerta = "alert-danger"
  loading = false;

  propiedades = {
    danger: true
  }

  constructor() { }

  ejecutar(){
    this.loading = true;

    setTimeout( ()=> this.loading = false, 3000)
  }



  ngOnInit(): void {
  }

}
