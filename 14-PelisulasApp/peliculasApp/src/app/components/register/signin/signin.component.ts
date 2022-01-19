import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  constructor( protected fb: FormBuilder, private dataService: DataService,
                private router: Router ) {
    this.setOnlyLogo(true);

    this.createListeners();
  }

  ngOnDestroy(): void {
    this.setOnlyLogo(false);
  }

  setOnlyLogo(state: boolean){
    this.dataService.onlyLogo = state;
  }

  forma: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
    pass1: ['', [Validators.required, Validators.minLength(6)]],
    pass2: ['', Validators.required]
  })

  createListeners() {
    this.forma.valueChanges.subscribe( control => {})
  }

  get pass2NoValid() {
    const pass1 = this.forma.controls['pass1'].value;
    const pass2 = this.forma.controls['pass2'].value;

    if ( pass1 === pass2 ) return false;
    return true;
  }

  noValid(campo: string) {
    return this.forma.controls[campo].errors && this.forma.controls[campo].touched
  }

  toLoginPage(){
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

  save() {

    if ( this.forma.invalid ) {
      Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      })
    }

    this.forma.reset();
  }

}
