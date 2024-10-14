import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vegano',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './vegano.component.html',
  styleUrl: './vegano.component.css'
})
export class VeganoComponent {

  platosPrincipales: any[];
  constructor(){
    this.platosPrincipales = [];
    this.platosPrueba();
    //this.getPlatos();
  }

  
  async platosPrueba(){
    let platosPrueba = [
      {
        nombre_plato: 'Fetuccini bolognesa vegana',
        descripcion: 'Deliciosos fetuccinies de pasta casera, con salsa bolognesa de soya.',
        precio: '17900'
      },
      {
        nombre_plato: 'Fritos de coliflor con papas fritas',
        descripcion: 'Coliflor frito junto a una salsa especial acompañado de nuestras clásicas papas rústicas con salsa del himalaya.',
        precio: '10000'
      },
      {
        nombre_plato: 'Carne mechada vegana con puré',
        descripcion: 'Nuestra colación clásica, pero con pequeños cambios para ser disfrutada por toda nuestra clientela.',
        precio: '18500'
      }
    ];
    this.platosPrincipales = platosPrueba;
  }

  async getPlatos(){
    const result = await fetch('');
    const response = (await result.json()) as any[];
    let platos = response;
    for(var i = 0; i < platos.length; i++){
      if(platos[i].esVegano){
        this.platosPrincipales.push(platos[i])
      }
    }
  }

  mostrarInfo(plato: any){
    Swal.fire({
      title: `${plato.nombre_plato}`,
      html: `${plato.descripcion}<br>Valor: $${plato.precio}`,
      confirmButtonText: 'Agregar al carrito',
      confirmButtonColor: '#71cf13',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Producto agregado!", "", "success");
      }
    });
  }

}