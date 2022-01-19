import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( protected fb: FormBuilder, private dataService: DataService,
                private router: Router ) {
    this.createListener();

    this.setOnlyLogo(true)
  }

  ngOnDestroy(): void {
    this.setOnlyLogo(false);
  }

  setOnlyLogo(state: boolean){
    this.dataService.onlyLogo = state;
  }

  forma: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  })

  createListener() {
    this.forma.valueChanges.subscribe();
  }

  ngOnInit(): void {  }

  noValid( campo: string) {
    return this.forma.controls[campo].invalid && this.forma.controls[campo].touched
  }

  toSignupPage(){
    this.router.navigate(['signup'])
  }

  save() {
    if( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      })
    }

    this.forma.reset();
  }
}
