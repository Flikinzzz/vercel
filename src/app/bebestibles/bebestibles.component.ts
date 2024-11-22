import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bebestibles',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './bebestibles.component.html',
  styleUrls: ['./bebestibles.component.css']
})
export class BebestiblesComponent implements OnInit, OnDestroy {
  bebestiblesPrincipales: any[] = [];
  private languageSubscription: Subscription | undefined;
  addToCartLabel: string = '';

  constructor(
    private sus: SupabaseService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadTranslations();
    this.loadBebestiblesByLanguage(this.translationService.getCurrentLanguage());

    // Suscribirse al cambio de idioma
    this.languageSubscription = this.translationService.onLanguageChange().subscribe(lang => {
      this.loadTranslations();
      this.loadBebestiblesByLanguage(lang);
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  async loadBebestiblesByLanguage(language: string) {
    const tipoProducto = language === 'en' ? 4 : (language === 'pt' ? 5 : 1);
    const data = await this.sus.getByType(tipoProducto);
    this.bebestiblesPrincipales = data || [];
  }

  mostrarInfo(bebestible: any) {
    Swal.fire({
      title: `${bebestible.nombre_producto}`,
      html: `${bebestible.descripcion}<br>Valor: $${bebestible.precio}`,
      confirmButtonText: this.addToCartLabel,
      confirmButtonColor: '#71cf13',
      cancelButtonText: this.getTranslation('cancelLabel'),
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.anadirAlCarrito(bebestible); // Llama a anadirAlCarrito con await para asegurar la secuencia
      }
    });
  }

  async anadirAlCarrito(bebestible: any) {
    try {
      await this.sus.addCarrito(bebestible); // Espera a que se complete la operación de añadir
      Swal.fire("¡Producto agregado!", "", "success");
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      Swal.fire("Error al agregar el producto", "Intenta de nuevo más tarde", "error");
    }
  }

  loadTranslations() {
    this.addToCartLabel = this.translationService.getTranslation('addToCart');
  }

  // Método para obtener traducciones
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
