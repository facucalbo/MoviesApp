import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';
import { Serie } from '../../interfaces/tv-response';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit{

  @Input() movies: Movie[] = [];
  @Input() series: Serie[] = [];

  private swiper!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {

    this.swiper = new Swiper('.swiper', {
      loop: true
    });

  }


  ngOnInit(): void {

  }

  onSlideNext() {
    this.swiper.slideNext();
  }

  onSlidePrev() {

    this.swiper.slidePrev();
  }

}
