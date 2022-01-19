import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnChanges {
  
  param = this.activatedRoute.snapshot.params['type'];

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnChanges(changes: SimpleChanges): void {

    location.reload();
  }

  ngOnInit(): void { 
    
  }
}
