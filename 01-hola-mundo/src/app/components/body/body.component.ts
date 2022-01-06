import { Component } from '@angular/core'

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    frase: any = {
        mensaje: 'un gran poder conlleva una gran responasabiliasjdlakfj',
        autor: 'Bern Parker'
    };

    mostrar = true;

    personajes: string[] = ['Spiderman', 'Venom', 'Dr. Octopus']

}