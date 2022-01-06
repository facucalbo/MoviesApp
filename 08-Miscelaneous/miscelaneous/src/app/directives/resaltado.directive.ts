import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input("appResaltado") nuevoColor: string = '';
  
  constructor(private el:ElementRef) { 
    console.log("The directive called");

    // el.nativeElement.style.backgroundColor = "red"
   }

   @HostListener('mouseenter') mouseEntro(){
    this.resaltar(this.nuevoColor);
   }
   
   @HostListener('mouseleave') mouseSalio(){
    this.resaltar();
   }

   private resaltar( color: string = ''){
    this.el.nativeElement.style.backgroundColor = color;
   }


}
