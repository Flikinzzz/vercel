import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private sus: SupabaseService) {
    this.platosPrincipales = [];
    this.getPlatos([1, 2, 3]); 
  }

  async getPlatos(ids: number[]) {
    const data = await this.sus.getPlatos(ids);
    this.platosPrincipales = data || [];
  }

  mostrarInfo(plato: any) {
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
        this.sus.addCarrito(plato);
      }
    });
  }
}
