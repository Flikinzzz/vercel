import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones
import { MatIconModule } from '@angular/material/icon'; // Si usas íconos
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bebestibles',
  standalone: true,
  imports:  [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './bebestibles.component.html',
  styleUrl: './bebestibles.component.css' 
})
export class BebestiblesComponent {
  
  bebestiblesPrincipales: any[];

  constructor() {
    this.bebestiblesPrincipales = [];
    this.bebestiblesPrueba();
    //this.getBebestibles(); // Llama a getBebestibles para obtener datos reales
  }

  async bebestiblesPrueba() {
    let bebestiblesPrueba = [
      {
        nombre_bebestible: 'Mojito Clásico',
        descripcion: 'Refrescante mezcla de ron, menta fresca, jugo de limón y soda, perfecto para un día caluroso.',
        precio: 6500
      },
      {
        nombre_bebestible: 'Cerveza Artesanal',
        descripcion: 'Cerveza de elaboración artesanal, con un sabor amargo característico y aromas cítricos.',
        precio: 5000
      },
      {
        nombre_bebestible: 'Jugo Natural de Frutas',
        descripcion: 'Delicioso jugo recién exprimido, disponible en sabores como naranja, frutilla o piña.',
        precio: 3200
      }
    ];
    this.bebestiblesPrincipales = bebestiblesPrueba;
  }

  async getBebestibles() {
    try {
      const result = await fetch(''); // URL válida
      if (!result.ok) {
        throw new Error('Error en la petición');
      }
      const response = (await result.json()) as any[];
      this.bebestiblesPrincipales = response;
    } catch (error) {
      console.error('Error al obtener los bebestibles:', error);
    }
  }
  mostrarInfo(bebestible: any){
    Swal.fire({
      title: `${bebestible.nombre_bebestible}`,  
      html: `${bebestible.descripcion}<br>Valor: $${bebestible.precio}`,  // Sigue siendo descripción y precio
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
