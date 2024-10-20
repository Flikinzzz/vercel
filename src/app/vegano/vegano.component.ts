import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SupabaseService } from '../supabase.service'; 
import { TranslationService } from '../translation.service'; // Importa el servicio de traducción

@Component({
  selector: 'app-vegano',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './vegano.component.html',
  styleUrls: ['./vegano.component.css']
})
export class VeganoComponent implements OnInit {
  platosPrincipales: any[];
  anadirAlCarrito: any;

  constructor(private sus: SupabaseService, private translationService: TranslationService) { // Inyecta el servicio de traducción
    this.platosPrincipales = [];
  }

  async ngOnInit() {
    this.getPlatos([7,8,9]); 
  }

  async getPlatos(ids: number[]) {
    const data = await this.sus.getPlatos(ids);
    this.platosPrincipales = data || [];
  }

  mostrarInfo(plato: any) {
    Swal.fire({
      title: `${plato.nombre_producto}`,
      html: `${plato.descripcion}<br>Valor: $${plato.precio}`,
      confirmButtonText: this.getTranslation('addToCartLabel'), // Traducción para "Agregar al carrito"
      confirmButtonColor: '#71cf13',
      cancelButtonText: this.getTranslation('cancelLabel'), // Traducción para "Cancelar"
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(this.getTranslation('productAddedLabel'), '', 'success'); // Traducción para "Producto agregado"
        this.sus.addCarrito(plato);
      }
    });
  }

  // Método para obtener traducción
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
