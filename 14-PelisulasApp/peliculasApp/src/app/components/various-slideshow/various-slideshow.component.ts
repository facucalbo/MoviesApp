import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../../interfaces/tv-response';

@Component({
  selector: 'app-various-slideshow',
  templateUrl: './various-slideshow.component.html',
  styles: [
  ]
})
export class VariousSlideshowComponent implements OnInit {

  @Input() element: Serie[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
