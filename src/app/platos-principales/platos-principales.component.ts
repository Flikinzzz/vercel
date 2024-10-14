import { CommonModule } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-platos-principales',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './platos-principales.component.html',
  styleUrl: './platos-principales.component.css'
})
export class PlatosPrincipalesComponent {


  platosPrincipales: any[];
  constructor(private sus: SupabaseService){
    this.platosPrincipales = [];
    //this.platosPrueba();
    this.getPlatos();
  }

  
  async platosPrueba(){
    let platosPrueba = [
      {
        nombre_plato_principal: 'Fetuccini bolognesa',
        descripcion: 'Deliciosos fetuccinies de pasta casera, con salsa bolognesa de una receta secreta del restaurant.',
        precio: '13900'
      },
      {
        nombre_plato_principal: 'Pollo a las brasas con papas fritas',
        descripcion: 'Pollo asado a las brasas, junto a una salsa especial acompañado de nuestras clásicas papas rústicas con salsa del himalaya.',
        precio: '11900'
      },
      {
        nombre_plato_principal: 'Carne mechada con puré',
        descripcion: 'Nuestra colación clásica, pero con pequeños cambios de nuestro chef para darle un toque premium.',
        precio: '12500'
      }
    ];
    this.platosPrincipales = platosPrueba;
  }

  async getPlatos(){
    //const result = await fetch('');
    //const response = (await result.json()) as any[];
    //this.platosPrincipales = response;
    this.platosPrincipales = await this.sus.getPlatos();
  }

  mostrarInfo(plato: any){
    Swal.fire({
      title: `${plato.nombre_producto}`,
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
