import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service'; 
import { TranslationService } from '../translation.service'; // Importar el servicio de traducción

@Component({
  selector: 'app-bebestibles',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './bebestibles.component.html',
  styleUrls: ['./bebestibles.component.css']
})
export class BebestiblesComponent implements OnInit {
  bebestiblesPrincipales: any[];

  constructor(
    private sus: SupabaseService,
    private translationService: TranslationService // Inyectar el servicio de traducción
  ) {
    this.bebestiblesPrincipales = [];
  }

  async ngOnInit() {
    this.getPlatos([12, 5, 6, 4]); 
  }

  async getPlatos(ids: number[]) {
    const data = await this.sus.getPlatos(ids);
    this.bebestiblesPrincipales = data || [];
  }

  mostrarInfo(bebestible: any) {
    Swal.fire({
      title: `${bebestible.nombre_producto}`,
      html: `${bebestible.descripcion}<br>Valor: $${bebestible.precio}`,
      confirmButtonText: this.getTranslation('addToCartLabel'), // Traducción para 'Agregar al carrito'
      confirmButtonColor: '#71cf13',
      cancelButtonText: this.getTranslation('cancelLabel'), // Traducción para 'Cancelar'
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(this.getTranslation('productAddedLabel'), '', 'success'); // Traducción para '¡Producto agregado!'
        this.sus.addCarrito(bebestible);
      }
    });
  }

  addToCart(bebestible: any) {
    // Lógica para añadir al carrito
    console.log('Añadiendo al carrito:', bebestible);
  }

  // Método para obtener las traducciones
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
