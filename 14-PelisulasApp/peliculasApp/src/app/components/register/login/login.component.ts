import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( protected fb: FormBuilder ) {
    this.createListener();

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
  
  save() {
    if( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      })
    }

    this.forma.reset();
  }
}
