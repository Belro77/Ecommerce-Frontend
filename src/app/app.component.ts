import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // o .css si no usás Sass
})
export class AppComponent {

textoBusqueda = '';


buscar() {
  console.log(this.textoBusqueda);
}

}


