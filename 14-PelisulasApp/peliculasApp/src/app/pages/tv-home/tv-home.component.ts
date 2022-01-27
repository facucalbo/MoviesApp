import { Component, OnInit, OnDestroy } from '@angular/core';
import { Serie } from '../../interfaces/tv-response';
import { TvService } from '../../services/tv.service';

@Component({
  selector: 'app-tv-home',
  templateUrl: './tv-home.component.html',
  styleUrls: ['./tv-home.component.css']
})
export class TvHomeComponent implements OnInit, OnDestroy {

  public series: Serie[] = [];
  public seriesTop: Serie[] = [];
  public loading = false;

  constructor( private tvService: TvService ) { }

  ngOnInit(): void {
    this.loading = true;

    this.tvService.getSeriesCartelera('on_the_air').subscribe(
      serie => {
        this.series = serie;

        console.log(this.series);

      }
     )

    this.tvService.resetCartelera();

    this.tvService.getSeriesCartelera('top_rated').subscribe(
      serie => {
        this.seriesTop = serie;
      }
    )
     this.loading = false;
  }

  ngOnDestroy(): void {
      this.tvService.resetCartelera();
  }

}
