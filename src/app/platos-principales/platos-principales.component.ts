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
  selector: 'app-platos-principales',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './platos-principales.component.html',
  styleUrls: ['./platos-principales.component.css']
})
export class PlatosPrincipalesComponent implements OnInit, OnDestroy {
  platosPrincipales: any[] = [];
  mainCoursesTitle: string = '';
  priceLabel: string = '';
  moreInfoLabel: string = '';
  addToCartLabel: string = '';
  productAddedLabel: string = '';
  languageSubscription!: Subscription;

  constructor(private supabaseService: SupabaseService, private translationService: TranslationService) {}

  ngOnInit() {
    this.loadTranslations();

    this.languageSubscription = this.translationService.onLanguageChange().subscribe(lang => {
      this.loadTranslations();
      this.updatePlatosByLanguage(lang);
    });

    this.updatePlatosByLanguage(this.translationService.getCurrentLanguage());
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  async updatePlatosByLanguage(language: string) {
    const tipoProducto = language === 'es' ? 0 : 3;
    this.platosPrincipales = await this.supabaseService.getByType(tipoProducto) || [];
  }

  async mostrarInfo(plato: any) {
    Swal.fire({
      title: `${plato.nombre_producto}`,
      html: `${plato.descripcion}<br>${this.priceLabel}: $${plato.precio}`,
      confirmButtonText: this.addToCartLabel,
      confirmButtonColor: '#71cf13',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.anadirAlCarrito(plato); // Llamada a anadirAlCarrito
      }
    });
  }

  async anadirAlCarrito(plato: any) {
    try {
      await this.supabaseService.addCarrito(plato);
      Swal.fire(this.productAddedLabel, "", "success"); // Mensaje traducido de éxito
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      Swal.fire("Error al agregar el producto", "Intenta de nuevo más tarde", "error");
    }
  }

  loadTranslations() {
    this.mainCoursesTitle = this.translationService.getTranslation('mainCourses');
    this.priceLabel = this.translationService.getTranslation('price');
    this.moreInfoLabel = this.translationService.getTranslation('moreInfo');
    this.addToCartLabel = this.translationService.getTranslation('addToCartLabel');
    this.productAddedLabel = this.translationService.getTranslation('productAddedLabel'); // Traducción del mensaje de éxito
  }
}
