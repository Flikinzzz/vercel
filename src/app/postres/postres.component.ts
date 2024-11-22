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
  selector: 'app-postres',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './postres.component.html',
  styleUrls: ['./postres.component.css']
})
export class PostresComponent implements OnInit, OnDestroy {
  postres: any[] = [];
  private languageSubscription: Subscription | undefined;
  addToCartLabel: string = '';
  cancelLabel: string = '';
  productAddedLabel: string = '';
  postreLabel: string = '';

  constructor(
    private sus: SupabaseService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadTranslations();
    this.loadPostresByLanguage(this.translationService.getCurrentLanguage());

    // Suscribirse al cambio de idioma
    this.languageSubscription = this.translationService.onLanguageChange().subscribe(lang => {
      this.loadTranslations();
      this.loadPostresByLanguage(lang);
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  async loadPostresByLanguage(language: string) {
    const tipoProducto = language === 'en' ? 7 : 6;
    const data = await this.sus.getByType(tipoProducto);
    this.postres = data || [];
  }

  mostrarInfo(postre: any) {
    Swal.fire({
      title: `${postre.nombre_producto}`,
      html: `${postre.descripcion}<br>Valor: $${postre.precio}`,
      confirmButtonText: this.addToCartLabel,
      confirmButtonColor: '#71cf13',
      cancelButtonText: this.cancelLabel,
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.anadirAlCarrito(postre);
      }
    });
  }

  async anadirAlCarrito(postre: any) {
    try {
      await this.sus.addCarrito(postre);
      Swal.fire(this.productAddedLabel, "", "success");
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      Swal.fire("Error al agregar el producto", "Intenta de nuevo más tarde", "error");
    }
  }

  loadTranslations() {
    this.addToCartLabel = this.translationService.getTranslation('addToCartLabel');
    this.cancelLabel = this.translationService.getTranslation('cancelLabel');
    this.productAddedLabel = this.translationService.getTranslation('productAddedLabel');
    this.postreLabel = this.translationService.getTranslation('desserts'); // Traducción del título
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
