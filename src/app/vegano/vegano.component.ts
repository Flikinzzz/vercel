import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SupabaseService } from '../supabase.service'; 
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vegano',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './vegano.component.html',
  styleUrls: ['./vegano.component.css']
})
export class VeganoComponent implements OnInit, OnDestroy {
  platosPrincipales: any[] = [];
  private languageSubscription: Subscription | undefined;

  constructor(
    private sus: SupabaseService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadPlatosByLanguage(this.translationService.getCurrentLanguage());

    this.languageSubscription = this.translationService.onLanguageChange().subscribe(lang => {
      this.loadPlatosByLanguage(lang);
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  async loadPlatosByLanguage(language: string) {
    const tipoProducto = language === 'en' ? [5] : [2];
    const data = await this.sus.getPlatos(tipoProducto);
    this.platosPrincipales = data || [];
  }

  async anadirAlCarrito(plato: any) {
    try {
      await this.sus.addCarrito(plato); // Espera a que se complete la operación de añadir
      Swal.fire("¡Producto agregado!", "", "success");
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      Swal.fire("Error al agregar el producto", "Intenta de nuevo más tarde", "error");
    }
  }  

  mostrarInfo(plato: any) {
    Swal.fire({
      title: `${plato.nombre_producto}`,
      html: `${plato.descripcion}<br>Valor: $${plato.precio}`,
      confirmButtonText: this.getTranslation('addToCartLabel'),
      confirmButtonColor: '#71cf13',
      cancelButtonText: this.getTranslation('cancelLabel'),
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.anadirAlCarrito(plato); // Usa await para asegurar la secuencia
      }
    });
  }

  // Método para obtener traducción
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
