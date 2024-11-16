import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { TranslationService } from '../translation.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './postres.component.html',
  styleUrl: './postres.component.css'
})
export class PostresComponent {
postres: any[];

constructor(
  private sus: SupabaseService,
  private translationService: TranslationService
){
  this.postres = [];
  this.getPostres();
}


async getPostres(){
  const data = await this.sus.getByType(6);
  this.postres = data;
}

mostrarInfo(postre: any) {
  Swal.fire({
    title: `${postre.nombre_producto}`,
    html: `${postre.descripcion}<br>Valor: $${postre.precio}`,
    confirmButtonText: this.getTranslation('addToCartLabel'), // Traducción para 'Agregar al carrito'
    confirmButtonColor: '#71cf13',
    cancelButtonText: this.getTranslation('cancelLabel'), // Traducción para 'Cancelar'
    cancelButtonColor: '#DBDBDB',
    showCloseButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(this.getTranslation('productAddedLabel'), '', 'success'); // Traducción para '¡Producto agregado!'
      this.sus.addCarrito(postre);
    }
  });
}

anadirAlCarrito(plato: any){
  this.sus.addCarrito(plato);
  Swal.fire("¡Producto agregado!", "", "success");
}

// Método para obtener las traducciones
getTranslation(key: string): string {
  return this.translationService.getTranslation(key);
}

}
