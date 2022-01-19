import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  param = this.activatedRoute.snapshot.params['type'];


  constructor( private activatedRoute: ActivatedRoute, private dataService: DataService) {

    this.setOnlyLogo(true)
   }

  ngOnDestroy(): void {

    this.setOnlyLogo(false);
  }

  ngOnInit(): void { }

  setOnlyLogo(state: boolean){
    this.dataService.onlyLogo = state;
  }
}
