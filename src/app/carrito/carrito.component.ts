import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SupabaseService } from '../supabase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  carrito: any[];
  carritoFinal: any[];

  constructor(private sus: SupabaseService) {
    this.carrito = [];
    this.carritoFinal = [];
    this.cargarCarrito();
  }

  async cargarCarrito() {
    const data = await this.sus.getCarrito();
    this.carrito = data;
    var ids: number[];
    ids = [];
    for (var i = 0; i < this.carrito.length; i++) {
      ids.push(this.carrito[i].id_producto);
    }
    var datosFinales = await this.sus.getPlatos(ids);
    this.carritoFinal = datosFinales;
  }

  async eliminarCarrito(data: any){
    console.log(data);
    const estado = await this.sus.eliminarCarrito(data);
    if (estado){
      Swal.fire('¡Eliminado con éxito!', '', 'error');
    }else{
      Swal.fire("Hubo un error al eliminar", "", "error");
    }
    this.cargarCarrito();
  }

}
