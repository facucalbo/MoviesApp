import { Component, OnInit } from '@angular/core';
import { Serie } from '../../interfaces/tv-response';

@Component({
  selector: 'app-tv-home',
  templateUrl: './tv-home.component.html',
  styleUrls: ['./tv-home.component.css']
})
export class TvHomeComponent implements OnInit {

  public series: Serie[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
