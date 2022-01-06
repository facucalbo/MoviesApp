import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // forma!: FormGroup;

  // para que no tire error se inicializa directamente
  forma: FormGroup = this.fb.group({
  nombre:   ['', [Validators.required, Validators.minLength(3)]], // el nombre del atributo es equivalente al del formControlName
  apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noHerrera]], // los validadores personalizados no se deben llamar es decir, van sin parentesis
  correo:   ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
  usuario:  ['', ,this.validadores.existeUsuario], // se puede saltear el validador sincrono dejando un espacio en blanco
  pass1:    ['', Validators.required],
  pass2:    ['', Validators.required],
  direccion: this.fb.group({
    distrito: ['', Validators.required],
    ciudad:   ['', Validators.required]
  }),
  pasatiempos: this.fb.array([])
  },{
    validators: this.validadores.passIguales('pass1', 'pass2')
  });


  constructor( private fb: FormBuilder, private validadores: ValidadoresService ) {

    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray; // Para ser usado en el html
  }

  get nombreNoValido() {
    return this.formIsNotValid('nombre') // se marca como is-invalid en el html si la condicion es true
  }

  get apellidoNoValido() {
    return this.formIsNotValid('apellido')
  }

  get correoNoValido() {
    return this.formIsNotValid('correo')
  }

  get usuarioNoValido() {
    return this.formIsNotValid('usuario')
  }

  get distritoNoValido() {
    return this.formIsNotValid('direccion.distrito')
  }

  get ciudadNoValido() {
    return this.formIsNotValid('direccion.ciudad')
  }

  get pass1NoValido() {
    return this.formIsNotValid('pass1')
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return ( pass1 === pass2 ) ? false : true;
  }

  ngOnInit(): void {
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      // console.log(valor);
    } )

    // this.forma.statusChanges.subscribe( status => console.log({status}))
  }

  cargarDataAlFormulario(){

    // this.forma.setValue({
    this.forma.reset({ // el reset te permite dejar en nulo algun que otro campo
      nombre: 'Facundo',
      apellido: 'Calbo',
      correo: 'faci@mail.com',
      direccion: {
        distrito: '12',
        ciudad: 'la ferrere'
      }
    })

  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('') ); // se agrega un pasatiempo
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  formIsNotValid(campo: string){
    return this.forma.controls[campo].errors && this.forma.controls[campo].touched;
  }

  guardar(){
    console.log(this.forma);

    if ( this.forma.invalid ){


      Object.values( this.forma.controls ).forEach( control => {
        if( control instanceof FormGroup){
          Object.values( control.controls  ).forEach( control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }

    // Posteo de la informacion

    // this.forma.reset();

  }
}
