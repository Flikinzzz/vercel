import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service'; 

@Component({
  selector: 'app-bebestibles',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './bebestibles.component.html',
  styleUrls: ['./bebestibles.component.css']
})
export class BebestiblesComponent implements OnInit {
  bebestiblesPrincipales: any[];

  constructor(private sus: SupabaseService) {
    this.bebestiblesPrincipales = [];
  }

  async ngOnInit() {
    this.getPlatos([12,5,6,4]); 
  }

  async getPlatos(ids: number[]) {
    const data = await this.sus.getPlatos(ids);
    this.bebestiblesPrincipales = data || [];
  }

  mostrarInfo(bebestible: any) {
    Swal.fire({
      title: `${bebestible.nombre_producto}`, 
      html: `${bebestible.descripcion}<br>Valor: $${bebestible.precio}`,
      confirmButtonText: 'Agregar al carrito',
      confirmButtonColor: '#71cf13',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Producto agregado!', '', 'success');
      }
    });
  }
}
