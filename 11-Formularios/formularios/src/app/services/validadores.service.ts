import { Injectable } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  noHerrera( control: FormControl): ErrorValidate { // validaciones personalizadas

    if( control.value?.toLowerCase() === 'herrera' ){

      return{
        noHerrera: true
      }
    }

    return null!;
  }

  passIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name]; // agarra el pass1 del formulario (formControlName)
      const pass2Control = formGroup.controls[pass2Name];

      if( pass1Control.value === pass2Control.value ){ // compara la igualdad

        pass2Control.setErrors(null); // si lo son no tira error. Recordar que en html (DOM) los errores hacen al formulario invalido
      } else {
        pass2Control.setErrors({ noEsIgual: true}) // si no lo son returna un objeto diciendo que existe un error = true
      }
    }
  }

  existeUsuario ( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {


    if( !control.value ) return Promise.resolve(null!)

    return new Promise( ( resolve, reject ) => {

      setTimeout(() => {

        if( control.value === 'cafu') {
          resolve( { existe: true } )
        } else{
          resolve( null! );
        }

      }, 3500)
    });

  }

}
