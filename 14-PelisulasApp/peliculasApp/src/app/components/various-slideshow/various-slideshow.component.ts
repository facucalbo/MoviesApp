import { Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Serie } from '../../interfaces/tv-response';

@Component({
  selector: 'app-various-slideshow',
  templateUrl: './various-slideshow.component.html',
  styleUrls: ['./various-slideshow.component.css']
})
export class VariousSlideshowComponent implements OnInit {

  @Input() elements: Serie[] = []

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const swiper = new Swiper( '.swiper', {
      slidesPerView: 6.3,
      freeMode: true,
      spaceBetween: 15
    } )
  }

}
