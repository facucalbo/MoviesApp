import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [style.fontSize.px]="size"
       [style.color]="color[colorNumber]">
      Hola mundo... esta es una etiqueta
    </p>

    <button class="btn btn-primary" (click)="size = size + 5; colorNumber = colorNumber + 1">
      <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-primary" (click)="size = size - 5; colorNumber = colorNumber - 1">
      <i class="fa fa-minus"></i>
    </button>
    <p style="color: blue;">HOla</p>
    `,
  styles: [
  ]
})
export class NgStyleComponent implements OnInit {

  size: number = 20;

  colorNumber: number = 0;

  color: string[] = ['blue', 'red', 'yellow', 'pink', 'green']

  constructor() { }

  ngOnInit(): void {
  }

}
